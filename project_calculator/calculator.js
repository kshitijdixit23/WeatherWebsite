function Solve(val) {
  const inputField = document.getElementById("numbers");
  inputField.value += val;
}

function Result() {
  let num1 = document.getElementById("numbers").value;
  num1 = num1.replace("X", "*"); 
  const validPattern = /^[0-9+\-*/.%]+$/; 
  if (!validPattern.test(num1)) {
    document.getElementById("numbers").value = "Error";
    return;
  }
  try {
    const num2 = math.evaluate(num1); 
    document.getElementById("numbers").value = num2;
  } catch {
    document.getElementById("numbers").value = "Error"; 
  }
}

function Close() {
  const field = document.getElementById("numbers");
  field.value = "";
}

function Remove() {
  const inpfiel = document.getElementById("numbers");
  inpfiel.value = inpfiel.value.slice(0, -1);
}

document.addEventListener("keydown", function (event) {
  const key = event.key;
  const validKeys = "0123456789+-*/.%";
  if (validKeys.includes(key)) {
    Solve(key);
  } else if (key === "Enter") {
    Result();
  } else if (key === "Backspace") {
    Remove();
  } else if (key === "c" || key === "C") {
    Close();
  }
});
