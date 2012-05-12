(function () {
    var res = [90, 50, 30, 15, 7.5, 4, 2, 1, 0.5, 0.2]
            , start = new L.LatLng(-34.61139, -58.38044)
            , map = new L.Map('map', {
                crs:L.CRS.proj4js('SR-ORG:7128', '+title=Gauss-Kruger Bs.As. +proj=tmerc +lat_0=-34.629243 +lon_0=-58.463196 +k=0.9999980000000001 +x_0=100000 +y_0=100000 +ellps=intl +units=m +no_defs'
                        , new L.Transformation(1, -54340, -1, 54090)),
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
        marker.bindPopup("Estas en un radio de " + radius + " metros de este punto.").openPopup();

        var circle = new L.Circle(e.latlng, radius);
        map.addLayer(circle);
    }

    function onLocationError(e) {
        map.setView(start, 6);
        alert(e.message);
    }

    function onClickEvt(e) {
        map.addLayer(new L.Marker(e.latlng));
        console.log(map.project(e.latlng, map.getZoom()).x + ', ' + map.project(e.latlng, map.getZoom()).y);
        console.log(e.latlng.lat + ', ' + e.latlng.lng);
        console.log(map.latLngToLayerPoint(e.latlng));

    }

    var projection = new Proj4js.Proj('SR-ORG:7128');

    function addPath() {
        var coords = [
            [99664.584296994275064, 108739.486230201408034 ],
            [99664.920442766931956, 108738.964750015482423 ],
            [99673.730510889159632, 108726.652354827252566 ],
            [99681.44344505983463, 108713.899874027105398  ],
            [99689.519340838553035, 108701.257414629944833 ],
            [99705.035949581913883, 108677.952881089280709 ],
            [99720.544309197823168, 108654.108242479444016 ],
            [99729.634847653534962, 108641.015695524620241 ],
            [99735.326745597660192, 108632.584055277940934 ],
            [99748.632588183012558, 108612.620171609640238 ],
            [99758.548039384244476, 108598.197365873304079 ],
            [99766.62393516296288, 108584.664733306562994  ],
            [99776.440396834732383, 108571.022079336835304 ],
            [99832.435474001104012, 108488.376001806173008 ],
            [99835.190682571163052, 108483.715095098043093 ],
            [99883.373836037397268, 108410.73089713830268  ],
            [99888.331561638013227, 108403.959579882066464 ],
            [99893.65224884665804, 108396.748177013898385  ],
            [99972.035457926642266, 108303.009941673532012 ],
            [99977.636615468771197, 108295.798538805363933 ],
            [99982.594341069387156, 108289.477309106790926 ],
            [100035.454749802753213, 108227.025159996104776],
            [100063.724509591964306, 108193.628663218318252],
            [100070.059839477617061, 108186.087196141204913],
            [100076.023958627774846, 108178.435707661119523],
            [100130.814663185679819, 108107.661939706740668],
            [100136.135350394324632, 108101.34071000815311 ],
            [100141.00233559292974, 108094.129307139999582 ],
            [100151.924180343703483, 108081.036760185175808],
            [100166.698367616103496, 108061.953047740724287],
            [100177.529471964866389, 108047.980329562051338],
            [100191.297265687710023, 108030.226875899112201],
            [100231.67674458125839, 107976.756474050023826 ],
            [100235.900297838365077, 107970.875329963368131],
            [100246.450931853643851, 107957.342697396627045],
            [100250.946706316768541, 107951.351531906984746],
            [100310.323925739809056, 107873.926470045073074],
            [100385.943677122268127, 107770.196290924825007],
            [100390.439451585392817, 107764.205125435182708],
            [100421.736641150680953, 107718.506235414897674],
            [100455.137358217063593, 107673.237429060813156],
            [100458.626739130646456, 107667.696351128834067],
            [100462.850292387753143, 107661.81520704216382 ],
            [100495.607577512622811, 107616.43637928510725 ],
            [100527.911160627467325, 107569.957337498213747],
            [100532.13471388455946, 107563.966172008571448 ],
            [100535.987056406171178, 107558.535115479578963],
            [100569.387773472553818, 107511.93605034398206 ],
            [100602.425528930922155, 107465.346987154116505],
            [100607.284265002075699, 107458.135584285948426],
            [100609.305301228610915, 107459.025757455528947],
            [100624.450699236491346, 107465.787072766033816],
            [100662.264699491439387, 107492.852337899530539],
            [100676.304714420315577, 107503.054322539639543],
            [100683.275227120015188, 107508.155314859701321],
            [100701.175833697954658, 107520.807776202593232],
            [100750.555110645203968, 107556.854788597673178],
            [100785.514912800630555, 107581.809643183063599],
            [100792.864885363276699, 107586.910635503110825],
            [100863.625900674582226, 107637.600496440485585],
            [100869.218809089259594, 107641.491253327738377],
            [100874.448755895893555, 107645.702072478219634],
            [100944.112637255660957, 107696.061869206649135],
            [100949.713794797789888, 107700.27268835711584 ],
            [100955.314952339904266, 107704.043421895679785],
            [101025.341795307700522, 107754.403218624094734],
            [101029.19413782931224, 107764.495181861231686 ],
            [101113.821936392923817, 107820.946163536544191],
            [101165.214000439256779, 107858.773522270785179],
            [101266.983485854929313, 107784.989168653002707],
            [101274.696420025604311, 107779.88817633294093 ],
            [101280.289328440267127, 107775.667355236728326],
            [101383.073456532933051, 107701.552937410000595],
            [101385.820415975540527, 107699.002441249976982],
            [101389.037575683090836, 107696.451945089938818],
            [101525.676122852193657, 107638.850739656176302],
            [101633.038516682529007, 107559.185241951738135],
            [101712.865323067177087, 107460.446033748565242],
            [101718.458231481854455, 107453.674716492329026],
            [101797.922076258459128, 107376.899781102591078],
            [101803.886195408631465, 107370.898613667217433],
            [101810.584486902298522, 107365.027471526293084],
            [101863.890348518252722, 107313.31741212491761 ],
            [101892.795291121525224, 107285.241950473136967],
            [101899.765803821224836, 107278.480635162632097],
            [101905.820663373393472, 107272.599491075976402],
            [102017.117890999899828, 107179.2813374560792  ],
            [102023.816182493581437, 107172.840084408788243],
            [102030.151512379219639, 107166.968942267863895],
            [102097.216918590565911, 107097.395407800548128],
            [102105.012344035800197, 107090.1840049323946  ],
            [102112.725278206475195, 107082.082428894660552],
            [102182.999594997920212, 107009.188248446444049],
            [102191.809663120147889, 107001.086672408710001],
            [102200.891952448408119, 106993.095117773948004],
            [102307.404686150854104, 106878.142755549561116],
            [102313.368805301011889, 106871.82152585098811 ],
            [102318.961713715689257, 106865.380272803697153],
            [102330.889952016004827, 106850.957467067375546],
            [102375.286755980268936, 106769.191560760547873],
            [102379.502060109909507, 106761.089984722813824],
            [102384.088574975045049, 106752.988408685079776],
            [102413.991662000393262, 106707.279516719063395],
            [102446.278746860320098, 106657.239782253862359],
            [102452.977038354001706, 106649.138206216113758],
            [102458.297725562646519, 106641.486717736028368],
            [102524.439229499010253, 106554.04970820278686 ],
            [102529.297965570163797, 106547.728478504213854],
            [102602.682203412245144, 106454.970433844951913],
            [102669.095928554612328, 106368.863683093208238],
            [102677.353305137337884, 106358.101589492463972],
            [102696.43353694138932, 106334.356970339882537 ],
            [102740.731351376191014, 106278.656134593984461],
            [102779.716727729784907, 106229.836637507309206],
            [102820.90462111395027, 106178.796708469541045 ],
            [102870.712852688870043, 106118.765030224458314],
            [102901.713073665770935, 106086.808813631156227],
            [102918.871258772735018, 106067.615079783718102],
            [102936.021194752247538, 106048.41134399054863 ],
            [102938.957884126328281, 106043.640415879446664],
            [103141.391471878654556, 105822.377372537608608],
            [103211.005858473668923, 105745.702456605125917],
            [103237.246332908878685, 105735.600491422257619],
            [103302.199962491678889, 105709.505415024148533],
            [103308.898253985360498, 105706.834895515421522],
            [103317.700072980136611, 105703.394226185802836],
            [103346.877236789427116, 105692.182045027409913],
            [103352.470145204089931, 105690.071634479303611],
            [103361.651424061812577, 105685.740791980118956],
            [103378.157928099812125, 105677.199130330453045],
            [103387.974389771581627, 105671.428007646769402],
            [103489.248927539927536, 105612.476539540060912],
            [103566.666988707642304, 105539.902421355072875],
            [103640.224458226279239, 105476.200029028696008],
            [103732.77141914695676, 105398.394893229211448 ],
            [103810.915403530729236, 105332.912154563673539],
            [103904.839968736429, 105258.997775651456323   ],
            [103927.764293934626039, 105238.243738270830363],
            [103931.253674848208902, 105236.023306319737458],
            [103956.603243518256932, 105289.373684820122435],
            [103955.877320302184671, 105313.888453793580993],
            [104120.562900819189963, 105300.505850412708241],
            [104253.959540898373234, 105290.013809346550261],
            [104366.997334417930688, 105281.532159371243324],
            [104412.689251392672304, 105277.741421941231238],
            [104447.088112881145207, 105274.840857680814224],
            [104456.541612944885856, 105274.390770123165566],
            [104492.689289453875972, 105271.490205862734001],
            [104502.505751125660026, 105270.60003269315348 ],
            [104511.959251189386123, 105269.819880926559563],
            [104632.511999820708297, 105260.658098641899414],
            [104643.706065777514596, 105259.767925472318893],
            [104653.794748655302101, 105258.987773705724976],
            [104779.577444093258237, 105248.605754042553599],
            [104792.520325070581748, 105247.715580872973078],
            [104871.868682062820881, 105218.389876005501719],
            [104964.234162179476698, 105183.063003702656715],
            [104971.212924006642425, 105180.172441387956496],
            [105052.945278833460179, 105148.84634737536544 ],
            [105124.580701655024313, 105122.511224279849557],
            [105147.694756784680067, 105113.62949647550704 ],
            [105173.291799278391409, 105104.187659710543812],
            [105208.878535120427841, 105089.96489288873272 ],
            [105211.361522484454326, 105089.294762525110855],
            [105243.186656206889893, 105080.513054178038146],
            [105257.135930733755231, 105080.062966620374937],
            [105315.671739156343392, 105080.473046395127312],
            [105428.247581538424129, 105081.303207890348858],
            [105438.064043210193631, 105081.293205944632064],
            [105447.51754327393428, 105081.733291556549375 ],
            [105607.979570533847436, 105082.973532826537848],
            [105618.167242941097356, 105083.403616492738365],
            [105627.983704612866859, 105083.403616492738365],
            [105684.110767818521708, 105042.765711009604274],
            [105690.437848576722899, 105038.10480430147436 ],
            [105696.121497393396567, 105033.443897593329893],
            [105700.980233464550111, 105028.893012288186583],
            [105733.902501138538355, 104993.596145822521066],
            [105758.105441092295223, 104967.621092773129931],
            [105807.707444480838603, 104912.790426305364235],
            [105813.663314503544825, 104906.459194661059882],
            [105820.081135663742316, 104899.687877404823666],
            [105884.449077197219594, 104829.534230085424497],
            [105891.139119563435088, 104825.32341093494324 ],
            [105901.038072509763879, 104812.220862034402671],
            [105968.796405427347054, 104737.636352758563589],
            [106037.462142365024192, 104663.151862939994317],
            [106045.249318682792364, 104651.169531960709719],
            [106059.281084484202438, 104637.956961657182546],
            [106070.557641715568025, 104628.18506068327406 ],
            [106126.21450465626549, 104574.7946743999928   ],
            [106182.778771617056918, 104519.843984583523707],
            [106188.099458825701731, 104515.073056472407188],
            [106193.329405632350245, 104509.962062206614064],
            [106268.685184936242877, 104436.13770080593531 ],
            [106275.012265694429516, 104430.146535316293011],
            [106280.976384844587301, 104423.815303671988659],
            [106356.612634481964051, 104350.441029828944011],
            [106360.827938611604623, 104345.340037508882233],
            [106351.737400155892828, 104335.918204635367147],
            [106276.002160989068216, 104257.642977386785788],
            [106271.135175790448557, 104252.54198506672401 ],
            [106266.177450189832598, 104246.670842925799661],
            [106179.239895938750124, 104157.643524022190832],
            [106174.00994913210161, 104152.212467493183794 ],
            [106168.40879158997268, 104146.671389561190153 ],
            [106118.922275985809392, 104088.910152995827957],
            [106064.296553977008443, 104026.938097279984504],
            [106074.84718799230177, 104022.707274238055106 ],
            [106088.507743058231426, 104017.596279972261982],
            [106095.568996159941889, 104015.48586942415568 ],
            [106069.056300518699572, 103867.62710576254176 ],
            [106068.041657841706183, 103860.86579045203689 ],
            [106066.573313154673087, 103854.094473195800674],
            [106048.887183890561573, 103751.054428330622613],
            [106048.144762419586186, 103738.401966987730702],
            [106046.486687801079825, 103725.209400575651671],
            [106031.242300263751531, 103560.707399226623238],
            [106031.976472607260803, 103553.045908800821053],
            [106032.702395823333063, 103546.284593490301631],
            [106050.413272469799267, 103411.708413752290653],
            [106051.510406421337393, 103404.046923326473916],
            [106052.516799970879219, 103398.615866797466879],
            [106063.174672643101076, 103292.665255726140458],
            [106063.545883378581493, 103289.11456499354972 ],
            [106064.263557467187638, 103275.03182541190472 ],
            [106066.622807919397019, 103231.323322591008036],
            [106071.613530029833782, 103139.355431644071359],
            [106072.248712843895191, 103132.584114387835143],
            [106072.9746360599529, 103125.702775728612323  ],
            [106079.136734269035514, 103009.550180017162347],
            [106079.227474671046366, 103002.348779094725614],
            [106079.953397887118626, 102995.577461838489398],
            [106087.130138773194631, 102887.416420761801419],
            [106087.864311116718454, 102880.975167714510462],
            [106088.590234332776163, 102874.213852404005593],
            [106099.974030221055727, 102754.620587362936931],
            [106101.43412578063726, 102742.298190229004831 ],
            [106108.404638480336871, 102742.298190229004831],
            [106231.234146289309138, 102745.428799241111847],
            [106237.561227047495777, 102745.428799241111847],
            [106244.622480149220792, 102745.86888485304371 ],
            [106363.409915505108074, 102750.229733189407852],
            [106370.471168606818537, 102750.659816855608369],
            [106387.258142978287651, 102751.099902467525681],
            [106498.794595300991205, 102752.790231295162812],
            [106513.106831435885397, 102753.010274101121468],
            [106640.984805247484474, 102764.562521414190996],
            [106647.955317947184085, 102765.00260702612286 ],
            [106648.310030427761376, 102752.360147628962295],
            [106648.928714986905106, 102716.743218900082866],
            [106650.157834977741004, 102637.867874907955411],
            [106650.520796585769858, 102631.436623806395801],
            [106651.246719801842119, 102624.665306550159585],
            [106654.73610071541043, 102506.412302236334654 ],
            [106654.73610071541043, 102501.311309916272876 ],
            [106655.46202393148269, 102496.210317596211098 ],
            [106660.238268728076946, 102372.176188652985729],
            [106660.238268728076946, 102367.965369502504473],
            [106660.964191944149206, 102362.864377182442695],
            [106671.605566361438832, 102235.609621715571848],
            [106672.512970381518244, 102224.627485308854375],
            [106666.557100358812022, 102225.077572866517585],
            [106594.179256066287053, 102218.696331493571051],
            [106582.894449707469903, 102208.494346853462048],
            [106577.012821831856854, 102199.182535382919014],
            [106575.63521754683461, 102191.080959345184965 ],
            [106576.45188116490317, 102178.658542753983056 ],
            [106579.627795235181111, 102129.178917249417282],
            [106581.087890794762643, 102122.407599993181066],
            [106586.037367267927038, 102116.866522061187425],
            [106590.62388213306258, 102112.645700964989373 ],
            [106594.839186262703151, 102109.205031635385239],
            [106601.529228628918645, 102104.204058772578719],
            [106683.715285465776105, 102111.805537524036481],
            [106685.045792185570463, 102111.930253158789128],
        ];

        var latLngs = coords.map(function (coord) {
            var point = {x:coord[0], y:coord[1]}
            var projected = Proj4js.transform(projection, Proj4js.WGS84, point);

            // I don't know why the x and y properties are backwards here xD
            return new L.LatLng(projected.y, projected.x);
        });

        console.log(latLngs);
        map.addLayer(new L.Polyline(latLngs, {color:'red'}));

    }

    addPath();

    window.Yeca || (window.Yeca = {});
    window.Yeca.map = map;
})();