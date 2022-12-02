const fetch = require('node-fetch')
const { solve_day_2 } = require('./pkg')

const main = async () => {
    const data = await fetch('https://pastebin.com/raw/t5tJzLRL').then(response => response.text())
    const input = data.split(/\r?\n/)
    const choices = ['Rock', 'Paper', 'Scissors']

    const rounds = input.map(line => {
        const [a, b] = line.split(' ')
        const him = {
            A: 'Rock',
            B: 'Paper',
            C: 'Scissors'
        }[a]

        const modifier = {
            X: 2,
            Y: 0,
            Z: 1
        }[b]
        const choice = (choices.findIndex(item => item === him) + modifier) % 3
        const me = choices[choice]

        return [him, me]
    })

    console.log(solve_day_2(rounds))
}

main()
