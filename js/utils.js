// range function kind of like in python
const range = (length) => Array.from({ length }, (v, k) => k + 1); 

// shuffles an array
const shuffle = (a) => {
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
}

// (including max)
const random = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
}
