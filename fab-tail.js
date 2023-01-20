var argv;

// Component Based Programming version
function main () {
    argv = require('yargs/yargs')(process.argv.slice(2)).argv;
    viewGeneratedCode = false;
    tracing = false;
    traceDepth = 0;
    srcfilename = '/dev/fd/0';
    var grammarfilename = argv._[1];
    var fmtfilename = argv._[2];
    var src = fs.readFileSync (srcfilename, 'utf-8');
    var grammar = fs.readFileSync (grammarfilename, 'utf-8');
    var fmt = fs.readFileSync (fmtfilename, 'utf-8');
    var support = argv._[3];
    var r = transpile (src, grammar, fmt, ohm, compilefmt, argv.support);
    var success = r [0]
    var transpiled = r [1]
    var errormessage = r [2]
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
