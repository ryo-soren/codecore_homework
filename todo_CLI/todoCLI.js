const readline = require("readline")
const rl = readline.createInterface({

    input: process.stdin,
    output: process.stdout

});

const todoList = {

    count : 0,
    taskList : [],

    view(){
        console.log(this.taskList.join("\n"));
        this.main();
    },

    newTask(){
        rl.question("Task:\n>", (task) => {
            console.log(`Task added to list: ${task}`);
            this.taskList.push([this.count+" "+"[]"+" "+task]);
            this.count++
            this.main();
        })
    },

    complete(digit){
        const taskToComplete = this.taskList[digit].toString().split(" "); // takes specific list element and returns an array 
        taskToComplete.splice(1, 1, "[\u2713]"); // replaces [] with [checkmark]

        const taskSplit = this.taskList[digit].toString().split("");
        const indexToSlice = taskSplit.indexOf("]");
        console.log(`Completed "${taskSplit.slice(indexToSlice +1).join("").trim()}"`);

        this.taskList.splice((digit), 1, taskToComplete.join(" ")); // replaces list element with the one that has x
        this.main();
    },

    delete(digit){
        const taskToDelete = this.taskList[digit].toString().split("");
        const indexToSlice = taskToDelete.indexOf("]");
        console.log(`Deleted "${taskToDelete.slice(indexToSlice +1).join("").trim()}"`);
        this.taskList.splice((digit), 1);
        this.main();
    },

    quit(){
        rl.close();
    },

    main() {
        rl.question("(v) View • ( n ) New • (cX) Complete • (dX) Delete • (q) Quit\n>", (input) => {
            switch (input.trim()[0]) {
                case "v":
                    this.view();
                    break;
                case "n":
                    this.newTask();
                    break;
                case "c":
                    this.complete(input.trim()[1]);
                    break;
                case "d":
                    this.delete(input.trim()[1]);
                    break;          
                case "q":
                    this.quit();
                    break;
                default:
                    console.log("Please enter a correct option!");
                    this.main();
                    break;
            }
        })
    }
}

todoList.main();