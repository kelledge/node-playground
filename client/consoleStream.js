const Writable = require('stream').Writable;
const util = require('util');

function ConsoleStream(options) {
  if (!(this instanceof ConsoleStream))
    return new ConsoleStream(options);
  Writable.call(this, {objectMode: true});
}

util.inherits(ConsoleStream, Writable);

ConsoleStream.prototype._write = function(chunk, encoding, callback) {
    console.log(chunk.toString('utf8'));
    callback();
}

module.exports = ConsoleStream;