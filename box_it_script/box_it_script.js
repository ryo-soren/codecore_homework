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

    const textArray = text.slice(2)
    const length = Math.max(...textArray.map((x) => x.length))
    let output = ''



        for (const element of textArray) {
            output = topBorder(length) + "\n" + element + "\n" + bottomBorder(length)
            console.log(output);
    }
}

boxIt(["itemToSlice1", "itemToSlice2", "test1", "test2.0"])

