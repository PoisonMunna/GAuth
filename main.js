import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
import { getAuth, signInWithPopup, GoogleAuthProvider, signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-auth.js";

import { firebaseConfig } from './config.js';

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

onAuthStateChanged(auth, (user) => {
    const currentPage = window.location.pathname;

    if (user) {
        sessionStorage.setItem("user", JSON.stringify(user));

        if (currentPage === "/index.html") {
            window.location.href = "login.html"; 
        }
        } 
        else if (currentPage === "/login.html") {
            window.location.href = "index.html";
        }

});

function googleLogin() {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
        .then((result) => {
            console.log("User Info:", result.user);

            sessionStorage.setItem("user", JSON.stringify(result.user));

            window.location.href = "login.html";
        })
        .catch((error) => {
            console.error("Login Error:", error);
            alert(error.message);
        });
}

function logout() {
    signOut(auth)
        .then(() => {
            console.log("User logged out");

            sessionStorage.removeItem("user");

            window.location.href = "index.html"; 
        })
        .catch((error) => {
            console.error("Logout Error:", error);
        });
}

window.googleLogin = googleLogin;
window.logout = logout;