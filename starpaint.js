 var starPaint =  {
    create: function (numParticles) {
        var obj = Object.create(this);

        obj.particles = [];
        for(var i = 0; i < numParticles; i++) {
            obj.particles.push(particle.create(0, 0, Math.random()*4 +1, Math.random() * Math.PI *2, 0, 1));
        }
        obj.attract = false;
        obj.attractX = 0;
        obj.attractY = 0;
        obj.rotateVelocity  = false;
        obj.turnRate  = 10;
        obj.delirate  = false;
        obj.increaseVelocity  = false;
        obj.increaseFactor  = 1.1;
        obj.decreaseVelocity  = false;
        obj.decreaseFactor  = 0.9;
        obj.shouldBounce  = true;
        obj.paint  = false;

        return obj;
    },

    shouldAttract: function ( attract, attractX, attractY ){
        this.attract = attract;
        this.attractX = attractX;
        this.attractY = attractY;
    },

    reset: function(locX, locY){
        for(var i = 0; i < this.particles.length; i++) {
            this.particles[i].reset(locX, locY);
        }
    },

    run: function(canvas, context, paintcontext){
        for (var i = 0; i < this.particles.length; i++) {
            var p = this.particles[i];

            // apply force
            if(this.attract){
                var dx = this.attractX-p.x,
                    dy = this.attractY-p.y,
                    length = Math.sqrt(dx*dx + dy*dy);
                if(length > 10)
                {
                    dx = dx/length || 0 ;
                    dy = dy/length || 0 ;

                    // force of fixed intensity on mouse-position direction
                    p.applyForce(0.25*dx, 0.25*dy);
                }
            }

            if(this.rotateVelocity)
            {
                p.rotate(this.turnRate);
            }
            if(this.delirate)
            {
                p.delirate(this.turnRate);
            }
            if(this.increaseVelocity)
            {
                var per = this.increaseFactor; // linear interpolation
                p.xOld = (1-per)*p.x + per*p.xOld;
                p.yOld = (1-per)*p.y + per*p.yOld;
            }
            if(this.decreaseVelocity)
            {
                var per = this.decreaseFactor; // linear interpolation
                p.xOld = (1-per)*p.x + per*p.xOld;
                p.yOld = (1-per)*p.y + per*p.yOld;
            }

            p.update(canvas, this.shouldBounce);

            if(this.paint){
                p.paint(paintcontext);
            }

            p.render(context);
        }
    }
}