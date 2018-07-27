require("dotenv").config();

var keys = require(`keys`);
var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);
var command = process.argv[2];
var content = process.argv[3];

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

  spotify.search({ type: "track", query: content }, function(err, data) {
    if (err) {
      return console.log("Error occurred: " + err);
    }

    console.log(`Artists: ${data.artists}`, `\nTrack: ${content}`, `\nPreview: ${data.preview_url}`, `\nAlbum: ${data.name}`);
  });

};

// fs.readFile(textFile, "utf8", function(err, data) {
//   if (err) {
//     return console.log(err);
//   }
//   data = data.split(",");
//   var song = data[1];
// });



// var queryUrl = {
//     twitter = "",
//     spotify = "",
//     omdb = `http://www.omdbapi.com/?t="${movieName}"&y=&plot=short&apikey=trilogy`,
// }

// fs.readFile(textFile, "utf8", function(err, data) {});

// request(queryUrl, function(error, response, body) {
//   // If the request is successful (i.e. if the response status code is 200)
//   if (!error && response.statusCode === 200) {
//     // Parse the body of the site and recover just the imdbRating
//     // (Note: The syntax below for parsing isn't obvious. Just spend a few moments dissecting it).
//     console.log("The movie's rating is: " + JSON.parse(body).imdbRating);
//   }
// });