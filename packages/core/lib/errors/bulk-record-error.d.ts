import type { Model } from '..';
import { BaseError } from './base-error';
/**
 * Thrown when bulk operation fails, it represents per record level error.
 * Used with AggregateError
 *
 * @param error Error for a given record/instance
 * @param record DAO instance that error belongs to
 */
export declare class BulkRecordError extends BaseError {
    errors: Error;
    record: Model;
    constructor(error: Error, record: Model, options?: ErrorOptions);
}
