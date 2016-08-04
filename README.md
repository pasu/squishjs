# squishjs
JavaScript版本的DXT纹理解压缩

simple examples

DXT5:
var pEncode = new Uint8Array(data,nOffset,width*height);
pImageBuffer = new Uint8Array(width*height*4);
Decode(pImageBuffer,width,height,pEncode, kDxt5);

DXT3 解压缩为RGBA:
var pEncode = new Uint8Array(data,nOffset,width*height);
pImageBuffer = new Uint8Array(width*height*4);
Decode(pImageBuffer,width,height,pEncode, kDxt1);

DXT3 解压缩为RGB565:
var pEncode = new Uint16Array(data,nOffset,nSize/2);
var pImageBuffer = new Uint16Array(width*height);
var Decode(pImageBuffer,width,height,pEncode, kDxt1 | krgb565);
