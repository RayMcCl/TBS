class GridEditor extends EditorWindow {
	
	var edField : boolean = false;
	var matHandler : GameObject;
	var edObj : GameObject;
	var checkAllCubesChildren : boolean = false;
	var lastSelectedObj : GameObject;
	
	@MenuItem ("Window/Grid Editor")
	static function Init () {
		var window = GetWindow(typeof(GridEditor));
		window.autoRepaintOnSceneChange = true;
	}
	
	function OnGUI () {
		edField = EditorGUILayout.Toggle("Editor Active", edField);
		checkAllCubesChildren = EditorGUILayout.Toggle("Check All Children Cubes", checkAllCubesChildren);
	}
	function Update () {
		var activeObj = Selection.activeObject;
		var activeGameObject = Selection.activeGameObject;
		if(checkAllCubesChildren){
			var points = GameObject.FindGameObjectsWithTag("GridPoint");
			for(x = 0; x < points.length; x++){
				points[x].GetComponent(GridMovement).CheckAllChildren();
			}
			checkAllCubesChildren = false;
		}
		if(edField){
			if(activeObj){
				if(lastSelectedObj != activeGameObject){
					if(activeGameObject){
						if(!activeGameObject.GetComponent("GridMovement")){
							if(activeGameObject.name == "Plus Button"){
								var additionObj = lastSelectedObj.GetComponent(GridMovement);
								var copy = additionObj.movementCubes;
								additionObj.movementCubes = new GridMoveSystem[copy.length + 1];
								for(x = 0; x < copy.length; x++){
									additionObj.movementCubes[x] = new GridMoveSystem();
									additionObj.movementCubes[x].obj = copy[x].obj;
								}
								additionObj.movementCubes[additionObj.movementCubes.length - 1] = new GridMoveSystem();
								
								additionObj.movementCubes[additionObj.movementCubes.length - 1].obj = activeGameObject.transform.parent.gameObject;
								additionObj = activeGameObject.transform.parent.gameObject.GetComponent("GridMovement");
								copy = additionObj.movementCubes;
								additionObj.movementCubes = new GridMoveSystem[copy.length + 1];
								for(x = 0; x < copy.length; x++){
									additionObj.movementCubes[x] = new GridMoveSystem();
									additionObj.movementCubes[x].obj = copy[x].obj;
								}
								additionObj.movementCubes[additionObj.movementCubes.length - 1] = new GridMoveSystem();
								additionObj.movementCubes[additionObj.movementCubes.length - 1].obj = lastSelectedObj;
								Selection.activeGameObject = lastSelectedObj;
							}
							else if(activeGameObject.name == "Minus Button"){
								var subObj = lastSelectedObj.GetComponent(GridMovement);
								copy = subObj.movementCubes;
								subObj.movementCubes = new GridMoveSystem[copy.length - 1];
								var y = 0;
								for(x = 0; x < copy.length; x++){
									if(copy[x].obj != activeGameObject.transform.parent.gameObject){
										subObj.movementCubes[y] = new GridMoveSystem();
										subObj.movementCubes[y].obj = copy[x].obj;
										y++;
									}
								}
								subObj = activeGameObject.transform.parent.gameObject.GetComponent("GridMovement");
								copy = subObj.movementCubes;
								subObj.movementCubes = new GridMoveSystem[copy.length - 1];
								y = 0;
								for(x = 0; x < copy.length; x++){
									if(copy[x].obj != lastSelectedObj){
										subObj.movementCubes[y] = new GridMoveSystem();
										subObj.movementCubes[y].obj = copy[x].obj;
										y++;
									}
								}
								Selection.activeGameObject = lastSelectedObj;
							}
							else{
								var bugFix = GameObject.FindGameObjectsWithTag("Button");
								for(x = 0; x < bugFix.length; x++){
									bugFix[x].active = false;
								}
								bugFix = GameObject.FindGameObjectsWithTag("GridPoint");
								for(x = 0; x < bugFix.length; x++){
									bugFix[x].GetComponent("GridMovement").ChangeMat("edstart");
								}
							}
						}
						else{
							obj = GameObject.FindGameObjectsWithTag("GridPoint");
							for(x = 0; x < obj.length; x++){
								if(activeGameObject != obj[x]){
									obj[x].GetComponent("GridMovement").subObj.active = false;
									if(obj[x].GetComponent("GridMovement").state == "Open"){
										obj[x].GetComponent("GridMovement").ChangeMat("edstart");
										obj[x].GetComponent("GridMovement").addObj.active = true;
										obj[x].GetComponent("GridMovement").costFile.active = true;
										obj[x].GetComponent("GridMovement").animationFile.active = true;
									}
									else{
										obj[x].GetComponent("GridMovement").ChangeMat("ederror");
										obj[x].GetComponent("GridMovement").costFile.active = false;
										obj[x].GetComponent("GridMovement").animationFile.active = false;
									}
								}
							}
							var activeObjS = activeGameObject.GetComponent("GridMovement");
							for(x = 0; x < activeObjS.movementCubes.length; x++){
								var s = activeObjS.movementCubes[x].obj.GetComponent("GridMovement");
								s.addObj.active = false;
								s.subObj.active = true;
								s.ChangeMat("edchild");
							}
							activeGameObject.GetComponent("GridMovement").ChangeMat("edselected");
						}
					}
				}
				lastSelectedObj = activeGameObject;
			}
			else{
				bugFix = GameObject.FindGameObjectsWithTag("Button");
				for(x = 0; x < bugFix.length; x++){
					bugFix[x].active = false;
				}
				bugFix = GameObject.FindGameObjectsWithTag("GridPoint");
				for(x = 0; x < bugFix.length; x++){
					bugFix[x].GetComponent("GridMovement").ChangeMat("edstart");
				}
				obj = GameObject.FindGameObjectsWithTag("GridPoint");
				for(x = 0; x < obj.length; x++){
					if(activeGameObject != obj[x]){
						obj[x].GetComponent("GridMovement").addObj.active = false;
						obj[x].GetComponent("GridMovement").subObj.active = false;
						obj[x].GetComponent("GridMovement").costFile.active = false;
						obj[x].GetComponent("GridMovement").animationFile.active = false;
						obj[x].GetComponent("GridMovement").ChangeMat("edstart");
					}
				}
			}
		}
	}
}