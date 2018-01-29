window.onload = function(){
	var canvas = document.getElementById("canvas"),
		context = canvas.getContext("2d"),
		paintcanvas = document.getElementById("paintcanvas"),
		paintcontext = canvas.getContext("2d"),
		width = canvas.width = window.innerWidth,
		height = canvas.height = window.innerHeight;
		particles = [],
		numParticles = 500;

	for(var i = 0; i < numParticles; i++) {
		particles.push(particle.create(width/2, height/2, Math.random()*4 +1, Math.random() * Math.PI *2, 0, width, height ));
	}

	var mousex = 0;
	var mousey = 0;
	var applyForce = false;

	document.addEventListener("mousedown", function(){
	    applyForce = true;
	    mousex = event.clientX;
		mousey = event.clientY;
	});
	document.addEventListener("mouseup", function(){
	    applyForce = false;
	});

	document.body.addEventListener("mousemove", function(event) {
		mousex = event.clientX;
		mousey = event.clientY;
	} );

	update();

	function update(){
		context.fillStyle = "#000000"
		context.fillRect(0, 0, width, height);


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
			p.update();
			p.render();
		};

		requestAnimationFrame(update);

	}
	// context.fillRect(0, 0, width, height);

	// for (var i = 0; i < 100; i++) {
		// context.beginPath();
		// context.moveTo(Math.random()*width, Math.random()*height);
		// context.lineTo(Math.random()*width, Math.random()*height);
		// context.lineTo(Math.random()*width, Math.random()*height);
		// context.lineTo(Math.random()*width, Math.random()*height);
		// context.lineTo(Math.random()*width, Math.random()*height);
		// context.stroke();
	// };
};