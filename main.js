window.onload = function(){

	var canvas = document.getElementById("canvas"),
		paintcanvas = document.getElementById("paintcanvas"),
		context = canvas.getContext("2d"),
		paintcontext = paintcanvas.getContext("2d"),
		width = canvas.width = paintcanvas.width = window.innerWidth,
		height = canvas.height = paintcanvas.height = window.innerHeight,
		particles = [],
		numParticles = 500;

	context.translate(width / 2, height / 2);
	paintcontext.translate(width / 2, height / 2);

	// initialing particles
	for(var i = 0; i < numParticles; i++) {
		particles.push(particle.create(0, 0, Math.random()*4 +1, Math.random() * Math.PI *2, 0));
	}

	//global vars
	var mousex = width/2;
	var mousey = height/2;
	var applyForce = false;
	var paint = false;

	// events
	document.addEventListener("mousedown", function(event){
	    if(event.button == 0){
		    applyForce = true;
		    mousex = event.clientX - width/2;
			mousey = event.clientY - height/2;
	    }
	    if(event.button == 2){
	    	paint = true;
	    }
	});
	document.addEventListener("mouseup", function(event){
	    if(event.button == 0){
		    applyForce = false;
	    }
	    if(event.button == 2){
	    	paint = false;
	    }
	});

	document.body.addEventListener("mousemove", function(event) {
		mousex = event.clientX - width/2;
		mousey = event.clientY - height/2;
	} );

	// disables context menu
	document.oncontextmenu = function(){
		return false;
	}

	// run once stuff
	// paintcontext.fillStyle = "hsla(0%,0%,0%,0)"
	paintcontext.clearRect(-width / 2, -height / 2, width, height);

	// context.globalCompositeOperation="source-over";
	// paintcontext.globalCompositeOperation="destination-over";

	update();

	function update(){
		context.clearRect(-width / 2, -height / 2, width, height);


		for (var i = 0; i < numParticles; i++) {
			var p = particles[i];

			if(applyForce){
				var dx = mousex-p.x,
					dy = mousey-p.y,
					length = Math.sqrt(dx*dx + dy*dy);
					dx /= length;
					dy /= length;

				p.applyForce(0.25*dx, 0.25*dy);
			}
			p.update(canvas);

			if(paint){
				p.paint(paintcontext);
			}

			p.render(context);

		};

		requestAnimationFrame(update);

	}
};