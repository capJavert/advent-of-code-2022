const fetch = require('node-fetch')
const { solve_day_12 } = require('./pkg')

const main = async () => {
    const data = await fetch('https://pastebin.com/raw/AFWkFr99').then(response => response.text())
    const input = data.split(/\r?\n/)

    let end

    const grid = input.map((line, y) => {
        return line.split('').map((item, x) => {
            if (item === 'S') {
                return 'a'.charCodeAt()
            }

            if (item === 'E') {
                end = [x, y]

                return 'z'.charCodeAt()
            }

            return item.charCodeAt()
        })
    })
    const map = grid.reduce((acc, line, y) => {
        line.forEach((item, x) => {
            let connections = [
                [x, y - 1],
                [x + 1, y],
                [x, y + 1],
                [x - 1, y]
            ]
                .map(coord => {
                    const coordItem = grid[coord[1]]?.[coord[0]]

                    if (coordItem && coordItem <= item + 1) {
                        // return coord.join('-') + `-${coordItem}`

                        return coord.join('-')
                    }

                    return undefined
                })
                .filter(Boolean)

            acc[`${x}-${y}`] = connections
        })

        return acc
    }, {})

    const starts = Object.keys(map).filter(item => {
        const coord = item.split('-').map(part => +part)
        const elevation = grid[coord[1]][coord[0]]

        return elevation === 'a'.charCodeAt()
    })

    const paths = solve_day_12([map, starts, end.join('-')])

    console.log(Math.min(...paths.map(path => path.length)) - 1)
}

main()
