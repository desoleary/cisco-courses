var x = 10, y = 20

function f() {
	
	console.log(x,y);
	
	var x = 5;
	
	console.log(x,y);
	
}

f();

console.log(x, y);