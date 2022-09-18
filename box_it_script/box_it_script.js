function topBorder(length) {

    const line  = "\U+2501".repeat(length)
    const output = "\U+250F" + line + "\U+2513"
    console.log(output);

    }

function bottomBorder(length) {

    const line  = "\U+2501".repeat(length)
    const output = "\U+2517" + line + "\U+251B"
    console.log(output);

    }

function middleBorder(length) {

    const line  = "\U+2501".repeat(length)
    const output = "\U+2523" + line + "\U+252B"
    console.log(output);

    }

function boxIt(text) {

    const textArray = text.slice(2)
    const length = Math.max(...textArray.map((x) => x.length()))
    const output = ''

    for (const element of textArray) {

        output = topBorder(length) + "\n" + element + "\n" + bottomBorder(length)
            
        }
        
    }
