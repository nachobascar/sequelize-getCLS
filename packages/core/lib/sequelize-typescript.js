"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var sequelize_typescript_exports = {};
__export(sequelize_typescript_exports, {
  SUPPORTED_DIALECTS: () => SUPPORTED_DIALECTS,
  SequelizeTypeScript: () => SequelizeTypeScript
});
module.exports = __toCommonJS(sequelize_typescript_exports);
var import_utils = require("@sequelize/utils");
var import_chalk = __toESM(require("chalk"));
var import_node_async_hooks = require("node:async_hooks");
var import_semver = __toESM(require("semver"));
var import_data_types_utils = require("./abstract-dialect/data-types-utils.js");
var import_replication_pool = require("./abstract-dialect/replication-pool.js");
var import_associations = require("./decorators/legacy/associations.js");
var import_model = require("./decorators/shared/model.js");
var import_connection_acquire_timeout_error = require("./errors/connection/connection-acquire-timeout-error.js");
var import_hooks_legacy = require("./hooks-legacy.js");
var import_hooks = require("./hooks.js");
var import_model_definition = require("./model-definition.js");
var import_model_hooks = require("./model-hooks.js");
var import_model_internals = require("./model-internals.js");
var import_model_set_view = require("./model-set-view.js");
var import_sequelize_internals = require("./sequelize.internals.js");
var import_sequelize = require("./sequelize.js");
var import_transaction = require("./transaction.js");
var import_array = require("./utils/array.js");
var import_connection_options = require("./utils/connection-options.js");
var Deprecations = __toESM(require("./utils/deprecations.js"));
var import_deprecations = require("./utils/deprecations.js");
var import_object = require("./utils/object.js");
const staticSequelizeHooks = new import_hooks.HookHandlerBuilder([
  "beforeInit",
  "afterInit"
]);
const instanceSequelizeHooks = new import_hooks.HookHandlerBuilder([
  "beforeQuery",
  "afterQuery",
  "beforeBulkSync",
  "afterBulkSync",
  "beforeConnect",
  "afterConnect",
  "beforeDisconnect",
  "afterDisconnect",
  "beforeDefine",
  "afterDefine",
  "beforePoolAcquire",
  "afterPoolAcquire",
  ...import_model_hooks.validModelHooks
]);
const SUPPORTED_DIALECTS = Object.freeze([
  "mysql",
  "postgres",
  "sqlite3",
  "mariadb",
  "mssql",
  "mariadb",
  "mssql",
  "db2",
  "snowflake",
  "ibmi"
]);
class SequelizeTypeScript {
  // created by the Sequelize subclass. Will eventually be migrated here.
  dialect;
  options;
  /**
   * The options that were used to create this Sequelize instance.
   * These are an unmodified copy of the options passed to the constructor.
   * They are not normalized or validated.
   *
   * Mostly available for cloning the Sequelize instance.
   * For other uses, we recommend using {@link options} instead.
   */
  rawOptions;
  static get hooks() {
    return staticSequelizeHooks.getFor(this);
  }
  static addHook = (0, import_hooks_legacy.legacyBuildAddAnyHook)(staticSequelizeHooks);
  static removeHook = (0, import_hooks_legacy.legacyBuildRemoveHook)(staticSequelizeHooks);
  static hasHook = (0, import_hooks_legacy.legacyBuildHasHook)(staticSequelizeHooks);
  static hasHooks = (0, import_hooks_legacy.legacyBuildHasHook)(staticSequelizeHooks);
  static runHooks = (0, import_hooks_legacy.legacyBuildRunHook)(staticSequelizeHooks);
  static beforeInit = (0, import_hooks_legacy.legacyBuildAddHook)(staticSequelizeHooks, "beforeInit");
  static afterInit = (0, import_hooks_legacy.legacyBuildAddHook)(staticSequelizeHooks, "afterInit");
  get hooks() {
    return instanceSequelizeHooks.getFor(this);
  }
  addHook = (0, import_hooks_legacy.legacyBuildAddAnyHook)(instanceSequelizeHooks);
  removeHook = (0, import_hooks_legacy.legacyBuildRemoveHook)(instanceSequelizeHooks);
  hasHook = (0, import_hooks_legacy.legacyBuildHasHook)(instanceSequelizeHooks);
  hasHooks = (0, import_hooks_legacy.legacyBuildHasHook)(instanceSequelizeHooks);
  runHooks = (0, import_hooks_legacy.legacyBuildRunHook)(instanceSequelizeHooks);
  beforeQuery = (0, import_hooks_legacy.legacyBuildAddHook)(instanceSequelizeHooks, "beforeQuery");
  afterQuery = (0, import_hooks_legacy.legacyBuildAddHook)(instanceSequelizeHooks, "afterQuery");
  beforeBulkSync = (0, import_hooks_legacy.legacyBuildAddHook)(instanceSequelizeHooks, "beforeBulkSync");
  afterBulkSync = (0, import_hooks_legacy.legacyBuildAddHook)(instanceSequelizeHooks, "afterBulkSync");
  beforeConnect = (0, import_hooks_legacy.legacyBuildAddHook)(instanceSequelizeHooks, "beforeConnect");
  afterConnect = (0, import_hooks_legacy.legacyBuildAddHook)(instanceSequelizeHooks, "afterConnect");
  beforeDisconnect = (0, import_hooks_legacy.legacyBuildAddHook)(instanceSequelizeHooks, "beforeDisconnect");
  afterDisconnect = (0, import_hooks_legacy.legacyBuildAddHook)(instanceSequelizeHooks, "afterDisconnect");
  beforeDefine = (0, import_hooks_legacy.legacyBuildAddHook)(instanceSequelizeHooks, "beforeDefine");
  afterDefine = (0, import_hooks_legacy.legacyBuildAddHook)(instanceSequelizeHooks, "afterDefine");
  beforePoolAcquire = (0, import_hooks_legacy.legacyBuildAddHook)(instanceSequelizeHooks, "beforePoolAcquire");
  afterPoolAcquire = (0, import_hooks_legacy.legacyBuildAddHook)(instanceSequelizeHooks, "afterPoolAcquire");
  beforeValidate = (0, import_hooks_legacy.legacyBuildAddHook)(instanceSequelizeHooks, "beforeValidate");
  afterValidate = (0, import_hooks_legacy.legacyBuildAddHook)(instanceSequelizeHooks, "afterValidate");
  validationFailed = (0, import_hooks_legacy.legacyBuildAddHook)(instanceSequelizeHooks, "validationFailed");
  beforeCreate = (0, import_hooks_legacy.legacyBuildAddHook)(instanceSequelizeHooks, "beforeCreate");
  afterCreate = (0, import_hooks_legacy.legacyBuildAddHook)(instanceSequelizeHooks, "afterCreate");
  beforeDestroy = (0, import_hooks_legacy.legacyBuildAddHook)(instanceSequelizeHooks, "beforeDestroy");
  afterDestroy = (0, import_hooks_legacy.legacyBuildAddHook)(instanceSequelizeHooks, "afterDestroy");
  beforeRestore = (0, import_hooks_legacy.legacyBuildAddHook)(instanceSequelizeHooks, "beforeRestore");
  afterRestore = (0, import_hooks_legacy.legacyBuildAddHook)(instanceSequelizeHooks, "afterRestore");
  beforeUpdate = (0, import_hooks_legacy.legacyBuildAddHook)(instanceSequelizeHooks, "beforeUpdate");
  afterUpdate = (0, import_hooks_legacy.legacyBuildAddHook)(instanceSequelizeHooks, "afterUpdate");
  beforeUpsert = (0, import_hooks_legacy.legacyBuildAddHook)(instanceSequelizeHooks, "beforeUpsert");
  afterUpsert = (0, import_hooks_legacy.legacyBuildAddHook)(instanceSequelizeHooks, "afterUpsert");
  beforeSave = (0, import_hooks_legacy.legacyBuildAddHook)(instanceSequelizeHooks, "beforeSave");
  afterSave = (0, import_hooks_legacy.legacyBuildAddHook)(instanceSequelizeHooks, "afterSave");
  beforeBulkCreate = (0, import_hooks_legacy.legacyBuildAddHook)(instanceSequelizeHooks, "beforeBulkCreate");
  afterBulkCreate = (0, import_hooks_legacy.legacyBuildAddHook)(instanceSequelizeHooks, "afterBulkCreate");
  beforeBulkDestroy = (0, import_hooks_legacy.legacyBuildAddHook)(instanceSequelizeHooks, "beforeBulkDestroy");
  afterBulkDestroy = (0, import_hooks_legacy.legacyBuildAddHook)(instanceSequelizeHooks, "afterBulkDestroy");
  beforeBulkRestore = (0, import_hooks_legacy.legacyBuildAddHook)(instanceSequelizeHooks, "beforeBulkRestore");
  afterBulkRestore = (0, import_hooks_legacy.legacyBuildAddHook)(instanceSequelizeHooks, "afterBulkRestore");
  beforeBulkUpdate = (0, import_hooks_legacy.legacyBuildAddHook)(instanceSequelizeHooks, "beforeBulkUpdate");
  afterBulkUpdate = (0, import_hooks_legacy.legacyBuildAddHook)(instanceSequelizeHooks, "afterBulkUpdate");
  beforeCount = (0, import_hooks_legacy.legacyBuildAddHook)(instanceSequelizeHooks, "beforeCount");
  beforeFind = (0, import_hooks_legacy.legacyBuildAddHook)(instanceSequelizeHooks, "beforeFind");
  beforeFindAfterExpandIncludeAll = (0, import_hooks_legacy.legacyBuildAddHook)(
    instanceSequelizeHooks,
    "beforeFindAfterExpandIncludeAll"
  );
  beforeFindAfterOptions = (0, import_hooks_legacy.legacyBuildAddHook)(instanceSequelizeHooks, "beforeFindAfterOptions");
  afterFind = (0, import_hooks_legacy.legacyBuildAddHook)(instanceSequelizeHooks, "afterFind");
  beforeSync = (0, import_hooks_legacy.legacyBuildAddHook)(instanceSequelizeHooks, "beforeSync");
  afterSync = (0, import_hooks_legacy.legacyBuildAddHook)(instanceSequelizeHooks, "afterSync");
  beforeAssociate = (0, import_hooks_legacy.legacyBuildAddHook)(instanceSequelizeHooks, "beforeAssociate");
  afterAssociate = (0, import_hooks_legacy.legacyBuildAddHook)(instanceSequelizeHooks, "afterAssociate");
  #transactionCls;
  #databaseVersion;
  /**
   * The QueryInterface instance, dialect dependant.
   */
  get queryInterface() {
    return this.dialect.queryInterface;
  }
  /**
   * The QueryGenerator instance, dialect dependant.
   */
  get queryGenerator() {
    return this.dialect.queryGenerator;
  }
  get connectionManager() {
    throw new Error(`Accessing the connection manager is unlikely to be necessary anymore.
If you need to access the pool, you can access it directly through \`sequelize.pool\`.
If you really need to access the connection manager, access it through \`sequelize.dialect.connectionManager\`.`);
  }
  #models = /* @__PURE__ */ new Set();
  models = new import_model_set_view.ModelSetView(this, this.#models);
  #isClosed = false;
  pool;
  get modelManager() {
    throw new Error("Sequelize#modelManager was removed. Use Sequelize#models instead.");
  }
  /**
   * Instantiates sequelize.
   *
   * The options to connect to the database are specific to your dialect.
   * Please refer to the documentation of your dialect on https://sequelize.org to learn about the options you can use.
   *
   * @param options The option bag.
   * @example
   * import { PostgresDialect } from '@sequelize/postgres';
   *
   * // with database, username, and password in the options object
   * const sequelize = new Sequelize({ database, user, password, dialect: PostgresDialect });
   *
   * @example
   * // with url
   * import { MySqlDialect } from '@sequelize/mysql';
   *
   * const sequelize = new Sequelize({
   *   dialect: MySqlDialect,
   *   url: 'mysql://localhost:3306/database',
   * })
   *
   * @example
   * // option examples
   * import { MsSqlDialect } from '@sequelize/mssql';
   *
   * const sequelize = new Sequelize('database', 'username', 'password', {
   *   // the dialect of the database
   *   // It is a Dialect class exported from the dialect package
   *   dialect: MsSqlDialect,
   *
   *   // custom host;
   *   host: 'my.server.tld',
   *   // for postgres, you can also specify an absolute path to a directory
   *   // containing a UNIX socket to connect over
   *   // host: '/sockets/psql_sockets'.
   *
   *   // custom port;
   *   port: 12345,
   *
   *   // disable logging or provide a custom logging function; default: console.log
   *   logging: false,
   *
   *   // This option is specific to MySQL and MariaDB
   *   socketPath: '/Applications/MAMP/tmp/mysql/mysql.sock',
   *
   *   // the storage engine for sqlite
   *   // - default ':memory:'
   *   storage: 'path/to/database.sqlite',
   *
   *   // disable inserting undefined values as NULL
   *   // - default: false
   *   omitNull: true,
   *
   *   // A flag that defines if connection should be over ssl or not
   *   // Dialect-dependent, check the dialect documentation
   *   ssl: true,
   *
   *   // Specify options, which are used when sequelize.define is called.
   *   // The following example:
   *   //   define: { timestamps: false }
   *   // is basically the same as:
   *   //   Model.init(attributes, { timestamps: false });
   *   //   sequelize.define(name, attributes, { timestamps: false });
   *   // so defining the timestamps for each model will be not necessary
   *   define: {
   *     underscored: false,
   *     freezeTableName: false,
   *     charset: 'utf8',
   *     collate: 'utf8_general_ci'
   *     timestamps: true
   *   },
   *
   *   // similar for sync: you can define this to always force sync for models
   *   sync: { force: true },
   *
   *   // pool configuration used to pool database connections
   *   pool: {
   *     max: 5,
   *     idle: 30000,
   *     acquire: 60000,
   *   },
   *
   *   // isolation level of each transaction
   *   // defaults to dialect default
   *   isolationLevel: IsolationLevel.REPEATABLE_READ
   * })
   */
  constructor(options) {
    if (arguments.length > 2) {
      throw new Error(
        "The Sequelize constructor no longer accepts multiple arguments. Please use an options object instead."
      );
    }
    if ((0, import_utils.isString)(options)) {
      throw new Error(`The Sequelize constructor no longer accepts a string as the first argument. Please use the "url" option instead.

Example for Postgres:

new Sequelize({
  dialect: PostgresDialect,
  url: 'postgres://user:pass@localhost/dbname',
});`);
    }
    if (options.pool === false) {
      throw new Error(
        'Setting the "pool" option to "false" is not supported since Sequelize 4. To disable the pool, set the "pool"."max" option to 1.'
      );
    }
    if (options.logging === true) {
      throw new Error(
        'The "logging" option must be set to a function or false, not true. If you want to log all queries, set it to `console.log`.'
      );
    }
    if (options.operatorsAliases) {
      throw new Error(
        "String based operators have been removed. Please use Symbol operators, read more at https://sequelize.org/docs/v7/core-concepts/model-querying-basics/#deprecated-operator-aliases"
      );
    }
    if ("dialectModulePath" in options) {
      throw new Error(
        'The "dialectModulePath" option has been removed, as it is not compatible with bundlers. Please refer to the documentation of your dialect at https://sequelize.org to learn about the alternative.'
      );
    }
    if ("dialectModule" in options) {
      throw new Error(
        'The "dialectModule" option has been replaced with an equivalent option specific to your dialect. Please refer to the documentation of your dialect at https://sequelize.org to learn about the alternative.'
      );
    }
    if ("typeValidation" in options) {
      throw new Error(
        "The typeValidation has been renamed to noTypeValidation, and is false by default"
      );
    }
    if (!options.dialect) {
      throw new Error('The "dialect" option must be explicitly supplied since Sequelize 4');
    }
    (0, import_model_definition.listenForModelDefinition)((model) => {
      const modelName = model.modelDefinition.modelName;
      if (model.sequelize === this) {
        const existingModel = this.models.get(modelName);
        if (existingModel) {
          this.#models.delete(existingModel);
        }
        this.#models.add(model);
      }
    });
    import_sequelize.Sequelize.hooks.runSync("beforeInit", options);
    this.rawOptions = (0, import_utils.freezeDeep)((0, import_utils.cloneDeepPlainValues)(options, true));
    const DialectClass = (0, import_utils.isString)(options.dialect) ? (0, import_sequelize_internals.importDialect)(options.dialect) : options.dialect;
    const nonUndefinedOptions = (0, import_object.removeUndefined)(options);
    if (options.hooks) {
      this.hooks.addListeners(options.hooks);
    }
    const [persistedSequelizeOptions, remainingOptions] = (0, import_utils.splitObject)(
      nonUndefinedOptions,
      import_sequelize_internals.PERSISTED_SEQUELIZE_OPTIONS
    );
    const dialectOptionNames = DialectClass.getSupportedOptions();
    const connectionOptionNames = [...DialectClass.getSupportedConnectionOptions(), "url"];
    const allSequelizeOptionNames = [
      ...import_sequelize_internals.PERSISTED_SEQUELIZE_OPTIONS,
      // "url" is a special case. It's a connection option, but it's one that Sequelize accepts, instead of the dialect.
      ...import_sequelize_internals.EPHEMERAL_SEQUELIZE_OPTIONS.filter((option) => option !== "url")
    ];
    const allDialectOptionNames = [...dialectOptionNames, ...connectionOptionNames];
    const conflictingOptions = (0, import_array.getIntersection)(allSequelizeOptionNames, allDialectOptionNames);
    if (conflictingOptions.length > 0) {
      throw new Error(
        `The following options from ${DialectClass.name} conflict with built-in Sequelize options: ${(0, import_utils.join)(
          (0, import_utils.map)(conflictingOptions, (option) => import_chalk.default.red(option)),
          ", "
        )}.
This is a bug in the dialect implementation itself, not in the user's code.
Please rename these options to a name that is not already used by Sequelize.`
      );
    }
    const [{ dialectOptions, connectionOptions }, unseenKeys] = (0, import_object.untypedMultiSplitObject)(
      remainingOptions,
      {
        dialectOptions: dialectOptionNames,
        connectionOptions: connectionOptionNames
      }
    );
    for (const key of import_sequelize_internals.EPHEMERAL_SEQUELIZE_OPTIONS) {
      unseenKeys.delete(key);
    }
    if (unseenKeys.size > 0) {
      const caseInsensitiveEnComparator = (0, import_utils.localizedStringComparator)("en", import_utils.SortDirection.ASC, {
        sensitivity: "base"
      });
      throw new Error(
        `The following options are not recognized by Sequelize nor ${DialectClass.name}: ${(0, import_utils.join)(
          (0, import_utils.map)(unseenKeys, (option) => import_chalk.default.red(option)),
          ", "
        )}.

Sequelize accepts the following options: ${allSequelizeOptionNames.sort(caseInsensitiveEnComparator).map((option) => import_chalk.default.cyan(option)).join(", ")}.

${DialectClass.name} accepts the following options (in addition to the Sequelize options): ${[
          ...dialectOptionNames
        ].sort(caseInsensitiveEnComparator).map((option) => import_chalk.default.cyan(option)).join(", ")}.
${DialectClass.name} options can be set at the root of the option bag, like Sequelize options.

The following options can be used to configure the connection to the database: ${connectionOptionNames.sort(caseInsensitiveEnComparator).map((option) => import_chalk.default.cyan(option)).join(", ")}.
Connection options can be used at the root of the option bag, in the "replication" option, and can be modified by the "beforeConnect" hook.
`
      );
    }
    this.dialect = new DialectClass(this, dialectOptions);
    this.options = (0, import_utils.freezeDeep)({
      define: {},
      query: {},
      sync: {},
      timezone: "+00:00",
      keepDefaultTimezone: false,
      logging: false,
      omitNull: false,
      // TODO [>7]: remove this option
      quoteIdentifiers: true,
      retry: {
        max: 5,
        match: ["SQLITE_BUSY: database is locked"]
      },
      transactionType: import_transaction.TransactionType.DEFERRED,
      isolationLevel: void 0,
      noTypeValidation: false,
      benchmark: false,
      minifyAliases: false,
      logQueryParameters: false,
      disableClsTransactions: false,
      defaultTransactionNestMode: import_transaction.TransactionNestMode.reuse,
      defaultTimestampPrecision: 6,
      nullJsonStringification: "json",
      ...persistedSequelizeOptions,
      replication: (0, import_connection_options.normalizeReplicationConfig)(
        this.dialect,
        connectionOptions,
        options.replication
      )
    });
    if (options.databaseVersion) {
      this.setDatabaseVersion(options.databaseVersion);
    }
    if (!this.options.disableClsTransactions) {
      this.#transactionCls = new import_node_async_hooks.AsyncLocalStorage();
    }
    if (this.options.quoteIdentifiers === false) {
      Deprecations.alwaysQuoteIdentifiers();
    }
    if (!this.dialect.supports.globalTimeZoneConfig && this.options.timezone !== "+00:00") {
      throw new Error(
        `Setting a custom timezone is not supported by ${this.dialect.name}, dates are always returned as UTC. Please remove the custom timezone option.`
      );
    }
    this.pool = new import_replication_pool.ReplicationPool({
      pool: {
        max: 5,
        min: 0,
        idle: 1e4,
        acquire: 6e4,
        evict: 1e3,
        maxUses: Infinity,
        ...options.pool ? (0, import_object.removeUndefined)(options.pool) : void 0
      },
      connect: async (connectOptions) => {
        if (this.isClosed()) {
          throw new Error(
            "sequelize.close was called, new connections cannot be established. If you did not mean for the Sequelize instance to be closed permanently, prefer using sequelize.pool.destroyAllNow instead."
          );
        }
        const clonedConnectOptions = (0, import_utils.cloneDeepPlainValues)(connectOptions, true);
        await this.hooks.runAsync("beforeConnect", clonedConnectOptions);
        const connection = await this.dialect.connectionManager.connect(clonedConnectOptions);
        await this.hooks.runAsync("afterConnect", connection, clonedConnectOptions);
        if (!this.getDatabaseVersionIfExist()) {
          await this.#initializeDatabaseVersion(connection);
        }
        return connection;
      },
      disconnect: async (connection) => {
        await this.hooks.runAsync("beforeDisconnect", connection);
        await this.dialect.connectionManager.disconnect(connection);
        await this.hooks.runAsync("afterDisconnect", connection);
      },
      validate: (connection) => {
        if (options.pool?.validate) {
          return options.pool.validate(connection);
        }
        return this.dialect.connectionManager.validate(connection);
      },
      beforeAcquire: async (acquireOptions) => {
        return this.hooks.runAsync("beforePoolAcquire", acquireOptions);
      },
      afterAcquire: async (connection, acquireOptions) => {
        return this.hooks.runAsync("afterPoolAcquire", connection, acquireOptions);
      },
      timeoutErrorClass: import_connection_acquire_timeout_error.ConnectionAcquireTimeoutError,
      readConfig: this.options.replication.read,
      writeConfig: this.options.replication.write
    });
    if (options.models) {
      this.addModels(options.models);
    }
    import_sequelize.Sequelize.hooks.runSync("afterInit", this);
  }
  #databaseVersionPromise = null;
  async #initializeDatabaseVersion(connection) {
    if (this.#databaseVersion) {
      return;
    }
    if (this.#databaseVersionPromise) {
      await this.#databaseVersionPromise;
      return;
    }
    this.#databaseVersionPromise = (async () => {
      try {
        const version = await this.fetchDatabaseVersion({
          logging: false,
          connection
        });
        const parsedVersion = import_semver.default.coerce(version)?.version || version;
        this.setDatabaseVersion(
          import_semver.default.valid(parsedVersion) ? parsedVersion : this.dialect.minimumDatabaseVersion
        );
      } finally {
        this.#databaseVersionPromise = null;
      }
    })();
    await this.#databaseVersionPromise;
  }
  /**
   * Close all connections used by this sequelize instance, and free all references so the instance can be garbage collected.
   *
   * Normally this is done on process exit, so you only need to call this method if you are creating multiple instances, and want
   * to garbage collect some of them.
   *
   * @returns
   */
  async close() {
    this.#isClosed = true;
    await this.pool.destroyAllNow();
  }
  isClosed() {
    return this.#isClosed;
  }
  addModels(models) {
    const registeredModels = models.filter(
      (model) => (0, import_model.initDecoratedModel)(
        model,
        // @ts-expect-error -- remove once this class has been merged back with the Sequelize class
        this
      )
    );
    for (const model of registeredModels) {
      (0, import_associations.initDecoratedAssociations)(
        model,
        // @ts-expect-error -- remove once this class has been merged back with the Sequelize class
        this
      );
    }
  }
  removeAllModels() {
    for (const model of this.#models) {
      (0, import_model_definition.removeModelDefinition)(model);
    }
    this.#models.clear();
  }
  /**
   * Escape value to be used in raw SQL.
   *
   * If you are using this to use the value in a {@link literal}, consider using {@link sql} instead, which automatically
   * escapes interpolated values.
   *
   * @param value The value to escape
   * @param options
   */
  escape(value, options) {
    return this.dialect.queryGenerator.escape(value, options);
  }
  /**
   * Returns the CLS namespace that is used to manage transactions.
   * This method returns undefined if the Sequelize "disableClsTransactions" option is true.
   */
  getCLS() {
    return this.#transactionCls;
  }
  /**
   * Returns the transaction that is associated to the current asynchronous operation.
   * This method returns undefined if no transaction is active in the current asynchronous operation,
   * or if the Sequelize "disableClsTransactions" option is true.
   */
  getCurrentClsTransaction() {
    return this.#transactionCls?.getStore();
  }
  async transaction(optionsOrCallback, maybeCallback) {
    let options;
    let callback;
    if (typeof optionsOrCallback === "function") {
      callback = optionsOrCallback;
      options = {};
    } else {
      callback = maybeCallback;
      options = optionsOrCallback;
    }
    if (!callback) {
      throw new Error(
        "sequelize.transaction requires a callback. If you wish to start an unmanaged transaction, please use sequelize.startUnmanagedTransaction instead"
      );
    }
    const nestMode = options.nestMode ?? this.options.defaultTransactionNestMode;
    const normalizedOptions = (0, import_transaction.normalizeTransactionOptions)(this, options);
    if (nestMode === import_transaction.TransactionNestMode.separate) {
      delete normalizedOptions.transaction;
    } else {
      (0, import_model_internals.setTransactionFromCls)(normalizedOptions, this);
      if (normalizedOptions.transaction) {
        (0, import_transaction.assertTransactionIsCompatibleWithOptions)(normalizedOptions.transaction, normalizedOptions);
      }
    }
    const transaction = nestMode === import_transaction.TransactionNestMode.reuse && normalizedOptions.transaction ? normalizedOptions.transaction : new import_transaction.Transaction(
      // @ts-expect-error -- will be fixed once this class has been merged back with the Sequelize class
      this,
      normalizedOptions
    );
    const isReusedTransaction = transaction === normalizedOptions.transaction;
    const wrappedCallback = async () => {
      if (isReusedTransaction) {
        return callback(transaction);
      }
      await transaction.prepareEnvironment();
      let result;
      try {
        result = await callback(transaction);
      } catch (error) {
        try {
          await transaction.rollback();
        } catch {
        }
        throw error;
      }
      await transaction.commit();
      return result;
    };
    const cls = this.#transactionCls;
    if (!cls) {
      return wrappedCallback();
    }
    return cls.run(transaction, wrappedCallback);
  }
  /**
   * We highly recommend using {@link Sequelize#transaction} instead.
   * If you really want to use the manual solution, don't forget to commit or rollback your transaction once you are done with it.
   *
   * Transactions started by this method are not automatically passed to queries. You must pass the transaction object manually,
   * even if the Sequelize "disableClsTransactions" option is false.
   *
   * @example
   * ```ts
   * try {
   *   const transaction = await sequelize.startUnmanagedTransaction();
   *   const user = await User.findOne(..., { transaction });
   *   await user.update(..., { transaction });
   *   await transaction.commit();
   * } catch(err) {
   *   await transaction.rollback();
   * }
   * ```
   *
   * @param options
   */
  async startUnmanagedTransaction(options) {
    const transaction = new import_transaction.Transaction(
      // @ts-expect-error -- remove once this class has been merged back with the Sequelize class
      this,
      options
    );
    await transaction.prepareEnvironment();
    return transaction;
  }
  /**
   * A slower alternative to {@link truncate} that uses DELETE FROM instead of TRUNCATE,
   * but which works with foreign key constraints in dialects that don't support TRUNCATE CASCADE (postgres),
   * or temporarily disabling foreign key constraints (mysql, mariadb, sqlite).
   *
   * @param options
   */
  async destroyAll(options) {
    const sortedModels = this.models.getModelsTopoSortedByForeignKey();
    const models = sortedModels ?? this.models;
    if (options && "limit" in options) {
      throw new Error("sequelize.destroyAll does not support the limit option.");
    }
    if (options && "truncate" in options) {
      throw new Error(
        "sequelize.destroyAll does not support the truncate option. Use sequelize.truncate instead."
      );
    }
    for (const model of models) {
      await model.destroy({ ...options, where: {} });
    }
  }
  /**
   * Truncate all models registered in this instance.
   * This is done by calling {@link Model.truncate} on each model.
   *
   * @param options The options passed to {@link Model.truncate}, plus "withoutForeignKeyChecks".
   */
  async truncate(options) {
    const sortedModels = this.models.getModelsTopoSortedByForeignKey();
    const models = sortedModels ?? [...this.models];
    const hasCyclicDependencies = sortedModels == null;
    if (hasCyclicDependencies && !options?.cascade && !options?.withoutForeignKeyChecks) {
      throw new Error(
        'Sequelize#truncate: Some of your models have cyclic references (foreign keys). You need to use the "cascade" or "withoutForeignKeyChecks" options to be able to delete rows from models that have cyclic references.'
      );
    }
    if (options?.withoutForeignKeyChecks) {
      if (!this.dialect.supports.constraints.foreignKeyChecksDisableable) {
        throw new Error(
          `Sequelize#truncate: ${this.dialect.name} does not support disabling foreign key checks. The "withoutForeignKeyChecks" option cannot be used.`
        );
      }
      return this.queryInterface.withoutForeignKeyChecks(options, async (connection) => {
        const truncateOptions = { ...options, connection };
        await Promise.all(models.map(async (model) => model.truncate(truncateOptions)));
      });
    }
    if (options?.cascade) {
      for (const model of models) {
        await model.truncate(options);
      }
      return;
    }
    await Promise.all(models.map(async (model) => model.truncate(options)));
  }
  async withConnection(optionsOrCallback, maybeCallback) {
    let options;
    let callback;
    if (typeof optionsOrCallback === "function") {
      callback = optionsOrCallback;
      options = { type: "write" };
    } else {
      callback = maybeCallback;
      options = { type: "write", ...optionsOrCallback };
    }
    const connection = await this.pool.acquire(options);
    try {
      return await callback(connection);
    } finally {
      if (options.destroyConnection) {
        await this.pool.destroy(connection);
      } else {
        this.pool.release(connection);
      }
    }
  }
  /**
   * Alias of {@link AbstractQueryInterface#createSchema}
   *
   * @param schema Name of the schema
   * @param options
   */
  async createSchema(schema, options) {
    return this.queryInterface.createSchema(schema, options);
  }
  /**
   * Alias of {@link AbstractQueryInterface#showAllSchemas}
   *
   * @deprecated Use {@link AbstractQueryInterface#listSchemas} instead
   * @param options
   */
  async showAllSchemas(options) {
    (0, import_deprecations.showAllToListSchemas)();
    return this.queryInterface.listSchemas(options);
  }
  /**
   * Alias of {@link AbstractQueryInterface#dropSchema}
   *
   * @param schema
   * @param options
   */
  async dropSchema(schema, options) {
    return this.queryInterface.dropSchema(schema, options);
  }
  /**
   * Alias of {@link AbstractQueryInterface#dropAllSchemas}
   *
   * @param options
   */
  async dropAllSchemas(options) {
    return this.queryInterface.dropAllSchemas(options);
  }
  /**
   * Throws if the database version hasn't been loaded yet.
   * It is automatically loaded the first time Sequelize connects to your database.
   *
   * You can use {@link Sequelize#authenticate} to cause a first connection.
   *
   * @returns current version of the dialect that is internally loaded
   */
  getDatabaseVersion() {
    const databaseVersion = this.getDatabaseVersionIfExist();
    if (databaseVersion == null) {
      throw new Error(
        "The current database version is unknown. Please call `sequelize.authenticate()` first to fetch it, or manually configure it through options."
      );
    }
    return databaseVersion;
  }
  getDatabaseVersionIfExist() {
    return this.#databaseVersion || null;
  }
  setDatabaseVersion(version) {
    try {
      if (import_semver.default.lt(version, this.dialect.minimumDatabaseVersion)) {
        console.warn(
          `Database ${this.dialect.name} version ${(0, import_utils.inspect)(version)} is not supported. The minimum supported version is ${this.dialect.minimumDatabaseVersion}.`
        );
        Deprecations.unsupportedEngine();
      }
    } catch (error) {
      console.warn(
        `Could not validate the database version, as it is not a valid semver version: ${version}.`
      );
      console.warn(error);
    }
    this.#databaseVersion = version;
  }
  /**
   * Alias of {@link AbstractQueryInterface#fetchDatabaseVersion}
   *
   * @param options
   */
  async fetchDatabaseVersion(options) {
    return this.queryInterface.fetchDatabaseVersion(options);
  }
  /**
   * Validate a value against a field specification
   *
   * @param value The value to validate
   * @param type The DataType to validate against
   */
  validateValue(value, type) {
    if (this.options.noTypeValidation || (0, import_utils.isNullish)(value)) {
      return;
    }
    if ((0, import_utils.isString)(type)) {
      return;
    }
    type = this.normalizeDataType(type);
    const error = (0, import_data_types_utils.validateDataType)(value, type);
    if (error) {
      throw error;
    }
  }
  normalizeDataType(Type) {
    return (0, import_data_types_utils.normalizeDataType)(Type, this.dialect);
  }
}
//# sourceMappingURL=sequelize-typescript.js.map
