/* @flow */

import moment from 'moment';

export const DATE_FORMAT = 'YYYY-MM-DD';
export const TIME_FORMAT = 'HH:mm';
export const DATE_TIME_FORMAT = 'YYYY-MM-DD HH:MM:SS';

const EMAIL_REGEX = /^.+@.+\..+$/;
const FILE_REGEX = /^file:\/\/\/.+$/;
const URL_REGEX = /^https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,253}\.[a-z]{2,4}\b([-a-zA-Z0-9@:%_+.~#?&/=]*)$/;

export function isTextarea(x: any): boolean {
  return true;
}

export function isEmail(x: any): boolean {
  return EMAIL_REGEX.test(x);
}

export function isDate(x: any): boolean {
  return moment(x, DATE_FORMAT, true).isValid();
}

export function isDateTime(x: any): boolean {
  return moment(x, DATE_TIME_FORMAT, true).isValid();
}

export function isTime(x: any): boolean {
  return moment(x, TIME_FORMAT, true).isValid();
}

export function isURL(x: string): boolean {
  return FILE_REGEX.test(x.toLowerCase()) || URL_REGEX.test(x.toLowerCase());
}
