var editorMat : EditorMaterials;
var inGameMat : InGameMaterials;
private var lastSelectedObj : GameObject;
var objToCreate : GameObject;
var objToCreate2 : GameObject;
var editorView : boolean = true;
var checkAllCubesChildren : boolean = false;
private var activeObj : Object;
private var activeGameObject : GameObject;

class EditorMaterials {
	var baseMat : Material;
	var selectedMat : Material;
	var childMat : Material;
	var dispMat : Material;
	var errorMat : Material;
}

class InGameMaterials {
	var startLocMat : Material;
	var startMat : Material;
	var inRangeMat : Material;
	var maxRangeMat : Material;
	var errorMat : Material;
	var highlightMat : Material;
}