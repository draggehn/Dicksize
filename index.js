var sizes = [
	{'name': 'Afghanistan', 'size': 5.3},
	{'name': 'Algeria', 'size': 5.5},
	{'name': 'Argentina', 'size': 5.8},
	{'name': 'Australia', 'size': 5.2},
	{'name': 'Austria', 'size': 5.6},
	{'name': 'Belguim', 'size': 6.2},
	{'name': 'Belize', 'size': 6.2},
	{'name': 'Bolivia', 'size': 6.5},
	{'name': 'Brazil', 'size': 6.3},
	{'name': 'Bulgaria', 'size': 5.9},
	{'name': 'Canada', 'size': 5.5},
	{'name': 'Chile', 'size': 5.7},
	{'name': 'China', 'size': 4.3},
	{'name': 'Colombia', 'size': 6.7},
	{'name': 'Congo', 'size': 7.1},
	{'name': 'Costa Rica', 'size': 5.9},
	{'name': 'Croatia', 'size': 5.8},
	{'name': 'Cuba', 'size': 6.2},
	{'name': 'Czech Rep.', 'size': 6.3},
	{'name': 'Denmark', 'size': 6.0},
	{'name': 'Dominical Rep.', 'size': 6.2},
	{'name': 'Egypt', 'size': 6.2},
	{'name': 'Equador', 'size': 6.9},
	{'name': 'Ethiopia', 'size': 5.3},
	{'name': 'France', 'size': 5.7},
	{'name': 'Germany', 'size': 5.7},
	{'name': 'Ghana', 'size': 6.8},
	{'name': 'Greece', 'size': 5.8},
	{'name': 'Greenland', 'size': 5.4},
	{'name': 'Guatemala', 'size': 6.1},
	{'name': 'Haiti', 'size': 6.3},
	{'name': 'Honduras', 'size': 5.9},
	{'name': 'Hungary', 'size': 6.5},
	{'name': 'Iceland', 'size': 5.7},
	{'name': 'India', 'size': 4},
	{'name': 'Indonesia', 'size': 4.6},
	{'name': 'Iran', 'size': 4.6},
	{'name': 'Iraq', 'size': 4.5},
	{'name': 'Italy', 'size': 6.2},
	{'name': 'Ireland', 'size': 5.0},
	{'name': 'Isreal', 'size': 5.6},
	{'name': 'Jamaica', 'size': 6.4},
	{'name': 'Japan', 'size': 4.3},
	{'name': 'Korea (N)', 'size': 3.8},
	{'name': 'Korea (S)', 'size': 4.3},
	{'name': 'Lebanon', 'size': 6.6},
	{'name': 'Malaysia', 'size': 4.4},
	{'name': 'Mexico', 'size': 5.9},
	{'name': 'Mongolia', 'size': 5.0},
	{'name': 'Morocco', 'size': 5.9},
	{'name': 'Netherlands', 'size': 6.2},
	{'name': 'New Zealand', 'size': 5.5},
	{'name': 'Nicaragua', 'size': 6.0},
	{'name': 'Nigeria', 'size': 6.0},
	{'name': 'Norway', 'size': 5.6},
	{'name': 'Pakistan', 'size': 4.8},
	{'name': 'Panama', 'size': 6.4},
	{'name': 'Phillipines', 'size': 4.2},
	{'name': 'Peru', 'size': 6.3},
	{'name': 'Poland', 'size': 5.6},
	{'name': 'Portugal', 'size': 5.2},
	{'name': 'Puerto Rico', 'size': 6.3},
	{'name': 'Romania', 'size': 4.9},
	{'name': 'Russia', 'size': 5.2},
	{'name': 'Singapore', 'size': 4.5},
	{'name': 'South Africa', 'size': 6.0},
	{'name': 'Spain', 'size': 5.5},
	{'name': 'Sudan', 'size': 6.4},
	{'name': 'Sweden', 'size': 5.8},
	{'name': 'Switzerland', 'size': 5.6},
	{'name': 'Taiwan', 'size': 4.2},
	{'name': 'Thailand', 'size': 4.0},
	{'name': 'Turkey', 'size': 5.5},
	{'name': 'Ukraine', 'size': 5.5},
	{'name': 'United Kingdom', 'size': 5.5},
	{'name': 'United States', 'size': 5.1},
	{'name': 'Venezuela', 'size': 6.7},
	{'name': 'Vietnam', 'size': 4.5},
	{'name': 'Zimbabwe', 'size': 6.1},
];

var entry;

$(document).ready(function(){
	var c = 0;
	sizes.forEach(function(element) {
		$('.dropdown-menu').append('<li><a>' + element.name + '</a></li>');
		if(++c == sizes.length) {
			saveTemplate();
		}
	});

	$(document).on('click', '.dropdown-menu li a', function(e) {
		var text = $(this).text();
		$(this).closest('.btn-group').find('.dropdown-toggle').text(text);
	});

	$('#add').on('click', function() {
		$('.content').append(entry);
	});

	$('#remove').on('click', function() {
		if($('.content').children('table').length > 1) {
			$('.content').children('table').last().remove();
		}
	});

	$('#calc').on('click', function() {
		var results = [];
		$('.entry').each(function(index, entry) {
			var element = {'country': $(entry).find('.dropdown-toggle').text(), 'percent': $(entry).find('input').val()}
			results.push(element);
		});
		var sum = addPergentage(results);
		var noSelects = checkSelects(results);
		if(sum == 100 && noSelects) {
			$('.error').slideUp(100);
			console.log(results);
			calculate(results);
		} else {
			$('.error').slideDown(100);
		}
	});
});

function saveTemplate() {
	entry = '<table class="entry col-sm-6 col-sm-offset-3 col-xs-12">' + $('.entry').html() + '</table>';
}

function addPergentage(results) {
	var total = 0;
	results.forEach(function(result) {
		total += Number(result.percent);
	});
	return total;
}

function checkSelects(results) {
	var bool = true;
	results.forEach(function(result) {
		if(result.country === 'Select'){
			console.log('selelelelelect');
			bool =  false;
		}
	});
	return bool;
}

function calculate(results) {
	var length = 0;
	results.forEach(function(result) {
		length += getSizeByCountry(result.country)*result.percent*0.01;
	});
	$('#inches').text(length.toFixed(2));
	$('.result').slideDown();
}

function getSizeByCountry(country) {
	for (var i = 0; i < sizes.length; i++) {
		if(country == sizes[i].name){
			return sizes[i].size;
		}
	}
	return 0;
}
