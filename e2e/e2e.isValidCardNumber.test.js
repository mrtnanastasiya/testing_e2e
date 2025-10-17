import puppeteer from "puppeteer";
import { fork } from "child_process";

jest.setTimeout(30000); // Увеличиваем таймаут для Puppeteer

describe("E2E тесты для валидации номера карты", () => {
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
  });

  afterEach(async () => {
    await browser.close();
    server.kill();
  });

  test("Валидация корректного номера карты", async () => {
    await page.goto(baseUrl);

    // Вводим корректный номер карты
    await page.type("#cardnumber", "4716095457122114");
    await page.click("#validate");

    // Ждем появления результата с таймаутом
    await page.waitForFunction(
      () => {
        const result = document.getElementById("validation-result").textContent;
        return result !== "";
      },
      { timeout: 5000 },
    );

    // Получаем результат валидации
    const result = await page.$eval(
      "#validation-result",
      (el) => el.textContent,
    );
    expect(result).toBe("Карта валидна");
  });

  test("Валидация некорректного номера карты", async () => {
    await page.goto(baseUrl);

    // Вводим некорректный номер карты
    await page.type("#cardnumber", "4111111111111112");
    await page.click("#validate");

    await page.waitForFunction(
      () => {
        const result = document.getElementById("validation-result").textContent;
        return result !== "";
      },
      { timeout: 5000 },
    );

    // Проверяем результат валидации
    const result = await page.$eval(".cards-validate-container", (el) => {
      const message = el.querySelector("#validation-result");
      return message ? message.textContent : "";
    });
    expect(result).toBe("Неверный номер карты");
  });

  test("Валидация слишком короткого номера", async () => {
    await page.goto(baseUrl);

    // Вводим слишком короткий номер
    await page.type("#cardnumber", "1234567890123");
    await page.click("#validate");

    await page.waitForFunction(
      () => {
        const result = document.getElementById("validation-result").textContent;
        return result !== "";
      },
      { timeout: 5000 },
    );

    // Проверяем результат валидации
    const result = await page.$eval(".cards-validate-container", (el) => {
      const message = el.querySelector("#validation-result");
      return message ? message.textContent : "";
    });
    expect(result).toBe("Неверный номер карты");
  });

  test("Валидация слишком длинного номера", async () => {
    await page.goto(baseUrl);

    // Вводим слишком длинный номер
    await page.type("#cardnumber", "12345678901234567890");
    await page.click("#validate");

    await page.waitForFunction(
      () => {
        const result = document.getElementById("validation-result").textContent;
        return result !== "";
      },
      { timeout: 5000 },
    );

    // Проверяем результат валидации
    const result = await page.$eval(".cards-validate-container", (el) => {
      const message = el.querySelector("#validation-result");
      return message ? message.textContent : "";
    });
    expect(result).toBe("Неверный номер карты");
  });

  test("Валидация номера с нецифровыми символами", async () => {
    await page.goto(baseUrl);

    // Вводим номер с буквами
    await page.type("#cardnumber", "411111111111111A");
    await page.click("#validate");

    await page.waitForFunction(
      () => {
        const result = document.getElementById("validation-result").textContent;
        return result !== "";
      },
      { timeout: 5000 },
    );

    // Проверяем результат валидации
    const result = await page.$eval(".cards-validate-container", (el) => {
      const message = el.querySelector("#validation-result");
      return message ? message.textContent : "";
    });
    expect(result).toBe("Неверный номер карты");
  });
});
