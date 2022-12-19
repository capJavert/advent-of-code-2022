const fetch = require('node-fetch')
const { solve_day_18 } = require('./pkg')

const main = async () => {
    const data = await fetch('https://pastebin.com/raw/vRJMPWgi').then(response => response.text())
    const input = data.split(/\r?\n/)

    const cubes = input.map(line => {
        const [x, y, z] = line.split(',').map(item => +item)

        return {
            x,
            y,
            z,
            sides: [
                {
                    x: x + 1,
                    y,
                    z,
                    sides: []
                },
                {
                    x: x - 1,
                    y,
                    z,
                    sides: []
                },
                {
                    x,
                    y: y + 1,
                    z,
                    sides: []
                },
                {
                    x,
                    y: y - 1,
                    z,
                    sides: []
                },
                {
                    x,
                    y,
                    z: z + 1,
                    sides: []
                },
                {
                    x,
                    y,
                    z: z - 1,
                    sides: []
                }
            ]
        }
    })

    console.log(solve_day_18(cubes))
}

main()
