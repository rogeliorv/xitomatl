// The units we can convert to
const DEFAULT_PRIORITY = "Baja";

// TODO: Translate this
// Last priority is always the equivalent of undefined
// The index of the element is the id and the value for the key is the classification
const PRIORITIES = [
    ["Alta", 'high'],    // 0
    ["Media", 'medium'], // 1
    ["Baja", 'low'],     // 2
    ["Ninguna", 'none']  // 3
];

function getPriorityLevel(deserialized) {
    let index = PRIORITIES.findIndex(function(element) {
        return deserialized === element[0];
    });
    index = index !== -1 ? index : PRIORITIES.length -1 ;
    
    return PRIORITIES[index][1];
}

export default {
    defaultPriority: DEFAULT_PRIORITY,
    priorities: PRIORITIES,
    getPriorityLevel: getPriorityLevel
};
