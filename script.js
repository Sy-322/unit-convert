math.config({
  number: 'BigNumber',
  precision: 1000
});

const conversionRates = {
  centimeter: math.bignumber("0.01"),
  meter: math.bignumber("1"),
  kilometer: math.bignumber("1000"),
  micrometer: math.bignumber("0.000001"),
  nanometer: math.bignumber("0.000000001"),
  mile: math.bignumber(math.evaluate("1 / 1609.344")),
  yard: math.bignumber(math.evaluate("1/0.9144")),
  foot: math.bignumber(math.evaluate("1/0.3048")),
  inch: math.bignumber(math.evaluate("1/0.254")),
  furlong: math.bignumber(math.evaluate("1/201.168")),
  chain: math.bignumber(math.evaluate("1/20.1168")),
  mickey: math.bignumber(math.evaluate("1/25.4")),
  nautical: math.bignumber("0.00053995680345572"),
  au: math.bignumber(math.evaluate("1/149597870700")),
  ly: math.bignumber(math.evaluate("1/9460730472580800")),
  cun: math.bignumber(math.evaluate("1/(10/33)")),
  shaku: math.bignumber(math.evaluate("10/(10/33)")),
  ken: math.bignumber(math.evaluate("60/(10/33)")),
  jō: math.bignumber(math.evaluate("100/(10/33)")),
  chō: math.bignumber(math.evaluate("360/(10/33)")),
  li: math.bignumber(math.evaluate("12960/(10/33)")),
  bohr: math.bignumber(math.evaluate("1/0.0000000000529177210544")),
};

const unitSymbols = {
  centimeter: "cm",
  meter: "m",
  kilometer: "km",
  micrometer: "μm",
  nanometer: "nm",
  mile: "mi",
  yard: "yd",
  foot: "ft",
  inch: "in",
  furlong: "fur",
  chain: "ch",
  mickey: "mickey",
  nautical: "nm",
  au: "AU",
  ly: "ly",
  cun: "寸",
  shaku: "尺",
  ken: "間",
  jō: "丈",
  chō: "町",
  li: "里",
  bohr: "α₀"
};

function changeColor(hoge) {
  if (hoge.value == 0) {
    hoge.style.color = '';
  } else {
    hoge.style.color = 'black';
  }
}

window.addEventListener("DOMContentLoaded", () => {
  const input = document.getElementById("inputValue");
  const from = document.getElementById("fromUnit");
  const to = document.getElementById("toUnit");
  const result = document.getElementById("result");
  const swapButton = document.getElementById("swapButton");
  const precisionInput = document.getElementById("precision");

  const savedInput = localStorage.getItem("inputValue");
  const savedFrom = localStorage.getItem("fromUnit");
  const savedTo = localStorage.getItem("toUnit");
  const savedPrecision = localStorage.getItem("precision");

  if (savedInput !== null) input.value = savedInput;
  if (savedFrom !== null) {
    from.value = savedFrom;
    changeColor(from); 
  }
  if (savedTo !== null) {
    to.value = savedTo;
    changeColor(to);  
  }
  if (savedPrecision !== null) precisionInput.value = savedPrecision;

  function convert() {
    try {
      const expression = input.value.trim();
      const fromValue = from.value;
      const toValue = to.value;
      const precisionValue = document.getElementById("precision").value;
      const precision = Math.max(0, parseInt(precisionValue) || 0);

      if (!fromValue || !toValue) {
        result.textContent = "両方の単位を選択してください。";
        return;
      }

      let value;
      try {
        value = math.bignumber(expression);
      } catch {
        value = math.evaluate(expression);
      }

      const fromRate = conversionRates[fromValue];
      const toRate = conversionRates[toValue];

      const meterValue = math.divide(value, fromRate);
      const convertedValue = math.multiply(meterValue, toRate);

      const formattedValue = math.format(convertedValue, {
        notation: 'fixed',
        lowerExp: -1000,
        upperExp: 1000,
        precision: precision
      });

      const unitSymbol = unitSymbols[toValue] || toValue;
      result.textContent = `${formattedValue} ${unitSymbol}`;

      localStorage.setItem("inputValue", expression);
      localStorage.setItem("fromUnit", fromValue);
      localStorage.setItem("toUnit", toValue);
      localStorage.setItem("precision", precisionValue);
    } catch (error) {
      result.textContent = "無効な数式です。";
    }
  }

  function swapUnits() {
    const temp = from.value;
    from.value = to.value;
    to.value = temp;
    convert();
  }

  input.addEventListener("input", convert);
  from.addEventListener("change", () => { changeColor(from); convert(); });
  to.addEventListener("change", () => { changeColor(to); convert(); });
  precisionInput.addEventListener("input", convert);
  swapButton.addEventListener("click", swapUnits);

  convert(); 
});
