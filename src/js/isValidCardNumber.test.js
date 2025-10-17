/**
 * @jest-environment jsdom
 */

import { isValidCardNumber } from "./cads_validate/cads.validate.js";

describe("Тестирование валидации номера карты по алгоритму Луна", () => {
  test("Должен корректно проверять валидный номер карты", () => {
    // Валидные номера карт (проходят алгоритм Луна)
    expect(isValidCardNumber("4539316723953088688")).toBe(true); // Visa тестовый номер
    expect(isValidCardNumber("5482899567311148")).toBe(true); // MasterCard тестовый номер
    expect(isValidCardNumber("376485891220740")).toBe(true); // American Express тестовый номер
    expect(isValidCardNumber("6011821950189061")).toBe(true); // Discover тестовый номер
  });

  test("Должен корректно проверять невалидный номер карты", () => {
    // Невалидные номера карт (не проходят алгоритм Луна)
    expect(isValidCardNumber("4111111111111112")).toBe(false);
    expect(isValidCardNumber("5500000000000005")).toBe(false);
    expect(isValidCardNumber("378282246310006")).toBe(false);
    expect(isValidCardNumber("6011111111111118")).toBe(false);
  });

  test("Должен обрабатывать крайние случаи", () => {
    // Краевые случаи
    expect(isValidCardNumber("")).toBe(false); // Пустая строка
    expect(isValidCardNumber("1")).toBe(false); // Один символ
    expect(isValidCardNumber("1234567890123456")).toBe(false); // Невалидная длина
    expect(isValidCardNumber("1234-5678-9012-3456")).toBe(false); // Содержат дефисы
    expect(isValidCardNumber("1234 5678 9012 3456")).toBe(false); // Содержат пробелы
  });
});
