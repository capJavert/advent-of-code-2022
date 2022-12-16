const fetch = require('node-fetch')
const {} = require('./pkg')

const getDistance = (a, b) => Math.abs(a.x - b.x) + Math.abs(a.y - b.y)

const getKey = item => `${item.x}-${item.y}`

const main = async () => {
    const data = await fetch('https://pastebin.com/raw/JGDb75F1').then(response => response.text())
    const input = data.split(/\r?\n/)
    const sensorMatcher = /(x|y)=(?<value>[0-9-]{1,})/

    const grid = new Map()
    const targetRow = 2000000

    const sensors = input.map(line => {
        const [x, y, bx, by] = line
            .split(' ')
            .map(item => {
                const value = item.match(sensorMatcher)?.groups?.value

                if (typeof value !== 'undefined') {
                    return +value
                }
            })
            .filter(value => typeof value !== 'undefined')

        grid.set(getKey({ x, y }), 'S')
        grid.set(getKey({ x: bx, y: by }), 'B')

        return {
            x,
            y,
            beacon: {
                x: bx,
                y: by
            }
        }
    })

    let count = 0

    sensors.forEach(sensor => {
        const maxDistance = getDistance(sensor, sensor.beacon) + 1

        const y = targetRow

        for (let x = sensor.x - maxDistance; x < sensor.x + maxDistance; x += 1) {
            const distance = getDistance(sensor, { x, y })

            if (grid.get(getKey({ x, y }))) {
                continue
            }

            if (distance < maxDistance) {
                if (y === targetRow) {
                    count += 1
                }

                grid.set(getKey({ x, y }), '#')
            }
        }
    })

    console.log(count)
}

main()
