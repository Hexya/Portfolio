var snow = {

  // le vent. > 0, ça décale vers le droite, < 0 vers la gauche
	wind : -2,
	maxXrange : 100, // La valeur maximale pour laquelle les flocons se déplacent horizontalement
	minXrange : 10, // La valeur minimale pour laquelle les flocons se déplacent horizontalement
	maxSpeed : 2, // La vitesse maximale avec laquelle les flocons descendent
	minSpeed : 1, // La vitesse minimale avec laquelle les flocons descendent
	color : "black", // La couleur des flocons
	char : "*", // Le caractère utilisé pour les flocons, essayez aussi "•"
	maxSize : 20, // La taille maximale du flocon
	minSize : 8, // La taille minimale du flocon

	flakes : [], // le tableau qui contiendra TOUS les flocons
	WIDTH : 0, // La largeur de la fenêtre
	HEIGHT : 0, // La hauteur de la fenêtre

    // La fonction appelée pour créer de la neige !!
    // Elle prend en paramètre le nombre de flocons voulus

	init : function(nb){
		var o = this,
			frag = document.createDocumentFragment();
		o.getSize();



		for(var i = 0; i < nb; i++){
			var flake = {
				x : o.random(o.WIDTH),
				y : - o.maxSize,
				xrange : o.minXrange + o.random(o.maxXrange - o.minXrange),
				yspeed : o.minSpeed + o.random(o.maxSpeed - o.minSpeed, 100),
				life : 0,
				size : o.minSize + o.random(o.maxSize - o.minSize),
				html : document.createElement("span")
			};

			flake.html.style.position = "absolute";
			flake.html.style.top = flake.y + "px";
			flake.html.style.left = flake.x + "px";
			flake.html.style.fontSize = flake.size + "px";
			flake.html.style.color = o.color;
			flake.html.appendChild(document.createTextNode(o.char));

			frag.appendChild(flake.html);
			o.flakes.push(flake);
		}

		document.body.appendChild(frag);
		o.animate();
	},

	animate : function(){
		var o = this;
		for(var i = 0, c = o.flakes.length; i < c; i++){
			var flake = o.flakes[i],
				top = flake.y + flake.yspeed,
				left = flake.x + Math.sin(flake.life) * flake.xrange + o.wind;
			if(top < o.HEIGHT - flake.size - 10 && left < o.WIDTH - flake.size && left > 0){
				flake.html.style.top = top + "px";
				flake.html.style.left = left + "px";
				flake.y = top;
				flake.x += o.wind;
				flake.life+= .01;
			}
			else {
				flake.html.style.top = -o.maxSize + "px";
				flake.x = o.random(o.WIDTH);
				flake.y = -o.maxSize;
				flake.html.style.left = flake.x + "px";
				flake.life = 0;
			}
		}
		setTimeout(function(){
			o.animate();
		},20);
	},

	random : function(range, num){
		var num = num?num:1;
		return Math.floor(Math.random() * (range + 1) * num) / num;
	},

	getSize : function(){
		this.WIDTH = document.body.clientWidth || window.innerWidth;
		this.HEIGHT = document.body.clientHeight || window.innerHeight;
	}

};
