#!/bin/bash
standard
casperjs test ./test/casper/*.spec.js
istanbul cover ./node_modules/mocha/bin/_mocha ./test/*.spec.js -- -R spec
