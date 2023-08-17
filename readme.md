# Binary / Decimal Converter
## Summary
It was initially supposed to be a simple single-page converter, though I took the opportunity to do a little bit of front-end and try something creative. In that case, I experimented a bit with... a lot of things, actually. CSS variables, animations, clip-paths, particle generation.

The background is done entirely in HTML, CSS and JavaScript with no frameworks or external libraries. The basis is a gradient coloring forming a laser-like background, and several divs of binary numbers floating left to right and being converted to decimal as they go through the laser. The laser itself flashes whenever a scolling div of binary code passes through, and sparks are generated whenever a number is removed or added to the div.

The flashing is done by playing an animation in JavaScript, switching between two different background gradients rapidly for a short time.

I applied a polygonal clip-path on my buttons to shave off two of their corners, and created a few rectangular divs which I rotated and positioned to mimics new borders and give the buttons chamfered corners. Their class list is manipulated in JavaScript to follow the disabled/enabled appearance of the buttons.

For the particles, I based myself on [an article by Louis Hoebregts](https://css-tricks.com/playing-with-particles-using-the-web-animations-api/) and adapted his code to my needs, since I needed sparks. The sparks are custom elements with a bit of randomization in their size and color, and a few frames of transformation, as I attempted to give them believable physics.

All in all, I'm rather satisfied by the end result. It's probably a bit too visually busy for what it is, but it was for the exercise more than anything so I don't really mind.

## TODO
- relocate the spark emission points on the Y axis so that it maps better to their assignated div,
- pause the animation if the tab is unfocused,
- style the text input fields,
- randomize the Y position of scrolling code divs for each iteration of the animation,
- ensure that it's responsive,
- generate sparks for each removed or added digit in the direction of the change and with slightly different colors to match the color of the code,
- add a button to toggle the background on and off,
- choose a better main font,
- time the digit deletion/addition better,
- add a floating dust effect to the background.
