const conversionRates = {
  centimeter: 0.01,
  meter: 1,
  kilometer: 1000,
  micrometer: 0.000001,
  nanometer: 0.000000001,
  mile: 1/1609.344,
  yard: 1/0.9144,
  foot: 1/0.3048,
  inch: 1/0.254,
  furlong: 1/201.168,
  chain: 1/20.1168,
  mickey: 1/25.4,
  nautical: 0.00053995680345572,
  au: 1/149597870700,
  ly: 1/9460730472580800,
  cun: 1/(10/33),
  shaku: 10/(10/33),
  ken:  60/(10/33),
  jō: 100/(10/33),
  chō:  360/(10/33),
  li: 12960/(10/33),
  bohr: 1/0.0000000000529177210544,
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

function changeColor(hoge){
    if( hoge.value == 0 ){
        hoge.style.color = '';
    }else{
        hoge.style.color = 'black';
    }
}

const input = document.getElementById("inputValue");
const from = document.getElementById("fromUnit");
const to = document.getElementById("toUnit");
const result = document.getElementById("result");
const swapButton = document.getElementById("swapButton");
document.getElementById("precision").addEventListener("input", convert);


function convert() {
  try {
    const expression = input.value.trim();
    const fromValue = from.value;
    const toValue = to.value;
 const precisionValue = document.getElementById("precision").value;
const precision = Math.min(1000, Math.max(0, parseInt(precisionValue) || 0)); // ← 最大100に制限

    // 単位未選択チェック
    if (!fromValue || !toValue) {
      result.textContent = "両方の単位を選択してください。";
      return;
    }

    // 数式評価（math.js）
    const value = math.evaluate(expression);
    if (!isFinite(value)) {
      result.textContent = "式の評価に失敗しました。";
      return;
    }

    // 換算
    const meterValue = value / conversionRates[fromValue];
    const convertedValue = meterValue * conversionRates[toValue];
    const unitSymbol = unitSymbols[toValue] || toValue;
result.textContent = `${convertedValue.toFixed(precision)} ${unitSymbol}`;

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
    from.addEventListener("change", convert);
    to.addEventListener("change", convert);
    swapButton.addEventListener("click", swapUnits);
