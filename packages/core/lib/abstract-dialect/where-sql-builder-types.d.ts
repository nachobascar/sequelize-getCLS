import type { AllowArray } from '@sequelize/utils';
import type { DynamicSqlExpression } from '../expression-builders/base-sql-expression.js';
import type { WhereOperators } from '../model.js';
import type { Op } from '../operators.js';
/**
 * This type allows using `Op.or`, `Op.and`, and `Op.not` recursively around another type.
 * It also supports using a plain Array as an alias for `Op.and`. (unlike {@link AllowNotOrAndRecursive}).
 *
 * Example of plain-array treated as `Op.and`:
 * ```ts
 * User.findAll({ where: [{ id: 1 }, { id: 2 }] });
 * ```
 *
 * Meant to be used by {@link WhereOptions}.
 */
export type AllowNotOrAndWithImplicitAndArrayRecursive<T> = AllowArray<T | {
    [Op.or]: AllowArray<AllowNotOrAndWithImplicitAndArrayRecursive<T>>;
} | {
    [Op.and]: AllowArray<AllowNotOrAndWithImplicitAndArrayRecursive<T>>;
} | {
    [Op.not]: AllowNotOrAndWithImplicitAndArrayRecursive<T>;
}>;
/**
 * The type accepted by every `where` option
 */
export type WhereOptions<TAttributes = any> = undefined | AllowNotOrAndWithImplicitAndArrayRecursive<WhereAttributeHash<TAttributes> | DynamicSqlExpression>;
/**
 * This type allows using `Op.or`, `Op.and`, and `Op.not` recursively around another type.
 * Unlike {@link AllowNotOrAndWithImplicitAndArrayRecursive}, it does not allow the 'implicit AND Array'.
 *
 * Example of plain-array NOT treated as Op.and:
 * ```ts
 * User.findAll({ where: { id: [1, 2] } });
 * ```
 *
 * Meant to be used by {@link WhereAttributeHashValue}.
 */
type AllowNotOrAndRecursive<T> = T | {
    [Op.or]: AllowArray<AllowNotOrAndRecursive<T>>;
} | {
    [Op.and]: AllowArray<AllowNotOrAndRecursive<T>>;
} | {
    [Op.not]: AllowNotOrAndRecursive<T>;
};
/**
 * Types that can be compared to an attribute in a WHERE context.
 */
export type WhereAttributeHashValue<AttributeType> = AllowNotOrAndRecursive<AttributeType extends any[] ? WhereOperators<AttributeType>[typeof Op.eq] | WhereOperators<AttributeType> : WhereOperators<AttributeType>[typeof Op.in] | WhereOperators<AttributeType>[typeof Op.eq] | WhereOperators<AttributeType>> | WhereAttributeHash<any>;
/**
 * A hash of attributes to describe your search.
 *
 * Possible key values:
 *
 * - An attribute name: `{ id: 1 }`
 * - A nested attribute: `{ '$projects.id$': 1 }`
 * - A JSON key: `{ 'object.key': 1 }`
 * - A cast: `{ 'id::integer': 1 }`
 *
 * - A combination of the above: `{ '$join.attribute$.json.path::integer': 1 }`
 */
export type WhereAttributeHash<TAttributes = any> = {
    [AttributeName in keyof TAttributes as AttributeName extends string ? AttributeName | `$${AttributeName}$` : never]?: WhereAttributeHashValue<TAttributes[AttributeName]>;
} & {
    [AttributeName in keyof TAttributes as AttributeName extends string ? `${AttributeName}.${string}` | `$${AttributeName}$.${string}` | `${AttributeName}[${string}` | `$${AttributeName}$[${string}` | `${AttributeName | `$${AttributeName}$` | `${AttributeName}.${string}` | `$${AttributeName}$.${string}`}:${string}` : never]?: WhereAttributeHashValue<any>;
} & {
    [attribute: `$${string}.${string}$` | `$${string}.${string}$::${string}` | `$${string}.${string}$.${string}` | `$${string}.${string}$.${string}:${string}` | `$${string}.${string}$[${string}` | `$${string}.${string}$[${string}:${string}`]: WhereAttributeHashValue<any>;
};
export {};
