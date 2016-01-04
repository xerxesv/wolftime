var helpers = {
  getBounds: function ($element) {
    var bounds = $element.offset();
    bounds.right = bounds.left + $element.width();
    bounds.bottom = bounds.top + $element.height();
    return bounds;
  },

  inBounds: function (coords, jQueryOrArray) {
    if (Array.isArray(jQueryOrArray)) {
      bounds = {
        left: jQueryOrArray[0],
        right: jQueryOrArray[0] + jQueryOrArray[2],
        top: jQueryOrArray[1],
        bottom: jQueryOrArray[1] + jQueryOrArray[3]
      };
    } else {
      var bounds = this.getBounds(jQueryOrArray);
    }
    // console.log('model x,y: ', coords.x, ',', coords.y );
    // console.log('region left,right', bounds.left, ',', bounds.right);        
    // console.log('region top,bottom', bounds.top, ',', bounds.bottom);

    return coords.x > bounds.left && coords.x < bounds.right && coords.y > bounds.top && coords.y < bounds.bottom;
  }
  
};