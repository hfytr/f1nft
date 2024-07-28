class DriverNFT {
    constructor(id, name, basePerformance) {
      this.id = id;
      this.name = name;
      this.basePerformance = basePerformance;
      this.totalPoints = 0;
      this.owner = null;
      this.value = 100; // Initial market value
    }
  }
  
  class Player {
    constructor(name) {
      this.name = name;
      this.wallet = [];
      this.balance = 1000; // Initial balance
    }
  
    buyDriver(driver, price) {
      if (this.balance >= price && driver.owner !== this) {
        this.balance -= price;
        if (driver.owner) {
          driver.owner.balance += price;
          driver.owner.wallet = driver.owner.wallet.filter(d => d.id !== driver.id);
        }
        driver.owner = this;
        this.wallet.push(driver);
      }
    }
  
    sellDriver(driver, price) {
      if (this.wallet.includes(driver)) {
        driver.value = price;
      }
    }
  }
  
  class Marketplace {
    constructor() {
      this.listings = [];
    }
  
    listDriver(player, driver, price) {
      this.listings.push({ player, driver, price });
    }
  
    buyDriver(buyer, listing) {
      const { player: seller, driver, price } = listing;
      if (buyer.balance >= price && driver.owner === seller) {
        buyer.buyDriver(driver, price);
        this.listings = this.listings.filter(l => l !== listing);
      }
    }
  }
  
  class Race {
    constructor(drivers, numRaces) {
      this.drivers = drivers;
      this.numRaces = numRaces;
      this.pointsSystem = [25, 18, 15, 12, 10, 8, 6, 4, 2, 1];
    }
  
    simulateRace() {
      const performanceScores = this.drivers.map(driver => {
        const randomFactor = Math.random() * 0.4 + 0.8;
        const performanceScore = driver.basePerformance * randomFactor;
        return { driver, performanceScore };
      });
  
      performanceScores.sort((a, b) => b.performanceScore - a.performanceScore);
  
      performanceScores.forEach((item, index) => {
        if (index < this.pointsSystem.length) {
          item.driver.totalPoints += this.pointsSystem[index];
          item.driver.value += this.pointsSystem[index] * 10; // Increase value based on performance
        }
      });
  
      this.printPointsTable();
    }
  
    simulateSeason() {
      for (let i = 0; i < this.numRaces; i++) {
        console.log(`Race ${i + 1}:`);
        this.simulateRace();
      }
  
      this.drivers.sort((a, b) => b.totalPoints - a.totalPoints);
  
      console.log("Final Standings:");
      this.printPointsTable();
    }
  
    printPointsTable() {
      console.log("Points Table:");
      this.drivers.forEach(driver => {
        console.log(`${driver.name}: ${driver.totalPoints} points, Value: ${driver.value}`);
      });
      console.log("\n");
    }
  }
  
  // Example usage
  const drivers = [
    new DriverNFT(1, "Driver A", 90),
    new DriverNFT(2, "Driver B", 85),
    new DriverNFT(3, "Driver C", 80)
  ];
  
  const player1 = new Player("Player 1");
  const player2 = new Player("Player 2");
  
  const marketplace = new Marketplace();
  
  // Initial purchases
  player1.buyDriver(drivers[0], drivers[0].value);
  player2.buyDriver(drivers[1], drivers[1].value);
  
  // Listing a driver on the marketplace
  marketplace.listDriver(player1, drivers[0], 150);
  
  // Simulate a season
  const race = new Race(drivers, 10);
  race.simulateSeason();
  
  // Player 2 buys a driver from the marketplace
  marketplace.buyDriver(player2, marketplace.listings[0]);
  
  // Final state
  console.log(`${player1.name} Balance: ${player1.balance}, Wallet: ${player1.wallet.map(driver => driver.name).join(', ')}`);
  console.log(`${player2.name} Balance: ${player2.balance}, Wallet: ${player2.wallet.map(driver => driver.name).join(', ')}`);
  