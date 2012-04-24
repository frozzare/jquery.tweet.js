require('smoosh').config({
  "JAVASCRIPT": {
      "DIST_DIR": "./build/"
    , "jquery.tweet": [
        "./src/copyright.js"
      , "./src/jquery.tweet.js"
    ]
  }
  , "JSHINT_OPTS": {
      "boss": true
    , "forin": false
    , "curly": false
    , "debug": false
    , "devel": false
    , "evil": false
    , "regexp": false
    , "undef": false
    , "sub": true
    , "white": false
    , "indent": 2
    , "whitespace": true
    , "asi": true
    , "laxbreak": true
  }
}).run().build().analyze()