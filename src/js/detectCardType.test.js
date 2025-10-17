/**
 * @jest-environment jsdom
 */

import { detectCardType } from "./cads_validate/cads.validate.js";

describe("Тестирование функции для определения типа карты", () => {
  test("Должен корректно определять тип Visa карты", () => {
    // Тестовые номера Visa
    expect(detectCardType("4716095457122114")).toBe("Visa");
    expect(detectCardType("4556260385183298")).toBe("Visa");
    expect(detectCardType("4497472103672800963")).toBe("Visa");
  });

  test("Должен корректно определять тип MasterCard", () => {
    // Тестовые номера MasterCard
    expect(detectCardType("5573559224263435")).toBe("MasterCard");
    expect(detectCardType("5496200773341124")).toBe("MasterCard");
    expect(detectCardType("5494797317792995")).toBe("MasterCard");
  });

  test("Должен корректно определять тип American Express", () => {
    // Тестовые номера American Express
    expect(detectCardType("347911703816736")).toBe("AmericanExpress");
    expect(detectCardType("377438331888476")).toBe("AmericanExpress");
  });

  test("Должен корректно определять тип Discover", () => {
    // Тестовые номера Discover
    expect(detectCardType("6011664949501156")).toBe("Discover");
    expect(detectCardType("6011386809520290700")).toBe("Discover");
  });

  test("Должен корректно определять тип JCB", () => {
    // Тестовые номера JCB
    expect(detectCardType("3529126088835938")).toBe("JCB");
    expect(detectCardType("3536555850921058811")).toBe("JCB");
  });

  test("Должен корректно определять тип Diners Club", () => {
    // Тестовые номера Diners Club
    expect(detectCardType("30405712514558")).toBe("DinersClub");
    expect(detectCardType("36890441885631")).toBe("DinersClub");
    expect(detectCardType("5435856860482339")).toBe("DinersClub");
    expect(detectCardType("5527059220179971")).toBe("DinersClub");
  });

  test("Должен корректно определять тип МИР", () => {
    // Тестовые номера МИР
    expect(detectCardType("2200000000000000")).toBe("МИР");
    expect(detectCardType("2200000000000000000")).toBe("МИР");
  });

  test("Должен возвращать null для невалидных номеров", () => {
    // Невалидные номера
    expect(detectCardType("1234567890123456")).toBeNull();
    expect(detectCardType("9999999999999999")).toBeNull();
    expect(detectCardType("1234-5678-9012-3456")).toBeNull();
    expect(detectCardType("1234 5678 9012 3456")).toBeNull();
    expect(detectCardType("")).toBeNull();
    expect(detectCardType("1")).toBeNull();
  });
});
