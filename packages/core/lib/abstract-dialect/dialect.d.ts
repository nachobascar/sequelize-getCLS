/// <reference types="node" />
import type { Class } from 'type-fest';
import type { DialectName, Sequelize } from '../sequelize.js';
import type { DeepPartial } from '../utils/types.js';
import type { AbstractConnectionManager } from './connection-manager.js';
import type { AbstractDataType } from './data-types.js';
import type { AbstractQueryGenerator } from './query-generator.js';
import type { AbstractQueryInterface } from './query-interface.js';
import type { AbstractQuery } from './query.js';
export interface SupportableNumericOptions {
    zerofill: boolean;
    /** Whether this dialect supports the unsigned option natively */
    unsigned: boolean;
}
export interface SupportableDecimalNumberOptions extends SupportableNumericOptions {
    /** Whether NaN can be inserted in a column that uses this DataType. */
    NaN: boolean;
    /** Whether Infinity/-Infinity can be inserted in a column that uses this DataType. */
    infinity: boolean;
}
export interface SupportableFloatOptions extends SupportableDecimalNumberOptions {
    /** Whether scale & precision can be specified as parameters */
    scaleAndPrecision: boolean;
}
export interface SupportableExactDecimalOptions extends SupportableDecimalNumberOptions {
    /**
     * Whether this dialect supports unconstrained numeric/decimal columns. i.e. columns where numeric values of any length can be stored.
     * The SQL standard requires that "NUMERIC" with no option be equal to "NUMERIC(0,0)", but some dialects (postgres)
     * interpret it as an unconstrained numeric.
     */
    unconstrained: boolean;
    /**
     * Whether this dialect supports constrained numeric/decimal columns. i.e. columns where numeric values of any length can be stored.
     */
    constrained: boolean;
}
export type DialectSupports = {
    DEFAULT: boolean;
    'DEFAULT VALUES': boolean;
    'VALUES ()': boolean;
    'LIMIT ON UPDATE': boolean;
    'ON DUPLICATE KEY': boolean;
    'ORDER NULLS': boolean;
    UNION: boolean;
    'UNION ALL': boolean;
    'RIGHT JOIN': boolean;
    EXCEPTION: boolean;
    forShare?: 'LOCK IN SHARE MODE' | 'FOR SHARE' | undefined;
    lock: boolean;
    lockOf: boolean;
    lockKey: boolean;
    lockOuterJoinFailure: boolean;
    skipLocked: boolean;
    finalTable: boolean;
    returnValues: false | 'output' | 'returning';
    autoIncrement: {
        identityInsert: boolean;
        defaultValue: boolean;
        update: boolean;
    };
    bulkDefault: boolean;
    /**
     * Whether this dialect has native support for schemas.
     * For the purposes of Sequelize, a Schema is considered to be a grouping of tables.
     * For instance, in MySQL, "CREATE DATABASE" creates what we consider to be a schema.
     */
    schemas: boolean;
    /**
     * Whether this dialect has native support for having multiple databases per instance (in the postgres or mssql sense).
     * For the purposes of Sequelize, a database is considered to be a grouping of schemas.
     * For instance, in MySQL, "CREATE DATABASE" creates what we consider to be a schema,
     * so we do not consider that MySQL supports this option.
     */
    multiDatabases: boolean;
    transactions: boolean;
    savepoints: boolean;
    isolationLevels: boolean;
    connectionTransactionMethods: boolean;
    settingIsolationLevelDuringTransaction: boolean;
    startTransaction: {
        useBegin: boolean;
        readOnly: boolean;
        transactionType: boolean;
    };
    migrations: boolean;
    upserts: boolean;
    inserts: {
        ignoreDuplicates: string;
        updateOnDuplicate: boolean | string;
        onConflictDoNothing: string;
        onConflictWhere: boolean;
        conflictFields: boolean;
    };
    constraints: {
        restrict: boolean;
        /**
         * This dialect supports marking a column's constraints as deferrable.
         * e.g. 'DEFERRABLE' and 'INITIALLY DEFERRED'
         */
        deferrable: boolean;
        unique: boolean;
        default: boolean;
        check: boolean;
        foreignKey: boolean;
        /** Whether this dialect supports disabling foreign key checks for the current session */
        foreignKeyChecksDisableable: boolean;
        primaryKey: boolean;
        onUpdate: boolean;
        add: boolean;
        remove: boolean;
        removeOptions: {
            cascade: boolean;
            ifExists: boolean;
        };
    };
    index: {
        collate: boolean;
        length: boolean;
        parser: boolean;
        concurrently: boolean;
        type: boolean;
        using: boolean | number;
        functionBased: boolean;
        operator: boolean;
        where: boolean;
        include: boolean;
    };
    groupedLimit: boolean;
    indexViaAlter: boolean;
    alterColumn: {
        /**
         * Can "ALTER TABLE x ALTER COLUMN y" add UNIQUE to the column in this dialect?
         */
        unique: boolean;
    };
    dataTypes: {
        CHAR: boolean;
        /**
         * Whether this dialect provides a binary collation on text, varchar & char columns.
         */
        COLLATE_BINARY: boolean;
        /** This dialect supports case-insensitive text */
        CITEXT: boolean;
        /** Options supportable by all int types (from tinyint to bigint) */
        INTS: SupportableNumericOptions;
        /** @deprecated */
        REAL: SupportableFloatOptions;
        /** This dialect supports 4 byte long floating point numbers */
        FLOAT: SupportableFloatOptions;
        /** This dialect supports 8 byte long floating point numbers */
        DOUBLE: SupportableFloatOptions;
        /** This dialect supports arbitrary precision numbers */
        DECIMAL: false | SupportableExactDecimalOptions;
        /** This dialect supports big integers */
        BIGINT: boolean;
        /**
         * The dialect is considered to support JSON if it provides either:
         * - A JSON data type.
         * - An SQL function that can be used as a CHECK constraint on a text column, to ensure its contents are valid JSON.
         */
        JSON: boolean;
        JSONB: boolean;
        ARRAY: boolean;
        RANGE: boolean;
        GEOMETRY: boolean;
        GEOGRAPHY: boolean;
        HSTORE: boolean;
        TSVECTOR: boolean;
        CIDR: boolean;
        INET: boolean;
        MACADDR: boolean;
        MACADDR8: boolean;
        DATETIME: {
            /** Whether "infinity" is a valid value in this dialect's DATETIME data type */
            infinity: boolean;
        };
        DATEONLY: {
            /** Whether "infinity" is a valid value in this dialect's DATEONLY data type */
            infinity: boolean;
        };
        TIME: {
            /** Whether the dialect supports TIME(precision) */
            precision: boolean;
        };
    };
    REGEXP: boolean;
    /**
     * Case-insensitive regexp operator support ('~*' in postgres).
     */
    IREGEXP: boolean;
    /** Whether this dialect supports SQL JSON functions */
    jsonOperations: boolean;
    /** Whether this dialect supports returning quoted & unquoted JSON strings  */
    jsonExtraction: {
        unquoted: boolean;
        quoted: boolean;
    };
    tmpTableTrigger: boolean;
    indexHints: boolean;
    tableHints: boolean;
    searchPath: boolean;
    /**
     * This dialect supports E-prefixed strings, e.g. "E'foo'", which
     * enables the ability to use backslash escapes inside the string.
     */
    escapeStringConstants: boolean;
    /** Whether this dialect supports changing the global timezone option */
    globalTimeZoneConfig: boolean;
    /** Whether this dialect provides a native way to generate UUID v1 values */
    uuidV1Generation: boolean;
    /** Whether this dialect provides a native way to generate UUID v4 values */
    uuidV4Generation: boolean;
    dropTable: {
        cascade: boolean;
    };
    maxExecutionTimeHint: {
        select: boolean;
    };
    truncate: {
        cascade: boolean;
        restartIdentity: boolean;
    };
    removeColumn: {
        cascade: boolean;
        ifExists: boolean;
    };
    renameTable: {
        changeSchema: boolean;
        changeSchemaAndTable: boolean;
    };
    createSchema: {
        authorization: boolean;
        charset: boolean;
        collate: boolean;
        comment: boolean;
        ifNotExists: boolean;
        replace: boolean;
    };
    dropSchema: {
        cascade: boolean;
        ifExists: boolean;
    };
    delete: {
        limit: boolean;
    };
};
type TypeParser = (...params: any[]) => unknown;
declare const OptionType: unique symbol;
declare const ConnectionOptionType: unique symbol;
export type DialectOptions<Dialect extends AbstractDialect> = Dialect[typeof OptionType];
export type ConnectionOptions<Dialect extends AbstractDialect> = Dialect[typeof ConnectionOptionType];
export type AbstractDialectParams<Options> = {
    dataTypeOverrides: Record<string, Class<AbstractDataType<any>>>;
    dataTypesDocumentationUrl: string;
    /**
     * The character used to delimit identifiers in SQL queries.
     *
     * This can be a string, in which case the character will be used for both the start & end of the identifier,
     * or an object with `start` and `end` properties.
     */
    identifierDelimiter: string | {
        start: string;
        end: string;
    };
    minimumDatabaseVersion: string;
    name: DialectName;
    options: Options | undefined;
    sequelize: Sequelize;
};
export declare abstract class AbstractDialect<Options extends object = object, TConnectionOptions extends object = object> {
    #private;
    [OptionType]: Options;
    [ConnectionOptionType]: TConnectionOptions;
    /**
     * List of features this dialect supports.
     *
     * Important: Dialect implementations inherit these values.
     * When changing a default, ensure the implementations still properly declare which feature they support.
     */
    static readonly supports: DialectSupports;
    protected static extendSupport(supportsOverwrite: DeepPartial<DialectSupports>): DialectSupports;
    readonly sequelize: Sequelize<this>;
    abstract readonly Query: typeof AbstractQuery;
    abstract readonly queryGenerator: AbstractQueryGenerator;
    abstract readonly queryInterface: AbstractQueryInterface;
    abstract readonly connectionManager: AbstractConnectionManager<any, any>;
    /**
     * @deprecated use {@link minimumDatabaseVersion}
     */
    get defaultVersion(): string;
    /**
     * @deprecated use {@link identifierDelimiter}.start
     */
    get TICK_CHAR_LEFT(): string;
    /**
     * @deprecated use {@link identifierDelimiter}.end
     */
    get TICK_CHAR_RIGHT(): string;
    readonly identifierDelimiter: {
        readonly start: string;
        readonly end: string;
    };
    readonly minimumDatabaseVersion: string;
    readonly dataTypesDocumentationUrl: string;
    readonly options: Options;
    readonly name: DialectName;
    get supports(): DialectSupports;
    constructor(params: AbstractDialectParams<Options>);
    /**
     * Returns the dialect-specific implementation of a shared data type, or null if no such implementation exists
     * (in which case you need to use the base implementation).
     *
     * @param dataType The shared data type.
     */
    getDataTypeForDialect(dataType: Class<AbstractDataType<any>>): Class<AbstractDataType<any>> | null;
    warnDataTypeIssue(text: string): void;
    abstract createBindCollector(): BindCollector;
    /**
     * Produces a safe representation of a Buffer for this dialect, that can be inlined in a SQL string.
     * Used mainly by DataTypes.
     *
     * @param buffer The buffer to escape
     * @returns The string, escaped for SQL.
     */
    escapeBuffer(buffer: Buffer): string;
    /**
     * Produces a safe representation of a string for this dialect, that can be inlined in a SQL string.
     * Used mainly by DataTypes.
     *
     * @param value The string to escape
     * @returns The string, escaped for SQL.
     */
    escapeString(value: string): string;
    escapeJson(value: unknown): string;
    /**
     * Whether this dialect can use \ in strings to escape string delimiters.
     *
     * @returns
     */
    canBackslashEscape(): boolean;
    /**
     * Used to register a base parser for a Database type.
     * Parsers are based on the Database Type, not the JS type.
     * Only one parser can be assigned as the parser for a Database Type.
     * For this reason, prefer neutral implementations.
     *
     * For instance, when implementing "parse" for a Date type,
     * prefer returning a String rather than a Date object.
     *
     * The {@link DataTypes.ABSTRACT#parseDatabaseValue} method will then be called on the DataType instance defined by the user,
     * which can decide on a more specific JS type (e.g. parse the date string & return a Date instance or a Temporal instance).
     *
     * You typically do not need to implement this method. This is used to provide default parsers when no DataType
     * is provided (e.g. raw queries that don't specify a model). Sequelize already provides a default parser for most types.
     * For a custom Data Type, implementing {@link DataTypes.ABSTRACT#parseDatabaseValue} is typically what you want.
     *
     * @param databaseDataTypes Dialect-specific DB data type identifiers that will use this parser.
     * @param parser The parser function to call when parsing the data type. Parameters are dialect-specific.
     */
    registerDataTypeParser(databaseDataTypes: unknown[], parser: TypeParser): void;
    getParserForDatabaseDataType(databaseDataType: unknown): TypeParser | undefined;
    abstract getDefaultSchema(): string;
    abstract parseConnectionUrl(url: string): TConnectionOptions;
    static getSupportedOptions(): readonly string[];
    static getSupportedConnectionOptions(): readonly string[];
    getSupportedOptions(): readonly string[];
    getSupportedConnectionOptions(): readonly string[];
}
export type BindCollector = {
    /**
     *
     *
     * @param {string} bindParameterName The name of the bind parameter
     * @returns {string}
     */
    collect(bindParameterName: string): string;
    /**
     * Returns either an array of orders if the bind parameters are mapped to numeric parameters (e.g. '?', $1, @1),
     * or null if no mapping was necessary because the dialect supports named parameters.
     */
    getBindParameterOrder(): string[] | null;
};
export {};
