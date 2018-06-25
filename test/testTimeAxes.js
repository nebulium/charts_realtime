Mock.mock('http://testjs',{
	"user|10":[{
		"num|1-55":50
	}]
});
var data_arr = [];
var label_arr = [];
var timeFormat = 'MM/DD/YYYY HH:mm';
//memo
// 每一次请求，需要
// 1、初始化坐标
// 2、请求数据
// 3、绘制数据
// 每一次请求发生在：
// 1、用户完成有效输入
// 2、坐标画满
// 3、初始化的时候
//util
function newDateString(start,hours) {
	return moment(start).add(hours,'h').format(timeFormat);
}
var startTime = '2013-02-08 09:30 ';
function init_label_arr(start) {
	label_arr.length = 10;
	for(var i = 0; i < 10; i++) {
		label_arr[i] = newDateString(startTime,i);
	}
}
function init_arrs(start) {
	data_arr.length = 0;
	init_label_arr(start);
	doAjaxGet();
}

function render_chart(arr) {
	var i = 0;
	console.log(arr.length);
	var timer = setInterval(function(){
		if(i >= arr.length) {
			clearInterval(timer);
		}else{
			data_arr.push(arr[i++].num);
			window.timeCharts.update();
		}
	},1000);
}

function doAjaxGet(){
	$.ajax({
		type:'GET',
		url:'http://testjs',
		async: true,
		data:{},
		dataType: 'json',
		success: function(data) {
			var resultArr = data.user;
			render_chart(resultArr);
		}
	});
}

window.onload = function(){
	var ctx = document.getElementById('timeChart').getContext('2d');
	window.timeCharts = new Chart(ctx, {
		type: 'line',
		data: {
			labels: label_arr,
			datasets: [{
				label: '曲线',
				data: data_arr,
				borderColor: 'rgb(255, 99, 132)',
				backgroundColor: 'rgb(255,99,132)',
				fill: false
			}]
		},
		options: {
			scales: {
				xAxes: [{
					display: true,
					time: {
						format: timeFormat,
					}
				}],
				yAxes: [{
					display: true,
					type: 'linear',
					ticks: {
						suggestedMin: 0,
						suggestedMax: 55
					}
				}]
			}
		}
	});
	init_arrs(startTime);
};




// var input = document.getElementById('date');
// var btn = document.getElementById('btn');
// btn.onclick = function() {
// 	console.log(input.value);
// 	if(input.value) {
// 		clearInterval(timer);
// 		startTime = input.value + ' 00:00';
// 		init_arrs(startTime);
// 		anotherTimer = setInterval(function(){
// 			$.ajax({
// 				type:'GET',
// 				url:'http://testjs',
// 				async: true,
// 				data:{},
// 				dataType: 'json',
// 				success: function(data) {
// 					onSuccess(data);
// 				}
// 			});
// 		},1000);
// 	}
// 	return false;
// }
