all: install fab

fab: fab-head.js fab-tail.js
	cat fab-head.js fmt-js/fmt-js.js fmt-js/transpile.js fab-tail.js >fab
	chmod a+x fab

install: repos npmstuff

repos:
	multigit -r

npmstuff:
	npm install ohm-js yargs atob pako
