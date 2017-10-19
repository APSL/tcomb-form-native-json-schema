/* @flow */

import React from 'react';
import t from 'tcomb-form-native';
import getFormOptions from './options';
import getFormValues from './values';
import transform from 'tcomb-json-schema';
import { isEmail, isTextarea, isURL } from './formats';

transform.registerFormat('date', t.Date);
transform.registerFormat('time', t.Date);
transform.registerFormat('date-time', t.Date);
transform.registerFormat('email', isEmail);
transform.registerFormat('textarea', isTextarea);
transform.registerFormat('url', isURL);
transform.registerFormat('uri', isURL);

const Form = t.form.Form;

type Props = {
  data: Object,
  schema: Object,
  stylesheet?: Object
};
type State = {
  value: Object,
  type: any,
  options: Object
};

class FormSchema extends React.PureComponent<Props, State> {
  state: State;
  _form: Form;

  constructor(props: Props) {
    super(props);
    this.state = {
      value: getFormValues(props.data, props.schema),
      type: transform(props.schema),
      options: { ...getFormOptions(props.schema), stylesheet: props.stylesheet }
    };
  }

  _onChange = (value: any, path: Array<string | number>) => {
    this.setState({ value });
  };

  getValue = () => {
    return this._form.getValue();
  };

  render() {
    return (
      <Form
        ref={(form: Form) => {
          this._form = form;
        }}
        type={this.state.type}
        value={this.state.value}
        onChange={this._onChange}
        options={this.state.options}
      />
    );
  }
}

export default FormSchema;
