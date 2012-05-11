var res = [90, 50, 30, 15, 7.5, 4, 2, 1, 0.5, 0.2]
	,start = new L.LatLng(-34.61139, -58.38044)
	,map = new L.Map('map', {
		crs: L.CRS.proj4js('SR-ORG:7128','+title=Gauss-Kruger Bs.As. +proj=tmerc +lat_0=-34.629243 +lon_0=-58.463196 +k=0.9999980000000001 +x_0=100000 +y_0=100000 +ellps=intl +units=m +no_defs'
				,new L.Transformation(1, -54340, -1, 54090))
				,scale: function(zoom) {
						return 1 / res[zoom];
				}
	,continuousWorld: false
	})
	,mapUrl = 'http://tiles1.mapa.buenosaires.gob.ar/tilecache/mapabsas_default'
	,attrib = 'Map data &copy; 2011 USIG, Imagery &copy; 2011 USIG'
	,tilelayer = new L.TileLayer.WMS(mapUrl, {
		scheme: 'wms'
		,maxZoom: 9
		,minZoom: 0
		,worldCopyJump: false
		,continuousWorld: true
		,format: 'image/png'
		,transparent: true
		,attribution: attrib
		,layers: 'mapabsas_default'
	});
map.addLayer(tilelayer);
map.on('locationfound', onLocationFound);
map.on('locationerror', onLocationError);
map.on('click',onClickEvt)
map.locateAndSetView(4);
//map.setView(start, 6);

addPath();

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

function onClickEvt(e){
    map.addLayer(new L.Marker(e.latlng));
	console.log(map.project(e.latlng,map.getZoom()).x+', '+map.project(e.latlng,map.getZoom()).y);
	console.log(e.latlng.lat+', '+e.latlng.lng);
    console.log(map.latLngToLayerPoint(e.latlng));

}

function addPath() {
    var coords = [
        [-34.628828609076315, -58.42606464421627],
        [-34.621392421493994, -58.42753999352168],
        [-34.620307034386975, -58.41658210376545],
        [-34.614763485504895, -58.41691229617314],
        [-34.612452541696655, -58.39140101131062],
//      [3270.9999999268457, -3057.999801682048 ],
//      [3261.9999999299007, -3112.999801691695 ],
//      [3328.9999999084307, -3120.999801693005 ],
//      [3326.9999999091106, -3161.9998017002063],
//      [3482.9999998587496, -3178.9998017031107]
    ];

    var latLngs = [];
    for (var i = 0; i < coords.length; i++) {
        var coord = coords[i];
        latLngs.push(new L.LatLng(coord[0], coord[1]));
    }
    console.log(latLngs);
    map.addLayer(new L.Polyline(latLngs, {color: 'red'}));

}