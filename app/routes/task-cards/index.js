import Ember from 'ember';

export default Ember.Route.extend({
    
    model() {
        return this.get('store').findAll('task-card');
        //return this.get('store').query('task-card', { deletedDate: null});
    },
});


//https://hbr.org/2017/03/the-promise-of-blockchain-is-a-world-without-middlemen?utm_campaign=hbr&utm_source=facebook&utm_medium=social
//http://stackoverflow.com/questions/21496761/promise-value-not-put-into-template-after-resolved
//https://emberigniter.com/render-promise-before-it-resolves/
//https://guides.emberjs.com/v2.8.0/routing/asynchronous-routing/
//https://www.bloomberg.com/graphics/2017-fifty-best-startups/
//http://materialdesignblog.com/top-25-material-design-html-css-code-snippets-from-codepen/
//http://blog.trackets.com/2013/05/23/how-to-write-a-login-form.html
//https://dockyard.com/blog/2015/11/09/best-practices-extend-or-mixin
//https://www.lookseewellington.co.nz/account/register?_ga=1.149098934.1499963896.1488400815
//http://requirejs.org/docs/why.html
// http://requirejs.org/docs/whyamd.html
// https://speakerdeck.com/wycats/stability-without-stagnation-lessons-learned-from-shipping-ember-dot-js
// https://content-security-policy.com/
// https://futurism.com/ethereum-is-posed-to-become-the-global-blockchain/
// https://icebreaker.vc/events/icebreaker-pre-founder-project?utm_campaign=5898994bd4dbac3727006d3e&utm_content=58ad960edc97a56ee1023a37&utm_medium=smarpshare&utm_source=facebook
// https://gingkoapp.com/ember.html
// https://benegasyblanco.com/2017/02/28/la-imparable-infantilizacion-de-occidente/
// https://singularityhub.com/2017/03/03/8-principles-for-leaders-to-make-the-most-of-the-exponential-age/?utm_content=buffer31777&utm_medium=social&utm_source=facebook-su&utm_campaign=buffer
// https://singularityhub.com/2017/03/04/are-we-ready-for-cyborgs-the-tech-is-on-its-way/
// https://www.posible.org.mx/2017/registro/?ref=FBP
// https://blog.embermap.com/lowest-common-ancestor-fbf5d5313a1#.9btbhtcfe
// https://m.alphasights.com/composable-helpers-and-route-actions-two-ember-add-ons-you-should-know-655cf39fd9de#.spb4b4yk4
