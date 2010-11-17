(function ($) {
	$.fn.imageready = function (options) {    
	  if (typeof options === 'function') {
	    options = {load: options, loaded: options};
	  }
	  options = $.extend({
	    startload: $.noop,
	    load: $.noop, 
	    loaded: $.noop,
	    forceLoad: false
	  }, options);
	  
	  function bindToLoad(element) {
	    options.startload();
	    $(element).bind('load', function () {
         options.load();
         $(this).unbind('load', options.load);
       });
	  }
	  
	  this.each(function () {
      var $this = $(this);
	    if ( this.nodeType === 1 && this.tagName.toLowerCase() === 'img' && this.src !== '' ) {
  			if (options.forceLoad) {
  			  var src = $this.attr('src');
  			  $this.attr('src', '');
  			  bindToLoad(this);
          $this.attr('src', src);
  			} else if ( this.complete || this.readyState === 4 ) {
  			  options.loaded();
  			} else {
  			  bindToLoad(this);
  			}
  		}
	  });
	  
	  return this;
  };
}(jQuery));






