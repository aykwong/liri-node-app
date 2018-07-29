require("dotenv").config();

//Starting up the node modules needed to run the following code
var keys = require('./keys');
var fs = require('fs');
var request = require(`request`);
var Spotify = require('node-spotify-api');

//Retrieving the commands and content that user inputs
var command = process.argv[2];
var content = process.argv[3];
var spotify = new Spotify(keys.spotify);
// var client = new twitter(keys.twitter);

//Running certain functions depending on user input
switch (command) {
  // case "my-tweets":
  //   twitterRun();
  //   break;

  case "spotify-this-song":
    spotifyRun();
    break;

  case "movie-this":
    omdbRun();
    break;

  case "do-what-it-says":
    whatItSays();
    break;
};

function spotifyRun() {
  if (!content) {
    content = "The Sign";
  }

  spotify.search({ type: "track", query: content, limit: 1 }, function(err, data) {
    if (err) {
      return console.log("Error occurred: " + err);
    }

    data = JSON.parse(JSON.stringify(data));

    console.log(
      `Artists: ${data.tracks.items[0].album.artists[0].name}`,
      `\nTrack: ${data.tracks.items[0].name}`,
      `\nPreview: ${data.tracks.items[0].preview_url}`,
      `\nAlbum: ${data.tracks.items[0].album.name}`
    );
  });
};

function omdbRun() {
  if (!content) {
    content = "Mr.Nobody";
  }

  //omdb is placed here such that if content is undefined, the previous if statement will be in scope
  var omdb = `http://www.omdbapi.com/?t="${content}"&y=&plot=short&apikey=trilogy`;

  request(omdb, function(error, response, body) {
    if (!error && response.statusCode === 200) {
      body = JSON.parse(body, null, 2);
      console.log(
        `Title: ${body.Title}`,
        `\nYear: ${body.Year}`,
        `\nIMDB Rating: ${body.imdbRating}`,
        `\n${body.Ratings[1].Source} Rating: ${body.Ratings[1].Value}`,
        `\nCountry Produced: ${body.Country}`,
        `\nLanguage: ${body.Language}`,
        `\nPlot: ${body.Plot}`,
        `\nActors: ${body.Actors}`
      );
    }
  });
}

function whatItSays() {
  fs.readFile("random.txt", "utf8", function(err, data) {
    if (err) {
      return console.log("Error occurred: " + err);
    }

    //Taking the string in the other file and breaking it into runnable code
    data = data.split(",");
    command = data[0];
    content = data[1];

    spotifyRun();
  });
}