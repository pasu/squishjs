importScripts("./squish.js");

var headerLengthInt = 31; // The header length in 32 bit ints
var off_pfFourCC = 21;

function fourCCToInt32(value) {
    return value.charCodeAt(0) +
        (value.charCodeAt(1) << 8) +
        (value.charCodeAt(2) << 16) +
        (value.charCodeAt(3) << 24);
}

var FOURCC_DXT1 = fourCCToInt32("DXT1");
var FOURCC_DXT3 = fourCCToInt32("DXT3");
var FOURCC_DXT5 = fourCCToInt32("DXT5");

var off_height = 3;
var off_width = 4;

var off_size = 1;

onmessage =function (event){
    var xhr = new XMLHttpRequest();

    xhr.open('GET', event.data, true);
    xhr.responseType = "arraybuffer";
    xhr.onload = function() {
        if(this.status == 200) {
            var arrayBuffer = this.response;
            var header = new Int32Array(arrayBuffer, 0, headerLengthInt);

            var fourCC = header[off_pfFourCC];
            var width = header[off_width];
            var height = header[off_height];
            var dataOffset = header[off_size] + 4;

            var pImageBuffer = null;
            if(fourCC == FOURCC_DXT1){
                var pEncode = new Uint8Array(arrayBuffer,dataOffset,width*height/2);
                pImageBuffer = new Uint8Array(width*height*4);
                Decode(pImageBuffer,width,height,pEncode, kDxt1);

//                var pEncode = new Uint16Array(arrayBuffer,dataOffset/2,width*height/4);
//                var pImageBuffer = new Uint16Array(width*height);
//                Decode(pImageBuffer,width,height,pEncode, kDxt1 | krgb565);
            }
            else{
                var pEncode = new Uint8Array(arrayBuffer,dataOffset,width*height);
                pImageBuffer = new Uint8Array(width*height*4);
                Decode(pImageBuffer,width,height,pEncode, kDxt5);
            }

            var obj = {
                width:width,
                height:height,
                pImageBuffer:pImageBuffer,
                dxtFormat:fourCC
            }

            postMessage(obj);
        }
    };
    xhr.send(null);
}