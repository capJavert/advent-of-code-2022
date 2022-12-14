const fetch = require('node-fetch')
const {} = require('./pkg')

const main = async () => {
    const data = await fetch('https://pastebin.com/raw/8NE4TDny').then(response => response.text())
    const input = data.split(/\r?\n/)

    let maxX = 0
    let maxY = 0

    const grid = {}

    input.forEach(line => {
        const coords = line.split(' -> ').map(coord => {
            const [x, y] = coord.split(',').map(item => +item)

            return { x, y }
        })

        coords.forEach((coord, index) => {
            const previous = coords[index - 1]
            maxX = Math.max(maxX, coord.x)
            maxY = Math.max(maxY, coord.y)

            if (!previous) {
                return
            }

            if (coord.x !== previous.x) {
                if (previous.x > coord.x) {
                    for (let i = previous.x; i >= coord.x; i -= 1) {
                        grid[`${i}-${coord.y}`] = '#'
                    }
                } else {
                    for (let i = previous.x; i <= coord.x; i += 1) {
                        grid[`${i}-${coord.y}`] = '#'
                    }
                }
            } else {
                if (previous.y > coord.y) {
                    for (let i = previous.y; i >= coord.y; i -= 1) {
                        grid[`${coord.x}-${i}`] = '#'
                    }
                } else {
                    for (let i = previous.y; i <= coord.y; i += 1) {
                        grid[`${coord.x}-${i}`] = '#'
                    }
                }
            }
        })
    })

    maxX *= 2
    maxY += 2

    for (let i = 0; i <= maxX; i += 1) {
        grid[`${i}-${maxY}`] = '#'
    }

    let step = 0
    let didSandVoid = false

    while (!didSandVoid) {
        let sand = [500, 0]
        grid[sand.join('-')] = 'o'

        while (true) {
            const moves = {
                down: [sand[0], sand[1] + 1],
                left: [sand[0] - 1, sand[1] + 1],
                right: [sand[0] + 1, sand[1] + 1]
            }

            if (!grid[moves.down.join('-')]) {
                delete grid[sand.join('-')]
                grid[moves.down.join('-')] = 'o'
                sand = moves.down
            } else if (!grid[moves.left.join('-')]) {
                delete grid[sand.join('-')]
                grid[moves.left.join('-')] = 'o'
                sand = moves.left
            } else if (!grid[moves.right.join('-')]) {
                delete grid[sand.join('-')]
                grid[moves.right.join('-')] = 'o'
                sand = moves.right
            } else {
                if (sand.join('-') === [500, 0].join('-')) {
                    didSandVoid = true
                }

                break
            }
        }

        step += 1
    }

    console.log(step)
}

main()
