import Ember from 'ember';

export default Ember.Route.extend({
    
    model(params) {
        let store = this.get('store');
        return store.findRecord('task-card', params.task_card_id);
    }
});
