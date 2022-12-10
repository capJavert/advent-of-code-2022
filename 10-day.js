const fetch = require('node-fetch')
const { solve_day_10 } = require('./pkg')

const main = async () => {
    const data = await fetch('https://pastebin.com/raw/ajM8jPqD').then(response => response.text())
    const input = data.split(/\r?\n/)

    const instructions = input.map(line => {
        const [instruction, ...args] = line.split(' ')

        return {
            name: instruction,
            args: args.map(arg => +arg),
            cycles: {
                addx: 2,
                noop: 1
            }[instruction]
        }
    })

    const registerValues = solve_day_10(instructions)

    console.log(registerValues.reduce((acc, item) => acc + item, 0))
}

main()
