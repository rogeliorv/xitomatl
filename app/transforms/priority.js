import DS from 'ember-data';
import priorityUtil from '../util/priority-util';

export default DS.Transform.extend({
  
     /**
     * Use the priorities array to translate the priority id to a human readable value
     * TODO: Get the priority name and id from the store instead of using a transform
     * and make them configurable per user
     */
    deserialize(serialized) {
        var result = priorityUtil.priorities[serialized][0];
        
        if(result === undefined || result === null) {
            serialized = priorityUtil.priorities.length - 1;
            result = priorityUtil.priorities[serialized][0];
        }
        return result;
    },

    /**
     * Given the text of the priority, transform back to the id
     */
    serialize(deserialized) {
        let result = priorityUtil.priorities.findIndex(function(element) {
            return deserialized === element[0];
        });
        
        result = result !== -1 ? result : priorityUtil.priorities.length -1 ;
        return result;
    },
});
