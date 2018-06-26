//模拟数据
Mock.mock('http://testjs',{
	"user|20":[{
		"timestamp":"@date(yyyy-MM-dd)",
		"volume|1-55":50,
		"preNext1|1-55":50,
		"preNext2|1-55":50,
		"preNext3|1-55":50,
		"preNext4|1-55":50
	}] 
});

//datas
var nodes_num = 20;
var startTime = '2013-02-08 00:00 ';
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
	doAjaxGet();
}
function init_label_arr(startTime) {
	for(var i = 0; i < label_arr.length; i++) {
		label_arr[i] = newDateString(startTime,i);
	}
}

function doAjaxGet() {
	$.ajax({
		type: 'GET',
		url: 'http://testjs',
		async: true,
		data: {},
		dataType: 'json',
		success: function(data) {
			var resultArr = data.user;
			render_chart(resultArr);
		}
	});
}

function render_chart(arr) {
	var i = 0;
	timer = setInterval(function(){
		if(i >= nodes_num) {
			clearInterval(timer);
			startTime = label_arr[label_arr.length - 4];
			init_array(startTime);
		}else {
			var data = arr[i++];
			data_arr_predict.length = 0;
			data_arr_predict.length = data_arr_volume.length + 1;

			data_arr_volume.push(data.volume);
			data_arr_preNext1.push(data.preNext1);
			data_arr_predict.push(data.preNext1);
			data_arr_predict.push(data.preNext2);
			data_arr_predict.push(data.preNext3);
			data_arr_predict.push(data.preNext4);
			window.volumeChart.update();
		}
	},1000);
}

//main
window.onload = function() {
	var ctx = document.getElementById('volumeChart').getContext('2d');
	var btn = document.getElementById('btn');
	var input = document.getElementById('dates');
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
	btn.onclick = function(){
		if(input.value) {
			if(timer) clearInterval(timer);
			startTime = input.value + ' 00:00';
			init_array(startTime);
		}
		return false;
	};
};
