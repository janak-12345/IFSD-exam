import React, { useState } from "react";

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

function Politicians() {
  const [politicians, setPoliticians] = useState([]);
  const [maxVotesPolitician, setMaxVotesPolitician] = useState(null);
  const [maxMoneyPolitician, setMaxMoneyPolitician] = useState(null);

  const gatherPoliticiansInput = () => {
    const numPoliticians = parseInt(prompt("Enter the number of politicians:"));

    const updatedPoliticians = [];

    for (let i = 0; i < numPoliticians; i++) {
      const name = prompt(`Enter the name of politician ${i + 1}:`);
      const party = prompt(`Enter the party of politician ${i + 1}:`);
      const votes = parseInt(prompt(`Enter the votes of politician ${i + 1}:`));
      const money = parseFloat(prompt(`Enter the money of politician ${i + 1}:`));

      const politician = new Politician(name, party, votes, money);
      updatedPoliticians.push(politician);
    }

    setPoliticians(updatedPoliticians);
  };

  const findMaxPoliticians = () => {
    const maxVotesPolitician = Politician.findMaxVotesPolitician(politicians);
    const election = new Election();
    election.politicians = politicians;
    const maxMoneyPolitician = election.findMaxMoneyPolitician();

    setMaxVotesPolitician(maxVotesPolitician);
    setMaxMoneyPolitician(maxMoneyPolitician);
  };

  return (
    <div>
      <button onClick={gatherPoliticiansInput}>Enter Politicians</button>
      <button onClick={findMaxPoliticians}>Find Max Politicians</button>

      <div>
        <h2>Politician with maximum votes:</h2>
        {maxVotesPolitician && (
          <ul>
            <li>Name: {maxVotesPolitician.name}</li>
            <li>Party: {maxVotesPolitician.party}</li>
            <li>Votes: {maxVotesPolitician.votes}</li>
            <li>Money: {maxVotesPolitician.money}</li>
          </ul>
        )}
      </div>

      <div>
        <h2>Politician with maximum money:</h2>
        {maxMoneyPolitician && (
          <ul>
            <li>Name: {maxMoneyPolitician.name}</li>
            <li>Party: {maxMoneyPolitician.party}</li>
            <li>Votes: {maxMoneyPolitician.votes}</li>
            <li>Money: {maxMoneyPolitician.money}</li>
          </ul>
        )}
      </div>
    </div>
  );
}

export default Politicians;
