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
        'audio': new Audio('./src/audios/hit-the-road-jack.mp3')
    },
    {
        'name': 'Georgia On My Mind',
        'author': 'Ray Charles',
        'image': './src/images/georgia-on-my-mind.webp',
        'audio': new Audio('./src/audios/georgia-on-my-mind.mp3')
    },
    {
        'name': 'Fever',
        'author': 'Peggy Lee',
        'image': './src/images/fever.jpeg',
        'audio': new Audio('./src/audios/fever.mp3')
    },
    {
        'name': 'I Just Want To Make Love To You',
        'author': 'Etta James',
        'image': './src/images/i-just-want-to-make-love-to-you.jpeg',
        'audio': new Audio('./src/audios/i-just-want-to-make-love-to-you.mp3')
    },
    {
        'name': 'I Put a Spell On You',
        'author': 'Nina Simone',
        'image': './src/images/i-put-a-spell-on-you.jpeg',
        'audio': new Audio('./src/audios/i-put-a-spell-on-you.mp3')
    },
];


let numberList = 0;
let indice = musicList[numberList];

buttonPrevious.addEventListener('click', () => {
    console.log('Escuchando música anterior!');
    lastValue = 0;
    const music = indice;
    music.audio.pause();
    clearInterval(interval);
    buttonStop.style.display='none';
    buttonPlay.style.display='block';

    numberList--;
    if (numberList < 0) {
        numberList = musicList.length - 1;
    }

    indice = musicList[numberList];
    updateInfoSong();
});

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
    });
};

document.addEventListener('DOMContentLoaded', initializePage);

buttonNext.addEventListener('click', () => {
    const music = indice
    music.audio.pause()
    clearInterval(interval)
    buttonStop.style.display='none'
    buttonPlay.style.display='block'

    lastValue = 0
    range.value=(0)
    actuallyRange.textContent=('00:00')
    console.log('Escuchando música siguiente!');
    numberList++;

    if (numberList >= musicList.length) {
        numberList = 0;
    }

    indice = musicList[numberList];
    updateInfoSong();
});


let lastValue = 0;
let interval;
buttonPlay.addEventListener('click', () => {
    buttonStop.style.display='block'
    buttonPlay.style.display='none'
    const music = indice
    music.audio.play()

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
});

buttonStop.addEventListener('click', () => {
    buttonStop.style.display='none';
    buttonPlay.style.display='block';
    const music = indice;
    music.audio.pause();

    clearInterval(interval);
    lastValue = parseInt(range.value);
});

function updateInfoSong() {
    const title = document.getElementById('title');
    const author = document.getElementById('author');
    const image = document.getElementById('image');
    title.textContent = indice.name.toUpperCase();
    author.textContent = indice.author;
    image.setAttribute('src', indice.image);
    image.setAttribute('alt', indice.name);

    const music = indice.audio;
    music.pause();
    music.currentTime = 0;
    initializeAudioMetadata(music);
};

buttonAddToFavorite.addEventListener('click', () => {
    buttonAddToFavorite.classList.toggle('controllers-data-favorite-clicked');
});
