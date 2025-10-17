// Функция для обработки отображения логотипов
export function handleLogoDisplay(cardType) {
  clearLogos();
  const logos = document.querySelectorAll(".card-logo");
  logos.forEach((logo) => {
    if (logo.alt === cardType) {
      logo.classList.add("active");
    } else {
      logo.classList.add("faded");
    }
  });
}

// Функция для проверки валидности номера карты по алгоритму Луна
export function isValidCardNumber(number) {
  // Предварительная проверка на пустую строку и минимальную длину
  if (!number || number.length < 13 || number.length > 19) {
    return false;
  }

  let sum = 0;
  let alternate = false;

  // Очищаем номер от пробелов и дефисов
  number = number.replace(/[\s-]/g, "");

  for (let i = number.length - 1; i >= 0; i--) {
    let n = parseInt(number.charAt(i), 10);

    if (isNaN(n)) {
      return false; // Если в номере есть нецифровые символы
    }

    if (alternate) {
      n *= 2;
      if (n > 9) n -= 9;
    }
    sum += n;
    alternate = !alternate;
  }
  return sum % 10 === 0;
}

// Функция для определения типа карты
export function detectCardType(number) {
  // Очищаем номер от пробелов и дефисов
  number = number.replace(/[\s-]/g, "");

  const cardPatterns = {
    Visa: /^4[0-9]{12}(?:[0-9]{3})?(?:[0-9]{3})?$/,
    MasterCard: /^54[5-9][0-9]{13}|55[5-9][0-9]{13}$/,
    AmericanExpress: /^(34[0-9]{13}|37[0-9]{13})$/,
    Discover: /^6011[0-9]{12}(?:[0-9]{3})?$/,
    JCB: /^(35[2-8][0-9]{13}|35[2-8][0-9]{15,16})$/,
    DinersClub:
      /^(30[0-5][0-9]{11}|36[0-9]{12}|38[0-9]{12}|54[0-4][0-9]{13}|55[0-4][0-9]{13})$/,
    МИР: /^2200[0-9]{12}(?:[0-9]{3})?$/,
  };

  for (const [key, pattern] of Object.entries(cardPatterns)) {
    if (pattern.test(number)) {
      return key;
    }
  }
  return null;
}

// Функция для очистки логотипов
export function clearLogos() {
  const logos = document.querySelectorAll(".card-logo");
  logos.forEach((logo) => {
    logo.classList.remove("active");
    logo.classList.remove("faded"); // Убираем эффект бледности
  });
}
