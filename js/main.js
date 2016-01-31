
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
	for(var i = 0; i < conversation[dateTurns].length; i++){
		var currentTopic = conversation[dateTurns][i].prompt_text;
		$('.js-topic-' + i).text(currentTopic);
	}
}

$('.js-topic-btn').click(function(){
	var thisTopicNum = parseInt($(this).attr('name'));
	console.log(thisTopicNum)
	$('.js-they-textbox').fadeIn();
	$('.js-they-textbox-content').text(conversation[dateTurns][thisTopicNum].response_txt);


	dateTurns++;
});
