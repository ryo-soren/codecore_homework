// const readline = require('readline');
// const rl = readline.createInterface({
//     input: process.stdin,
//     output: process.stdout
// });

// rl.question('Choose any two numbers \n', numbers => {   
//     numbers = numbers.split(' ').map(n => n = parseInt(n));
//     let numArr = [];
//     if (numbers[0] > numbers[1]) {
//         numArr.push(numbers[1], numbers[0]);
//     } else {numArr = numbers;};
//     const num = Math.ceil(Math.random() * (numArr[1]-numArr[0]) + numArr[0]);
//     let counter = 1;
//     let reply = `Pick a number between ${numArr[0]} and ${numArr[1]}\n`;   

//     const check = () => {rl.question(`${reply}`, (guess) => {
//         let answer = `${num} is correct! You guessed right after ${counter} guess`;
//             if (guess == num) {
//                 if (counter === 1) {
//                     console.log(`\"${answer}\"`)
//                     rl.close();
//                 } else {
//                     console.log(`\"${answer}es\"`);
//                     rl.close();
//                 }
//             } else if (guess < num) {
//                 counter++;
//                 console.log(`Good guess, however it\'s higher than ${guess}`);
//                 check();
//             } else if (guess > num) {
//                 counter++;
//                 console.log(`Good guess, however it\'s lower than ${guess}`)
//                 check();
//             };
//         });
//     };
//     check();
// });

var rl = require('readline').createInterface({
    input: require('fs').createReadStream('small.csv')
  });
  
  global.myarray = [];
  rl.on('line', function (line) {
    console.log('Line from file:', line);
    global.myarray.push(line);
  });
  
  rl.on('close', function () {
      console.log(global.myarray);
  });