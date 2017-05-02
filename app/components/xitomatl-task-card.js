import Ember from 'ember';
import DS from 'ember-data';
import mdlTextfield from '../mixins/mdl-textfield';
import timeUtil from '../util/time-util';

export default Ember.Component.extend(mdlTextfield, {
    
    taskCard: null,
    showDetails: false,
    tagName: 'div',
    classNames: ['xitomatl-card', 'mdl-card', 'mdl-shadow--4dp', 'mdl-cell','mdl-cell--4-col-phone'],
    classNameBindings: [
        'showDetails:details:',
        // See: https://getmdl.io/components/index.html#layout-section/grid
        // Desktop
        'showDetails:mdl-cell--12-col:mdl-cell--4-col',
        // Tablet
        'showDetails:mdl-cell--8-col-tablet:mdl-cell--4-col-tablet',
        // Empty Task Card
        'taskCard::emptyTaskCard',
    ],
    
    // The content for the input where you add a new task when hitting enter
    newTaskContent: null,
    // For empty cards this is the title of the to be created card
    emptyTaskCardContent: null,
    
    // Using javascript to hack the ellipsis in the title.
    // We will show the first 40 characters, after that use "..."
    shortTitle: Ember.computed('taskCard.title', 'showDetails', {
            get() {
                return this.getShortTitle();
            },
            set(key, value) {
                return value;
            }
        }
    ),
    
    // Contains the string with the search bar value
    taskSearchFilter: null,
    
    // Cards will show at most this elements.
    // In details mode all the tasks are shown
    // TODO: A/B test scrollbars, see what works better
    totalShownElements: Ember.computed('showDetails', 'taskCard.tasks', function() {
        
        let showDetails = this.get('showDetails');
        let tasksLength = this.get('taskCard.tasks.length');
        const maxForNonDetails = 5;
        return showDetails ? tasksLength : maxForNonDetails;
    }),
    
    // Indicates the list of tasks that will be shown on screen
    // Only when details is true, we show the whole list
    shownElements: Ember.computed('taskSearchFilter', 'totalShownElements',  function() {
        let tasks = this.get('taskCard.tasks');
        let searchFilter = this.get('taskSearchFilter');
        let shownElements = this.get('totalShownElements');
        
        if(searchFilter !== null && searchFilter !== undefined && searchFilter !== '') {
            tasks = tasks.filter((task) => {
                return task.get('title').indexOf(searchFilter) !== -1 ||
                       task.get('description').indexOf(searchFilter) !== -1;
            });
        }
        
        return tasks.slice(0, shownElements);
    }),
        
    // For the short version of the task-card indicate how many elements are not being shown
    remainingElements: Ember.computed('totalShownElements', function() {
        let tasks = this.get('taskCard.tasks');
        let shownElements = this.get('totalShownElements');
        let remainingElements = tasks.get('length') - shownElements;
        return Math.max(0, remainingElements);
    }),
    
    // Contains the duration, timespent and progress values
    summary: Ember.computed('taskCard.tasks', function() {
        
        let taskCard = this.get('taskCard');
        let tasksPromise = taskCard.get('tasks');
        let timeUnit = this.get('taskCard.timeUnit');
        
        return DS.PromiseObject.create({promise: tasksPromise.then(function(tasks) {
            
            let totalDuration = 0;
            let totalTimeSpent = 0;
            let progressTime = 0;
            let inProgressCount = 0;
            let completedCount = 0;
            
            //for of not supported yet in ember
            tasks.forEach(function(task) {
                
                let duration = task.get('duration');
                let timeSpent = task.get('timeSpent');
                let completedDate = task.get('completedDate');
                
                totalDuration += duration;
                totalTimeSpent += timeSpent;
                
                progressTime += completedDate ? duration : Math.min(duration, timeSpent);
                // Count for whatever is not falsey
                completedCount += completedDate ? 1 : 0;
                inProgressCount += timeSpent && !completedDate ? 1 : 0;
            });
            
            let progress = Math.trunc((progressTime / totalDuration) * 100);
            
            return { progressPercentage: Math.min(progress, 100),
                     progressTime: timeUtil.getTimeUnitByMilis(progressTime),
                     duration: timeUtil.getTimeUnitByMilis(totalDuration, timeUnit),
                     timeSpent: timeUtil.getTimeUnitByMilis(totalTimeSpent, timeUnit),
                     inProgressTasks: inProgressCount,
                     completedTasks: completedCount
            };
        })});
    }),

    // Helper to put ellipsis in the title so we don't show a cropped text
    // for certain situations
    getShortTitle() {
            
            let showDetails = this.get('showDetails');
            // Good enough for two lines max
            let limit = showDetails ? 80 : 40;
            let title = this.get('taskCard.title');
            if(title.length < limit) {
                return title;
            }
            
            return `${title.slice(0, limit)}...`;
    },
    
    updateHelper(key, value) {
        let taskCard = this.get('taskCard');
        let parentFunc = this.get('updateTaskCard');
        taskCard.set(key, value);
        return parentFunc(taskCard);
    },
    
    actions: {

        createTask(taskContent) {
            this.set('newTaskContent', null);
            let trimmedContent = taskContent.trim();
            
            if(trimmedContent.length > 0) {
                let containerCard = this.get('taskCard');
                let parentFunc = this.get('addTaskToCard');
                let result = parentFunc(containerCard, trimmedContent);
                return result;
            }
            
            return false;
        },
        
        // Start: Task related actions
        deleteTask(task) {
            let containerCard = this.get('taskCard');
            let parentFunc = this.get('deleteTask');
            return parentFunc(task, containerCard);
        },
        
        // Prevent the submission
        newTaskFormSubmit() {
            return false;
        },
        
        // The button in add task was clicked
        addTaskButtonAction(elementId) {
            let content = this.get('newTaskContent');
            // If there is some content, add the task
            if(content !== null && content !== undefined && content.length > 0) {
                this.actions.createTask.bind(this)(content);
            }
            // If no content just focus or refocus the bar
            else {
                this.actions.focusBar.bind(this)(elementId);
            }
        },
        // End: Task related actions
        
        // Start: Task Card related actions
        deleteTaskCard() {
            let taskCard = this.get('taskCard');
            let parentFunc = this.get('deleteTaskCard');
            return parentFunc(taskCard);
        },
        
        
        // // If there are any ellipsis for the short title, remove them and put the full title
        focusTaskCardTitle() {
            this.set('shortTitle', this.get('taskCard.title'));
        },
        
        // If the title is too long, when bluring from the input set the short title
        blurTaskCardTitle() {
            this.set('shortTitle', this.getShortTitle());
        },
        
        // Save the title to the store
        updateTaskCardTitle(taskCardTitleContent) {
            this.updateHelper('title', taskCardTitleContent);
        },
        
        toggleCardDetails() {
            this.set('showDetails', !this.get('showDetails'));
        },
        
        taskCardFormSubmit() {
            // TODO: Update the details task card
            
        },
        
        // This function does nothing, just her for expliciteness sake.
        // To see how the search words see the computed property taskSearchFilter
        searchTasks() {
            return false;
        },
        
        focusBar(element) {
            this.$(`#${element}`).focus();
        },
        
        clearBar(element) {
            this.$(`#${element}`).val('');
            this.set('taskSearchFilter', '');
        },
        // End: Task card related actions

        // Start: Empty Task card actions
        emptyCardFormSubmit() {
            return false;
        },
        
        emptyCardAddAction() {
            let content = (this.get('emptyTaskCardContent') || '').trim();
            this.set('emptyTaskCardContent', '');
            // If there is some content create the new task card
            if(content.length > 0) {
                let parentFunc = this.get('createTaskCard');
                let result = parentFunc(content);
                return result;
            }
            // If there is no text in the input focus the input
            else {
                Ember.$('#emptyTaskCardInput').focus();
            }
            
            return false;
        }
        // End: Empty task card actions
    },
});

//https://emberigniter.com/5-essential-ember-concepts/
//http://blog.triplebyte.com/how-to-pass-a-programming-interview
//https://www.linkedin.com/pulse/hack-a-holiday-bookingcom-nairobi-edition-oana-maria-iordachescu?trk=mp-reader-card
//https://workingatbooking.com/blog/life-of-a-graduate/
// https://emberigniter.com/5-essential-ember-concepts/#5-components
// https://emberigniter.com/send-closure-actions-up-data-owner/
// https://emberigniter.com/getting-started-ember-cli-data-down-actions-up-tutorial/
// https://emberigniter.com/getting-started-ember-cli-data-down-actions-up-tutorial/
// https://blog.embermap.com/passing-data-around-your-ember-application-c4fe1e06e90#.pvqo1kx0d
// https://spin.atomicobject.com/2016/06/25/emberjs-closure-actions/
// https://m.alphasights.com/composable-helpers-and-route-actions-two-ember-add-ons-you-should-know-655cf39fd9de#.spb4b4yk4
// https://alisdair.mcdiarmid.org/ember-closure-actions-have-return-values/
// https://dockyard.com/blog/2015/10/29/ember-best-practice-stop-bubbling-and-use-closure-actions
// http://alexdiliberto.com/posts/ember-closure-actions/
// https://github.com/BotCube/awesome-bots
// http://opensource.addepar.com/ember-widgets/#/ember-widgets/radioButton
// http://www.pcworld.com/article/3177303/gaming/razers-zvault-virtual-currency-for-gamers-is-like-a-mash-up-of-bitcoin-and-xbox-live-points.html
// https://www.startupgrind.com/blog/a-creative-mess-how-to-get-your-business-organized/?utm_content=bufferd388a&utm_medium=social&utm_source=facebook.com&utm_campaign=buffer
// http://www.coindesk.com/the-45-dollar-question-dash-whats-going-on/
// http://www.coindesk.com/ether-prices-surge-shadow-bitcoin-dash/
// https://en.wikipedia.org/wiki/Dash_(cryptocurrency)
//
// PrivateSend
// InstantSend
// Dash evolution
//
// https://www.youtube.com/channel/UCeFCPtS8sViGO_NpKnS2rpg
// http://www.gridcoin.us/?gclid=CLb5-ZLaydICFQS2wAod97gPLQ
// Hosting apps on the ledger (image hosting killer, youtube killer)
// Associate email with eth wallet address
// Associate email with bitcoin wallet address
// Website hosting (javascript and such on the ledger) (real serverless, how do you manage http)
// https://www.lensrentals.com/blog/2012/10/the-man-who-almost-never-succeeded/
// https://wordpress.lensrentals.com/blog/2010/10/from-petzvals-sum-to-abbes-number/
// https://en.wikipedia.org/wiki/Polymath
// https://stackoverflow.com/jobs/companies
// https://stackoverflow.com/jobs/companies/bloomberg
// https://dockyard.com/blog/2015/11/16/best-practices-functional-programming-and-the-observer-effect
// Emails - chats - messaging in the blockchain
//
// https://www.youtube.com/watch?v=ypEMdjslEOI
// https://www.youtube.com/watch?v=EmDtmYwDs50
// https://www.youtube.com/watch?v=qaHEy1I2M5Q
// https://www.youtube.com/watch?v=n9gjmwafTI8
// https://www.youtube.com/watch?v=CKWvmiY7f_g
// https://www.youtube.com/watch?v=ey3J5KSi1Fo
// https://www.youtube.com/watch?v=CKWvmiY7f_g
// https://www.youtube.com/watch?v=skD1fjxSRog
// https://www.youtube.com/watch?v=bicBUVbeR58
// https://www.youtube.com/watch?v=2rnNhX1LDhY
// https://www.youtube.com/watch?v=5d16JwWwjKo
// https://www.youtube.com/watch?v=qjwDQhhbWdI
// https://www.youtube.com/watch?v=yri8cQt5ycs
// https://www.youtube.com/watch?v=M1q6b9JI2Wc
// https://www.youtube.com/watch?v=RXBXavzW6k4
// https://www.youtube.com/watch?v=aPwXeg8ThWI
//
// https://www.blinkist.com/en/signup/
