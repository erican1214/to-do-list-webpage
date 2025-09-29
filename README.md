# To-Do List Webpage
## About
This webpage is for you to type any tasks you want to do and save them temporarily. Reloading the webpage will erase your tasks. The task functions are somewhat limited because the webpage is more focused on creating an aesthetically pleasing interface. The colors, pictures, and audio are themed after Love and Deepspace. (As of now, there are no voice files, so only the music button workds.)

## Important Information
### Applications Needed
- Node.js
- VSCode (or any IDE)
- Google Chrome (or any browser)

### Packages Needed
- Express.js (The libraries and dependencies can be found in package-lock.json)

- To install Express.js, navigate to the project directory, and run the following command prompts (for Windows, use npm.cmd instead of npm)
    - npm init -y
    - npm install express

- More command prompts if necessary
    - npm install ejs

### How to run webpage
- Navigate the project directory
- Type "node server.js" if you are only interacting
- Type "npm run dev" if you want to continuously edit this webpage (for Windows, use npm.cmd instead of npm)
- Go on your browser and type "localhost:3000" in the search bar

### Compatability/Accessibility
- I have only tested this webpage on a Google Chrome Browser. Let me know if it is not compatible with other browsers.
- Although this is responsive on mobile devices, a couple of features are hidden when used on mobile devices in portrait mode. The width of webpage must be at least 600px to access all features

### Image Attributions
- [audio_icon.png](https://www.freepik.com/free-vector/bright-megaphone-design_138418344.htm)
- [checkmark.png](https://www.flaticon.com/free-icons/checkbox)
- [music_icon.png](https://www.freepik.com/free-vector/bright-music-note_145290248.htm)
- [star_button.png](https://www.freepik.com/free-vector/star-user-interfase-button_137585895.htm)

- All other images, voicelines, and music are from Love and Deepspace by Paper Games.

## File Overview
&larr; README.md
- This file currently, shows details about how this webpage works

&larr; index.ejs
- HTML file that shows content of the webpage

&larr; style.css
- CSS file that customizes that content of the webpage

&larr; script.js
- Javascript file that adds interaction to the webpage and listens for events

&larr; server.js
- Javascript file that connects the code to server

&larr; package.json, package-lock.json
- Shows the necessary libraries/packages/dependencies for Node.js to run Express.js