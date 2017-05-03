import Ember from 'ember';

const { inject: { service } } = Ember;

export default Ember.Route.extend({
    
    session: service(),
    
    beforeModel: function() {
        return this.get('session').fetch().then(() => {
            
            // If not authenticated, redirect to the login page
            if(!this.get('session.isAuthenticated')) {
                this.transitionTo('login');
            }
            // If authenticated just log out and then redirect to the main page
            else {
                return this.signOut();
            }
        }).catch(() => {
            console.log("Could not get the session while logging out.");
            this.transitionTo('index');
        });
    },
    
    signOut() {
        this.get('session').close().then(() => this.transitionTo('index'));
    },
    
    actions: {
        
    }
});
