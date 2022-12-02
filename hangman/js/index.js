$(document).ready(function(){

    function lettersContainer(){
        for (let index = 0; index < 26; index++) {
            const letter = String.fromCharCode(index+65)
            $(".letters").append(`
                <button 
                    type="button" 
                    class="letter btn btn-outline-dark m-1"
                    id = "${letter}"
                    value = ${letter}
                    >${letter}</
                button>
            `)
        }
    }

    function wordCheck() {
        const word = ['B','L','O','B']
        for (let index = 0; index < word.length; index++) {
            $(".guesses").append(`
                <div 
                class="my-4 guess ${word[index]}"
                id="${index}">
                    ${" "}
                </div>
            `);
        }
        let guesses = 0
        let wrongGuesses = 0
        let guessArr = []
        let imgIndex = 1

        $(".letter.btn-outline-dark").click((event) => {
            $(event.target).toggleClass("btn-dark text-white").css("pointer-events", "none")
            guesses++
            const target = event.target.value
            if (word.includes(target)) {

                $(`.guess.${target}`).text(`${target}`) 

                word.forEach(letter => {
                    if (letter === target) {
                        guessArr.push(target)
                    }
                })

            }else{
                wrongGuesses++
                $("img").attr("src", `./assets/hangman-assets/gallows${imgIndex}.jpg`)
                imgIndex++
            }
                        
            if (guessArr.length === word.length) {
                setTimeout(()=>{
                    if(confirm((`You won in ${guesses} guesses! Press ok to play again`))){
                        location.reload()
                    }            
                }, 100)
            }else if (wrongGuesses === 6) {
                setTimeout(()=>{
                    if(confirm(("No more guesses! Press ok to play again"))){
                        location.reload()
                    }            
                }, 100)
            }
        })        
    }

    lettersContainer()
    wordCheck()
})

