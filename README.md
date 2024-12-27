# ArtistWebsite
A webpage for artists to add and manage artworks and for users to be able to view and somewhat interact such as liking an image, some issues remain but no longer updated.

List of files and their purpose:
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
7. package.json, includes project info and dependancies.
Instructions:
1. go on terminal and do "npm install pug" and "npm install express" and start mongod server
2.run “node data-initializer” then "node server.js"
3. go on browser and search localhost:3000
Stylistic Design Decisions:
used ul and li for formatting it like a list
Functionality Design Decisions:
1.used li for readability, resized image in artwork for usability
Function names essentially describe what function does
