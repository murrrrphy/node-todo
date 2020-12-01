#!/usr/bin/env node
const program = require('commander'); // (normal include)
const commander = require('./index.js'); // include commander in git clone of commander repo
const pkg = require('./package.json')

program
    .version(pkg.version)


program
    .command('add')
    .description('add a task')
    .action((...args) => {
        const words = args[1] ? args[1].join(' ') : undefined
        commander.add(words).then(() => {
                console.log("添加成功");
            },
            () => {
                console.log("添加失败");
            })
    });
program
    .command('clear')
    .description('clear all tasks')
    .action(() => {
        commander.clear().then(() => {
            console.log('清除完毕');
        }, () => {
            console.log('清除失败');
        })
    });
program
    .command('showAll')
    .description('show all tasks')
    .action(() => {
        void commander.showAll()
    });
if(process.argv.length === 2){
    process.argv.push('showAll')
}

program.parse(process.argv);