require("dotenv").config();

var keys = require('./keys');
var fs = require('fs');
var command = process.argv[2];
var content = process.argv[3];
var spotify = new spotify(keys.spotify);
var client = new twitter(keys.twitter);
var omdb = `http://www.omdbapi.com/?t="${content}"&y=&plot=short&apikey=trilogy`;

switch (command) {
  case "my-tweets":
    twitter();
    break;

  case "spotify-this-song":
    spotify();
    break;

  case "movie-this":
    omdb();
    break;

  case "do-what-it-says":
    whatItSays();
    break;
}

function spotify() {
  if (!content) {
    content = "The Sign";
  }

  spotify.search({ type: "track", query: content }, function(err, data) {
    if (err) {
      return console.log("Error occurred: " + err);
    }

    console.log(
      `Artists: ${data.artists}`,
      `\nTrack: ${content}`,
      `\nPreview: ${data.preview_url}`,
      `\nAlbum: ${data.name}`
    );
  });
};

function omdb() {
  if (!content) {
    content = "Mr. Nobody";
  }

  request(omdb, function(error, response, body) {
    if (!error && response.statusCode === 200) {
      body = JSON.parse(body);
      console.log(
        `Title: ${body.Title}`,
        `\nYear: ${body.Year}`,
        `\nIMDB Rating: ${body.imdbRating}`,
        `\n${body.Ratings[0].Source} Rating: ${body.Ratings[0].Value}`,
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
    data = data.split(",");
    command = data[0];
    content = data[1];
  });
}
