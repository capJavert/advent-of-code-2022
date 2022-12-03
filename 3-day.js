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

    const commonPriorities = input.reduce((acc, item) => {
        const [comp1, comp2] = [item.substring(0, item.length / 2), item.substring(item.length / 2)]

        const commonItem = item.split('').find(item => comp1.includes(item) && comp2.includes(item))
        const priority = getPriority(commonItem)

        acc.push(priority)

        return acc
    }, [])

    console.log(commonPriorities.reduce((acc, item) => acc + item, 0))
}

main()
