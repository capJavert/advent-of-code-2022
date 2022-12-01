const fetch = require('node-fetch')
const { solve_day_1 } = require('./pkg')

const main = async () => {
    const data = await fetch('https://pastebin.com/raw/cQtpDte1').then(response => response.text())
    const input = data.split(/\r?\n/).map(item => (item ? +item : 0))

    const elfs = input.reduce(
        (acc, item) => {
            if (!item) {
                acc.push(0)
            } else {
                acc[acc.length - 1] = acc[acc.length - 1] + item
            }

            return acc
        },
        [0]
    )

    console.log(solve_day_1(input), '(rust/wasm solution)') // wasm solution just to pratice rust syntax

    console.log(
        elfs
            .sort((a, b) => b - a)
            .slice(0, 3)
            .reduce((acc, item) => acc + item, 0)
    )
}

main()
