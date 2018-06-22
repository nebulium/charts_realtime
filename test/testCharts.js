var config1 = {
	type: 'line',
	data: {
		labels: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
		datasets: [{
			label: '实际值',
			backgroundColor: 'rgb(255, 99, 132)',
			borderColor: 'rgb(255, 99, 132)',
			data: [
				randomScalingFactor(),
				randomScalingFactor(),
				randomScalingFactor(),
				randomScalingFactor(),
				randomScalingFactor(),
				randomScalingFactor(),
				randomScalingFactor(),
				randomScalingFactor(),
				randomScalingFactor(),
				randomScalingFactor(),
            ],
            fill: false,
		} , {
			label: '预测值',
			backgroundColor: 'rgb(54, 162, 235)',
			borderColor: 'rgb(54, 162, 235)',
			data: [
				randomScalingFactor(),
				randomScalingFactor(),
				randomScalingFactor(),
				randomScalingFactor(),
				randomScalingFactor(),
				randomScalingFactor(),
				randomScalingFactor(),
				randomScalingFactor(),
				randomScalingFactor(),
				randomScalingFactor(),
			],
			fill: false
		}]
	},
	options: {
		responsive: true,
		title: {
			display: true,
			text: '曲线图 + scaling'
		},
		tooltips: {
			mode: 'index',
			intersect: false,
		},
		hover: {
			mode: 'nearest',
			intersect: true
		},
		scales: {
			xAxes: [{
				display: true,
				scaleLabel: {
					display: true,
					labelString: '小时'
				}
			}],
			yAxes: [{
				display: true,
				scaleLabel: {
					display: true,
					labelString: '吞吐量'
				}
			}]
		}
	}
};

var config2 = {
	type: 'line',
	data: {
		labels: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
		datasets: [{
			label: '实际值',
			backgroundColor: 'rgb(255, 99, 132)',
			borderColor: 'rgb(255, 99, 132)',
			data: [
				randomScalingFactor(),
				randomScalingFactor(),
				randomScalingFactor(),
				randomScalingFactor(),
				randomScalingFactor(),
				randomScalingFactor(),
				randomScalingFactor(),
				randomScalingFactor(),
				randomScalingFactor(),
				randomScalingFactor(),
            ],
            fill: false,
		} , {
			label: '预测值',
			backgroundColor: 'rgb(54, 162, 235)',
			borderColor: 'rgb(54, 162, 235)',
			data: [
				randomScalingFactor(),
				randomScalingFactor(),
				randomScalingFactor(),
				randomScalingFactor(),
				randomScalingFactor(),
				randomScalingFactor(),
				randomScalingFactor(),
				randomScalingFactor(),
				randomScalingFactor(),
				randomScalingFactor(),
			],
			fill: false
		}]
	},
	options: {
		responsive: true,
		title: {
			display: true,
			text: '曲线图 + 平移'
		},
		tooltips: {
			mode: 'index',
			intersect: false,
		},
		hover: {
			mode: 'nearest',
			intersect: true
		},
		scales: {
			xAxes: [{
				display: true,
				scaleLabel: {
					display: true,
					labelString: '小时'
				}
			}],
			yAxes: [{
				display: true,
				scaleLabel: {
					display: true,
					labelString: '吞吐量'
				}
			}]
		}
	}
};

var config3 = {
	type: 'line',
	data: {
		labels: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
		datasets: [{
			label: '实际值',
			backgroundColor: 'rgb(255, 99, 132)',
			borderColor: 'rgb(255, 99, 132)',
			data: [
				randomScalingFactor(),
				randomScalingFactor(),
				randomScalingFactor(),
				randomScalingFactor(),
				randomScalingFactor(),
				randomScalingFactor(),
				randomScalingFactor(),
				randomScalingFactor(),
				randomScalingFactor(),
				randomScalingFactor(),
            ],
            fill: false,
		} , {
			label: '预测值',
			backgroundColor: 'rgb(54, 162, 235)',
			borderColor: 'rgb(54, 162, 235)',
			data: [
				randomScalingFactor(),
				randomScalingFactor(),
				randomScalingFactor(),
				randomScalingFactor(),
				randomScalingFactor(),
				randomScalingFactor(),
				randomScalingFactor(),
				randomScalingFactor(),
				randomScalingFactor(),
				randomScalingFactor(),
			],
			fill: false
		}]
	},
	options: {
		responsive: true,
		title: {
			display: true,
			text: '折线图 + scaling'
		},
		tooltips: {
			mode: 'index',
			intersect: false,
		},
		hover: {
			mode: 'nearest',
			intersect: true
		},
		scales: {
			xAxes: [{
				display: true,
				scaleLabel: {
					display: true,
					labelString: '小时'
				}
			}],
			yAxes: [{
				display: true,
				scaleLabel: {
					display: true,
					labelString: '吞吐量'
				}
			}]
		},
		elements: {
			line: {
				tension: 0,
			}
		}
	}
};

var config4 = {
	type: 'line',
	data: {
		labels: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
		datasets: [{
			label: '实际值',
			backgroundColor: 'rgb(255, 99, 132)',
			borderColor: 'rgb(255, 99, 132)',
			data: [
				randomScalingFactor(),
				randomScalingFactor(),
				randomScalingFactor(),
				randomScalingFactor(),
				randomScalingFactor(),
				randomScalingFactor(),
				randomScalingFactor(),
				randomScalingFactor(),
				randomScalingFactor(),
				randomScalingFactor(),
            ],
            fill: false,
		} , {
			label: '预测值',
			backgroundColor: 'rgb(54, 162, 235)',
			borderColor: 'rgb(54, 162, 235)',
			data: [
				randomScalingFactor(),
				randomScalingFactor(),
				randomScalingFactor(),
				randomScalingFactor(),
				randomScalingFactor(),
				randomScalingFactor(),
				randomScalingFactor(),
				randomScalingFactor(),
				randomScalingFactor(),
				randomScalingFactor(),
			],
			fill: false
		}]
	},
	options: {
		responsive: true,
		title: {
			display: true,
			text: '折线图 + 平移'
		},
		tooltips: {
			mode: 'index',
			intersect: false,
		},
		hover: {
			mode: 'nearest',
			intersect: true
		},
		scales: {
			xAxes: [{
				display: true,
				scaleLabel: {
					display: true,
					labelString: '小时'
				}
			}],
			yAxes: [{
				display: true,
				scaleLabel: {
					display: true,
					labelString: '吞吐量'
				}
			}]
		},
		elements: {
			line: {
				tension: 0,
			}
		}
	}
};

window.onload = function() {
	var ctx1 = document.getElementById("chart1").getContext('2d');
	var ctx2 = document.getElementById("chart2").getContext('2d');
	var ctx3 = document.getElementById("chart3").getContext('2d');
	var ctx4 = document.getElementById("chart4").getContext('2d');
	window.chart1 = new Chart(ctx1, config1);
	window.chart2 = new Chart(ctx2, config2);
	window.chart3 = new Chart(ctx3, config3);
	window.chart4 = new Chart(ctx4, config4);
};

//events and hanler
//for chart1
document.getElementById('addData1').addEventListener('click', function() {
	if(config1.data.datasets.length > 0) {
		var len = config1.data.labels.length;
		var addX = config1.data.labels[len - 1] + 1;
		config1.data.labels.push(addX);

		config1.data.datasets.forEach(function(dataset) {
			dataset.data.push(randomScalingFactor());
		});

		window.chart1.update();
	}
});
document.getElementById('removeData1').addEventListener('click', function() {
	if(config1.data.datasets.length > 0) {
		config1.data.labels.pop();

		config1.data.datasets.forEach(function(dataset) {
			dataset.data.pop();
		});
		window.chart1.update();
	}
});

//for chart2
document.getElementById('addData2').addEventListener('click', function() {
	if(config2.data.datasets.length > 0) {
		var len = config2.data.labels.length;
		var addX = config2.data.labels[len - 1] + 1;

		config2.data.labels.push(addX);
		config2.data.labels.shift();

		config2.data.datasets.forEach(function(dataset) {
			dataset.data.push(randomScalingFactor());
			dataset.data.shift();
		});

		window.chart2.update();
	}
});

//for chart3
document.getElementById('addData3').addEventListener('click', function() {
	if(config3.data.datasets.length > 0) {
		var len = config3.data.labels.length;
		var addX = config3.data.labels[len - 1] + 1;
		config3.data.labels.push(addX);

		config3.data.datasets.forEach(function(dataset) {
			dataset.data.push(randomScalingFactor());
		});

		window.chart3.update();
	}
});
document.getElementById('removeData3').addEventListener('click', function() {
	if(config3.data.datasets.length > 0) {
		config3.data.labels.pop();

		config3.data.datasets.forEach(function(dataset) {
			dataset.data.pop();
		});
		window.chart3.update();
	}
});

//for chart4
document.getElementById('addData4').addEventListener('click', function() {
	if(config4.data.datasets.length > 0) {
		var len = config4.data.labels.length;
		var addX = config4.data.labels[len - 1] + 1;

		config4.data.labels.push(addX);
		config4.data.labels.shift();

		config4.data.datasets.forEach(function(dataset) {
			dataset.data.push(randomScalingFactor());
			dataset.data.shift();
		});

		window.chart4.update();
	}
});

//utils
function randomScalingFactor() {
	//产生0到100的任意值
	var min = 0;
	var max = 100;
	return Math.floor(Math.random() *(max - min + 1) + min);
}