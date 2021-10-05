# Suraksha

Suraksha is a React app with Firebase utilities designed to help you monitor your blood pressure by logging systolic and diastolic numbers, blood glucose, weight and any additional notes you might want to add.

## Technologies Used:
- React
- Firebase Authentication
- Cloud Firestore Database
- MomentJS
- Bootstrap

## Getting Started

 1. You can start by cloning the repository on your local machine by running:

 ```
    git clone https://github.com/scaledrop/suraksha
    cd suraksha
 ```
 2. Install all of the dependencies:

 ```
    yarn
 ```
  3. Install Firebase utilities

 ```
    yarn firebase
 ```
 
 Enter the config values in the ./src/utils/firebase.utils.js
 ```
 const config = {
    apiKey: "",
    authDomain: "",
    projectId: "",
    storageBucket: "",
    messagingSenderId: "",
    appId: ""
  };

 ```
 For more instructions: Please visit https://firebase.google.com/docs/web/setup

4. Start to run it:

 ```
    yarn build  # Building bundle
    yarn start  # Running production server
 ```
 Now the app should be running at http://localhost:3000


