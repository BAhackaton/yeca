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
//map.on('click',onClickEvt)
map.locateAndSetView(4);
//map.setView(start, 6);

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
/*
function onClickEvt(e){
	map.addLayer(new L.Marker(e.latlng))
	window.console.log(map.project(e.latlng,map.getZoom()).x+', '+map.project(e.latlng,map.getZoom()).y);
	window.console.log(e.latlng.lat+', '+e.latlng.lng);
}*/