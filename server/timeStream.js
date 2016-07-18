const Readable = require('stream').Readable;
const util = require('util');

function TimeStream(start, step) {
  var self = this;

  self.start = start;
  self.step = step;
  self.time = self.start;


  if (!(this instanceof TimeStream))
    return new TimeStream(start, step);
  Readable.call(this, {objectMode: true});

}

util.inherits(TimeStream, Readable);

TimeStream.prototype.begin = function() {
    var self = this;

    setInterval(function () {
        self.push(self.time.toString());
        self.time += self.step;
    }, self.step);
}

TimeStream.prototype._read = function(count) {

}

module.exports = TimeStream;