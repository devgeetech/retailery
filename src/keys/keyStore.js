// INSERT YOUR FIREBASE DETAILS HERE!!!


export const config = {
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: "shoppingspree-6e902.firebaseapp.com",
    databaseURL: "https://shoppingspree-6e902.firebaseio.com",
    storageBucket: "shoppingspree-6e902.appspot.com",
    projectId: "shoppingspree-6e902",
    messagingSenderId: process.env.FIREBASE_MESSAGING_KEY
}

export const apiLink = 'http://localhost:8080/graphql'

export const mapKey = 'InsertYourGCPMapAPIKeyHere'
