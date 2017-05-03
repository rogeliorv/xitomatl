import Ember from 'ember';

const { inject: { service } } = Ember;

export default Ember.Route.extend({
    
    session: service(),
    
    beforeModel: function() {
        return this.get('session').fetch().then(() => {
            if(this.get('session.isAuthenticated')) {
                return this.transitionTo('task-cards');
            }
        }).catch(() => {
            // TODO: Get the user logs to see how they got here
            console.log("Could not get session");
        });
    },
    
    actions: {
        signInSuccess() {
            this.get('session').fetch().then(() => {
                this.transitionTo('task-cards');
            });
        },
    }
});
