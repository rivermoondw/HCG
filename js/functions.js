var printInput = function(input){
	console.log(JSON.stringify(input))
}

var emptyArr = function(arr, num_solution){
	for (let i=0;i<num_solution;i++){
		arr[i] = [];
	}
}

var copyArr = function(arr){
	return JSON.parse(JSON.stringify(arr));
}
var addPath = function(idTable, num_phase, num_solution){
	var txt = '<tr><td><a class="delBtn" href="" onclick="delPath(this); return false;"><i class="glyphicon glyphicon-minus-sign"></i></a></td><td><div class="form-group">';
	txt += '<select name="sltPhase" class="form-control">';
	for (let i=0;i<num_phase;i++){
		txt += '<option value="'+i+'">'+(i+1)+'</option>';
	}
	txt += '</select></div></td>';
	txt += '<td><div class="form-group"><select name="sltFrom" class="form-control">';
	for (let i=0;i<num_solution;i++){
		txt += '<option value="'+i+'">'+(i+1)+'</option>';
	}
	txt += '</select></div></td>';
	txt += '<td><div class="form-group"><select name="sltTo" class="form-control">';
	for (let i=0;i<num_solution;i++){
		txt += '<option value="'+i+'">'+(i+1)+'</option>';
	}
	txt += '</select></div></td>';
	txt += '</tr>';
	$('#'+idTable).append(txt);
}
var delPath = function(e){
	$(e).parents('tr').remove();
}
var getInputPath = function(pathPhase){
	let num_phase = pathPhase.length;
	let inputPath = [];
	for (let i=0;i<num_phase;i++){
		let copyInputPath = copyArr(inputPath);
		inputPath = [];
		if (copyInputPath.length == 0){
			pathPhase[i].map(function(val){
				let tempVal = copyArr(val);
				for (let j=0;j<tempVal.length;j++){
					tempVal[j] += 1;
				}
				inputPath.push(tempVal);
			})
		}
		else {
			pathPhase[i].map(function(val){
				copyInputPath.map(function(v){
					if (val[0]+1 == v[v.length-1]){
						let temp = copyArr(v);
						temp.push(val[1]+1);
						inputPath.push(temp);
					}
				})
			})
		}
	}
	return inputPath;
}