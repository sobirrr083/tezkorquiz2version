import { initializeApp } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-app.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-auth.js";

const firebaseConfig = {
    apiKey: "AIzaSyBxIpLY5WasiSIlDL4japBLnnXRwOLUKEQ",
    authDomain: "tezkor-quiz-bbe3c.firebaseapp.com",
    // ... boshqa sozlamalar bo‘lsa qo‘ying
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
