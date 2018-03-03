var chaosGame = {
    pointX: 0,
    pointY: 0,
    radius: 1,
    verticesX:[],
    verticesY:[],
    ruleDistance:0.4,

    create: function (x ,y, radius){
        var obj = Object.create(this);
        obj.x =  x;
        obj.y =  y;
        obj.verticesX = [];
        obj.verticesY = [];
        obj.radius =  radius || 0;
        return obj;
    },

    addVertice: function(px, py){
        this.verticesX.push(px);
        this.verticesY.push(py);
    },

    setInitialPoint: function(px, py){
        this.pointX = px;
        this.pointY = py;
    },

    iterate: function(context, nTimes){
        var nRules = this.verticesX.length;

        this.renderVertices(context);

        for (var i = 0; i < nTimes; i++) {
            var currentRule = Math.floor(Math.random()*nRules);
            this.applyRule(currentRule);
            this.renderPoint(context);
        }
    },

    renderPoint: function(context){
        context.beginPath();
        // context.fillStyle = 'hsla(200,100%,50%,1)';
        context.fillStyle = 'hsla('+ (Math.atan2(this.pointX, this.pointY))*360/(Math.PI * 2) +',100%,50%,1)';
        context.arc(this.pointX, this.pointY, this.radius, 0, Math.PI * 2, false);
        context.fill();
    },

    renderVertices: function(context){
        for(var i = 0; i < this.verticesX.length; i++)
        {
            context.beginPath();
            context.fillStyle = 'hsla(100,100%,50%,1)';
            context.arc(this.verticesX[i], this.verticesY[i], this.radius, 0, Math.PI * 2, false);
            context.fill();
        }
    },
    //
    applyRule: function(rule){
        // linear interpolation
        this.pointX = this.ruleDistance*this.pointX + (1 - this.ruleDistance)*this.verticesX[rule];
        this.pointY = this.ruleDistance*this.pointY + (1 - this.ruleDistance)*this.verticesY[rule];
    }

};

