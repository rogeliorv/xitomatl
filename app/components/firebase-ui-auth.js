import Ember from 'ember';
import firebase from 'firebase';
import firebaseui from 'npm:firebaseui';

const { computed, inject: { service } } = Ember;

export default Ember.Component.extend({
    
    firebaseApp: service(),
    elementId: 'firebaseui-auth-container',
    
    didInsertElement() {
        this._super(...arguments);
        this._initializeAuthUI();
    },

    // This is sent as an action by the invoker of this component
    signInSuccess() {},

    uiConfig: computed('signInSuccess', function () {
        return {
            signInOptions: [
                {
                  provider: firebase.auth.EmailAuthProvider.PROVIDER_ID,
                  requireDisplayName: false
              },
                firebase.auth.GoogleAuthProvider.PROVIDER_ID,
                firebase.auth.FacebookAuthProvider.PROVIDER_ID,
                firebase.auth.TwitterAuthProvider.PROVIDER_ID,
            ],
            // Terms of service url.
                tosUrl: '/terms_of_service',
            callbacks: {
                signInSuccess: this.get('signInSuccess'),
            },
        };
    }),

    _initializeAuthUI() {
        const auth = this.get('firebaseApp').auth();
        const ui = new firebaseui.auth.AuthUI(auth);
        ui.start('#firebaseui-auth-container', this.get('uiConfig'));
        this.set('ui', ui);
    },
});
