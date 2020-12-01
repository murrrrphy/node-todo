const db = require('./db.js')
const inquirer = require('inquirer')

const functionList = {
    printTasks: (list) => {
        inquirer
            .prompt({
                    type: 'list',
                    name: 'index',
                    message: '请选择想要操作的任务',
                    choices: [...list.map((task, index) => {
                        return {
                            name: `${task.done ? '[*]' : '[_]'} ${index + 1} - ${task.title}`, value: index.toString()
                        }
                    }), {name: '新建任务', value: '-1'}, {name: '退出', value: '-2'}]
                },
            )
            .then((answer) => {
                const index = parseInt(answer.index)
                if (index >= 0) {
                    functionList.askForAction(list, index)
                } else if (index === -1) {
                    functionList.askForCreateTask(list)
                }
            });
    },

    markAsDone: (list, index) => {
        list[index].done = true
        db.write(list)
    },

    markAsUndone: (list, index) => {
        list[index].done = false
        db.write(list)
    },

    updateTitle: (list, index) => {
        inquirer.prompt({
            type: 'input',
            name: 'title',
            message: "新的任务名称",
            default: list[index].title
        }).then((answers) => {
            list[index].title = answers.title
            db.write(list)
        });
    },

    remove: (list, index) => {
        list.splice(index, 1)
        db.write(list)
    },

    askForAction: (list, index) => {
        const actions = {
            markAsDone: functionList.markAsDone,
            markAsUndone: functionList.markAsUndone,
            updateTitle: functionList.updateTitle,
            remove: functionList.remove
        }
        inquirer.prompt({
            type: 'list',
            name: 'action',
            message: '请选择操作',
            choices: [
                {name: '已完成', value: 'markAsDone'},
                {name: '未完成', value: 'markAsUndone'},
                {name: '修改任务名称', value: 'updateTitle'},
                {name: '删除任务', value: 'remove'},
                {name: '退出', value: 'quit'}
            ]
        }).then((answer2) => {
            const action = actions[answer2.action]
            action && action(list, index)
        })
    },

    askForCreateTask: (list) => {
        inquirer.prompt({
            type: 'input',
            name: 'title',
            message: "请输入任务标题",
        }).then((answers) => {
            list.push({
                title: answers.title,
                done: false
            })
            db.write(list)
        });
    }
}

module.exports = functionList