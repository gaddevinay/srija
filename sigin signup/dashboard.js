// Import Firebase modules
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.3.1/firebase-app.js";
import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/11.3.1/firebase-auth.js";

// Firebase Configuration
const firebaseConfig = {
    apiKey: "AIzaSyAWxeXSKnKZMFvIN57qO7AyF-TITa1JwD4",
    authDomain: "signin-signup-c6005.firebaseapp.com",
    projectId: "signin-signup-c6005",
    storageBucket: "signin-signup-c6005.appspot.com",
    messagingSenderId: "928748970724",
    appId: "1:928748970724:web:a535b75bef0a9edfa742f1",
    measurementId: "G-NNWF8P6D6J"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// 🔹 Check if User is Logged In
onAuthStateChanged(auth, (user) => {
    if (user) {
        document.getElementById("user-email").innerText = `Logged in as: ${user.email}`;
    } else {
        // Redirect to Sign In if not logged in
        window.location.href = "signin.html";
    }
});

// 🔹 Logout Function
document.getElementById("logout").addEventListener("click", () => {
    signOut(auth).then(() => {
        window.location.href = "signin.html"; // Redirect to Sign In
    }).catch((error) => {
        console.error("Error signing out: ", error);
    });
});
