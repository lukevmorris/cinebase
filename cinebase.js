var Cinebase = Ember.Application.create();

Cinebase.Router.map(function () {
  this.resource('movies', { path: '/' });
});

Cinebase.Movie = Ember.Object.extend({
  title: ''
});

var movies = [
  Cinebase.Movie.create({title: 'Iron Man 3'}),
  Cinebase.Movie.create({title: 'The Avengers'}),
  Cinebase.Movie.create({title: 'The Waitress'}),
  Cinebase.Movie.create({title: 'The Notebook'})
]

Cinebase.MoviesRoute = Ember.Route.extend({
  model: function() {
    return movies;
  }
});

Cinebase.MoviesController = Ember.ArrayController.extend({
  actions : {
    addMovie : function () {
      this.pushObject(Cinebase.Movie.create({
        title: this.get('newTitle')
      }));

      this.set('newTitle','');
    },

    removeMovie : function(movie) {
      this.removeObject(movie);
    }
  }
});
