# Binary / Decimal Converter
It was initially supposed to be a simple single-page converter, though I took the opportunity to do a little bit of front-end and try something creative. In that case, I experimented a bit with animations and generating particles.

The background is done entirely in HTML, CSS and JavaScript with no frameworks or external libraries. The basis is a gradient coloring forming a laser-like background, and several divs of binary numbers floating left to right and being converted to decimal as they go through the laser. The laser itself flashes whenever a div passes through, and sparks are generated whenever a number is removed of added to the div.

The flashing is done by toggling a class on the body of the page which starts an animation, switching between two different gradients rapidly for a short time.

For the particles, I based myself on [an article by Louis Hoebregts](https://css-tricks.com/playing-with-particles-using-the-web-animations-api/) and adapted his code to my needs, since I needed sparks. The sparks are custom elements with a bit of randomization in their size and color, and a few frames of transformation, as I attempted to give them believable qualities.

All in all, I'm rather satisfied by the end result. It's probably a bit too visually busy for what it is, but it was for the exercise more than anything so I don't really mind.

Things TODO : generate the scrolling code and its conversion automatically, ensure that it's responsive, improve on the particle effects to make more believable sparks, add a button to toggle the background on and off, add a floating dust effect to the background.
