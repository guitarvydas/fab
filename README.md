FABricate code from source file.

Command-line utility to transpile source file and apply fabrication rules to generate new source.

Uses ./fmt-js to create a transpiler/

Creates a node.js script called "fab".

Command: $ fab src grammar fmt

Transpiled file is console.logged to stdout.

Exit code 0 on success.

Exit code 1 on failure.  stdout contains error message.