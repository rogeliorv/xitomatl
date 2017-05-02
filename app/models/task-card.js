import DS from 'ember-data';
import Ember from 'ember';
import timeUtil from '../util/time-util';

export default DS.Model.extend({

    title: DS.attr('string'),
    description: DS.attr('string'),
    timeUnit: DS.attr('timeUnit', { defaultValue: timeUtil.defaultUnit }),
    createdDate: DS.attr('date', { defaultValue() {return new Date(); }}),
    deletedDate: DS.attr('date', { defaultValue: null }),

    // Relationships
    // A task card contains several tasks
    tasks: DS.hasMany('task', {async: true, inverse: null}),
    
    // TODO: Check how ember handles i18n
    friendlyTimeUnit: Ember.computed('timeUnit', function(){
        let timeUnit = this.get('timeUnit');
        if(timeUnit === 'day') { return "dia"; }
        if(timeUnit === 'hour') { return "hora"; }
        if(timeUnit === 'second') { return "segundo"; }
        if(timeUnit === 'minute') { return "minuto"; }
        return timeUnit;
    }),
});
