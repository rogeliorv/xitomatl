import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('xitomatl-task', 'Integration | Component | xitomatl task', {
  integration: true
});

test('it renders', function(assert) {

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{xitomatl-task}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#xitomatl-task}}
      template block text
    {{/xitomatl-task}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
