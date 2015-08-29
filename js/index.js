var getScrollTop = function(){
	return (window.pageYOffset !== undefined) ? window.pageYOffset : (document.documentElement || document.body.parentNode || document.body).scrollTop;
};

var InView = function(el){
	if (!el) return;

	var r = el.getBoundingClientRect();
	var br = document.body.getBoundingClientRect();
	var iH = window.innerHeight;
	var offset = r.bottom - br.top - iH;

	var addClass = function(){
		el.classList.add('in-view');
	};

	var scroll = function(e){
		if (getScrollTop() >= offset){
			requestAnimationFrame(addClass);
			window.removeEventListener('scroll', scroll);
		}
	};

	window.addEventListener('scroll', scroll);
};

var Parallax = function(el){
	if (!el) return;

	var bg = el.querySelector('[data-parallax-bg]');
	var fg = el.querySelector('[data-parallax-fg]');
	var r = bg.getBoundingClientRect();
	var duration = Math.min(Math.round(Math.max(window.innerHeight, r.bottom - r.top) * .6), 500);
	var queued = false;
	var scrollTop;

	var paint = function(){
		queued = false;

		if (r.bottom <= 0) return;

		bg.style.transform = 'translate3d(0, ' + Math.round(scrollTop / 3) + 'px, 0)';
		fg.style.transform = 'translate3d(0, ' + Math.round(scrollTop / 2) + 'px, 0)';
		fg.style.opacity = (1 / duration * (duration - scrollTop)).toFixed(2);
	};

	window.addEventListener('scroll', function(){
		scrollTop = getScrollTop();
		r = el.getBoundingClientRect();
		if (queued) return;

		requestAnimationFrame(paint);
		queued = true;
	});
};

Array.prototype.forEach.call(document.querySelectorAll('[data-inview]'), function(el){
	InView(el);
});

Parallax(document.querySelector('[data-parallax]'));
