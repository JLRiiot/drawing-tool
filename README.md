## Table of Contents

1. [Architecture](#architecture)
   - [View](#view)
   - [Viewmodel](#viewmodel)
   - [Model](#model)
   - [Testing](#testing)
2. [Caveats of this architecture](#caveats-of-this-architecture)
3. [Create React App](#create-react-app)
   - [Available Scripts](#available-scripts)
     - [`npm start`](#npm-start)
     - [`npm test`](#npm-test)
     - [`npm run build`](#npm-run-build)
     - [`npm run eject`](#npm-run-eject)
   - [Learn More](#learn-more)

# Architecture

This app is using MVVM (Model View Viewmodel) pattern, the communincation flow is:

View -> Viewmodel -> Model

## View

The view is responsible of the rendering of each element, the elements can be a tool bar or a tool button and even the Three.js objects are Views. To achieve this I am using `@react-three/fiber` which is a very good abstraction of Three.js using react components

## Viewmodel

The Viewmodel is in charge of UI interactions like `Pointer Down`, `Pointer Up` and `Pointer Move` however it is not limited to pointer inputs, the same view model can be used from a different View to modify the color of the shape for example.

## Model

The Model is responsible of Business Logic like making sure that Triangles have always 3 vertices and Hexagon 6, in this example the BL is very simple but it serves as example.

## Testing

Thanks to the MVVM pattern it should be very easy to implement unit tests on each component.

# Caveats of this architecture

- The abstraction, in this example we have a couple of Abtraction Leaks that have to be fixed.
- We need to deal is with `Mobx` constraints like the limitations when `overriding` members of a `super-class`.
- The reactivity of the Views (`React`) depends on `Mobx` usage and sometimes it is very difficult to find why a component is not updating.
- The implementation of the `Closest point` tool is consuming way too much memory, the reason is the amount of `Material` instances we are creating every time the `Pointer Moves`, to fix this we should implement an `Object pool` to pick reusable `Materials`

# Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
