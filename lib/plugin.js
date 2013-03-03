function success(stream) {
  video.src = window.URL.createObjectURL(stream);
}

navigator.webkitGetUserMedia({video: true}, success, success);

function hasGetUserMedia() {
  // Note: Opera is unprefixed.
  return !!(navigator.getUserMedia || navigator.webkitGetUserMedia ||
            navigator.mozGetUserMedia || navigator.msGetUserMedia);
}

if (hasGetUserMedia()) {
  // Good to go!
} else {
  alert('getUserMedia() is not supported in your browser');
}


		var canvas = document.getElementById("canvas-blended");
		var stopbutton = document.getElementById("stop-button");
		var startbutton = document.getElementById("start-button");

		var consoleText = document.getElementById('console-text');

		var ctx = canvas.getContext("2d");

		ctx.fillStyle = "#FF0000";
		ctx.strokeStyle = "#00FF00";
		ctx.lineWidth = 5;

		console.log("Inintializing");
		
		var camMotion = CamMotion.Engine({
			canvasBlended: canvas
		});

		console.log(camMotion);

		camMotion.on("error", function (e) {
			console.log("error", e);
		});

		console.log(camMotion);

		camMotion.on("streamInit", function(e) {
			console.log("webcam stream initialized", e);
		});

		camMotion.onMotion(CamMotion.Detectors.LeftMotion, function () {
			consoleText.innerText = "Left";
			console.log("AAAAAAAAAAAAAAAH Left motion detected");		
		});
		camMotion.onMotion(CamMotion.Detectors.RightMotion, function () {
			consoleText.innerText = "Right";
			console.log("AAAAAAAAAAAAAAAH Right motion detected");
		});
		camMotion.onMotion(CamMotion.Detectors.DownMotion, function () {
			consoleText.innerText = "Down";
			console.log("AAAAAAAAAAAAAAAH Down motion detected");
		});
		camMotion.onMotion(CamMotion.Detectors.UpMotion, function () {
			consoleText.innerText = "Up";
			console.log("AAAAAAAAAAAAAAAH Up motion detected");
		});

		camMotion.on("frame", function () {

			var point = camMotion.getMovementPoint(true);
			// draw a circle
			ctx.beginPath();
			ctx.arc(point.x, point.y, point.r, 0, Math.PI*2, true);
			ctx.closePath();
			if (camMotion.getAverageMovement(point.x-point.r/2, point.y-point.r/2, point.r, point.r)>4) {
				ctx.fill();
			} else {
				ctx.stroke();
			}
		});
		camMotion.start();

		with(stopbutton) {
			onclick = function() {camMotion.stop();	console.log('Stopped');};
		};
		with(startbutton) {
			onclick = function() {camMotion.start(); console.log('Stopped');};
		};
