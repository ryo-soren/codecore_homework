const readline = require("readline")
const rl = readline.createInterface({

    input: process.stdin,
    output: process.stdout

});

const todoList = {

    count : 0,
    taskList : [],

    view(){
        console.log(this.taskList.join("\n"))
        this.main()

    },

    newTask(){
        rl.question("Task:\n>", (task) => {
            console.log(`Task added to list: ${task}`);
            this.taskList.push([this.count+" "+"[]"+" "+task])
            this.count++
            this.main()
        })
    },

    complete(digit){
        const taskToComplete = this.taskList[digit-1].toString().split(" "); // takes specific list element and returns an array 
        taskToComplete.splice(1, 1, "[\u2713]") // replaces [] with [x]
        this.taskList.splice((digit - 1), 1, taskToComplete.join(" ")) // replaces list element with the one that has x
        this.main();
    },

    delete(digit){
        const deleted = this.taskList[digit-1]
        const arrOfDeleted = deleted.toString().split(" ")
        console.log(`Completed "${arrOfDeleted[2]}"`);
        this.taskList.splice((digit - 1), 1)
        this.main()
    },

    quit(){
        rl.close()
    },

    main() {
        rl.question("(v) View • ( n ) New • (cX) Complete • (dX) Delete • (q) Quit\n>", (input) => {
            switch (input[0]) {
                case "v":
                    this.view();
                    break;
                case "n":
                    this.newTask();
                    break;
                case "c":
                    this.complete(input[1]);
                    break;
                case "d":
                    this.delete(input[1]);
                    break;          
                case "q":
                    this.quit();
                    break;
            }
        })
    }
}

todoList.main();