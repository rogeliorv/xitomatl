import DS from 'ember-data';
import Ember from 'ember';
import priorityUtil from '../util/priority-util';
import timeUtil from '../util/time-util';
import moment from 'moment';

export default DS.Model.extend({
    
    title: DS.attr('string'),
    description: DS.attr('string'),
    priority: DS.attr('priority',  { defaultValue: priorityUtil.defaultPriority }),
    // In miliseconds
    duration: DS.attr('number',  { defaultValue: 1000 * 3600 }),
    // In miliseconds
    timeSpent: DS.attr('number', { defaultValue: 0 }),
    // User choice for the time unit
    timeUnit: DS.attr('timeUnit', {defaultValue: timeUtil.defaultUnit }),
    dueDate: DS.attr('date', { defaultValue: null }),
    completedDate: DS.attr('date', { defaultValue: null }),
    createdDate: DS.attr('date', { defaultValue() {return new Date(); }}),
    deletedDate: DS.attr('date', { defaultValue: null }),
    // Relationships
    // A task card may contain several tasks
    taskCard: DS.belongsTo('task-card', {async: true, inverse: null}),
    
    // Computed properties, not part of the model itself. They are just helpful data
    priorityClass: Ember.computed('priority', function() {
        
        let priorityValue = this.get('priority');
        let result = priorityUtil.getPriorityLevel(priorityValue);
        return result;
    }),
    
    progress: Ember.computed('duration', 'timeSpent', function() {
        var progress = Math.trunc((this.get('timeSpent') / this.get('duration')) * 100);
        return Math.min(progress, 100);
    }),
    
    progressClass: Ember.computed('progress', 'completedDate', function() {
        let completedDate = this.get('completedDate');
        let progress = this.get('progress');
        // Green: 85 - 100
        // Orange: 40 - 85
        // Red: 0 - 40
        var result = "red";
        
        if(completedDate || progress >= 85) {
            result = "green";
        }
        else if(progress >= 40) {
            result = "orange";
        }
        return result;
    }),
    
    // TODO: Check how ember handles i18n
    friendlyTimeUnit: Ember.computed('timeUnit', function(){

        let timeUnit = this.get('timeUnit');
        if(timeUnit === 'day') { return "dia"; }
        if(timeUnit === 'hour') { return "hora"; }
        if(timeUnit === 'second') { return "segundo"; }
        if(timeUnit === 'minute') { return "minuto"; }
        return timeUnit;
    }),
    
    friendlyDueDate: Ember.computed('dueDate', {
        get() {
            let dueDate = this.get('dueDate');
            let result =  (dueDate !== undefined && dueDate !== null) ? moment(dueDate).format('DD/MM/YYYY') : null;
            return result;
        },
        set(value) {
            // Only accepting the format DD/MM/YYYY
            let m = moment(value, 'DD/MM/YYYY');
            if(m.isValid()) {
                this.set('dueDate', m.toDate());
                return value;
            }
            return this.get('friendlyDueDate');
        }
    }),
    
    unitDuration: Ember.computed('duration', 'timeUnit', {
        get() {
            let result = timeUtil.getTimeUnitByMilis(this.get('duration'), this.get('timeUnit'));
            return result;
        },
        set(key, value) {
            let milis = timeUtil.getMilisByUnit(value, this.get('timeUnit'));
            this.set('duration', milis);
            return value;
        },
    }),
    
    unitTimeSpent: Ember.computed('timeSpent', 'timeUnit', function(){
        return timeUtil.getTimeUnitByMilis(this.get('timeSpent'), this.get('timeUnit'));
    }),
});
