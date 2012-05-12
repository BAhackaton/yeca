//(function () {
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
    var userMarker, userCircle;
    map.addLayer(tilelayer);
    map.on('locationfound', onLocationFound);
    map.on('locationerror', onLocationError);
    map.on('click', onClickEvt)
    map.locate(/*{watch: true}*/);

    function onLocationFound(e) {
        var radius = e.accuracy / 2;

        if (!userMarker) {
            userMarker = new L.Marker(e.latlng);
            map.addLayer(userMarker);
            userMarker.bindPopup("Estas en un radio de " + radius + " metros de este punto.");
            userCircle = new L.Circle(e.latlng, radius);
            map.addLayer(userCircle);
        }
        userMarker.setLatLng(e.latlng);

        map.setView(e.latlng)
        map.setZoom(6);

        // userLocation is a usig.Point on the coordinates of the map.
        Yeca.userLocation = latLngToUsigPoint(e.latlng);
    }

    function onLocationError(e) {
        map.setView(start, 6);
        alert("No se pudo obtener tu ubicación :(");
    }

    function onClickEvt(e) {
//        map.addLayer(new L.Marker(e.latlng));
//        console.log(map.project(e.latlng, map.getZoom()).x + ', ' + map.project(e.latlng, map.getZoom()).y);
//        console.log(e.latlng.lat + ', ' + e.latlng.lng);
//        console.log(map.latLngToLayerPoint(e.latlng));

    }

    var projection = new Proj4js.Proj('SR-ORG:7128');
    var currentPlanLayers = [];

    var samplePlans = [
        [
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
        ],
        [
            {"trip_description":"", "service":"141", "gml":"<gml:feature><gml:type>bus</gml:type><gml:Point><gml:coordinates>102483.8125,103166.2109375</gml:coordinates></gml:Point></gml:feature>", "stop":5265, "walked":0, "traveled":0, "service_type":3, "stop_description":"ALVAREZ, JULIAN y CORRIENTES AV.", "time":0, "any_trip":true, "stop_name":null, "type":"Board"},
            {"type":"Bus", "gml":"<gml:feature><gml:type>bus</gml:type><gml:fid>1336845809.59</gml:fid><gml:LineString><gml:coordinates>102484.849994954041904,103168.930266840674449 102488.308051244923263,103167.610928318899823 102518.120397868260625,103152.738035024929559 102600.116724773644819,103118.881448743748479 102609.289754503915901,103115.000693802212481 102618.363794704710017,103111.219958317931741 102735.784078839133144,103064.148128072542022 102704.666166141745634,103040.866272084036609 102753.99594832425646,102976.733796091459226 102766.369639507160173,102960.640665418948629 102757.930782120427466,102955.539673098901403 102753.344267255291925,102952.659112729917979 102750.589058685232885,102950.888768336488283 102748.485531184138381,102950.108616569894366 102723.622661033950862,102935.585791376317502 102703.709267356927739,102923.383417591074249 102698.116358942264924,102919.502662649538252 102689.677501555517665,102914.851757887139684 102589.219627405240317,102854.30998041004932 102584.261901804624358,102851.319398638093844 102582.521335911558708,102850.099161259568064 102574.173218926822301,102844.548081381857628 102472.890432031024829,102785.676628840941703 102447.587253010991844,102771.728949372991337 102396.13785727431241,102741.38067384561873 102322.533585903816856,102695.969177627994213 102316.569466753659071,102692.528508298390079 102311.339519947010558,102689.197860371757997 102307.759398631431395,102687.097451769383042 102292.077807338966522,102677.775638353123213 102240.149550008034566,102646.399534611904528 102210.417722279453301,102627.472978918201989 102202.788512120692758,102624.355785524225212 102253.91906956321327,102541.222548182369792 102253.849624878916075,102526.525976019009249 102254.51128090765269,102461.583581494167447 102254.503031780201127,102457.362760397969396 102254.214312319265446,102395.800784456863767 102254.305052721276297,102386.919056652521249 102254.305052721276297,102378.487416405841941 102255.980118689636583,102270.748136072827037 102243.388005433313083,102270.681714048187132 102243.911152127635432,102258.464067698587314 102287.623278513114201,102088.390982580400305 102212.218004444497637,102053.134123897631071 102201.099253639753442,102049.104639022305491 102283.573252169619082,101827.391034025888075 102333.517761803726899,101695.84829990187427 102337.873005863060826,101685.31235329649644 102343.961157162106247,101624.811882854410214 102358.622150278606568,101484.577241352832061 102358.891930237601628,101477.788735251378966 102360.331718053261284,101466.908824735015514 102378.27127663999272,101422.607093502228963 102386.22846561940969,101393.257703529001446 102398.695338451332645,101364.510595719490084 102403.366785838006763,101351.987726587001816 102455.789990816250793,101230.724136609773268 102461.844850368419429,101216.301330873437109 102450.287822803584277,101210.420186786781414 102400.479591228664503,101183.704989753692644 102349.392744898170349,101156.089617605306557 102343.428625748012564,101153.099035833351081 102337.464506597854779,101150.218475464367657 102285.643487923851353,101121.832953495104448 102232.725335298295249,101093.437429580109892 102226.761216148137464,101090.55686921114102 102220.434135389936273,101086.676114269605023 102170.716644217027351,101060.060936693771509 102113.302717128346558,101029.575006122118793 102078.912104767325218,101011.381466847247793 102071.570381332130637,101007.500711905711796 102031.306390222962364,100985.996528595656855 102023.972915915233898,100981.335621887526941 102018.008796765076113,100978.785125727503328 102003.605820228171069,100971.133637247417937 101923.07783800981997,100930.841145708822296 101871.946941187532502,100904.592159889478353 101812.321718211955158,100874.199249652825529 101736.628446669157711,100835.764775436735363 101658.157461184906424,100800.013316410317202 101640.629070774797583,100789.357283690755139 101617.440182931590243,100774.366149644687539 101605.651413531028084,100761.212800358422101 101598.680900831328472,100757.882152431790018 101493.669508325736388,100707.42233624610526 101487.713638303030166,100704.541775877136388 101475.059476786656887,100698.550610387494089 101470.192491588037228,100696.450201785119134 101395.999839255338884,100661.733448171551572 101391.05036278218904,100658.852887802568148 101385.820415975540527,100656.302391642544535 101367.664086446486181,100648.210817550527281 101344.187069708787021,100636.778593586161151 101315.843067772482755,100623.255962965151411 101307.775421121230465,100619.485229426587466 101274.572683113772655,100604.072231063430081 101259.171562154777348,100596.75080679228995 101244.859326019883156,100589.979489536053734 101229.821166668931255,100583.108152822562261 101193.137296875342145,100565.584743911313126 101158.565203710313654,100548.841486766643357 101105.465570280735847,100523.656587429577485 101099.138489522549207,100520.225920045690145 101038.061949843729963,100491.979703141827486 100944.292704156308901,100448.045975998422364 100862.347285919022397,100408.424170724872965 100858.041241387370974,100406.433783525484614 100851.342949893689365,100403.103135598852532 100844.743647929470171,100400.102551881180261 100733.322683391146711,100348.202455511011067 100726.261430289436248,100345.201871793324244 100719.290917589722085,100341.76120246372011 100604.413666979235131,100288.596520418184809</gml:coordinates></gml:LineString></gml:feature>"},
            {"stop":20120, "walked":0, "traveled":0, "stop_description":"BOYACA AV. y RIVADAVIA AV.", "time":0, "service_type":3, "stop_name":"CARABOBO", "type":"Alight"},
            {"gml":"<gml:feature><gml:type>marker</gml:type><gml:Point><gml:coordinates>100604.3125,100288.7421875</gml:coordinates></gml:Point></gml:feature>", "time":0, "type":"FinishWalking", "walked":0, "traveled":0}
        ]
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

        var planBounds = new L.LatLngBounds();
        function extendPlanBounds(latlng) { planBounds.extend(latlng) }

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
                extendPlanBounds(latlng);
            }
            else if (type == 'Board') {
                latlng = getLatLngFromGmlPoint(gml);
                var markerIcon = getMarkerIconForService(step.service);
                // TODO Este marker debería usar el markerIcon =D
                layer = new L.Marker(latlng);
                extendPlanBounds(latlng);
            }
            else if (type == 'Bus' || type == 'SubWay' || type == 'Street') {
                // TODO add path style
                // var pathStyle = getPathStyleForType(type);

                var latLngList = getLatLngListFromGml(gml);
                layer = new L.Polyline(latLngList, {color: 'red'});
                latLngList.forEach(extendPlanBounds);
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
        } // for

        // Fits the plan on the map =D
        map.fitBounds(planBounds);
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
        var point = {x:coords[0], y:coords[1]};
        var projected = Proj4js.transform(projection, Proj4js.WGS84, point);

        // I don't know why the x and y properties are backwards here xD
        return new L.LatLng(projected.y, projected.x);
    }

    function latLngToUsigPoint(latlng) {
        // And here we have to invert the the coordinates again so that
        // latLngToUsigPoint(mapCoordsToLatLng(someCoord)) == someCoord
        var point = {x:latlng.lng, y:latlng.lat};
        var projected = Proj4js.transform(Proj4js.WGS84, projection, point);

        return new usig.Punto(projected.x, projected.y);
    }


    function swapSamplePlan() {
        var plan = samplePlans.shift();
        samplePlans.push(plan);
        showPlan(plan);
    }

    window.Yeca || (window.Yeca = {});
    window.Yeca.map = map;
    window.Yeca.showPlan = showPlan;
//})();