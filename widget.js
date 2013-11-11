$(document).ready(function() {
    geolocate();

    if(screen.width > screen.height) { /* landscape */
        $('#symbol').css('height', '80%');
    } else {
        $('#symbol').css('width', '80%');
    }

    var $body = $('body'); // Cache this for performance

    var setBodyScale = function() {
        var scaleSource = $body.width(),
            scaleFactor = 0.60,                     
            maxScale = 800,
            minScale = 60; // Tweak these values to taste

        var fontSize = scaleSource * scaleFactor; // Multiply the width of the body by the scaling factor

        if (fontSize > maxScale) fontSize = maxScale;
        if (fontSize < minScale) fontSize = minScale; // Enforce the minimum and maximums

        $('body').css('font-size', fontSize + '%');
    };

    $(window).resize(function(){
        setBodyScale();
    });

    setBodyScale();
});


function round(x) {
    return Math.round(x * 1000) / 1000.0;
}


function geolocate() {
    if('geolocation' in navigator) {
        navigator.geolocation.getCurrentPosition(function(pos) {
            $.getJSON('/weather' 
                    + '?lat=' + round(pos.coords.latitude) 
                    + '&lon=' + round(pos.coords.longitude)
                    + '&lang=' + navigator.language.substr(0, 2),
                    
                    function(data) {
                        var citytemp = $('#loctmp');
                        citytemp.text(
                              data['name'] 
                            + ', '
                            + Math.round(data['main']['temp']));
                        
                        citytemp.append($('<span>&deg;C</span>'));

                        $('#symbol').attr('alt', data['weather'][0]['main']);
                        $('#symbol').attr('title', data['weather'][0]['main']);
                        $('#symbol').attr('src', 'img/weather-' + data['weather'][0]['icon'] + '.svg');
                    });
        });
    }
}