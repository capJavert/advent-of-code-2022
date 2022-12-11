const fetch = require('node-fetch')
const { solve_day_11 } = require('./pkg')

const main = async () => {
    const data = await fetch('https://pastebin.com/raw/Hcr04g5u').then(response => response.text())
    const input = data.split(/\r?\n/)

    const notes = input.reduce(
        (acc, line, index) => {
            let note = acc[acc.length - 1]

            if (!line) {
                acc.push({})
            }

            const parts = line.split(' ').filter(Boolean)

            const lineIndex = index % 7

            switch (lineIndex) {
                case 0: {
                    note.monkey = +parts[1].replace(':', '')

                    break
                }
                case 1: {
                    note.items = parts.slice(2).map(item => +item.replace(',', ''))

                    break
                }
                case 2: {
                    note.operation = parts[parts.length - 2]
                    note.operationValue = +parts[parts.length - 1] || 0

                    break
                }
                case 3: {
                    note.test = +parts[parts.length - 1]

                    break
                }
                case 4: {
                    note.testTrue = +parts[parts.length - 1]

                    break
                }
                case 5: {
                    note.testFalse = +parts[parts.length - 1]

                    break
                }
            }

            return acc
        },
        [{}]
    )

    const monkeys = solve_day_11(notes)

    monkeys.sort((a, b) => b - a)

    console.log(monkeys[0] * monkeys[1])
}

main()
