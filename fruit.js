var money = 100;
var apple = {
	quantity: 0,
	spentOn: 0,
	currentPrice: 5,
	totalBought: 0,
	soldFor: 0,
	getProfit: function() {
		return spentOn - soldFor;
	},
	getAvg: function() {
		if (this.totalBought === 0) {
			return 0;
		} else {
			var x = this.spentOn / this.totalBought;
			return x.toFixed(2);
		}
	},
	getAvgSold: function() {
		if (this.totalBought === 0) {
			return 0;
		} else {
			var x = this.soldFor / (this.totalBought-this.quantity);
			return x.toFixed(2);
		}
	}
};
var orange = {
	quantity: 0,
	spentOn: 0,
	currentPrice: 5,
	totalBought: 0,
	soldFor: 0,
	getProfit: function() {
		return spentOn - soldFor;
	},
	getAvg: function() {
		if (this.totalBought === 0) {
			return 0;
		} else {
			var x = this.spentOn / this.totalBought;
			return x.toFixed(2);
		}
	},
	getAvgSold: function() {
		if (this.totalBought === 0) {
			return 0;
		} else {
			var x = this.soldFor / (this.totalBought-this.quantity);
			return x.toFixed(2);
		}
	}
};
var banana = {
	quantity: 0,
	spentOn: 0,
	currentPrice: 5,
	soldFor: 0,
	totalBought: 0,
	getProfit: function() {
		return spentOn - soldFor;
	},
	getAvg: function() {
		if (this.totalBought === 0) {
			return 0;
		} else {
			var x = this.spentOn / this.totalBought;
			return x.toFixed(2);
		}
	},
	getAvgSold: function() {
		if (this.totalBought === 0) {
			return 0;
		} else {
			var x = this.soldFor / (this.totalBought-this.quantity);
			return x.toFixed(2);
		}
	}
};
var grape = {
	quantity: 0,
	spentOn: 0,
	currentPrice: 5,
	totalBought: 0,
	soldFor: 0,
	getProfit: function() {
		return spentOn - soldFor;
	},
	getAvg: function() {
		if (this.totalBought === 0) {
			return 0;
		} else {
			var x = this.spentOn / this.totalBought;
			return x.toFixed(2);
		}
	},
	getAvgSold: function() {
		if (this.totalBought === 0) {
			return 0;
		} else {
			var x = this.soldFor / (this.totalBought-this.quantity);
			return x.toFixed(2);
		}
	}
};
//Checks to see what fruit we have and appends relative data
function checkFruit($obj) {
	console.log($obj.attr('class'));
	switch ($obj.attr('class')) {
		case 'apple':
		$('#apple_avg').empty();
		$('#apple_amount').empty();
		$('#apple_avg').append(buyFruit(apple));
		$('#apple_amount').append(apple.quantity);
		break;
		case 'orange':
		$('#orange_avg').empty();
		$('#orange_amount').empty();
		$('#orange_avg').append(buyFruit(orange));
		$('#orange_amount').append(orange.quantity);
		break;
		case 'banana':
		$('#banana_avg').empty();
		$('#banana_amount').empty();
		$('#banana_avg').append(buyFruit(banana));
		$('#banana_amount').append(banana.quantity);
		break;
		case 'grape':
		$('#grape_avg').empty();
		$('#grape_amount').empty();
		$('#grape_avg').append(buyFruit(grape));
		$('#grape_amount').append(grape.quantity);
		break;
	}
}

function checkFruitSell($obj) {
	console.log($obj.attr('class'));
	switch ($obj.attr('class')) {
		case 'apple':
		$('#apple_avgSold').empty();
		$('#apple_amount').empty();
		$('#apple_avgSold').append(sellFruit(apple));
		$('#apple_amount').append(apple.quantity);
		break;
		case 'orange':
		$('#orange_avgSold').empty();
		$('#orange_amount').empty();
		$('#orange_avgSold').append(sellFruit(orange));
		$('#orange_amount').append(orange.quantity);
		break;
		case 'banana':
		$('#banana_avgSold').empty();
		$('#banana_amount').empty();
		$('#banana_avgSold').append(sellFruit(banana));
		$('#banana_amount').append(banana.quantity);
		break;
		case 'grape':
		$('#grape_avgSold').empty();
		$('#grape_amount').empty();
		$('#grape_avgSold').append(sellFruit(grape));
		$('#grape_amount').append(grape.quantity);
		break;
	}
}
// Checks to see if we can buy. Updates to new quantity if we can and returns new avg
function buyFruit(obj) {
	if (obj.currentPrice > money) {
		return obj.getAvg();
	} else {
		obj.quantity++;
		obj.totalBought++;
		money -= obj.currentPrice;
		obj.spentOn += obj.currentPrice;
		$('h2 > span').empty();
		$('h2 > span').append(money.toFixed(2));
		return obj.getAvg();
	}
}

function sellFruit(obj) {
	if (obj.quantity <= 0) {
		return obj.getAvg();
	} else {
		obj.quantity--;
		money += obj.currentPrice;
		obj.soldFor += obj.currentPrice;
		$('h2 > span').empty();
		$('h2 > span').append(money.toFixed(2));
		return obj.getAvgSold();
	}
}

function getRandomPrice(obj) {
	var num = randomNumber() / 100;
	obj.currentPrice += num;
	if (obj.currentPrice > 9.99) {
		obj.currentPrice = 9.99;
	} else if (obj.currentPrice < .50) {
		obj.currentPrice = .50;
	}
}

function randomNumber() {
	return Math.floor(Math.random() * (101)) - 50;
}

function setPrice() {
	getRandomPrice(apple);
	getRandomPrice(orange);
	getRandomPrice(banana);
	getRandomPrice(grape);
	$('#apple_price').empty();
	$('#orange_price').empty();
	$('#banana_price').empty();
	$('#grape_price').empty();
	$('#apple_price').append(apple.currentPrice.toFixed(2));
	$('#orange_price').append(orange.currentPrice.toFixed(2));
	$('#banana_price').append(banana.currentPrice.toFixed(2));
	$('#grape_price').append(grape.currentPrice.toFixed(2));
}
$(document).ready(function() {
	setPrice();
	var interval = setInterval(setPrice, 300);
	// $('.applebuy').on('click', 'button', function(){
	// 	$('#apple_avg').empty();
	// 	$('#apple_amount').empty();
	// 	$('#apple_avg').append(buyFruit(apple));
	// 	$('#apple_amount').append(apple.quantity);
	// })
	$('#buy').on('click', 'button', function() {
		checkFruit($(this));
	})
	$('#sell').on('click', 'button', function() {
		checkFruitSell($(this));
	})
	setTimeout(function(){
		clearInterval(interval);
		var appleMoney = apple.quantity * apple.currentPrice;
		var orangeMoney = orange.quantity * orange.currentPrice;
		var bananaMoney = banana.quantity * banana.currentPrice;
		var grapeMoney = grape.quantity * grape.currentPrice;
		money = appleMoney + orangeMoney + bananaMoney + grapeMoney + money;
		console.log(money);
		alert('You made $' + money.toFixed(2));
		money = 0;
		apple.quantity = 0;
		orange.quantity = 0;
		banana.quantity = 0;
		grape.quantity = 0;

}, 30000);


});

// var apples = 0;
// var oranges = 0;
// var bananas = 0;
// var grapes = 0;
// var totalSpentApples = 0;
// var totalSpentOranges = 0;
// var totalSpentBananas = 0;
// var totalSpentGrapes = 0;
// var currentApplePrice = 5;
// var currentOrangePrice = 5;
// var currentBananaPrice = 5;
// var currentGrapePrice = 5;
