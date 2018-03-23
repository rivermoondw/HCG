function Path(){
	this.path = [];
	this.cost = [];
	this.selected = false;
}

Path.prototype.updatePath = function(path){
	if (this.path.length == 0){
		for (let i=0;i<path.length;i++){
			this.path.push(path[i]);
		}
	}
	else{
		for (let i=path.length-1;i>=0;i--){
			this.path.unshift(path[i]);
		}
	}
}

Path.prototype.updateCost = function(cost, num_attribute){
	let copyCost = copyArr(cost);
	for (let i=0;i<copyCost.length;i++){
		if (this.cost.length < num_attribute){
			this.cost.push(copyCost[i]);
		}
		else{
			this.cost[i] += parseInt(copyCost[i]);
		}
	}
}