const bgGif = document.getElementById("background-gif");
const mainText = document.getElementById("main-text");
const subText1 = document.getElementById("sub-text-1");
const subText2 = document.getElementById("sub-text-2");
const buttonsArea = document.getElementById("buttons-area");
const yesBtn = document.getElementById("yesBtn");
const noBtn = document.getElementById("noBtn");
const bgMusic = document.getElementById("bgMusic");

const noMessages = [
    "Yakin nih? 🥺",
    "Pleaseee? 🙏",
    "Coba pikir lagi deh! 🤔",
    "Jangan dong! 💔",
    "Seriusan? 😭",
    "Nggak deh, pasti mau kan? 🥰"
];
let noMessageIndex = 0;

// Daftar GIF untuk setiap tahap
const gifStages = [
    'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExOHpueGZ3eXp4eXp4eXp4eXp4eXp4eXp4eXp4eXp4eXp4eXp4&ep=v1_gifs_search&rid=giphy.gif&ct=g', // Awal (Cute Bear)
    'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExYnJ2azQwdjNmdjVxM2Q4N2k1dWZlMm9scWFnY29nNjN1eDdxZXBvNiZlcD12MV9pbnRlcm5hbF9naWZzX2dpZnRfYnlfaWQmY3Q9Zw/lqSDxNdyF49kY/giphy.gif', // Tengah (Thinking Love)
    'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExY3h2NXZuYjhpYTR2N2xldHJvczFqcDcxNWQxNHk3c2N3bTM1eXkydyZlcD12MV9pbnRlcm5hbF9naWZzX2dpZnRfYnlfaWQmY3Q9Zw/LvtKS6L2cWbQY/giphy.gif', // Pertanyaan (Will you be my valentine?)
    'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExbHlxd2Rjcm5wcmQyMHV1eWdweTM3YzE4ZnIydjB6dmhldzNvZGVmciZlcD12MV9pbnRlcm5hbF9naWZzX2dpZnRfYnlfaWQmY3Q9Zw/R6L80YcE1K5xS/giphy.gif'  // Yes (Happy Couple)
];

// --- Fungsi Animasi Teks & GIF ---
async function startIntro() {
    bgGif.style.backgroundImage = `url('${gifStages[0]}')`;

    await typeText(mainText, "Hai Sayang... ✨");
    await sleep(1000); // Jeda 1 detik
    
    subText1.style.setProperty('--delay', '0s');
    await typeText(subText1, "Aku punya sesuatu yang spesial banget buat kamu...");
    await sleep(800);
    
    subText2.style.setProperty('--delay', '0.5s');
    await typeText(subText2, "Coba klik tombol MAU di bawah ini ya!");
    await sleep(1000);
    
    buttonsArea.style.display = 'flex'; // Tampilkan tombol
    buttonsArea.style.opacity = '1';

    // Auto-play musik saat ada interaksi pertama
    document.body.addEventListener('click', playMusicOnce, { once: true });
}

// Fungsi untuk mengetik teks satu per satu
async function typeText(element, text) {
    element.innerHTML = '';
    element.style.opacity = '1';
    for (let i = 0; i < text.length; i++) {
        element.innerHTML += text.charAt(i);
        await sleep(50); // Kecepatan mengetik
    }
}

// Fungsi jeda waktu
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// Fungsi putar musik (hanya sekali saat ada klik pertama)
function playMusicOnce() {
    bgMusic.play().catch(e => console.error("Autoplay prevented:", e));
}

// --- Logika Tombol ---
noBtn.addEventListener("mouseover", () => {
    // Tombol No ganti teks
    noBtn.textContent = noMessages[noMessageIndex];
    noMessageIndex = (noMessageIndex + 1) % noMessages.length;

    // Tombol No lari secara random
    const x = Math.random() * (window.innerWidth * 0.7 - noBtn.offsetWidth);
    const y = Math.random() * (window.innerHeight * 0.7 - noBtn.offsetHeight);
    noBtn.style.position = 'absolute';
    noBtn.style.left = `${x}px`;
    noBtn.style.top = `${y}px`;
});


yesBtn.addEventListener("click", () => {
    // Ganti GIF background ke happy couple
    bgGif.style.backgroundImage = `url('${gifStages[3]}')`; 

    // Sembunyikan semua teks dan tombol
    mainText.style.opacity = '0';
    subText1.style.opacity = '0';
    subText2.style.opacity = '0';
    buttonsArea.style.display = 'none';

    // Tampilkan pesan konfirmasi
    setTimeout(async () => {
        mainText.style.opacity = '1';
        mainText.textContent = "Yeeaaay! Sampai Ketemu! 🌹";
        
        subText1.style.opacity = '1';
        subText1.textContent = "Nanti aku kontak lagi ya buat detailnya.";
        
        subText2.style.opacity = '1';
        subText2.textContent = "Siap-siap dandan yang paling cantik/ganteng!";

        // Hujan Hati
        setInterval(createHeart, 300);
    }, 500); // Jeda sebelum teks akhir muncul
});

function createHeart() {
    const heart = document.createElement("span"); // Menggunakan span agar lebih ringan
    heart.innerHTML = "💖";
    heart.classList.add("heart-fall");
    heart.style.left = Math.random() * 100 + "vw";
    heart.style.fontSize = Math.random() * 20 + 15 + "px";
    document.body.appendChild(heart);
    setTimeout(() => heart.remove(), 5000);
}


// --- Jalankan Intro saat halaman dimuat ---
window.onload = startIntro;