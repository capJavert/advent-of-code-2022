const fetch = require('node-fetch')
const { solve_day_9 } = require('./pkg')

const main = async () => {
    const data = await fetch('https://pastebin.com/raw/WCnXKtmf').then(response => response.text())
    const input = data.split(/\r?\n/)

    const motions = input.map(item => {
        const [direction, amount] = item.split(' ')

        return {
            direction: {
                U: 'up',
                R: 'right',
                D: 'down',
                L: 'left'
            }[direction],
            amount: +amount
        }
    })

    console.log(solve_day_9(motions))
}

main()
