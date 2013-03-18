request = require 'superagent'

# Subsonic
class Subsonic
  # Subsonic
  #
  # @param  {object} @config username, password, server, are all required
  # @return {Subsonic} this
  constructor: (@config) ->
    { @username, @password, @server, @application, @format, @version } = @config
    @application ||= 'subsonic node.js api'
    @format ||= 'json'
    @version ||= '1.7'

    @

  # get
  #
  # @param  {string}   path
  # @param  {object}   query
  # @param  {Function} cb
  # @return {Subsonic} this
  get: (path, query, cb) ->
    cb = arguments[arguments.length - 1]

    request.get("#{@server}/#{path}.view")
      .query('u': @username, 'p': @password)
      .query('c': @application, 'v': @version, 'f': @format)
      .query(query unless typeof query is 'function')
      .end (res) ->
        cb res.body['subsonic-response']
    @

  # http://your-server/rest/ping.view
  #
  # @param  {Function} cb
  # @return {Subsonic} this
  ping: (cb) ->
    @get 'ping', (response) ->
      cb null, response

  # http://your-server/rest/getMusicFolders.view
  #
  # @param  {Function} cb
  # @return {Subsonic} this
  topLevelFolders: (cb) ->
    @get 'getMusicFolders', (res) ->
      cb null, res.musicFolders.musicFolder

  # http://your-server/rest/getIndexes.view
  #
  # @param  {Function} cb
  # @return {Subsonic} this
  indexes: (cb) ->
    @get 'getIndexes', (res) ->
      cb null, res.indexes.index

  # http://your-server/rest/getMusicDirectory.view
  #
  # @param  {number} id
  # @param  {Function} cb
  # @return {Subsonic} this
  folder: (id, cb) ->
    @get 'getMusicDirectory', { id }, (response) ->
      cb null, response.directory.child

  # http://your-server/rest/getArtists.view
  #
  # @param  {Function} cb
  # @return {Subsonic} this
  artists: (cb) ->
    @get 'getArtists', (res) ->
      cb null, res.artists.index

  # http://your-server/rest/getArtist.view
  #
  # @param  {number} id
  # @param  {Function} cb
  # @return {Subsonic} this
  artist: (id, cb) ->
    @get 'getArtist', { id }, (res) ->
      cb null, res.artist

  # http://your-server/rest/getAlbum.view
  #
  # @param  {number} id
  # @param  {Function} cb
  # @return {Subsonic} this
  album: (id, cb) ->
    @get 'getAlbum', { id }, (res) ->
      cb null, res.album

  # http://your-server/rest/getSong.view
  #
  # @param  {number} id
  # @param  {Function} cb
  # @return {Subsonic} this
  song: (id, cb) ->
    @get 'getSong', { id }, (res) ->
      cb null, res.song

  # http://your-server/rest/createShare.view
  #
  # @param  {number} id
  # @param  {Function} cb
  # @return {Subsonic} this
  createShare: (id, expires, cb) ->
    if typeof expires is 'function'
      cb = expires.bind {}
      # valid for 1 hour
      expires = (Date.now() / 1000) + 3600
    @get 'createShare', { id, expires }, (res) ->
      cb null, res.shares.share

module.exports = Subsonic
