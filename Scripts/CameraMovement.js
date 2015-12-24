#pragma strict
var objToFollow : GameObject;
private var startLoc : Vector3;

function Start () {
	startLoc = (transform.position - objToFollow.transform.position);
}

function Update () {
	transform.position = objToFollow.transform.position + startLoc;
}