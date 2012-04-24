# jQuery.tweet.js

A jQuery plugin that displays tweet(s) on your site, blog or wathever. It's easy to use. It will auto format the hash tag, links and name.

You can load as many accounts at the time you like with this plugin. It will give every account it load a unique id.

__Note__ It will do one request to the Twitter API for each account.

### Basic use

This will load one tweet (include rts) from the username you specified and show it.

		
	$('.tweet').tweet('frozzare');

[Example file](https://github.com/Frozzare/jquery.tweet.js/blob/master/examples/basic.html)

### Options 

* id - Load a specific tweet by the tweet id, must be a string value. Default empty
* screen_name or username - The user to load tweets from
* include_rts - Include retweets or not. Default true
* max_id - Results with an ID less than (that is, older than) or equal to the specified ID.
* since_id - Results with an ID greater than (that is, more recent than) the specified ID. 
* count - The amount of tweets to load. Default 1
* show - The amout of tweets to show. Default 0 (show all)
* list - Append li tags around every tweets. Defult false
* avatar - Show avatar. Default false
* https - Use https instead of http. Default false (No need to set this to true when https is the protocol)

### Examples

#### List example

	<ul class="tweets">Loading tweets</ul>
	
	$('.tweets').tweet({
		screen_name: 'frozzare',
		list: true,
		count: 5
	});
	
[Example file](https://github.com/Frozzare/jquery.tweet.js/blob/master/examples/list.html)

#### Avatar example

	<ul class="tweets">Loading tweets</ul>
	
	$('.tweet').tweet({
		screen_name: 'frozzare',
		avatar: true,
		list: true,
		count: 5
	});
	
	<p class="tweet"><img src="…"> tweet</p>

[Example file](https://github.com/Frozzare/jquery.tweet.js/blob/master/examples/avatar.html)
	
#### Tweet ID example

	<p class="tweet">Loading tweets</p>
	
	$('.tweet').tweet({ id: '194120642130477056' });

Or you can use the shortcut string

	$('.tweet').tweet('id:194120642130477056');

[Example file](https://github.com/Frozzare/jquery.tweet.js/blob/master/examples/tweetid.html)

### Advanced

You can get the object that's created when you run `$().tweet()` is store in a unique object that you can access with `$.getTweet()` function. 

If you request the user timeline once, the function will return  object else array.
	
	$.getTweet('frozzare')
	// => Tweet
	
	$.getTweet('frozzare')
	// => [Tweet, Tweet]
	
Every Tweet object has an array called `tweets` that store all tweets you request from Twitter API.

All tweets for each user is store in `window.tweets` object.

### Build

	npm install smoosh
	node build.js

### Changelog

* 0.5 - First release
* 0.6 - Adding build system, Tweet id options, fixing radix errors