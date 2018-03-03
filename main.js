window.onload = function(){

    var canvas = document.getElementById("canvas"),
        paintcanvas = document.getElementById("paintcanvas"),
        context = canvas.getContext("2d"),
        paintcontext = paintcanvas.getContext("2d"),
        width = canvas.width = paintcanvas.width = window.innerWidth,
        height = canvas.height = paintcanvas.height = window.innerHeight,
        particles = [],
        numParticles = 1000;

    context.translate(width / 2, height / 2);
    paintcontext.translate(width / 2, height / 2);

    var mode = 2;

    var params = InputHandle(canvas, particles, paintcontext).params;


    /*
    *MODES SETUP
    */
    // mode 0
    // initialing particles
    for(var i = 0; i < numParticles; i++) {
        particles.push(particle.create(0, 0, Math.random()*4 +1, Math.random() * Math.PI *2, 0, 1));
    }


    // mode 1
    var game = chaosGame.create(0, 0, 1);


    // mode 2
    rangeX = [1,4.00];
    rangeY = [0,1];

    iterationWindowX = [rangeX[0],rangeX[0]];

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

        switch(mode){
            case 0:
            {
                for (var i = 0; i < numParticles; i++) {
                    var p = particles[i];

                    if(params.applyForce){
                        var dx = params.mousex-p.x,
                            dy = params.mousey-p.y,
                            length = Math.sqrt(dx*dx + dy*dy);
                        if(length > 10)
                        {
                            dx = dx/length || 0 ;
                            dy = dy/length || 0 ;

                            // force of fixed intensity on mouse-position direction
                            p.applyForce(0.25*dx, 0.25*dy);
                        }
                    }

                    if(params.rotateVelocity)
                    {
                        p.rotate(params.turnRate);
                    }
                    if(params.delirate)
                    {
                        p.delirate(params.turnRate);
                    }
                    if(params.increaseVelocity)
                    {
                        var per = params.increaseFactor; // linear interpolation
                        p.xOld = (1-per)*p.x + per*p.xOld;
                        p.yOld = (1-per)*p.y + per*p.yOld;
                    }
                    if(params.decreaseVelocity)
                    {
                        var per = params.decreaseFactor; // linear interpolation
                        p.xOld = (1-per)*p.x + per*p.xOld;
                        p.yOld = (1-per)*p.y + per*p.yOld;
                    }

                    p.update(canvas, params.shouldBounce);

                    if(params.paint){
                        p.paint(paintcontext);
                    }

                    p.render(context);
                }
            }
            break;

            case 1:
            {

                game.renderVertices(paintcontext);
                if(params.mouseLBTriggered()){
                    game.addVertice(params.mousex, params.mousey);
                    game.renderVertices(paintcontext);
                }
                // if(params.mouseRBTriggered()){
                //     game.iterate(paintcontext, 1);
                // }
                if(params.mouseRBDown){
                    game.iterate(paintcontext, 100);
                }
            }
            break;

            case 2:
            {

                // bd.drawAxis(paintcontext);

                if(params.mouseLBDown){
                    var delta = (rangeX[1]-rangeX[0])/10;
                    if(iterationWindowX[1] + delta <= rangeX[1]){
                        iterationWindowX = [iterationWindowX[1], iterationWindowX[1] + delta];
                    }
                }

                bd.runDiagram(paintcontext, iterationWindowX);

            }
            break;

        };

        requestAnimationFrame(update);

    }
};