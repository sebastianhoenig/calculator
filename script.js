let used_equal = false;
let numberButtons = Array.from(document.querySelectorAll(".number"));
let operators = document.querySelectorAll(".operation");
let ac = document.querySelector(".ac");
let output = document.getElementById("output");
let history = document.getElementById("history");
let equal = document.querySelector(".equal");
let del = document.querySelector(".del");

function add(a, b) {
  return a + b;
}

function substract(a, b) {
  return a - b;
}

function multiply(a, b) {
  return a * b;
}

function divide(a, b) {
  return a / b;
}

function mod(a, b) {
  return a % b;
}

function operate(op, a, b) {
  if (op == "+") {
    return add(a, b);
  } else if (op == "-") {
    return substract(a, b);
  } else if (op == "*") {
    return multiply(a, b);
  } else if (op == "/") {
    return divide(a, b);
  } else if (op == "%") {
    return mod(a, b);
  }
}

function getHistory() {
  return document.getElementById("history").innerText;
}

function updateHistory(num) {
  document.getElementById("history").innerText = num;
}

function getOutput() {
  return document.getElementById("output").innerText;
}

function updateOutput(num) {
  document.getElementById("output").innerText = num;
}

for (i = 0; i < numberButtons.length; i++) {
  numberButtons[i].addEventListener("click", function () {
    let output = getOutput();
    if (used_equal === false) {
      if (this.innerText === ".") {
        if (output === "") {
          updateOutput("");
        } else if (output.includes(".")) {
          updateOutput(output);
        } else {
          output += this.innerText.toString();
          updateOutput(output);
        }
      } else {
        output += this.innerText.toString();
        updateOutput(output);
      }
    } else {
      updateOutput(this.innerText.toString());
      used_equal = false;
    }
  });
}

for (j = 0; j < operators.length; j++) {
  operators[j].addEventListener("click", function () {
    let output = getOutput();
    let history = getHistory();
    if (history === "") {
      updateHistory(output + this.innerText);
      updateOutput("");
    } else {
      let operator = history.slice(-1);
      let old_val = history.slice(0, -1);
      switch (operator) {
        case "+":
          computation = add(parseFloat(old_val), parseFloat(output));
          break;
        case "-":
          computation = substract(parseFloat(old_val), parseFloat(output));
          break;
        case "*":
          computation = multiply(parseFloat(old_val), parseFloat(output));
          break;
        case "/":
          computation = divide(parseFloat(old_val), parseFloat(output));
          break;
        default:
          return;
      }
      updateHistory(computation.toString() + this.innerText);
      updateOutput("");
    }
  });
}

ac.addEventListener("click", function () {
  updateOutput("");
  updateHistory("");
});

equal.addEventListener("click", function () {
  let output = getOutput();
  let history = getHistory();
  if (history === "" || output === "") {
    updateHistory(history);
    updateOutput(output);
  } else {
    let operator = history.slice(-1);
    let old_val = history.slice(0, -1);
    switch (operator) {
      case "+":
        computation = add(parseFloat(old_val), parseFloat(output));
        break;
      case "-":
        computation = substract(parseFloat(old_val), parseFloat(output));
        break;
      case "*":
        computation = multiply(parseFloat(old_val), parseFloat(output));
        break;
      case "/":
        computation = divide(parseFloat(old_val), parseFloat(output));
        break;
      default:
        return;
    }
    updateHistory("");
    updateOutput(computation.toString());
    used_equal = true;
  }
});

del.addEventListener("click", function () {
  let output = getOutput();
  if (output === "") {
    updateOutput("");
  } else {
    let new_output = output.slice(0, -1);
    updateOutput(new_output);
  }
});
