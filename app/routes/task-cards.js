import Ember from 'ember';

export default Ember.Route.extend({
    
    // Actions available to all sub routes
    // See task-cards/index.js for model() implementation and other things in the root route
    actions:  {
        
        addTaskToCard(containerCard, taskContent) {
            let store = this.get('store');
            let createdTask = store.createRecord('task', { title: taskContent, description: taskContent, taskCard: containerCard});
            containerCard.get('tasks').addObject(createdTask);
            return createdTask.save().then(() => containerCard.save());
        },
        
        deleteTask(task, containerCard) {
            return task.destroyRecord().then(() => {
                this.refresh();
                return containerCard.save();
            });
        },
        
        deleteTaskCard(taskCard) {
            var deletions = taskCard.get('tasks').map((task) => task.destroyRecord());
            // Ensures all comments are deleted before the post
            return Ember.RSVP.all(deletions).then(() => taskCard.destroyRecord());
        },
        
        createTaskCard(cardTitle) {
            let store = this.get('store');
            let result = store.createRecord('task-card', { title: cardTitle }).save();
            return result;
        },
        
        updateTaskCard(taskCard) {
            // If not using a real time database in the future, check that you have the last version
            // Or decide is the object should just be overwritten
            let result = taskCard.save();
            return result;
        }
    },
});
