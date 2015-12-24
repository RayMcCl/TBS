var curObjMovement : GameObject;
var objListPerTurn : GameObject[];
var turnNumber : int = 1;

function Update () {
		
}

function OnDrawGizmos(){
	if(gameObject.name != "MoveHandler"){
		gameObject.name = "MoveHandler";
	}
}

function MouseOverCube (cube){
	curObjMovement.GetComponent(CharacterHandler).HighlightRoute(cube);
}

function MouseDownCube (cube){
	curObjMovement.GetComponent(CharacterHandler).GoToPoint(cube);
}