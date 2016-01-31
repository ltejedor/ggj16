
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
	if(console.log(conversation[dateTurns].length) != 2){
		for(var i = 0; i < conversation[dateTurns].length; i++){
			var currentTopic = conversation[dateTurns][i].prompt_text;
			$('.js-topic-' + i).text(currentTopic);
		}
	}
	else{
		console.log('this is where the dating person says stuff');
	}
}

$('.js-topic-btn').click(function(){
	$('.js-textbox-container-you').fadeOut();

	var thisTopicNum = parseInt($(this).attr('name'));
	console.log(thisTopicNum)
	$('.js-they-textbox').fadeIn();
	$('.js-they-textbox-content').text(conversation[dateTurns][thisTopicNum].response_txt);


	dateTurns++;
  setTimeout(function () {
      startConversation();
  }, 5000);

});
