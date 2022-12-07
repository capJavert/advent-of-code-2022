const fetch = require('node-fetch')
const {} = require('./pkg')

const main = async () => {
    const data = await fetch('https://pastebin.com/raw/ZKc1wSMH').then(response => response.text())
    const input = data.split(/\r?\n/)

    const fileSystem = {
        parent: null,
        name: '/',
        size: 0,
        dir: true,
        nodes: []
    }
    let pwd = fileSystem

    input
        .slice(1) // skip root cd
        .forEach(item => {
            if (item.startsWith('$')) {
                const [command, ...args] = item.substring(2).split(' ')

                switch (command) {
                    case 'cd': {
                        const path = args[0]

                        if (path === '..') {
                            pwd = pwd.parent
                        } else {
                            pwd = pwd.nodes.find(node => node.name === path)
                        }

                        if (!pwd) {
                            throw new Error(`no such file or directory: ${path}`)
                        }

                        break
                    }
                    case 'ls': {
                        // nothing for now

                        break
                    }
                    default:
                        throw new Error(`command not found: ${command}`)
                }

                return
            }

            const [size, name] = item.split(' ')

            if (size === 'dir') {
                pwd.nodes.push({
                    parent: pwd,
                    name,
                    size: 0,
                    dir: true,
                    nodes: []
                })
            } else {
                pwd.nodes.push({
                    parent: pwd,
                    name,
                    size: +size,
                    dir: false,
                    nodes: []
                })
            }
        })

    const walkTree = (node, callback, depth = 0) => {
        callback(node, depth)

        node.nodes.forEach(node => walkTree(node, callback, depth + 1))
    }

    // print tree
    // walkTree(fileSystem, (node, depth) => {
    //     const pad = new Array(depth).fill('  ').join('')
    //     console.log(`${pad}-`, node.name, node.dir ? '(dir)' : `(file, size=${node.size})`)
    // })

    let dirSizes = {}

    walkTree(fileSystem, node => {
        if (node.dir) {
            let dirSize = 0

            walkTree(node, subNode => {
                if (!subNode.dir) {
                    dirSize += subNode.size
                }
            })

            const path = []
            let root = node

            while (root) {
                path.push(root.name)

                root = root.parent
            }

            dirSizes[path.join('/')] = dirSize
        }
    })

    const totalUsedSize = dirSizes['/']
    const unusedSize = 70000000 - totalUsedSize
    const spaceNeededForUpdate = 30000000 - unusedSize

    console.log(
        Math.min(
            ...Object.values(dirSizes).filter(size => {
                return size >= spaceNeededForUpdate
            })
        )
    )
}

main()
