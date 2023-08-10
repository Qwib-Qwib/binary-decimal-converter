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
    setScrollingCodeInitialValues();
    document.addEventListener("animationstart", ((event) => {
      if (event.animationName == "slidein") {
        setTimeout(() => replaceChars(event.target), 2200);
        setTimeout(() => triggerLaserAnimation(), 2200);
        setTimeout(() => generateSparks(event.target), 2200);
      }
    }));

    document.addEventListener("animationiteration", ((event) => {
      if (event.animationName == "slidein") {
        setScrollingCodeNewValue(event.target.children[0]);
        event.target.children[1].innerText = "";
        setTimeout(() => replaceChars(event.target), 2200);
        setTimeout(() => triggerLaserAnimation(), 2200);
        setTimeout(() => generateSparks(event.target), 2200);
      }
    }));

    async function replaceChars(element) {
      // Ce passage jusqu'à num = num.toString(); est une variante du convertisseur dans addListenerOnBinaryToDecimalButton().
      // Ca serait bien de transformer un peu l'original pour pouvoir le rappeler au lieu de réécrire une partie du code ici.
      const reversedBinary = reverseString(element.children[0].innerText);
      let num = 0;
      for (let i = 0; i <= reversedBinary.length - 1; i++) {
        num += parseInt(reversedBinary[i]) * (2 ** i);
      }
      num = num.toString();
      while (element.children[0].innerText != "") {
        element.children[0].innerText = element.children[0].innerText.slice(0, -1);
        if (num != "") {
          element.children[1].innerText = num[num.length - 1] + element.children[1].innerText;
          num = num.slice(0, -1);
        }
        await new Promise(r => setTimeout(r, 50));
      }
    }

    function triggerLaserAnimation() {
      const animation = document.body.animate([
        {
          background: 'linear-gradient(0.25turn, #111111 48%, #455e2d 49.5%, #99D063 50%, #455e2d 50.5%, #111111 52%)',
          offset: 0
        },
        {
          background: 'linear-gradient(0.25turn, #111111 48%, #6d914b 49.5%, #b1e280 50%, #6d914b 50.5%, #111111 52%)',
          offset: 0.5
        },
        {
          background: 'linear-gradient(0.25turn, #111111 48%, #455e2d 49.5%, #99D063 50%, #455e2d 50.5%, #111111 52%)',
          offset: 0.75
        },
        {
          background: 'linear-gradient(0.25turn, #111111 48%, #6d914b 49.5%, #b1e280 50%, #6d914b 50.5%, #111111 52%)',
          offset: 0.82
        },
        {
          background: 'linear-gradient(0.25turn, #111111 48%, #455e2d 49.5%, #99D063 50%, #455e2d 50.5%, #111111 52%)',
          offset: 0.90
        },
        {
          background: 'linear-gradient(0.25turn, #111111 48%, #6d914b 49.5%, #b1e280 50%, #6d914b 50.5%, #111111 52%)',
          offset: 1
        }
      ], {
        duration: 500,
        delay: 0
      });
      animation.play();
    }

    function generateSparks(emitter) {
      // Loop to generate 30 particles at once
      for (let i = 0; i < 30; i++) {
        // We pass the emitter Y offset to the createParticle() function.
        createSpark(emitter.offsetTop);
      }
    }

    function createSpark(y) {
      // Creates a custom particle element. The "y" argument is the emitter's offset from the top of the screen, and is
      // used later to translate the spark to its proper place and recalculate the rotation angle each frame.
      const spark = document.createElement('spark');
      // Appends the element into the body. Right now, it's not at its proper place, its at the top of the screen.
      document.body.appendChild(spark);
      // Calculate a random spark thickness from 1px to 5px
      const thickness = Math.floor(Math.random() * 3 + 1);
      const length = thickness * 5;
      // Apply the size on each particle
      spark.style.width = `${length}px`;
      spark.style.height = `${thickness}px`;
      // Generate a random color in a light yellow palette
      spark.style.background = `hsl(47, 100%, ${Math.random() * 20 + 70}%)`;
      // The following generates the position of a spark over several frames.
      // The impulseX bit is used to specify a side and initial emission force for the spark on the X axis. The max
      // distance is the last multiplier.
      // The minImpulseX determines the minimum projection distance. Here it's 80px, applied in the same direction as
      // the previously calculated impulseX.
      const impulseX = (Math.random() - 0.5) * 2 * (window.screen.width / 6);
      const minImpulseX = Math.sign(impulseX) * 80;
      const frame2X = minImpulseX + impulseX;
      const frame3X = frame2X * 1.40;
      const frame4X = frame3X * 1.35;
      const frame5X = frame4X * 1.20;
      const frame6X = frame5X * 1.10;
      // A translate property takes offsets of the original position. Here, the original (x; y) position for a spark is
      // (screen / 2; 0), because a spark is always emitted from the horizontal halfway point of the screen, but its
      // Y position varies depending on which "scrolling code" element emits it.
      // Therefore, the previously calculated impulse X is immediately useable as an offset, but in order to properly
      // place the spark on the Y axis, we have to first translate it to the level of the emitter, then take into
      // account this offset for all further translations and rotations.
      const frame2Y = y + (Math.random() - 0.5) * 2 * (window.screen.height / 12);
      const frame3Y = frame2Y + 20;
      const frame4Y = frame3Y + 40;
      const frame5Y = frame4Y + 70;
      const frame6Y = frame5Y + 90;
      // The rotate values are also applied according to the original position of the element. For each frame, we
      // recalculate the angle of the element by redrawing a rectangle triangle to each new point from the scrolling
      // code emitter element.
      const frame2angle = Math.atan((frame2Y - y) / frame2X) * 180;
      const frame3angle = Math.atan((frame3Y - y) / frame3X) * 180;
      const frame4angle = Math.atan((frame4Y - y) / frame4X) * 180;
      const frame5angle = Math.atan((frame5Y - y) / frame5X) * 180;
      const frame6angle = Math.atan((frame6Y - y) / frame6X) * 180;
      // Store the animation in a variable because we will need it later to destroy the element when the anim stops.
      const animation = spark.animate([
        {
          // Sets the origin position of the particle.
          // The original x position is automatically set by the CSS, it's always the same: the horizontal halfway point.
          // However, the y offset changes with every possible scrolling code emitter, so the spark is translated from
          // the top to its emission point here. The implication is that the actual origin point used as a reference
          // for all the translations and rotations is at the top of the screen.
          // We offset the particle with half its size to center it around the laser
          transform: `translate(${length / 2}px, ${y - (thickness / 2)}px) rotate(${frame2angle}deg)`,
          opacity: 1
        },
        {
          // We define the arc of the animation with a series of transform frames.
          transform: `translate(${frame2X}px, ${frame2Y}px) rotate(${frame3angle}deg)`,
          opacity: 1
        },
        {
          transform: `translate(${frame3X}px, ${frame3Y}px) rotate(${frame4angle}deg)`,
          opacity: 1
        },
        {
          transform: `translate(${frame4X}px, ${frame4Y}px) rotate(${frame5angle}deg)`,
          opacity: 1
        },
        {
          transform: `translate(${frame5X}px, ${frame5Y}px) rotate(${frame6angle}deg)`,
          opacity: 1
        },
        {
          transform: `translate(${frame6X}px, ${frame6Y}px) rotate(${frame6angle}deg)`,
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

  function setScrollingCodeInitialValues() {
    const scrollingCodesList = document.querySelectorAll(".scrolling-binary");
    scrollingCodesList.forEach((binaryFragment) => {
      setScrollingCodeNewValue(binaryFragment);
    })
  }

  function setScrollingCodeNewValue(scrollingCode) {
    let binaryValue = "";
    for(let i = 0; i < 7; i++) {
      binaryValue += Math.round(Math.random());
    }
    scrollingCode.innerText = binaryValue;
  }

  const [binaryDecimalInput, decimalBinaryInput, binaryDecimalOutput, decimalBinaryOutput, binaryDecimalButton, decimalBinaryButton] = captureConverterElements();
  resetInputs(binaryDecimalInput, decimalBinaryInput);
  resetButtons(binaryDecimalButton, decimalBinaryButton);
  setEventListenersOnConverter([binaryDecimalInput, decimalBinaryInput], [binaryDecimalOutput, decimalBinaryOutput], [binaryDecimalButton, decimalBinaryButton]);
  animateBackground();
}

main();
