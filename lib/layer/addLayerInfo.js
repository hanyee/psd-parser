/**
 * Created by Gqb on 14/11/18.
 */

var ref = [
    require('../layerInfo/layerId')
    ],

    LAYER_INFO = {};

ref.forEach(function(o){
    LAYER_INFO[o.id] = o;
});

module.exports = function(file, endPos){
    var o = {};
    while (file.pos < endPos){
        var sig = file.readString(4),
            key = file.readString(4),
            len = file.pad2(file.readInt()),
            end = file.pos + len;

        if(LAYER_INFO[key]){
            o[key] = LAYER_INFO[key].parse(file);
        }
        file.pos = end;
    }

    return o;
};