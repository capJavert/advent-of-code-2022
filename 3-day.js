const fetch = require('node-fetch')
const {} = require('./pkg')

const main = async () => {
    const data = await fetch('https://pastebin.com/raw/CyHyBwHA').then(response => response.text())
    const input = data.split(/\r?\n/)

    const getPriority = item => {
        const isUppercase = item.toUpperCase() === item

        if (isUppercase) {
            return item.charCodeAt(0) - 'A'.charCodeAt(0) + 27
        }

        return item.charCodeAt(0) - 'a'.charCodeAt(0) + 1
    }

    const groups = input.reduce(
        (acc, item) => {
            const current = acc[acc.length - 1]
            current.push(item)

            if (current.length === 3) {
                acc.push([])
            }

            return acc
        },
        [[]]
    )
    groups.pop()

    const commonPriorities = groups.map(group => {
        const itemAppearances = group.reduce((acc, backpack, index) => {
            const items = backpack.split('')

            items.forEach(item => {
                if (!acc[item]) {
                    acc[item] = new Set()
                }

                acc[item].add(index)
            })

            return acc
        }, {})

        const badge = Object.keys(itemAppearances).find(item => {
            return itemAppearances[item].size === 3
        })

        return getPriority(badge)
    })

    console.log(commonPriorities.reduce((acc, item) => acc + item, 0))
}

main()
