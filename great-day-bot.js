console.log('The great day bot is firing up');

var Twit = require('twit');

var twitter_api = require('./config').twitter_api; // Load your twitter API keys from config
var T = new Twit(twitter_api);

// Setting up a user stream
var stream = T.stream('user');

// Anytime someone tweets at me
stream.on('tweet', tweetEvent);

function tweetEvent(eventMsg) {
	
	//print out tweet that came in
	console.log(eventMsg.text);
	
	var replyto = eventMsg.in_reply_to_screen_name;
	var text = eventMsg.text;
	var from = eventMsg.user.screen_name;
	
	// Place your bot's handle here
	if (replyto === 'YourHandleHere') { 
		var newtweet = 'Hi @' + from + ', have a great day!';
		tweetIt(newtweet);
	}
}

// A function to post tweets
function tweetIt(txt) {
	
	var statusObj = {
		status: txt
		}

	T.post('statuses/update', statusObj, tweeted);

	function tweeted(error, data, response) {
		if (error) {
			console.log(error);
		} else {
				console.log('Bot Tweeted: ', data.text);
		}
	}
}
		

		


