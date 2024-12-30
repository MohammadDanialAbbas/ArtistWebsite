# ArtistWebsite
A webpage for artists to add and manage artworks and for users to be able to view and somewhat interact such as liking an image, some issues remain but no longer updated.

file names essentially describe what file does
List of files:
1. public
-addArtwork.js
-addWorkshop.js
-addartworkPage.js
-signin.js
-signup.js
-userPage.js
2. gallery
-gallery.json
3. views
-addArtwork.pug
-addWorkshop.pug
-artworkPage.pug
-artworks.pug
-header.pug
-home.pug
-login.pug
-signup.pug
-userPage.pug
-users.pug
4. README.md, readme file.
5. server.js, server file.
6. Model files
7. package.json, includes project info and dependencies.

Instructions:
1. go on terminal and do "npm install pug" and "npm install express"
2. type cd Program Files\MongoDB\Server\<your-version>\bin> to be in the correct directory to start the server
3. start mongod server with the database folder ".\mongod --dbpath "C:\<insert-your-path-here>\database""
4. in a separate terminal run “node database-initializer” then "node server.js" in the folder they are located
5. go on browser and search localhost:3000

Stylistic Design Decisions:
used ul and li for formatting it like a list


Functionality Design Decisions:
1.used li for readability, resized image in artwork for usability
