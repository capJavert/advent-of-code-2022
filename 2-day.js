const fetch = require('node-fetch')
const { solve_day_2 } = require('./pkg')

const main = async () => {
    const data = await fetch('https://pastebin.com/raw/t5tJzLRL').then(response => response.text())
    const input = data.split(/\r?\n/)

    const rounds = input.map(line => {
        return line.split(' ').map(
            item =>
                ({
                    A: 'Rock',
                    B: 'Paper',
                    C: 'Scissors',
                    X: 'Rock',
                    Y: 'Paper',
                    Z: 'Scissors'
                }[item])
        )
    })

    console.log(solve_day_2(rounds))
}

main()
