import { createToken } from "./createDriver.js";
import { Sr25519Account } from "@unique-nft/sr25519";
import { readFileSync } from "node:fs";

let drivers = [
  { name: "Alex Palou", points: 100, price: 10000 },
  { name: "Will Power", points: 95, price: 9500 },
  { name: "Scott Dixon", points: 90, price: 9000 },
  { name: "Colton Herta", points: 85, price: 8500 },
  { name: "Pato O'Ward", points: 80, price: 8000 },
  { name: "Scott McLaughlin", points: 75, price: 7500 },
  { name: "Kyle Kirkwood", points: 70, price: 7000 },
  { name: "Josef Newgarden", points: 65, price: 6500 },
  { name: "Alexander Rossi", points: 60, price: 6000 },
  { name: "Santino Ferrucci", points: 55, price: 5500 },
  { name: "Christian Lundgaard", points: 50, price: 5000 },
  { name: "Marcus Ericsson", points: 45, price: 4500 },
  { name: "Felix Rosenqvist", points: 40, price: 4000 },
  { name: "Marcus Armstrong", points: 35, price: 3500 },
  { name: "Rinus VeeKay", points: 30, price: 3000 },
  { name: "Romain Grosjean", points: 25, price: 2500 },
  { name: "Graham Rahal", points: 20, price: 2000 },
  { name: "Linus Lundqvist", points: 15, price: 1500 },
  { name: "Pietro Fittipaldi", points: 10, price: 1000 },
  { name: "Kyffin Simpson", points: 5, price: 5000 },
];

//drivers.forEach((item) => {
//  createToken(
//    3440,
//    "5DLgNFEASy8PrQY5hhaLorNRpknnjMnXofphdiuYh2B149x4",
//    item.name,
//    item.points,
//    item.price
//  )
//    .then(() => {
//      console.log("Process finished.");
//    })
//    .catch((error) => {
//      console.error("An error occurred:", error);
//    });
//});

// Call the function with your drivers array
createToken(drivers);
