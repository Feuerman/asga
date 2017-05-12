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
			selector: '.news-slider',
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