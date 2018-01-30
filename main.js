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

    // initialing particles
    for(var i = 0; i < numParticles; i++) {
        particles.push(particle.create(0, 0, Math.random()*4 +1, Math.random() * Math.PI *2, 0, 1));
    }

    var params = InputHandle(canvas, particles, paintcontext).params;


    //clear paint canvas
    paintcontext.clearRect(-width / 2, -height / 2, width, height);

    update();

    // compute star physics and stuff
    function update(){
        context.clearRect(-width / 2, -height / 2, width, height);


        for (var i = 0; i < numParticles; i++) {
            var p = particles[i];

            if(params.applyForce){
                var dx = params.mousex-p.x,
                    dy = params.mousey-p.y,
                    length = Math.sqrt(dx*dx + dy*dy);
                    dx /= length;
                    dy /= length;

                // force of fixed intensity on mouse-position direction
                p.applyForce(0.25*dx, 0.25*dy);
            }

            if(params.rotateVelocity)
            {
                p.rotate(params.turnRate);
            }
            if(params.increaseVelocity)
            {
                var per = increaseFactor; // linear interpolation
                p.xOld = (1-per)*p.x + per*p.xOld;
                p.yOld = (1-per)*p.y + per*p.yOld;
            }
            if(params.decreaseVelocity)
            {
                var per = decreaseFactor; // linear interpolation
                p.xOld = (1-per)*p.x + per*p.xOld;
                p.yOld = (1-per)*p.y + per*p.yOld;
            }

            p.update(canvas, params.shouldBounce);

            if(params.paint){
                p.paint(paintcontext);
            }

            p.render(context);

        };

        requestAnimationFrame(update);

    }
};