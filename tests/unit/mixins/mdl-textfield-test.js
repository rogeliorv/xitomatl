import Ember from 'ember';
import MdlTextfieldMixin from 'xitomatl/mixins/mdl-textfield';
import { module, test } from 'qunit';

module('Unit | Mixin | mdl textfield');

// Replace this with your real tests.
test('it works', function(assert) {
  let MdlTextfieldObject = Ember.Object.extend(MdlTextfieldMixin);
  let subject = MdlTextfieldObject.create();
  assert.ok(subject);
});
