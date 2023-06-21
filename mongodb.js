const { MongoClient } = require('mongodb');
const prompt=require('prompt-sync')();

// Connection URI
const uri = "mongodb+srv://janakrkbsc22:VtfudkHOMcEkukM5@cluster0.ohver8k.mongodb.net/?retryWrites=true&w=majority";

// Database Name
const dbName = 'templesDB';

// Collection Name
const collectionName = 'temples';

class Temple {
  constructor(name, visitors) {
    this.name = name;
    this.visitors = visitors;
  }

  static calculateTotalVisitors(templeList) {
    let totalVisitors = 0;
    for (let i = 0; i < templeList.length; i++) {
      totalVisitors += templeList[i].visitors;
    }
    return totalVisitors;
  }

  static async createTemple(collection) {
    const prompt = require('prompt-sync')();

    const name = prompt('Enter the name of the temple: ');
    const visitors = parseInt(prompt('Enter the number of visitors for the temple: '));

    const temple = new Temple(name, visitors);

    // Insert temple into the collection
    const result = await collection.insertOne(temple);
    console.log(`Temple created with ID: ${result.insertedId}`);
  }

  static async readTemples(collection) {
    console.log('Reading temples...');

    // Find all temples in the collection
    const temples = await collection.find().toArray();

    for (const temple of temples) {
      console.log(`Name: ${temple.name}, Visitors: ${temple.visitors}`);
    }
  }

  static async updateTemple(collection) {
    const prompt = require('prompt-sync')();

    const nameToUpdate = prompt('Enter the name of the temple to update: ');
    const newVisitors = parseInt(prompt('Enter the new number of visitors for the temple: '));

    // Update the temple with the given name
    const result = await collection.updateOne({ name: nameToUpdate }, { $set: { visitors: newVisitors } });

    if (result.matchedCount > 0) {
      console.log(`Temple updated successfully`);
    } else {
      console.log('Temple not found');
    }
  }

  static async deleteTemple(collection) {
    const prompt = require('prompt-sync')();

    const nameToDelete = prompt('Enter the name of the temple to delete: ');

    // Delete the temple with the given name
    const result = await collection.deleteOne({ name: nameToDelete });

    if (result.deletedCount > 0) {
      console.log(`Temple deleted successfully`);
    } else {
      console.log('Temple not found');
    }
  }

  static main() {
    const prompt = require('prompt-sync')();

    async function connectToDatabase() {
      const client = new MongoClient(uri);

      try {
        // Connect to the MongoDB server
        await client.connect();
        console.log('Connected to the database');

        // Access the templesDB database
        const db = client.db(dbName);

        // Access the temples collection
        const collection = db.collection(collectionName);

        // Call the CRUD operations
        await Temple.createTemple(collection);
        await Temple.readTemples(collection);
        await Temple.updateTemple(collection);
        await Temple.deleteTemple(collection);
      } catch (error) {
        console.error('Error:', error);
      } finally {
        // Close the client connection
        await client.close();
        console.log('Connection closed');
      }
    }

    // Call the function to connect to the database and perform CRUD operations
    connectToDatabase();
  }
}

Temple.main();