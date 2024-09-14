document.addEventListener("DOMContentLoaded", () => {
    const texts = [
        { text: "Welcome to", language: "en" }, // English
        { text: "স্বাগতম সবাইকে", language: "bn" }, // Bengali
        { text: "स्वागत है", language: "hi" }, // Hindi
        { text: "Bienvenido a", language: "es" }, // Spanish
        { text: "Bienvenue à", language: "fr" }, // French
        { text: "Willkommen zu", language: "de" }, // German
        { text: "Benvenuto a", language: "it" }, // Italian
        { text: "Bem-vindo", language: "pt" }, // Portuguese
        { text: "Добро пожаловать", language: "ru" }, // Russian
        { text: "Welkom", language: "nl" }, // Dutch
        { text: "Välkommen", language: "sv" }, // Swedish
        // { text: "欢迎来到", language: "zh" },             // Chinese (Simplified)
        { text: "Benvingut", language: "ca" }, // Catalan
        { text: "Velkommen", language: "da" }, // Danish
        // { text: "ようこそ", language: "ja" },             // Japanese
        // { text: "স্বাগতম সবাইকে", language: "bn" },            // Bengali
        { text: "Dobrodošli", language: "hr" }, // Croatian
        { text: "Добро пожаловать", language: "ru" } // Russian (Repeated)
    ];

    let currentIndex = 0;
    const randomTextElement = document.getElementById("random-text");

    // Character sets for different languages
    const charSets = {
        en: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz ',
        es: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz ',
        fr: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz ',
        en: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz ',
        es: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz ',
        fr: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz ',
        de: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz ',
        it: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz ',
        ja: 'あいうえおかきくけこさしすせそたちつてとへほまみむめもやゆよらりるれろわをん',
        ko: 'ㅂㅈㄷㄱ쇼ㅕㅑㅐㅔㅁㄴㅇㄹ호ㅓㅏㅣㅋㅌㅊ퓨ㅜㅡ',
        zh: '欢迎来到手田水口廿卜山戈人心日尸火土竹十大中長金金女月弓一',
        pt: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz ',
        ru: 'АБВГДЕЁЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯ ',
        hi: 'अआइईउऊऋएऐओऔकखगघचछजझटठडढणतथदधनपफबभमयरलवशषसहज्ञक्षश्र ',
        bn: 'অআইঈউঊএঐওঔকখগঘঙচছজঝঞটঠডঢণতথদধনপফবভমযরলশষসহড়ঢ়য়ৎঋ ',
        nl: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz ',
        fi: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz ',
        sv: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz ',
        ca: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz ',
        da: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz ',
    };

    function getRandomChar(originalChar, lang) {
        const charSet = charSets[lang] || charSets['en'];
        if (/[a-zA-Z0-9\s]/.test(originalChar)) {
            let randomChar;
            do {
                randomChar = charSet.charAt(Math.floor(Math.random() * charSet.length));
            } while (randomChar === originalChar);
            return randomChar;
        }
        return originalChar;
    }

    function blendCharacters(originalText, targetText, lang, callback) {
        const duration = 2000; // Duration of blending (1.3 seconds)
        const totalSteps = 28; // Number of blending steps
        const interval = duration / totalSteps; // Interval between steps
        let steps = 0;
        let currentText = randomTextElement.textContent || originalText;

        function blendStep() {
            if (steps < totalSteps) {
                let blendedText = currentText.split('').map((char, index) => {
                    if (index < targetText.length) {
                        return getRandomChar(targetText[index], lang);
                    }
                    return char;
                }).join('');
                randomTextElement.textContent = blendedText;
                steps++;
                setTimeout(blendStep, interval);
            } else {
                randomTextElement.textContent = targetText;
                setTimeout(callback, 1500); // Wait 1.5 seconds before moving to the next text
            }
        }

        blendStep();
    }

    function changeText() {
        const { text, language } = texts[currentIndex];
        currentIndex = (currentIndex + 1) % texts.length;

        blendCharacters(text, text, language, () => {
            setTimeout(changeText, 1000); // Keep the correct word displayed for 1 seconds before changing to the next
        });
    }

    changeText(); // Initial call to start the process
});

document.getElementById('moonstars').addEventListener('click', function() {
    document.body.classList.toggle('dark-mode');
});