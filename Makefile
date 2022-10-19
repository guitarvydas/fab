all: install fab

fab:
	cat fab-head.js fmt-js/fmt-js.js fmt-js/transpile.js >fab

install: repos npmstuff

repos:
	multigit -r

npmstuff:
	npm install ohm-js yargs atob pako
