Mock.mock('http://testjs',{
	'num|1-55':50
});

var data_arr = [];
var label_arr = [];
var timeFormat = 'MM/DD/YYYY HH:mm';
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
	window.timeCharts.update();
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
	timer = setInterval(function(){
		$.ajax({
			type:'GET',
			url:'http://testjs',
			async: true,
			data:{},
			dataType: 'json',
			success: function(data){
				if(data_arr.length >= 10) {
					startTime = newDateString(label_arr[label_arr.length - 1],1);
					init_arrs(newDateString(startTime));
				} else {
					if(data.num == -1) {
						data_arr.push(NaN);
					} else{
						data_arr.push(data.num);
					}
					window.timeCharts.update();
				}
			}
		});
	},1000);
};
