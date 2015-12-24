class GridMoveSystem {
	var obj : GameObject = null;
	var movementCost : int = 1;
	var animation : String = "Walk";
	var check : boolean = false;
	var parent : GameObject;
	//Do Not Modify this Variable anywhere
}

//Work on tomorrow, after class or something.... enjoy!

class AstarPathfinding {
	var openList = new Array();
	var closedList = new Array();
	var List = new Array();
	var cost = 0;
	function FindPath (point1 : GameObject, point2 : GameObject, curRange : int){
		cost = curRange + 1;
		List.Clear();
		var startpoint = point1;
		openList.Clear();
		openList.Add(point1);
		closedList.Clear();
		while(point1 != point2 && openList.length > 0){
			var minCost = openList[0].GetComponent(GridMovement).G + 10000;
			var loc = 0;
			for(var x = 0; x < openList.length; x++){
				if(openList[x].GetComponent(GridMovement).G < minCost){
					minCost = openList[x].GetComponent(GridMovement).G;
					loc = x;
				}
			}
			point1 = openList[loc];
           	point1S = point1.GetComponent(GridMovement);
           	closedList.Add(point1);
           	point1S.state = "Closed";
           	openList.RemoveAt(loc);
           	if(point1 == point2){
           		CreatePath(point2, startpoint, curRange);
           		break;
           	}
           	else{
	           	for (x = 0; x < point1S.movementCubes.length; x++) {
	           		var point = point1S.movementCubes[x].obj;
	           		if(point){
	           			var pointS = point.GetComponent(GridMovement);
		          		var inOpenOrClosed : boolean = false;
		          		if(pointS.state == "Closed" || pointS.state == "Open"){
		          			inOpenOrClosed = true;
		          		}
		          		if(pointS.state != "Closed" && pointS.state != "AlwaysClosed"){
			          		if(!inOpenOrClosed || pointS.G < point1S.G + point1S.movementCubes[x].movementCost || pointS.G == 0){
			          	    	pointS.parent = point1;
			          	    	if(!inOpenOrClosed){
			          	    		openList.Add(point);
			          	    		pointS.state = "Open";
			          	    	}
			          	    	pointS.G = point1S.G + point1S.movementCubes[x].movementCost;
			           		}
		          		}
		           	}
	   			}
	   		}
		}
	}
	function CreatePath (point : GameObject, startpoint : GameObject, curRange : int) {
		var listpoint = point;
		List.Clear();
		var minCost = point.GetComponent(GridMovement).G;
		var x = 0;
		while(listpoint != startpoint){
			List.Add(listpoint);
			var listPointScript = listpoint.GetComponent(GridMovement);
			if(listPointScript.parent){
				listpoint = listPointScript.parent;
			}
			else{
				break;
			}
		}
		cost = minCost;
		List.Reverse();
	}
}

class AstarList {
	var obj : GameObject = null;
	var cost : int;
	var list = new Array();
}