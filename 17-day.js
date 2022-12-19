const fetch = require('node-fetch')
const {} = require('./pkg')

const getKey = item => `${item.x}-${item.y}`

const main = async () => {
    const data = await fetch('https://pastebin.com/raw/rVUmJNMR').then(response => response.text())
    const input = data.split('')

    let grid = new Map()
    let highestY = -1
    const maxX = 7

    const didCollide = shapeGrid => {
        return shapeGrid.some(item => grid.get(getKey(item)) === '#' || item.y < 0 || item.x < 0 || item.x >= maxX)
    }

    // eslint-disable-next-line no-unused-vars
    const printGrid = () => {
        const maxY = Math.max(...[...grid.keys()].map(item => +item.split('-')[1]))

        for (let y = maxY; y >= 0; y -= 1) {
            let line = []

            for (let x = 0; x < maxX; x += 1) {
                line.push(grid.get(getKey({ x, y })) || '.')
            }

            console.log(`${y}|${line.join('')}|`)
        }

        console.log(`++${new Array(maxX).fill('-').join('')}+`)

        console.log()
    }

    let jetStep = 0

    for (let i = 0; i < 2022; i += 1) {
        const shape = i % 5
        let shapeGrid = []
        const anchor = { x: 2, y: highestY + 4 }

        switch (shape) {
            case 0: {
                shapeGrid = [
                    {
                        x: anchor.x,
                        y: anchor.y
                    },
                    {
                        x: anchor.x + 1,
                        y: anchor.y
                    },
                    {
                        x: anchor.x + 2,
                        y: anchor.y
                    },
                    {
                        x: anchor.x + 3,
                        y: anchor.y
                    }
                ]

                break
            }
            case 1: {
                shapeGrid = [
                    {
                        x: anchor.x + 1,
                        y: anchor.y + 2
                    },
                    {
                        x: anchor.x,
                        y: anchor.y + 1
                    },
                    {
                        x: anchor.x + 1,
                        y: anchor.y + 1
                    },
                    {
                        x: anchor.x + 2,
                        y: anchor.y + 1
                    },
                    {
                        x: anchor.x + 1,
                        y: anchor.y
                    }
                ]

                break
            }
            case 2: {
                shapeGrid = [
                    {
                        x: anchor.x + 2,
                        y: anchor.y + 2
                    },
                    {
                        x: anchor.x + 2,
                        y: anchor.y + 1
                    },
                    {
                        x: anchor.x,
                        y: anchor.y
                    },
                    {
                        x: anchor.x + 1,
                        y: anchor.y
                    },
                    {
                        x: anchor.x + 2,
                        y: anchor.y
                    }
                ]

                break
            }
            case 3: {
                shapeGrid = [
                    {
                        x: anchor.x,
                        y: anchor.y + 3
                    },
                    {
                        x: anchor.x,
                        y: anchor.y + 2
                    },
                    {
                        x: anchor.x,
                        y: anchor.y + 1
                    },
                    {
                        x: anchor.x,
                        y: anchor.y
                    }
                ]

                break
            }
            case 4: {
                shapeGrid = [
                    {
                        x: anchor.x,
                        y: anchor.y + 1
                    },
                    {
                        x: anchor.x + 1,
                        y: anchor.y + 1
                    },
                    {
                        x: anchor.x,
                        y: anchor.y
                    },
                    {
                        x: anchor.x + 1,
                        y: anchor.y
                    }
                ]

                break
            }
            default:
                throw new Error(`Unknown shape #${shape}`)
        }

        while (true) {
            const jetPattern = input[jetStep]
            jetStep = (jetStep + 1) % input.length

            let newShapeGrid = shapeGrid.map(item => {
                return {
                    ...item,
                    x: item.x + (jetPattern === '<' ? -1 : +1)
                }
            })

            if (!didCollide(newShapeGrid)) {
                // shapeGrid.forEach(item => {
                //     grid.delete(getKey(item))
                // })

                shapeGrid = newShapeGrid

                // shapeGrid.forEach(item => {
                //     grid.set(getKey(item), '@')
                // })
            }

            // printGrid()

            newShapeGrid = shapeGrid.map(item => {
                return {
                    ...item,
                    y: item.y - 1
                }
            })

            if (didCollide(newShapeGrid)) {
                // console.log('collide', newShapeGrid)
                break
            }

            // shapeGrid.forEach(item => {
            //     grid.delete(getKey(item))
            // })

            shapeGrid = newShapeGrid

            // shapeGrid.forEach(item => {
            //     grid.set(getKey(item), '@')
            // })

            // printGrid()
        }

        shapeGrid.forEach(item => {
            highestY = Math.max(highestY, item.y)

            grid.set(getKey(item), '#')
        })
    }

    console.log(highestY + 1)
}

main()
