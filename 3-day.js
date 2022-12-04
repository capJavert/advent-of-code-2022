const fetch = require('node-fetch')
const { solve_day_3 } = require('./pkg')

const main = async () => {
    const data = await fetch('https://pastebin.com/raw/CyHyBwHA').then(response => response.text())
    const input = data.split(/\r?\n/)

    const getPriority = item => {
        const isUppercase = item.toUpperCase() === item

        if (isUppercase) {
            return item.charCodeAt(0) - 'A'.charCodeAt(0) + 27
        }

        return item.charCodeAt(0) - 'a'.charCodeAt(0) + 1
    }

    const groups = input.reduce(
        (acc, line) => {
            const current = acc[acc.length - 1]
            current.push(line.split('').map(item => getPriority(item)))

            if (current.length === 3) {
                acc.push([])
            }

            return acc
        },
        [[]]
    )
    groups.pop()

    console.log(solve_day_3(groups))
}

main()
