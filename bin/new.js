#!/usr/bin/env node
const cli = require('commander')
const exec = require('../lib/exec')

cli.version('0.0.1')

cli.command('commit <files> <msg>')
    .action(async function (files, msg) {
        const cmd = `git add ${files} && git commit -m "${msg}"`
        await exec(cmd)
    })

cli.parse(process.argv)