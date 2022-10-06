const readLine = require('readline');

const rl = readLine.createInterface({
  input: process.stdin,
  outout: process.stdout,
});


rl.question(`(v) View • (n) New • (cX) Complete • (dX) Delete • (q) Quit\n`, (input) => {
    console.log(input);
});

let listArr = []
let count = 0

rl.on(`line`, (input)=>{

    switch (input) {
        case "v":
            
            break;
    
        case "n":

                rl.setPrompt(`Task: \n`);
                rl.prompt();                        
                rl.on(`line`, (input)=>{})
                    listArr.push([count+" "+"[]"+" "+input])
                    console.log(listArr);
                    rl.setPrompt(`(v) View • (n) New • (cX) Complete • (dX) Delete • (q) Quit`);
                    rl.prompt();

            break;
    
        case "c":
            
            break;
    
        case "d":
            
            break;
    
        case "q":
            
            break;
    
        default:
            break;
    }
})