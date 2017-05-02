import Ember from 'ember';
import mdlTextfield from '../mixins/mdl-textfield';
import moment from 'moment';

export default Ember.Component.extend(mdlTextfield, {
    
    
    task: null,
    tagName: 'div',
    classNames: ['xitomatl-task', 'mdl-card', 'mdl-shadow--4dp'],

    
    updateHelper(key, value) {
        let task = this.get('task');
        let parentFunc = this.get('updateTask');
        task.set(key, value);
        return parentFunc(task);
    },
    
    actions: {
        
        focusHelper(elementId) {
            this.$(`#${elementId}`).focus();
        },
        
        taskFormSubmit() {
            return false;
        },
        
        deleteTask() {
            let task = this.get('task');
            return this.get('deleteTask')(task);
        },
        
        selectPriority(priority ) {
            if(priority !== null && priority !== undefined) {
                return this.updateHelper('priority', priority);
            }
            return false;
        },
                
        updateTaskTitle(taskCardTitleContent) {
            if(taskCardTitleContent !== null && taskCardTitleContent !== undefined && taskCardTitleContent.length > 0) {
                return this.updateHelper('title', taskCardTitleContent);
            }
            return false;
        },
        
        updateTaskDuration(duration) {
            let parsed = parseInt(duration);
            if(duration === null || duration === undefined || isNaN(parsed) || duration === '') {
                duration = this.get('task.duration') || null;
            }
            return this.updateHelper('unitDuration', duration);
        },
        
        updateTaskDescription(taskDescription) {
            if(taskDescription !== null && taskDescription !== undefined && taskDescription.length > 0) {
                return this.updateHelper('description', taskDescription);
            }
            return false;
        },
        
        updateTaskDueDate(taskDueDate) {
        
            if(taskDueDate !== null && taskDueDate !== undefined && taskDueDate.length > 0) {
                let m = moment(taskDueDate, 'DD/MM/YYYY');
                if(m.isValid()) {
                    return this.updateHelper('friendlyDueDate', taskDueDate);
                }
            }
            
            
            return false;
        },
        
        selectTimeUnit(timeUnit) {
            if(timeUnit !== null && timeUnit !== undefined) {
                return this.updateHelper('timeUnit', timeUnit);
            }
            return false;
        },
        
        toggleCompleteTask() {
            
            let completedDate = this.get('task.completedDate');
            // new Date() returns the utc time, so no timezone issues
            // still, we cannot trust the client to send the correct date
            // so this should be handled on the server. Good enough for the MVP tho
            let toggledValue = completedDate === null || completedDate === undefined ? new Date() : null;
            return this.updateHelper('completedDate', toggledValue);
        }
    }
});
