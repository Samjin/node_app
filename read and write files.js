/*
 * buffer doesn't need require since it's foundation of node, like regular data type in js. 
 */
const buf = new Buffer('hello', 'utf8') //'utf8 is default event it's not specified. 'hello' is maximum letters allowed in this buffer when set. 

console.log(buf) //68 65 6c 6c 6f -> this is one type of binary data in hexadecimal notation format. 
console.log(buf.toString()) //hello
console.log(buf.toJSON()); // { type: 'Buffer', data: [ 104, 101, 108, 108, 111 ] }   -> character set.
console.log(buf[0]); // 104
// write letter to buffer, but since buf only allow 5 letters, it will replace 'hel'
// buf.write('sam'); // samlo
// console.log(buf.toString());

const fs = require('fs')
const zlib = require('zlib') //part of Node core, allow us to gzip files
const gzip = zlib.createGzip(); //this create a "readable stream"

/*Core of readable and writeable, Stream is event emiter */
// when reading the file, it'll fill the buffer with file content. 
// However, if it's bigger than buffer, it'll read the sequence chunk by chunk. 
const readable = fs.createReadStream(__dirname + '/lorem')
const writable = fs.createWriteStream(__dirname + '/lorem1')
const compressed = fs.createWriteStream(__dirname + '/lorem.sh.gz')

// Read readable-stream and transform to WRITABLE-stream, then the writable stream is 
// convert to "WRITABLE"" and READABLE" gzip stream through zlib.createGzip()
// then transform to another WRITABLE stream and saved as lorem.gz
readable.pipe(gzip).pipe(compressed)