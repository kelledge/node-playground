const Transform = require('stream').Transform;
const util = require('util');

function SineTransform(period, amplitude) {
  var self = this;

  self.period = period;
  self.amplitude = amplitude;

  if (!(this instanceof SineTransform))
    return new SineTransform(period, amplitude);
  Transform.call(this, {objectMode: true});
}
util.inherits(SineTransform, Transform);

SineTransform.prototype._transform = function (data, encoding, callback) {
    var self = this;
    var omega = 2*Math.PI / self.period;
    var t = parseInt(data);

    var value = self.amplitude * Math.sin(t*omega);
    self.push(data + ',' + value.toString());
    callback();
}

module.exports = SineTransform;