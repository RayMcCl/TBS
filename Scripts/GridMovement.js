var movementCubes : GridMoveSystem[] = [];
var cost : int = 0;
var G = 0;
var state = "Open";
var edMaterials : EditorMaterials;
var inGameMat : InGameMaterials;
private var child : boolean = false;
var addObj : GameObject;
var subObj : GameObject;
private var displayed = false;
var costFile : GameObject;
var animationFile : GameObject;
var movementPoint : GameObject;
private var gameStarted : boolean = false;
var check = false;
var parent : GameObject;
var activeObj : GameObject;
private var repaint : boolean = false;

function Start () {
	gameStarted = true;
}

function Checked () {
	check = false;
}

function OnDrawGizmosSelected () {
	if(!gameStarted){
		var matHandlerObj = GameObject.Find("MaterialManager");
		if(matHandlerObj){
			var matHandler = matHandlerObj.GetComponent("MatHandler");
			if(matHandler.editorView){
				if(gameObject == activeObj){
					Gizmos.DrawSphere (movementPoint.transform.position, .2);
					if(addObj){
						DestroyImmediate(addObj);
					}
					if(subObj){
						DestroyImmediate(subObj);
					}
					if(gameObject.GetComponent("MeshRenderer").sharedMaterial != edMaterials.selectedMat){
						gameObject.GetComponent("MeshRenderer").sharedMaterial = edMaterials.selectedMat;
						repaint = true;
					}
				}
			}
		}
	}
}

function OnDrawGizmos () {
	if(!gameStarted){
		var matHandlerObj = GameObject.Find("MatHandler");
		if(matHandlerObj){
			var matHandler = matHandlerObj.GetComponent("MatHandler");
			if(!matHandler.editorView){
				inGameMat = matHandler.inGameMat;
				ChangeMat("startMat");
			}
		}
		if(matHandler.editorView){
			child = false;
			if(!edMaterials){
				edMaterials = new EditorMaterials();
			}
			if(edMaterials.dispMat != matHandler.editorMat.dispMat || edMaterials.errorMat != matHandler.editorMat.errorMat || edMaterials.selectedMat != matHandler.editorMat.selectedMat  || edMaterials.childMat != matHandler.editorMat.childMat || edMaterials.baseMat != matHandler.editorMat.baseMat){
				edMaterials = matHandler.editorMat;
			}
			if(!inGameMat){
				inGameMat = new InGameMaterials();
			}
			if(inGameMat.startLocMat != matHandler.inGameMat.startLocMat || inGameMat.startMat != matHandler.inGameMat.startMat || inGameMat.inRangeMat != matHandler.inGameMat.inRangeMat || inGameMat.maxRangeMat != matHandler.inGameMat.maxRangeMat || inGameMat.errorMat != matHandler.inGameMat.errorMat || inGameMat.highlightMat != matHandler.inGameMat.highlightMat){
				inGameMat.startLocMat = matHandler.inGameMat.startLocMat;
				inGameMat.startMat = matHandler.inGameMat.startMat;
				inGameMat.inRangeMat = matHandler.inGameMat.inRangeMat;
				inGameMat.maxRangeMat = matHandler.inGameMat.maxRangeMat;
				inGameMat.errorMat = matHandler.inGameMat.errorMat;
				inGameMat.highlightMat = matHandler.inGameMat.highlightMat;
			}
		}
	}
}

function Displaying (state){
	if(state){
		gameObject.GetComponent("MeshRenderer").sharedMaterial = edMaterials.dispMat;
		displayed = true;
	}
	else{
		displayed = false;
	}
}

function ChangeMat (state) {
	if(state == "optional"){
		gameObject.GetComponent("MeshRenderer").sharedMaterial = inGameMat.inRangeMat;
	}
	else if(state == "final"){
		gameObject.GetComponent("MeshRenderer").sharedMaterial = inGameMat.maxRangeMat;
	}
	else if(state == "start"){
		gameObject.GetComponent("MeshRenderer").sharedMaterial = inGameMat.startLocMat;
	}
	else if(state == "startMat"){
		gameObject.GetComponent("MeshRenderer").sharedMaterial = inGameMat.startMat;
	}
	else if(state == "error"){
		gameObject.GetComponent("MeshRenderer").sharedMaterial = inGameMat.errorMat;
	}
	else if(state == "highlight"){
		gameObject.GetComponent("MeshRenderer").sharedMaterial = inGameMat.highlightMat;
	}
	else if(state == "edstart"){
		gameObject.GetComponent("MeshRenderer").sharedMaterial = edMaterials.baseMat;
	}
	else if(state == "edchild"){
		gameObject.GetComponent("MeshRenderer").sharedMaterial = edMaterials.childMat;
	}
	else if(state == "eddisp"){
		gameObject.GetComponent("MeshRenderer").sharedMaterial = edMaterials.dispMat;
	}
	else if(state == "edselected"){
		gameObject.GetComponent("MeshRenderer").sharedMaterial = edMaterials.selectedMat;
	}
	else if(state == "ederror"){
		gameObject.GetComponent("MeshRenderer").sharedMaterial = edMaterials.errorMat;
	}
}

function OnMouseOver (){
	GameObject.Find("MoveHandler").GetComponent(MoveHandler).MouseOverCube(gameObject);
}

function OnMouseDown () {
	GameObject.Find("MoveHandler").GetComponent(MoveHandler).MouseDownCube(gameObject);
}

function CheckAllChildren () {
	for(var x = 0; x < movementCubes.length; x++){
		if(!movementCubes[x]){
			var copy = movementCubes;
			movementCubes = new GridMoveSystem[movementCubes.length - 1];
			var curPoint = 0;
			for(var y = 0; y < copy.length; y++){
				if(y != x){
					movementCubes[curPoint] = copy[y];
					curPoint++;
				}
			}
		}
	}
}