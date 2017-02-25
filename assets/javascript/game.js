function HaloRPG() {
	var heroIsSelected = false;
	var defenderIsSelected = false;
	var battleEngaged = false;
	var battleComplete = false;
	var yourChar = '';
	var yourOpp = '';
	var yourDef = '';
	var attack = 0;
	var counterAttack = 0;
	var yourHealth = 0;
	var defenderHealth = 0;
	var battleScore = 0;
	var storedAttack = 0;
	var storedCounter = 0;
	var heroes = $('.heroContainer').clone();

	function playGame() {
		//USER CAN'T RESET FROM THE GET-GO!
		$('#reset').toggle(false);

		// MOVEMENT MECHANICS
		$(".hero").on("click", function () {
			if (!heroIsSelected) {
				heroIsSelected = true;
				$('#character-title').toggle(false);
				yourChar = $(this);
				yourChar.appendTo(".yourCharacter");
				yourOpp = $('.heroContainer');
				yourOpp.appendTo('.yourOpposition');
				$('.hero').addClass('evil');
				yourChar.removeClass('evil');
				$('.defender-text').toggle(false);
			}
			else if (heroIsSelected && !defenderIsSelected && !battleComplete) {
				if ($(this).attr('data-name') === yourChar.attr('data-name')) {
					alert('Please select an enemy');
				}
				else {
					defenderIsSelected = true;
					yourDef = $(this);
					yourDef.appendTo('.defender');
					$('.defender-text').toggle(false);
					$('.attack-battle-update').toggle(false);
					console.log("THE DEFENDER" + yourDef.attr('data-name'));
					console.log("Attack: " + attack);
					console.log("Your Health: " + yourHealth);
				}
			}
			else if (heroIsSelected && defenderIsSelected && !battleEngaged) {
				if ($(this).attr('data-name') === yourChar.attr('data-name')) {
					alert('Fight the enemy!')
				}
				else if($(this).attr('data-name') === yourDef.attr('data-name')) {
					alert("Click 'attack' to fight, or choose a different opponent!");
				}
				else if ($(this).attr('data-name') !== yourChar.attr('data-name')
					|| $(this).attr('data-name') !== yourDef.attr('data-name')) {
					yourDef.appendTo('.yourOpposition');
					yourDef = $(this);
					console.log(yourDef.attr('data-name'));
					yourDef.appendTo('.defender');
				}
			}
		});

		// BATTLE MECHANICS
		$('#attack').on("click", function() {
			if (defenderIsSelected && !battleEngaged && !battleComplete) {
				battleEngaged = true;
				attack = parseInt(yourChar.attr('data-attack')) + storedAttack;
				counterAttack = parseInt(yourDef.attr('data-counter-attack'));
				yourHealth = parseInt(yourChar.attr('data-health')) - storedCounter;
				defenderHealth = parseInt(yourDef.attr('data-health'));
			}
			else if (!defenderIsSelected && !battleComplete) {
				$('.attack-battle-update').toggle(false);
				$('.defender-text').toggle(true);
				$('.defender-text').text("No enemy detected");
			}


			if (defenderIsSelected && battleEngaged && !battleComplete) {
				if (defenderHealth > attack) {
					defenderHealth -= attack;
					yourHealth -= counterAttack;
					console.log(attack);
					$('.defender-text').toggle(false);
					$('.attack-battle-update').toggle(true);
					$('.counter-attack-battle-update').toggle(true);
					$('.attack-battle-update').text('You attacked ' +
						yourDef.attr('data-name') + ' for ' + attack + ' damage');
					$('.counter-attack-battle-update').text(yourDef.attr('data-name') +
						' countered ' + ' for ' + counterAttack + ' damage');
					yourChar.find('.caption').find('#health').text("HP: " + yourHealth);
					yourDef.find('.caption').find('#health').text("HP: " + defenderHealth);
					attack += parseInt(yourChar.attr('data-attack'));
					storedCounter += counterAttack;
					console.log("STORED COUNTER ATTACK DAMAGE: " + storedCounter);
				}
				else {
					battleScore++;
					yourDef.fadeToggle();
					$('.attack-battle-update').text('You have bested ' 
						+ yourDef.attr('data-name') + '. ' 
						+ 'Select another opponent to battle!' )
					$('.counter-attack-battle-update').toggle(false);
					defenderIsSelected = false;
					battleEngaged = false;
					storedAttack = attack;
				}

				//Losing Condition (user's character's health below zero)
				if (yourHealth <= 0) {
					battleComplete = true;
					$('.attack-battle-update').toggle(true);
					$('.counter-attack-battle-update').toggle(false);
					yourChar.fadeToggle();
					$('#reset').toggle(true);
					$('.attack').attr('disabled');
					$('.attack-battle-update').html('<p>You were defeated by '
						+ yourDef.attr('data-name') + '!</p>' 
						+ '<p> Press "Reset" to try again!</p>');
					$('.defender-text').toggle(false);
				}

				//Winning Condition (a set number of victories)
				if (battleScore >= 3) {
					battleComplete = true;
					$('.attack-battle-update').text('You WON!! Congratulations! ' 
						+ 'Press the "reset" button to play again!')
					$('#reset').toggle(true);
					$('.defender-text').toggle(false);
				}
			}
			console.log("Your health: " + yourHealth);
			console.log("DEFENDER IS SELECTED " + defenderIsSelected);
		});

		// RESET BUTTON MECHANICS
		$('#reset').on("click", function() {
			$('#character-title').toggle(true);
			$('.yourOpposition').empty();
			$('.defender').empty();
			$('.defender-text').empty();
			$('.attack-battle-update').empty();
			$('.heroContainer').empty();
			$('.yourCharacter').empty();
			$('.counter-attack-battle-update').empty();
			heroes.appendTo('#beginning');
			HaloRPG();
		})

	}

	playGame();
}