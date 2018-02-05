var particle = {
    x: 0,
    y: 0,
    xOld: 0,
    yOld: 0,
    fx: 0,
    fy: 0,
    mass : 1,
    radius: 3,
    bounce: 0.9,
    friction: 1,
    gravity: 0,

    create: function (x ,y ,speed, direction, grav, mass){
        var obj = Object.create(this);
        obj.x =  x;
        obj.y =  y;
        obj.xOld =  x - Math.cos(direction)*speed;
        obj.yOld =  y - Math.sin(direction)*speed;
        obj.gravity =  grav || 0;
        obj.mass = mass;
        return obj;
    },

    applyForce: function(fx, fy){
        this.fx = fx;
        this.fy = fy;
    },

    update: function(canvas, shouldBounce){
        var xLim0 = -canvas.width/2;
        var xLim1 = -xLim0;
        var yLim0 = -canvas.height/2;
        var yLim1 = -yLim0;

        var vx = (this.x - this.xOld)*this.friction,
            vy = (this.y - this.yOld)*this.friction;

        this.xOld = this.x;
        this.yOld = this.y;

        this.x += vx ;
        this.y += vy ;
        this.y += this.gravity;
        this.x += this.fx/this.mass;
        this.y += this.fy/this.mass;

        this.fx = 0;
        this.fy = 0;

        // Using triangle similarity
        if(shouldBounce){
            var newVx = (this.x - this.xOld)*this.bounce,
                newVy = (this.y - this.yOld)*this.bounce;

            if(this.x > xLim1){
                // this.x = xLim1;
                // this.xOld = this.x + vx*this.bounce;

                var b = ((xLim1-this.xOld)*(this.y-this.yOld))/(this.x-this.xOld);
                var c = (this.y-this.yOld) - b;

                this.x = xLim1 - (this.x-xLim1)*this.bounce;
                this.y = this.yOld + b + c*this.bounce;
                this.xOld = this.x + newVx;
                this.yOld = this.y - newVy;

            }
            else if(this.x < xLim0){
                // this.x = xLim0;
                // this.xOld = this.x + vx*this.bounce;
                var b = ((xLim0-this.xOld)*(this.y-this.yOld))/(this.x-this.xOld);
                var c = (this.y-this.yOld) - b;

                this.x = xLim0 - (this.x-xLim0)*this.bounce;
                this.y = this.yOld + b + c*this.bounce;
                this.xOld = this.x + newVx;
                this.yOld = this.y - newVy;

            }
            if(this.y > yLim1){
                // this.y = yLim1;
                // this.yOld = this.y + vy*this.bounce;
                var b = ((yLim1 - this.yOld)*(this.x-this.xOld))/(this.y-this.yOld);
                var c = (this.x-this.xOld) - b;

                this.y = yLim1 - (this.y-yLim1)*this.bounce;
                this.x = this.xOld + b + c*this.bounce;
                this.xOld = this.x - newVx;
                this.yOld = this.y + newVy;

            }
            else if(this.y < yLim0){
                // this.y = yLim0;
                // this.yOld = this.y + vy*this.bounce;
                var b = ((yLim0 - this.yOld)*(this.x-this.xOld))/(this.y-this.yOld);
                var c = (this.x-this.xOld) - b;

                this.y = yLim0 - (this.y-yLim0)*this.bounce;
                this.x = this.xOld + b + c*this.bounce;
                this.xOld = this.x - newVx;
                this.yOld = this.y + newVy;
            }
        }
    },

    render: function(context){
        context.beginPath();
        context.fillStyle = 'hsla('+ (Math.atan2(this.x-this.xOld, this.y-this.yOld))*360/(Math.PI * 2) +',100%,50%,1)';
        context.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        context.fill();
    },

    paint: function(context){
        context.lineWidth = this.radius;
        context.beginPath();
        context.moveTo(this.xOld, this.yOld);
        context.lineTo(this.x, this.y);
        context.strokeStyle = 'hsla('+ (Math.atan2(this.x-this.xOld, this.y-this.yOld))*360/(Math.PI * 2) +',100%,50%,1)';
        context.stroke();
    },

    reset: function(mousex , mousey){
        this.x = mousex;
        this.y = mousey;
        this.xOld = mousex + (Math.random()-0.5)*5;
        this.yOld = mousey + (Math.random()-0.5)*5;
    },

    rotate: function(degrees){
        var rad = (degrees/180) * Math.PI;

        var vx = this.x - this.xOld;
        var vy = this.y - this.yOld;
        var cos_rad = Math.cos(rad);
        var sin_rad = Math.sin(rad);

        var newvx = vx*cos_rad - vy*sin_rad;
        var newvy = vx*sin_rad + vy*cos_rad;

        this.xOld = this.x - newvx;
        this.yOld = this.y - newvy;
    }

};