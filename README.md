# Purplemana Front-end with React.js  

This project was developed to work with apis for purplemana project's front-end
This uses a React.js material UI design system.
Most of the components are material-UI.
The back-end datasource is a Graphene-GraphQL server, the front-end client is the Apollo Client.

# Project Structure
- src folder
    - Layout: Navbar component
    - Pages: All other components
    - Types: TS type interface definitions
- public folder: Assets such as images and icons

- routes
    - You can run this project by running npm install && npm start.
    - npm install should be done at the first time.
    - /: homepage: Home component, search for items and click on cards to view the latest offers
    - /collect: "Collect": lands on user's collections, interface to build a collection by creating realItems from genericItem + owner and adding to an itemCollection.
    - /profile: "Profile": Displays user information such as username and avatar, sets user information into session storage.
    - /trade: view proposed trades, old trades, and create new trades

- to-do
    - Admin Page: not built
      - buttons for admin to comment / update collection status

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
