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

    var x = parseInt(data[0]) + self.now
    var y = parseFloat(data[1])

    console.log([x, y]);
    self.series.addPoint(y, true, true)
    callback();
}

module.exports = SeriesSink;