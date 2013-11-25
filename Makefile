.PHONY: package lint test

default: package lint test

package:
	mvn clean package

lint:
	find . -name "*.js" -maxdepth 0 | xargs node_modules/jshint/bin/jshint
	find test -name "*.js" | xargs node_modules/jshint/bin/jshint

test:
	node_modules/mocha/bin/mocha --reporter progress --ui tdd
