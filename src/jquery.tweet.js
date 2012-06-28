(function ($, window, document, undefined) {

  "use strict";

  var guid = '',
      defaults = {
        id: null,               // [string] Load specific tweet by id.
        screen_name: '',        // [string] Load tweets from this user.
        include_rts: true,      // [boolean] Include Retweets.
        max_id: 0,              // [integer] Results with an ID less than (that is, older than) or equal to the specified ID.
        since_id: 0,            // [integer] Results with an ID greater than (that is, more recent than) the specified ID.
        count: 1,               // [integer] The amount of tweets to load.
        show: 0,                // [integer] The amount of tweets to show.
        list: false,            // [boolean] Append li tags around every tweets.
        avatar: false,          // [boolean] Show avatar.
        https: false            // [boolean] Use https instead of http. https will be used when https protocol is used.
      };

  /**
   * Create a new Tweet object
   *
   * @param {Object} element
   * @param {Object} options
   */

  function Tweet(element, options) {

    this.element = $(element);

    if (typeof options === 'string') {
      if (options.indexOf('id:') === -1) {
        options = {
          screen_name: options
        };
      } else {
        options = {
          id: options.replace('id:', '')
        };
      }
    }

    if (!options.include_rts && options.count === 1) {
      options.count = 5;
      options.show = 1;
    }

    options.callback = 'tweets.' + guid + '.twitterCallback';

    if (options.https) {
      this.protocol = 'https:';
    } else {
      this.protocol = document.location.protocol.substr(0, 4) === 'http' ? document.location.protocol : 'http:';
    }

    this.options = $.extend({}, defaults, options);

    $.getScript(this.url());
  }

  Tweet.prototype = {

    /**
     * Check if the object is a array or not
     *
     * @param {Object} a
     * @return {Boolean}
     */

    isArray: function (a) {
      return a instanceof Array;
    },

    /**
     * Parse tweet object to status html
     *
     * @param {Object} tweet
     * @return {String}
     */

    status: function (tweet) {
      var self = this,
          status = tweet.text.replace(/((https?|s?ftp|ssh)\:\/\/[^"\s\>]*[^.,;'">\:\s\>\)\]\!])/g, function (url) {
            return '<a href="' + url + '">' + url + '</a>';
          }).replace(/\B@([_a-z0-9]+)/ig, function (reply) {
            return '<a href="' + self.protocol + '//twitter.com/' + reply.substring(1) + '">' + reply + '</a>';
          }).replace(/\B#([_a-z0-9\.]+)/ig, function (hashtag) {
            return '<a href="' + self.protocol + '//twitter.com/search?q=%23' + hashtag.substring(1) + '">' + hashtag + '</a>';
          });

      status = '<span>' + status + '</span> <a href="' + this.protocol + '//twitter.com/' + this.options.screen_name + '/statuses/' + tweet.id_str + '">' + this.relative_time(tweet.created_at) + '</a>';

      if (this.options.avatar) {
        status = '<img src="' + tweet.user[this.protocol === 'https:' ? 'profile_image_url_https' : 'profile_image_url'] + '" title="' + tweet.user.name + '" />' + status;
      }

      return status;
    },

    /**
     * Get relative time string
     *
     * @param {Number} time_value
     * @return {String}
     */

    relative_time: function (time_value) {
      // Modified versio nof relative time function from Twitters JavaScript blogger.js file
      var values = time_value.split(" "),
          parsed_date = Date.parse(values[1] + ' ' + values[2] + ', ' + values[5] + ' ' + values[3]),
          delta = (parseInt((new Date().getTime() - parsed_date) / 1000, 10) * 2) + (new Date().getTimezoneOffset() * 60);

      if (delta < 60) {
        return 'less than a minute ago';
      } else if (delta < 120) {
        return 'about a minute ago';
      } else if (delta < (60 * 60)) {
        return (parseInt(delta / 60, 10)).toString() + ' minutes ago';
      } else if (delta < (120 * 60)) {
        return 'about an hour ago';
      } else if (delta < (24 * 60 * 60)) {
        return 'about ' + (parseInt(delta / 3600, 10)).toString() + ' hours ago';
      } else if (delta < (48 * 60 * 60)) {
        return '1 day ago';
      } else {
        return (parseInt(delta / 86400, 10)).toString() + ' days ago';
      }
    },

    /**
     * Generate Twitter api url
     *
     * @return {String}
     */

    url: function () {
      var params = $.extend({}, this.options),
          keys = ['list', 'avatar', 'https', 'show', 'id'];

      if (this.options.id !== null) {
        return this.protocol + '//api.twitter.com/1/statuses/show/' + this.options.id + '.json?' + $.param({
          callback: this.options.callback
        });
      } else {
        $.each(keys, function (index, value) {
          delete params[value];
        });

        // Delete since_id if it zero
        if (params.since_id === 0) {
          delete params.since_id;
        }

        // Delete max_id if it zero
        if (params.max_id === 0) {
          delete params.max_id;
        }

        return this.protocol + '//api.twitter.com/1/statuses/user_timeline.json?' + $.param(params);
      }
    },

    /**
     * JSONP Callback. Add each tweet to `this.element` after it have gone through the status makeover.
     *
     * @param {Array|Object} data
     */

    twitterCallback: function (data) {
      var show = this.options.show !== 0 ? this.options.show : this.isArray(data) ? data.length : 1;

      if (this.isArray(data)) {
        this.tweets = data;
      } else {
        this.tweets = [data];
      }

      if (this.options.id !== null) {
        // Multi ID support will come
        this.options.screen_name = this.tweets[0].user.screen_name;
      }

      this.element.empty();

      for (var i = 0; i < show; i++) {
        if (this.options.list) {
          this.element.append($('<li />', { 'data-tweet': this.tweets[i].id_str }).append(this.status(this.tweets[i])));
        } else {
          this.element.append($('<span />', { 'data-tweet': this.tweets[i].id_str }).append(this.status(this.tweets[i])));
        }
      }
    },

    /**
     * Get all tweets from `screen_name`
     *
     * @param {String} screen_name
     * @return {Array}
     */

    get: function (screen_name) {
      var tweets = [],
          _tweets = window.tweets;

      $.each(_tweets, function (key) {
        if (_tweets[key].options.screen_name.toLowerCase() === screen_name.toLowerCase()) {
          $.each(_tweets[key].tweets, function (index, value) {
            tweets.push(value);
          });
        }
      });

      return tweets.length === 1 ? tweets[0] : tweets;
    }
  };

  /**
   * Create jQuery tweet function
   *
   * @param {Object} options
   * @return {Array}
   */

  $.fn.tweet = function (options) {
    return this.each(function () {
      guid = 't' + (+new Date()).toString();
      window.tweets[guid] = new Tweet(this, options);
    });
  };

  window.tweets = {};

  /**
   * Create `$.tweet` object with tweet utilities.
   */

  $.tweet = {
    get: Tweet.prototype.get
  };
}(jQuery, window, document));