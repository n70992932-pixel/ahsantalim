// Firebase ulanish ma'lumotlari
const firebaseConfig = {
  apiKey: "AIzaSyBL0Kz6fX7Qz34WXLtF4-sMIEmXjnOD1QE",
  authDomain: "ahsantalim-2bdc6.firebaseapp.com",
  projectId: "ahsantalim-2bdc6",
  storageBucket: "ahsantalim-2bdc6.firebasestorage.app",
  messagingSenderId: "552550836730",
  appId: "1:552550836730:web:a58d861eadf4d20bf75c43",
  measurementId: "G-QL2B16J0F4"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

// Global kesh, barcha fayllar shundan o'qiydi
window.siteDataCache = {};

window.loadDataFromFirebase = async function() {
  try {
    const docRef = db.collection('site_data').doc('main');
    const docSnap = await docRef.get();
    if (docSnap.exists) {
      window.siteDataCache = docSnap.data() || {};
    } else {
      window.siteDataCache = {}; // Hali hech narsa yo'q
    }
  } catch (error) {
    console.error("Firebase o'qishda xatolik:", error);
  }
};

window.saveDataToFirebase = async function(key, value) {
  try {
    // Avval mahalliy keshni yangilaymiz
    window.siteDataCache[key] = value;
    
    // Keyin Firebase'ga yuboramiz
    const docRef = db.collection('site_data').doc('main');
    await docRef.set({ [key]: value }, { merge: true });
    console.log("Firebase'ga saqlandi:", key);
  } catch (error) {
    console.error("Firebase'ga yozishda xatolik:", error);
  }
};
