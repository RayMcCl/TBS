var generate : boolean = false;
var generatingGridpoints : boolean = true;
var objToGenerate : GameObject;
var width : int;
var length : int;
var disp : float;
var seed : boolean = false;
var seedAmount : int = 10;
var objToInstantiate : GameObject;
var grid = new Array();

function OnDrawGizmosSelected () {
	if(generate){
		var folder = new GameObject();
		grid.Clear();
		folder.name = "Folder";
		for(var y = 0; y < length; y++){
			for(var x = 0; x < width; x++){
				var clone = Instantiate(objToGenerate, Vector3(transform.position.x + (x*disp), transform.position.y, transform.position.z + (y*disp)), Quaternion.identity);
				clone.name = "Point";
				clone.transform.parent = folder.transform;
				clone.tag = "GridPoint";
				grid.Add(clone.gameObject);
			}
		}
		if(generatingGridpoints){
			for(x = 0; x < grid.length; x++){
				var cubes = grid[x].GetComponent(GridMovement).movementCubes;
				grid[x].GetComponent(GridMovement).movementCubes = new GridMoveSystem[4];
				var curCube = 0;
				if(x > 0 && (x) % width != 0){
					grid[x].GetComponent(GridMovement).movementCubes[curCube] = new GridMoveSystem();
					grid[x].GetComponent(GridMovement).movementCubes[curCube].obj = grid[x-1];
					curCube++;
				}
				if(grid.length > x + width){
					grid[x].GetComponent(GridMovement).movementCubes[curCube] = new GridMoveSystem();
					grid[x].GetComponent(GridMovement).movementCubes[curCube].obj = grid[x+width];
					curCube++;
				}
				if(grid.length > x+1 && (x+1) % width != 0){
					grid[x].GetComponent(GridMovement).movementCubes[curCube] = new GridMoveSystem();
					grid[x].GetComponent(GridMovement).movementCubes[curCube].obj = grid[x+1];
					curCube++;
				}
				if(x - width >= 0){
					grid[x].GetComponent(GridMovement).movementCubes[curCube] = new GridMoveSystem();
					grid[x].GetComponent(GridMovement).movementCubes[curCube].obj = grid[x-width];
					curCube++;
				}
			}
		}
		generate = false;
	}
	if(seed){
		var obj = new GameObject();
		obj.name = "Seed Folder";
		for(x = 0; x < seedAmount; x++){
			var objs = GameObject.FindGameObjectsWithTag("GridPoint");
			var point = Random.Range(0, objs.length - 1);
			clone = Instantiate(objToInstantiate, objs[point].transform.position, Quaternion.identity);
			clone.name = "Cube";
			clone.transform.parent = obj.transform;
			objs[point].GetComponent("GridMovement").state = "AlwaysClosed";
		}
		seed = false;
	}
	
	Gizmos.color = Color.green;
	Gizmos.DrawLine(transform.position, Vector3(transform.position.x + (width*disp), transform.position.y, transform.position.z));
	Gizmos.DrawLine(transform.position, Vector3(transform.position.x, transform.position.y, transform.position.z + (length*disp)));
}

function Update () {

}