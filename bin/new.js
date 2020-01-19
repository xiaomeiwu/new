#!/usr/bin/env node
const cli = require('commander')
const exec = require('../lib/exec')
const Github = require('../lib/Github')
const config = require('../config/github')

cli.version(require('../package.json').version)

cli.command('commit <files> <msg>')
    .action(async function (files, msg) {
        const cmd = `git add ${files} && git commit -m "${msg}"`
        await exec(cmd)
    })
cli.command('create <name>')
    .action(async function (name) {
        const username = 'xiaomeiwu'
        const password = config[username]['password']
        const email = config[username]['email']
        const cwd = config['cwd']
        const github = new Github({ username, password })
        await github.createRepo({
            name,
            auto_init: true,
            license_template: 'mit'
        })
        await github.createBranch(name, 'master', 'dev')
        await github.setDefaultBranch(name, 'dev')
        await exec(getCmd({ username, password, email, name }), { cwd })
    })
cli.command('delete <name>')
    .action(async function (name) {
        const username = 'xiaomeiwu'
        const password = config[username]['password']
        const github = new Github({ username, password })
        await github.deleteRepo(name)
    })

cli.parse(process.argv)

function getCmd({ username, password, email, name }) {
    const cmds = [
        `mkdir ${name}`,
        `cd ${name}`,
        `git init`,
        `git config user.name ${username}`,
        `git config user.email ${email}`,
        `git remote add origin https://github.com/${username}/${name}`,
        `yarn init -y`,
        `git remote set-url origin https://${username}:${password}@github.com/${username}/${name}`,
        `git fetch`,
        `git checkout -b master origin/master`,
        `git checkout -b dev origin/dev`,
        `git add package.json`,
        `git commit -m "chore: create package.json"`,
        `echo node_modules > .gitignore`,
        `git add .gitignore`,
        `git commit -m "chore: create .gitignore"`,
        `git push -u origin dev`
    ]
    return cmds.join('&&')
}