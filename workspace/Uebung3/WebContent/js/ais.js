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
		var index = 0;
		return function() {
			return AISShipColors[index++ % 6];
		};
	};

	
	// Ship Konstruktor 
	var Ship = function(mmsi, latitude, longitude, courseOverGround) {
		// Aufgabe 2
		this.mmsi = mmsi;
		this.latitude = latitude;
		this.longitude = longitude;
		this.courseOverGround = courseOverGround;
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
		
		// Context holen und Anfangszustand sichern
		var context = canvas.getContext('2d');
		context.save();
		
		// Ursprung auf die Position des Schiffes schieben und nach Ausrichtung des Schiffes drehen
		context.translate(this.getPixelOffsetLeft(), this.getPixelOffsetTop());
		context.rotate(this.courseOverGround * (Math.PI / 180));
		
		// Schiff zeichnen
		context.translate(- (shipWidth / 2), - (shipHeight / 2));
		context.fillStyle = color;
		context.strokeStyle = 'black';
		context.beginPath();
		context.moveTo(shipWidth / 2, 0);
		context.lineTo(shipWidth, (shipHeight / 3));
		context.lineTo(shipWidth, shipHeight);
		context.lineTo(0, shipHeight)
		context.lineTo(0, (shipHeight / 3));
		context.closePath();
		context.fill();
		context.stroke();
		
		// Context zurücksetzen
		context.restore();		
	};
	
	Ship.prototype.getPixelOffsetLeft = function() {		
		var gradiantWidthOfMap = right - left;
		var pixelWidthOfMap = width;
		var gradiantPositionRelativeToLeft = this.longitude - left;
		return this.mapGradiantToPixel(
			gradiantWidthOfMap,
			pixelWidthOfMap,
			gradiantPositionRelativeToLeft
		);
	};
	
	Ship.prototype.getPixelOffsetTop = function() {
		var gradiantHeightOfMap = top - bottom;
		var pixelHeightOfMap = height;
		var gradiantPositionRelativeToTop = top - this.latitude;
		return this.mapGradiantToPixel(
			gradiantHeightOfMap,
			pixelHeightOfMap,
			gradiantPositionRelativeToTop
		);
	};
	
	Ship.prototype.mapGradiantToPixel = function(gradiantDelta, pixelDelta, gradiantOffset) {
		var procentualOffset = (gradiantDelta / gradiantOffset);
		var pixelOffset = pixelDelta / procentualOffset;
		return pixelOffset;
	};
	
	// ShipList Konstruktor
	var ShipList = function(){
		this.list = []; // initialisieren eines Arrays zum aufnehmen der Ship Objekte
	};
	
	ShipList.prototype.filter = function(filterFunction){
		// Aufgabe 3
		var filteredList = [];
		for (var n = 0; n < this.list.length; n++) {
			var value = this.list[n];
			if (filterFunction(value)) {
				filteredList.push(value);
			}
		}		
		this.list = filteredList;
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
	var mapImage = new Image();
	mapImage.onload = function() {		
		canvas.getContext('2d').drawImage(mapImage, 0, 0);
		AIS.drawAllShips(canvas);
	};
	mapImage.src = 'images/map.png';
	
}, false);
