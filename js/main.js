;(function () {
	
	'use strict';

	var isMobile = 
	{
		Android: function() {
			return navigator.userAgent.match(/Android/i);
		},
			BlackBerry: function() {
			return navigator.userAgent.match(/BlackBerry/i);
		},
			iOS: function() {
			return navigator.userAgent.match(/iPhone|iPad|iPod/i);
		},
			Opera: function() {
			return navigator.userAgent.match(/Opera Mini/i);
		},
			Windows: function() {
			return navigator.userAgent.match(/IEMobile/i);
		},
			any: function() {
			return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
		}
	};

// 	if (isMobile.any()) {
//     document.querySelector('.containers-wrapper').style.width = '72%';
// }
	
// 	var fullHeight = function() {
// 		var scalePercentage; // 提前声明变量
	
// 		if (!isMobile.any()) {
// 			scalePercentage = 1.0; // 设置缩放比例
// 		} else {
// 			scalePercentage = 1.3;
// 		}
	
// 		// 缩放 .js-fullheight 元素
// 		$('.js-fullheight').css({
// 			'height': $(window).height(),
// 			'transform': 'scale(' + scalePercentage + ')',
// 			'transform-origin': 'center center'
// 		});
	
// 		// 监听窗口大小变化事件
// 		$(window).resize(function(){
// 			// 调整 .js-fullheight 元素的高度和缩放属性
// 			$('.js-fullheight').css({
// 				'height': $(window).height(),
// 				'transform': 'scale(' + scalePercentage + ')',
// 				'transform-origin': 'center center'
// 			});
// 		});
// 	};



function adjustLayout() {
    const container = document.querySelector('.containers-wrapper');
    const fullHeightElements = document.querySelectorAll('.js-fullheight');
    let scalePercentage;

    // 获取窗口的宽高比
    const aspectRatio = window.innerWidth / window.innerHeight;
	if (isMobile.any()){
    	if (aspectRatio < 0.65) { // 竖屏模式（宽高比小于1）
        	container.style.width = '72%';
        	scalePercentage = 1.3;
    	} else {
        	container.style.width = '100%';
        	scalePercentage = 0.8;
    }
}
    fullHeightElements.forEach(element => {
        element.style.height = window.innerHeight + 'px';
        element.style.transform = 'scale(' + scalePercentage + ')';
    });
}

// 在窗口大小变化时调整
window.addEventListener('resize', adjustLayout);


	
	// Parallax
	var parallax = function() {
		$(window).stellar();
	};

	var contentWayPoint = function() {
		var i = 0;
		$('.animate-box').waypoint( function( direction ) {

			if( direction === 'down' && !$(this.element).hasClass('animated-fast') ) {
				
				i++;

				$(this.element).addClass('item-animate');
				setTimeout(function(){

					$('body .animate-box.item-animate').each(function(k){
						var el = $(this);
						setTimeout( function () {
							var effect = el.data('animate-effect');
							if ( effect === 'fadeIn') {
								el.addClass('fadeIn animated-fast');
							} else if ( effect === 'fadeInLeft') {
								el.addClass('fadeInLeft animated-fast');
							} else if ( effect === 'fadeInRight') {
								el.addClass('fadeInRight animated-fast');
							} else {
								el.addClass('fadeInUp animated-fast');
							}

							el.removeClass('item-animate');
						},  k * 100, 'easeInOutExpo' );
					});
					
				}, 50);
				
			}

		} , { offset: '85%' } );
	};



	var goToTop = function() {

		$('.js-gotop').on('click', function(event){
			
			event.preventDefault();

			$('html, body').animate({
				scrollTop: $('html').offset().top
			}, 500, 'easeInOutExpo');
			
			return false;
		});

		$(window).scroll(function(){

			var $win = $(window);
			if ($win.scrollTop() > 200) {
				$('.js-top').addClass('active');
			} else {
				$('.js-top').removeClass('active');
			}

		});
	
	};

	var pieChart = function() {
		$('.chart').easyPieChart({
			scaleColor: false,
			lineWidth: 4,
			lineCap: 'butt',
			barColor: '#FF9000',
			trackColor:	"#f5f5f5",
			size: 160,
			animate: 1000
		});
	};

	var skillsWayPoint = function() {
		if ($('#fh5co-skills').length > 0 ) {
			$('#fh5co-skills').waypoint( function( direction ) {
										
				if( direction === 'down' && !$(this.element).hasClass('animated') ) {
					setTimeout( pieChart , 400);					
					$(this.element).addClass('animated');
				}
			} , { offset: '90%' } );
		}

	};


	// Loading page
	var loaderPage = function() {
		$(".fh5co-loader").fadeOut("slow");
	};

	
	$(function(){
		adjustLayout();
		contentWayPoint();
		// goToTop();
		loaderPage();
		// fullHeight();
		// parallax();
		// // pieChart();
		// skillsWayPoint();
	});

	// 鼠标移入 .profile-thumb-container 时的事件处理
	$('.profile-thumb-container').off('mouseenter').on('mouseenter', function() {
		// 获取链接元素
		var overlayContentLink = $('.overlay-content a');
		
		// 设置定时器，在一秒后将链接设置为可点击
		var timer = setTimeout(function() {
		  overlayContentLink.css('pointer-events', 'auto');
		}, 500);
		
		// 将定时器存储在元素的数据中
		overlayContentLink.data('timer', timer);
	  });
	
	  // 鼠标移开 .profile-thumb-container 时的事件处理
	  $('.profile-thumb-container').off('mouseleave').on('mouseleave', function() {
		// 获取链接元素
		var overlayContentLink = $('.overlay-content a');
		
		// 取消之前的定时器
		clearTimeout(overlayContentLink.data('timer'));
		
		// 将链接设置为不可点击
		overlayContentLink.css('pointer-events', 'none');
	  });
}());


