var bifurcationDiagram = {
    rangeX: [0, 5],  // values limiting X axis in the screen
    rangeY: [0, 5],  // same thing
    originLocation: [0, 0],  // where the plot origin will be in the canvas coordinate systen
    canvasLimits: [0, 0],

    maxIterations: 10,
    initialPopulation: 0.5,


    create: function (rangeX, rangeY, canvasLimits, maxIterations){
        var obj = Object.create(this);
        obj.rangeX = rangeX;
        obj.rangeY = rangeY;
        obj.canvasLimits = canvasLimits;
        obj.maxIterations = maxIterations;
        return obj;
    },

    drawAxis: function(context)
    {
        var zero = [0,0];
        var xAxisBegin = [rangeX[0],0];
        var xAxisEnd = [rangeX[1],0];
        var yAxisBegin = [0, rangeY[0]];
        var yAxisEnd = [0, rangeY[1]];


        this.renderLine(context, xAxisBegin, xAxisEnd, 'rgba(255,255,255,1)');
        this.renderLine(context, yAxisBegin, yAxisEnd, 'rgba(255,255,255,1)');
    },

    // Paint function in that range
    runDiagram: function(context, itRangeX){

        var itrX = this.rangeX;
        // var itrX = itRangeX;

        var width = this.canvasLimits[0];
        var height = this.canvasLimits[1];

        // translated to canvas coordinates
        var itrXPixels = [Math.floor((itRangeX[0] - this.rangeX[0])*width/(this.rangeX[1] - this.rangeX[0])),
                         Math.floor((itRangeX[1] - this.rangeX[0])*width/(this.rangeX[1] - this.rangeX[0]))];

        for (var x = itrXPixels[0]; x < itrXPixels[1]; x++) {
            pixelToPointX = x*(this.rangeX[1] - this.rangeX[0])/(this.canvasLimits[0]-1) + this.rangeX[0];

            var x1 = this.initialPopulation;

            // iterate equation with growth ration fixed
            for(var it = 0; it < this.maxIterations; it++){

                x1 = this.iterate(x1, pixelToPointX);

                // if(it > this.maxIterations*3/4)
                {
                    var point = [pixelToPointX, x1];
                    this.renderPoint(context, point, 'hsla(' + x*100/(itrXPixels[1]-itrXPixels[0]) +
                                                           ',100%,50%,' +
                                                           it/this.maxIterations +
                                                           ')');
                }
            }

            // console.log("Pixel: " + i + " Coord: " + pixelToPointX);
        }
    },

    iterate: function(xn, ratio){
        return (ratio*xn*(1-xn));
    },

    renderPoint: function(context, p, fillStyle){

        var width = this.canvasLimits[0];
        var height = this.canvasLimits[1];

        transformedP = [(p[0] - this.rangeX[0])*width/(this.rangeX[1] - this.rangeX[0]),
                     (p[1] - this.rangeY[0])*height/(this.rangeY[1] - this.rangeY[0])];

        context.beginPath();
        context.fillStyle = fillStyle;
        context.fillRect(transformedP[0], transformedP[1], 1, 1);
        context.fill();
    },

    // renders line with points in bf diagram coordinates (scaled to fit rangex and rangey)
    renderLine: function(context, p1, p2, strokeStyle){

        var width = this.canvasLimits[0];
        var height = this.canvasLimits[1];

        transformedP1 = [(p1[0] - this.rangeX[0])*width/(this.rangeX[1] - this.rangeX[0]), (p1[1] - this.rangeY[0])*height/(this.rangeY[1] - this.rangeY[0])];
        transformedP2 = [(p2[0] - this.rangeX[0])*width/(this.rangeX[1] - this.rangeX[0]), (p2[1] - this.rangeY[0])*height/(this.rangeY[1] - this.rangeY[0])];

        context.beginPath();
        context.strokeStyle = strokeStyle;
        context.moveTo(transformedP1[0],transformedP1[1]);
        context.lineTo(transformedP2[0],transformedP2[1]);
        context.stroke();

    }
    // //
    // applyRule: function(rule){
    //     // linear interpolation
    //     this.pointX = this.ruleDistance*this.pointX + (1 - this.ruleDistance)*this.verticesX[rule];
    //     this.pointY = this.ruleDistance*this.pointY + (1 - this.ruleDistance)*this.verticesY[rule];
    // }

};

