var offices = [
	{
		lat: 55.72246971901109,
		lng: 37.635040283203125,
		type: 1,
		name: 'BaltGaz - Ленгазаппарат1',
		city: 'Санкт-Петербург',
		address: 'ул. Варшавская д. 58',
		phone: '+7 (812) 456-49-19',
		mail: 'shop10@gbtorg.ru'
	},
	{
		lat: 55.78275147606406,
		lng: 37.720184326171875,
		type: 1,
		name: 'BaltGaz - Ленгазаппарат2',
		city: 'Санкт-Петербург',
		address: 'ул. Варшавская д. 58',
		phone: '+7 (812) 456-49-19',
		mail: 'shop10@gbtorg.ru'
	},
	{
		lat: 55.85681658243853,
		lng: 38.461761474609375,
		type: 2,
		name: 'BaltGaz - Ленгазаппарат3',
		city: 'Санкт-Петербург',
		address: 'ул. Варшавская д. 58',
		phone: '+7 (812) 456-49-19',
		mail: 'shop10@gbtorg.ru'
	},
	{
		lat: 55.813629071199585,
		lng: 38.972625732421875,
		type: 1,
		name: 'BaltGaz - Ленгазаппарат4',
		city: 'Санкт-Петербург',
		address: 'ул. Варшавская д. 58',
		phone: '+7 (812) 456-49-19',
		mail: 'shop10@gbtorg.ru'
	},
	{
		lat: 56.145549500679074,
		lng: 38.873748779296875,
		type: 2,
		name: 'BaltGaz - Ленгазаппарат5',
		city: 'Санкт-Петербург',
		address: 'ул. Варшавская д. 58',
		phone: '+7 (812) 456-49-19',
		mail: 'shop10@gbtorg.ru'
	},
	{
		lat: 55.98455508140472,
		lng: 37.258758544921875,
		type: 1,
		name: 'BaltGaz - Ленгазаппарат6',
		city: 'Санкт-Петербург',
		address: 'ул. Варшавская д. 58',
		phone: '+7 (812) 456-49-19',
		mail: 'shop10@gbtorg.ru'
	},
	{
		lat: 55.660545462667464,
		lng: 37.319183349609375,
		type: 1,
		name: 'BaltGaz - Ленгазаппарат7',
		city: 'Санкт-Петербург',
		address: 'ул. Варшавская д. 58',
		phone: '+7 (812) 456-49-19',
		mail: 'shop10@gbtorg.ru'
	},
	{
		lat: 55.60162653582997,
		lng: 38.431549072265625,
		type: 2,
		name: 'BaltGaz - Ленгазаппарат8',
		city: 'Санкт-Петербург',
		address: 'ул. Варшавская д. 58',
		phone: '+7 (812) 456-49-19',
		mail: 'shop10@gbtorg.ru'
	},
];

function initMap() {
	var mapContainer = $('#contacts-map');
	if(!mapContainer.length) return;
	
	var map = new google.maps.Map(document.getElementById('contacts-map'), {
			center: {lat: 37.36, lng: 55.45},
			zoom: 8
		}),
		infowindow = new google.maps.InfoWindow();
	offices.forEach(function(item, index) {
		createMarker(item, map, infowindow);
	});	
}

function createMarker(item, map, infowindow) {
	var template = '<div class="map-info-window">' +
						'<div class="title"><span>' + item.name + '</span><i class="icon icon__triangle--border-blue"></i></div>' +
						'<div class="info">' +
							'<p>' + item.city + '</br>' + item.address + '</p>' +
							'<p>' + item.phone + '</br>' + item.mail + '</p>' +
						'</div>' +
					'</div>';
    var marker = new google.maps.Marker({
        position: new google.maps.LatLng(item.lat, item.lng),
        map: map
    });


    google.maps.event.addListener(marker, 'click', function() {		
    	infowindow.setContent(template);
        infowindow.open(map, this);
    });
}

$(document).ready(function () {
	var time = 5;
 
	var $progressBar,
		$bar, 
		$elem, 
		isPause, 
		tick,
		percentTime;

	var sliders = {
		wide: {
			selector: '.wide-slider',
			params: {
				items: 1,
				nav: true,
				loop: true,	
				dots: false,
				onInitialized: progressBar,
				onTranslated: moved,
				onDrag: pauseOnDragging,
				onChange: changeTheme
			}		
		},
		default: {
			params: {
				items: 1
			}
		}
	};

	var slidersDepend = {
		advantages: {
			selector: '.advantages-slider',
			width: 900,
			params: {
				responsive: {
					'0': {
						items: 1
					},
					'600': {
						items: 2
					}
				}
			}
		},
		news: {
			selector: '.js-news-slider-main',
			width: 900,
			params: {
				autoHeight: false,
				responsive: {
					'0': {
						items: 1,
						autoHeight: true
					},
					'600': {
						items: 2,						
						margin: 5,
						autoHeight: false
					}
				}
			}		
		},
		newsInContent: {
			selector: '.js-news-slider-inContent',
			width: 992,
			params: {
				autoHeight: false,
				responsive: {
					'0': {
						items: 1,
						autoHeight: true
					},
					'600': {
						items: 2,					
						margin: 5,
						autoHeight: false
					},
					'800': {
						items: 3,						
						margin: 5,
						autoHeight: false
					}
				}
			}		
		},
		products: {
			selector: '.products-slider',
			width: 900,
			params: {
				responsive: {
					'0': {
						items: 1,
					},
					'480': {
						items: 2,						
						margin: 5,
					},
					'768': {
						items: 3,						
						margin: 5,
					}
				}
			}
		}
	};

	$(sliders.wide.selector).owlCarousel(sliders.wide.params);

	function changeTheme(e) {
		setTimeout(function() {
			var active = $('.wide-slider').find('.owl-item.active'),
				theme = $(active).children().attr('data-theme'),
				themeContainer = $('.page-wrapper');
				themeContainer.attr('data-theme', theme);
		}, 1);		
	}

	function progressBar(){ 
		if (time > 0) {
			buildProgressBar();
		
			start();
		}		
	}

	function buildProgressBar(){
		if (time > 0) {
			$progressBar = $("<div>",{
				class :"slide-progress"
			});
			
			$bar = $("<div>",{
				class:"progress"
			});
			
			$progressBar.append($bar).prependTo($(".wide-slider"));
		}		
	}

	function start() {
		if (time > 0) {
			percentTime = 0;
			isPause = false;
			
			tick = setInterval(interval, 10);
		}
	};

	function interval() {
		if(isPause === false && time > 0){
			percentTime += 1 / time;
			
			$bar.css({
				width: percentTime+"%"
			});
			
			if(percentTime >= 100){
				$(sliders.wide.selector).trigger("next.owl.carousel");
				percentTime = 0;
			}		
		}
	}

	function pauseOnDragging(){
		if (time > 0) {
			isPause = true;
		}
	}

	function moved(){
		if (time > 0) {
			clearTimeout(tick);
			
			start();
		}
	}		

	checkSlider();
	$(window).on('resize', debounce(function(e) {
		checkSlider();
	}, 300));
	
	function checkSlider() {
		var docWidth = $('body').width();
		for (key in slidersDepend) {
			var width = slidersDepend[key].width,
				params = slidersDepend[key].params || sliders.default.params,
				loaded = $(slidersDepend[key].selector).hasClass('owl-loaded'); 

			if(width > docWidth && !loaded) {
				$(slidersDepend[key].selector).owlCarousel(params);
			} else if (width <= docWidth && loaded) {
				$(slidersDepend[key].selector).trigger('destroy.owl.carousel');
			}
		}
	};

	$(".menu-btn[data-fancybox]").fancybox({
		closeTpl : '<button data-fancybox-close class="close-modal-menu"></button>',
		touch : false,
		beforeLoad: function( instance, slide ) {
			checkSlider();
		}
	});

	$('.object-detail__gallery .image-preview').owlCarousel({
		nav: true,
		items: 4,
		dots: false,
		margin: 12,
		mouseDrag: false, 
		touchDrag: false,
		responsive: {
			0 : {
				items: 2,
			},
			480 : {
				items: 3,
			},
			768 : {
				items: 4,
			}
		}
	});

	$('.object-detail__gallery .image-preview__item').on('click', function() {
		var url = $(this).attr('data-url');

		$('.object-detail__gallery .image-preview .owl-item').removeClass('current');
		$(this).parents('.owl-item').addClass('current');

		$('.object-detail__gallery .image-full img').attr('src', url);
	});

	function debounce(func, wait, immediate) {
		var timeout;
		return function() {
			var context = this, args = arguments;
			var later = function() {
				timeout = null;
				if (!immediate) func.apply(context, args);
			};        
			var callNow = immediate && !timeout;        
			clearTimeout(timeout);
			timeout = setTimeout(later, wait);        
			if (callNow) func.apply(context, args);        
		};
	}

	var questionDropdown = $('.questions__item .title');
	questionDropdown.on('click', function(e) {
		e.preventDefault();

		var item = $(this).parents('.questions__item'),
			text = $(this).find('button span');

		item.toggleClass('active');

		if(item.hasClass('active')) {
			text.text('Скрыть');
		} else {
			text.text('Ответ');
		}
	});

	var vacancyDropdown = $('.career-list__item-head');
	vacancyDropdown.on('click', function(e) {
		e.preventDefault();

		var modalBtnClick = $(e.target).attr('data-fancybox');
		
		if(modalBtnClick !== undefined) return;

		var item = $(this).parents('.career-list__item'),
			text = $(this).find('.panel__toggle span');

		item.toggleClass('active');

		if(item.hasClass('active')) {
			text.text('Свернуть');
		} else {
			text.text('Подробнее');
		}
	});

	// Toggle buttons
	$('.js-toggle').on('click', function(e) {
		e.preventDefault();

		var target = $(this).attr('data-toggle');
		$(this).toggleClass('active');
		$('.' + target).toggleClass('active');
	});

	// Custom input file
	var inputFile = $('.input-file');
	inputFile.find('input[type="file"]').on('change', function(e) {
		var file = e.target.files[0],
			resultBlock = $(this).siblings('.input-file__result'),
			btn = $(this).siblings('.input-file__btn'),
			parent = $(this).parent('.input-file');
			_this = this;

		if (file != undefined) {
			var value = file.name;
			
			resultBlock.text(value);
			btn.text('Удалить');
			btn.attr('data-action', 'remove');
			parent.addClass('file-changed');
		} else {
			resultBlock.empty();
			btn.text('Прикрепить файл');
			parent.removeClass('file-changed');
		}
		
		btn.on('click', function(e) {
			e.preventDefault();

			var actionType = $(this).attr('data-action');

			if(actionType == 'remove') {
				console.log(file);
				resultBlock.empty();
				file = null;
				console.log(file);
				btn.text('Прикрепить файл');
				$(this).removeAttr('data-action');
			}
		});
	});



	// Massonry
	$(window).load(function(){
		$('.strip-elements').masonry({
			columnWidth: '.strip-elements__item',
			itemSelector: '.strip-elements__item',
			gutter: 12
		});
	});	

	// Custom input
	$('.input-select').styler();
	
	// Замена imgSvg на inlineSvg
	$('img.svg').each(function(){
		var $img = $(this),
			imgID = $img.attr('id'),
			imgClass = $img.attr('class'),
			imgURL = $img.attr('src');

		$.get(imgURL, function(data) {
			var $svg = $(data).find('svg');

			if(typeof imgID !== 'undefined') {
				$svg = $svg.attr('id', imgID);
			}
			if(typeof imgClass !== 'undefined') {
				$svg = $svg.attr('class', imgClass+' replaced-svg');
			}

			$svg = $svg.removeAttr('xmlns:a');

			if(!$svg.attr('viewBox') && $svg.attr('height') && $svg.attr('width')) {
				$svg.attr('viewBox', '0 0 ' + $svg.attr('height') + ' ' + $svg.attr('width'))
			}
			$svg.find('style').remove();
			$img.replaceWith($svg);
		}, 'xml');
	});
});