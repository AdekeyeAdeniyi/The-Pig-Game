/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLOBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

var score, roundScore, activePlayer, diceDom,gamePlaying;
init();

function init(){
	gamePlaying = true;
	score = [0,0];
	roundScore = 0;
	activePlayer = 0;
	document.querySelector('.player-'+activePlayer+'-panel').classList.add('active');
	document.querySelector('.player-1-panel').classList.remove('active');
	document.querySelector('#name-0').classList.remove('winner');
	document.querySelector('#name-1').classList.remove('winner');
	document.querySelector('#name-0').textContent = 'Player 1';
	document.querySelector('#name-1').textContent = 'Player 2';
	document.querySelector('#score-0').textContent = 0;
	document.querySelector('#score-1').textContent = 0;
	document.querySelector('#current-0').textContent = 0;
	document.querySelector('#current-1').textContent = 0;
	diceDom = document.querySelector(".dice");
	diceDom.style.display = 'none';
}

function nextPlayer(){
	activePlayer === 0 ? activePlayer = 1 : activePlayer =0;
		roundScore = 0;	

		document.querySelector('#current-'+ activePlayer).textContent = '0';
		document.querySelector('.player-0-panel').classList.toggle('active');
		document.querySelector('.player-1-panel').classList.toggle('active');
}

document.querySelector('.btn-roll').addEventListener('click', function(){
	if(gamePlaying){
		 var dice = Math.floor((Math.random() * 6) + 1);
		 //console.log(dice);
		 diceDom.style.display = 'block';
		 diceDom.src = 'imgs/dice-'+ dice +'.png';
		 //add roundScore with dice 
		if(dice !== 1){
			roundScore += dice;	
			document.querySelector('#current-'+ activePlayer).textContent = roundScore;
		}else{
			//nextPlayer
			nextPlayer();
		}
	}

});

document.querySelector('.btn-hold').addEventListener('click', function(){
	if(gamePlaying){
		//move the activePlayer roundScore to the score
		score[activePlayer] += roundScore;
		document.querySelector('#score-'+ activePlayer).textContent = score[activePlayer];

		if(score[activePlayer] >= 20){
			//display winner
			document.querySelector('#name-'+ activePlayer).textContent = 'Winner!!!';
			document.querySelector('#name-'+ activePlayer).classList.add('winner');
			diceDom.style.display='none';
			//gameOver
			gamePlaying = false;
		}else{

			//NextPlayer
			nextPlayer();
		}
	}
});

document.querySelector('.btn-new').addEventListener('click', function(){
	init();

});




