//模拟数据
// Random.float(60, 100, 3, 5)
// Mock.mock('@float(60, 100, 3, 5)')
var random = '@float(30,50,3,5)';
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

// Mock.mock('http://mockjs',{
// 	"user|10":[{
// 		"timestamp":"@date(yyyy-MM-dd)",
// 		"volume|10-50":50,
// 		"preNext1|10-50":50,
// 		"preNext2|10-50":50,
// 		"preNext3|10-50":50,
// 		"preNext4|10-50":50,
// 	}]
// });

//datas
var nodes_num = 7 * 24;
var startTime = '2013-02-08 09:30 ';
var timeFormat = 'YYYY/MM/DD HH:mm';
var borderWidth = 1;
var pointRadius = 1;
var pointHoverRadius;

var data_arr_volume = [];
var data_arr_preNext1 = []; //preNext1 is rendered since the next timestamp
var data_arr_predict = [];
var label_arr = [];

//utils
function newDateString(start,hours) {
	return moment(start).add(hours,'h').format(timeFormat);
}

function init_array(startTime) {
	data_arr_volume.length = 0;
	data_arr_preNext1.length = 1;
	data_arr_predict.length = 0;
	label_arr.length = nodes_num + 4;
	init_label_arr(startTime);
}
function init_label_arr(startTime) {
	for(var i = 0; i < label_arr.length; i++) {
		label_arr[i] = newDateString(startTime,i);
	}
}

//main
window.onload = function() {
	var ctx = document.getElementById('volumeChart').getContext('2d');
	window.volumeChart = new Chart(ctx, {
		type: 'line',
		data: {
			labels: label_arr,
			datasets: [{
				label: '实际曲线',
				data: data_arr_volume,
				yAxisID: 'y-axis-1',
				borderWidth: borderWidth,
				pointRadius: pointRadius,
				borderColor: 'rgb(255,99,132)',
				backgroundColor: 'rgb(255,99,132)',
				fill: false
			}, {
				label: '预测曲线',
				data: data_arr_preNext1,
				borderWidth: borderWidth,
				pointRadius: pointRadius,
				borderColor: 'rgb(54,162,235)',
				backgroundColor: 'rgb(54,162,235)',
				fill: false
			}, {
				label: '下一段',
				data: data_arr_predict,
				borderWidth: borderWidth,
				pointRadius: pointRadius,
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
					time: {
						format: timeFormat
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
	init_array(startTime);
	window.volumeChart.update();
	//get data from url
	timer = setInterval(function(){
		$.ajax({
			type: 'GET',
			url: 'http://mockjs',
			async: true,
			data: {},
			dataType: 'json',
			success: function(data) {

				if(data_arr_preNext1.length >= nodes_num){
					startTime = label_arr[label_arr.length - 4]
					init_array(startTime);
				}else{
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
				}
				
				window.volumeChart.update();
			}
		});
	},1000);
};
