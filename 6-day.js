const fetch = require('node-fetch')
const { solve_day_6 } = require('./pkg')

const main = async () => {
    const data = await fetch('https://pastebin.com/raw/a1rt68Tz').then(response => response.text())
    const input = data.split('')

    console.log(solve_day_6(input))
}

main()
