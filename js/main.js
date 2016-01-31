dateStart();
var datingSiteVisible;
var dateTurns = 0;
var convoTurns = 0;
var love_score = 40;
var trust_score = 40;

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
	if(conv_catlady[dateTurns] === undefined){
		$('.js-they-textbox').fadeOut();
		$('.js-textbox-container-you').fadeIn();
		$('.js-ask-number-text').fadeIn();
	}
	else if(conv_catlady[dateTurns].length != 2){
		$('.js-they-textbox').fadeOut();

		$('.js-textbox-container-you').fadeIn();
		$('.js-you-ask-txt').css('display', 'block');

		for(var i = 0; i < conv_catlady[dateTurns].length; i++){
			var currentTopic = conv_catlady[dateTurns][i].prompt_text;
			$('.js-topic-' + i).text(currentTopic);
		}
	}
	else{
		$('.js-they-textbox-content').fadeOut(function(){
			$('.js-they-textbox-content').text(conv_catlady[dateTurns][0]);
		});

		$('.js-they-textbox-content').fadeIn("fast");

		$('.js-textbox-container-you').fadeIn();
		$('.js-you-answer-txt').css('display', 'block');


		for(var i = 0; i < conv_catlady[dateTurns][1].length; i++){
			var currentAnswer = conv_catlady[dateTurns][1][i].answer_text;
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
});

$('.js-topic-btn').click(function(){
	$('.js-textbox-container-you').fadeOut();
	$('.js-you-ask-txt').css('display', 'none');

	var thisTopicNum = parseInt($(this).attr('name'));

	$('.js-they-textbox').fadeIn();
	$('.js-they-textbox-content').text(conv_catlady[dateTurns][thisTopicNum].response_txt);

	var old_love_score = love_score;
	var old_trust_score = trust_score;
	love_score = Math.min(100,love_score + conv_catlady[dateTurns][thisTopicNum].love_pts);
	trust_score = Math.min(100,trust_score + conv_catlady[dateTurns][thisTopicNum].trust_pts);
	updateState(love_score,trust_score,old_love_score,old_trust_score);

	console.log('love points ' + love_score);
	console.log('trust points ' + trust_score);

	dateTurns++;
  setTimeout(function () {
      startConversation();
  }, 4000);

});

$('.js-answer-btn').click(function(){
	$('.js-textbox-container-you').fadeOut();
	$('.js-you-answer-txt').css('display', 'none');

	var thisAnswerNum = parseInt($(this).attr('name'));

	$('.js-they-textbox-content').text(conv_catlady[dateTurns][1][thisAnswerNum].response_txt);

	var old_love_score = love_score;
	var old_trust_score = trust_score;
	love_score = Math.min(100,love_score + conv_catlady[dateTurns][1][thisAnswerNum].love_pts);
	trust_score = Math.min(100,trust_score + conv_catlady[dateTurns][1][thisAnswerNum].trust_pts);

	console.log('love points ' + love_score);
	console.log('trust points ' + trust_score);

	updateState(love_score,trust_score,old_love_score,old_trust_score);

	dateTurns++;
  setTimeout(function () {
      startConversation();
  }, 4000);
});


function updateState(love_score,trust_score,old_love_score,old_trust_score) {
	    love_score_pct = love_score + '%';
	    trust_score_pct = trust_score + '%';
		$('.js-attraction-bar').width(love_score_pct);
		$('.js-trust-bar').width(trust_score_pct);

}
