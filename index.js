function main() {
  function captureConverterElements() {
    const [binaryDecimalInput, decimalBinaryInput] = captureInputs();
    const [binaryDecimalOutput, decimalBinaryOutput] = captureOutputs();
    const [binaryDecimalButton, decimalBinaryButton] = captureButtons();
    return [binaryDecimalInput, decimalBinaryInput, binaryDecimalOutput, decimalBinaryOutput, binaryDecimalButton, decimalBinaryButton];
  }

  function resetInputs(binaryDecimalInput, decimalBinaryInput) {
    binaryDecimalInput.value = "";
    decimalBinaryInput.value = "";
  }

  function resetButtons(binaryDecimalButton, decimalBinaryButton) {
    binaryDecimalButton.setAttribute("disabled", "");
    decimalBinaryButton.setAttribute("disabled", "");
  }

  function setEventListenersOnConverter(inputs, outputs, buttons) {
    detectKeyPress(inputs, buttons);
    placeEventListenersOnButtons(inputs, outputs, buttons);
  }

  function captureInputs() {
    const binaryDecimalInput = document.querySelector("#binary-to-decimal");
    const decimalBinaryInput = document.querySelector("#decimal-to-binary");
    return [binaryDecimalInput, decimalBinaryInput];
  }

  function captureOutputs() {
    const binaryDecimalOutput = document.querySelector(".btd-result");
    const decimalBinaryOutput = document.querySelector(".dtb-result");
    return [binaryDecimalOutput, decimalBinaryOutput];
  }

  function captureButtons() {
    const binaryDecimalButton = document.querySelector(".btd-convert");
    const decimalBinaryButton = document.querySelector(".dtb-convert");
    return [binaryDecimalButton, decimalBinaryButton];
  }

  function detectKeyPress(inputs, buttons) {
    // Strangely, creating a separate function and asking the event listener to fire it doesn't seem to work.
    // But an anonymous function does.
    inputs.forEach(input => {
      input.addEventListener("keyup", (event) => {
        if (isNaN(parseInt(inputs[0].value))) {
          buttons[0].setAttribute("disabled", "");
        }
        else {
          buttons[0].removeAttribute("disabled");
        }
        if (isNaN(parseInt(inputs[1].value))) {
          buttons[1].setAttribute("disabled", "");
        }
        else {
          buttons[1].removeAttribute("disabled");
        }
      });
    });
  }

  function placeEventListenersOnButtons(inputs, outputs, buttons) {
    addListenerOnBinaryToDecimalButton();
    addListenerOnDecimalToBinaryButton();
  }

  function addListenerOnBinaryToDecimalButton() {
    binaryDecimalButton.addEventListener("click", ((event) => {
      const reversedBinary = reverseString(binaryDecimalInput.value);
      let num = 0;
      for (let i = 0; i <= reversedBinary.length - 1; i++) {
        if (reversedBinary[i] != "1" && reversedBinary[i] != "0") {
          binaryDecimalOutput.innerText = "That's no binary!";
          return console.log("That's no binary!");
        }
        // The following is done to respect the "single mathematical function" condition for calculating the value of
        // a binary digit. By multiplicating the exponential by either 1 or 0 depending on the value of the binary
        // digit, you essentially ignore "0" values.
        num += parseInt(reversedBinary[i]) * (2 ** i);
      }
      binaryDecimalOutput.innerText = num;
    }));
  }

  function reverseString(string) {
    let reversedString = "";
    for (let i = string.length - 1; i >= 0; i--) {
      reversedString += string[i];
    }
    return reversedString;
  }

  function addListenerOnDecimalToBinaryButton() {
    decimalBinaryButton.addEventListener("click", ((event) => {
      let decimalValue = parseInt(decimalBinaryInput.value);
      // Il faut toujours au moins 1 bit.
      let binDigits = 1;
      // Cette boucle n'est lancée qu'à partir d'une valeur décimale de 2. A chaque fois qu'un pallier est atteint (une
      // puissance de 2), un nouveau bit est "débloqué". Si le décimal entré est 31, par exemple, la boucle ne sera pas
      // relancée à 2 ** 5 = 32, et le nombre de digits sera bloqué à 1 + 4 boucles = 5. Mais pour une valeur de 32,
      // l'égalité avec 2 ** 5 relancera la boucle et débloquera le bit suivant.
      for (let i = 1; 2 ** i <= decimalValue; i++) {
        binDigits += 1;
      }
      let binaryString = "";
      for (let i = binDigits; i > 0; i--) {
        if (decimalValue >= 2 ** (i - 1)) {
          binaryString += "1";
          decimalValue -= 2 ** (i - 1);
        } else {
          binaryString += "0";
        }
      }
      decimalBinaryOutput.innerText = binaryString;
    }));
  }

  function animateBackground() {
    const scrollingElements = document.querySelectorAll(".scrolling-code");

    document.addEventListener("animationstart", ((event) => {
      if (event.animationName == "slidein") {
        setTimeout(() => replaceChars(event.target), 2000);
      }
    }));

    document.addEventListener("animationiteration", ((event) => {
      if (event.animationName == "slidein") {
        event.target.children[0].innerText = "011101";
        event.target.children[1].innerText = "";
        setTimeout(() => replaceChars(event.target), 2000);
      }
    }));

    async function replaceChars(element) {
      while (element.children[0].innerText != "") {
        element.children[0].innerText = element.children[0].innerText.slice(0, -1);
        element.children[1].innerText += 8;
        await new Promise(r => setTimeout(r, 50));
      }
    }
  }

  const [binaryDecimalInput, decimalBinaryInput, binaryDecimalOutput, decimalBinaryOutput, binaryDecimalButton, decimalBinaryButton] = captureConverterElements();
  resetInputs(binaryDecimalInput, decimalBinaryInput);
  resetButtons(binaryDecimalButton, decimalBinaryButton);
  setEventListenersOnConverter([binaryDecimalInput, decimalBinaryInput], [binaryDecimalOutput, decimalBinaryOutput], [binaryDecimalButton, decimalBinaryButton]);
  animateBackground();
}

main();
