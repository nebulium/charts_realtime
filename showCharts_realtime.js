//实时数据
Mock.mock(
	'http://mockjs', {
		'timestamp': 1,
		'volume|1-100.1-3': 100,
		'preNext1|1-100.1-3':100,
		'preNext2|1-100.1-3':100,
		'preNext3|1-100.1-3':100,
		'preNext4|1-100.1-3':100
	}
);
var data_arr_volume = [];
var data_arr_preNext1 = [NaN]; //preNext1 is rendered since the next timestamp
var label_arr = [];
var nodes_num = 10;
var count = 0;
label_arr.length = nodes_num;
for(var i = 0; i < label_arr.length; i++) {
	label_arr[i] = '';
}

window.onload = function() {
	console.log(label_arr);
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
					ticks: {
						min: label_arr[1]
					}
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
				//每次显示7天的值,以最常的曲线为主
				if(data_arr_preNext1.length >= nodes_num){
					// data_arr_preNext1.shift();
					data_arr_volume.length = 0;
					data_arr_preNext1.length = 1;
					label_arr.length = nodes_num;
					for(var i = 0; i < label_arr.length; i++) {
						label_arr[i] = '';
					}
					count = 0;
				}

				if(data.volume === -1) {
					data_arr_volume.push(data_arr_volume[data_arr_volume.length - 1]);
				}else {
					data_arr_volume.push(data.volume);
				}

				if(data.preNext1 === -1) {
					data_arr_preNext1.push(data_arr_preNext1[data_arr_preNext1.length - 1]);
				}else{
					data_arr_preNext1.push(data.preNext1);
				}
				update_label();
				console.log(data.preNext1)
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
