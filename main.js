window.onload = function(){

    var canvas = document.getElementById("canvas"),
        paintcanvas = document.getElementById("paintcanvas"),
        context = canvas.getContext("2d"),
        paintcontext = paintcanvas.getContext("2d"),
        width = canvas.width = paintcanvas.width = window.innerWidth,
        height = canvas.height = paintcanvas.height = window.innerHeight;

    context.translate(width / 2, height / 2);
    paintcontext.translate(width / 2, height / 2);

    var mode = 0;

    var params = InputHandle(canvas, paintcontext).params;


    /*
    *MODES SETUP
    */
    // mode 0
    var spt = starPaint.create(1000);


    // mode 1
    var game = chaosGame.create(0, 0, 1);


    // mode 2
    rangeX = [3.610952469428775, 3.6109524701258087];
    // rangeX = [3,4];
    rangeY = [.3,.5];

    iterationWindowX = [rangeX[0],rangeX[1]];

    canvasLimit = [width, height];
    var bd = bifurcationDiagram.create(
        rangeX,  // x interval visible in screen width
        rangeY,  // y interval visible in screen height
        canvasLimit, // canvas limits
        100);   // max iterations per row.

    //clear paint canvas
    paintcontext.clearRect(-width / 2, -height / 2, width, height);

    setup();
    update();

    // runs once
    function setup(){
        switch(mode){
            case 2:
            {
                // translantes canvases to left bottom to facilitate
                context.translate(- width/2, height/2);
                paintcontext.translate(- width/2, height/2);
                context.scale(1, -1);
                paintcontext.scale(1, -1);

                bd.drawAxis(paintcontext);
            }
        }
    }


    // runs every frame
    function update(){
        context.clearRect(-width / 2, -height / 2, width, height);

        // general commands
        if(params.keyboard.keyPressed('Backspace'))
            paintcontext.clearRect(-canvas.width / 2, -canvas.height / 2, canvas.width, canvas.height);

        switch(mode){
            // particle simulation
            case 0:
            {
                spt.shouldAttract(params.mouse.lb, params.mouse.x, params.mouse.y);
                spt.rotateVelocity = params.keyboard.keyPressed('r');
                spt.delirate = params.keyboard.keyPressed('d');
                spt.increaseVelocity = params.keyboard.keyPressed('ArrowUp');
                spt.decreaseVelocity = params.keyboard.keyPressed('ArrowDown');
                if(params.keyboard.keyTriggered('b')){
                     spt.shouldBounce ^= 1;
                }
                spt.paint = params.mouse.rb;
                if(params.keyboard.keyTriggered('x')){
                    spt.reset(params.mouse.x, params.mouse.y);
                }
                spt.run(canvas,context, paintcontext);
            }
            break;

            // chaos game
            case 1:
            {

                game.renderVertices(paintcontext);
                if(params.mouse.lbTriggered()){
                    game.addVertice(params.mouse.x, params.mouse.y);
                    game.renderVertices(paintcontext);
                }
                // if(params.mouse.rbTriggered()){
                //     game.iterate(paintcontext, 1);
                // }
                if(params.mouse.rb){
                    game.iterate(paintcontext, 100);
                }
            }
            break;

            // bifurcation diagram
            case 2:
            {

                paintcontext.clearRect(-width / 2, -height / 2, width*2, height*2);
                bd.drawAxis(paintcontext);

                if(params.mouse.lb)
                {
                    var delta = (rangeX[1]-rangeX[0])/10;
                    if(iterationWindowX[1] + delta <= rangeX[1]){
                        iterationWindowX = [iterationWindowX[0], iterationWindowX[1] + delta];
                    }
                }
                var wheelDY = params.mouse.wheelTriggered();
                if(wheelDY)
                {
                    var currentWidth = rangeX[1] - rangeX[0];
                    var currentWidth = rangeX[1] - rangeX[0];
                    var normalizedX = (params.mouse.x + canvas.width/2)/canvas.width
                    var currentX = normalizedX*currentWidth + rangeX[0];

                    var zoomPercentage = 1.5;


                    if(wheelDY < 0){
                        var targetWidth = currentWidth/zoomPercentage;
                    }
                    else if(wheelDY > 0){
                        var targetWidth = currentWidth*zoomPercentage;
                    }
                    iterationWindowX = [currentX - targetWidth*normalizedX,
                                        currentX - targetWidth*normalizedX + targetWidth];
                    rangeX[0] = iterationWindowX[0];
                    rangeX[1] = iterationWindowX[1];
                    console.log(rangeX)

                }
                bd.runDiagram(paintcontext, iterationWindowX);

            }
            break;

            case 3:
            {
                p = particle.create(0, 0, Math.random()*4 +1, Math.random() * Math.PI *2, 0, 1);
                p.render(context);
            }
            break;

        };

        requestAnimationFrame(update);

    }
};