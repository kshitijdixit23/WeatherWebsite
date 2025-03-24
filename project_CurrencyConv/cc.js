//fethcing current rates api.

const Apikey="11c43b330f7f3e00f67a6a8cc784a974";
const myurl = `https://api.exchangeratesapi.io/latest?access_key=${"11c43b330f7f3e00f67a6a8cc784a974"}`
var fetchProgram = async () => {
  let repsonse = await fetch(myurl);
  let data = await repsonse.json();
  console.log(data);
  return data.rates;
};

const hugeContainer = document.querySelectorAll(".hugeContainer select");
for (let select of hugeContainer) {
  for (let code in countryList) {
    let newOption = document.createElement("option");
    newOption.innerText = code;
    newOption.value = code;
    if (select.id === "From" && code === "USD") {
      newOption.selected = "selected";
    } else if (select.id === "To" && code === "INR") {
      newOption.selected = "selected";
    }
    select.append(newOption);
  }
}

//To update the flag.
const updateFlag = (element) => {
  let code = element.value;
  let countryCode = countryList[code];
  let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
  let img = element.parentElement.querySelector("img");
  img.src = newSrc;
};
hugeContainer.forEach((select) => {
  select.addEventListener("change", (evt) => {
    updateFlag(evt.target);
  });
});

//to get the userInput.

function getUserInput() {
  let From = document.getElementById("From").value;
  let To = document.getElementById("To").value;
  let inputField = document.getElementById("number").value;
  if (!inputField || isNaN(inputField) || inputField <= 0) {
    alert("Please Enter Your Amount:");
  } else {
    return { From, To, inputField: Number(inputField) };
  }
}

// to calculate current rates.

async function getCurrency() {
  try {
    const rates = await fetchProgram();
    if (!rates) {
      throw new Error("Failed to fetch exchange rates.");
    }
    const userInput = getUserInput();
    if (!userInput) {
      throw new Error("Invalid Input. Please enter a valid amount.");
    }
    const { From, To, inputField } = userInput;
    const fromCurrency = rates[From];
    const toCurrency = rates[To];
    if (!fromCurrency || !toCurrency) {
      throw new Error("Invalid currency selection.");
    }
    const ConvertedRate = (inputField / fromCurrency) * toCurrency;
    document.getElementById("convertedRate").value = `${inputField} ${From} = ${ConvertedRate.toFixed(2)} ${To}`;
  } catch (error) {
    console.error("Error in getCurrency:", error);
    alert(error.message);
  }
}


// adding event listener.

document.querySelector("#resultant").addEventListener("click", getCurrency);
