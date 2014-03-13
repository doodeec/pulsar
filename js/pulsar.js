(function () {
    var canvas = document.getElementById('c'),
        context = canvas.getContext('2d'),
        color = { r: 255, g: 255, b: 255 },
        points = [],
        sizeX = 0,
        sizeY = 0;

    //set canvas width/height properties to fill document, and store dimensions
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    sizeX = canvas.width;
    sizeY = canvas.height;

    window.requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame ||
        window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;

    /**
     * pulse point contructor
     * @param x
     * @param y
     * @returns {Point}
     * @constructor
     */
    function Point(x, y) {
        this.x = x;
        this.y = y;
        this.radius = 3;
        this.opacity = 1;

        return this;
    }

    /**
     * draw point into canvas
     */
    Point.prototype.draw = function () {
        // just helper not to write it three times
        var fillColorHelper = 'rgba(' + color.r + ',' + color.g + ',' + color.b + ',';

        var _radgrad = context.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.radius);
        _radgrad.addColorStop(0.81, fillColorHelper + '0)');
        _radgrad.addColorStop(0.9, fillColorHelper + this.opacity + ')');
        _radgrad.addColorStop(0.91, fillColorHelper + this.opacity + ')');
        _radgrad.addColorStop(1, fillColorHelper + '0)');

        context.fillStyle = _radgrad;
        context.beginPath();
        context.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
        context.closePath();
        context.fill();
    };

    /**
     * requestAnimationFrame loop
     */
    function loop() {
        clearCanvas();
        var pointsArray = [],
            j = 0, len = points.length, point;

        for (; j < len, point = points[j]; j++) {
            if (point.opacity > 0.01) {
                point.radius += 8*Math.sqrt(point.opacity);
                point.opacity *= 0.96;
            } else {
                point.radius = 1;
                point.opacity = 1;
            }
            point.draw();
            pointsArray.push(point);
        }

        points = pointsArray;
        requestAnimationFrame(loop);
    }

    /**
     * Clear all inside canvas
     */
    function clearCanvas() {
        context.clearRect(0, 0, sizeX, sizeY);
    }

    // generate point and kickoff animation loop
    points.push(new Point(Math.floor(sizeX/2), Math.floor(sizeY/2)));
    requestAnimationFrame(loop);
})(this);