var InputHandle = (function (canvas, particles, paintcontext) {

    var obj = {};

    obj.params = {
        mouseLBDown : false,
        mouseMBDown : false,
        mouseRBDown : false,
        mouseLBTrigger : false,
        mouseMBTrigger : false,
        mouseRBTrigger : false,
        mousex : canvas.width/2,
        mousey : canvas.height/2,

        applyForce : false,
        paint : false,
        shouldBounce : true,
        rotateVelocity : false,
        delirate : false,
        blur: false,
        turnRate : 10,
        increaseVelocity : false,
        increaseFactor : 1.1,
        decreaseVelocity : false,
        decreaseFactor : 0.9,
        mouseLBTriggered: function  (){
            var result = this.mouseLBTrigger;
            this.mouseLBTrigger = false;
            return result;
        },
        mouseMBTriggered: function(){
            var result = this.mouseMBTrigger;
            this.mouseMBTrigger = false;
            return result;
        },
        mouseRBTriggered: function(){
            var result = this.mouseRBTrigger;
            this.mouseRBTrigger = false;
            return result;
        }
    };

    // events
    document.addEventListener("mousedown", function(event){
        if(event.button == 0){
            obj.params.applyForce = true;
            obj.params.mousex = event.clientX - canvas.width/2;
            obj.params.mousey = event.clientY - canvas.height/2;
            obj.params.mouseLBDown = true;
            obj.params.mouseLBTrigger = true;
        }
        if(event.button == 1){
            paintcontext.clearRect(-canvas.width / 2, -canvas.height / 2, canvas.width, canvas.height);
            obj.params.mouseMBDown = true;
            obj.params.mouseMBTrigger = true;
        }
        if(event.button == 2){
            obj.params.paint = true;
            obj.params.mouseRBDown = true;
            obj.params.mouseRBTrigger = true;
        }
    });
    document.addEventListener("mouseup", function(event){
        if(event.button == 0){
            obj.params.applyForce = false;
            obj.params.mouseLBDown = false;
        }
        if(event.button == 1){
            obj.params.mouseMBDown = true;
        }
        if(event.button == 2){
            obj.params.paint = false;
            obj.params.mouseRBDown = false;
        }
    });

    document.body.addEventListener("mousemove", function(event) {
        obj.params.mousex = event.clientX - canvas.width/2;
        obj.params.mousey = event.clientY - canvas.height/2;
    } );

    document.body.addEventListener("keydown", function(event) {
        switch(event.key){
            case 'Backspace': //backspace
            {
                paintcontext.clearRect(-canvas.width / 2, -canvas.height / 2, canvas.width, canvas.height);
            }
            break;
            case 'b':
            {
                obj.params.shouldBounce ^= 1;
            }
            break;
            case 'x':
            {
                for(var i = 0; i < particles.length; i++) {
                    particles[i].reset(obj.params.mousex, obj.params.mousey);
                }
            }
            break;
            case 'r':
            {
                obj.params.rotateVelocity = true;
            }
            break;
            case 'd':
            {
                obj.params.delirate = true;
            }
            break;
            case 'f':
            {
                obj.params.blur = true;
            }
            break;
            case 'ArrowUp':
            {
                obj.params.increaseVelocity = true;
            }
            break;
            case 'ArrowDown':
            {
                obj.params.decreaseVelocity = true;
            }
            break;

        }
    } );

    document.body.addEventListener("keyup", function(event) {
        switch(event.key){
            case 'r':
            {
                obj.params.rotateVelocity = false;
            }
            break;
            case 'd':
            {
                obj.params.delirate = false;
            }
            break;
            case 'f':
            {
                obj.params.blur = false;
            }
            break;
            case 'ArrowUp':
            {
                obj.params.increaseVelocity = false;
            }
            break;
            case 'ArrowDown':
            {
                obj.params.decreaseVelocity = false;
            }
            break;
        }
    } );

    // disables context menu
    document.oncontextmenu = function(){
        return false;
    }

    return obj;
});