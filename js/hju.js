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
		$('.owl_demo').removeClass('nos');
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
				},
				600:{
					items:	4,
				},
				800:{
					items:	6,
				},
				1200:{
					items:	parseInt($('.owl_demo').data('items')) || 6,
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

	responsiveVideo:	function(){
		// Find all YouTube / Vimeo videos
		var videos = $("iframe[src*='//player.vimeo.com'], iframe[src*='//www.youtube.com']");

		// Figure out and save aspect ratio for each video
		videos.each(function() {

		  $(this).data('aspectRatio', this.height / this.width)
			// and remove the hard coded width/height
			.removeAttr('height')
			.removeAttr('width');
		});

		// When the window is resized
		$(window).resize(function() {
			// Resize all videos according to their own aspect ratio
			videos.each(function() {
				var video	= $(this),
					parent	= video.parent();
				video.width(parent.width()).height(parent.width() * video.data('aspectRatio'));
			});
		// Kick off one resize to fix all videos on page load
		}).resize();
	},

	// handle some stuff on horse's detail page
	horseDetail:	function(){
		var	detail	= $('.detail_content');
		
		detail.init	= function(){
			detail.prevNext();
			detail.kejkle();
		};

		// create prev & next links in the top of the detail content
		detail.prevNext	= function(){
			var	prev	= detail.data('prev') || false,
				next	= detail.data('next') || false;

			if (prev)
				detail.prepend('<a class="detail__navi prev" href="'+prev+'">Previous</a>');
			if (next)
				detail.prepend('<a class="detail__navi next" href="'+next+'">Next</a>');
		};

		// inserts pedigree table & video into horse detail page
		detail.kejkle	= function(){
			// find pedigree and video buttons
			var	container	= $('.detail_content'),
				pedigree	= $('.detail__item .popup_text') || false,
				video		= $('.detail__item .popup_video') || false;

			function youtubeParser(url)
			{
				var match = url.match(/(youtu(?:\.be|be\.com)\/(?:.*v(?:\/|=)|(?:.*\/)?)([\w'-]+))/i);
				// console.log(match);
				if (match && match[2].length==11){
					return match[2];
				}
				return false;
			}
			function vimeoParser(url)
			{
				var match = url.match(/vimeo.com\/([^\^]+)/i);
				// console.log(match);
				if (match && match[1].length > 0)
					return match[1];
				
				return false;	
			}

			if (pedigree)
			{
				// insert pedigree iframe into content
				container.append('<div class="detail__text"><iframe class="pedigree" src="'+pedigree.attr('href')+'" frameborder="0"></iframe></div>');
				var iframe	= $('iframe.pedigree');
				iframe.load(function(){ iframe.height(iframe.contents().find('body').height()); });
				
				// $('iframe.pedigree').height($('iframe.pedigree').contents().find('body').height());
				// hide pedigree button
				pedigree.addClass('nos');
			}
			if (video)
			{
				// vimeo video
				if (video.is('[href*="vimeo.com/"]'))
				{
					var id	= vimeoParser(video.attr('href'));
					if (id)
					{
						container.append('<div class="detail__text"><iframe src="https://player.vimeo.com/video/'+id+'?title=0&byline=0&portrait=0" width="500" height="281" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe></div>');
					}
				}
				// youtube video
				else if (video.is('[href*="youtube.com/watch"]'))
				{
					var id	= youtubeParser(video.attr('href'));
					if (id)
						container.append('<div class="detail__text"><iframe width="960" height="720" src="https://www.youtube.com/embed/'+id+'" frameborder="0" allowfullscreen></iframe></div>');
				}
				// hide video button
				video.addClass('nos');
				// make video responsive
				hju.responsiveVideo();
			}
		};

		detail.init();
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
			dsq.src = '/js/owl.carousel/owl.carousel.min.js';
			(document.getElementsByTagName('head')[0] || document.getElementsByTagName('body')[0]).appendChild(dsq);
			dsq.onload=function(){hju.loadCss({href:'/js/owl.carousel/assets/owl.carousel.min.css'}); hju.owl()};
			dsq.onreadystatechange=function(){if(dsq.readyState=='loaded'){hju.loadCss({href:'/js/owl.carousel/assets/owl.carousel.min.css'}); hju.owl();}};
		}
	},
	
	initMagnific:	function(selector){
		if ($(selector).length > 0)
		{

			var dsq = document.createElement('script'); dsq.type = 'text/javascript'; dsq.async = true;
			dsq.src = '/js/magnific.popup.min.js';
			(document.getElementsByTagName('head')[0] || document.getElementsByTagName('body')[0]).appendChild(dsq);
			// dsq.onload=hju.magnific;
			dsq.onload=function(){hju.loadCss({href:'/css/magnific-popup.min.css'}); hju.magnific();};
			dsq.onreadystatechange=function(){if(dsq.readyState=='loaded'){hju.loadCss({href:'/css/magnific-popup.min.css'});hju.magnific();}};
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
		this.responsiveVideo();
		this.horseDetail();
	}
};
$(document).ready(function(){hju.init();});