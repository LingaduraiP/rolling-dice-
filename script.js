const resetGame = document.querySelector(".btn--new");
const rollDice = document.querySelector(".btn--roll");
const holdScore = document.querySelector(".btn--hold");

const player0 = document.querySelector(".player--0");
const player1 = document.querySelector(".player--1");

let player0Score = document.querySelector("#score--0");
let player1Score = document.querySelector("#score--1");

let player0Current = document.querySelector("#current--0");
let player1Current = document.querySelector("#current--1");

const img = document.querySelector(".dice");

let CurrentScore;
let activePlayer;
let scores;
let isPlaying;

const initial = () => {
    CurrentScore = 0;
    activePlayer = 0;
    scores = [0, 0];
    isPlaying = true;

    player0Score.textContent = 0;
    player1Score.textContent = 0;
    player0Current.textContent = 0;
    player1Current.textContent = 0;

    player0.classList.add("player--active");
    player1.classList.remove("player--active");
    player0.classList.remove("player--winner");
    player1.classList.remove("player--winner");
    img.classList.add("hidden");
};
initial();

// Switching Fuction

const switchPlayer = () => {
    CurrentScore = 0;
    document.querySelector(`#current--${activePlayer}`).textContent =
        CurrentScore;
    activePlayer = activePlayer === 0 ? 1 : 0;

    player0.classList.toggle("player--active");
    player1.classList.toggle("player--active");
};

// Random  Dice Rolling Event
rollDice.addEventListener("click", () => {
    if (isPlaying) {
        const randomNumber = Math.trunc(Math.random() * 6) + 1;
        img.classList.remove("hidden");
        img.src = `dice-${randomNumber}.png`;

        if (randomNumber !== 1) {
            CurrentScore += randomNumber;
            document.querySelector(`#current--${activePlayer}`).textContent =
                CurrentScore;
        } else {
            switchPlayer();
        }
    }
});

// Holding the score

holdScore.addEventListener("click", () => {
    if (isPlaying) {
        scores[activePlayer] += CurrentScore;
        CurrentScore = 0;
        document.querySelector(`#score--${activePlayer}`).innerHTML =
            scores[activePlayer];

        // Player Winning stateMent
        if (scores[activePlayer] >= 100) {
            img.classList.add("hidden");

            document
                .querySelector(`.player--${activePlayer}`)
                .classList.add("player--winner");
            isPlaying = false;
        }
        // Switching the Player
        else {
            switchPlayer();
        }
    }
});

// Rest Game

resetGame.addEventListener("click", initial);
