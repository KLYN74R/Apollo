#!/usr/bin/env node
import {program} from 'commander'

//console.log('Before migration!See you soon')

program
  .option('--first')
  .option('-s, --separator <char>');

program.parse();

const options = program.opts();

console.log(options)