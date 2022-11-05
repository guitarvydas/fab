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
    var srcfilename = argv._[0];
    if (srcfilename === '-') {
	srcfilename = '/dev/fd/0';
    }
    var grammarName = argv._[1];
    var grammarfilename = argv._[2];
    var fmtfilename = argv._[3];
    var src = fs.readFileSync (srcfilename, 'utf-8');
    var grammar = fs.readFileSync (grammarfilename, 'utf-8');
    var fmt = fs.readFileSync (fmtfilename, 'utf-8');
    if (argv.support) {
	var r = transpile (src, grammarName, grammar, fmt, ohm, compilefmt, argv.support);
    } else {
	var r = transpile (src, grammarName, grammar, fmt, ohm, compilefmt, undefined);
    }
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
