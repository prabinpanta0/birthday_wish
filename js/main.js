document.addEventListener('DOMContentLoaded', () => {
    const scenes = document.querySelectorAll('.scene');
    const lightCandleBtn = document.getElementById('light-candle-btn');
    const lottieCandle = document.getElementById('lottie-candle');
    const messageRoom = document.getElementById('message-room');
    const mysteryBox = document.getElementById('mystery-box');
    const giftBoxImg = document.getElementById('gift-box-img');
    const giftMessage = document.getElementById('gift-message');
    const closeBoxBtn = document.getElementById('close-box-btn');
    const finalScene = document.getElementById('final-scene');
    const balloonContainer = document.getElementById('balloon-container');
    const releaseBalloonBtn = document.getElementById('release-balloon-btn');
    const finalMessage = document.getElementById('final-message');
    const wishInput = document.getElementById('wish-input');

    let candleAnimation;

    function switchScene(sceneId) {
        scenes.forEach(scene => {
            scene.classList.remove('active');
        });
        document.getElementById(sceneId).classList.add('active');
    }

    // 1. Welcome Candle
    fetch('assets/cake-icon-animation-lottifile.json')
        .then(response => response.json())
        .then(animationData => {
            candleAnimation = lottie.loadAnimation({
                container: lottieCandle,
                renderer: 'svg',
                loop: true,
                autoplay: true,
                animationData: animationData
            });
        });

    lightCandleBtn.addEventListener('click', () => {
        // Play a sound if you have one
        switchScene('message-room');
        createNotes();
    });

    // 2. Message Room
    const messages = [
        "You’ve survived 100% of your worst days. That’s kind of amazing, don’t you think?",
        "Today isn’t just a day you were born — it’s a day the world got a little better.",
        "Even if we’re just pixels apart, I’m genuinely glad to know you.",
        "Not every birthday needs cake. Sometimes just a quiet moment is enough.",
        "You matter. And I hope today reminds you of that — even in a small way.",
        "This isn’t a gift, but I still hope it feels like one.",
        "Happy birthday. You don’t have to be loud to be celebrated."
    ];

    let notesClicked = 0;
    let notesFallen = 0;
    let sceneSwitched = false;

    function checkSwitchScene() {
        if (sceneSwitched) return;
        if (notesClicked >= messages.length || notesFallen >= messages.length) {
            sceneSwitched = true;
            setTimeout(() => switchScene('mystery-box'), 1000);
        }
    }

    function createNotes() {
        messages.forEach((msg, index) => {
            const note = document.createElement('div');
            note.classList.add('note');
            note.textContent = msg;
            note.style.left = `${Math.random() * 80}vw`;
            note.style.transform = 'translateY(-100vh)';
            note.style.animationDelay = `${index * 3}s`;
            note.addEventListener('click', () => {
                note.style.opacity = '0';
                notesClicked++;
                checkSwitchScene();
            });
            note.addEventListener('animationend', () => {
                notesFallen++;
                checkSwitchScene();
            });
            messageRoom.appendChild(note);
        });
    }

    // 3. The Mystery Box
    giftBoxImg.addEventListener('click', () => {
        giftMessage.classList.remove('hidden');
        giftBoxImg.style.display = 'none';
    });

    closeBoxBtn.addEventListener('click', () => {
        switchScene('final-scene');
    });

    // 4. Final Scene
    releaseBalloonBtn.addEventListener('click', () => {
        balloonContainer.style.transition = 'transform 15s ease-in';
        balloonContainer.style.transform = 'translateY(-100vh)';
        wishInput.style.display = 'none';
        releaseBalloonBtn.style.display = 'none';
        document.querySelector('#final-scene .final-text').style.display = 'none';

        setTimeout(() => {
            finalMessage.classList.remove('hidden');
        }, 5000);
    });
});
