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
    cw: 0,
    ch: 0,

    create: function (x ,y ,speed, direction, grav, canvasWidth, canvasHeight){
        var obj = Object.create(this);
        obj.x =  x;
        obj.y =  y;
        obj.xOld =  x - Math.cos(direction)*speed;
        obj.yOld =  y - Math.sin(direction)*speed;
        obj.gravity =  grav || 0;
        obj.cw = canvasWidth;
        obj.ch = canvasHeight;
        return obj;
    },

    applyForce: function(fx, fy){
        this.fx = fx;
        this.fy = fy;
    },

    update: function(){
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

        if(this.x > this.cw){
            this.x = this.cw;
            this.xOld = this.x + vx*this.bounce;
        }
        else if(this.x < 0){
            this.x = 0;
            this.xOld = this.x + vx*this.bounce;
        }
        if(this.y > this.ch){
            this.y = this.ch;
            this.yOld = this.y + vy*this.bounce;
        }
        else if(this.y < 0){
            this.y = 0;
            this.yOld = this.y + vy*this.bounce;
        }
    },

    render: function(){
        var context = canvas.getContext("2d");
        context.beginPath();
        context.fillStyle = 'hsl('+ (Math.atan2(this.x-this.xOld, this.y-this.yOld))*360/(Math.PI * 2) +',100%,50%)';
        context.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        context.fill();
    },

};