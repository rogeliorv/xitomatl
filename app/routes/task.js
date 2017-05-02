import Ember from 'ember';

export default Ember.Route.extend({
    
    queryParams: {
        timer: { refreshModel: false }
    },
    
    actions: {
        
        updateTask(task) {
            // TODO: Check changes in the model, and if it is the latest version
            // There won't be a bug here until we have multiple users editing the same information
            let result = task.save();
            return result;
        },
        
        deleteTask(task) {
            let result = task.destroyRecord().then(() => this.transitionTo('task-cards'));
            return result;
        }
    },
    
    model(params) {
        let store = this.get('store');
        return store.findRecord('task', params.task_id).then((result) => {
            return {
                task: result,
                timer: params.timer
            };
        });
    }
});
