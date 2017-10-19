# tcomb-form-native-json-schema

<p>
<img src="https://img.shields.io/npm/dm/tcomb-form-native-json-schema.svg" />
<img src="https://img.shields.io/npm/dt/tcomb-form-native-json-schema.svg" />
</p>

Bridges [tcomb-json-schema](https://github.com/gcanti/tcomb-json-schema) and [tcomb-form-native](https://github.com/gcanti/tcomb-form-native) together.

## Getting started

`$ yarn add tcomb-form-native-json-schema`

## Usage
```javascript
import { FormSchema } from 'tcomb-form-native-json-schema'

class Form extends React.Component {
  render() {
    // this.props.schema is a valid JSON schema
    return (
      <FormSchema
        schema={this.props.schema}
        data={this.state.values}
      />
    )
  }
}
```

## License

MIT.

## Author

Álvaro Medina Ballester `<amedina at apsl.net>`

Built with 💛 by [APSL](https://github.com/apsl).