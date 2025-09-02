// Calculate cost of tickets
let ticketText = document.getElementById("ticketNum");
let ticketTextNum = document.getElementById("ticketCost");
let ticketTextCost = document.getElementById("ttCost");
let ticketAmount = 2;
let ticketCost = 14;
let totalCost = ticketAmount * ticketCost;

ticketText.textContent = "Tickets: " + ticketAmount;
ticketTextNum.textContent = "Cost: $" + ticketCost;
ticketTextCost.textContent = "Total: $" + totalCost;

//Now Calulcate cost of outfit and if can afford more
let shirtCost = 35;
let pantsCost = 75;
let shoesCost = 60;
let money = 235.87;
let totalOutfitCost = shirtCost + pantsCost + shoesCost;
let remainingMoney = money - totalOutfitCost;
document.getElementById("bank").textContent = "Remaining Balance: $" + remainingMoney.toFixed(2);
document.getElementById("addJacket").textContent = remainingMoney >= 70 ? "True" : "False";

//Now Calculate Pizza
let pizzaSlices = 4 * 8;
let studentsFed = Math.floor(pizzaSlices / 2.5);
let leftoverSlices = pizzaSlices % 2.5;
document.getElementById("profPizza").textContent = "Students Fed: " + studentsFed + ", Leftover Slices: " + leftoverSlices;

//Monty's Mega Bar
let adultCost = 12.00;
let childCost = 6.00;
let drinkCost = 1.50;
let adultCount = 2;
let childCount = 1;
let drinkCount = 3;
let totalMealCost = (adultCost * adultCount) + (childCost * childCount) + (drinkCost * drinkCount);
document.getElementById("Monty").textContent = "Total Meal Cost: $" + totalMealCost.toFixed(2);

//Weekly Average Tips
let week1 = 202.45;
let week2 = 134.97;
let week3 = 256.63;
let week4 = 178.22;
let averageTips = (week1 + week2 + week3 + week4) / 4;
document.getElementById("tips").textContent = "Average Weekly Tips: $" + averageTips.toFixed(2);
