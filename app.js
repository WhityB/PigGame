/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

let scores, roundScore, activePlayer, isGamePlaying;

init();


document.querySelector('.btn-roll').addEventListener('click', function(e){
	if(isGamePlaying) {
			// 1. Randome dice
		let dice = Math.floor(Math.random()*(7-1)+1);
		// 2. Display the results
		let diceDOM = document.querySelector('.dice');
		diceDOM.src = 'dice-' + dice + '.png';

		if(dice > 1) {
			roundScore += dice
			document.querySelector('#current-' + activePlayer).textContent = roundScore;
			document.querySelector('.dice').style.display = 'block';
		} else {
			// Next player
			nextPlayer();
		}
	}
});

document.querySelector('.btn-hold').addEventListener('click', function(e){
	if(isGamePlaying) {
		// Add current score to Global score
		scores[activePlayer] += roundScore;

		// update UI
		document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];
		
		// check if player won the game
		if (scores[activePlayer] >= 100) {
			document.getElementById('name-' + activePlayer).textContent = 'winner';
			document.querySelector('.dice').style.display = 'none';
			document.querySelector('.player-'+ activePlayer +'-panel').classList.add('winner');
			document.querySelector('.player-'+ activePlayer +'-panel').classList.remove('active');
			isGamePlaying = false;
		} else {
			//next player
			nextPlayer();
		}
	}
});

document.querySelector('.btn-new').addEventListener('click', init);

function nextPlayer() {
	activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
	roundScore = 0;
	document.getElementById('current-0').textContent = '0';
	document.getElementById('current-1').textContent = '0';
	document.querySelector('.player-0-panel').classList.toggle('active');
	document.querySelector('.player-1-panel').classList.toggle('active');
	document.querySelector('.dice').style.display = 'none';
}

function init(){
	scores = [0, 0];
	roundScore = 0;
	activePlayer = 0;
	isGamePlaying = true;

	document.querySelector('.dice').style.display = 'none';

	document.getElementById('score-0').textContent = '0';
	document.getElementById('score-1').textContent = '0';
	document.getElementById('current-0').textContent = '0';
	document.getElementById('current-1').textContent = '0';
	document.getElementById('name-0').textContent = 'Player 1';
	document.getElementById('name-1').textContent = 'Player 2';
	document.querySelector('.player-0-panel').classList.remove('winner');
	document.querySelector('.player-1-panel').classList.remove('winner');
	document.querySelector('.player-0-panel').classList.remove('active');
	document.querySelector('.player-1-panel').classList.remove('active');
	document.querySelector('.player-0-panel').classList.add('active');
}