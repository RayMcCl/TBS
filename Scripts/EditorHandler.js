/**/
var activeObj : Object;
var activeGameObject : GameObject;

function OnDrawGizmos () {
	activeObj = Selection.activeObject;
	activeGameObject = Selection.activeGameObject;
}

function RepaintGame () {
	HandleUtility.Repaint();
}

function ActiveObj (obj){
	Selection.activeObject = obj;
}

/**/