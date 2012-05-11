function getURLParameter(name) {
    var rv = (RegExp(name + '=' + '(.+?)(&|$)').exec(location.search)||[,null])[1];
    return rv ? decodeURI(rv) : rv;
}

