import Ember from 'ember';
import moment from 'moment';

export function humanDate([date, defaultValue]) {
    return date ? moment(date).format('DD/MMM/YYYY') : defaultValue;
}

export default Ember.Helper.helper(humanDate);
