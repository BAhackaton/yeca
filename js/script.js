(function() {

    window.Yeca || (window.Yeca = {});

    var currentLocation;
    var usingDefaultLocation;

    // Origin and destination are locations (Direccion, Inventario)
    Yeca.origin = null;
    Yeca.destination = null;

    Yeca.searchPaths = function(successHandler, errorHandler) {
        /* Search paths "sequentially", aggregate them and then pass all to successHandler
         * Any error stops the sequence and calls the error handler
         */
        // TODO Handle errors
        var full_results = [];
        var types = ['transporte', 'auto', 'pie'];
        var process_next = function (results) {
            full_results = full_results.concat(results);
            var type = types.pop();
            if (type) {
                usig.Recorridos.opts.tipo = type;
                usig.Recorridos.buscarRecorridos(
                        Yeca.origin.getCoordenadas(),
                        Yeca.destination.getCoordenadas(),
                        process_next);
            } else {
                full_results.sort(function (a, b) {
                    return a.getTime() - b.getTime();
                });
                successHandler(full_results);
            }
        };
        process_next([]);
    };

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

    Yeca.storeCurrentLocation = function() {
        Yeca.getLocation({
            success: function(position) {
                // TODO Convert using proj4
                Yeca.origin = position.coords;
                usingDefaultLocation = true;
            },
            error: function() {
                usingDefaultLocation = false;
            }
        })
    };

    Yeca.init = function() {
        Yeca.storeCurrentLocation();
    }

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

    // View

    Yeca.isIOS = function() {
        return (!!navigator.userAgent.match(/iPad/i)
                || !!navigator.userAgent.match(/iPhone/i)
                || !!navigator.userAgent.match(/iPod/i))
    };

    Yeca.resizeMap = function() {
        if ($.mobile.activePage.attr("id") == "one") {
            $("#map").height(
                    $("html").height() - $("#one .ui-header").outerHeight(true)
                            - $("#one .ui-content").outerHeight(true) + $("#one .ui-content").height()
                            - $("#one form").outerHeight(true)
            );
            if (!Yeca.isIOS()) {
                $("#map").height($("#map").height() - ($("#one").height() - $("html").height()));
            }
        } else {
            $(".map-complement:visible").each(function() {
                $(this).css('max-height', ($("html").height() * 0.5 - $(".ui-header").height()));
            });
            var complementHeight = $(".map-complement:visible").outerHeight(true);
            $("#map").height($("html").height() - $(".ui-header").outerHeight(true) - 30 - complementHeight);
        }
    };

    Yeca.initAutocompleter = function(id, afterSelectionCb, afterGeocodingCb) {
        new usig.AutoCompleter(id, {
            skin:'dark',
            onReady:function () {
                $('#' + id).val('').removeAttr('disabled');
            },
            afterSelection:afterSelectionCb,
            afterGeoCoding:afterGeocodingCb
        });
    };

    var pageSelectors = ["#one", "#two", "#three"];
    Yeca.changePage = function(n) {
        $("#map").appendTo("#map-container-" + n);
        $.mobile.changePage($(pageSelectors[n - 1]));
        Yeca.resizeMap();
    };

})();
