all: install fab

fab:
	cat fmt-js/fmt-js.js fmt-js/transpile.js fab-head.js >fab
	chmod a+x fab

install: repos npmstuff

repos:
	multigit -r

npmstuff:
	npm install ohm-js yargs atob pako
