const PassThrough = require('stream').PassThrough;
const m3u8stream  = require('m3u8stream');

/**
 * @param {String} url
 * @param {!Object} options
 * @return {ReadableStream}
 */
var ssdl = module.exports = function ssdl(url, options) {
  var stream = createStream(options);
  download(stream, url, options);
  return stream;
};


function createStream(options) {
  var stream = new PassThrough({
    highWaterMark: options && options.highWaterMark || null,
  });
  stream.destroy = function() { stream._isDestroyed = true; };
  return stream;
}


/**
 * Chooses a format to download.
 *
 * @param {stream.Readable} stream
 * @param {Object} options
 */
function download(stream, url, options) {
  options = options || {};
  if (stream._isDestroyed) { return; }

  var req = m3u8stream(url);
  req.on('error', stream.emit.bind(stream, 'error'));
  stream.destroy = req.end.bind(req);
  req.pipe(stream);
}
