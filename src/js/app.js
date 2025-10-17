import {
  detectCardType,
  clearLogos,
  isValidCardNumber,
  handleLogoDisplay,
} from "./cads_validate/cads.validate.js";

document.addEventListener("DOMContentLoaded", () => {
  const cardInput = document.getElementById("cardnumber");
  const validateButton = document.getElementById("validate");
  const resultElement = document.getElementById("validation-result");

  validateButton.addEventListener("click", (event) => {
    event.preventDefault();
    const cardNumber = cardInput.value.trim();

    // Очищаем предыдущий результат
    resultElement.textContent = "";

    if (!cardNumber) {
      resultElement.textContent = "Введите номер карты";
      return;
    }

    // Проверка валидности номера карты
    if (!isValidCardNumber(cardNumber)) {
      resultElement.textContent = "Неверный номер карты";
      clearLogos(); // Очищаем логотипы
      return;
    }

    // Определяем платежную систему
    const cardType = detectCardType(cardNumber);
    if (cardType) {
      handleLogoDisplay(cardType); // Подсвечиваем логотип соответствующей платежной системы
      resultElement.textContent = "Карта валидна";
    } else {
      resultElement.textContent = "Неизвестная платежная система";
      clearLogos(); // Очищаем логотипы
    }
  });
});
