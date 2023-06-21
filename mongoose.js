const mongoose = require('mongoose');
const prompt = require('prompt-sync')();

// MongoDB Connection URI
const uri = "mongodb+srv://janakrkbsc22:VtfudkHOMcEkukM5@cluster0.ohver8k.mongodb.net/?retryWrites=true&w=majority";

// Database Name
const dbName = 'electionDB';

// Politician Schema
const politicianSchema = new mongoose.Schema({
  name: String,
  party: String,
  votes: Number,
  money: Number
});

// Politician Model
const Politician = mongoose.model('Politician', politicianSchema);

class Election {
  static async connectToDatabase() {
    try {
      // Connect to the MongoDB server
      await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
      console.log('Connected to the database');

      // Call the CRUD operations
      await Election.createPolitician();
      await Election.readPoliticians();
      await Election.updatePolitician();
      await Election.deletePolitician();
      await Election.printPoliticianWithMaxVotes();
      await Election.printPoliticianWithMaxMoney();
    } catch (error) {
      console.error('Error:', error);
    } finally {
      // Disconnect from the MongoDB server
      mongoose.disconnect();
      console.log('Connection closed');
    }
  }

  static async createPolitician() {
    const name = prompt('Enter the name of the politician: ');
    const party = prompt('Enter the party of the politician: ');
    const votes = parseInt(prompt('Enter the number of votes received: '));
    const money = parseFloat(prompt('Enter the amount of money received: '));

    const politician = new Politician({
      name: name,
      party: party,
      votes: votes,
      money: money
    });

    // Save the politician to the database
    await politician.save();
    console.log('Politician created successfully');
  }

  static async readPoliticians() {
    console.log('Reading politicians...');

    // Find all politicians in the collection
    const politicians = await Politician.find();

    for (const politician of politicians) {
      console.log(`Name: ${politician.name}, Party: ${politician.party}, Votes: ${politician.votes}, Money: ${politician.money}`);
    }
  }

  static async updatePolitician() {
    const nameToUpdate = prompt('Enter the name of the politician to update: ');

    // Find the politician with the given name
    const politician = await Politician.findOne({ name: nameToUpdate });

    if (!politician) {
      console.log('Politician not found');
      return;
    }

    const newVotes = parseInt(prompt('Enter the new number of votes for the politician: '));
    const newMoney = parseFloat(prompt('Enter the new amount of money for the politician: '));

    politician.votes = newVotes;
    politician.money = newMoney;

    // Save the updated politician to the database
    await politician.save();
    console.log('Politician updated successfully');
  }

  static async deletePolitician() {
    const nameToDelete = prompt('Enter the name of the politician to delete: ');

    // Delete the politician with the given name
    const result = await Politician.deleteOne({ name: nameToDelete });

    if (result.deletedCount > 0) {
      console.log('Politician deleted successfully');
    } else {
      console.log('Politician not found');
    }
  }

  static async printPoliticianWithMaxVotes() {
    console.log('Printing politician with the maximum votes...');

    // Find the politician with the maximum votes
    const politicianWithMaxVotes = await Politician.findOne().sort('-votes');

    if (politicianWithMaxVotes) {
      console.log(`Name: ${politicianWithMaxVotes.name}, Party: ${politicianWithMaxVotes.party}, Votes: ${politicianWithMaxVotes.votes}`);
    } else {
      console.log('No politicians found');
    }
  }

  static async printPoliticianWithMaxMoney() {
    console.log('Printing politician with the maximum money...');

    // Find the politician with the maximum money
    const politicianWithMaxMoney = await Politician.findOne().sort('-money');

    if (politicianWithMaxMoney) {
      console.log(`Name: ${politicianWithMaxMoney.name}, Party: ${politicianWithMaxMoney.party}, Money: ${politicianWithMaxMoney.money}`);
    } else {
      console.log('No politicians found');
    }
  }

  static async main() {
    await Election.connectToDatabase();
  }
}

Election.main();
