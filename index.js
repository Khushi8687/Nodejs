const express = require("express");
const cors = require("cors");
const { MongoClient } = require("mongodb");

const app = express();
const port = process.env.PORT || "3000";

const dbUrl = "mongodb+srv://admin:admin@cluster0.eh9z7h0.mongodb.net/";
const client = new MongoClient(dbUrl);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors({
    origin: "*"
}));

// API endpoint to retrieve portfolio skills
app.get("/api/project", async (req, res) => {
    try {
        const skills = await getportfolio();
        res.send(JSON.stringify(skills));

    } catch (error) {
        console.error("Error fetching portfolio items:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

// MongoDB function to retrieve portfolio skills
async function getportfolio() {
    await client.connect();
    const db = client.db("portfolio");
    const portfolioCollection = db.collection("portfolio-project");
    const skills = await portfolioCollection.find({}).toArray();
    return skills;
}

// API endpoint to retrieve contact 
app.get("/api/contact", async (req, res) => {
    try {
        const contactInfo = await getContact();
        res.send(JSON.stringify(contactInfo));
    } catch (error) {
        console.error("Error fetching contact items:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

// MongoDB function to retrieve contact
async function getContact() {
    await client.connect();
    const db = client.db("portfolio");
    const contactCollection = db.collection("contact");
    const contactInfo = await contactCollection.find({}).toArray();
    return contactInfo;
}
// Start the server
app.listen(port, () => {
    console.log(`Listening on http://localhost:${port}`);
});