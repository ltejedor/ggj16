/*
Hippie profile for easy copypasting :)
This is a metaphor that surfaces from time to time. I'm not even sure what it signifies, but it seems accurate of me in a way. I'm often a close bystander to the action on life's stage, without being quite part of the action, but it's not the front row either. however I sometimes sneak a signal to a cast member who has forgotten his or her line.

Of course, the view from row C varies with the actors and stage settings.

Right now I will take a short Intermission, in order to chomp on some emergency potato chips. When I get back to my seat, maybe I'll find there a note left from you.
*/

dateStart();
var datingSiteVisible;
var dateTurns = 0;
var convoTurns = 0;
var love_score = 40;
var trust_score = 40;
var person = "hippie";

function dateStart(){
	datingSite();
}


function datingSite(){
	$( ".js-cover" ).fadeIn( "slow" );
	$('.js-dating-profile').slideDown("slow");
	datingSiteVisible = true;
}

if(datingSiteVisible){
	$('.js-cover, .js-start-btn, .js-x-btn').click(function(){
		$( ".js-cover" ).fadeOut( "slow" );
		$('.js-dating-profile').slideUp("slow");
		datingSiteVisible = false;
	});
	startConversation();

}

function startConversation(){
	if(conv_hippie[dateTurns] === undefined){
		$('.js-they-textbox').fadeOut();
		$('.js-textbox-container-you').fadeIn();
		$('.js-ask-number-text').fadeIn();
	}
	else if(conv_hippie[dateTurns].length != 2){
		$('.js-they-textbox').fadeOut();

		$('.js-textbox-container-you').fadeIn();
		$('.js-you-ask-txt').css('display', 'block');

		for(var i = 0; i < conv_hippie[dateTurns].length; i++){
			var currentTopic = conv_hippie[dateTurns][i].prompt_text;
			$('.js-topic-' + i).text(currentTopic);
		}
	}
	else{
		$('.js-they-textbox-content').fadeOut(function(){
			$('.js-they-textbox-content').text(conv_hippie[dateTurns][0]);
		});

		$('.js-they-textbox-content').fadeIn("fast");

		$('.js-textbox-container-you').fadeIn();
		$('.js-you-answer-txt').css('display', 'block');


		for(var i = 0; i < conv_hippie[dateTurns][1].length; i++){
			var currentAnswer = conv_hippie[dateTurns][1][i].answer_text;
			if(currentAnswer.charAt(0) === "("){
				$('.js-answer-container-' + i).removeClass('btn-truth');
				$('.js-answer-container-' + i).addClass('btn-lie');
			}
			else{
				$('.js-answer-container-' + i).addClass('btn-truth');
				$('.js-answer-container-' + i).removeClass('btn-lie');
			}
			$('.js-answer-container-' + i).text(currentAnswer);
		}

	}
}

$('.js-number-btn').click(function(){
	$('.js-textbox-container-you').fadeOut("fast");
	$('.js-they-textbox').fadeIn("fast");
	$('.js-they-textbox-content').text('');
	$('.js-loading-question').fadeIn();
	  setTimeout(function () {
      $('.js-loading-question').fadeOut("fast", function(){
	      	if(love_score > 75 && trust_score > 50){
		  		$('.js-they-textbox-content').text('Absolutely, here it is. Me and the meowsters can\'t wait to see you later.');
				if (person==="catlady") {
					$(".person").attr("src","img/jenn-photos/happy.jpg");
				}
		  	}else{
		  		$('.js-they-textbox-content').text('Oh, I don\'t think so. This has been quite dreadful, I think I\'m done dating for some time.');
				if (person==="catlady") {
					$(".person").attr("src","img/jenn-photos/grossedout.jpg");
				}
		  	}
      });


  }, 4000);
});



$('.js-topic-btn').click(function(){
	$('.js-textbox-container-you').fadeOut();
	$('.js-you-ask-txt').css('display', 'none');

	var thisTopicNum = parseInt($(this).attr('name'));

	$('.js-they-textbox').fadeIn();
	$('.js-they-textbox-content').text(conv_hippie[dateTurns][thisTopicNum].response_txt);

	var old_love_score = love_score;
	var old_trust_score = trust_score;
	love_score = Math.min(100,love_score + conv_hippie[dateTurns][thisTopicNum].love_pts);
	trust_score = Math.min(100,trust_score + conv_hippie[dateTurns][thisTopicNum].trust_pts);
	updateState("hippie",love_score,trust_score,old_love_score,old_trust_score);

	dateTurns++;
  setTimeout(function () {
      startConversation();
  }, 4000);

});

$('.js-answer-btn').click(function(){
	$('.js-textbox-container-you').fadeOut();
	$('.js-you-answer-txt').css('display', 'none');

	var thisAnswerNum = parseInt($(this).attr('name'));

	$('.js-they-textbox-content').text(conv_hippie[dateTurns][1][thisAnswerNum].response_txt);

	var old_love_score = love_score;
	var old_trust_score = trust_score;
	love_score = Math.min(100,love_score + conv_hippie[dateTurns][1][thisAnswerNum].love_pts);
	trust_score = Math.min(100,trust_score + conv_hippie[dateTurns][1][thisAnswerNum].trust_pts);

	updateState("hippie",love_score,trust_score,old_love_score,old_trust_score);

	dateTurns++;
  setTimeout(function () {
      startConversation();
  }, 4000);
});


function updateState(person,love_score,trust_score,old_love_score,old_trust_score) {
  love_score_pct = love_score + '%';
  trust_score_pct = trust_score + '%';
	$('.js-attraction-bar').width(love_score_pct);
	$('.js-trust-bar').width(trust_score_pct);

	    love_score_pct = love_score + '%';
	    trust_score_pct = trust_score + '%';
		$('.js-attraction-bar').width(love_score_pct);
		$('.js-trust-bar').width(trust_score_pct);
		if (trust_score + love_score - old_love_score - old_trust_score > 10) {
			if (person==="catlady") {
				$(".person").attr("src","img/jenn-photos/happy.jpg");
			}
			else if (person==="hippie") {
				$(".person").attr("src","img/hippie-photos/happy.jpg");
			}
		}
		else if (trust_score + love_score - old_love_score - old_trust_score < -10) {
			if (person==="catlady") {
				$(".person").attr("src","img/jenn-photos/grossedout.jpg");
			}
			else if (person==="hippie") {
				$(".person").attr("src","img/hippie-photos/grossedout.jpg");
			}
		}
		else {
			if (person==="catlady"){
				$(".person").attr("src","img/jenn-photos/neutral.jpg");
			}
			else if (person==="hippie"){
				$(".person").attr("src","img/hippie-photos/neutral.jpg");
			}
		}
		
}
