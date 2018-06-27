function crash(id) {
    var div = document.getElementById(id);
    var scale = 1;

    this.moveTo = function(x, y) {
        div.style.top = y - div.clientHeight/2;
        div.style.left = x - div.clientWidth/2;
    }

    this.scaleTo = function(newScale) {
        scale = newScale;
        div.style.webkitTransform = 'scale(' + scale + ',' + scale + ')';
    }

    this.width = function() {
        return div.clientWidth * scale;
    }

    this.height = function() {
        return div.clientHeight * scale;
    }
}