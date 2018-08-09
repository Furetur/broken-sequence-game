// (including max)
const random = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

const randomFromArray = array => {
    return array[random(0, array.length - 1)];
}
