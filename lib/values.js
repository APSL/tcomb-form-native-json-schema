/* @flow */

import moment from 'moment';
import { DATE_FORMAT, TIME_FORMAT, DATE_TIME_FORMAT } from './formats';

export default function getFormValues(
  jsonData: Object,
  schema: Object
): Object {
  if (!schema.hasOwnProperty('properties')) {
    return jsonData;
  }
  if (!jsonData) {
    return {};
  }
  let data = {};
  const keys = Object.keys(schema.properties);
  for (let i = 0; i < keys.length; i++) {
    const key = keys[i];
    const schemaProperty = schema.properties[key];
    if (typeof schemaProperty === 'undefined') {
      data[key] = jsonData[key];
      continue;
    }
    switch (schemaProperty.type) {
      case 'object':
        data[key] = getFormValues(jsonData[key], schemaProperty);
        break;
      case 'array':
        data[key] = getArrayData(jsonData[key], schemaProperty);
        if (typeof data[key] === 'undefined') {
          delete data[key];
        }
        break;
      case 'string':
        data[key] = getStringData(jsonData[key], schemaProperty);
        if (typeof data[key] === 'undefined') {
          delete data[key];
        }
        break;
      default:
        data[key] = jsonData[key];
    }
  }
  return data;
}

function getArrayData(data: Array<any>, schema: Object): ?Array<any> {
  if (schema.items.type === 'string') {
    try {
      switch (schema.items.format) {
        case 'date':
          return data.map((d: string): Date =>
            moment(d, DATE_FORMAT, true).toDate()
          );
        case 'time':
          return data.map((d: string): Date =>
            moment(d, TIME_FORMAT, true).toDate()
          );
        case 'date-time':
          return data.map((d: string): Date =>
            moment(d, DATE_TIME_FORMAT, true).toDate()
          );
      }
    } catch (e) {
      console.warn(e);
    }
  }
  return data;
}

function getStringData(data: string, schema: Object): any {
  try {
    switch (schema.format) {
      case 'date':
        return moment(data, DATE_FORMAT, true).toDate();
      case 'time':
        return moment(data, TIME_FORMAT, true).toDate();
      case 'date-time':
        return moment(data, DATE_TIME_FORMAT, true).toDate();
      default:
        if (
          schema.default !== undefined &&
          schema.default !== null &&
          (data === undefined || data === null)
        ) {
          return schema.default;
        }
        return data;
    }
  } catch (e) {
    console.warn(e);
  }
}
