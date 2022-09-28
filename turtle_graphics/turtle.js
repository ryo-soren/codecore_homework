class Turtle{

    constructor(x, y){
        this.x = x
        this.y = y
        this.arrayOfPOS = [[x, y]]
        this.direction = "right"
        this.position = ""
    }

    forward(increase) {

        const lastValX = this.arrayOfPOS[this.arrayOfPOS.length-1][0]
        const lastValY = this.arrayOfPOS[this.arrayOfPOS.length-1][1]
        

        switch (this.direction) {

            case "right":
                
                if (this.arrayOfPOS[0] === this.arrayOfPOS[this.arrayOfPOS.length-1]) {
                    for (let i = 1; i <= increase; i++) {
                        this.arrayOfPOS.push([this.x + i, this.y])
                    }
                } else {
                    for (let i = 1; i <= increase; i++) {
                        this.arrayOfPOS.push([lastValX + i, lastValY])   
                    }   
                }
                return this;

            case "down":
                if (this.arrayOfPOS[0] === this.arrayOfPOS[this.arrayOfPOS.length-1]) {
                    for (let i = 1; i <= increase; i++) {
                        this.arrayOfPOS.push([this.x, this.y + i])
                    }
                } else {
                    for (let i = 1; i <= increase; i++) {
                        this.arrayOfPOS.push([lastValX, lastValY + i])   
                    }   
                }
                return this;
                
            case "left":
                if (this.arrayOfPOS[0] === this.arrayOfPOS[this.arrayOfPOS.length-1]) {
                    for (let i = 1; i <= increase; i++) {
                        this.arrayOfPOS.push([this.x - i, this.y])
                    }
                } else {
                    for (let i = 1; i <= increase; i++) {
                        this.arrayOfPOS.push([lastValX - i, lastValY])   
                    }   
                }
                return this;
                
            case "up":
                if (this.arrayOfPOS[0] === this.arrayOfPOS[this.arrayOfPOS.length-1]) {
                    for (let i = 1; i <= increase; i++) {
                        this.arrayOfPOS.push([this.x, this.y - i])
                    }
                } else {
                    for (let i = 1; i <= increase; i++) {
                        this.arrayOfPOS.push([lastValX, lastValY - i])   
                    }   
                }
                return this;
                
            default:
                break;
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
        
        this.arrayOfPOS.forEach(element => {
            xArray.push(element[0]);
        });
        
        this.arrayOfPOS.forEach(element => {
            yArray.push(element[1]);
        });
        
        const maxWidth = Math.max(...xArray);
        const maxHeight = Math.max(...yArray);


    }
}

// t1 = new Turtle(3,0).forward(10)
// console.log(t1)

t2 = new Turtle(0,2)
console.log(t2.forward(5))
console.log(t2.right().forward(2).left().forward(5).left().forward(2).print()); 


// console.log(t2.forward(2).allPoints())
