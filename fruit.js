var money = 100;
var startingPrice = 5;
var apple = new Fruit('apple');
var orange = new Fruit('orange');
var banana = new Fruit('banana');
var grape = new Fruit('grape');
var allFruit = [apple, orange, banana, grape];

//constructor function to start a new fruit object for each type.
function Fruit (name) {
	this.name = name;
	this.quantity = 0;
	this.spentOn = 0;
	this.currentPrice = startingPrice;
	this.totalBought = 0;
	this.totalSold = 0;
	this.soldFor = 0;
	this.getProfit = function () {
		return (this.soldFor - this.spentOn).toFixed(2);
	};
	this.getAvg = function () {
		if(this.totalBought === 0) {
			return 0;
		} else {
			var avg = this.spentOn / this.totalBought;
			return avg.toFixed(2);
		}
	};
	this.getAvgSold = function () {
		if (this.totalSold === 0) {
			return 0;
		} else {
			var avg = this.soldFor / this.totalSold;
			return avg.toFixed(2);
		}
	};
}
//This function converts the clicked button to its corresponding Fruit object
//It then passes on that fruit object to update the DOM for a purchase
function checkFruit($obj) {
	// Find the name of the fruit, which is the same as the class
	var name = $obj.attr('class');
	//find the actual object to pass on.
	var $fruit = fruitObj($obj);
	$('#' + name + '_avg').text('$' + buyFruit($fruit));
	$('#' + name + '_amount').text($fruit.quantity);
	$('#' + name + '_profit').text('$' + $fruit.getProfit());
}
//This function converts the clicked button to its corresponding Fruit object
//It then passes on that fruit object to update the DOM for a sale
function checkFruitSell($obj) {
	// Find the name of the fruit, which is the same as the class
	var name = $obj.attr('class');
	//find the actual object to pass on.
	var $fruit = fruitObj($obj);
	$('#' + name + '_avgSold').text('$' + sellFruit($fruit));
	$('#' + name + '_amount').text($fruit.quantity);
	$('#' + name + '_profit').text('$' + $fruit.getProfit());
}
//This function will take a button element that was clicked and return
//the actual object for the fruit so that we can pass it on to other functions.
function fruitObj ($button) {
	for (var i = 0; i < allFruit.length; i++) {
		if ($button.attr('class') === allFruit[i].name) {
			return allFruit[i];
		}
	}
}
//Checks to see if there is money on hand to afford the fruit.
//Updates all Fruit Object Properties and the DOM to reflect the purchase
function buyFruit(obj) {
	if (obj.currentPrice > money) {
		return obj.getAvg();
	} else {
		obj.quantity++;
		obj.totalBought++;
		money -= obj.currentPrice;
		obj.spentOn += obj.currentPrice;
		$('h2 > span').text('$' + money.toFixed(2));
		return obj.getAvg();
	}
}
//Checks to see if there is fruit on hand to sell,
//Updates all Fruit object properties and the DOM to reflect the sale.
function sellFruit(obj) {
	if (obj.quantity <= 0) {
		return obj.getAvgSold();
	} else {
		obj.quantity--;
		obj.totalSold++;
		money += obj.currentPrice;
		obj.soldFor += obj.currentPrice;
		$('h2 > span').text('$' + money.toFixed(2));
		return obj.getAvgSold();
	}
}
//Randomly increments the price of a fruit between -$.50 and $.50
//Also caps the price so that it won't exceed 9.99 or go below .50.
function getRandomPrice(obj) {
	var num = randomNumber() / 100;
	obj.currentPrice += num;
	if (obj.currentPrice > 9.99) {
		obj.currentPrice = 9.99;
	} else if (obj.currentPrice < .50) {
		obj.currentPrice = .50;
	}
}
//Randomly generates a new number between -50 and 50;
function randomNumber() {
	return Math.floor(Math.random() * (101)) - 50;
}
//Cycles through each fruit object and randomly adjusts price.
//Updates the DOM to display the new price.
function setPrice() {
	allFruit.forEach(function(obj) {
		getRandomPrice(obj);
		var price = obj.currentPrice.toFixed(2);
		var objPrice = '#' + obj.name + '_price';
		$(objPrice).text('$' + price);
	});
}
//Function used to sell off all remaining quantities on hand for each Fruit
//object and return the total sale proceeds
function yardSale () {
	var proceeds = 0;
	allFruit.forEach(function (fruit) {
		proceeds += (fruit.quantity * fruit.currentPrice);
		fruit.totalSold += fruit.quantity;
		fruit.soldFor += (fruit.quantity * fruit.currentPrice);
		fruit.quantity = 0;
	});
	return proceeds;
}

$(document).ready(function() {
	setPrice();
	//Function to run setPrice every 0.5 seconds;
	var interval = setInterval(setPrice, 500);
	//Event Listener for a click on a buy button
	$('#buy').on('click', 'button', function() {
		checkFruit($(this));
	})
	//Event Listener for a click on a sell button
	$('#sell').on('click', 'button', function() {
		checkFruitSell($(this));
	})
	//Timer set to stop the interval after 30 seconds and compile all data
	//Also stops all future play in the game.
	setTimeout(function(){
		//Stop the price changes from happening.
		clearInterval(interval);
		//run yardSale to sell off any fruit still on hand at the last market price
		// and adds that total to money
		money += yardSale();

		//Append DOM to show final totals
		$('h2 > span').text('$' + money.toFixed(2))
		allFruit.forEach(function (fruit) {
			var name = fruit.name;
			$('#' + name + '_avgSold').text('$' + fruit.getAvgSold());
			$('#' + name + '_amount').text('0');
			$('#' + name + '_profit').text('$' + fruit.getProfit());
		});

		$('#sell').off();
		$('#buy').off();
		var message;
		if (money < 100) {
			var total = 100 - money;
			message = 'Bad job!  You lost $' + total.toFixed(2) + '.';
		} else {
			var total = money - 100;
			message = 'Nice work! You made $' + total.toFixed(2) + '.';
		}
		alert(message);
	}, 30000);
});
