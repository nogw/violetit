import { fromGlobalId } from 'graphql-relay';
import mongoose from 'mongoose';

const { ObjectId } = mongoose.Types;

type Value = string | boolean | null | undefined | IValueObject | IValueArray | object;

interface IValueObject {
  [x: string]: Value;
}

type IValueArray = Array<Value>;

interface SanitizeOptions {
  field?: string;
  keys: string[];
  ignore?: string[];
  jsonKeys?: string[];
}

const sanitizeValue = (value: Value, options: SanitizeOptions): Value => {
  const { field = null, keys, ignore = [], jsonKeys = [] } = options;

  if (typeof value === 'boolean') {
    return value;
  }

  if (!value || (typeof value == 'number' && value !== 0)) {
    return 'EMPTY';
  }

  if (keys.includes(field as string)) {
    return `FROZEN-${(field as string).toUpperCase()}`;
  }

  if (jsonKeys.includes(field as string)) {
    const jsonData = JSON.parse(value as string);

    return sanitizeTestObject(jsonData, keys, ignore, jsonKeys);
  }

  if (Array.isArray(value)) {
    return value.map(item =>
      sanitizeValue(item, {
        keys,
        ignore,
        jsonKeys,
      }),
    );
  }

  if (!Array.isArray(value) && typeof value.toString === 'function') {
    const cleanValue = value.toString().replace(/[^a-z0-9]/gi, '');

    if (ObjectId.isValid(cleanValue) && value.toString().includes(cleanValue)) {
      return value.toString().replace(cleanValue, 'ObjectId');
    }

    if (value.constructor === Date) {
      return value;
    }

    if (typeof value === 'object') {
      return sanitizeTestObject(value, keys, ignore, jsonKeys);
    }

    const result = fromGlobalId(cleanValue);

    if (result.type && result.id && ObjectId.isValid(result.id)) {
      return 'GlobalID';
    }
  }

  if (typeof value === 'object') {
    return sanitizeTestObject(value, keys, ignore, jsonKeys);
  }

  return value;
};

const defaultFrozenKeys = ['id', 'createdAt', 'updatedAt', 'password'];

/**
 * Sanitize a test object removing the mentions of a `ObjectId`
 * @param payload {object} The object to be sanitized
 * @param keys {[string]} Array of keys to redefine the value on the payload
 * @param ignore {[string]} Array of keys to ignore
 * @returns {object} The sanitized object
 */
interface IPayload {
  [key: string]: Value;
}

export const sanitizeTestObject = (
  payload: Value,
  keys = defaultFrozenKeys,
  ignore: string[] = [],
  jsonKeys: string[] = [],
): any => {
  const sanitizedPayload = payload as IPayload;

  if (Array.isArray(sanitizedPayload)) {
    return sanitizedPayload.map(item => sanitizeTestObject(item, keys, ignore, jsonKeys));
  }

  if (typeof sanitizedPayload === 'object' && sanitizedPayload !== null) {
    return Object.keys(sanitizedPayload).reduce((sanitizedObj, field) => {
      const value = sanitizedPayload[field];

      if (ignore.indexOf(field) !== -1) {
        return {
          ...sanitizedObj,
          [field]: value,
        };
      }

      const sanitizedValue = sanitizeValue(value, { field, keys, ignore, jsonKeys });

      return {
        ...sanitizedObj,
        [field]: sanitizedValue,
      };
    }, {});
  }

  return sanitizedPayload;
};
