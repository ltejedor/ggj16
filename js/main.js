
dateStart();
var datingSiteVisible;
var dateTurns = 0;
var convoTurns = 0;

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

	if(conv_catlady[dateTurns].length != 2){
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
			}else{
				$('.js-answer-container-' + i).addClass('btn-truth');
				$('.js-answer-container-' + i).removeClass('btn-lie');
			}
			$('.js-answer-container-' + i).text(currentAnswer);
		}

	}
}

$('.js-topic-btn').click(function(){
	$('.js-textbox-container-you').fadeOut();
	$('.js-you-ask-txt').css('display', 'none');

	var thisTopicNum = parseInt($(this).attr('name'));
	console.log(thisTopicNum)
	$('.js-they-textbox').fadeIn();
	$('.js-they-textbox-content').text(conv_catlady[dateTurns][thisTopicNum].response_txt);

	dateTurns++;
  setTimeout(function () {
      startConversation();
  }, 4000);

});

$('.js-answer-btn').click(function(){

});
