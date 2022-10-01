class Turtle{

    constructor(x, y){
        this.x = x
        this.y = y
        this.arrayOfPOS = [[x, y]]
        this.direction = "right"

    }

    forward(increase) {

        const lastValX = this.arrayOfPOS[this.arrayOfPOS.length-1][0]
        const lastValY = this.arrayOfPOS[this.arrayOfPOS.length-1][1]
        

        switch (this.direction) {

            case "right":
                
                if (this.arrayOfPOS[0] === this.arrayOfPOS[this.arrayOfPOS.length-1]) {
                    for (let i = 1; i <= increase; i++) {
                        this.arrayOfPOS.push([parseInt(this.x) + i, this.y])
                    }
                } else {
                    for (let i = 1; i <= increase; i++) {
                        this.arrayOfPOS.push([parseInt(lastValX) + i, lastValY])   
                    }   
                }
                return this;

            case "down":
                if (this.arrayOfPOS[0] === this.arrayOfPOS[this.arrayOfPOS.length-1]) {
                    for (let i = 1; i <= increase; i++) {
                        this.arrayOfPOS.push([this.x, parseInt(this.y) + i])
                    }
                } else {
                    for (let i = 1; i <= increase; i++) {
                        this.arrayOfPOS.push([lastValX, parseInt(lastValY) + i])   
                    }   
                }
                return this;
                
            case "left":
                if (this.arrayOfPOS[0] === this.arrayOfPOS[this.arrayOfPOS.length-1]) {
                    for (let i = 1; i <= increase; i++) {
                        this.arrayOfPOS.push([parseInt(this.x) - i, this.y])
                    }
                } else {
                    for (let i = 1; i <= increase; i++) {
                        this.arrayOfPOS.push([parseInt(lastValX) - i, lastValY])   
                    }   
                }
                return this;
                
            case "up":
                if (this.arrayOfPOS[0] === this.arrayOfPOS[this.arrayOfPOS.length-1]) {
                    for (let i = 1; i <= increase; i++) {
                        this.arrayOfPOS.push([this.x, parseInt(this.y) - i])
                    }
                } else {
                    for (let i = 1; i <= increase; i++) {
                        this.arrayOfPOS.push([lastValX, parseInt(lastValY)- i])   
                    }   
                }
                return this;
            }
    }

    right(){

        if (this.direction === "right") {
            this.direction = "down"
            return this;
        } else if (this.direction === "left"){
            this.direction = "up"
            return this;
        }else if(this.direction === "down"){
            this.direction = "left"
            return this;
        }else if(this.direction === "up"){
            this.direction = "right"
            return this;
        }
    }

    left(){

        if (this.direction === "right") {
            this.direction = "up"
            return this;
        } else if (this.direction === "left"){
            this.direction = "down"
            return this;
        }else if(this.direction === "down"){
            this.direction = "right"
            return this;
        }else if(this.direction === "up"){
            this.direction = "left"
            return this;
        }
    }

    allPoints(){
        return this.arrayOfPOS;
    }

    print(){

        let xArray = [];
        let yArray = [];
        let position = ""

        this.arrayOfPOS.forEach(element => {
            xArray.push(element[0]);
        });
        
        
        this.arrayOfPOS.forEach(element => {
            yArray.push(element[1]);
        });
        
        const maxWidth = Math.max(...xArray);
        const maxHeight = Math.max(...yArray);
        const minWidth = Math.min(...xArray);
        const minHeigth = Math.min(...yArray);

            for (let y = minHeigth; y <= maxHeight; y++) {
                for (let x = minWidth; x <= maxWidth+1; x++) {
                    const includes = (x, y) =>{
                        for (const element of this.arrayOfPOS) {
                            if (x === element[0] && y === element[1]){
                                return true;
                            }else{ 
                                continue;
                            }
                        }
                    }
                    if (includes(x, y) === true) {
                        position += "x"
                    }else{
                        position += " "
                    }
                }
                position += "\n"
            }

        console.log("-- START LOG");
        console.log(position);
        console.log("-- END LOG");
        return position;
    }
}

new Turtle(0, 4)
.forward(3)
.left()
.forward(3)
.right()
.forward(5)
.right()
.forward(8)
.right()
.forward(5)
.right()
.forward(3)
.left()
.forward(3)
.print();

module.exports = Turtle