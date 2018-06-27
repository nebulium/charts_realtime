//模拟数据
Mock.mock('http://testjs',{
	"user|168":[{
		"timestamp":"@date(yyyy-MM-dd)",
		"volume|70-73":50,
		"preNext1|80-83":52,
		"preNext2|80-83":53,
		"preNext3|80-83":52,
		"preNext4|80-83":54,
		"preNext5|80-83":55,
		"preNext6|80-83":55
	}] 
});

//default data
var nodes_num = 7 * 24;
var startTime = '2013-02-08 00:00';
var timeFormat = 'YYYY/MM/DD HH:mm';

//storage data for x & y axis
var data_arr_volume = [];
var data_arr_preNext1 = []; //preNext1 is rendered since the next timestamp
var data_arr_predict = [];
var label_arr = [];

//utils
function newDateString(start,hours) {
	return moment(start).add(hours,'h').format(timeFormat);
}

//important procedure
function init_array(startTime) {
	data_arr_volume.length = 0;
	data_arr_preNext1.length = 1;
	data_arr_predict.length = 0;
	label_arr.length = nodes_num + 6;
	init_label_arr(startTime);
	doAjaxGet();
}
function init_label_arr(startTime) {
	for(var i = 0; i < label_arr.length; i++) {
		label_arr[i] = newDateString(startTime,i);
	}
}

//doAjaxGet(timestamp,dataNums)
function doAjaxGet() {
	$.ajax({
		type: 'GET',
		url: 'http://testjs',
		async: true,
		data: {},
		dataType: 'json',
		success: function(data) {
			var resultArr = data.user;
			console.log(data);
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
			data_arr_predict.push(data.preNext5);
			data_arr_predict.push(data.preNext6);
			window.volumeChart.update();
		}
	},1000);
}

//main
window.onload = function() {
	var ctx = document.getElementById('volumeChart').getContext('2d');
	var btn = document.getElementById('btn');
	var input = document.getElementById('dates');
	Chart.defaults.global.elements.point.radius = 1;
	Chart.defaults.global.elements.line.borderWidth = 1;
	Chart.defaults.global.elements.line.fill = false;
	Chart.defaults.global.elements.line.tension = 0.4;
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
			}, {
				label: '预测曲线',
				data: data_arr_preNext1,
				borderColor: 'rgb(54,162,235)',
				backgroundColor: 'rgb(54,162,235)',
			}, {
				label: '下一段',
				data: data_arr_predict,
				borderColor: 'rgb(0,0,0)',
				backgroundColor: 'rgb(0,0,0)',
			}]
		},
		options: {
			responsive: true,
			title: {
				display: true,
				text: '实时流量与预测流量分析'
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
