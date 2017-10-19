/* @flow */

import t from 'tcomb-form-native';

class StructFactory extends t.form.Struct {
  getLocals() {
    const locals = super.getLocals();
    locals.isRoot = this.props.options.isRoot;
    locals.help = this.props.options.help;
    return locals;
  }
}

export default StructFactory;
