const Writable = require('stream').Writable;
const util = require('util');

function SeriesSink(series) {
  var self = this;
  self.series = series;
  self.now = (new Date()).getTime()

  if (!(this instanceof SeriesSink))
    return new SeriesSink(series);
  Writable.call(this, {objectMode: true});
}

util.inherits(SeriesSink, Writable);

SeriesSink.prototype._write = function(chunk, encoding, callback) {
    data = chunk.toString('utf8').split(',')

    var shift = false
    var x = parseInt(data[0]) + self.now
    var y = parseFloat(data[1])

    console.log([x, y]);

    if (self.series.data.length > 20) {
      shift = true
    }

    self.series.addPoint([x, y], true, shift, true)
    callback();
}

module.exports = SeriesSink;
