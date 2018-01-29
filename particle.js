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

    create: function (x ,y ,speed, direction, grav){
        var obj = Object.create(this);
        obj.x =  x;
        obj.y =  y;
        obj.xOld =  x - Math.cos(direction)*speed;
        obj.yOld =  y - Math.sin(direction)*speed;
        obj.gravity =  grav || 0;
        return obj;
    },

    applyForce: function(fx, fy){
        this.fx = fx;
        this.fy = fy;
    },

    update: function(canvas){
        var vx = (this.x - this.xOld)*this.friction,
            vy = (this.y - this.yOld)*this.friction;

        this.xOld = this.x;
        this.yOld = this.y;

        this.x += vx ;
        this.y += vy ;
        this.y += this.gravity;
        this.x += this.fx;
        this.y += this.fy;

        this.fx = 0;
        this.fy = 0;


        if(this.x > canvas.width/2){
            this.x = canvas.width/2;
            this.xOld = this.x + vx*this.bounce;
        }
        else if(this.x < -canvas.width/2){
            this.x = -canvas.width/2;
            this.xOld = this.x + vx*this.bounce;
        }
        if(this.y > canvas.height/2){
            this.y = canvas.height/2;
            this.yOld = this.y + vy*this.bounce;
        }
        else if(this.y < -canvas.height/2){
            this.y = -canvas.height/2;
            this.yOld = this.y + vy*this.bounce;
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
    }

};