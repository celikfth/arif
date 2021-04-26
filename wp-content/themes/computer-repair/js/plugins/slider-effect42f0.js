/*
 * Network Canvas Effect
 */

// http://paulirish.com/2011/requestanimationframe-for-smart-animating/
// http://my.opera.com/emoller/blog/2011/12/20/requestanimationframe-for-smart-er-animating
// requestAnimationFrame polyfill by Erik Moller. fixes from Paul Irish and Tino Zijdel
// MIT license

"use strict";

(function () {
	var lastTime = 0;
	var vendors = ['ms', 'moz', 'webkit', 'o'];
	for (var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
		window.requestAnimationFrame = window[vendors[x] + 'RequestAnimationFrame'];
		window.cancelAnimationFrame = window[vendors[x] + 'CancelAnimationFrame'] || window[vendors[x] + 'CancelRequestAnimationFrame'];
	}

	if (!window.requestAnimationFrame)
		window.requestAnimationFrame = function (callback, element) {
			var currTime = new Date().getTime();
			var timeToCall = Math.max(0, 16 - (currTime - lastTime));
			var id = window.setTimeout(function () {
					callback(currTime + timeToCall);
				},
				timeToCall);
			lastTime = currTime + timeToCall;
			return id;
		};

	if (!window.cancelAnimationFrame)
		window.cancelAnimationFrame = function (id) {
			clearTimeout(id);
		};
}());
// ends requestAnimationFrame polyfill

function Vector(x, y) {
	this.x = x;
	this.y = y;
	this.add = function () {
		if (arguments.length === 1 && typeof arguments[0] === "object") {
			// should do something for Array.isArray
			this.x += arguments[0].x;
			this.y += arguments[0].y;
		} else if (arguments.length === 2) {
			this.x += arguments[0];
			this.y += arguments[1];
		}
		return this;
	}
	this.sub = function () {
		if (arguments.length === 1 && typeof arguments[0] === "object") {
			this.x -= arguments[0].x;
			this.y -= arguments[0].y;
		} else if (arguments.length === 2) {
			this.x -= arguments[0];
			this.y -= arguments[1];
		}
		return this;
	}
	this.mult = function (n) { // scale   
		this.x *= n || 0;
		this.y *= n || 0;
		return this;
	}
	this.div = function (n) { // scale
		if (n != 0) {
			this.x /= n;
			this.y /= n;
		}
		return this;
	}
	this.set = function () {
		if (arguments.length === 2) {
			this.x = arguments[0];
			this.y = arguments[1];
		}
	}
	this.magSq = function () {
		return (this.x * this.x + this.y * this.y)
	}
	this.mag = function () {
		return Math.sqrt(this.magSq());
	}
	this.limit = function (n) {
		var mSq = this.magSq();
		if (mSq > n * n) {
			this.div(Math.sqrt(mSq)); //normalize it
			this.mult(n);
		}
		return this;
	}
	this.setMag = function (n) {
		return this.normalize().mult(n);
	}
	this.dot = function (vector) {
		return (this.x * vector.x + this.y * vector.y)
	}
	this.dist = function (v) {
		var dx = v.x - this.x;
		var dy = v.y - this.y;
		var dist = Math.sqrt(dx * dx + dy * dy);
		return dist;
	}
	this.normalize = function () {
		return this.div(this.mag());
	}

	this.copy = function () {
		return new Vector(this.x, this.y);
	}
}
Vector.prototype.angleBetween = function (vector) {
	return (Math.acos(this.dot(vector) / (this.mag() * vector.mag())));
}
Vector.randomNormalizedVector = function () { //static method
	var theta = Math.random() * 360 * rad;
	var x = Math.cos(theta);
	var y = Math.sin(theta);
	return new Vector(x, y)
}

function networkEffect() {
	var canvas = document.getElementById("network");
	var ctx = canvas.getContext("2d");
	var cw = canvas.width = window.innerWidth,
		cx = cw / 2;
	var ch = canvas.height = window.innerHeight,
		cy = ch / 2;
	var requestId = null;
	ctx.lineWidth = 1;
	var color = '255,255,255';
	//77, 125, 240
	var rad = Math.PI / 180;
	var particles = [];
	var num = 45; // number of nodes

	function Particle(x, y, i) {
		this.pos = new Vector(x, y);
		this.vel = new Vector(randomIntFromInterval(-2, 2), randomIntFromInterval(-2, 2));
		this.acc = new Vector(0, 0);
		this.maxSpeed = 1;
		this.maxForce = .1;
		this.r = 5;
		this.color = color;
		this.update = function () {
			this.vel.add(this.acc);
			this.vel.limit(this.maxSpeed);
			this.pos.add(this.vel);
			this.acc.mult(0);
		}
		this.edges = function (i) {
			if (this.pos.x > cw + this.r) {
				this.pos.x = -this.r;
			}
			if (this.pos.y > ch + this.r) {
				this.pos.y = -this.r;
			}
			if (this.pos.x < -this.r) {
				this.pos.x = cw + this.r;
			}
			if (this.pos.y < -this.r) {
				this.pos.y = ch + this.r;
			}
		}
		this.draw = function () {
			this.color = this.color;
			ctx.beginPath();
			ctx.arc(this.pos.x, this.pos.y, this.r, 0, 2 * Math.PI);
			ctx.fillStyle = "rgba(" + this.color + ",1)";
			ctx.fill();
			ctx.strokeStyle = "rgba(" + this.color + ",1)";
			ctx.stroke();
		}
		this.applyForce = function (force) {
			this.acc.add(force);
		}
		this.align = function () {
			var sum = new Vector(0, 0);
			var count = 0;
			for (var i = 0; i < particles.length; i++) {

				var d = dist(this.pos, particles[i].pos);
				if (d > 0 && d < 25) {
					sum.add(particles[i].vel);
					count++;
				}
			}
			if (count > 0) {
				sum.div(count);
				sum.normalize();
				sum.mult(this.maxSpeed);
				this.steer = sum.sub(this.vel);
				this.applyForce(this.steer);
			}
		}
		this.separate = function () {
			var desiredSeparation = this.r * 4;
			var sum = new Vector(0, 0);
			var count = 0;
			for (var i = 0; i < particles.length; i++) {

				var d = dist(this.pos, particles[i].pos);
				if (d > 0 && d < desiredSeparation) {
					var diff = this.pos.copy().sub(particles[i].pos.copy());
					diff.normalize();
					diff.div(d); // weight by distance
					sum.add(diff);
					count++;
				}
			}
			if (count > 0) {
				sum.div(count);
				sum.normalize();
				sum.mult(this.maxSpeed);
				this.steer = sum.sub(this.vel);
				this.steer.limit(this.maxForce)
				this.applyForce(this.steer);
			}
		}
	}
	for (var i = 0; i < num; i++) {
		var p = new Particle(Math.random() * cw, Math.random() * ch);
		particles.push(p);
	}

	function Draw() {
		requestId = window.requestAnimationFrame(Draw);
		ctx.clearRect(0, 0, cw, ch);
		for (var i = 0; i < particles.length; i++) {
			var p = particles[i];
			p.separate()
			p.edges(i);
			p.update();
			p.draw();
			connect(i);
		}
	}

	var Init = function () {
		if (requestId) {
			window.cancelAnimationFrame(requestId);
			requestId = null;
		}
		cw = canvas.width = window.innerWidth,
			cx = cw / 2;
		ch = canvas.height = window.innerHeight,
			cy = ch / 2;
		Draw();
	}

	window.setTimeout(function () {
		Init();
		window.addEventListener('resize', Init, false);
	}, 15);

	function connect(i) {
		for (var j = i; j < particles.length; j++) {
			var partdist = dist(particles[i].pos, particles[j].pos);
			if (partdist < cw * 0.1) {
				ctx.beginPath();
				ctx.moveTo(particles[i].pos.x, particles[i].pos.y);
				ctx.lineTo(particles[j].pos.x, particles[j].pos.y);
				var alp = map(partdist, 0, cw * 0.1, 1, 0);
				ctx.strokeStyle = "hsla(" + particles[i].color + ",80%,70%," + alp + ")";
				ctx.stroke();
			}
		}
	}

	function randomIntFromInterval(mn, mx) {
		return ~~(Math.random() * (mx - mn + 1) + mn);
	}

	function dist(p1, p2) {
		var dx = p2.x - p1.x;
		var dy = p2.y - p1.y;
		return Math.sqrt(dx * dx + dy * dy);
	}

	function map(n, a, b, _a, _b) {
		var d = b - a;
		var _d = _b - _a;
		var u = _d / d;
		return _a + n * u;
	}
}