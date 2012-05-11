(function() {

    var Yeca = {};

    // All configuration is optional. See Yeca.tests.getLocationTest
    Yeca.getLocation = function getLocation(config) {
        config = config || {};
        var success = config.success || _.identity;
        var error = config.error || _.identity;
        var settings = _.extend({
                                timeout: (5 * 1000),
                                maximumAge: (1000 * 60 * 15),
                                enableHighAccuracy: true
                            }, config.settings);

        if (Modernizr.geolocation) {
            navigator.geolocation.getCurrentPosition(success, error, settings);
        }
    };

    window.Yeca = Yeca;

    Yeca.tests = {
            getLocationTest: function() {
                Yeca.getLocation({
                        success: function(position) {
                            console.log(position.coords.latitude + ", " + position.coords.longitude);
                        },
                        error: function(error) {
                            switch(error.code) {
                                case error.TIMEOUT:
                                    console.error('Timeout');
                                    break;
                                case error.POSITION_UNAVAILABLE:
                                    console.error('Position unavailable');
                                    break;
                                case error.PERMISSION_DENIED:
                                    console.error('Permission denied');
                                    break;
                                case error.UNKNOWN_ERROR:
                                    console.error('Unknown error');
                                    break;
                            }
                            Yeca.failTest('getLocationTest', error);
                        },
                        settings: {
                                timeout: (5 * 1000),
                                maximumAge: (1000 * 60 * 15),
                                enableHighAccuracy: true
                        }
                    })
            }
    };

    Yeca.runTests = function() {
        _.each(Yeca.tests, function(test, name) {
            try {
                if (_.isFunction(test))
                    test.call();
            } catch (e) {
                Yeca.failTest(name, e)
            }
        });
    };

    Yeca.failTest = function(name, exception) { console.error("Test " + name + " failed with exception: " + exception); }


})();
