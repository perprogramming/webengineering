(function(){
	
	console.clear();
	console.log('==Color Iterator Test==');
	
	var test = function(msg, bool){
		if(bool){
			console.log("passed");
		} else {
			console.log("failed - "+msg);	
		}
	};
	
	var colorIter1 = AIS.colorIterator();
	var colorIter2 = AIS.colorIterator();
	
	test("return value not a function", typeof(colorIter1) === 'function');
	
	// two cycles
	test("color not correct", colorIter1() === '#48AEFF');
	test("color not correct", colorIter1() === '#7FFFD4');
	test("color not correct", colorIter1() === '#C00054');
	test("color not correct", colorIter1() === '#87EF84');
	test("color not correct", colorIter1() === '#DBA7F8');
	test("color not correct", colorIter1() === '#EBC79E');
	test("color not correct", colorIter1() === '#48AEFF');
	test("color not correct", colorIter1() === '#7FFFD4');
	test("color not correct", colorIter1() === '#C00054');
	test("color not correct", colorIter1() === '#87EF84');
	test("color not correct", colorIter1() === '#DBA7F8');
	test("color not correct", colorIter1() === '#EBC79E');
	
	for(var i = 0; i < 12; i++){
		test("color not correct while iterating two iterators", colorIter1() === colorIter2()); 
	};
	
	console.log("==Ship Test==");
	var ship = new AIS.Ship(211509880, 50.733173, 7.1108766, 173.4);
	test("Ship does not have correct mmsi", ship.mmsi === 211509880);
	test("Ship does not have correct latitude", ship.latitude === 50.733173);
	test("Ship does not have correct logitude", ship.longitude === 7.1108766);
	test("Ship does not have correct courseOverGround", ship.courseOverGround === 173.4);
	
	console.log("==ShipList Test==");
	test("ShipList missing a 'list' property", typeof(new AIS.ShipList().list) === 'object');
	
	var shipListCreator = function(){
		var shiplist = new AIS.ShipList();
		shiplist.list.push(new AIS.Ship(211509880, 50.733173, 7.1108766, 0));
		shiplist.list.push(new AIS.Ship(211509880, 40.733173, 7.1108766, 173.4));
		shiplist.list.push(new AIS.Ship(211509880, 30.733173, 7.1108766, 200.4));
		return shiplist;
	};
	
	var courseOverGroundFilter = function(ship){ return ship.courseOverGround > 180;};
	var mmsiFilter = function(ship){ return ship.mmsi === 211509881;};
	var latitudeFilter = function(ship){ return ship.latitude > 40;};
	
	var shipList = shipListCreator();
	shipList.filter(courseOverGroundFilter);
	test("Shiplist not correctly filtered on courseOverGround", shipList.list.length === 1);
	
	shipList = shipListCreator();
	shipList.filter(mmsiFilter);
	test("Shiplist not correctly filtered on mmsi", shipList.list.length === 0);
	
	shipList = shipListCreator();
	shipList.filter(latitudeFilter);
	test("Shiplist not correctly filtered on latitude", shipList.list.length === 2);

})();



