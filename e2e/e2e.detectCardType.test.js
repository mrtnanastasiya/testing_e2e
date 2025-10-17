import puppeteer from "puppeteer";
import { fork } from "child_process";
import { detectCardType } from "../src/js/cads_validate/cads.validate.js";
// import { describe } from "jest-environment-jsdom";

jest.setTimeout(30000); // Увеличиваем таймаут для Puppeteer

describe("E2E тесты для определения типа карты", () => {
  let browser = null;
  let page = null;
  let server = null;
  const baseUrl = "http://localhost:9000";

  beforeEach(async () => {
    server = fork(`${__dirname}/e2e.server.js`);
    await new Promise((resolve, reject) => {
      if (server.connected) {
        process.send("ok");
        resolve();
      } else {
        reject();
      }
    });

    browser = await puppeteer.launch({
      headless: false, // показываем GUI
      slowMo: 200,
      devtools: false, // не показываем инструменты разработчика
    });
    page = await browser.newPage();
    await page.setViewport({ width: 1280, height: 800 });
  });

  afterEach(async () => {
    await browser.close();
    server.kill();
  });

  // Создаем вспомогательную функцию для проверки карты
  async function checkCardType(cardNumber, expectedType) {
    await page.goto(baseUrl);

    // Вводим номер карты и нажимаем кнопку валидации
    await page.type("#cardnumber", cardNumber);
    await page.click("#validate");

    // Проверяем определение типа карты
    const detectedType = detectCardType(cardNumber);
    expect(detectedType).toBe(expectedType);

    // Ждем появления результата
    await page.waitForFunction(
      () => {
        const result = document.getElementById("validation-result").textContent;
        return result !== "";
      },
      { timeout: 5000 },
    );

    // Проверяем видимость логотипа
    const logoIsVisible = await page.$eval(
      `.cards-logos-container img[alt="${expectedType}"]`,
      (element) => element !== null,
    );
    expect(logoIsVisible).toBe(true);
  }

  test("Проверка определения карты Visa", async () => {
    await checkCardType("4716095457122114", "Visa");
    expect(true).toBe(true);
  });

  test("Проверка определения карты MasterCard", async () => {
    await checkCardType("5573559224263435", "MasterCard");
    expect(true).toBe(true);
  });

  test("Проверка определения карты AmericanExpress", async () => {
    await checkCardType("347911703816736", "AmericanExpress");
    expect(true).toBe(true);
  });

  test("Проверка определения карты Discover", async () => {
    await checkCardType("6011664949501156", "Discover");
    expect(true).toBe(true);
  });

  test("Проверка определения карты JCB", async () => {
    await checkCardType("3529126088835938", "JCB");
    expect(true).toBe(true);
  });

  test("Проверка определения карты DinersClub", async () => {
    await checkCardType("36890441885631", "DinersClub");
    expect(true).toBe(true);
  });

  test("Проверка определения карты МИР", async () => {
    await checkCardType("2200000000000000", "МИР");
    expect(true).toBe(true);
  });
});
