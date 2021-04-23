//const fileSystem = require("fs");
const fileName = "names.txt"
const newFileName = "new_" + fileName;
var toWrite = "This is an example\nName, age\nAhmed, 18\nMohamed, 29\nSayed, 19";

// fileSystem.writeFile(fileName, toWrite, (err)=> {
//     if (err)
//         console.log(err);
//     else{
//         console.log("No errors\n");
//         //printing out the content of the names.txt
//         //passing the encoding method is important, otherwise would print a buffer string 

//         fileSystem.readFile(fileName, "utf8", (err, file)=>{
//             if (!err){
//                 //no loops is required 
//                 console.log(file);
//             }
//             else{
//                 console.log(`Error : ${err}`);
//             }
//         })
//     }
        
// });

//renaming the file
// fileSystem.rename(fileName, newFileName, (err) => {
//     if (!err)
//         console.log("File's name has been changed!!");
//     else
//         console.log(err);
// });


//appending to a file
// fileSystem.appendFile(newFileName, "Another data to append to the end of a file", (err) =>{
//     if (!err)
//         console.log("Appending Done");
//     else
//         console.log(err);
// });

// Creating and deleting dir 


//create 
// fileSystem.mkdir("test_dir", (err) => {
//     if(!err)
//         console.log("File has been created!!");
//     else
//         console.log("File exists or idk")
// });


//delete
// fileSystem.rmdir("test_dir", (err) => {
//     if(!err)
//         console.log("Dir has been deleted !!");
//     else {
//         // maybe it doesn't exist 
//          fileSystem.access("test_dir", (err) => {
//             if(!err)
//                 console.log("Dir exists");
//             else {
//                 console.log("Dir doens't exist ,,, creating one....\n");
//                 fileSystem.mkdir("test_dir", function (err) {
                    
//                     if(!err)
//                         console.log("Dir has been created!!");
//                     else 
//                         console.log(err)
//                 })
//             }
//          });
//     }

// });


// const fs1 = require('fs/promises')

// var filesToAdd = [];

// const readDir = async () => {
//   const files = await fs1.readdir('.')
//   for (file of files) {
//     filesToAdd.push(file);
//   }
// }
// readDir()

//reading in dir ,,, aka ls

fileSystem.readdir(".", function(err, files){
    if (!err){
        for(let file of files){
            console.log(file);
            //console.log(fileInDir);
        }
    } 
    else
        console.log(err)
});


// console.log(fileInDir);
// const iAmGood = () => 
//     (![] + [])[+[]] +
//     (![] + [])[+!+[]] +
//     ([![]] + [][[]])[+!+[] + [+[]]] +
//     (![] + [])[!+[] + !+[]]

// iAmGood()