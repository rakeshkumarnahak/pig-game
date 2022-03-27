'use strict';

//Selecting the elements 
const score0El = document.querySelector("#score--0");
const score1El = document.getElementById("score--1");  //We can use any of these to select an ID
const diceEl = document.querySelector(".dice");
const btnNewGame = document.querySelector(".btn--new");
const btnRoll = document.querySelector(".btn--roll");
const btnHold = document.querySelector(".btn--hold");
const currentScore0El = document.querySelector("#current--0");
const currentScore1El = document.querySelector("#current--1");
const player0El = document.querySelector(".player--0");
const player1El = document.querySelector(".player--1");


//Declaring these variables outside of the function so that it is available everywhere
let scores, currentScore, activePlayer, playing;

const init = function(){
    scores = [0, 0];
    currentScore = 0;
    activePlayer = 0;
    playing = true; // To check whether the game is playing or not
    
    diceEl.classList.add("hidden");
    player0El.classList.remove("player--winner");
    player1El.classList.remove("player--winner");
    player0El.classList.remove("player--active");
    player1El.classList.add("player--active");

    score0El.textContent = 0;
    score1El.textContent = 0;
    currentScore0El.textContent = 0;
    currentScore1El.textContent = 0;
};
//Run the init function to initialise the game
init();

const swithPlayer = function(){
            document.getElementById(`current--${activePlayer}`).textContent = 0;
            activePlayer = activePlayer === 0 ? 1: 0;
            currentScore = 0;
            player0El.classList.toggle("player--active");
            player1El.classList.toggle("player--active");
};

//Setting up the starting conditions
score0El.textContent = 0;
score1El.textContent = 0;
diceEl.classList.add("hidden");

//Generating a random dice roll
btnRoll.addEventListener("click", function(){
    if(playing){
        //1. Generate a random dice roll
        const dice = Math.trunc( Math.random() * 6) + 1;

        //2. Display the dice roll
        diceEl.classList.remove("hidden");
        diceEl.src = `dice-${dice}.png`;


        //3. Check for rolled 1: if true, then swith player
        if(dice !== 1){
            //Add dice to current score
            currentScore += dice;
            document.getElementById(`current--${activePlayer}`).textContent = currentScore;

        }else {
            //Switch to next player
        swithPlayer();

        }
    }
});

//When the hold button is pressed
btnHold.addEventListener("click", function(){
    if (playing) {
        scores[activePlayer] += currentScore;
        document.getElementById(`score--${activePlayer}`).textContent = scores[activePlayer];
        
        if(scores[activePlayer] >= 100){
            document.querySelector(`.player--${activePlayer}`).classList.add("player--winner");
            document.querySelector(`.player--${activePlayer}`).classList.remove("player--active");
            playing = false;
            diceEl.classList.add("hidden");
            
        }else{
            swithPlayer();
        }
    }

});

//JavaScript calls the init function whenever the NewGame button is clicked
btnNewGame.addEventListener("click", init);