const BUTTON_HIGHLIGHT_TIME = 300;
const PAUSE_TIME = 200;
const SHORT_PAUSE_TIME = 2;
const MEDIUM_PAUSE_TIME = 500;
const LONG_PAUSE_TIME = 2000;
const LONGEST_PAUSE_TIME = 3000;

const body = document.querySelector('body');
const root = document.querySelector('.root');
const levelDisplay = document.querySelector('#level-display');
const buttons = document.querySelectorAll('.one-button');

// functions
const displayLevel = (level) => {
    levelDisplay.innerHTML = level;
};

const highlightButton = (number, delay = BUTTON_HIGHLIGHT_TIME) => {
    const button = buttons[number];
    button.classList.add('active');

    setTimeout(() => {
        button.classList.remove('active');
    }, delay);
};

const showLoadingScreen = () => {
    root.style.filter = 'grayscale(100%)';
};

const hideLoadingScreen = () => {
    root.style.filter = 'none';
};

const showSequence = (sequence, delay = MEDIUM_PAUSE_TIME) => {
    if (sequence.length === 0) return;

    highlightButton(sequence[0]);

    setTimeout(() => {
        showSequence(sequence.slice(1))
    }, delay);
};

const animateWin = () => {
    const buttonsToHighlight = Array.from(buttons).map((button, index) => index);
    showSequence(buttonsToHighlight, SHORT_PAUSE_TIME);
}

const animateLose = () => {
    buttons.forEach((button, index) => {
        highlightButton(index);
    })
}
