import { initializeApp } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-app.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-auth.js";

const firebaseConfig = {
    apiKey: "AIzaSyBxIpLY5WasiSIlDL4japBLnnXRwOLUKEQ",
    authDomain: "tezkor-quiz-bbe3c.firebaseapp.com",
    projectId: "tezkor-quiz-bbe3c",
    storageBucket: "tezkor-quiz-bbe3c.firebasestorage.app",
    messagingSenderId: "143161522496",
    appId: "1:143161522496:web:252108ace3a4c19f35e2a5"
};


const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Current page URL (login qaytish uchun)
const returnUrl = encodeURIComponent(window.location.pathname + window.location.search);

onAuthStateChanged(auth, (user) => {
    if (!user) {
        // foydalanuvchi kirmagan — login sahifasiga yo'naltirish
        window.location.replace(`/kirish.html?returnUrl=${returnUrl}`);
    } else {
        console.log("User logged in:", user.uid);
    }
});
