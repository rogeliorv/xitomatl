const DEFAULT_UNIT = "minute";
// The units we can convert to
const UNITS = {
    'milis': 1,
    'second': 1000,
    'minute': 1000 * 60,
    'hour': 1000 * 60 * 60,
    'day': 1000 * 60 * 60 * 24
};

let getTimeUnitByMilis = function (milis, unit) {
    let div = UNITS[unit];
    div = div ? div : UNITS[DEFAULT_UNIT];
    return Math.floor(milis / div);
};


let getMilisByUnit = function(value, unit) {
    
    let div = UNITS[unit];
    div = div ? div : UNITS[DEFAULT_UNIT];
    return value * div;
};

export default {
    getTimeUnitByMilis: getTimeUnitByMilis ,
    getMilisByUnit: getMilisByUnit,
    defaultUnit: DEFAULT_UNIT,
    units: UNITS
};
