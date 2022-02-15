'use strict';

// Selectiong elements
let scores, activePlayer, currentScore, playing

const player0El = document.querySelector('.player--0')
const player1El = document.querySelector('.player--1')

const score1El = document.getElementById('score--0')
const score2El = document.getElementById('score--1')

const current0El = document.getElementById('current--0')
const current1El = document.getElementById('current--1')

const diceEl = document.querySelector('.dice')

const btnNew = document.querySelector('.btn--new')
const btnRoll = document.querySelector('.btn--roll')
const btnHold = document.querySelector('.btn--hold')

const init = () => {
    // Starting conditions
    scores = [0, 0]
    activePlayer = 0
    currentScore = 0
    playing = true;
    
    diceEl.classList.add('hidden')
    document.querySelector('.player--0').classList.remove('player--winner')
    document.querySelector('.player--1').classList.remove('player--winner')
    document.querySelector('.player--0').classList.add('player--active')
    document.querySelector('.player--1').classList.remove('player--active')
    document.getElementById('score--0').textContent = 0
    document.getElementById('score--1').textContent = 0
    document.getElementById('current--0').textContent = 0
    document.getElementById('current--1').textContent = 0
}

const switchPlayers = () => {
    document.getElementById(`current--${activePlayer}`).
        textContent = 0
    activePlayer = activePlayer === 0 ? 1 : 0
    currentScore = 0
    player0El.classList.toggle('player--active')
    player1El.classList.toggle('player--active')
}

init()

// Rolling dice functionality
btnRoll.addEventListener('click', () => {
    if (!playing) return
    // 1. Generation a random number
    const dice = Math.trunc((Math.random() * 6)) + 1

    // 2. Display dice
    diceEl.classList.remove('hidden')
    diceEl.src = `img/dice-${dice}.png`

    // 3. Check for rollded 1: if true, switch to next player
    if (dice === 1) {
        switchPlayers()
    } else {
        currentScore += dice
        document.getElementById(`current--${activePlayer}`).
            textContent = currentScore
    }
})

btnHold.addEventListener('click', () => {
    if (!playing) return
    // 1. add current score to active player score
    scores[activePlayer] += currentScore
    document.getElementById(`score--${activePlayer}`)
        .textContent = scores[activePlayer]

    // 2. check if the score is >= 100 ? finish the game : switch player
    if (scores[activePlayer] >= 100) {
        playing = false
        diceEl.classList.add('hidden')
        document
            .querySelector(`.player--${activePlayer}`)
            .classList.add('player--winner')

        document
            .querySelector(`.player--${activePlayer}`)
            .classList.remove('player--active')
    } else {
        switchPlayers()
    }
})

btnNew.addEventListener('click', init)