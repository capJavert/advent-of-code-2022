const fetch = require('node-fetch')
const { solve_day_13 } = require('./pkg')

const main = async () => {
    const data = await fetch('https://pastebin.com/raw/Yhexujdz').then(response => response.text())
    const input = data.split(/\r?\n/)

    const pairs = input.filter(Boolean).reduce((acc, item, index) => {
        if (index % 2 === 0) {
            acc.push([])
        }

        const current = acc[acc.length - 1]
        current.push(JSON.parse(item))

        return acc
    }, [])

    const sortedPairIndices = solve_day_13(pairs)

    console.log(sortedPairIndices.reduce((acc, item) => acc + item, 0))
}

main()
