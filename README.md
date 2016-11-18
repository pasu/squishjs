# squishjs
squish dxt compression function   

dxt compression is so efficient but unfortunately it is not supported in these mobile systems such as Android and iOS   
and generally in our mobile application, we need not so many memories for our texture renderring, so, sometimes, we can decode dxt compression to rgb uncompressed version   
it is a compromised solution and I think it is suitable   

squish is used for dxt compression and uncompression. now, you can use it for the dxt decode in JavaScript   
and I recommend you should use it within Web Workers   

here is three simple examples   

because I think the quality of 16 bits is good enough, and it can reduced the memory space, that is why I think it is better to choose 16bit rgb if it can satisfy your need

pEncode: the original buffer of dxt   
width*height: the width and height of the texture   
pImageBuffer: the umcompressed buffer   

##DXT5:
var pEncode = new Uint8Array(data,nOffset,width*height);   
pImageBuffer = new Uint8Array(width*height*4);
Decode(pImageBuffer,width,height,pEncode, kDxt5);

##DXT1 decode to RGBA:
var pEncode = new Uint8Array(data,nOffset,width*height);   
pImageBuffer = new Uint8Array(width*height*4);   
Decode(pImageBuffer,width,height,pEncode, kDxt1);   

##DXT1 decode to RGB565:
var pEncode = new Uint16Array(data,nOffset,nSize/2);   
var pImageBuffer = new Uint16Array(width*height);   
Decode(pImageBuffer,width,height,pEncode, kDxt1 | krgb565);

##License
I disclaims copyright to this source code,just bless you can use it and give me your suggestion.
