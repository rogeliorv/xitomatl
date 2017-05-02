import Ember from 'ember';

export default Ember.Mixin.create({
    didInsertElement() {
        this._super(...arguments);
        componentHandler.upgradeDom();
        // We have to call this for material design to upgrade the element
        //   var textFields = this.$('.mdl-textfield').get();
        //   var menus = this.$('.mdl-menu').get();
        //   var buttons = this.$('.mdl-button').get();
        //
        //   componentHandler.upgradeElements(textFields);
        //   componentHandler.upgradeElements(menus);
        //   componentHandler.upgradeElements(buttons);
        
    },
  
    didRender() {
        this._super(...arguments);
        componentHandler.upgradeDom();
        Array.prototype.forEach.call(Ember.$('.mdl-textfield'), function (elem) {
            elem.MaterialTextfield.checkDirty();
        });
    }
});
