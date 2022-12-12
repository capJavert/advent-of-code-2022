const { test, test_serde } = require('./pkg')

const main = async () => {
    const inputs = new Array(10000).fill(null).map((_, index) => index + 1)

    let time = performance.now()
    let results = inputs.map(() => {
        return test(inputs)
    })
    console.log('wasm time', performance.now() - time)
    console.log(results.reduce((acc, item) => acc + item, 0))

    time = performance.now()
    results = inputs.map(() => {
        return test_serde(JSON.stringify(inputs))
    })
    console.log('serde time', performance.now() - time)

    console.log(results.reduce((acc, item) => acc + item, 0))
}

main()
