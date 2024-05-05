import { ValidationErrorItem } from '../errors/index.js';
import type { Model } from '../model.js';
import type { DataType, DataTypeClass, DataTypeClassOrInstance, DataTypeInstance } from './data-types.js';
import { AbstractDataType } from './data-types.js';
import type { AbstractDialect } from './dialect.js';
export declare function isDataType(value: any): value is DataType;
export declare function isDataTypeClass(value: any): value is DataTypeClass;
export declare function cloneDataType(value: DataTypeInstance | string): DataTypeInstance | string;
export declare function normalizeDataType(Type: DataTypeClassOrInstance, dialect: AbstractDialect): AbstractDataType<unknown>;
export declare function normalizeDataType(Type: string, dialect: AbstractDialect): string;
export declare function normalizeDataType(Type: DataTypeClassOrInstance | string, dialect: AbstractDialect): AbstractDataType<unknown> | string;
export declare function dataTypeClassOrInstanceToInstance(Type: DataTypeClassOrInstance): DataTypeInstance;
export declare function validateDataType(value: unknown, type: AbstractDataType<any>, attributeName?: string, modelInstance?: Model<any> | null): ValidationErrorItem | null;
export declare function attributeTypeToSql(type: AbstractDataType<any> | string): string;
export declare function getDataTypeParser(dialect: AbstractDialect, dataType: DataTypeClassOrInstance): (value: unknown) => unknown;
export declare function throwUnsupportedDataType(dialect: AbstractDialect, typeName: string): never;
