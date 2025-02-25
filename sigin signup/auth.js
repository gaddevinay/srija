// Import Firebase modules
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.3.1/firebase-app.js";
import { 
    getAuth, 
    createUserWithEmailAndPassword, 
    signInWithEmailAndPassword, 
    onAuthStateChanged, 
    signOut 
} from "https://www.gstatic.com/firebasejs/11.3.1/firebase-auth.js";

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

// 🔹 Password Validation Function
function validatePassword(password) {
    const errors = [];
    if (password.length < 8) errors.push("at least 8 characters");
    if (!/[A-Z]/.test(password)) errors.push("one uppercase letter");
    if (!/[a-z]/.test(password)) errors.push("one lowercase letter");
    if (!/[0-9]/.test(password)) errors.push("one number");
    if (!/[\W_]/.test(password)) errors.push("one special character");

    return errors.length ? `Password must contain ${errors.join(", ")}.` : null;
}

// 🔹 Convert Firebase Errors to User-Friendly Messages
function getFriendlyErrorMessage(errorCode) {
    const errorMessages = {
        "auth/user-not-found": "No account found with this email.",
        "auth/invalid-credential": "Invalid email or password. Please try again.",
        "auth/email-already-in-use": "This email is already registered. Try signing in.",
        "auth/weak-password": "Password is too weak. Use at least 8 characters.",
        "auth/wrong-password": "Incorrect password. Please try again.",
        "auth/network-request-failed": "Network error. Check your connection and try again.",
        "auth/too-many-requests": "Too many failed attempts. Try again later."
    };

    return errorMessages[errorCode] || `${errorCode.replace("auth/", "").replace("-", " ")}`;
}

// 🔹 Function to Show Messages with Colors
function showMessage(message, type, targetId) {
    const messageElement = document.getElementById(targetId);
    if (!messageElement) return;

    messageElement.innerText = message;
    messageElement.className = `message ${type}`; // Apply success or error class
}

// 🔹 Sign Up Function with Validation & Styled Messages
document.addEventListener("DOMContentLoaded", () => {
    const signupForm = document.getElementById("signup-form");
    if (signupForm) {
        signupForm.addEventListener("submit", (event) => {
            event.preventDefault();

            const email = document.getElementById("email").value.trim();
            const password = document.getElementById("password").value.trim();

            if (!email || !password) {
                showMessage("Please enter email and password.", "error", "signup-message");
                return;
            }

            const errorMessage = validatePassword(password);
            if (errorMessage) {
                showMessage(`${errorMessage}`, "error", "signup-message");
                return;
            }

            createUserWithEmailAndPassword(auth, email, password)
                .then(() => {
                    showMessage("Account created successfully! Sign in now", "success", "signup-message");
                    signupForm.reset();
                    setTimeout(() => window.location.href = "signin.html", 1000);
                })
                .catch((error) => {
                    showMessage(`${getFriendlyErrorMessage(error.code)}`, "error", "signup-message");
                });
        });
    }

    // 🔹 Sign In Function
    const signinForm = document.getElementById("signin-form");
    if (signinForm) {
        signinForm.addEventListener("submit", (event) => {
            event.preventDefault();

            const email = document.getElementById("signin-email").value.trim();
            const password = document.getElementById("signin-password").value.trim();

            if (!email || !password) {
                showMessage("Please enter email and password.", "error", "signin-message");
                return;
            }

            signInWithEmailAndPassword(auth, email, password)
                .then(() => {
                    showMessage("Login successful! ", "success", "signin-message");
                    signinForm.reset();
                    setTimeout(() => window.location.href = "dashboard.html", 1000);
                })
                .catch((error) => {
                    showMessage(`${getFriendlyErrorMessage(error.code)}`, "error", "signin-message");
                });
        });
    }

    // 🔹 Logout Function
    const logoutButton = document.getElementById("logout");
    if (logoutButton) {
        logoutButton.addEventListener("click", () => {
            signOut(auth)
                .then(() => window.location.href = "signin.html")
                .catch((error) => console.error("Error signing out: ", error));
        });
    }

    // 🔹 Check if User is Logged In & Redirect if Needed
    onAuthStateChanged(auth, (user) => {
        const userEmailDisplay = document.getElementById("user-email");

        if (user) {
            if (userEmailDisplay) userEmailDisplay.innerText = `Logged in as: ${user.email}`;
        } else {
            if (window.location.pathname.includes("dashboard.html")) {
                window.location.href = "signin.html";
            }
        }
    });
});
