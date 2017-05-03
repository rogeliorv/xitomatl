import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
  this.route('task-cards', function() {
      this.route('detail', {path: '/:task_card_id'});
  });

  this.route('task', { path: '/tasks/:task_id', queryParams: 'timer'});
  this.route('login');
  this.route('logout');
});

export default Router;
