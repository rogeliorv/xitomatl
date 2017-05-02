import DS from 'ember-data';

// TODO: Translate this
// Last priority is always the equivalent of undefined
// The index of the element is the id and the value for the key is the classification
let timeUnits = [
    'milis',
    'second',
    'minute',
    'hour',
    'day',
    'week',
    'month',
    'year',
];

// The default time unit is minutes
const DEFAULT_TIME_UNIT = 2;

export default DS.Transform.extend({
    
    /**
    * Use the timeUnits array to translate the time unit id to a human readable value
    * TODO: Get the time units from the store
    */
    deserialize(serialized) {
        let timeUnit = timeUnits[serialized];
        return timeUnit ? timeUnit : timeUnits[DEFAULT_TIME_UNIT];
    },

    serialize(deserialized) {
        let id = timeUnits.indexOf(deserialized);
        return (id !== -1) ? id : DEFAULT_TIME_UNIT;
    }
});
