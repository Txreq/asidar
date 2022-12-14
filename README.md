# Asidar
Asidar desktop application allows you to download youtube videos and convert them into mp3 format, so that you can listen to them on your desktop or laptop. The application is really easy to use, and it only takes a few clicks to download your favorite videos. Asidar is currently available for Windows computers only.

<a href="https://github.com/Txreq/asidar/releases">
  <img src="https://i.ibb.co/fq4dXm1/Frame-6.png" />
</a>

> *NOTE*: you have to install ffmpeg into your machine first in order to get our app working, <a href="https://www.youtube.com/watch?v=IECI72XEox0">here</a> is a video tutorial if you have no idea of what I'm talking about.

## Installation
> This application is based on <a href="https://github.com/Txreq/reactron">reactron.js</a> template.

*for devs*
```
git clone https://github.com/Txreq/reactron my-app
cd my-app
npm install
```
If you want to make your own app using our library, check <a href="https://github.com/Txreq/asidar-lib">here</a>
## Commands

###  `npm run webpack:compile`
Runs webpack which create one bundle file

###  `npm run electron:serve`
Runs the app in the development mode.
A chromium window will pop-up which will allow you to see the changes you make in `./src` folder, with the web-developer-tools detached from the main window, allows you see any lint errors in the console.

You can change the mode to:

```js
"detach" | "unlocked" | "left" | "right" | "bottom"
```
###  `npm run electron:prod`
It builds the react app for production to the `build` folder and load the `build/index.html` into a chromium window.

*IT DOES NOT PACKAGE THE ENTIRE APP !*

###  `npm run electron:build`
This command builds the react app for the `build` folder and correctly bundles React in production mode and optimizes the build for the best performance. Then packages the entire app into an exectable file found in `dist/` folder

It runs the `builder.js` in order to that, all the build properties will be there (product name, icons, ...)

Of course, you can use another packager such as [electron-forge](https://www.electronforge.io/) or [electron-packager](https://github.com/electron/electron-packager) (read each's documentation and configure it by yourself)

## Code Protection
the boilerplate uses [bytenode](https://github.com/bytenode/bytenode) in order to compile the `app/index.js` to v8-enginge's binaries and store it in the `public` folder as `app.jsc`, then package all the app resources in one asar file.

