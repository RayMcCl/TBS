var range : int;
var speed : int = 5;
var stopDist : float = .5;
var animationObj : GameObject;
var decreaseRange : boolean = true;
private var curCost = 0;
private var moving : boolean = false;
private var curRange : int;
private var path = new Array();
var curLoc : GameObject;
private var goalLoc : GameObject;
private var aStar : AstarPathfinding = new AstarPathfinding();
private var finalList = new Array();
private var optionalList = new Array();
private var errorList = new Array();
private var mainList = new Array();
private var sPressed : boolean = false;
private var lastCube : GameObject;
private var curCube : int = 0;
private var changeList = new Array();
private var animationPlayed = false;
private var shiftUp : boolean = false;

function Start () {
	aStar = new AstarPathfinding();
	curRange = range;
	DetermineOptions();
}

function Update () {
	if(Input.GetKeyDown("r")){
		finalList.length = 0;
		optionalList.length = 0;
		errorList.Clear();
		mainList.Clear();
		curRange = range;
		sPressed = false;
		
	}
	if(Input.GetButton("Shift")){
		if(!sPressed){
			DisplayOptions();
		}
	}
	else if(Input.GetButtonUp("Shift")){
		for(var x = 0; x < mainList.length; x++){
			mainList[x].GetComponent(GridMovement).ChangeMat("startMat");
		}
		sPressed = false;
		shiftUp = true;
	}
	if(moving){
		WalkToPoint(changeList[curCube].GetComponent(GridMovement).movementPoint);
	}
}

function MovementFunction (target : GameObject) {
	
}

function DeterminePath (test, test1, test2){

}

function DisplayOptions (){
	DetermineOptions();
	for(x = 0; x < errorList.length; x++){
		errorList[x].GetComponent(GridMovement).ChangeMat("error");
	}
	for(x = 0; x < finalList.length; x++){
		finalList[x].obj.GetComponent(GridMovement).ChangeMat("final");
	}
	for(x = 0; x < optionalList.length; x++){
		optionalList[x].obj.GetComponent(GridMovement).ChangeMat("optional");
	}
	for(x = 0; x < changeList.length; x++){
		changeList[x].GetComponent(GridMovement).ChangeMat("highlight");
	}
	curLoc.GetComponent(GridMovement).ChangeMat("start");
}

function DetermineOptions () {
	if(finalList.length == 0 && optionalList.length == 0){
		mainList = new Array();
		mainList.Add(curLoc);
		var checkList : GridMoveSystem[] = curLoc.GetComponent(GridMovement).movementCubes;
		curLoc.GetComponent(GridMovement).check = true;
		var maxList = new Array();
		maxList.Add(curLoc);
		for(var x = 0; x < curRange; x++){
			var nextList = new Array();
			for(var y = 0; y < checkList.length; y++){
				var index = checkList[y].obj.GetComponent(GridMovement).movementCubes;
				for(var z = 0; z < index.length; z++){
					if(index[z].obj){
						if(!index[z].obj.GetComponent(GridMovement).check){
							nextList.Add(index[z]);
							maxList.Add(index[z].obj);
							index[z].obj.GetComponent(GridMovement).check = true;
						}
					}
				}
				mainList.Add(checkList[y].obj);
			}
			checkList = nextList.ToBuiltin(GridMoveSystem);
		}
		for(y = 0; y < maxList.length; y++){
			maxList[y].GetComponent(GridMovement).check = false;
		}
		var optListCur = 0;
		var finListCur = 0;
		optionalList.length = mainList.length;
		finalList.length = mainList.length;
		for(x = 0; x < mainList.length; x++){
			for(y = 0; y < mainList.length; y++){
				var s1 = mainList[y].GetComponent(GridMovement);
				if(s1.state != "AlwaysClosed"){
					s1.state = "null";
				}
				s1.G = 0;
				s1.parent = null;
			}
			aStar.FindPath(curLoc, mainList[x], curRange);
			if(aStar.cost > curRange){
				errorList.Add(mainList[x]);
			}
			else if(aStar.cost == curRange){
				finalList[finListCur] = new AstarList();
				finalList[finListCur].obj = mainList[x];
				finalList[finListCur].cost = aStar.cost;
				for(y = 0; y < aStar.List.length; y++){
					finalList[finListCur].list.Add(aStar.List[y]);
				}
				finListCur++;
			}
			else{
				optionalList[optListCur] = new AstarList();
				optionalList[optListCur].obj = mainList[x];
				optionalList[optListCur].cost = aStar.cost;
				for(y = 0; y < aStar.List.length; y++){
					optionalList[optListCur].list.Add(aStar.List[y]);
				}
				optListCur++;
			}
		}
		finalList.length = finListCur;
		optionalList.length = optListCur;
	}
}

function HighlightRoute (cube){
	if(shiftUp && cube == lastCube){
		for(var x = 0; x < changeList.length; x++){
			changeList[x].GetComponent(GridMovement).ChangeMat("highlight");
		}
		shiftUp = false;
	}
	if(cube != lastCube && !moving){
		lastCube = cube;
		for(x = 0; x < changeList.length; x++){
			changeList[x].GetComponent(GridMovement).ChangeMat("startMat");
		}
		changeList.Clear();
		for(x = 0; x < finalList.length; x++){
			if(finalList[x].obj == cube){
				for(var y = 0; y < finalList[x].list.length; y++){
					changeList.Add(finalList[x].list[y]);
					finalList[x].list[y].GetComponent(GridMovement).ChangeMat("highlight");
				}
				curCost = finalList[x].cost;
			}
		}
		for(x = 0; x < optionalList.length; x++){
			if(optionalList[x].obj == cube){
				for(y = 0; y < optionalList[x].list.length; y++){
					changeList.Add(optionalList[x].list[y]);
					optionalList[x].list[y].GetComponent(GridMovement).ChangeMat("highlight");
				}
				curCost = optionalList[x].cost;
			}
		}
	}
}

function GoToPoint (cube){
	if(!moving){
		curCube = 0;
	}
	moving = true;
	if(cube == lastCube){
		WalkToPoint(changeList[curCube].GetComponent(GridMovement).movementPoint);
	}
}

function WalkToPoint (point){
	if(!animationPlayed){
		var cubes = curLoc.GetComponent(GridMovement).movementCubes;
		for(var x = 0; x < cubes.length; x++){
			if(cubes[x].obj == changeList[curCube]){
				animationObj.animation.Play(cubes[x].animation);
			}
		}
		animationPlayed = true;
	}
	var distFromPoint : float = (transform.position - point.transform.position).magnitude;
	if(distFromPoint < stopDist){
		curLoc = changeList[curCube];
		changeList[curCube].GetComponent(GridMovement).ChangeMat("startMat");
		curCube++;
		animationPlayed = false;
		if(curCube == changeList.length){
			moving = false;
			animationObj.animation.Stop();
			if(decreaseRange){
				curRange = curRange - curCost;
			}
			finalList.length = 0;
			optionalList.length = 0;
			errorList.Clear();
			mainList.Clear();
			DetermineOptions();
		}	
	}
	else{
		transform.LookAt(Vector3(point.transform.position.x, transform.position.y, point.transform.position.z));
		transform.Translate(Vector3.forward*speed*Time.deltaTime);
	}
}