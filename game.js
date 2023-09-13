import readline from "readline-sync";

let scoreBoard = 0;
let highScore = 0;
let start = false;

const levels = [
    { min: 1, max: 50, maxAttempts: 10 },
    { min: 1, max: 100, maxAttempts: 10 },
    { min: 1, max: 150, maxAttempts: 10 },
    { min: 1, max: 200, maxAttempts: 10 },
    { min: 1, max: 250, maxAttempts: 10 },
    { min: 1, max: 300, maxAttempts: 8 },
    { min: 1, max: 350, maxAttempts: 8 },
    { min: 1, max: 400, maxAttempts: 6 },
    { min: 1, max: 450, maxAttempts: 6 },
    { min: 1, max: 500, maxAttempts: 4 },
];

let currentLevel = 0;

startGame();

while (start) {
    const result = game();

    if (result.hit) {
        console.log(
            `Congratulations! You guessed the number in ${result.attempt} attempt.`
        );
        console.log(`Your score: ${scoreBoard}`);
    } else {
        console.clear();
        intro();
        console.log(
            `Sorry, you've reached the maximum number of guesses. The correct number was ${result.trueNumber}.`
        );
        console.log(`Your score: ${scoreBoard} Loser`);
        scoreBoard = 0;
    }

    const playAgain = readline.question("Do you want to continue? (y/n): ");
    console.clear();
    if (playAgain === "") {
        console.log("Please enter y/n");
    } else if (playAgain.toLowerCase() === "y") {
        if (currentLevel < levels.length - 1) {
            currentLevel++;
            console.clear();
            intro();
            showScore();
        } else {
            console.log("Congratulations! You've completed all levels!");
            if (scoreBoard > highScore) {
                highScore = scoreBoard;
                console.log(`Congrats :D New Highscore : ${highScore}`);
                scoreBoard = 0;
            }
            startGame();
        }
    } else {
        if (scoreBoard > highScore) {
            highScore = scoreBoard;
            console.log(`Congrats :D New Highscore : ${highScore}`);
            scoreBoard = 0;
        }
        console.log("Goodbye!");
        startGame();
    }
}

function startGame() {
    intro();
    const userInput = readline.question("Type 'Start' to begin: ");

    if (userInput.toLowerCase() === "start") {
        console.clear();
        intro();
        showScore();
        start = true;
        currentLevel = 0;
    }
}

function intro() {
    const { min, max, maxAttempts } = levels[currentLevel];
    console.log("================================================");
    console.log("______Welcome to the Guess The Number Game______");
    console.log("================================================");
    console.log(`You have ${maxAttempts} attempts to guess the right number.`);
    console.log(`________The Number is between ${min} and ${max} ________`);
    console.log("================================================");
    console.log("_________________Have  Fun!_____________________");
    console.log("================================================");
}

function showScore() {
    console.log(
        `Current Score is ${scoreBoard}.              Highscore: ${highScore}`
    );
    console.log("================================================");
}

function game() {
    const { min, max, maxAttempts } = levels[currentLevel];
    let attempt = 1;
    let hit = false;
    const trueNumber = randomNumber(min, max);

    while (attempt <= maxAttempts) {
        const input = getInput();

        if (input === trueNumber) {
            hit = true;
            toScoreBoard(attempt);
            return { hit, attempt, trueNumber };
        } else if (input < trueNumber) {
            console.log("Try a higher number");
        } else if (input > trueNumber) {
            console.log("Try a lower number");
        }

        attempt++;
    }

    return { hit, attempt, trueNumber };
}

function randomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getInput() {
    const input = parseInt(readline.question("Guess a number: "));

    const { min, max } = levels[currentLevel];

    if (input === "" || isNaN(input) || input > max || input < min) {
        console.clear();
        intro();
        showScore();
        console.log(`Please insert a number between ${min} and ${max}`);
        return getInput();
    } else {
        return input;
    }
}

function toScoreBoard(attempt) {
    let score = 100 - (attempt - 1) * 5;
    scoreBoard += score;
}
