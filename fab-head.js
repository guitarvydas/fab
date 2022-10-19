#!/usr/bin/env node
//'use strict'


const fs = require ('fs');
const ohm = require ('ohm-js');
// ... require ('./fmt-js/fmt-js.js');
// ... require ('./fmt-js/transpile.js');

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
    const srcfilename = argv._[0];
    const grammarName = argv._[1];
    const grammarfilename = argv._[2];
    const fmtfilename = argv._[3];
    var src = fs.readFileSync (srcfilename, 'utf-8');
    var grammar = fs.readFileSync (grammarfilename, 'utf-8');
    var fmt = fs.readFileSync (fmtfilename, 'utf-8');
    const [success, transpiled, errormessage] = tr.transpile (src, grammarName, grammar, fmt, ohm, fmtjs.compilefmt);
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

main ();
