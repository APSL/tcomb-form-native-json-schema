/* @flow */

import { humanize } from 'tcomb-form-native/lib/util';
import StructFactory from './struct';
import stylesheet from 'tcomb-form-native/lib/stylesheets/bootstrap';
import * as templates from 'tcomb-form-native/lib/templates/bootstrap';
import moment from 'moment';

// import { ImageFactory, ListFactory, StructFactory } from './Components/factories'

// https://github.com/gcanti/tcomb-form-native#rendering-options
// https://github.com/gcanti/tcomb-form-native#transformers
export default function getFormOptions(
  schema: Object,
  isRoot: boolean = true
): Object {
  let options: Object = {
    isRoot,
    stylesheet,
    templates,
    factory: StructFactory,
    label: schema.title,
    help: schema.description
  };
  const props = Object.keys(schema.properties);
  for (let i = 0; i < props.length; i++) {
    const prop = props[i];
    const required = isPropertyRequired(prop, schema);
    const propOptions = getPropertyOptions(
      schema.properties[prop],
      prop,
      required
    );
    if (!options.hasOwnProperty('fields')) {
      options.fields = {};
    }
    options.fields[prop] = propOptions;
  }
  return options;
}

function isPropertyRequired(prop: string, schema: Object): boolean {
  return schema.required && schema.required.includes(prop);
}

function getPropertyOptions(
  property: Object,
  propName: string,
  required: boolean
): Object {
  if (property.type === 'object') {
    return getFormOptions(property, false);
  }
  let options: Object = {};
  // if (property.type === 'array') {
  //   options.factory = ListFactory
  //   options.item = { label: ' ' }
  //   setPropertyOptions(options.item, property.items)
  // }
  if (property.hasOwnProperty('title')) {
    options.label = property.title;
  } else {
    options.label = humanize(propName);
  }
  if (!required) {
    options.label += ' optional';
  }
  if (property.hasOwnProperty('description')) {
    options.help = property.description;
  }
  setPropertyOptions(options, property);
  return options;
}

// const VIEW_WIDTH: number = Dimensions.get('window').width - 40 // TODO: define "40" in a stylesheet.
// const IMAGE_PICKER_OPTIONS = Object.freeze({
//   // https://github.com/react-community/react-native-image-picker#options
//   mediaType: 'photo',
//   title: I18n.t('CheckList-imagePickerTitle'),
//   cancelButtonTitle: I18n.t('CheckList-imagePickerCancelButtonTitle'),
//   takePhotoButtonTitle: I18n.t('CheckList-imagePickerTakePhotoButtonTitle'),
//   chooseFromLibraryButtonTitle: I18n.t(
//     'CheckList-imagePickerChooseFromLibraryButtonTitle'
//   )
// })

function setPropertyOptions(options: Object, property: Object) {
  switch (property.type) {
    case 'string':
      switch (property.format) {
        case 'textarea':
          options.multiline = true;
          options.numberOfLines = 3;
          break;
        case 'date':
          options.mode = property.format;
          options.config = {
            format: (d: Date): string => moment(d).format('LL')
          };
          break;
        case 'time':
          options.mode = property.format;
          options.config = {
            format: (d: Date): string => moment(d).format('LT')
          };
          break;
        case 'date-time':
          options.mode = 'datetime';
          options.config = {
            format: (d: Date): string => moment(d).format('LLLL')
          };
          break;
        // case 'url':
        //   options.factory = ImageFactory
        //   options.config = IMAGE_PICKER_OPTIONS
        //   options.viewWidth = VIEW_WIDTH
        //   options.editable = property.options && property.options.upload
        //   break
      }
      break;
    case 'boolean':
      options.onTintColor = 'blue';
      break;
  }
}
