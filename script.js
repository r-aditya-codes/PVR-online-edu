// 1. Language Translation Logic
const langBtn = document.getElementById('langBtn');
let currentLang = 'hi';

langBtn.addEventListener('click', () => {
    const elements = document.querySelectorAll('.lang');
    
    if (currentLang === 'hi') {
        // Switch to English
        elements.forEach(el => {
            el.textContent = el.getAttribute('data-en');
        });
        // Update Placeholders
        document.getElementById('nameField').placeholder = "Full Name";
        document.getElementById('phoneField').placeholder = "Phone Number";
        document.getElementById('addressField').placeholder = "Your Address";
        
        langBtn.textContent = "हिंदी में बदलें";
        currentLang = 'en';
    } else {
        // Switch to Hindi
        elements.forEach(el => {
            el.textContent = el.getAttribute('data-hi');
        });
        // Update Placeholders back to Hindi
        document.getElementById('nameField').placeholder = "पूरा नाम";
        document.getElementById('phoneField').placeholder = "फोन नंबर";
        document.getElementById('addressField').placeholder = "आपका पता";

        langBtn.textContent = "Translate to English";
        currentLang = 'hi';
    }
});

// 2. Google Sheets Integration Logic
const scriptURL = 'https://script.google.com/macros/s/AKfycbzJjCOG5LiialzBAwDfEiji5QV9PedPh2a4kqw3WBsthZptwaJ8tLQjjh_tS9JNEazK3g/exec'
 // अपना URL यहाँ डालें
const form = document.getElementById('studentForm');
const msg = document.getElementById('msg');

form.addEventListener('submit', e => {
    e.preventDefault();
    const submitBtn = document.getElementById('submitBtn');
    submitBtn.disabled = true;
    submitBtn.innerHTML = "भेज रहे हैं... / Sending...";

    fetch(scriptURL, { method: 'POST', body: new FormData(form)})
        .then(response => {
            msg.innerHTML = "सफलतापूर्वक जमा किया गया! / Submitted Successfully!";
            msg.style.color = "green";
            form.reset();
            submitBtn.disabled = false;
            submitBtn.innerHTML = (currentLang === 'hi') ? "जानकारी भेजें" : "Submit Details";
        })
        .catch(error => {
            console.error('Error!', error.message);
            msg.innerHTML = "त्रुटि! कृपया पुनः प्रयास करें।";
            msg.style.color = "red";
            submitBtn.disabled = false;
        });
});