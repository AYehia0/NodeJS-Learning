const readLine = require("readline");


//to get from stdin and show to stdout
const rl = readLine.createInterface({input:process.stdin, output:process.stdout})

function guessNumber(num) {
   //numer is random
   
   if(num > winningNumber){
       console.log("Number is greater");
   }
   else if ( num < winningNumber){
       console.log("Number is smaller ");
   }
   else if (num == winningNumber) {
       console.log("Equal !!!");
   }
   else {
       console.log("Error");
   }

   console.log("The actual number was : " + winningNumber);
}


winningNumber = Math.floor((Math.random() * 10) + 1);
console.log(winningNumber);

rl.question("Enter a number: ", (userInput)=> {
    if (userInput == winningNumber){
        rl.close();
    }else{
        rl.setPrompt("Wrong answer \n");
        rl.prompt();
        rl.on("line", (userInput)=>{
            if(userInput == winningNumber){
                rl.close();
            }else{
                rl.setPrompt("Wrong answer \n");
                rl.prompt();
            }
        });
    }
});

rl.on("close", ()=>{
    console.log("Correct Answer !!");
});