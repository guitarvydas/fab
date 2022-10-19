#!/usr/bin/env node
//'use strict'


const fs = require ('fs');
const ohm = require ('ohm-js');
const fmtjs = require ('./fmt-js/fmt-js.js');
const tr = require ('./fmt-js/transpile.js');

var argv;

function main () {
    argv = require('yargs/yargs')(process.argv.slice(2)).argv;
    if (argv.view) {
	viewGeneratedCode = true;
    } else {
	viewGeneratedCode = false;
    }
    if (argv.trace) {
	tracing = true;
	traceDepth = 0;
    } else {
	tracing = false;
    }
    var src = fs.readFileSync (srcname, 'utf-8');
    const [success, transpiled, errormessage] = tr.transpile (src, grammar, fmt, ohm, fmtjs.compilefmt);
    if (success) {
	emit (transpiled);
	process.exit (0);
    } else {
	emit (errormessage);
	process.exit (1);
    }
}
function emit (s) {
    console.log (s);
}
