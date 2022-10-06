const readline = require("readline")
const rl = readline.createInterface({
    input: process.stdin,
    // "process.stdin" is an object that represents input 
    // from the terminal
    
    output: process.stdout
    // "process.stdout" is an object that represents output 
    // from the terminal 
})
const todoList = {

    count : 0,
    taskList :[],

    view(){
        console.log(this.taskList.join("\n"))
        this.main()

    },

    newTask(){
        rl.question("Task:\n", (task) => {
            console.log(task);
            this.taskList.push([this.count+" "+"[]"+" "+task])
            this.count++
            this.main()
        })
    },

    complete(digit){
        console.log(`I am here ${digit}`);
        const taskToComplete = this.taskList[digit-1]
        console.log(taskToComplete);
        this.main()
    },

    quit(){
        rl.close()
    },

    main() {
 
        rl.question("(v) View • ( n ) New • (cX) Complete • (dX) Delete • (q) Quit\n", (input) => {
            // console.log(input + 'from main');
            switch (input[0]) {
                case "v":
                    this.view();
                    break;
                case "n":
                    this.newTask();
                    break;
                case "c":
                    this.complete(input[1])
                    break;
                case "d":
                    
                    break;
                            
                case "q":
                    this.quit()
                    
            }
        })
    }
}

todoList.main()