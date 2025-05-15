const dotenv = require('dotenv');
dotenv.config();

const express = require('express');
const contacts = express.Router();

const { MongoClient, ObjectId } = require('mongodb');

let database;

const initDb = (callback) => {
    if (database) {
        console.log('Database is already initialized!');
        return callback(null, database);
    }
    MongoClient.connect(process.env.MONGODB_URL)
        .then((client) => {
            database = client.db();
            console.log('Database initialized!');
            return callback(null, database);
        })
        .catch((err) => {
            return callback(err);
        });
};

const getDatabase = () => {

    if (!database) {
        throw Error('Database not initialized!');
    }
    return database;
}

// GET all contacts
contacts.get('/', async (req, res) => {
    try {
        const db = getDatabase();
        const contactsList = await db.collection('contacts').find().toArray();
        res.status(200).json(contactsList);
    } catch (err) {
        res.status(500).json({ message: 'Error retrieving contacts' });
    }
});

// GET a contact by ID
contacts.get('/:id', async (req, res) => {
    try {
        const db = getDatabase();
        const contact = await db.collection('contacts').findOne({ _id: new ObjectId(req.params.id) });
        if (!contact) {
            return res.status(404).json({ message: 'Contact not found' });
        }
        res.status(200).json(contact);
    } catch (err) {
        res.status(500).json({ message: 'Error retrieving contact' });
    }
});

module.exports = {
    initDb,
    getDatabase,
    contacts
};
