var AIS = (function() {
	
	// Farben für den Color Iterator
	var AISShipColors = ['#48AEFF', '#7FFFD4', '#C00054', '#87EF84', '#DBA7F8', '#EBC79E'];
	
	// Latitude und Logitude Grenzen des Kartenausschnitts
	var top = 50.759427;
	var bottom = 50.715809;
	var left = 7.089307;
	var right = 7.155004;
	
	// Höhe und Breite des Kartenausschnitts in pixel
	var height = 800; // pixel
	var width = 766;

	// Höhe und Breite der Schiffe in pixel
	var shipHeight = 20;
	var shipWidth = 5;
	

	var colorIterator = function(){
		// Aufgabe 1
	};

	
	// Ship Konstruktor 
	var Ship = function(mmsi, latitude, longitude, courseOverGround) {
		// Aufgabe 2
	};
	
	Ship.prototype.draw = function(canvas, color){
		// Aufgabe 5

		//     |
		//     .
		//    /|\
		//   / | \    ___2/3
		//  |  |  |
		//--|--.--| ------ 
		//  |  |  |
		//  |  |  |
		//  |-----|  
		//     |
		//     | 
	};
	
	// ShipList Konstruktor
	var ShipList = function(){
		this.list = []; // initialisieren eines Arrays zum aufnehmen der Ship Objekte
	};
	
	ShipList.prototype.filter = function(filterFunction){
		// Aufgabe 3
	};

	// Laden der Daten und Zeichnen aller Schiffe auf das übergebene Canvas
	var drawAllShips = function(canvas){

		// neue ShipList erstellen
		var currentShips = new AIS.ShipList();
		
		// für jeden Datensatz, ein Ship erstellen und in die ShipList legen
		for(var i = 0; i < AISData.length; i++){
			currentShips.list.push(new AIS.Ship(
					AISData[i].mmsi,
					AISData[i].latitude,
					AISData[i].longitude,
					AISData[i].courseOverGround));
		}
		
		// Filtern der Schiffe, die sich nicht auf dem Kartenausschnitt befinden
		currentShips.filter(function(ship){
			return ship.longitude >= left && ship.longitude <= right && ship.latitude >= bottom && ship.latitude <= top;
		});
		
		// neuen Farb Iterator erstellen
		var colors = AIS.colorIterator();
		
		// alle Ships, mit jeweils der nächsten Farbe rendern
		for (var i = 0; i < currentShips.list.length; i++) {
			var ship = currentShips.list[i];
			ship.draw(canvas, colors());
		};
	};
	
	return {
		Ship : Ship,
		ShipList : ShipList,
		drawAllShips : drawAllShips,
		colorIterator : colorIterator
	};
	
})();

document.addEventListener("DOMContentLoaded", function() {
	var canvas = document.getElementById('map'); // get Element from the DOM

	// Aufgabe 4
	
	// Zeichnen sie zuerst die Karte (images/mpg.png) auf das canvas. Anschließend, lassen Sie alle Schiffe auf die Karte zeichnen: AIS.drawAllShips(canvas);.
	
}, false);
