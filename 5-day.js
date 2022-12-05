const fetch = require('node-fetch')
const { solve_day_5 } = require('./pkg')

const main = async () => {
    const data = await fetch('https://pastebin.com/raw/11pG0gAE').then(response => response.text())
    const input = data.split(/\r?\n/)
    const stepIndex = input.findIndex(item => !item)
    const [stacksInput, stepsInput] = [input.slice(0, stepIndex - 1), input.slice(stepIndex + 1)]
    const cratesCount = +input[stepIndex - 1][input[stepIndex - 1].length - 1]

    const stacks = stacksInput
        .reduce(
            (acc, line) => {
                const crates = line.split('  ')

                crates.forEach((crate, index) => {
                    if (!crate) {
                        throw new Error('Schrödinger!!!!!')
                    }

                    if (crate === 'X') {
                        return
                    }

                    acc[index].push(crate)
                })

                return acc
            },
            new Array(cratesCount).fill(null).map(() => [])
        )
        .map(stack => stack.reverse())

    const steps = stepsInput.map(line => {
        const [moveCount, from, to] = line
            .replace(/move |from |to |/g, '')
            .split(' ')
            .map(item => +item)

        return {
            moveCount,
            from: from,
            to: to
        }
    })

    const sortedStacks = solve_day_5(stacks, steps)

    console.log(sortedStacks.reduce((acc, item) => acc + item[item.length - 1], ''))
}

main()
