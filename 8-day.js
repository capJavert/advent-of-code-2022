const fetch = require('node-fetch')
const { solve_day_8 } = require('./pkg')

const main = async () => {
    const data = await fetch('https://pastebin.com/raw/Pc0fNLj5').then(response => response.text())
    const input = data.split(/\r?\n/)

    const grid = input.reduce((acc, line) => {
        const items = line.split('').map(item => +item)

        acc.push(items)

        return acc
    }, [])

    const visibleTrees = solve_day_8(grid)

    console.log(visibleTrees)
}

main()
