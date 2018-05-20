var InputHandle = (function (canvas, paintcontext) {

    var obj = {};

    var shouldHandleKeyDown = true;

    obj.params = {
        mouse : {
            x: canvas.width/2,
            y: canvas.height/2,
            lb: false,
            mb: false,
            rb: false,
            lbTrig: false,
            mbTrig: false,
            rbTrig: false,
            wheelDy: 0,  // for now only vertical dimension.
            lbTriggered: function(){
                var result = this.lbTrig;
                this.lbTrig = false;
                return result;
            },
            mbTriggered: function(){
                var result = this.mbTrig;
                this.mbTrig = false;
                return result;
            },
            rbTriggered: function(){
                var result = this.rbTrig;
                this.rbTrig = false;
                return result;
            },
            wheelTriggered: function(){
                var result = this.wheelDy;
                this.wheelDy = 0;
                return result;
            }
        },
        keyboard : {
            keys : [],
            keyPressed : function(key) {
                if(typeof this.keys[key] !== 'undefined')
                    return this.keys[key];
            },
            keyTriggered: function(key) {
                keyTrig = key + "T";
                if(typeof this.keys[keyTrig] !== 'undefined' && this.keys[keyTrig] === true)
                {
                    this.keys[keyTrig] = false;
                    return true;
                }
                return false;
            }
        }
    };

    // events
    document.addEventListener("mousedown", function(event){
        if(event.button == 0){
            obj.params.mouse.x = event.clientX - canvas.width/2;
            obj.params.mouse.y = event.clientY - canvas.height/2;
            obj.params.mouse.lb = true;
            obj.params.mouse.lbTrig = true;
        }
        if(event.button == 1){
            paintcontext.clearRect(-canvas.width / 2, -canvas.height / 2, canvas.width, canvas.height);
            obj.params.mouse.mb = true;
            obj.params.mouse.mbTrig = true;
        }
        if(event.button == 2){
            obj.params.mouse.rb = true;
            obj.params.mouse.rbTrig = true;
        }
    });
    document.addEventListener("mouseup", function(event){
        if(event.button == 0){
            obj.params.mouse.lb = false;
        }
        if(event.button == 1){
            obj.params.mouse.mb = true;
        }
        if(event.button == 2){
            obj.params.mouse.rb = false;
        }
    });

    document.body.addEventListener("mousemove", function(event) {
        obj.params.mouse.x = event.clientX - canvas.width/2;
        obj.params.mouse.y = event.clientY - canvas.height/2;
    });

    document.body.addEventListener("wheel", function(event) {
        obj.params.mouse.x = event.clientX - canvas.width/2;
        obj.params.mouse.y = event.clientY - canvas.height/2;
        obj.params.mouse.wheelDy = event.deltaY;
    });

    // since keydown keeps firing, had to use boolean to fire once.
    document.body.addEventListener("keydown", function(event) {
        if(!shouldHandleKeyDown) return;

        obj.params.keyboard.keys[event.key] = true;
        var trig = event.key + "T";
        obj.params.keyboard.keys[trig] = true;

        shouldHandleKeyDown = false;
    } );

    document.body.addEventListener("keyup", function(event) {
        shouldHandleKeyDown  = true;
        obj.params.keyboard.keys[event.key] = false;
    } );

    // disables context menu
    document.oncontextmenu = function(){
        return false;
    }

    return obj;
});