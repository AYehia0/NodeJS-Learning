const fileSystem = require("fs");
const fileName = "names.txt"
const newFileName = "new_" + fileName;
var toWrite = "This is an example\nName, age\nAhmed, 18\nMohamed, 29\nSayed, 19";

fileSystem.writeFile(fileName, toWrite, (err)=> {
    if (err)
        console.log(err);
    else{
        console.log("No errors\n");
        //printing out the content of the names.txt
        //passing the encoding method is important, otherwise would print a buffer string 

        fileSystem.readFile(fileName, "utf8", (err, file)=>{
            if (!err){
                //no loops is required 
                console.log(file);
            }
            else{
                console.log(`Error : ${err}`);
            }
        })
    }
        
});

//renaming the file
fileSystem.rename(fileName, newFileName, (err) => {
    if (!err)
        console.log("File's name has been changed!!");
    else
        console.log(err);
});

