const fetch = require('node-fetch')
const { solve_day_4 } = require('./pkg')

const main = async () => {
    const data = await fetch('https://pastebin.com/raw/tWaydikq').then(response => response.text())
    const input = data.split(/\r?\n/)

    const elfPairs = input.map(line => {
        const ranges = line.split(',').map(item => {
            const [a, b] = item.split('-').map(n => +n)
            const range = []

            for (let i = a; i <= b; i += 1) {
                range.push(i)
            }

            return range
        })

        return ranges
    })

    console.log(solve_day_4(elfPairs))
}

main()
