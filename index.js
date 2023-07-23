function main() {
  function captureElements() {
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

  function setEventListeners(inputs, outputs, buttons) {
    detectKeyPress(inputs, buttons);
    placeEventListenersOnButtons(buttons, outputs);
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

  function placeEventListenersOnButtons(buttons, outputs) {
    buttons[0].addEventListener("click", convertToDecimal(outputs[0]));
    buttons[1].addEventListener("click", convertToBinary(outputs[1]));
  }

  function convertToDecimal(binaryToDecimalOutput) {

  }

  function convertToBinary(decimalToBinaryOutput) {

  }

  const [binaryDecimalInput, decimalBinaryInput, binaryDecimalOutput, decimalBinaryOutput, binaryDecimalButton, decimalBinaryButton] = captureElements();
  resetInputs(binaryDecimalInput, decimalBinaryInput);
  resetButtons(binaryDecimalButton, decimalBinaryButton);
  setEventListeners([binaryDecimalInput, decimalBinaryInput], [binaryDecimalOutput, decimalBinaryOutput], [binaryDecimalButton, decimalBinaryButton]);
}

main();
