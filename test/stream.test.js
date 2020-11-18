'use strict';

const chai = require('chai');
chai.should();
const loggerFactory = require('../index');
describe('getStream', () => {
  it('should work with stdout', () => {
    const stm = loggerFactory.getStream({
      logStream: 'STDOUT'
    });
    stm.stream.should.be.eql(process.stdout);
  });
  it('logstream should support lowercase', () => {
    const stm = loggerFactory.getStream({
      logStream: 'stdout'
    });
    stm.stream.should.be.eql(process.stdout);
  });
  it('should work with file', () => {
    const stm = loggerFactory.getStream({
      logStream: 'FILE',
      logPath: './foo/bar'
    });
    stm.should.be.eql({ path: './foo/bar' });
  });
  it('should work with syslog', () => {
    const stm = loggerFactory.getStream({
      logStream: 'SYSLOG',
      logHost: 'localhost',
      logPort: 514,
      logProto: 'tcp'
    });
    stm.type.should.be.equal('raw');
  });
  it('should able to set name for syslog', () => {
    const stm = loggerFactory.getStream({
      logName: 'foo',
      logStream: 'SYSLOG',
      logHost: 'localhost',
      logPort: 514,
      logProto: 'tcp'
    });
    stm.type.should.be.equal('raw');
    stm.stream.name.should.be.equal('foo');
  });
  it('should only set one stream', () => {
    const logger = loggerFactory.init({
      logName: 'oneStream',
      logStream: 'stdout',
      logStreams: [{
        logStream: 'stdout'
      }, {
        logName: 'multiStream',
        logStream: 'syslog',
        logHost: 'localhost',
        logPort: 514,
        logProto: 'tcp'
      }]
    });
    logger.streams.length.should.be.equal(1);
  });
  it('should able to set multi streams', () => {
    const logger = loggerFactory.init({
      logName: 'multiStream',
      logStreams: [
        {
          logStream: 'stdout'
        },
        {
          logName: 'multiStream',
          logStream: 'syslog',
          logHost: 'localhost',
          logPort: 514,
          logProto: 'tcp'
        }
      ]
    });
    logger.streams.length.should.be.equal(2);
  });
});
