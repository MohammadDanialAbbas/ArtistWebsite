const express = require('express');
const app = express();
const { MongoClient } = require("mongodb");
const session = require('express-session');


app.use(express.static('public'))
app.set("view engine", "pug");
app.set("views", "views");
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const uri = "mongodb://127.0.0.1:27017/";
const client = new MongoClient(uri);
db = client.db("database");
artworkCollection = db.collection("artworkCollection");
userCollection = db.collection("userCollection");
workshopCollection = db.collection("workshopCollection")
const User = require("./UserModel");
const workshop = require("./workshopModel");
app.use(session({
    secret: 'your-secret-key',
    resave: true,
    saveUninitialized: false,
}));

function sessionChecker(req, res, next) {
    
    if (!req.session.loggedin) {
        res.status(401).redirect('/login'); 
    }
    next();
}

// Route handlers
app.get("/", sessionChecker, homepage);
app.get("/artworks", sessionChecker, getAllArtworks);
app.get("/users", sessionChecker, getAllUsers);
app.get("/artworks/:artworkTitle", sessionChecker, getArtworkDetails);
app.get("/user/:username", sessionChecker, getUserDetails);

app.get("/login", (req, res) => res.render("login", {}));
app.post("/login", login);
app.get("/logout", logout)
app.get("/signup", (req, res) => res.render("signup", {}));
app.post("/signup", signup);

app.post('/user/:username/follow', sessionChecker, followArtist);
app.post('/user/:username/unfollow', sessionChecker, unfollowArtist);
app.post('/convertToPatreon', sessionChecker, convertToPatreon);
app.post('/convertToArtist', sessionChecker, convertToArtist);
app.post('/like', sessionChecker, likeArtwork);
app.post('/unlike', sessionChecker, unlikeArtwork);


app.get('/addArtwork', sessionChecker, displayAddArtworkForm);
app.post('/addArtwork', sessionChecker, addArtwork);
app.get('/addWorkshop', sessionChecker, displayaddWorkshopForm);
app.post('/addWorkshop', sessionChecker, addWorkshop);

function homepage(req, res) {

    res.render("home", {});
}
async function getAllArtworks(req, res) {
    try {
        const artworks = await artworkCollection.find().toArray();
        res.status(200).render("artworks", { artworks });
    } catch (error) {
        console.error("Error fetching artworks:", error);
        res.status(500).send("Internal Server Error");
    }
}

async function getAllUsers(req, res) {
    try {
        const users = await userCollection.find().toArray();
        res.status(200).render("users", { users });
    } catch (error) {
        console.error("Error fetching users:", error);
        res.status(500).send("Internal Server Error");
    }
}

async function getArtworkDetails(req, res) {
    try {
        const artworkTitle = req.params.artworkTitle;
        const artwork = await artworkCollection.findOne({ Title: artworkTitle });
        const sessionusername = req.session.username;
        console.log(artwork.Artist)
        const user = await userCollection.findOne({ username: artwork.Artist });
        const suser = await userCollection.findOne({ username: sessionusername });
        if (!artwork) {
            res.status(404).send("Artwork not found.");
            return;
        }
        likes = artwork.UserWhoLiked
        likes==undefined?likes=0 : likes = artwork.UserWhoLiked.length; 
        res.render("artworkPage", { artwork,likes, user,suser });

    } catch (error) {
        console.error("Error fetching artwork details:", error);
        res.status(500).send("Internal Server Error");
    }
}

async function getUserDetails(req, res) {
    try {
        const sessionusername = req.session.username;
        const username = req.params.username;
        const iartworks = await artworkCollection.find({ Artist: username }).toArray();
        const user = await userCollection.findOne({ username: username });
        const suser = await userCollection.findOne({ username: sessionusername });
        const iworkshops = await workshopCollection.find({ Artist: username }).toArray();
        iartworks != undefined ? artworks = iartworks : artworks = [];
        user.followedArtists != undefined ? followedArtists = user.followedArtists : followedArtists = [];
        iworkshops != undefined ? workshops = iworkshops : workshops = [];
        if (!user) {
            res.status(404).send("Artist not found.");
            return;
        }

        res.status(200).render("userPage", { suser, user, workshops: workshops, artworks, followedArtists });

    } catch (error) {
        console.error("Error fetching artist details:", error);
        res.status(500).send("Internal Server Error");
    }
}

async function login(req, res) {
    const { username, password } = req.body;
    console.log(username);
    console.log(password);

    try {
        const user = await userCollection.findOne({ username, password });

        if (user) {
            req.session.loggedin = true;
            req.session.username = username;
            console.log(username);
            res.redirect('/'); 
        }else {
            res.status(401).send('Invalid credentials');
        }
    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).send('Internal Server Error');
    }
};
async function logout(req, res) {
    try {
        req.session.loggedin = false;
        res.redirect('/login'); 
    } catch (error) {
        console.error('Error during logout:', error);
        res.status(500).send('Internal Server Error');
    }
};

async function followArtist(req, res) {
    try {
        const { artistUsername } = req.body;
        const sessionUsername = req.session.username;

        const artist = await userCollection.findOne({ username: artistUsername });
        if (!artist || artist.username === sessionUsername) {
            res.status(400).send('Invalid artist username');
            return;
        }

        await userCollection.updateOne(
            { username: sessionUsername },
            { $addToSet: { followedArtists: artistUsername } }
        );

        res.status(200).send('Artist followed successfully');
    } catch (error) {
        console.error('Error following artist:', error);
        res.status(500).send('Internal Server Error');
    }
}

async function unfollowArtist(req, res) {
    try {
        const { artistUsername } = req.body;
        const sessionUsername = req.session.username;

        // Update the current user's followedArtists list
        await userCollection.updateOne(
            { username: sessionUsername },
            { $pull: { followedArtists: artistUsername } }
        );

        res.status(200).send('Artist unfollowed successfully');
    } catch (error) {
        console.error('Error unfollowing artist:', error);
        res.status(500).send('Internal Server Error');
    }
}

function displayAddArtworkForm(req, res) {
    res.render('addArtwork'); // Assuming 'addArtwork' is the Pug template file
}
async function addArtwork(req, res) {
    try {
        const artist = req.session.username;
        const { Title, Year, Category, Medium, Description, Poster } = req.body;

        await artworkCollection.insertOne({
            Title: Title,
            Artist: artist,
            Year: Year,
            Category: Category,
            Medium: Medium,
            Description: Description,
            Poster: Poster
        });

        res.redirect(`/`); 
    } catch (error) {
        console.error('Error adding artwork:', error);
        res.status(500).send('Internal Server Error');
    }
}

function displayaddWorkshopForm(req, res) {
    res.render('addWorkshop')
}
async function addWorkshop(req, res) {
    try {
        const artist = req.session.username;
        const { Title } = req.body;

        // Assuming you have a MongoDB collection named artworkCollection
        await workshopCollection.insertOne({
            Title: Title,
            Artist: artist
        });
        await userCollection.updateOne(
            { username: artist },
            { $addToSet: { workshops: { Title: Title, Artist: artist } } }
        );
        res.redirect('/'); // Redirect to the artworks page or any other page
    } catch (error) {
        console.error('Error adding artwork:', error);
        res.status(500).send('Internal Server Error');
    }
}
async function signup(req, res) {
    const { username, password } = req.body;

    try {
        const existingUser = await userCollection.findOne({ username });

        if (existingUser) {
            res.status(400).send('Username already taken');
            return;
        }

        const newUser = { username, password,type:"Patreon", followedArtists: [], workshops: [] };
        await userCollection.insertOne(newUser);

        req.session.loggedin = true;
        req.session.username = username;

        res.redirect('/');
    } catch (error) {
        console.error('Error during signup:', error);
        res.status(500).send('Internal Server Error');
    }
}
async function convertToPatreon(req, res) {
    const sessionUsername = req.session.username;
    try {
        const user = await userCollection.findOne({ username: sessionUsername });
        if (!user) {
            res.status(400).send('Invalid artist username');
            return;
        }
        await userCollection.updateOne(
            { username: sessionUsername },
            { $set: {type: "Patreon"}}
        );
        res.status(200).send('Converted to Patreon successfully');
    } catch (error) {
        console.error('Error converting to Patreon:', error);
        res.status(500).send('Internal Server Error');
    }
}

async function convertToArtist(req, res) {
    const sessionUsername = req.session.username;
    try {
        const user = await userCollection.findOne({ username: sessionUsername });
        console.log('Convert to Artist clicked for artist:', sessionUsername);
        console.log('User found:', user);
        await userCollection.updateOne(
            { username: sessionUsername },
            { $set: { type: "Artist" } }
        );
        res.status(200).render('userpage')
    } catch (error) {
        console.error('Error converting to Artist:', error);
        res.status(500).send('Internal Server Error');
    }
}

async function likeArtwork(req, res) {
    const sessionUsername = req.session.username;
    const artworkTitle = req.params.artworkTitle;

    try {
        await artworkCollection.updateOne(
            { Title: artworkTitle },
            { $addToSet: { UserWhoLiked: sessionUsername } }
        );

        res.status(200).send('Artwork liked successfully');
    } catch (error) {
        console.error('Error liking artwork:', error);
        res.status(500).send('Internal Server Error');
    }
}

async function unlikeArtwork(req, res) {
    const sessionUsername = req.session.username;
    const artworkTitle = req.params.artworkTitle;

    try {
        await artworkCollection.updateOne(
            { Title: artworkTitle },
            { $pull: { UserWhoLiked: sessionUsername } }
        );
        
        res.status(200).send('Artwork unliked successfully');
    } catch (error) {
        console.error('Error unliking artwork:', error);
        res.status(500).send('Internal Server Error');
    }
}


app.listen(3000);
console.log("Server listening at http://localhost:3000");
