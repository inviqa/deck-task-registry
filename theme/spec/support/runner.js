const Jasmine = require('jasmine');
const jasmine = new Jasmine();
const SpecReporter = require('jasmine-spec-reporter');

jasmine.loadConfigFile('spec/support/jasmine.json');
jasmine.addReporter(new SpecReporter());
jasmine.execute();
