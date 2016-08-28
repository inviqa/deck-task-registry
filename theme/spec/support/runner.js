const Jasmine = require('jasmine');
const jasmine = new Jasmine();

jasmine.loadConfigFile('spec/support/jasmine.json');
const SpecReporter = require('jasmine-spec-reporter');
jasmine.addReporter(new SpecReporter());
jasmine.execute();
