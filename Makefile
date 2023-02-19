all:

fab:
	# nothing to do

install: repos npmstuff

repos:
	multigit -r

npmstuff:
	npm install ohm-js yargs atob pako
