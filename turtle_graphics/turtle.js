const Turtle = require("./turtle_class");

const test = process.argv[2]
const splitToString = test.split('-');
const firstElement = splitToString[0].split('')

let newTurtle = new Turtle(parseInt(firstElement[1]), parseInt(firstElement[3]))

if (firstElement[0] === "t") {   
    for (const element of splitToString) {
        switch (element[0]) {
            case "f":
                const arrOfStr = element.split(element[0])
                newTurtle.forward(parseInt(arrOfStr[1]));
                break;
                
            case "r":
                newTurtle.right();
                break;
                    
            case "l":
                newTurtle.left();
                break
            
            default:
                break;
        }
    }
}else{
    newTurtle = new Turtle(0,0)
    for (const element of splitToString) {
        switch (element[0]) {
            case "f":
                const arrOfStr = element.split(element[0])
                newTurtle.forward(parseInt(arrOfStr[1]));
                break;

            case "r":
                newTurtle.right();
                break;

            case "l":
                newTurtle.left();
                break
        
            default:
                break;
        }
    }
}
console.log(newTurtle.allPoints());
newTurtle.print()
