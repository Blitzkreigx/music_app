let range = document.getElementById('range');
let actuallyRange = document.getElementById('actuallyRange');
let completeRange = document.getElementById('completeRange');
const buttonPrevious = document.getElementById('previous');
const buttonPlay = document.getElementById('play');
const buttonStop = document.getElementById('stop');
const buttonNext = document.getElementById('next');
const buttonAddToFavorite = document.getElementById('favorite');

const musicList = [
    {
        'name': 'Hit The Road Jack',
        'author': 'Ray Charles',
        'image': './src/images/hit-the-road-jack.jpeg',
        'audio': new Audio('./src/images/hit-the-road-jack.mp3')
    },
    {
        'name': 'Georgia On My Mind',
        'author': 'Ray Charles',
        'image': './src/images/georgia-on-my-mind.webp',
        'audio': new Audio('./src/images/georgia-on-my-mind.mp3')
    },
    {
        'name': 'kerosene',
        'author': 'Crystal Castles',
        'image': './src/images/kerosene.jpeg',
        'audio': new Audio('./src/images/kerosene.mp3')
    },
];

// let timeConvert;

buttonPrevious.addEventListener('click', () => {
    console.log('Escuchando música anterior!');

    numberList--;

    if (numberList < 0) {
        numberList = musicList.length - 1;
    }

    indice = musicList[numberList];
    updateInfoSong();
});

let numberList = 0;
let indice = musicList[numberList];

function initializePage() {
    range.value = 0;
    const oneMusic = indice.audio;
    
    const title = document.getElementById('title');
    const author = document.getElementById('author');
    const image = document.getElementById('image');
    title.textContent = indice.name.toUpperCase();
    author.textContent = indice.author;
    image.setAttribute('src', indice.image);
    image.setAttribute('alt', indice.name);

    initializeAudioMetadata(oneMusic);
};

function initializeAudioMetadata(audioElement) {
    audioElement.addEventListener('canplaythrough', () => {
        const seconds = Math.round(audioElement.duration);
        const timeMinutes = Math.floor(seconds / 60);
        const timeSeconds = seconds % 60;

        timeConvert = (timeMinutes * 60) + parseFloat(timeSeconds);

        completeRange.textContent = `0${timeMinutes}:${timeSeconds}`;

        range.setAttribute('min', 0);
        range.setAttribute('max', timeConvert);
        console.log(timeConvert);
    });
};

document.addEventListener('DOMContentLoaded', initializePage);

buttonNext.addEventListener('click', () => {
    //
        range.value=(0)
        actuallyRange.textContent=('00:00')
    //
    console.log('Escuchando música siguiente!');
    numberList++;

    if (numberList >= musicList.length) {
        numberList = 0;
    }

    indice = musicList[numberList];
    console.log(`Canción actual: ${indice.name} - ${indice.author}`);

    updateInfoSong();
});


let lastValue = 0;
let interval;
buttonPlay.addEventListener('click', () => {
    buttonStop.style.display='block'
    buttonPlay.style.display='none'
    const musicone = indice
    musicone.audio.play()

    function IncrementRange(increment, limite) {
        let initialValue = lastValue;
        interval = setInterval(() => {
            initialValue += increment;

            const rangeValue= range.value=(initialValue)
            const minutes = parseInt(rangeValue / 60)
            const seconds = rangeValue % 60
            actuallyRange.textContent=(`0${minutes}:${seconds}`)

            if (initialValue >= limite) {
                clearInterval(interval)
                console.log('Incrementación terminada!')
                buttonStop.style.display='none'
                buttonPlay.style.display='block'
            }
        }, 1000);
    }

    IncrementRange(1, timeConvert)
    range.value=(0)
});

buttonStop.addEventListener('click', () => {
    buttonStop.style.display='none'
    buttonPlay.style.display='block'
    const musicone = indice
    musicone.audio.pause()

    clearInterval(interval)
    lastValue = parseInt(range.value);
    console.log('Música Detenida!')
});

function updateInfoSong() {
    const title = document.getElementById('title');
    const author = document.getElementById('author');
    const image = document.getElementById('image');
    title.textContent = indice.name.toUpperCase();
    author.textContent = indice.author;
    image.setAttribute('src', indice.image);
    image.setAttribute('alt', indice.name);

    const musicone = indice.audio;
    musicone.pause();
    musicone.currentTime = 0;
    initializeAudioMetadata(musicone);
};

buttonAddToFavorite.addEventListener('click', () => {
    buttonAddToFavorite.classList.toggle('controllers-data-favorite-clicked');
});
