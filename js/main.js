var bellman = function(num_attribute, num_phase, num_solution, costPhase, pathPhase){
	var possiblePath = [];
	emptyArr(possiblePath, num_solution);
	var selectedPath = [];
	for (let phase=num_phase-1;phase>=0;phase--){
		if (selectedPath.length == 0){
			pathPhase[phase].map(function(val){
				let newPath = new Path();
				newPath.updatePath(val);
				newPath.updateCost(costPhase[phase][val[1]], num_attribute);
				possiblePath[val[0]].push(newPath);
			})
			possiblePath.map(function(val){
				if (val.length != 0){
					let min = copyArr(val[0].cost);
					for (let i=1;i<val.length;i++){
						for (let j=0;j<num_attribute;j++){
							if (val[i].cost[j] < min[j]) {
								min[j] = val[i].cost[j];
							}
						}
					}
					for (let i=0;i<val.length;i++){
						for (let j=0;j<num_attribute;j++){
							if (val[i].cost[j] == min[j]){
								if (!val[i].selected){
									val[i].selected = true;
									selectedPath.push(val[i]);
								}
							}
						}
					}
				}
			});
		}
		else {
			possiblePath = [];
			emptyArr(possiblePath, num_solution);
			let copySelectedPath = copyArr(selectedPath);
			pathPhase[phase].map(function(val){
				for (let i=0;i<copySelectedPath.length;i++){
					if (val[1] == copySelectedPath[i].path[0]){
						let newPath = new Path();
						newPath.updatePath(copySelectedPath[i].path);
						newPath.updatePath([val[0]]);
						newPath.updateCost(copySelectedPath[i].cost, num_attribute);
						newPath.updateCost(costPhase[phase][val[1]], num_attribute);
						possiblePath[val[0]].push(newPath);
					}
				}
			});
			selectedPath = [];
			possiblePath.map(function(val){
				if (val.length != 0){
					let min = copyArr(val[0].cost);
					for (let i=1;i<val.length;i++){
						for (let j=0;j<num_attribute;j++){
							if (val[i].cost[j] < min[j]) {
								min[j] = val[i].cost[j];
							}
						}
					}
					for (let i=0;i<val.length;i++){
						for (let j=0;j<num_attribute;j++){
							if (val[i].cost[j] == min[j]){
								if (val[i].selected == false){
									val[i].selected = true;
									selectedPath.push(val[i]);
								}
							}
						}
					}
				}
			});
		}
	}
	return selectedPath;
}