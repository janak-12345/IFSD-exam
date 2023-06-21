const prompt = require("prompt-sync")();

class Politician {
  constructor(name, party, votes, money) {
    this.name = name;
    this.party = party;
    this.votes = votes;
    this.money = money;
  }

  static findMaxVotesPolitician(politicians) {
    let maxVotes = 0;
    let maxVotesPolitician = null;

    for (let i = 0; i < politicians.length; i++) {
      if (politicians[i].votes > maxVotes) {
        maxVotes = politicians[i].votes;
        maxVotesPolitician = politicians[i];
      }
    }

    return maxVotesPolitician;
  }
}

class Election {
  constructor() {
    this.politicians = [];
  }

  addPolitician(name, party, votes, money) {
    const politician = new Politician(name, party, votes, money);
    this.politicians.push(politician);
  }

  gatherPoliticiansInput() {
    const numPoliticians = parseInt(prompt("Enter the number of politicians:"));

    for (let i = 0; i < numPoliticians; i++) {
      const name = prompt(`Enter the name of politician ${i + 1}:`);
      const party = prompt(`Enter the party of politician ${i + 1}:`);
      const votes = parseInt(prompt(`Enter the votes of politician ${i + 1}:`));
      const money = parseFloat(prompt(`Enter the money of politician ${i + 1}:`));

      this.addPolitician(name, party, votes, money);
    }
  }

  findMaxMoneyPolitician() {
    let maxMoney = 0;
    let maxMoneyPolitician = null;

    for (let i = 0; i < this.politicians.length; i++) {
      if (this.politicians[i].money > maxMoney) {
        maxMoney = this.politicians[i].money;
        maxMoneyPolitician = this.politicians[i];
      }
    }

    return maxMoneyPolitician;
  }
}

function main() {
  const election = new Election();
  election.gatherPoliticiansInput();

  const maxVotesPolitician = Politician.findMaxVotesPolitician(election.politicians);
  const maxMoneyPolitician = election.findMaxMoneyPolitician();

  console.log("Politician with maximum votes:");
  console.log(maxVotesPolitician);

  console.log("Politician with maximum money:");
  console.log(maxMoneyPolitician);
}

main();