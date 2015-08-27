var getScrollTop = function(){
	return (window.pageYOffset !== undefined) ? window.pageYOffset : (document.documentElement || document.body.parentNode || document.body).scrollTop;
};

var Parallax = function(el){
	if (!el) return;

	var bg = el.querySelector('[data-parallax-bg]');
	var fg = el.querySelector('[data-parallax-fg]');
	var queued = false;
	var scrollTop;
	var r;

	var paint = function(){
		queued = false;

		if (r.bottom <= 0) return;

		bg.style.transform = 'translate3d(0, ' + Math.round(scrollTop / 3) + 'px, 0)';
		fg.style.transform = 'translate3d(0, ' + Math.round(scrollTop / 2) + 'px, 0)';
		fg.style.opacity = (1 / 500 * (500 - scrollTop)).toFixed(2);
	};

	window.addEventListener('scroll', function(){
		scrollTop = getScrollTop();
		r = el.getBoundingClientRect();
		if (queued) return;

		requestAnimationFrame(paint);
		queued = true;
	});
};

Parallax(document.querySelector('[data-parallax]'));
