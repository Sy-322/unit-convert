const conversionRates = {
  meter: 1,
  kilometer: 0.001,
  mile: 1/1609.344,
  yard: 1/0.9144,
  foot: 1/0.3048,
  inch: 1/0.254,
  chain: 1/20.1168,
  mickey: 1/25.4,
  nautical: 0.00053995680345572,
  au: 1/149597870700,
  cun: 1/0.0303,
};

const input = document.getElementById("inputValue");
const from = document.getElementById("fromUnit");
const to = document.getElementById("toUnit");
const result = document.getElementById("result");
const swapButton = document.getElementById("swapButton");

function convert() {
      const value = parseFloat(input.value);
      if (isNaN(value)) {
        result.textContent = "数値を入力してください。";
        return;
      }
      const meterValue = value / conversionRates[from.value];
      const convertedValue = meterValue * conversionRates[to.value];
      result.textContent = `${convertedValue.toFixed(9)} ${to.options[to.selectedIndex].text}`;
    }

    function swapUnits() {
      const temp = from.value;
      from.value = to.value;
      to.value = temp;
      convert();
    }

    input.addEventListener("input", convert);
    from.addEventListener("change", convert);
    to.addEventListener("change", convert);
    swapButton.addEventListener("click", swapUnits);