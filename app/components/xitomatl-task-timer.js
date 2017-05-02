import Ember from 'ember';

// This can be made much more efficient without computed properties or observers
// But for the sake of learning using ember we will use them.

const WORK_TIMER = 'WORK_TASK';

const TIMERS = {
    'WORK_TASK': 1000 * 60 * 25, // 25 minutes
    'SHORT_BREAK':  1000 * 60 * 5, // 5 minutes
    'LONG_BREAK': 1000 * 60 * 10 // 10 minutes
};

export default Ember.Component.extend({
    // The task that we wil be tracking
    task: null,
    // Time since the last save ocurred. If in a break there are no saves, so
    // it is the elapsed time from when the user hit the play button
    milisSinceLastSave: null,
    // The object returned by setInterval
    intervalTimerId: null,
    // The remaining time for the count down (can be work or break)
    countDownRemainingMilis: null,
    // Update task
    // This function is passed down by other components
    updateTask: null,
    // Indicates if the user has clicked on the work task button and wants the timer to appear
    isWorkingInTask: false,
    // The currently selected countdown (work, short break, long break)
    selectedCountdown: null,
    // Indicates if we are currently executing the timer
    isCountingDown: null,
    // Indicates if the reset button should be shown
    showResetButton: Ember.computed('countDownRemainingMilis', 'selectedCountdown', function() {
        return this.get('countDownRemainingMilis') < this.get('selectedCountdown');
    }),
    
    init() {
        this._super(...arguments);
        this.set('selectedCountdown', TIMERS[WORK_TIMER]);
        this.set('countDownRemainingMilis', this.get('selectedCountdown'));
        
    },
    
    didInsertElement() {
        this._super(...arguments);
        if(this.timer === 'on') {
            this.send('startTimerAction');
            // this.actions.startTimerAction.bind(this)();
        }
    },
    
    // If given a negative number, the format will default to 00:00:00
    getTimeObjectFromMilis(milis) {
        let totalSeconds = Math.max(milis,0) / 1000;
        let days = Math.floor(totalSeconds / (3600 * 24));
        let hours = String(Math.floor((totalSeconds / 3600)) % 24);
        let minutes = String(Math.floor((totalSeconds / 60)) % 60);
        let seconds = String(Math.floor(totalSeconds % 60));
        
        return {
            totalMilis: milis,
            days: days,
            // Use the format 00:00:00 for hours, minutes and seconds
            hours: "00".substring(0, 2 - hours.length) + hours,
            minutes: "00".substring(0, 2 - minutes.length) + minutes,
            seconds: "00".substring(0, 2 - seconds.length) + seconds,
        };
    },
    
    countDownRemainingTime: Ember.computed('countDownRemainingMilis', function() {
        return this.getTimeObjectFromMilis(this.get('countDownRemainingMilis'));
    }),
    
    remainingTaskTime: Ember.computed('task.duration', 'task.timeSpent', 'milisSinceLastSave', function() {
        
        // Task duration and task spent are in milis
        let taskDuration = this.get('task.duration');
        let timeSpent = this.get('task.timeSpent');
        
        let milisSinceLastSave = this.isWorkingTimerSelected() ? this.get('milisSinceLastSave') : 0;
        let remainingMilis = taskDuration - (timeSpent + milisSinceLastSave);
        return this.getTimeObjectFromMilis(remainingMilis);
    }),
    
    isTaskFinished() {
        let task = this.get('task');
        return task.get('duration') <= (task.get('timeSpent') + this.get('milisSinceLastSave'));
    },
    
    isCountDownFinished() {
        return this.get('countDownRemainingMilis') <= 0;
    },
    
    // Start the count down. Every N ticks save the spent time to the server
    // And update the timeSpent, taskTimeSpent variables to reflect the changes
    startTimerInterval() {
        const intervalConfig = 250;
        const checkPointConfig = intervalConfig * 4 * 10;
        this.set('isCountingDown', true);
        var lastTick = Date.now();
        
        let intervalId = setInterval(function() {
            // This can get really fun if the user starts moving the machine settings
            // For this app it is not the case we want to handle that scenario
            // Recommended: Use the server to handle the countdowns which brings up
            // interesting cases for keeping in sync
            let now = Date.now();
            let delta = now - lastTick;
            lastTick = now;

            this.decrementProperty('countDownRemainingMilis', delta);
            this.incrementProperty('milisSinceLastSave', delta);
            
            let isFinished = this.isTaskFinished() || this.isCountDownFinished();
            
            if(isFinished) {
                this.endTimerInterval();
            }
                        
            if(this.get('milisSinceLastSave') > checkPointConfig || isFinished) {
                this.saveSpentTime();
            }
            
        }.bind(this), intervalConfig);
        this.set('intervalTimerId', intervalId);
    },
    
    endTimerInterval() {
        this.set('isCountingDown', false);
        clearInterval(this.get('intervalTimerId'));
    },
    
    saveSpentTime() {
        
        if(this.isWorkingTimerSelected()) {
            let saveFunc = this.get('updateTask');
            let task = this.get('task');
            let milisSinceLastSave = this.get('milisSinceLastSave');
            // How will we handle any delays here? How do we adjust?
            task.set('timeSpent', Math.min(task.get('duration'), task.get('timeSpent') + milisSinceLastSave));
            this.set('milisSinceLastSave', 0);
            return saveFunc(task);
        }
        
        return false;
    },
    
    isWorkingTimerSelected() {
        return this.get('selectedCountdown') === TIMERS[WORK_TIMER];
    },
    
    actions: {
    
        startTimerAction() {
            this.endTimerInterval();
            this.set('isWorkingInTask', true);
            this.set('milisSinceLastSave', 0);
            this.startTimerInterval();
        },
        
        resetTimerAction() {
            this.endTimerInterval();
            this.set('countDownRemainingMilis', this.get('selectedCountdown'));
            this.saveSpentTime();
        },
        
        pauseTimerAction() {
            this.endTimerInterval();
            this.saveSpentTime();
        },
        
        selectTimerAction(selectedTimer) {
            this.set('isWorkingInTask', true);
            this.endTimerInterval();
            let timerValue = TIMERS[selectedTimer] || TIMERS[WORK_TIMER];
            this.set('selectedCountdown', timerValue);
            this.set('countDownRemainingMilis', this.get('selectedCountdown'));
        },
        
    },
});
