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

Each object created by `$().tweet` function will be stored in the `window.tweets` object.

`$.tweet.get` is used to load every tweet stored in `window.tweets` for a user. It will return an object or array depending on the amount of tweets.
	
	$.tweet.get('frozzare')
	// => Tweet
	
	$.tweet.get('frozzare')
	// => [Tweet, Tweet]

### Build

	npm install smoosh
	make

### Changelog

* 0.6.1 - Rewritten relative_time function, removing some unnecessary code, changing callback functions and renamed $.getTweet to $.tweet.get. $.tweet.get only returns object or array with tweet(s) now. $.tweet prepares a bit for the next version. 

	Using $.each instead of for loop. Every element will get an data-tweet attribute with the tweet id. The guid will not start with 'tweet' anymore only 't' and a timestamp.
	
	Added some css to the examples. 
* 0.6 - Adding build system, Tweet id options, fixing radix errors
* 0.5 - First release