import type { Model } from '..';
import { BaseError } from './base-error';
/**
 * An enum that is used internally by the `ValidationErrorItem` class
 * that maps current `type` strings (as given to ValidationErrorItem.constructor()) to
 * our new `origin` values.
 */
export declare enum ValidationErrorItemType {
    'notNull violation' = "CORE",
    'unique violation' = "DB",
    'Validation error' = "FUNCTION"
}
/**
 * An enum that defines valid ValidationErrorItem `origin` values
 */
export declare enum ValidationErrorItemOrigin {
    /**
     * specifies errors that originate from the sequelize "core"
     */
    CORE = "CORE",
    /**
     * specifies validation errors that originate from the storage engine
     */
    DB = "DB",
    /**
     * specifies validation errors that originate from validator functions (both built-in and custom) defined for a given attribute
     */
    FUNCTION = "FUNCTION",
    /**
     * specifies validation errors that originate from {@link DataTypes.ABSTRACT#validate} constraint validation.
     */
    DATATYPE = "DATATYPE"
}
/**
 * Validation Error Item
 * Instances of this class are included in the `ValidationError.errors` property.
 */
export declare class ValidationErrorItem extends Error {
    /**
     * @deprecated Will be removed in v7
     */
    static TypeStringMap: typeof ValidationErrorItemType;
    /**
     * @deprecated Will be removed in v7
     */
    static Origins: typeof ValidationErrorItemOrigin;
    /**
     * The type/origin of the validation error
     */
    readonly type: keyof typeof ValidationErrorItemType | null;
    /**
     * The field that triggered the validation error
     */
    path: string | null;
    /**
     * The value that generated the error
     */
    value: unknown;
    readonly origin: keyof typeof ValidationErrorItemOrigin | null;
    /**
     * The DAO instance that caused the validation error
     */
    instance: Model | null;
    /**
     * A validation "key", used for identification
     */
    validatorKey: string | null;
    /**
     * Property name of the BUILT-IN validator function that caused the validation error (e.g. "in" or "len"), if applicable
     */
    validatorName: string | null;
    /**
     * Parameters used with the BUILT-IN validator function, if applicable
     */
    readonly validatorArgs: unknown[];
    static throwDataTypeValidationError(message: string): never;
    /**
     * Creates a new ValidationError item. Instances of this class are included in the `ValidationError.errors` property.
     *
     * @param message An error message
     * @param type The type/origin of the validation error
     * @param path The field that triggered the validation error
     * @param value The value that generated the error
     * @param instance the DAO instance that caused the validation error
     * @param validatorKey a validation "key", used for identification
     * @param fnName property name of the BUILT-IN validator function that caused the validation error (e.g. "in" or "len"), if applicable
     * @param fnArgs parameters used with the BUILT-IN validator function, if applicable
     */
    constructor(message: string, type: keyof typeof ValidationErrorItemType | keyof typeof ValidationErrorItemOrigin, path?: string, value?: string, instance?: Model, validatorKey?: string, fnName?: string, fnArgs?: unknown[]);
    private isValidationErrorItemOrigin;
    /**
     * return a lowercase, trimmed string "key" that identifies the validator.
     *
     * Note: the string will be empty if the instance has neither a valid `validatorKey` property nor a valid `validatorName` property
     *
     * @param useTypeAsNS controls whether the returned value is "namespace",
     *                    this parameter is ignored if the validator's `type` is not one of ValidationErrorItem.Origins
     * @throws {Error}    thrown if NSSeparator is found to be invalid.
     */
    getValidatorKey(useTypeAsNS: false): string;
    /**
     * @param useTypeAsNS controls whether the returned value is "namespace",
     *                    this parameter is ignored if the validator's `type` is not one of ValidationErrorItem.Origins
     * @param NSSeparator a separator string for concatenating the namespace, must be not be empty,
     *                    defaults to "." (fullstop). only used and validated if useTypeAsNS is TRUE.
     */
    getValidatorKey(useTypeAsNS?: true, NSSeparator?: string): string;
}
/**
 * Validation Error. Thrown when the sequelize validation has failed. The error contains an `errors` property,
 * which is an array with 1 or more ValidationErrorItems, one for each validation that failed.
 *
 * @param message Error message
 * @param errors Array of ValidationErrorItem objects describing the validation errors
 */
export declare class ValidationError extends BaseError {
    /** Array of ValidationErrorItem objects describing the validation errors */
    readonly errors: ValidationErrorItem[];
    constructor(message: string, errors?: ValidationErrorItem[], options?: ErrorOptions);
    /**
     * Gets all validation error items for the path / field specified.
     *
     * @param path The path to be checked for error items
     *
     * @returns Validation error items for the specified path
     */
    get(path: string): ValidationErrorItem[];
}
