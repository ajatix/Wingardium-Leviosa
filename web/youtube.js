console.log("Youtube image navigation");

var myPlayer = document.getElementById('movie_player');

function leftAction() {
		myPlayer.pauseVideo();
}
function rightAction() {
		myPlayer.playVideo();
}
function downAction() {
		myPlayer.setVolume(myPlayer.getVolume()-25);
}
function upAction() {
		myPlayer.setVolume(myPlayer.getVolume()+25);
}
