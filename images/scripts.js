



//This function could be redundant, but this is a check to make sure an API request isn't sent if the data isn't the correct length
function validateLength(isoCode){
	return(isoCode.length == 2 || isoCode.length == 3)
}

function getCountry(){
	event.preventDefault();
	var isoCode = $(".isoInput").val();
	//Reseting the text displayed on the webpage
	setRegion("");
	setCapital("");
	setLongitude("");
	setLatitude("");


	if (validateLength(isoCode)){
		$.get("http://api.worldbank.org/v2/country/"+isoCode+"?format=json", function(data){
			if (data['length'] < 2){
				setName(data[0]['message'][0]['value']);
			} else {

				setName(data[1][0]['name']);
				setRegion(data[1][0]['region']['value']);
				setCapital(data[1][0]['capitalCity']);
				setLongitude(data[1][0]['longitude']);
				setLatitude(data[1][0]['latitude']);
			}
		});

	} else {
		$(".countryName").fadeOut(function(){
			$(this).text("Please enter a valid ISO code consisting of 2 or 3 characters").fadeIn();
		});
	}
}

function setName(data){
	$(".countryName").fadeOut(function(){
		$(this).text(data).fadeIn();
	});

}

function setCapital(data){
	$(".capitalResult").fadeOut(function(){
		$(this).text(data ? data : "NA").fadeIn();
	});
}


function setRegion(data){
	$(".regionResult").fadeOut(function(){
		$(this).text(data ? data : "NA").fadeIn();
	});
}

function setLongitude(data){
	$(".longitudeResult").fadeOut(function(){
		$(this).text(data ? data : "NA").fadeIn();
	});
}

function setLatitude (data){
	$(".latitudeResult").fadeOut(function(){
		$(this).text(data ? data : "NA").fadeIn();
	});

}





//Background Cursor Follower Script
var lFollowX = 0,
lFollowY = 0,
x = 0,
y = 0,
friction = 1 / 30;

function moveBackground() {
	x += (lFollowX - x) * friction;
	y += (lFollowY - y) * friction;

	translate = 'translate(' + x + 'px, ' + y + 'px) scale(1.5)';

	$('.bg').css({
		'-webit-transform': translate,
		'-moz-transform': translate,
		'transform': translate
	});

	window.requestAnimationFrame(moveBackground);
}

$(window).on('mousemove click', function(e) {

	var lMouseX = Math.max(-6000, Math.min(6000, $(window).width() / 2 - e.clientX));
	var lMouseY = Math.max(-300, Math.min(300, $(window).height() / 2 - e.clientY));
	lFollowX = (20 * lMouseX) / 100; // 100 : 12 = lMouxeX : lFollow
	lFollowY = (10 * lMouseY) / 100;

});

moveBackground();
