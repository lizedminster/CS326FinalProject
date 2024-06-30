Hello! Welcome to my 326 assignment website!!

In order to populate the data to play this, you will have to navigate to the developer's page.
The username is x and the password is x. 

The following google doc contains Imgur links to all of the gacha card designs with their names
In order to add the images in the developers console, navigate to the Imgur listing for each character and copy the image address, then paste it in the "img" textbox.

https://docs.google.com/document/d/1MzuxT5kXdCtuE1Wjeodmpstw0MFknCh2I0Z1976nK5M/edit?usp=sharing

Endpoints:
/create: If you include an ID, a name, and an image link, you can add that new object to the gacha database. 200 is success, 400 is missing info, 500 is server error, often because of duplicate ids.

/read: If you include the ID, you can read out the information for that object. 200 is success, 404 is missing the object requested.

/update: If you include an ID, a name, and an image link, you can update the object at that ID with the selected names & images. 200 is success, 404 is missing the object requested.

/delete: If you include the ID, you can delete the object at that ID. 200 is success, 404 is missing the object requested.

/destroy: If you would like to empty the database, you can use this endpoint. ***You then have to restart the server***, so do not destroy the database & then continue to try to add, delete, etc. 200 is success, 404 is missing the db requested.

/random: If you would like to draw a random object from the database, this endpoint will allow you to do so. 200 is success, 400 is missing info, possibly because there were no gachas to draw.

I chose to make gachas the thing stored in the database because this will allow artists to personalize the gatcha that they want to be in their game. If they find it motivating to try to earn their own types of pictures, then this would be a good feature. An alternative use of the gacha backend system would be using images of rewards. If you find it hard to study, you can add screenshots of text such as "Get to watch a movie" or "Get to take a bubble bath" or "Get to eat a whole package of strawberries". The options are endless. 

In order to use this, you will need to have installed express & pouchdb.

To get this code, you can clone the repository using github desktop (my upmost reccomendation) via the link.

As of this version, there should be 9 gachas. 

If you would like to personalize the sign in, you can change that in signIn.js (not signInJs.js)

If you would like to personalize the questions, you can change that in trivia.js

If you are the people grading my assignment, thank you for taking the time to read all the way up to here & I hope you enjoy my code & strategies. If you are someone who has no relation to 326, thank you for exploring this game! I hope it is helpful or fun to you in some way. It is very adjustable, so feel free to change the settings on the coins/payments/points etc. 