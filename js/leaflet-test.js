(function () {
    var res = [90, 50, 30, 15, 7.5, 4, 2, 1, 0.5, 0.2]
      , start = new L.LatLng(-34.61139, -58.38044)
      , map = new L.Map('map', {
          crs:L.CRS.proj4js('SR-ORG:7128', '+title=Gauss-Kruger Bs.As. +proj=tmerc +lat_0=-34.629243 +lon_0=-58.463196 +k=0.9999980000000001 +x_0=100000 +y_0=100000 +ellps=intl +units=m +no_defs', new L.Transformation(1, -54340, -1, 54090)),
          scale:function (zoom) {
              return 1 / res[zoom];
          }, continuousWorld:false
        })
      , mapUrl = 'http://tiles1.mapa.buenosaires.gob.ar/tilecache/mapabsas_default'
      , attrib = 'Map data &copy; 2011 USIG, Imagery &copy; 2011 USIG'
      , tilelayer = new L.TileLayer.WMS(mapUrl, {
          scheme:'wms', maxZoom:9, minZoom:0, worldCopyJump:false, continuousWorld:true, format:'image/png', transparent:true, attribution:attrib, layers:'mapabsas_default'
        });
    map.addLayer(tilelayer);
    map.on('locationfound', onLocationFound);
    map.on('locationerror', onLocationError);
    map.on('click', onClickEvt)
    map.locateAndSetView(4);

    function onLocationFound(e) {
        var radius = e.accuracy / 2;

        var marker = new L.Marker(e.latlng);
        map.addLayer(marker);
        marker.bindPopup("Estas en un radio de " + radius + " metros de este punto.");

        var circle = new L.Circle(e.latlng, radius);
        map.addLayer(circle);
    }

    function onLocationError(e) {
        map.setView(start, 6);
        alert("No pudimos encontrar tu ubicacion, por favor revisa la configuracion de tu navegador");
    }

    function onClickEvt(e) {
//        map.addLayer(new L.Marker(e.latlng));
//        console.log(map.project(e.latlng, map.getZoom()).x + ', ' + map.project(e.latlng, map.getZoom()).y);
//        console.log(e.latlng.lat + ', ' + e.latlng.lng);
//        console.log(map.latLngToLayerPoint(e.latlng));

    }

    var projection = new Proj4js.Proj('SR-ORG:7128');
    var currentPlanLayers = [];

    var samplePlan = [
        {"gml":"<gml:feature><gml:type>walk</gml:type><gml:Point><gml:coordinates>102852.84375,103016.703125</gml:coordinates></gml:Point></gml:feature>", "time":0, "type":"StartWalking", "walked":0, "traveled":0},
        {"indicacion_giro":"", "distance":105, "from":4701, "name":"CORRIENTES AV.", "gml":"<gml:feature><gml:type>walk</gml:type><gml:fid>317447014800</gml:fid><gml:MultiLineString><gml:lineStringMember><gml:LineString><gml:coordinates>102852.363657647001673,103016.897626092002611 102852.84375,103016.703125</gml:coordinates></gml:LineString></gml:lineStringMember><gml:lineStringMember><gml:LineString><gml:coordinates>102852.84375,103016.703125 102880.6875,103015.828125</gml:coordinates></gml:LineString></gml:lineStringMember><gml:lineStringMember><gml:LineString><gml:coordinates>102880.6875,103015.828125 102956.4140625,103006.453125</gml:coordinates></gml:LineString></gml:lineStringMember></gml:MultiLineString></gml:feature>", "to":4651, "type":"Street", "id":"317447014800"},
        {"trip_description":"", "service":"Línea B", "gml":"<gml:feature><gml:type>subwayB</gml:type><gml:Point><gml:coordinates>102938.225767405005172,103006.635302530994522</gml:coordinates></gml:Point></gml:feature>", "stop":20082, "walked":0, "traveled":0, "service_type":1, "stop_description":"CORRIENTES AV. y PANAMA", "time":0, "any_trip":true, "stop_name":"ANGEL GALLARDO", "type":"Board"},
        {"type":"SubWay", "gml":"<gml:feature><gml:type>subway</gml:type><gml:fid>1336829684.31</gml:fid><gml:LineString><gml:coordinates>106510.71442780396319,102754.507419396511978 106101.018793793744408,102740.148615316968062 105854.358326388843125,102730.106337949167937 105472.958547474787338,102717.243420922299265 105310.896845729992492,102737.307971121292212 105088.663189160739421,102773.256123372135335 104988.233606211331789,102788.959684594694409 104857.800540989308502,102800.452290865199757 104727.27673111371405,102793.310671302839182 104593.898589407937834,102783.608471057072165 104474.569369976117741,102796.981503766961396 104270.501143146844697,102846.112645630113548 103883.442197656200733,102895.20377842009475 102938.225767404670478,103006.635302531343768</gml:coordinates></gml:LineString></gml:feature>"},
        {"stop":20069, "walked":0, "traveled":0, "stop_description":"CALLAO AV. y CORRIENTES AV.", "time":0, "service_type":1, "stop_name":"CALLAO", "type":"Alight"},
        {"trip_description":"", "service":"60", "gml":"<gml:feature><gml:type>bus</gml:type><gml:Point><gml:coordinates>106513.71875,102752.6640625</gml:coordinates></gml:Point></gml:feature>", "stop":5799, "walked":0, "traveled":0, "service_type":3, "stop_description":"CALLAO AV. y CORRIENTES AV.", "time":0, "any_trip":false, "stop_name":null, "type":"Board"},
        {"type":"Bus", "gml":"<gml:feature><gml:type>bus</gml:type><gml:fid>1336829684.31</gml:fid><gml:LineString><gml:coordinates>106513.682773673775955,102753.062303602157044 106640.984805247484474,102764.562521414190996 106647.955317947184085,102765.00260702612286 106648.310030427761376,102752.360147628962295 106648.928714986905106,102716.743218900082866 106650.157834977741004,102637.867874907955411 106650.520796585769858,102631.436623806395801 106651.246719801842119,102624.665306550159585 106654.73610071541043,102506.412302236334654 106654.73610071541043,102501.311309916272876 106655.46202393148269,102496.210317596211098 106660.238268728076946,102372.176188652985729 106660.238268728076946,102367.965369502504473 106660.964191944149206,102362.864377182442695 106671.605566361438832,102235.609621715571848 106672.512970381518244,102224.627485308854375 106666.557100358812022,102225.077572866517585 106594.179256066287053,102218.696331493571051 106582.894449707469903,102208.494346853462048 106577.012821831856854,102199.182535382919014 106575.63521754683461,102191.080959345184965 106576.45188116490317,102178.658542753983056 106579.627795235181111,102129.178917249417282 106581.087890794762643,102122.407599993181066 106586.037367267927038,102116.866522061187425 106590.62388213306258,102112.645700964989373 106594.839186262703151,102109.205031635385239 106601.529228628918645,102104.204058772578719 106683.715285465776105,102111.805537524036481 106810.479627070919378,102123.687849046051269 106945.039394121282385,102136.460333737646579 106981.82225344433391,102132.769615764904302 107063.455618741674698,102139.030833789132885 107068.405095214839093,102139.360897998078144 107073.635042021487607,102140.131047818955267 107193.148400593432598,102149.142800917717977 107197.734915458568139,102149.9129507385951 107198.097877066596993,102144.811958418533322 107198.007136664586142,102027.439125328557566 107197.734915458568139,102022.338133008495788 107197.726666331116576,102017.677226300365874 107202.684391931732534,101899.534243389527546 107203.047353539761389,101894.423249123734422 107203.682536353808246,101890.212429973253165 107212.492604476035922,101777.160437436745269 107213.510094641475007,101764.935672621373669</gml:coordinates></gml:LineString></gml:feature>"},
        {"stop":7019, "walked":0, "traveled":0, "stop_description":"BELGRANO AV. y SANTIAGO DEL ESTERO", "time":0, "service_type":3, "stop_name":null, "type":"Alight"},
        {"gml":"<gml:feature><gml:type>walk</gml:type><gml:Point><gml:coordinates>107212.875,101764.8828125</gml:coordinates></gml:Point></gml:feature>", "time":0, "type":"StartWalking", "walked":0, "traveled":0},
        {"indicacion_giro":"", "distance":254, "from":1301, "name":"BELGRANO AV.", "gml":"<gml:feature><gml:type>walk</gml:type><gml:fid>205113011400</gml:fid><gml:MultiLineString><gml:lineStringMember><gml:LineString><gml:coordinates>107082.6953125,101754.0 107195.125,101763.375 107212.875,101764.8828125</gml:coordinates></gml:LineString></gml:lineStringMember><gml:lineStringMember><gml:LineString><gml:coordinates>106960.181017263996182,101743.621272924996447 107056.59375,101751.828125 107082.6953125,101754.0</gml:coordinates></gml:LineString></gml:lineStringMember></gml:MultiLineString></gml:feature>", "to":"1500", "type":"Street", "id":"205113011400"},
        {"gml":"<gml:feature><gml:type>marker</gml:type><gml:Point><gml:coordinates>106961.701209999999264,101734.537955000007059</gml:coordinates></gml:Point></gml:feature>", "time":0, "type":"FinishWalking", "walked":0, "traveled":0}
    ];

    function addPath(coords) {

        var latLngs = coords.map(mapCoordsToLatLng);

        //console.log(latLngs);
        map.addLayer(new L.Polyline(latLngs, {color:'red'}));
    }

    // TODO Complete this!
    var markerIconByService = {
        'Línea A': 'lala',
        'Línea B': 'lala',
        'Línea C': 'lala',
        'Línea D': 'lala',
        'Línea E': 'lala',
        'Línea F': 'lala',
        'Línea G': 'lala',
        'Línea H': 'lala'
    }

    function getMarkerIconForService(service) {
        // TODO default_service_icon
        return markerIconByService[service] || 'default_service_icon';
    }

    // Show a plan in the map. 'plan' is the reponse of usig.Recorrido.getPlan()
    function showPlan(plan) {
        removeCurrentPlanLayers();
        for (var i = 0; i < plan.length; i++) {
            var step = plan[i]
              , type = step.type
              , gml = step.gml;
            if (type === undefined) continue;

            var latlng, layer = null;

            if (type == 'StartWalking' || type == 'FinishWalking') {
                latlng = getLatLngFromGmlPoint(gml);
                // TODO Este marker debería ser un chaboncito caminando =D
                layer = new L.Marker(latlng);
            }
            else if (type == 'Board') {
                latlng = getLatLngFromGmlPoint(gml);
                var markerIcon = getMarkerIconForService(step.service);
                // TODO Este marker debería usar el markerIcon =D
                layer = new L.Marker(latlng);
            }
            else if (type == 'Bus' || type == 'SubWay' || type == 'Street') {
                // TODO add path style
                // var pathStyle = getPathStyleForType(type);

                var latLngList = getLatLngListFromGml(gml);
                layer = new L.Polyline(latLngList, {color: 'red'});
            }
            else if (type == 'SubWayConnection') {
                // TODO do this
                // Code stolen from usig.MapaInteractivo.min.js
//                if (H.type == "SubWayConnection") {
//                    switch (H.service_to) {
//                        case"Línea A":
//                            H.gml[1] = H.gml[1].replace("connection", "subwayA");
//                            break;
//                        case"Línea B":
//                            H.gml[1] = H.gml[1].replace("connection", "subwayB");
//                            break;
//                        case"Línea C":
//                            H.gml[1] = H.gml[1].replace("connection", "subwayC");
//                            break;
//                        case"Línea D":
//                            H.gml[1] = H.gml[1].replace("connection", "subwayD");
//                            break;
//                        case"Línea E":
//                            H.gml[1] = H.gml[1].replace("connection", "subwayE");
//                            break;
//                        case"Línea H":
//                            H.gml[1] = H.gml[1].replace("connection", "subwayH");
//                            break
//                    }
//                    G.addMarker(H.gml[1]);
//                    G.addEdges(H.gml)
//                }
            }

            if (layer) {
                map.addLayer(layer);
                currentPlanLayers.push(layer);
            }
        }
    }

    function removeCurrentPlanLayers() {
        currentPlanLayers.forEach(function (layer) {
            map.removeLayer(layer);
        });
        currentPlanLayers = [];
    }

    function getXmlFromGmlText(gml) {
        // This is horrible, but jQuery explodes when trying to parse the GML
        // with its namespace, and i don't wanna learn how to parse namespaced
        // XML =P
        gml = gml.replace(/gml:/g, '');

        return $.parseXML(gml);
    }

    function getLatLngFromGmlPoint(gml) {
        var xml = getXmlFromGmlText(gml);
        var coords = $(xml).find('Point coordinates').text().split(',');
        return mapCoordsToLatLng(coords);
    }

    function getLatLngListFromGml(gml) {
        var xml = getXmlFromGmlText(gml);
        var lineStrings = $(xml).find('LineString').toArray();
        var lineStringTexts = lineStrings.map(function (lineString) { return $(lineString).text() })
        var latLngList = [];
        lineStringTexts.forEach(function (lineStringText) {
            lineStringText.split(/\s+/).forEach(function (coords) {
                latLngList.push(mapCoordsToLatLng(coords.split(',')));
            });
        });
        console.log('Coords: ', latLngList);
        return latLngList;
    }

    // Converts map coordinates to L.LatLng. 'coords' must be a 2-element array.
    function mapCoordsToLatLng(coords) {
        var point = {x:coords[0], y:coords[1]}
        var projected = Proj4js.transform(projection, Proj4js.WGS84, point);

        // I don't know why the x and y properties are backwards here xD
        return new L.LatLng(projected.y, projected.x);
    }

    showPlan(samplePlan);

    window.Yeca || (window.Yeca = {});
    window.Yeca.map = map;
    window.Yeca.showPlan = showPlan;
})();