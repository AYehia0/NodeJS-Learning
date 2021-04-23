const fileSystem = require("fs");


//create a readable stream
//Since createReadStream inherates from eventEmitter an listener could be used
//Readable Streams is very good in reading very big files and it uses a very smol buffer compared to the readFile method (full buffer)
const readStream = fileSystem.createReadStream('names.txt', "utf8");

const writeStream = fileSystem.createWriteStream("test_file.txt");

//The data is printed as chunks buffer which is good, as you don't have to wait for the whole file to be read,,, 
// readStream.on("data", (chunk) => {
//     console.log(chunk);

//     //we can write data to a file, while reading it ,,, wow
//     writeStream.write(chunk);
// })


// there is a much simple way to read data from a stream and write it to a stream using pipes
readStream.pipe(writeStream);