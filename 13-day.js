const fetch = require('node-fetch')
const { solve_day_13 } = require('./pkg')

const main = async () => {
    const data = await fetch('https://pastebin.com/raw/Yhexujdz').then(response => response.text())
    const input = data.split(/\r?\n/)

    const pairs = input
        .filter(Boolean)
        .reduce((acc, item, index) => {
            if (index % 2 === 0) {
                acc.push([])
            }

            const current = acc[acc.length - 1]
            current.push(JSON.parse(item))

            return acc
        }, [])
        .flat()

    const divderPair = ['[[2]]', '[[6]]']
    pairs.push(...divderPair.map(item => JSON.parse(item)))

    const sortedPairs = solve_day_13(pairs)

    const dividerIndices = sortedPairs
        .map((item, index) => {
            if (divderPair.includes(JSON.stringify(item))) {
                return index + 1
            }

            return undefined
        })
        .filter(Boolean)

    console.log(dividerIndices[0] * dividerIndices[1])
}

main()
