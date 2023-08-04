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
    document.addEventListener("animationstart", ((event) => {
      if (event.animationName == "slidein") {
        setTimeout(() => replaceChars(event.target), 2200);
        setTimeout(() => triggerLaserAnimation(), 2200);
        setTimeout(() => generateSparks(event.target), 2200);
      }
    }));

    document.addEventListener("animationiteration", ((event) => {
      if (event.animationName == "slidein") {
        event.target.children[0].innerText = "111010";
        event.target.children[1].innerText = "";
        setTimeout(() => replaceChars(event.target), 2200);
        setTimeout(() => triggerLaserAnimation(), 2200);
        setTimeout(() => generateSparks(event.target), 2200);
      }
    }));

    async function replaceChars(element) {
      while (element.children[0].innerText != "") {
        element.children[0].innerText = element.children[0].innerText.slice(0, -1);
        element.children[1].innerText += 8;
        await new Promise(r => setTimeout(r, 50));
      }
    }

    function triggerLaserAnimation() {
      document.body.classList.add("animate");
      setTimeout(() => stopLaserAnimation(), 500);
    }

    function stopLaserAnimation() {
      document.body.classList.remove("animate");
    }

    function generateSparks(emitter) {
      // Loop to generate 30 particles at once
      for (let i = 0; i < 30; i++) {
        // We pass the mouse coordinates to the createParticle() function
        createSpark(emitter.offsetTop);
      }
    }

    function createSpark(y) {
      // Create a custom particle element
      const spark = document.createElement('spark');
      // Append the element into the body
      document.body.appendChild(spark);
      // Calculate a random spark thickness from 1px to 5px
      const thickness = Math.floor(Math.random() * 3 + 1);
      const length = thickness * 5;
      // Apply the size on each particle
      spark.style.width = `${length}px`;
      spark.style.height = `${thickness}px`;
      // Generate a random color in a light yellow palette
      spark.style.background = `hsl(47, 100%, ${Math.random() * 20 + 70}%)`;
      // Generate a random x & y destination within a distance of the impact point. The random bit is used to specify a
      // side to the direction of the spark. The distance is the last part of the equation. The whole equation is used
      // as a basis to determine how far the sparks go each frame.
      const destinationX = spark.style.left + (Math.random() - 0.5) * 2 * (window.screen.width / 5);
      const frame2X = destinationX * 1.20;
      const frame3X = frame2X * 1.15;
      const frame4X = frame3X * 1.15;
      const frame5X = frame4X * 1.15;
      const destinationY = y + (Math.random() - 0.5) * 2 * 50;
      const frame2Y = destinationY + 50;
      const frame3Y = frame2Y + 60;
      const frame4Y = frame3Y + 100;
      const frame5Y = frame4Y + 120;
      const frame2angle = Math.atan(frame2Y / frame2X) * 180;
      const frame3angle = Math.atan(frame3Y / frame3X) * 180;
      const frame4angle = Math.atan(frame4Y / frame4X) * 180;
      const frame5angle = Math.atan(frame5Y / frame5X) * 180;
      // Store the animation in a variable because we will need it later to destroy the element when the anim stops.
      const animation = spark.animate([
        {
          // Set the origin position of the particle
          // We offset the particle with half its size to center it around the laser
          transform: `translate(${spark.style.left - (length / 2)}px, ${y - (thickness / 2)}px)`,
          opacity: 1
        },
        {
          // We define the arc of the animation with a series of transform frames.
          transform: `translate(${frame2X}px, ${frame2Y}px)) rotate(${frame2angle}deg`,
          opacity: 1
        },
        {
          transform: `translate(${frame3X}px, ${frame3Y}px) rotate(${frame3angle - frame2angle}deg`,
          opacity: 1
        },
        {
          transform: `translate(${frame4X}px, ${frame4Y}px) rotate(${frame4angle - frame3angle}deg`,
          opacity: 1
        },
        {
          transform: `translate(${frame5X}px, ${frame5Y}px) rotate(${frame5angle - frame4angle}deg`,
          opacity: 1
        }
      ], {
        // Set a random duration from 300 to 750ms. The first number is the minimum duration, the sum of both numbers
        // is the maximum.
        duration: 300 + Math.random() * 450,
        // Delay every particle with a random value from 0ms to 200ms
        delay: Math.random() * 200
      });
      // When the animation is finished, remove the element from the DOM
      animation.onfinish = () => {
        spark.remove();
      };
    }
  }

  const [binaryDecimalInput, decimalBinaryInput, binaryDecimalOutput, decimalBinaryOutput, binaryDecimalButton, decimalBinaryButton] = captureConverterElements();
  resetInputs(binaryDecimalInput, decimalBinaryInput);
  resetButtons(binaryDecimalButton, decimalBinaryButton);
  setEventListenersOnConverter([binaryDecimalInput, decimalBinaryInput], [binaryDecimalOutput, decimalBinaryOutput], [binaryDecimalButton, decimalBinaryButton]);
  animateBackground();
}

main();
