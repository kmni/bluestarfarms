// Place any jQuery/helper plugins in here.
jQuery.fn.center = function () { this.css("position","absolute"); this.css("top", Math.max(0, (($(window).height() - $(this).outerHeight()) / 2) + $(window).scrollTop()) + "px"); this.css("left", Math.max(0, (($(window).width() - $(this).outerWidth()) / 2) + $(window).scrollLeft()) + "px"); return this; }
jQuery.fn.scrollTo = function( target, options, callback ){
  if(typeof options == 'function' && arguments.length == 2){ callback = options; options = target; }
  var settings = $.extend({
	scrollTarget  : target,
	offsetTop     : 0,
	duration      : 500,
	easing        : 'swing'
  }, options);
  return this.each(function(){
	var scrollPane = $(this);
	var scrollTarget = (typeof settings.scrollTarget == "number") ? settings.scrollTarget : $(settings.scrollTarget);
	var scrollY = (typeof scrollTarget == "number") ? scrollTarget : scrollTarget.offset().top + scrollPane.scrollTop() - parseInt(settings.offsetTop);
	scrollPane.animate({scrollTop : scrollY }, parseInt(settings.duration), settings.easing, function(){
	  if (typeof callback == 'function') { callback.call(this); }
	});
  });
}

var hju	= {

	mobileNavi:	function(){
		if ($('.mobile_menu').length > 0)
		{
			$('.mobile_menu a').click(function(){
				var a			= $(this),
					mob_navi	= $('.mobile_menu'),
					top_navi	= $('.main_menu').length > 0 ? $('.main_menu') : false;
				if (top_navi)
				{
					if (top_navi.hasClass('expanded'))
					{
						mob_navi.removeClass('expanded');
						top_navi.removeClass('expanded');
					}
					else
					{
						mob_navi.addClass('expanded');
						top_navi.addClass('expanded');
					}
				}
				return false;
			});
		}
	},
	
	lightbox:	function(){
		$('a.lightbox').on('click', function(){
			
		});
	},
	
	backToTop:	function () {
		// console.log('document: '+$(document).height()+' window: '+$(window).height() + ' scroll: ' +$(document).scrollTop());
		if (!$('img#back_to_top').length)
			$('body').append('<img id="back_to_top" src="/images/s.gif" alt="NAHORU" width="35" height="32">');
		var arrow	= $('img#back_to_top'),
			left	= $(document).width() / 2.0;
		// if ($(window).width() <= 768)
		// 	left	-= 45;
		arrow.css({left: left+'px'});
		if ($(document).height() > $(window).height() && $(document).scrollTop() > $(window).height()/2.0)
			arrow.show();
		else if ($(document).scrollTop() < $(window).height()/2.0)
			arrow.hide();
	},

	owl: function(){
		// console.log('owl ready');
		$('.owl_demo').owlCarousel({ 
			items:				parseInt($('.owl_demo').data('items')) || 6,
			autoplay:			$('.owl_demo').data('interval') ? true : false, //Set AutoPlay to 4 seconds
			autoplaySpeed:		parseInt($('.owl_demo').data('interval')),
			loop:				true,
			nav:				$('.owl_demo').data('nav') || false,
			navText:			['',''],
			autoplayHoverPause:	true,
			dots:				false,
			responsiveClass:true,
			responsive:{
				0:{
					items:	3,
					nav:	$('.owl_demo').data('nav') || false,
				},
				600:{
					items:	4,
					nav:	$('.owl_demo').data('nav') || false,
				},
				800:{
					items:	6,
					nav:	$('.owl_demo').data('nav') || false,
				},
				1200:{
					items:	parseInt($('.owl_demo').data('items')) || 6,
					nav:	$('.owl_demo').data('nav') || false,
					loop:	true
				}
			}
		});
	},

	magnific: function(){
		$('.popup_image').magnificPopup({type: 'image'});
		$('.popup_text').magnificPopup({type: 'iframe'});
		$('.popup_video').magnificPopup({
			type: 'iframe',
			disableOn: 700,
			mainClass: 'mfp-fade',
			removalDelay: 160,
			preloader: false,
			fixedContentPos: false
		});
	},
	
	initGmap:	function(selector){
		if ($(selector).length > 0)
		{
			var dsq = document.createElement('script'); dsq.type = 'text/javascript'; dsq.async = true;
			dsq.src = 'http://maps.google.com/maps/api/js?sensor=false&callback=initGmap';
			(document.getElementsByTagName('head')[0] || document.getElementsByTagName('body')[0]).appendChild(dsq);
		}
	},

	initOwl:	function(selector){
		if ($(selector).length > 0)
		{
			var dsq = document.createElement('script'); dsq.type = 'text/javascript'; dsq.async = true;
			dsq.src = 'js/owl.carousel/owl.carousel.min.js';
			(document.getElementsByTagName('head')[0] || document.getElementsByTagName('body')[0]).appendChild(dsq);
			dsq.onload=function(){hju.loadCss({href:'js/owl.carousel/assets/owl.carousel.min.css'}); hju.owl()};
			dsq.onreadystatechange=function(){if(dsq.readyState=='loaded'){hju.loadCss({href:'js/owl.carousel/assets/owl.carousel.min.css'}); hju.owl();}};
		}
	},
	
	initMagnific:	function(selector){
		if ($(selector).length > 0)
		{

			var dsq = document.createElement('script'); dsq.type = 'text/javascript'; dsq.async = true;
			dsq.src = 'js/magnific.popup.min.js';
			(document.getElementsByTagName('head')[0] || document.getElementsByTagName('body')[0]).appendChild(dsq);
			// dsq.onload=hju.magnific;
			dsq.onload=function(){hju.loadCss({href:'css/magnific-popup.min.css'}); hju.magnific();};
			dsq.onreadystatechange=function(){if(dsq.readyState=='loaded'){hju.loadCss({href:'css/magnific-popup.min.css'});hju.magnific();}};
		}		
	},

	loadCss:	function(config){
		// console.log(config.href);
		var cb = function() {
			var l = document.createElement('link'); l.rel = 'stylesheet';
			l.href = config.href;
			(document.getElementsByTagName('head')[0] || document.getElementsByTagName('body')[0]).appendChild(l);
			// var h = document.getElementsByTagName('head')[0]; h.parentNode.insertBefore(l, h);
		};
		var raf = requestAnimationFrame || mozRequestAnimationFrame ||
			webkitRequestAnimationFrame || msRequestAnimationFrame;
		if (raf) raf(cb);
		else window.addEventListener('load', cb);
	},

	init:	function () {
		this.mobileNavi();
		// lightbox
		this.lightbox();
		this.initOwl('.owl_demo');
		this.initMagnific('.popup_image, .popup_text, .popup_video');
		this.initGmap('div.gmap');
	}
};
$(document).ready(function(){hju.init();});