var friends = require("../data/friends.js");

module.exports = function (app) {

    app.get("/api/friends", function (req, res) {
        res.json(friends);
    });

    app.post("/api/friends", function (req, res) {

        var bestMatch = {
            name: "",
            photo: "",
            friendDifference: 1000
        };

        // Take in the result of the survey and parse
        var userData = req.body;
        var userScores = userData.scores;

        // This variable will calculate the difference between the user score and the database score
        var totalDifference = 0;

        // Loop through the score possibilities in the DB
        for (var i = 0; i < friends.length; i++) {

            totalDifference = 0;

            // Then loop through all the scores of each friend
            for (var j = 0; j < friends[i].scores[j]; j++) {

                // Calculate the difference between the score and sum them into totalDifference
                totalDifference = Math.abs(parseInt(userScores[j]) - parseInt(friends[i].scores[i]));

                // If the sum of the differences is less than the bestMatch
                if (totalDifference <= bestMatch.friendDifference) {

                    // Reset the bestMatch to be the new friend
                    bestMatch.name = friends[i].name;
                    bestMatch.photo = friends[i].photo;
                    bestMatch.friendDifference = totalDifference;
                }
            }
        }

        // Save the user's data to the DB
        friends.push(userData);

        // Return in JSON
        res.json(bestMatch);
    });
};