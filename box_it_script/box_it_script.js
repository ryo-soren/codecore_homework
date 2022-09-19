function topBorder(topWidth) {

    const line  = "\u2501".repeat(topWidth)
    const output = "\u250F" + line + "\u2513"
    return output;

    }

function bottomBorder(bottomWidth) {

    const line  = "\u2501".repeat(bottomWidth)
    const output = "\u2517" + line + "\u251B"
    return output;

    }

function middleBorder(width) {

    const line  = "\u2501".repeat(width)
    const output = "\u2523" + line + "\u252B"
    return output;

    }

function boxIt(text) {

    const side = "\u2503"

    const outputArray = text.slice(2)
    const length = Math.max(...outputArray.map((x) => x.length))
    let output = topBorder(length) + "\n"
    let i = 1

        for (const element of outputArray) {
            output += side + element + side + "\n"

            if (i < outputArray.length) {
                
                output += middleBorder(length) + "\n"
            }
            i++
    }

    output += bottomBorder(length) 
    return output;

}

console.log(boxIt(["itemToSlice1", "itemToSlice2", "test1", "test2.0", "test 3"]))

