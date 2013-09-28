window.Cinebase = Ember.Application.create();

Cinebase.ApplicationAdapter = DS.LSAdapter.extend({
  namespace: 'cinebase-emberjs'
});

Cinebase.Router.map(function () {
  this.resource('movies', { path: '/' });
});

Cinebase.Movie = DS.Model.extend({
  title: DS.attr('string'),
  isOwned: DS.attr('boolean')
});

Cinebase.MovieController = Ember.ObjectController.extend({
  actions : {
    removeMovie : function () {
      var movie = this.get('model');
      movie.deleteRecord();
      movie.save();
    }
  },

  isOwned : function (key, value) {
    var movie = this.get('model');

    if (value === undefined) {
      return movie.get('isOwned');
    } else {
      movie.set('isOwned', value);
      movie.save();
      return value;
    }
  }.property('model.isOwned')
});

Cinebase.MoviesRoute = Ember.Route.extend({
  model: function() {
    return this.store.find('movie');
  }
});

Cinebase.MoviesController = Ember.ArrayController.extend({
  actions : {
    addMovie : function () {
      var newTitle = this.get('newTitle');

      if (!newTitle.trim()) { return; }

      var movie = this.store.createRecord('movie', {
        title: newTitle
      });

      this.set('newTitle','');
      movie.save();
    },

    removeMovie : function(movie) {
      this.store.deleteRecord(movie);
      movie.save();
    }
  }
});
