// Generated by CoffeeScript 1.6.3
(function() {
  var Subsonic, expect, nconf, origBe, request, subsonic;

  request = require('superagent');

  expect = require('expect.js');

  nconf = require('nconf');

  require('coffee-script');

  origBe = expect.Assertion.prototype.be;

  expect.Assertion.prototype.be = expect.Assertion.prototype.equal = function(obj) {
    this._expected = obj;
    return origBe.call(this, obj);
  };

  nconf.argv().env().file(__dirname + '/config.json');

  /* Subsonic*/


  Subsonic = require('../src/subsonic');

  subsonic = new Subsonic({
    username: nconf.get('USERNAME'),
    password: nconf.get('PASSWORD'),
    server: nconf.get('SERVER'),
    application: 'test'
  });

  /* Specs*/


  describe('API', function() {
    return describe('With proper parameters', function() {
      it('ping', function(done) {
        return subsonic.ping(function(err, res) {
          expect(err).to.be(null);
          expect(res.status).to.be('ok');
          return done();
        });
      });
      it('top level folders', function(done) {
        return subsonic.topLevelFolders(function(err, folders) {
          expect(err).to.be(null);
          expect(folders.length).to.be(2);
          return done();
        });
      });
      it('indexes', function(done) {
        return subsonic.indexes(function(err, indexes) {
          expect(err).to.be(null);
          expect(indexes.length).to.be(25);
          return done();
        });
      });
      it('folder', function(done) {
        return subsonic.folder(54, function(err, folder) {
          expect(err).to.be(null);
          expect(folder.children.length).to.be(46);
          expect(folder.id).to.be(54);
          expect(folder.name).to.be(2012);
          return done();
        });
      });
      it('artists', function(done) {
        return subsonic.artists(function(err, artists) {
          expect(err).to.be(null);
          expect(artists.length).to.be(25);
          return done();
        });
      });
      it('artist', function(done) {
        return subsonic.artist(1, function(err, artist) {
          expect(err).to.be(null);
          expect(artist.id).to.be(1);
          expect(artist.album.length).to.be(1633);
          return done();
        });
      });
      it('album', function(done) {
        return subsonic.album(1568, function(err, album) {
          expect(err).to.be(null);
          expect(album.id).to.be(1568);
          expect(album.song.length).to.be(4);
          return done();
        });
      });
      it('song', function(done) {
        return subsonic.song(35666, function(err, song) {
          expect(err).to.be(null);
          expect(song.id).to.be(35666);
          expect(song.genre).to.be('Jamband');
          expect(song.album).to.be('12-29-1997 MSG, NY');
          expect(song.title).to.be('Down With Disease >');
          return done();
        });
      });
      return it('chain', function(done) {
        return subsonic.ping(function(err, res) {
          return expect(res.status).to.be('ok');
        }).topLevelFolders(function(err, folders) {
          expect(folders.length).to.be(2);
          return done();
        });
      });
    });
  });

}).call(this);
