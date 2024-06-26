import type { RequiredBy } from '@sequelize/utils';
import type { Class } from 'type-fest';
import { ConstraintChecking } from '../deferrable.js';
import { BaseSqlExpression } from '../expression-builders/base-sql-expression.js';
import type { ModelDefinition } from '../model-definition.js';
import type { Attributes, Model, ModelStatic } from '../model.js';
import type { BindOrReplacements, Expression, Sequelize } from '../sequelize.js';
import type { NormalizedOptions } from '../sequelize.types.js';
import type { IsolationLevel } from '../transaction.js';
import type { DataType } from './data-types.js';
import type { AbstractDialect } from './dialect.js';
import { AbstractQueryGeneratorInternal } from './query-generator-internal.js';
import type { AddConstraintQueryOptions, BulkDeleteQueryOptions, CreateDatabaseQueryOptions, CreateSchemaQueryOptions, DropSchemaQueryOptions, DropTableQueryOptions, ListDatabasesQueryOptions, ListSchemasQueryOptions, ListTablesQueryOptions, QuoteTableOptions, RemoveColumnQueryOptions, RemoveConstraintQueryOptions, RemoveIndexQueryOptions, RenameTableQueryOptions, ShowConstraintsQueryOptions, StartTransactionQueryOptions, TableOrModel, TruncateTableQueryOptions } from './query-generator.types.js';
import type { TableNameWithSchema } from './query-interface.js';
import type { WhereOptions } from './where-sql-builder-types.js';
export declare const CREATE_DATABASE_QUERY_SUPPORTABLE_OPTIONS: Set<keyof CreateDatabaseQueryOptions>;
export declare const CREATE_SCHEMA_QUERY_SUPPORTABLE_OPTIONS: Set<keyof CreateSchemaQueryOptions>;
export declare const DROP_SCHEMA_QUERY_SUPPORTABLE_OPTIONS: Set<keyof DropSchemaQueryOptions>;
export declare const DROP_TABLE_QUERY_SUPPORTABLE_OPTIONS: Set<"cascade">;
export declare const LIST_DATABASES_QUERY_SUPPORTABLE_OPTIONS: Set<"skip">;
export declare const LIST_TABLES_QUERY_SUPPORTABLE_OPTIONS: Set<"schema">;
export declare const QUOTE_TABLE_SUPPORTABLE_OPTIONS: Set<keyof QuoteTableOptions>;
export declare const REMOVE_COLUMN_QUERY_SUPPORTABLE_OPTIONS: Set<keyof RemoveColumnQueryOptions>;
export declare const REMOVE_CONSTRAINT_QUERY_SUPPORTABLE_OPTIONS: Set<keyof RemoveConstraintQueryOptions>;
export declare const REMOVE_INDEX_QUERY_SUPPORTABLE_OPTIONS: Set<keyof RemoveIndexQueryOptions>;
export declare const RENAME_TABLE_QUERY_SUPPORTABLE_OPTIONS: Set<"changeSchema">;
export declare const SHOW_CONSTRAINTS_QUERY_SUPPORTABLE_OPTIONS: Set<keyof ShowConstraintsQueryOptions>;
export declare const START_TRANSACTION_QUERY_SUPPORTABLE_OPTIONS: Set<keyof StartTransactionQueryOptions>;
export declare const TRUNCATE_TABLE_QUERY_SUPPORTABLE_OPTIONS: Set<keyof TruncateTableQueryOptions>;
/**
 * Options accepted by {@link AbstractQueryGeneratorTypeScript#escape}
 */
export interface EscapeOptions extends FormatWhereOptions {
    readonly type?: DataType | undefined;
}
export interface FormatWhereOptions extends Bindable {
    /**
     * These are used to inline replacements into the query, when one is found inside of a {@link Literal}.
     */
    readonly replacements?: BindOrReplacements | undefined;
    /**
     * The model of the main alias. Used to determine the type & column name of attributes referenced in the where clause.
     */
    readonly model?: ModelStatic | ModelDefinition | null | undefined;
    /**
     * The alias of the main table corresponding to {@link FormatWhereOptions.model}.
     * Used as the prefix for attributes that do not reference an association, e.g.
     *
     * ```ts
     * const where = { name: 'foo' };
     * ```
     *
     * will produce
     *
     * ```sql
     * WHERE "<mainAlias>"."name" = 'foo'
     * ```
     */
    readonly mainAlias?: string | undefined;
}
/**
 * Methods that support this option are functions that add values to the query.
 * If {@link Bindable.bindParam} is specified, the value will be added to the query as a bind parameter.
 * If it is not specified, the value will be added to the query as a literal.
 */
export interface Bindable {
    bindParam?: ((value: unknown) => string) | undefined;
}
/**
 * This is a temporary class used to progressively migrate the AbstractQueryGenerator class to TypeScript by slowly moving its functions here.
 * Always use {@link AbstractQueryGenerator} instead.
 */
export declare class AbstractQueryGeneratorTypeScript<Dialect extends AbstractDialect = AbstractDialect> {
    #private;
    readonly dialect: Dialect;
    constructor(dialect: Dialect, internals?: AbstractQueryGeneratorInternal);
    protected get sequelize(): Sequelize<Dialect>;
    protected get options(): NormalizedOptions<Dialect>;
    createDatabaseQuery(_database: string, _options?: CreateDatabaseQueryOptions): string;
    dropDatabaseQuery(database: string): string;
    listDatabasesQuery(_options?: ListDatabasesQueryOptions): string;
    createSchemaQuery(schemaName: string, options?: CreateSchemaQueryOptions): string;
    dropSchemaQuery(schemaName: string, options?: DropSchemaQueryOptions): string;
    listSchemasQuery(_options?: ListSchemasQueryOptions): string;
    describeTableQuery(tableName: TableOrModel): string;
    dropTableQuery(tableName: TableOrModel, options?: DropTableQueryOptions): string;
    listTablesQuery(_options?: ListTablesQueryOptions): string;
    renameTableQuery(beforeTableName: TableOrModel, afterTableName: TableOrModel, options?: RenameTableQueryOptions): string;
    truncateTableQuery(_tableName: TableOrModel, _options?: TruncateTableQueryOptions): string | string[];
    removeColumnQuery(tableName: TableOrModel, columnName: string, options?: RemoveColumnQueryOptions): string;
    addConstraintQuery(tableName: TableOrModel, options: AddConstraintQueryOptions): string;
    removeConstraintQuery(tableName: TableOrModel, constraintName: string, options?: RemoveConstraintQueryOptions): string;
    setConstraintCheckingQuery(type: ConstraintChecking): string;
    setConstraintCheckingQuery(type: Class<ConstraintChecking>, constraints?: readonly string[]): string;
    showConstraintsQuery(_tableName: TableOrModel, _options?: ShowConstraintsQueryOptions): string;
    showIndexesQuery(_tableName: TableOrModel): string;
    removeIndexQuery(_tableName: TableOrModel, _indexNameOrAttributes: string | string[], _options?: RemoveIndexQueryOptions): string;
    /**
     * Generates an SQL query that returns all foreign keys of a table or the foreign key constraint of a given column.
     *
     * @deprecated Use {@link showConstraintsQuery} instead.
     * @param _tableName The table or associated model.
     * @param _columnName The name of the column. Not supported by SQLite.
     * @returns The generated SQL query.
     */
    getForeignKeyQuery(_tableName: TableOrModel, _columnName?: string): Error;
    /**
     * Generates an SQL query that drops a foreign key constraint.
     *
     * @deprecated Use {@link removeConstraintQuery} instead.
     * @param _tableName The table or associated model.
     * @param _foreignKey The name of the foreign key constraint.
     */
    dropForeignKeyQuery(_tableName: TableOrModel, _foreignKey: string): Error;
    /**
     * Returns a query that commits a transaction.
     */
    commitTransactionQuery(): string;
    /**
     * Returns a query that creates a savepoint.
     *
     * @param savepointName
     */
    createSavepointQuery(savepointName: string): string;
    /**
     * Returns a query that rollbacks a savepoint.
     *
     * @param savepointName
     */
    rollbackSavepointQuery(savepointName: string): string;
    /**
     * Returns a query that rollbacks a transaction.
     */
    rollbackTransactionQuery(): string;
    /**
     * Returns a query that sets the transaction isolation level.
     *
     * @param isolationLevel
     */
    setIsolationLevelQuery(isolationLevel: IsolationLevel): string;
    /**
     * Returns a query that starts a transaction.
     *
     * @param options
     */
    startTransactionQuery(options?: StartTransactionQueryOptions): string;
    /**
     * Generates a unique identifier for the current transaction.
     */
    generateTransactionId(): string;
    extractTableDetails(tableOrModel: TableOrModel, options?: {
        schema?: string;
        delimiter?: string;
    }): RequiredBy<TableNameWithSchema, 'schema'>;
    /**
     * Quote table name with optional alias and schema attribution
     *
     * @param param table string or object
     * @param options options
     */
    quoteTable(param: TableOrModel, options?: QuoteTableOptions): string;
    /**
     * Adds quotes to identifier
     *
     * @param identifier
     * @param _force
     */
    quoteIdentifier(identifier: string, _force?: boolean): string;
    isSameTable(tableA: TableOrModel, tableB: TableOrModel): boolean;
    whereQuery<M extends Model>(where: WhereOptions<Attributes<M>>, options?: FormatWhereOptions): string;
    whereItemsQuery<M extends Model>(where: WhereOptions<Attributes<M>> | undefined, options?: FormatWhereOptions): string;
    formatSqlExpression(piece: BaseSqlExpression, options?: EscapeOptions): string;
    /**
     * The goal of this method is to execute the equivalent of json_unquote for the current dialect.
     *
     * @param _arg
     * @param _options
     */
    formatUnquoteJson(_arg: Expression, _options: EscapeOptions | undefined): string;
    /**
     * @param _sqlExpression ⚠️ This is not an identifier, it's a raw SQL expression. It will be inlined in the query.
     * @param _path The JSON path, where each item is one level of the path
     * @param _unquote Whether the result should be unquoted (depending on dialect: ->> and #>> operators, json_unquote function). Defaults to `false`.
     */
    jsonPathExtractionQuery(_sqlExpression: string, _path: ReadonlyArray<number | string>, _unquote: boolean): string;
    /**
     * Escapes a value (e.g. a string, number or date) as an SQL value (as opposed to an identifier).
     *
     * @param value The value to escape
     * @param options The options to use when escaping the value
     */
    escape(value: unknown, options?: EscapeOptions): string;
    /**
     * Escapes an array of values (e.g. strings, numbers or dates) as an SQL List of values.
     *
     * @param values The list of values to escape
     * @param options
     *
     * @example
     * ```ts
     * const values = [1, 2, 3];
     * queryGenerator.escapeList([1, 2, 3]); // '(1, 2, 3)'
     */
    escapeList(values: unknown[], options?: EscapeOptions): string;
    getUuidV1FunctionCall(): string;
    getUuidV4FunctionCall(): string;
    getToggleForeignKeyChecksQuery(_enable: boolean): string;
    versionQuery(): string;
    tableExistsQuery(tableName: TableOrModel): string;
    bulkDeleteQuery(tableOrModel: TableOrModel, options: BulkDeleteQueryOptions): string;
    __TEST__getInternals(): AbstractQueryGeneratorInternal<AbstractDialect<object, object>>;
}
