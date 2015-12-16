#!/bin/bash
standard && istanbul cover ./node_modules/mocha/bin/_mocha ./test/*.spec.js -- -R spec
