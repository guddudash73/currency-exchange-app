let baseUrl = "https://api.frankfurter.app/latest?";
let dropDown = document.querySelectorAll(".dropdown select");
let amount = document.querySelector("input");
let fromCurr = document.querySelector(".from select");
let toCurr = document.querySelector(".to select");
let msg = document.querySelector(".msg");
let currUrl = "https://api.frankfurter.app/currencies";
let btn = document.querySelector(".btn");

// let currencies = async () => {
//   let curr = await fetch(currUrl);
//   curr = await curr.json();
// };
for (let select of dropDown) {
  for (currCode in countryList) {
    let newOption = document.createElement("option");
    newOption.innerText = currCode;
    newOption.value = currCode;
    if (select.name === "from" && currCode === "USD") {
      newOption.selected = "selected";
    } else if (select.name === "to" && currCode === "INR") {
      newOption.selected = "selected";
    }
    select.append(newOption);
  }
  select.addEventListener("change", (evt) => {
    changeFlag(evt.target);
  });
}

let changeFlag = (element) => {
  countryName = countryList[element.value];
  let img = element.parentElement.querySelector("img");
  img.src = `https://flagsapi.com/${countryName}/flat/64.png`;
};

let getExchange = async () => {
  amt = amount.value;
  to = toCurr.value;
  from = fromCurr.value;
  rate = await fetch(`${baseUrl}amount=${amt}&from=${from}&to=${to}`);
  rate = await rate.json();
  finalAmount = rate.rates[`${to}`];
  msg.innerText = `${amt} ${from} = ${finalAmount} ${to} `;
};

btn.addEventListener("click", (evt) => {
  evt.preventDefault();
  getExchange();
});
