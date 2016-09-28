var money = 100;

var apple = {
	quantity: 0,
	spentOn: 0,
	currentPrice: 5,
	getAvg: function () {
		return this.spentOn / this.quantity;
	}
};

var orange = {
	quantity: 0,
	spentOn: 0,
	currentPrice: 5,
	getAvg: function () {
		return this.spentOn / this.quantity;
	}
}
var banana = {
	quantity: 0,
	spentOn: 0,
	currentPrice: 5,
	getAvg: function () {
		return this.spentOn / this.quantity;
	}
}

var grape = {
	quantity: 0,
	spentOn: 0,
	currentPrice: 5,
	getAvg: function () {
		return this.spentOn / this.quantity;
	}
}

$( document )
	.ready( function () {
		var intervalID = window.setInterval



	} );
//Checks to see what fruit we have and appends relative data
function checkFruit( $obj ) {
	switch ( $obj.attr( "class" ) ) {
	case "apple":
		$( "#apple_avg" )
			.empty();
		$( "#apple_amount" )
			.empty();
		$( "#apple_avg" )
			.append( buyFruit( apple ) );
		$( "#apple_amount" )
			.append( apple.quantity );
		break;
	case "orange":
		$( "#orange_avg" )
			.empty();
		$( "#orange_amount" )
			.empty();
		$( "#orange_avg" )
			.append( buyFruit( orange ) );
		$( "#orange_amount" )
			.append( orange.quantity );
		break;
	case "banana":
		$( "#banana_avg" )
			.empty();
		$( "#banana_amount" )
			.empty();
		$( "#banana_avg" )
			.append( buyFruit( banana ) );
		$( "#banana_amount" )
			.append( banana.quantity );
		break;
	case "grape":
		$( "#grape_avg" )
			.empty();
		$( "#grape_amount" )
			.empty();
		$( "#grape_avg" )
			.append( buyFruit( grape ) );
		$( "#grape_amount" )
			.append( grape.quantity );
		break;
	}

}
// Checks to see if we can buy. Updates to new quantity if we can and returns new avg
function buyFruit( obj ) {
	if ( obj.currentPrice > money ) {
		return obj.getAvg();
	} else {
		obj.quantity++;
		money -= obj.currentPrice;
		return obj.getAvg();
	}
}

function getRandomPrice( obj ) {
	var num = randomNumber() / 100;
	obj.currentPrice += num;
	if ( obj.currentPrice > 9.99 ) {
		obj.currentPrice = 9.99;
	} else if ( obj.currentPrice < .50 ) {
		obj.currentPrice = .50;
	}

}

function randomNumber() {
	return Math.floor( Math.random() * ( 101 ) ) - 50;
}






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
