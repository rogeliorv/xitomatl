import Ember from 'ember';

// In the long run this is supposed to support
// We will start with the basic rule adding "S" to the words and grow the rules as needed
var customRules = {
    plurals:  [
        [/$/, 's'],
        [/$s/i, 's'],
    ],
    singular: [
        [/s$/i, ''],
        [/(ss)$/i, '$1'],
    ],
    irregularPairs: [],
    uncountable: [],
};

var inflector = new Ember.Inflector(customRules);


export function pluralizeWord([quantity, word], options) {
    const {omitCount} = options;
    var alteredWord = (quantity === 1 || quantity === -1) ? word : inflector.pluralize(word);
    return (omitCount ? '' : quantity + ' ') + alteredWord;
}

export default Ember.Helper.helper(pluralizeWord);
