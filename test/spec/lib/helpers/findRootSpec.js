'use strict';

const mock = require('mock-fs');
const findRoot = require('../../../../src/lib/helpers/findRoot');
const expect = require('chai').expect;
const path = require('path');

describe('findRoot', function () {

  afterEach(function () {
    mock.restore();
  });

  it('finds the webroot if under web', function () {

    mock({
      '../.git': {},
      '../web': {
        'index.php': '<php phpinfo();',
        'core': {
          'lib': {
            'Drupal.php': '<php phpinfo();'
          }
        }
      }
    });

    const root = findRoot();
    const expectation = path.join('..', 'web');
    expect(root).to.equal(expectation);

  });

  it('finds the webroot if under docroot', function () {

    mock({
      '../docroot': {
        'index.php': '<php phpinfo();',
        'core': {
          'lib': {
            'Drupal.php': '<php phpinfo();'
          }
        }
      }
    });

    const root = findRoot();
    const expectation = path.join('..', 'docroot');
    expect(root).to.equal(expectation);

  });

  it('finds the webroot if under a banana', function () {

    mock({
      '../banana': {
        'index.php': '<php phpinfo();',
        'core': {
          'lib': {
            'Drupal.php': '<php phpinfo();'
          }
        }
      }
    });

    const root = findRoot();
    const expectation = path.join('..', 'banana');
    expect(root).to.equal(expectation);

  });

  it('throws an exception if no root was found', function () {

    mock({});

    expect(findRoot).to.throw(Error, 'No Drupal root found.');

  });

  it('throws an exception if it finds Drupal.php but no core directory', function () {

    mock({
      '../banana': {
        'index.php': '<php phpinfo();',
        'foo': {
          'bar': {
            'Drupal.php': '<php phpinfo();'
          }
        }
      }
    });

    expect(findRoot).to.throw(Error, 'No Drupal root found.');

  });

});