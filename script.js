const resultEl = document.getElementById("pass");
const lengthEl = document.getElementById("pass-length");
const uppercaseEl = document.getElementById("uppercase");
const lowercaseEl = document.getElementById("lowercase");
const numbersEl = document.getElementById("numbers");
const symbolsEl = document.getElementById("symbols");
const generateEl = document.getElementById("generate");
const clipboardEl = document.getElementById("clipboard");
const tooltipEl = document.getElementById("tooltip");

const randomFunc = {
  lower: getRandomLower,
  upper: getRandomUpper,
  number: getRandomNumber,
  symbol: getRandomSymbol,
};

document.addEventListener("DOMContentLoaded", () => {
  generateDefaultPassword();
});

function isChecked(element) {
  return element.checked;
}

clipboardEl.addEventListener("click", copyToClipboard);
generateEl.addEventListener("click", generatePasswordAndUpdateResult);
clipboardEl.addEventListener("click", copyToClipboard);

function copyToClipboard() {
  const password = resultEl.textContent;
  if (!password) {
    return;
  }
  navigator.clipboard.writeText(password);
  alert("Password copied to clipboard!");
}

function generatePasswordAndUpdateResult() {
  const length = +lengthEl.value;
  const hasLower = isChecked(lowercaseEl);
  const hasUpper = isChecked(uppercaseEl);
  const hasNumber = isChecked(numbersEl);
  const hasSymbol = isChecked(symbolsEl);

  resultEl.textContent = generatePassword(
    hasLower,
    hasUpper,
    hasNumber,
    hasSymbol,
    length
  );
}

function generateDefaultPassword() {
  resultEl.textContent = generatePassword(true, true, true, true, 22);
}

function generatePassword(lower, upper, number, symbol, length) {
  let generatedPassword = "";
  const typesCount = lower + upper + number + symbol;
  const typesArr = [{ lower }, { upper }, { number }, { symbol }].filter(
    (item) => Object.values(item)[0]
  );

  if (typesCount === 0) {
    return "";
  }

  for (let i = 0; i < length; i += typesCount) {
    typesArr.forEach((type) => {
      const funcName = Object.keys(type)[0];
      generatedPassword += randomFunc[funcName]();
    });
  }

  const finalPassword = generatedPassword.slice(0, length);

  return finalPassword;
}

function getRandomLower() {
  return String.fromCharCode(Math.floor(Math.random() * 26) + 97);
}

function getRandomUpper() {
  return String.fromCharCode(Math.floor(Math.random() * 26) + 65);
}

function getRandomNumber() {
  return String.fromCharCode(Math.floor(Math.random() * 10) + 48);
}

function getRandomSymbol() {
  const symbols = "!@#$%^&*(){}[]=<>/,.";
  return symbols.charAt(Math.floor(Math.random() * symbols.length));
}

function copyToClipboard() {
  const password = resultEl.textContent;
  if (!password) {
    return;
  }
  navigator.clipboard.writeText(password).then(() => {
    showTooltip();
  });
}

function showTooltip() {
  tooltipEl.style.display = "block";
  setTimeout(() => {
    tooltipEl.style.display = "none";
  }, 2000);
}
