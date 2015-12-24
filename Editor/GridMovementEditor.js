@CustomEditor (GridMovement)
class GridMovementEditor extends Editor {
    function OnInspectorGUI () {
    	var hovering : String = "";
   		for(var x = 0; x < target.movementCubes.length; x++){
   			hovering = "";
   			if(target.movementCubes[x]){
	  			if(!target.movementCubes[x].obj){
	  				var copy = target.movementCubes;
	  				target.movementCubes = new GridMoveSystem[target.movementCubes.length - 1];
	  				var curPoint = 0;
	  				for(var y = 0; y < copy.length; y++){
	  					if(y != x){
	  						target.movementCubes[curPoint] = copy[y];
	  						curPoint++;
	  					}
	  				}
	  			}
	  			else{
	  				GUI.tooltip = "";
		  			var name : String = target.movementCubes[x].obj.name;
		   			GUILayout.Button(GUIContent(name, "Displaying")); 
		   			hovering = GUI.tooltip;
		   			if(hovering == "Displaying"){
		   				target.movementCubes[x].obj.GetComponent("GridMovement").Displaying(true);
		   			}
		   			else{
		   				target.movementCubes[x].obj.GetComponent("GridMovement").Displaying(false);
		   			}
		   			var lastMoveCost = target.movementCubes[x].movementCost;
		   			target.movementCubes[x].movementCost = EditorGUILayout.IntField("Cost", target.movementCubes[x].movementCost);
		   			var lastAnimation = target.movementCubes[x].animation;
		   			target.movementCubes[x].animation = EditorGUILayout.TextField("Animation To Play Between", target.movementCubes[x].animation);
		   			if(lastAnimation != target.movementCubes[x].animation || lastMoveCost != target.movementCubes[x].movementCost){
		   				targetCost = target.movementCubes[x].obj.GetComponent("GridMovement").movementCubes;
		   				for(y = 0; y < targetCost.length; y++){
		   					if(targetCost[y].obj == target.gameObject){
		   						targetCost[y].movementCost = target.movementCubes[x].movementCost;
		   						targetCost[y].animation = target.movementCubes[x].animation;
		   					}
		   				}
		   			}
	   			}	   			
   			}
   		}
   		if(target.state == "Open"){
   			if(GUILayout.Button("Open")){
   				target.state = "Always Closed";
   			}
		}
		else{
			if(GUILayout.Button("Always Closed")){
				target.state = "Open";
			}
		}
	}
	function OnSceneGUI () {
		target.movementPoint.transform.position = Handles.PositionHandle(target.movementPoint.transform.position, Quaternion.identity);
	}
}