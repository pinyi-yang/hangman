//?this is for variable declaration
var wordDataBase = ['Aerys Targaryen', 'Blackfyre Rebellion', 'Crow', 'Direwolf', 'Dothraki', 'Eunuch', 'Faceless Men', 'Faith of the Seven', 'Grayscale', 'Great Houses', 'Hand of the King', 'Iron Throne', 'Jon Snow', 'Khaleesi', "King's Landing", 'Long Night', 'Maester', "Night's Watch", 'Others', 'White Walkers', 'Qarth', 'Rhaegar Targaryen', "R'hllor", 'Sellsword', 'Sons of the Harpy', 'Turncloak', 'Unsullied', 'Valar Morghulis', 'Wildlings', 'Xaro Xhoan Daxos', 'Yunkai', 'Zafra'];
var puzzleWord; //store the word for game
var puzzleWordArr; //
var puzzleWordEl; //array, DOM element for each letter at same index in puzzleWordArr
var guessLetters = []; //array to store guessed letters
var correctGuessLetters = []; //array to store correctly guessed letter for comparison.
var errorsAllow; // number to show how many errors allowing for the current game.
var sortPuzzleWord;
var sortGuessLetters;
var wordHistory = [];
var stagesInfo = [
    {
        img: '/img/stage1.png',
        title: "Black Castle: the Girl and Her 'Needle'",
        caption: "Arya and her sister, Sansa, travel with their father, Lord Eddard, to King's Landing when he is made Hand of the King. Before she leaves, Arya's half-brother Jon gives her a sword called Needle, after her least favorite ladylike activity, as a parting gift. He tells her she will need to practice, but that the first lesson is to 'stick'em with the pointy end."     
    },
    {
        img: '/img/stage2.jpg',
        title: "King's Landing: Captivity Can't Capture a Strong Will",
        caption: 'stage 2 caption here'     
    },
    {
        img: '/img/stage3.jpg',
        title: "Trek 1: Water Dance, Girl's True Color",
        caption: 'stage 3 caption here'     
    },
    {
        img: '/img/stage4.jpg',
        title: "Trek 2: A Girl with No Name? No!",
        caption: 'stage 4 caption here'     
    },
    {
        img: '/img/stage5.jpg',
        title: 'Back to North: Encounter the Night King',
        caption: 'stage 5 caption here'     
    },
    {}
];

//?this is for DOM element creation
var wordDisplayEl = document.getElementsByClassName('worddisplay')[0]; //get div.board DOM
var inputEl = document.getElementById('inputletter');
var newGameBtnEl = document.getElementById('newgame');
var stageTitleEl = document.getElementById('stagetitle'); //passed
var stageImgEl = document.getElementById('stageimage'); //passed
var stageCaptionEl = document.getElementById('stagecaption'); //passed
// console.log(stageTitleEl, stageImgEl, stageCaptionEl);
var guessedLetterEl = document.getElementById('guessedletters');
// console.log(guessedLetterEl);
var wordHistoryEl = document.getElementById('wordhistory');
// console.log(wordHistoryEl);

//?this is or event listener
//main activity
inputEl.addEventListener('keyup', function(evt) {
    let inputLetter = evt.target.value; //take the first input letter
    setTimeout(function() {evt.target.value = ''}, 300); // clear input box imediate
    // console.log(inputLetter); //input test passed

    //? check whether it is a correct letter only execute when the letter is input for the first time
    if (isInputFirstTime(inputLetter)) {
        if (isCorrectOrNot(inputLetter)) {
            guessCorrect(inputLetter);//do actions for a correct guess
            updateHMimg(); 
        } else {
            guessWrong(inputLetter);
        }
    }

    updateGuessedLetters(inputLetter);

    //? whether it is the end of game after guess
    if (isEndGame()) {
        console.log(isEndGame());
        endGame(); //actions to end a game
    }

});

newGameBtnEl.addEventListener('click', createGame);




//? this is for functions
//todo generate and return a random word. And initiate values
//! need to modify, word type: str or object?
function createWord() {
    //!pending function, for testing only
    let wordIndex = Math.round(Math.random()*wordDataBase.length);
    // console.log(wordIndex);
    puzzleWord = wordDataBase[wordIndex];
    // console.log(puzzleWord);
    puzzleWordArr = puzzleWord.toLowerCase().split('');
    errorsAllow = 7 //! need to reset according to word length
    //create DOM element for each char in puzzleWord and store it as object
    let temp;
    puzzleWordEl = puzzleWordArr.reduce(function(acc, current){
        temp = document.createElement('div');
        temp.textContent = current;
        if (current !== ' ') {
            temp.classList.add("letter", "hidden", current);
        }
        acc.push(temp); //add span element with class name of each letter.
        // console.log(temp); // test code
        return acc;
    }, []);
    // console.log(puzzleWord);
    // console.log(puzzleWordArr);
    // console.log(puzzleWordEl);
    
} 
//*test for createWord(), passed

//* this 1. creat the game board div.board according to word; 
//*     2. store and initiate
function createGame() {
    createWord();
    wordDisplayEl.textContent = ''; //clear board
    for (var element of puzzleWordEl) {
        wordDisplayEl.appendChild(element);
        // wordDisplayEl.appendChild(document.createTextNode(' ')); //* create a space between span element to separate the underline in order to show each word.
    }
    inputEl.maxLength = 1; //*enable 1 letter input, passed

    //update stage
    stageTitleEl.textContent = 'Winter Is Coming!';
    stageCaptionEl.textContent = "Let's Start!";
    stageImgEl.setAttribute('src', 'img/start.jpg');
    guessedLetterEl.textContent = 'GUESSED LETTERS: ';
    
}
//createGame(); //passed,

//* check whether the letter was input before
function isInputFirstTime(inputLetter) {
    return !guessLetters.includes(inputLetter);
}
//* check whether the inputLetter is in word
function isCorrectOrNot(inputLetter) {
    return puzzleWordArr.includes(inputLetter.toLowerCase());
}

//* actions for correct guess
//* 1. reveal the hidden letter for the correct guess //turn blue during test.
//* 2. input storage
function guessCorrect(inputLetter) {
    let letterEls = document.getElementsByClassName(inputLetter) //array, length depending on the time of letter appearnace in word
    
    
    //reveal the correct guess letter
    for (let element of letterEls) {
        element.classList.add('reveal');
    }

    //store letter for later use
    guessLetters.push(inputLetter.toLowerCase());
    // *length secure multi appearance letter
    for (let i = 0; i < letterEls.length; i ++) {
        correctGuessLetters.push(inputLetter.toLowerCase()); 
    }
    //* updated sorted str
    sortPuzzleWord = puzzleWordArr.sort().join('').replace(' ', '');
    sortGuessLetters = correctGuessLetters.sort().join('');
}

//*actions for wrong guess
//* 1. store inputLetter; 2. change errorsAllow
//todo: picture action for hangman
function guessWrong(inputLetter) {
    guessLetters.push(inputLetter);
    errorsAllow--;
}

//* update stage after each correct guess
//todo: 1. update stage title, img and caption
function updateHMimg() {
    let stageNum = (sortGuessLetters.length/sortPuzzleWord.length)*5;
    console.log(stageNum);
    stageNum = Math.floor(stageNum);
    console.log(stageNum);
    //update title
    stageTitleEl.textContent = stagesInfo[stageNum].title;
    stageImgEl.setAttribute('src', stagesInfo[stageNum].img);
    stageImgEl.setAttribute('alt', stagesInfo[stageNum].img);
    stageCaptionEl.textContent = stagesInfo[stageNum].caption;
    setTimeout(function(){}, 1000);
}

//* update guessed letter board
function updateGuessedLetters(inputLetter) {
    let gussedLettersText = 'Guessed Letter: ' + guessLetters.join(', ');
    guessedLetterEl.textContent = gussedLettersText;
}

//* check whether it is the end of game
function isEndGame() {
    sortPuzzleWord = puzzleWordArr.sort().join('').replace(' ', '');
    sortGuessLetters = correctGuessLetters.sort().join('');
    console.log(sortPuzzleWord, sortGuessLetters);
    console.log(errorsAllow === 0 || sortPuzzleWord === sortGuessLetters);
    return errorsAllow === 0 || sortPuzzleWord === sortGuessLetters;
}

//* endGame actions
//* 1. stop take inputs
//todo: 2. congratulation messages <=TBA

function endGame() {
    inputEl.maxLength = 0; //stop taking input from users
    if (sortPuzzleWord === sortGuessLetters) {
        stageTitleEl.textContent = 'Congratulations! You killed Night King.';
        stageCaptionEl.textContent = 'After a long fight, you fullfill your task through your dedication and endeavor. You defend your home, family and friends from night king. You defend the North';
        stageImgEl.setAttribute('src', '/img/winimg.png');
        stageImgEl.setAttribute('alt', '/img/winimg.png');
    } else {
        stageTitleEl.textContent = 'Oops, you are so close.';
        stageCaptionEl.textContent = "It is hard journey. Don't give up. Let's have another try. You will get there.";
        stageImgEl.setAttribute('src', '/img/loseimg.png');
        stageImgEl.setAttribute('alt', '/img/loseimg.png');
        
        revealAllLetter();
        
        
    }
        
    sortGuessLetters = '';
    sortPuzzleWord = '';
    guessLetters = [];
    correctGuessLetters = [];
    wordHistory.push(puzzleWord);
    updateWordHistoryBoard();
}

function revealAllLetter() {
    wordDisplayEl.textContent = ''; //clear board
    //reveal all letter
    for (var element of puzzleWordEl) {
        element.classList.add('reveal');
        wordDisplayEl.appendChild(element);

    }
}

function updateWordHistoryBoard() {
    let wordListElement = document.createElement('li');
    wordListElement.textContent = puzzleWord;
    wordHistoryEl.appendChild(wordListElement);
};
