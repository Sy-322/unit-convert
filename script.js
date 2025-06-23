const conversionRates = {
  centimeter: 0.01,
  meter: 1,
  kilometer: 0.001,
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
  cun: 1/0.0303,
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
function convert() {
  try {
    const expression = input.value.trim();
    const fromValue = from.value;
    const toValue = to.value;
    const precisionValue = document.getElementById("precision").value;
    const precision = Math.max(0, parseInt(precisionValue) || 0);

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
    result.textContent = `${convertedValue.toFixed(precision)} ${to.options[to.selectedIndex].text}`;
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
