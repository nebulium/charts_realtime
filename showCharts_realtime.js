//实时数据
// Random.float(60, 100, 3, 5)
// Mock.mock('@float(60, 100, 3, 5)')
var random = '@float(0,100,3,5)';
Mock.mock(
	'http://mockjs', {
		'timestamp': 1,
		'volume': random,
		'preNext1':random,
		'preNext2':random,
		'preNext3':random,
		'preNext4':random
	}
);
var nodes_num = 14;
var start = 1;
//finally
//data_arr_volume.length = nodes_num
//data_arr_preNext1.length = nodes_num + 1;
//data_arr_predict.length = nodes_num + 4;
//label_arr.length = data_arr_predict

//when rendering,
//if volume is [1,2]
//prenext1 is  [empty,3,4]
//predict is   [empty,empty,4,5,6,7]
//label_arr's length is fixed
var data_arr_volume = [];
var data_arr_preNext1 = []; //preNext1 is rendered since the next timestamp
var data_arr_predict = [];
var label_arr = [];
function init_array(start) {
	data_arr_volume.length = 0;
	data_arr_preNext1.length = 1;
	data_arr_predict.length = 0;

	label_arr.length = nodes_num + 4;
	init_label_arr(start);

}
function init_label_arr(start) {
	for(var i = 0; i < label_arr.length; i++) {
		label_arr[i] = start;
		start++;
	}
}
window.onload = function() {
	init_array(start);
	var ctx = document.getElementById('volumeChart').getContext('2d');
	window.volumeChart = new Chart(ctx, {
		type: 'line',
		data: {
			labels: label_arr,
			datasets: [{
				label: '实际曲线',
				data: data_arr_volume,
				yAxisID: 'y-axis-1',
				borderColor: 'rgb(255,99,132)',
				backgroundColor: 'rgb(255,99,132)',
				fill: false
			}, {
				label: '预测曲线',
				data: data_arr_preNext1,
				borderColor: 'rgb(54,162,235)',
				backgroundColor: 'rgb(54,162,235)',
				fill: false
			}, {
				label: '下一段',
				data: data_arr_predict,
				borderColor: 'rgb(0,0,0)',
				backgroundColor: 'rgb(0,0,0)',
				fill: false
			}]
		},
		options: {
			responsive: true,
			elements: {
				line: {
					tension: 0,
				}
			},
			scales: {
				xAxes: [{
					display: true,
				}],
				yAxes: [{
					type: 'linear',
					display: true,
					position: 'left',
					id: 'y-axis-1',
					ticks: {
						suggestedMin: 0,
						suggestedMax: 100,
					}
				}]
			}
		}
	});
	timer = setInterval(function(){
		$.ajax({
			type: 'GET',
			url: 'http://mockjs',
			async: true,
			data: {},
			dataType: 'json',
			success: function(data) {
				//每次显示7天的值
				if(data_arr_preNext1.length >= nodes_num){
					// data_arr_preNext1.shift();
					start = label_arr[nodes_num - 1] + 1;
					init_array(start);
				}

				//clear the data_arr_predict
				data_arr_predict.length = 0;
				data_arr_predict.length = data_arr_volume.length + 1;

				if(data.volume === -1) {
					data_arr_volume.push(data_arr_volume[data_arr_volume.length - 1]);
				}else {
					data_arr_volume.push(data.volume);
				}

				if(data.preNext1 === -1) {
					var tmp = data_arr_preNext1[data_arr_preNext1.length - 1];
					data_arr_preNext1.push(tmp);
					data_arr_predict.push(tmp);
				}else{
					data_arr_preNext1.push(data.preNext1);
					data_arr_predict.push(data.preNext1);
				}

				if(data.preNext2 === -1) {
					data_arr_predict.push(NaN);
				}else{
					data_arr_predict.push(data.preNext2);
				}

				if(data.preNext3 === -1) {
					data_arr_predict.push(NaN);
				}else{
					data_arr_predict.push(data.preNext3);
				}

				if(data.preNext4 === -1) {
					data_arr_predict.push(NaN);
				}else{
					data_arr_predict.push(data.preNext4);
				}
				window.volumeChart.update();
			}
		});
	},1000);
};

function update_label() {
	var now = new Date();
	var hh = now.getHours();
	var mm = now.getMinutes();
	var ss = now.getSeconds();
	var clock = "";
	if(hh < 10) clock += '0';
	clock += hh + ':';
	if(mm < 10) clock += '0';
	clock += mm + ':';
	if(ss < 10) clock += '0';
	clock += ss;

	// label_arr.push(clock);
	label_arr[count] = clock;
	count++;
}

function getMax(arr1,arr2) {
	var max1 = (Math.max.apply(null, arr1) / 10 + 1) * 10;
	var max2 = (Math.max.apply(null, arr2) / 10 + 1) * 10;
	return max1 > max2 ? max1 : max2;
}
