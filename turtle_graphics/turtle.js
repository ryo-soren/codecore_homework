class Turtle{

    constructor(x, y){
        this.x = x
        this.y = y
        this.arrayOfPOS = [[x, y]]
        this.direction = "right"
        this.position = ""
    }

    forward(increase) {

        const lastVal = this.arrayOfPOS[this.arrayOfPOS.length-1][0]
        switch (this.direction) {

            case "right":
                
                if (this.arrayOfPOS[0] === this.arrayOfPOS[this.arrayOfPOS.length-1]) {
                    
                    for (let i = 1; i <= increase; i++) {
                        
                        this.arrayOfPOS.push([i+this.x, this.y])
                        
                    }
                } else {

                    for (let i = 1; i <= increase; i++) {
                        
                        this.arrayOfPOS.push([i + lastVal, this.y])
                        
                    }
                    
                }
                
                if (this.y == 0 && this.x !== 0){
                    
                    this.position = "-".repeat(this.x)
                    
                }else if (this.y !== 0 || this.x !== 0) {
                    for (let moveY = 0; moveY < this.y; moveY++) {
                        this.position += "\n"
                        for (let moveX = 1; moveX < this.x; moveX++) {
                            this.position += "-".repeat(this.x-1)
                        }
                    }
                }
                
                
                if (increase <= 0) {
                    this.forwardOutput = this.position + ".".repeat(0) + "*"
                } else {
                    this.forwardOutput = this.position + ".".repeat(increase - 1) + "*"      
                }
                return this;

            case "down":

                if (this.arrayOfPOS[0] === this.arrayOfPOS[this.arrayOfPOS.length-1]) {
                    
                    for (let i = 1; i <= increase; i++) {
                        
                        this.arrayOfPOS.push([i+this.x, this.y])
                        
                    }
                } else {

                    for (let i = 1; i <= increase; i++) {
                        
                        this.arrayOfPOS.push([i + lastVal, this.y])
                        
                    }
                    
                }
                
                if (this.y == 0 && this.x !== 0){
                    
                    this.position = "-".repeat(this.x)
                    
                }else if (this.y !== 0 || this.x !== 0) {
                    for (let moveY = 0; moveY < this.y; moveY++) {
                        this.position += "\n"
                        for (let moveX = 1; moveX < this.x; moveX++) {
                            this.position += "-".repeat(this.x-1)
                        }
                    }
                }
                
                
                if (increase <= 0) {
                    this.forwardOutput = this.position + ".".repeat(0) + "*"
                } else {
                    this.forwardOutput = this.position + ".".repeat(increase - 1) + "*"       
                }
                return this;
                
            default:
                break;
        }


    }

    right(){
        if (this.direction === "right") {
            this.direction === "down"
            return this;
        } else if (this.direction === "left"){
            this.direction === "up"
            return this;
        }else if(this.direction === "down"){
            this.direction === "left"
            return this;
        }else if(this.direction === "up"){
            this.direction === "right"
            return this;
        }

    }

    left(){

    }

    allPoints(){

        return this.arrayOfPOS;

    }

    print(){

        const arrayOfRows = this.forwardOutput.split("\n")
        // this.grid = []

        // for (const row of arrayOfRows) {
        //     grid.push(row.reverse())
        // }

        console.log(arrayOfRows)//this.grid);
    }

}

t1 = new Turtle(3,0).forward(10)
// console.log(t1)

t2 = new Turtle(0,2)
console.log(t2.forward(5).right().forward(2).allPoints())


console.log(t2.forward(2).allPoints())
