const { MongoClient } = require("mongodb");
const fs = require("fs").promises;
const User = require('./UserModel'); // Adjust the path accordingly

const uri = "mongodb://127.0.0.1:27017/";
const client = new MongoClient(uri);

async function run() {
  try {
    await client.connect();
    console.log("Connected to MongoDB");
    const db = client.db("database");
    const artCollection = db.collection("artworkCollection");
    const userCollection =db.collection("userCollection")
    const workshopCollection = db.collection('workshopCollection')
    await artCollection.drop();
    await userCollection.drop();
    await workshopCollection.drop();

    // Read data from gallery.json
    const galleryData = await fs.readFile("./gallery/gallery.json");
    const artworks = JSON.parse(galleryData);
    const uniqueArtists = [...new Set(artworks.map((artwork) => artwork.Artist))];
    console.log(uniqueArtists);
    const userDocuments = uniqueArtists.map(artistName => ({
      username: artistName,
      password: "1",
      type: "Artist",
    }));

    // Use insertMany to insert all user documents at once
    const result0 = await userCollection.insertMany(userDocuments);
    console.log("Successfully inserted " + result0.insertedCount + " users.");
    const result1 = await artCollection.insertMany(artworks);
    console.log("Successfully inserted " + result1.insertedCount + " arts.");
  } catch (error) {
    console.error("Error connecting to MongoDB or inserting data:", error);
  } finally {
    await client.close();
  }
}

run().catch(console.dir);

//"C:\Program Files\MongoDB\Server\7.0\bin\mongod.exe" --dbpath="C:\Users\Owner\Documents\Comp-2406\Final\database"