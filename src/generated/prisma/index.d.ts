
/**
 * Client
**/

import * as runtime from './runtime/library.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model User
 * 
 */
export type User = $Result.DefaultSelection<Prisma.$UserPayload>
/**
 * Model DocumentTemplate
 * 
 */
export type DocumentTemplate = $Result.DefaultSelection<Prisma.$DocumentTemplatePayload>
/**
 * Model Clause
 * 
 */
export type Clause = $Result.DefaultSelection<Prisma.$ClausePayload>
/**
 * Model TemplateClause
 * 
 */
export type TemplateClause = $Result.DefaultSelection<Prisma.$TemplateClausePayload>
/**
 * Model TemplateNormativity
 * 
 */
export type TemplateNormativity = $Result.DefaultSelection<Prisma.$TemplateNormativityPayload>
/**
 * Model UserDocument
 * 
 */
export type UserDocument = $Result.DefaultSelection<Prisma.$UserDocumentPayload>
/**
 * Model Contact
 * 
 */
export type Contact = $Result.DefaultSelection<Prisma.$ContactPayload>
/**
 * Model DocumentRequest
 * 
 */
export type DocumentRequest = $Result.DefaultSelection<Prisma.$DocumentRequestPayload>
/**
 * Model SiteSetting
 * 
 */
export type SiteSetting = $Result.DefaultSelection<Prisma.$SiteSettingPayload>
/**
 * Model Payment
 * 
 */
export type Payment = $Result.DefaultSelection<Prisma.$PaymentPayload>
/**
 * Model CreditTransaction
 * 
 */
export type CreditTransaction = $Result.DefaultSelection<Prisma.$CreditTransactionPayload>
/**
 * Model KnowledgeBase
 * 
 */
export type KnowledgeBase = $Result.DefaultSelection<Prisma.$KnowledgeBasePayload>
/**
 * Model Publication
 * 
 */
export type Publication = $Result.DefaultSelection<Prisma.$PublicationPayload>

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Users
 * const users = await prisma.user.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  const U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Users
   * const users = await prisma.user.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>


  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.user`: Exposes CRUD operations for the **User** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Users
    * const users = await prisma.user.findMany()
    * ```
    */
  get user(): Prisma.UserDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.documentTemplate`: Exposes CRUD operations for the **DocumentTemplate** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more DocumentTemplates
    * const documentTemplates = await prisma.documentTemplate.findMany()
    * ```
    */
  get documentTemplate(): Prisma.DocumentTemplateDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.clause`: Exposes CRUD operations for the **Clause** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Clauses
    * const clauses = await prisma.clause.findMany()
    * ```
    */
  get clause(): Prisma.ClauseDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.templateClause`: Exposes CRUD operations for the **TemplateClause** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more TemplateClauses
    * const templateClauses = await prisma.templateClause.findMany()
    * ```
    */
  get templateClause(): Prisma.TemplateClauseDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.templateNormativity`: Exposes CRUD operations for the **TemplateNormativity** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more TemplateNormativities
    * const templateNormativities = await prisma.templateNormativity.findMany()
    * ```
    */
  get templateNormativity(): Prisma.TemplateNormativityDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.userDocument`: Exposes CRUD operations for the **UserDocument** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more UserDocuments
    * const userDocuments = await prisma.userDocument.findMany()
    * ```
    */
  get userDocument(): Prisma.UserDocumentDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.contact`: Exposes CRUD operations for the **Contact** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Contacts
    * const contacts = await prisma.contact.findMany()
    * ```
    */
  get contact(): Prisma.ContactDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.documentRequest`: Exposes CRUD operations for the **DocumentRequest** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more DocumentRequests
    * const documentRequests = await prisma.documentRequest.findMany()
    * ```
    */
  get documentRequest(): Prisma.DocumentRequestDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.siteSetting`: Exposes CRUD operations for the **SiteSetting** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more SiteSettings
    * const siteSettings = await prisma.siteSetting.findMany()
    * ```
    */
  get siteSetting(): Prisma.SiteSettingDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.payment`: Exposes CRUD operations for the **Payment** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Payments
    * const payments = await prisma.payment.findMany()
    * ```
    */
  get payment(): Prisma.PaymentDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.creditTransaction`: Exposes CRUD operations for the **CreditTransaction** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more CreditTransactions
    * const creditTransactions = await prisma.creditTransaction.findMany()
    * ```
    */
  get creditTransaction(): Prisma.CreditTransactionDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.knowledgeBase`: Exposes CRUD operations for the **KnowledgeBase** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more KnowledgeBases
    * const knowledgeBases = await prisma.knowledgeBase.findMany()
    * ```
    */
  get knowledgeBase(): Prisma.KnowledgeBaseDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.publication`: Exposes CRUD operations for the **Publication** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Publications
    * const publications = await prisma.publication.findMany()
    * ```
    */
  get publication(): Prisma.PublicationDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 6.19.2
   * Query Engine version: c2990dca591cba766e3b7ef5d9e8a84796e47ab7
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import Bytes = runtime.Bytes
  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    User: 'User',
    DocumentTemplate: 'DocumentTemplate',
    Clause: 'Clause',
    TemplateClause: 'TemplateClause',
    TemplateNormativity: 'TemplateNormativity',
    UserDocument: 'UserDocument',
    Contact: 'Contact',
    DocumentRequest: 'DocumentRequest',
    SiteSetting: 'SiteSetting',
    Payment: 'Payment',
    CreditTransaction: 'CreditTransaction',
    KnowledgeBase: 'KnowledgeBase',
    Publication: 'Publication'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "user" | "documentTemplate" | "clause" | "templateClause" | "templateNormativity" | "userDocument" | "contact" | "documentRequest" | "siteSetting" | "payment" | "creditTransaction" | "knowledgeBase" | "publication"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      User: {
        payload: Prisma.$UserPayload<ExtArgs>
        fields: Prisma.UserFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UserFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UserFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findFirst: {
            args: Prisma.UserFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UserFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findMany: {
            args: Prisma.UserFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          create: {
            args: Prisma.UserCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          createMany: {
            args: Prisma.UserCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.UserCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          delete: {
            args: Prisma.UserDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          update: {
            args: Prisma.UserUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          deleteMany: {
            args: Prisma.UserDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UserUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.UserUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          upsert: {
            args: Prisma.UserUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          aggregate: {
            args: Prisma.UserAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUser>
          }
          groupBy: {
            args: Prisma.UserGroupByArgs<ExtArgs>
            result: $Utils.Optional<UserGroupByOutputType>[]
          }
          count: {
            args: Prisma.UserCountArgs<ExtArgs>
            result: $Utils.Optional<UserCountAggregateOutputType> | number
          }
        }
      }
      DocumentTemplate: {
        payload: Prisma.$DocumentTemplatePayload<ExtArgs>
        fields: Prisma.DocumentTemplateFieldRefs
        operations: {
          findUnique: {
            args: Prisma.DocumentTemplateFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DocumentTemplatePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.DocumentTemplateFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DocumentTemplatePayload>
          }
          findFirst: {
            args: Prisma.DocumentTemplateFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DocumentTemplatePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.DocumentTemplateFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DocumentTemplatePayload>
          }
          findMany: {
            args: Prisma.DocumentTemplateFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DocumentTemplatePayload>[]
          }
          create: {
            args: Prisma.DocumentTemplateCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DocumentTemplatePayload>
          }
          createMany: {
            args: Prisma.DocumentTemplateCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.DocumentTemplateCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DocumentTemplatePayload>[]
          }
          delete: {
            args: Prisma.DocumentTemplateDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DocumentTemplatePayload>
          }
          update: {
            args: Prisma.DocumentTemplateUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DocumentTemplatePayload>
          }
          deleteMany: {
            args: Prisma.DocumentTemplateDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.DocumentTemplateUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.DocumentTemplateUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DocumentTemplatePayload>[]
          }
          upsert: {
            args: Prisma.DocumentTemplateUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DocumentTemplatePayload>
          }
          aggregate: {
            args: Prisma.DocumentTemplateAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateDocumentTemplate>
          }
          groupBy: {
            args: Prisma.DocumentTemplateGroupByArgs<ExtArgs>
            result: $Utils.Optional<DocumentTemplateGroupByOutputType>[]
          }
          count: {
            args: Prisma.DocumentTemplateCountArgs<ExtArgs>
            result: $Utils.Optional<DocumentTemplateCountAggregateOutputType> | number
          }
        }
      }
      Clause: {
        payload: Prisma.$ClausePayload<ExtArgs>
        fields: Prisma.ClauseFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ClauseFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClausePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ClauseFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClausePayload>
          }
          findFirst: {
            args: Prisma.ClauseFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClausePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ClauseFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClausePayload>
          }
          findMany: {
            args: Prisma.ClauseFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClausePayload>[]
          }
          create: {
            args: Prisma.ClauseCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClausePayload>
          }
          createMany: {
            args: Prisma.ClauseCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ClauseCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClausePayload>[]
          }
          delete: {
            args: Prisma.ClauseDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClausePayload>
          }
          update: {
            args: Prisma.ClauseUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClausePayload>
          }
          deleteMany: {
            args: Prisma.ClauseDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ClauseUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ClauseUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClausePayload>[]
          }
          upsert: {
            args: Prisma.ClauseUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClausePayload>
          }
          aggregate: {
            args: Prisma.ClauseAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateClause>
          }
          groupBy: {
            args: Prisma.ClauseGroupByArgs<ExtArgs>
            result: $Utils.Optional<ClauseGroupByOutputType>[]
          }
          count: {
            args: Prisma.ClauseCountArgs<ExtArgs>
            result: $Utils.Optional<ClauseCountAggregateOutputType> | number
          }
        }
      }
      TemplateClause: {
        payload: Prisma.$TemplateClausePayload<ExtArgs>
        fields: Prisma.TemplateClauseFieldRefs
        operations: {
          findUnique: {
            args: Prisma.TemplateClauseFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TemplateClausePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.TemplateClauseFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TemplateClausePayload>
          }
          findFirst: {
            args: Prisma.TemplateClauseFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TemplateClausePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.TemplateClauseFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TemplateClausePayload>
          }
          findMany: {
            args: Prisma.TemplateClauseFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TemplateClausePayload>[]
          }
          create: {
            args: Prisma.TemplateClauseCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TemplateClausePayload>
          }
          createMany: {
            args: Prisma.TemplateClauseCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.TemplateClauseCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TemplateClausePayload>[]
          }
          delete: {
            args: Prisma.TemplateClauseDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TemplateClausePayload>
          }
          update: {
            args: Prisma.TemplateClauseUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TemplateClausePayload>
          }
          deleteMany: {
            args: Prisma.TemplateClauseDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.TemplateClauseUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.TemplateClauseUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TemplateClausePayload>[]
          }
          upsert: {
            args: Prisma.TemplateClauseUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TemplateClausePayload>
          }
          aggregate: {
            args: Prisma.TemplateClauseAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateTemplateClause>
          }
          groupBy: {
            args: Prisma.TemplateClauseGroupByArgs<ExtArgs>
            result: $Utils.Optional<TemplateClauseGroupByOutputType>[]
          }
          count: {
            args: Prisma.TemplateClauseCountArgs<ExtArgs>
            result: $Utils.Optional<TemplateClauseCountAggregateOutputType> | number
          }
        }
      }
      TemplateNormativity: {
        payload: Prisma.$TemplateNormativityPayload<ExtArgs>
        fields: Prisma.TemplateNormativityFieldRefs
        operations: {
          findUnique: {
            args: Prisma.TemplateNormativityFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TemplateNormativityPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.TemplateNormativityFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TemplateNormativityPayload>
          }
          findFirst: {
            args: Prisma.TemplateNormativityFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TemplateNormativityPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.TemplateNormativityFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TemplateNormativityPayload>
          }
          findMany: {
            args: Prisma.TemplateNormativityFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TemplateNormativityPayload>[]
          }
          create: {
            args: Prisma.TemplateNormativityCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TemplateNormativityPayload>
          }
          createMany: {
            args: Prisma.TemplateNormativityCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.TemplateNormativityCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TemplateNormativityPayload>[]
          }
          delete: {
            args: Prisma.TemplateNormativityDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TemplateNormativityPayload>
          }
          update: {
            args: Prisma.TemplateNormativityUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TemplateNormativityPayload>
          }
          deleteMany: {
            args: Prisma.TemplateNormativityDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.TemplateNormativityUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.TemplateNormativityUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TemplateNormativityPayload>[]
          }
          upsert: {
            args: Prisma.TemplateNormativityUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TemplateNormativityPayload>
          }
          aggregate: {
            args: Prisma.TemplateNormativityAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateTemplateNormativity>
          }
          groupBy: {
            args: Prisma.TemplateNormativityGroupByArgs<ExtArgs>
            result: $Utils.Optional<TemplateNormativityGroupByOutputType>[]
          }
          count: {
            args: Prisma.TemplateNormativityCountArgs<ExtArgs>
            result: $Utils.Optional<TemplateNormativityCountAggregateOutputType> | number
          }
        }
      }
      UserDocument: {
        payload: Prisma.$UserDocumentPayload<ExtArgs>
        fields: Prisma.UserDocumentFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UserDocumentFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserDocumentPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UserDocumentFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserDocumentPayload>
          }
          findFirst: {
            args: Prisma.UserDocumentFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserDocumentPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UserDocumentFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserDocumentPayload>
          }
          findMany: {
            args: Prisma.UserDocumentFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserDocumentPayload>[]
          }
          create: {
            args: Prisma.UserDocumentCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserDocumentPayload>
          }
          createMany: {
            args: Prisma.UserDocumentCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.UserDocumentCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserDocumentPayload>[]
          }
          delete: {
            args: Prisma.UserDocumentDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserDocumentPayload>
          }
          update: {
            args: Prisma.UserDocumentUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserDocumentPayload>
          }
          deleteMany: {
            args: Prisma.UserDocumentDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UserDocumentUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.UserDocumentUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserDocumentPayload>[]
          }
          upsert: {
            args: Prisma.UserDocumentUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserDocumentPayload>
          }
          aggregate: {
            args: Prisma.UserDocumentAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUserDocument>
          }
          groupBy: {
            args: Prisma.UserDocumentGroupByArgs<ExtArgs>
            result: $Utils.Optional<UserDocumentGroupByOutputType>[]
          }
          count: {
            args: Prisma.UserDocumentCountArgs<ExtArgs>
            result: $Utils.Optional<UserDocumentCountAggregateOutputType> | number
          }
        }
      }
      Contact: {
        payload: Prisma.$ContactPayload<ExtArgs>
        fields: Prisma.ContactFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ContactFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ContactPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ContactFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ContactPayload>
          }
          findFirst: {
            args: Prisma.ContactFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ContactPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ContactFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ContactPayload>
          }
          findMany: {
            args: Prisma.ContactFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ContactPayload>[]
          }
          create: {
            args: Prisma.ContactCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ContactPayload>
          }
          createMany: {
            args: Prisma.ContactCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ContactCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ContactPayload>[]
          }
          delete: {
            args: Prisma.ContactDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ContactPayload>
          }
          update: {
            args: Prisma.ContactUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ContactPayload>
          }
          deleteMany: {
            args: Prisma.ContactDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ContactUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ContactUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ContactPayload>[]
          }
          upsert: {
            args: Prisma.ContactUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ContactPayload>
          }
          aggregate: {
            args: Prisma.ContactAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateContact>
          }
          groupBy: {
            args: Prisma.ContactGroupByArgs<ExtArgs>
            result: $Utils.Optional<ContactGroupByOutputType>[]
          }
          count: {
            args: Prisma.ContactCountArgs<ExtArgs>
            result: $Utils.Optional<ContactCountAggregateOutputType> | number
          }
        }
      }
      DocumentRequest: {
        payload: Prisma.$DocumentRequestPayload<ExtArgs>
        fields: Prisma.DocumentRequestFieldRefs
        operations: {
          findUnique: {
            args: Prisma.DocumentRequestFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DocumentRequestPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.DocumentRequestFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DocumentRequestPayload>
          }
          findFirst: {
            args: Prisma.DocumentRequestFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DocumentRequestPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.DocumentRequestFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DocumentRequestPayload>
          }
          findMany: {
            args: Prisma.DocumentRequestFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DocumentRequestPayload>[]
          }
          create: {
            args: Prisma.DocumentRequestCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DocumentRequestPayload>
          }
          createMany: {
            args: Prisma.DocumentRequestCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.DocumentRequestCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DocumentRequestPayload>[]
          }
          delete: {
            args: Prisma.DocumentRequestDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DocumentRequestPayload>
          }
          update: {
            args: Prisma.DocumentRequestUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DocumentRequestPayload>
          }
          deleteMany: {
            args: Prisma.DocumentRequestDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.DocumentRequestUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.DocumentRequestUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DocumentRequestPayload>[]
          }
          upsert: {
            args: Prisma.DocumentRequestUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DocumentRequestPayload>
          }
          aggregate: {
            args: Prisma.DocumentRequestAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateDocumentRequest>
          }
          groupBy: {
            args: Prisma.DocumentRequestGroupByArgs<ExtArgs>
            result: $Utils.Optional<DocumentRequestGroupByOutputType>[]
          }
          count: {
            args: Prisma.DocumentRequestCountArgs<ExtArgs>
            result: $Utils.Optional<DocumentRequestCountAggregateOutputType> | number
          }
        }
      }
      SiteSetting: {
        payload: Prisma.$SiteSettingPayload<ExtArgs>
        fields: Prisma.SiteSettingFieldRefs
        operations: {
          findUnique: {
            args: Prisma.SiteSettingFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SiteSettingPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.SiteSettingFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SiteSettingPayload>
          }
          findFirst: {
            args: Prisma.SiteSettingFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SiteSettingPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.SiteSettingFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SiteSettingPayload>
          }
          findMany: {
            args: Prisma.SiteSettingFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SiteSettingPayload>[]
          }
          create: {
            args: Prisma.SiteSettingCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SiteSettingPayload>
          }
          createMany: {
            args: Prisma.SiteSettingCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.SiteSettingCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SiteSettingPayload>[]
          }
          delete: {
            args: Prisma.SiteSettingDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SiteSettingPayload>
          }
          update: {
            args: Prisma.SiteSettingUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SiteSettingPayload>
          }
          deleteMany: {
            args: Prisma.SiteSettingDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.SiteSettingUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.SiteSettingUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SiteSettingPayload>[]
          }
          upsert: {
            args: Prisma.SiteSettingUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SiteSettingPayload>
          }
          aggregate: {
            args: Prisma.SiteSettingAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateSiteSetting>
          }
          groupBy: {
            args: Prisma.SiteSettingGroupByArgs<ExtArgs>
            result: $Utils.Optional<SiteSettingGroupByOutputType>[]
          }
          count: {
            args: Prisma.SiteSettingCountArgs<ExtArgs>
            result: $Utils.Optional<SiteSettingCountAggregateOutputType> | number
          }
        }
      }
      Payment: {
        payload: Prisma.$PaymentPayload<ExtArgs>
        fields: Prisma.PaymentFieldRefs
        operations: {
          findUnique: {
            args: Prisma.PaymentFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PaymentPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.PaymentFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PaymentPayload>
          }
          findFirst: {
            args: Prisma.PaymentFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PaymentPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.PaymentFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PaymentPayload>
          }
          findMany: {
            args: Prisma.PaymentFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PaymentPayload>[]
          }
          create: {
            args: Prisma.PaymentCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PaymentPayload>
          }
          createMany: {
            args: Prisma.PaymentCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.PaymentCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PaymentPayload>[]
          }
          delete: {
            args: Prisma.PaymentDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PaymentPayload>
          }
          update: {
            args: Prisma.PaymentUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PaymentPayload>
          }
          deleteMany: {
            args: Prisma.PaymentDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.PaymentUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.PaymentUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PaymentPayload>[]
          }
          upsert: {
            args: Prisma.PaymentUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PaymentPayload>
          }
          aggregate: {
            args: Prisma.PaymentAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregatePayment>
          }
          groupBy: {
            args: Prisma.PaymentGroupByArgs<ExtArgs>
            result: $Utils.Optional<PaymentGroupByOutputType>[]
          }
          count: {
            args: Prisma.PaymentCountArgs<ExtArgs>
            result: $Utils.Optional<PaymentCountAggregateOutputType> | number
          }
        }
      }
      CreditTransaction: {
        payload: Prisma.$CreditTransactionPayload<ExtArgs>
        fields: Prisma.CreditTransactionFieldRefs
        operations: {
          findUnique: {
            args: Prisma.CreditTransactionFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CreditTransactionPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.CreditTransactionFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CreditTransactionPayload>
          }
          findFirst: {
            args: Prisma.CreditTransactionFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CreditTransactionPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.CreditTransactionFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CreditTransactionPayload>
          }
          findMany: {
            args: Prisma.CreditTransactionFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CreditTransactionPayload>[]
          }
          create: {
            args: Prisma.CreditTransactionCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CreditTransactionPayload>
          }
          createMany: {
            args: Prisma.CreditTransactionCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.CreditTransactionCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CreditTransactionPayload>[]
          }
          delete: {
            args: Prisma.CreditTransactionDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CreditTransactionPayload>
          }
          update: {
            args: Prisma.CreditTransactionUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CreditTransactionPayload>
          }
          deleteMany: {
            args: Prisma.CreditTransactionDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.CreditTransactionUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.CreditTransactionUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CreditTransactionPayload>[]
          }
          upsert: {
            args: Prisma.CreditTransactionUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CreditTransactionPayload>
          }
          aggregate: {
            args: Prisma.CreditTransactionAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateCreditTransaction>
          }
          groupBy: {
            args: Prisma.CreditTransactionGroupByArgs<ExtArgs>
            result: $Utils.Optional<CreditTransactionGroupByOutputType>[]
          }
          count: {
            args: Prisma.CreditTransactionCountArgs<ExtArgs>
            result: $Utils.Optional<CreditTransactionCountAggregateOutputType> | number
          }
        }
      }
      KnowledgeBase: {
        payload: Prisma.$KnowledgeBasePayload<ExtArgs>
        fields: Prisma.KnowledgeBaseFieldRefs
        operations: {
          findUnique: {
            args: Prisma.KnowledgeBaseFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$KnowledgeBasePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.KnowledgeBaseFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$KnowledgeBasePayload>
          }
          findFirst: {
            args: Prisma.KnowledgeBaseFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$KnowledgeBasePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.KnowledgeBaseFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$KnowledgeBasePayload>
          }
          findMany: {
            args: Prisma.KnowledgeBaseFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$KnowledgeBasePayload>[]
          }
          create: {
            args: Prisma.KnowledgeBaseCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$KnowledgeBasePayload>
          }
          createMany: {
            args: Prisma.KnowledgeBaseCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.KnowledgeBaseCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$KnowledgeBasePayload>[]
          }
          delete: {
            args: Prisma.KnowledgeBaseDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$KnowledgeBasePayload>
          }
          update: {
            args: Prisma.KnowledgeBaseUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$KnowledgeBasePayload>
          }
          deleteMany: {
            args: Prisma.KnowledgeBaseDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.KnowledgeBaseUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.KnowledgeBaseUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$KnowledgeBasePayload>[]
          }
          upsert: {
            args: Prisma.KnowledgeBaseUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$KnowledgeBasePayload>
          }
          aggregate: {
            args: Prisma.KnowledgeBaseAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateKnowledgeBase>
          }
          groupBy: {
            args: Prisma.KnowledgeBaseGroupByArgs<ExtArgs>
            result: $Utils.Optional<KnowledgeBaseGroupByOutputType>[]
          }
          count: {
            args: Prisma.KnowledgeBaseCountArgs<ExtArgs>
            result: $Utils.Optional<KnowledgeBaseCountAggregateOutputType> | number
          }
        }
      }
      Publication: {
        payload: Prisma.$PublicationPayload<ExtArgs>
        fields: Prisma.PublicationFieldRefs
        operations: {
          findUnique: {
            args: Prisma.PublicationFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PublicationPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.PublicationFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PublicationPayload>
          }
          findFirst: {
            args: Prisma.PublicationFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PublicationPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.PublicationFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PublicationPayload>
          }
          findMany: {
            args: Prisma.PublicationFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PublicationPayload>[]
          }
          create: {
            args: Prisma.PublicationCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PublicationPayload>
          }
          createMany: {
            args: Prisma.PublicationCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.PublicationCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PublicationPayload>[]
          }
          delete: {
            args: Prisma.PublicationDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PublicationPayload>
          }
          update: {
            args: Prisma.PublicationUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PublicationPayload>
          }
          deleteMany: {
            args: Prisma.PublicationDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.PublicationUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.PublicationUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PublicationPayload>[]
          }
          upsert: {
            args: Prisma.PublicationUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PublicationPayload>
          }
          aggregate: {
            args: Prisma.PublicationAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregatePublication>
          }
          groupBy: {
            args: Prisma.PublicationGroupByArgs<ExtArgs>
            result: $Utils.Optional<PublicationGroupByOutputType>[]
          }
          count: {
            args: Prisma.PublicationCountArgs<ExtArgs>
            result: $Utils.Optional<PublicationCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Shorthand for `emit: 'stdout'`
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events only
     * log: [
     *   { emit: 'event', level: 'query' },
     *   { emit: 'event', level: 'info' },
     *   { emit: 'event', level: 'warn' }
     *   { emit: 'event', level: 'error' }
     * ]
     * 
     * / Emit as events and log to stdout
     * og: [
     *  { emit: 'stdout', level: 'query' },
     *  { emit: 'stdout', level: 'info' },
     *  { emit: 'stdout', level: 'warn' }
     *  { emit: 'stdout', level: 'error' }
     * 
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * Instance of a Driver Adapter, e.g., like one provided by `@prisma/adapter-planetscale`
     */
    adapter?: runtime.SqlDriverAdapterFactory | null
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
  }
  export type GlobalOmitConfig = {
    user?: UserOmit
    documentTemplate?: DocumentTemplateOmit
    clause?: ClauseOmit
    templateClause?: TemplateClauseOmit
    templateNormativity?: TemplateNormativityOmit
    userDocument?: UserDocumentOmit
    contact?: ContactOmit
    documentRequest?: DocumentRequestOmit
    siteSetting?: SiteSettingOmit
    payment?: PaymentOmit
    creditTransaction?: CreditTransactionOmit
    knowledgeBase?: KnowledgeBaseOmit
    publication?: PublicationOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type CheckIsLogLevel<T> = T extends LogLevel ? T : never;

  export type GetLogType<T> = CheckIsLogLevel<
    T extends LogDefinition ? T['level'] : T
  >;

  export type GetEvents<T extends any[]> = T extends Array<LogLevel | LogDefinition>
    ? GetLogType<T[number]>
    : never;

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type UserCountOutputType
   */

  export type UserCountOutputType = {
    documents: number
    contacts: number
    creditTransactions: number
    creditGrants: number
  }

  export type UserCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    documents?: boolean | UserCountOutputTypeCountDocumentsArgs
    contacts?: boolean | UserCountOutputTypeCountContactsArgs
    creditTransactions?: boolean | UserCountOutputTypeCountCreditTransactionsArgs
    creditGrants?: boolean | UserCountOutputTypeCountCreditGrantsArgs
  }

  // Custom InputTypes
  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserCountOutputType
     */
    select?: UserCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountDocumentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserDocumentWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountContactsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ContactWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountCreditTransactionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CreditTransactionWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountCreditGrantsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CreditTransactionWhereInput
  }


  /**
   * Count Type DocumentTemplateCountOutputType
   */

  export type DocumentTemplateCountOutputType = {
    clauses: number
    normativity: number
    documents: number
  }

  export type DocumentTemplateCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    clauses?: boolean | DocumentTemplateCountOutputTypeCountClausesArgs
    normativity?: boolean | DocumentTemplateCountOutputTypeCountNormativityArgs
    documents?: boolean | DocumentTemplateCountOutputTypeCountDocumentsArgs
  }

  // Custom InputTypes
  /**
   * DocumentTemplateCountOutputType without action
   */
  export type DocumentTemplateCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DocumentTemplateCountOutputType
     */
    select?: DocumentTemplateCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * DocumentTemplateCountOutputType without action
   */
  export type DocumentTemplateCountOutputTypeCountClausesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TemplateClauseWhereInput
  }

  /**
   * DocumentTemplateCountOutputType without action
   */
  export type DocumentTemplateCountOutputTypeCountNormativityArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TemplateNormativityWhereInput
  }

  /**
   * DocumentTemplateCountOutputType without action
   */
  export type DocumentTemplateCountOutputTypeCountDocumentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserDocumentWhereInput
  }


  /**
   * Count Type ClauseCountOutputType
   */

  export type ClauseCountOutputType = {
    templates: number
  }

  export type ClauseCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    templates?: boolean | ClauseCountOutputTypeCountTemplatesArgs
  }

  // Custom InputTypes
  /**
   * ClauseCountOutputType without action
   */
  export type ClauseCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ClauseCountOutputType
     */
    select?: ClauseCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * ClauseCountOutputType without action
   */
  export type ClauseCountOutputTypeCountTemplatesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TemplateClauseWhereInput
  }


  /**
   * Models
   */

  /**
   * Model User
   */

  export type AggregateUser = {
    _count: UserCountAggregateOutputType | null
    _avg: UserAvgAggregateOutputType | null
    _sum: UserSumAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  export type UserAvgAggregateOutputType = {
    credits: number | null
  }

  export type UserSumAggregateOutputType = {
    credits: number | null
  }

  export type UserMinAggregateOutputType = {
    id: string | null
    username: string | null
    passwordHash: string | null
    name: string | null
    email: string | null
    phone: string | null
    role: string | null
    status: string | null
    credits: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UserMaxAggregateOutputType = {
    id: string | null
    username: string | null
    passwordHash: string | null
    name: string | null
    email: string | null
    phone: string | null
    role: string | null
    status: string | null
    credits: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UserCountAggregateOutputType = {
    id: number
    username: number
    passwordHash: number
    name: number
    email: number
    phone: number
    role: number
    status: number
    credits: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type UserAvgAggregateInputType = {
    credits?: true
  }

  export type UserSumAggregateInputType = {
    credits?: true
  }

  export type UserMinAggregateInputType = {
    id?: true
    username?: true
    passwordHash?: true
    name?: true
    email?: true
    phone?: true
    role?: true
    status?: true
    credits?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UserMaxAggregateInputType = {
    id?: true
    username?: true
    passwordHash?: true
    name?: true
    email?: true
    phone?: true
    role?: true
    status?: true
    credits?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UserCountAggregateInputType = {
    id?: true
    username?: true
    passwordHash?: true
    name?: true
    email?: true
    phone?: true
    role?: true
    status?: true
    credits?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type UserAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which User to aggregate.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Users
    **/
    _count?: true | UserCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: UserAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: UserSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserMaxAggregateInputType
  }

  export type GetUserAggregateType<T extends UserAggregateArgs> = {
        [P in keyof T & keyof AggregateUser]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUser[P]>
      : GetScalarType<T[P], AggregateUser[P]>
  }




  export type UserGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserWhereInput
    orderBy?: UserOrderByWithAggregationInput | UserOrderByWithAggregationInput[]
    by: UserScalarFieldEnum[] | UserScalarFieldEnum
    having?: UserScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserCountAggregateInputType | true
    _avg?: UserAvgAggregateInputType
    _sum?: UserSumAggregateInputType
    _min?: UserMinAggregateInputType
    _max?: UserMaxAggregateInputType
  }

  export type UserGroupByOutputType = {
    id: string
    username: string
    passwordHash: string
    name: string
    email: string | null
    phone: string | null
    role: string
    status: string
    credits: number
    createdAt: Date
    updatedAt: Date
    _count: UserCountAggregateOutputType | null
    _avg: UserAvgAggregateOutputType | null
    _sum: UserSumAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  type GetUserGroupByPayload<T extends UserGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UserGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserGroupByOutputType[P]>
            : GetScalarType<T[P], UserGroupByOutputType[P]>
        }
      >
    >


  export type UserSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    username?: boolean
    passwordHash?: boolean
    name?: boolean
    email?: boolean
    phone?: boolean
    role?: boolean
    status?: boolean
    credits?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    documents?: boolean | User$documentsArgs<ExtArgs>
    contacts?: boolean | User$contactsArgs<ExtArgs>
    creditTransactions?: boolean | User$creditTransactionsArgs<ExtArgs>
    creditGrants?: boolean | User$creditGrantsArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["user"]>

  export type UserSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    username?: boolean
    passwordHash?: boolean
    name?: boolean
    email?: boolean
    phone?: boolean
    role?: boolean
    status?: boolean
    credits?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    username?: boolean
    passwordHash?: boolean
    name?: boolean
    email?: boolean
    phone?: boolean
    role?: boolean
    status?: boolean
    credits?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectScalar = {
    id?: boolean
    username?: boolean
    passwordHash?: boolean
    name?: boolean
    email?: boolean
    phone?: boolean
    role?: boolean
    status?: boolean
    credits?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type UserOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "username" | "passwordHash" | "name" | "email" | "phone" | "role" | "status" | "credits" | "createdAt" | "updatedAt", ExtArgs["result"]["user"]>
  export type UserInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    documents?: boolean | User$documentsArgs<ExtArgs>
    contacts?: boolean | User$contactsArgs<ExtArgs>
    creditTransactions?: boolean | User$creditTransactionsArgs<ExtArgs>
    creditGrants?: boolean | User$creditGrantsArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type UserIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type UserIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $UserPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "User"
    objects: {
      documents: Prisma.$UserDocumentPayload<ExtArgs>[]
      contacts: Prisma.$ContactPayload<ExtArgs>[]
      creditTransactions: Prisma.$CreditTransactionPayload<ExtArgs>[]
      creditGrants: Prisma.$CreditTransactionPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      username: string
      passwordHash: string
      name: string
      email: string | null
      phone: string | null
      role: string
      status: string
      credits: number
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["user"]>
    composites: {}
  }

  type UserGetPayload<S extends boolean | null | undefined | UserDefaultArgs> = $Result.GetResult<Prisma.$UserPayload, S>

  type UserCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<UserFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: UserCountAggregateInputType | true
    }

  export interface UserDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['User'], meta: { name: 'User' } }
    /**
     * Find zero or one User that matches the filter.
     * @param {UserFindUniqueArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UserFindUniqueArgs>(args: SelectSubset<T, UserFindUniqueArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one User that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {UserFindUniqueOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UserFindUniqueOrThrowArgs>(args: SelectSubset<T, UserFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UserFindFirstArgs>(args?: SelectSubset<T, UserFindFirstArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UserFindFirstOrThrowArgs>(args?: SelectSubset<T, UserFindFirstOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Users
     * const users = await prisma.user.findMany()
     * 
     * // Get first 10 Users
     * const users = await prisma.user.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const userWithIdOnly = await prisma.user.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends UserFindManyArgs>(args?: SelectSubset<T, UserFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a User.
     * @param {UserCreateArgs} args - Arguments to create a User.
     * @example
     * // Create one User
     * const User = await prisma.user.create({
     *   data: {
     *     // ... data to create a User
     *   }
     * })
     * 
     */
    create<T extends UserCreateArgs>(args: SelectSubset<T, UserCreateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Users.
     * @param {UserCreateManyArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UserCreateManyArgs>(args?: SelectSubset<T, UserCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Users and returns the data saved in the database.
     * @param {UserCreateManyAndReturnArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Users and only return the `id`
     * const userWithIdOnly = await prisma.user.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends UserCreateManyAndReturnArgs>(args?: SelectSubset<T, UserCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a User.
     * @param {UserDeleteArgs} args - Arguments to delete one User.
     * @example
     * // Delete one User
     * const User = await prisma.user.delete({
     *   where: {
     *     // ... filter to delete one User
     *   }
     * })
     * 
     */
    delete<T extends UserDeleteArgs>(args: SelectSubset<T, UserDeleteArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one User.
     * @param {UserUpdateArgs} args - Arguments to update one User.
     * @example
     * // Update one User
     * const user = await prisma.user.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UserUpdateArgs>(args: SelectSubset<T, UserUpdateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Users.
     * @param {UserDeleteManyArgs} args - Arguments to filter Users to delete.
     * @example
     * // Delete a few Users
     * const { count } = await prisma.user.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UserDeleteManyArgs>(args?: SelectSubset<T, UserDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UserUpdateManyArgs>(args: SelectSubset<T, UserUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users and returns the data updated in the database.
     * @param {UserUpdateManyAndReturnArgs} args - Arguments to update many Users.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Users and only return the `id`
     * const userWithIdOnly = await prisma.user.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends UserUpdateManyAndReturnArgs>(args: SelectSubset<T, UserUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one User.
     * @param {UserUpsertArgs} args - Arguments to update or create a User.
     * @example
     * // Update or create a User
     * const user = await prisma.user.upsert({
     *   create: {
     *     // ... data to create a User
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the User we want to update
     *   }
     * })
     */
    upsert<T extends UserUpsertArgs>(args: SelectSubset<T, UserUpsertArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserCountArgs} args - Arguments to filter Users to count.
     * @example
     * // Count the number of Users
     * const count = await prisma.user.count({
     *   where: {
     *     // ... the filter for the Users we want to count
     *   }
     * })
    **/
    count<T extends UserCountArgs>(
      args?: Subset<T, UserCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UserAggregateArgs>(args: Subset<T, UserAggregateArgs>): Prisma.PrismaPromise<GetUserAggregateType<T>>

    /**
     * Group by User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends UserGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserGroupByArgs['orderBy'] }
        : { orderBy?: UserGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, UserGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the User model
   */
  readonly fields: UserFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for User.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UserClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    documents<T extends User$documentsArgs<ExtArgs> = {}>(args?: Subset<T, User$documentsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserDocumentPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    contacts<T extends User$contactsArgs<ExtArgs> = {}>(args?: Subset<T, User$contactsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ContactPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    creditTransactions<T extends User$creditTransactionsArgs<ExtArgs> = {}>(args?: Subset<T, User$creditTransactionsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CreditTransactionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    creditGrants<T extends User$creditGrantsArgs<ExtArgs> = {}>(args?: Subset<T, User$creditGrantsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CreditTransactionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the User model
   */
  interface UserFieldRefs {
    readonly id: FieldRef<"User", 'String'>
    readonly username: FieldRef<"User", 'String'>
    readonly passwordHash: FieldRef<"User", 'String'>
    readonly name: FieldRef<"User", 'String'>
    readonly email: FieldRef<"User", 'String'>
    readonly phone: FieldRef<"User", 'String'>
    readonly role: FieldRef<"User", 'String'>
    readonly status: FieldRef<"User", 'String'>
    readonly credits: FieldRef<"User", 'Int'>
    readonly createdAt: FieldRef<"User", 'DateTime'>
    readonly updatedAt: FieldRef<"User", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * User findUnique
   */
  export type UserFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findUniqueOrThrow
   */
  export type UserFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findFirst
   */
  export type UserFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findFirstOrThrow
   */
  export type UserFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findMany
   */
  export type UserFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which Users to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User create
   */
  export type UserCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to create a User.
     */
    data: XOR<UserCreateInput, UserUncheckedCreateInput>
  }

  /**
   * User createMany
   */
  export type UserCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
  }

  /**
   * User createManyAndReturn
   */
  export type UserCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
  }

  /**
   * User update
   */
  export type UserUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to update a User.
     */
    data: XOR<UserUpdateInput, UserUncheckedUpdateInput>
    /**
     * Choose, which User to update.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User updateMany
   */
  export type UserUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User updateManyAndReturn
   */
  export type UserUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User upsert
   */
  export type UserUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The filter to search for the User to update in case it exists.
     */
    where: UserWhereUniqueInput
    /**
     * In case the User found by the `where` argument doesn't exist, create a new User with this data.
     */
    create: XOR<UserCreateInput, UserUncheckedCreateInput>
    /**
     * In case the User was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UserUpdateInput, UserUncheckedUpdateInput>
  }

  /**
   * User delete
   */
  export type UserDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter which User to delete.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User deleteMany
   */
  export type UserDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Users to delete
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to delete.
     */
    limit?: number
  }

  /**
   * User.documents
   */
  export type User$documentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserDocument
     */
    select?: UserDocumentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserDocument
     */
    omit?: UserDocumentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserDocumentInclude<ExtArgs> | null
    where?: UserDocumentWhereInput
    orderBy?: UserDocumentOrderByWithRelationInput | UserDocumentOrderByWithRelationInput[]
    cursor?: UserDocumentWhereUniqueInput
    take?: number
    skip?: number
    distinct?: UserDocumentScalarFieldEnum | UserDocumentScalarFieldEnum[]
  }

  /**
   * User.contacts
   */
  export type User$contactsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Contact
     */
    select?: ContactSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Contact
     */
    omit?: ContactOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ContactInclude<ExtArgs> | null
    where?: ContactWhereInput
    orderBy?: ContactOrderByWithRelationInput | ContactOrderByWithRelationInput[]
    cursor?: ContactWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ContactScalarFieldEnum | ContactScalarFieldEnum[]
  }

  /**
   * User.creditTransactions
   */
  export type User$creditTransactionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CreditTransaction
     */
    select?: CreditTransactionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CreditTransaction
     */
    omit?: CreditTransactionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CreditTransactionInclude<ExtArgs> | null
    where?: CreditTransactionWhereInput
    orderBy?: CreditTransactionOrderByWithRelationInput | CreditTransactionOrderByWithRelationInput[]
    cursor?: CreditTransactionWhereUniqueInput
    take?: number
    skip?: number
    distinct?: CreditTransactionScalarFieldEnum | CreditTransactionScalarFieldEnum[]
  }

  /**
   * User.creditGrants
   */
  export type User$creditGrantsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CreditTransaction
     */
    select?: CreditTransactionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CreditTransaction
     */
    omit?: CreditTransactionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CreditTransactionInclude<ExtArgs> | null
    where?: CreditTransactionWhereInput
    orderBy?: CreditTransactionOrderByWithRelationInput | CreditTransactionOrderByWithRelationInput[]
    cursor?: CreditTransactionWhereUniqueInput
    take?: number
    skip?: number
    distinct?: CreditTransactionScalarFieldEnum | CreditTransactionScalarFieldEnum[]
  }

  /**
   * User without action
   */
  export type UserDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
  }


  /**
   * Model DocumentTemplate
   */

  export type AggregateDocumentTemplate = {
    _count: DocumentTemplateCountAggregateOutputType | null
    _avg: DocumentTemplateAvgAggregateOutputType | null
    _sum: DocumentTemplateSumAggregateOutputType | null
    _min: DocumentTemplateMinAggregateOutputType | null
    _max: DocumentTemplateMaxAggregateOutputType | null
  }

  export type DocumentTemplateAvgAggregateOutputType = {
    price: number | null
    estimatedQuestions: number | null
    estimatedMinutes: number | null
    rating: number | null
    ratingCount: number | null
  }

  export type DocumentTemplateSumAggregateOutputType = {
    price: number | null
    estimatedQuestions: number | null
    estimatedMinutes: number | null
    rating: number | null
    ratingCount: number | null
  }

  export type DocumentTemplateMinAggregateOutputType = {
    id: string | null
    name: string | null
    description: string | null
    category: string | null
    subcategory: string | null
    legalArea: string | null
    audience: string | null
    status: string | null
    price: number | null
    estimatedQuestions: number | null
    estimatedMinutes: number | null
    rating: number | null
    ratingCount: number | null
    thumbnail: string | null
    baseContent: string | null
    headerContent: string | null
    footerContent: string | null
    wizardConfig: string | null
    blurPreview: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type DocumentTemplateMaxAggregateOutputType = {
    id: string | null
    name: string | null
    description: string | null
    category: string | null
    subcategory: string | null
    legalArea: string | null
    audience: string | null
    status: string | null
    price: number | null
    estimatedQuestions: number | null
    estimatedMinutes: number | null
    rating: number | null
    ratingCount: number | null
    thumbnail: string | null
    baseContent: string | null
    headerContent: string | null
    footerContent: string | null
    wizardConfig: string | null
    blurPreview: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type DocumentTemplateCountAggregateOutputType = {
    id: number
    name: number
    description: number
    category: number
    subcategory: number
    legalArea: number
    audience: number
    status: number
    price: number
    estimatedQuestions: number
    estimatedMinutes: number
    rating: number
    ratingCount: number
    thumbnail: number
    baseContent: number
    headerContent: number
    footerContent: number
    wizardConfig: number
    blurPreview: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type DocumentTemplateAvgAggregateInputType = {
    price?: true
    estimatedQuestions?: true
    estimatedMinutes?: true
    rating?: true
    ratingCount?: true
  }

  export type DocumentTemplateSumAggregateInputType = {
    price?: true
    estimatedQuestions?: true
    estimatedMinutes?: true
    rating?: true
    ratingCount?: true
  }

  export type DocumentTemplateMinAggregateInputType = {
    id?: true
    name?: true
    description?: true
    category?: true
    subcategory?: true
    legalArea?: true
    audience?: true
    status?: true
    price?: true
    estimatedQuestions?: true
    estimatedMinutes?: true
    rating?: true
    ratingCount?: true
    thumbnail?: true
    baseContent?: true
    headerContent?: true
    footerContent?: true
    wizardConfig?: true
    blurPreview?: true
    createdAt?: true
    updatedAt?: true
  }

  export type DocumentTemplateMaxAggregateInputType = {
    id?: true
    name?: true
    description?: true
    category?: true
    subcategory?: true
    legalArea?: true
    audience?: true
    status?: true
    price?: true
    estimatedQuestions?: true
    estimatedMinutes?: true
    rating?: true
    ratingCount?: true
    thumbnail?: true
    baseContent?: true
    headerContent?: true
    footerContent?: true
    wizardConfig?: true
    blurPreview?: true
    createdAt?: true
    updatedAt?: true
  }

  export type DocumentTemplateCountAggregateInputType = {
    id?: true
    name?: true
    description?: true
    category?: true
    subcategory?: true
    legalArea?: true
    audience?: true
    status?: true
    price?: true
    estimatedQuestions?: true
    estimatedMinutes?: true
    rating?: true
    ratingCount?: true
    thumbnail?: true
    baseContent?: true
    headerContent?: true
    footerContent?: true
    wizardConfig?: true
    blurPreview?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type DocumentTemplateAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which DocumentTemplate to aggregate.
     */
    where?: DocumentTemplateWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of DocumentTemplates to fetch.
     */
    orderBy?: DocumentTemplateOrderByWithRelationInput | DocumentTemplateOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: DocumentTemplateWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` DocumentTemplates from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` DocumentTemplates.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned DocumentTemplates
    **/
    _count?: true | DocumentTemplateCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: DocumentTemplateAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: DocumentTemplateSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: DocumentTemplateMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: DocumentTemplateMaxAggregateInputType
  }

  export type GetDocumentTemplateAggregateType<T extends DocumentTemplateAggregateArgs> = {
        [P in keyof T & keyof AggregateDocumentTemplate]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateDocumentTemplate[P]>
      : GetScalarType<T[P], AggregateDocumentTemplate[P]>
  }




  export type DocumentTemplateGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: DocumentTemplateWhereInput
    orderBy?: DocumentTemplateOrderByWithAggregationInput | DocumentTemplateOrderByWithAggregationInput[]
    by: DocumentTemplateScalarFieldEnum[] | DocumentTemplateScalarFieldEnum
    having?: DocumentTemplateScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: DocumentTemplateCountAggregateInputType | true
    _avg?: DocumentTemplateAvgAggregateInputType
    _sum?: DocumentTemplateSumAggregateInputType
    _min?: DocumentTemplateMinAggregateInputType
    _max?: DocumentTemplateMaxAggregateInputType
  }

  export type DocumentTemplateGroupByOutputType = {
    id: string
    name: string
    description: string
    category: string
    subcategory: string | null
    legalArea: string
    audience: string
    status: string
    price: number
    estimatedQuestions: number
    estimatedMinutes: number
    rating: number
    ratingCount: number
    thumbnail: string | null
    baseContent: string
    headerContent: string | null
    footerContent: string | null
    wizardConfig: string
    blurPreview: boolean
    createdAt: Date
    updatedAt: Date
    _count: DocumentTemplateCountAggregateOutputType | null
    _avg: DocumentTemplateAvgAggregateOutputType | null
    _sum: DocumentTemplateSumAggregateOutputType | null
    _min: DocumentTemplateMinAggregateOutputType | null
    _max: DocumentTemplateMaxAggregateOutputType | null
  }

  type GetDocumentTemplateGroupByPayload<T extends DocumentTemplateGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<DocumentTemplateGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof DocumentTemplateGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], DocumentTemplateGroupByOutputType[P]>
            : GetScalarType<T[P], DocumentTemplateGroupByOutputType[P]>
        }
      >
    >


  export type DocumentTemplateSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    description?: boolean
    category?: boolean
    subcategory?: boolean
    legalArea?: boolean
    audience?: boolean
    status?: boolean
    price?: boolean
    estimatedQuestions?: boolean
    estimatedMinutes?: boolean
    rating?: boolean
    ratingCount?: boolean
    thumbnail?: boolean
    baseContent?: boolean
    headerContent?: boolean
    footerContent?: boolean
    wizardConfig?: boolean
    blurPreview?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    clauses?: boolean | DocumentTemplate$clausesArgs<ExtArgs>
    normativity?: boolean | DocumentTemplate$normativityArgs<ExtArgs>
    documents?: boolean | DocumentTemplate$documentsArgs<ExtArgs>
    _count?: boolean | DocumentTemplateCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["documentTemplate"]>

  export type DocumentTemplateSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    description?: boolean
    category?: boolean
    subcategory?: boolean
    legalArea?: boolean
    audience?: boolean
    status?: boolean
    price?: boolean
    estimatedQuestions?: boolean
    estimatedMinutes?: boolean
    rating?: boolean
    ratingCount?: boolean
    thumbnail?: boolean
    baseContent?: boolean
    headerContent?: boolean
    footerContent?: boolean
    wizardConfig?: boolean
    blurPreview?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["documentTemplate"]>

  export type DocumentTemplateSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    description?: boolean
    category?: boolean
    subcategory?: boolean
    legalArea?: boolean
    audience?: boolean
    status?: boolean
    price?: boolean
    estimatedQuestions?: boolean
    estimatedMinutes?: boolean
    rating?: boolean
    ratingCount?: boolean
    thumbnail?: boolean
    baseContent?: boolean
    headerContent?: boolean
    footerContent?: boolean
    wizardConfig?: boolean
    blurPreview?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["documentTemplate"]>

  export type DocumentTemplateSelectScalar = {
    id?: boolean
    name?: boolean
    description?: boolean
    category?: boolean
    subcategory?: boolean
    legalArea?: boolean
    audience?: boolean
    status?: boolean
    price?: boolean
    estimatedQuestions?: boolean
    estimatedMinutes?: boolean
    rating?: boolean
    ratingCount?: boolean
    thumbnail?: boolean
    baseContent?: boolean
    headerContent?: boolean
    footerContent?: boolean
    wizardConfig?: boolean
    blurPreview?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type DocumentTemplateOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "description" | "category" | "subcategory" | "legalArea" | "audience" | "status" | "price" | "estimatedQuestions" | "estimatedMinutes" | "rating" | "ratingCount" | "thumbnail" | "baseContent" | "headerContent" | "footerContent" | "wizardConfig" | "blurPreview" | "createdAt" | "updatedAt", ExtArgs["result"]["documentTemplate"]>
  export type DocumentTemplateInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    clauses?: boolean | DocumentTemplate$clausesArgs<ExtArgs>
    normativity?: boolean | DocumentTemplate$normativityArgs<ExtArgs>
    documents?: boolean | DocumentTemplate$documentsArgs<ExtArgs>
    _count?: boolean | DocumentTemplateCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type DocumentTemplateIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type DocumentTemplateIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $DocumentTemplatePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "DocumentTemplate"
    objects: {
      clauses: Prisma.$TemplateClausePayload<ExtArgs>[]
      normativity: Prisma.$TemplateNormativityPayload<ExtArgs>[]
      documents: Prisma.$UserDocumentPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
      description: string
      category: string
      subcategory: string | null
      legalArea: string
      audience: string
      status: string
      price: number
      estimatedQuestions: number
      estimatedMinutes: number
      rating: number
      ratingCount: number
      thumbnail: string | null
      baseContent: string
      headerContent: string | null
      footerContent: string | null
      wizardConfig: string
      blurPreview: boolean
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["documentTemplate"]>
    composites: {}
  }

  type DocumentTemplateGetPayload<S extends boolean | null | undefined | DocumentTemplateDefaultArgs> = $Result.GetResult<Prisma.$DocumentTemplatePayload, S>

  type DocumentTemplateCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<DocumentTemplateFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: DocumentTemplateCountAggregateInputType | true
    }

  export interface DocumentTemplateDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['DocumentTemplate'], meta: { name: 'DocumentTemplate' } }
    /**
     * Find zero or one DocumentTemplate that matches the filter.
     * @param {DocumentTemplateFindUniqueArgs} args - Arguments to find a DocumentTemplate
     * @example
     * // Get one DocumentTemplate
     * const documentTemplate = await prisma.documentTemplate.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends DocumentTemplateFindUniqueArgs>(args: SelectSubset<T, DocumentTemplateFindUniqueArgs<ExtArgs>>): Prisma__DocumentTemplateClient<$Result.GetResult<Prisma.$DocumentTemplatePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one DocumentTemplate that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {DocumentTemplateFindUniqueOrThrowArgs} args - Arguments to find a DocumentTemplate
     * @example
     * // Get one DocumentTemplate
     * const documentTemplate = await prisma.documentTemplate.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends DocumentTemplateFindUniqueOrThrowArgs>(args: SelectSubset<T, DocumentTemplateFindUniqueOrThrowArgs<ExtArgs>>): Prisma__DocumentTemplateClient<$Result.GetResult<Prisma.$DocumentTemplatePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first DocumentTemplate that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DocumentTemplateFindFirstArgs} args - Arguments to find a DocumentTemplate
     * @example
     * // Get one DocumentTemplate
     * const documentTemplate = await prisma.documentTemplate.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends DocumentTemplateFindFirstArgs>(args?: SelectSubset<T, DocumentTemplateFindFirstArgs<ExtArgs>>): Prisma__DocumentTemplateClient<$Result.GetResult<Prisma.$DocumentTemplatePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first DocumentTemplate that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DocumentTemplateFindFirstOrThrowArgs} args - Arguments to find a DocumentTemplate
     * @example
     * // Get one DocumentTemplate
     * const documentTemplate = await prisma.documentTemplate.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends DocumentTemplateFindFirstOrThrowArgs>(args?: SelectSubset<T, DocumentTemplateFindFirstOrThrowArgs<ExtArgs>>): Prisma__DocumentTemplateClient<$Result.GetResult<Prisma.$DocumentTemplatePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more DocumentTemplates that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DocumentTemplateFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all DocumentTemplates
     * const documentTemplates = await prisma.documentTemplate.findMany()
     * 
     * // Get first 10 DocumentTemplates
     * const documentTemplates = await prisma.documentTemplate.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const documentTemplateWithIdOnly = await prisma.documentTemplate.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends DocumentTemplateFindManyArgs>(args?: SelectSubset<T, DocumentTemplateFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DocumentTemplatePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a DocumentTemplate.
     * @param {DocumentTemplateCreateArgs} args - Arguments to create a DocumentTemplate.
     * @example
     * // Create one DocumentTemplate
     * const DocumentTemplate = await prisma.documentTemplate.create({
     *   data: {
     *     // ... data to create a DocumentTemplate
     *   }
     * })
     * 
     */
    create<T extends DocumentTemplateCreateArgs>(args: SelectSubset<T, DocumentTemplateCreateArgs<ExtArgs>>): Prisma__DocumentTemplateClient<$Result.GetResult<Prisma.$DocumentTemplatePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many DocumentTemplates.
     * @param {DocumentTemplateCreateManyArgs} args - Arguments to create many DocumentTemplates.
     * @example
     * // Create many DocumentTemplates
     * const documentTemplate = await prisma.documentTemplate.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends DocumentTemplateCreateManyArgs>(args?: SelectSubset<T, DocumentTemplateCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many DocumentTemplates and returns the data saved in the database.
     * @param {DocumentTemplateCreateManyAndReturnArgs} args - Arguments to create many DocumentTemplates.
     * @example
     * // Create many DocumentTemplates
     * const documentTemplate = await prisma.documentTemplate.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many DocumentTemplates and only return the `id`
     * const documentTemplateWithIdOnly = await prisma.documentTemplate.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends DocumentTemplateCreateManyAndReturnArgs>(args?: SelectSubset<T, DocumentTemplateCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DocumentTemplatePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a DocumentTemplate.
     * @param {DocumentTemplateDeleteArgs} args - Arguments to delete one DocumentTemplate.
     * @example
     * // Delete one DocumentTemplate
     * const DocumentTemplate = await prisma.documentTemplate.delete({
     *   where: {
     *     // ... filter to delete one DocumentTemplate
     *   }
     * })
     * 
     */
    delete<T extends DocumentTemplateDeleteArgs>(args: SelectSubset<T, DocumentTemplateDeleteArgs<ExtArgs>>): Prisma__DocumentTemplateClient<$Result.GetResult<Prisma.$DocumentTemplatePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one DocumentTemplate.
     * @param {DocumentTemplateUpdateArgs} args - Arguments to update one DocumentTemplate.
     * @example
     * // Update one DocumentTemplate
     * const documentTemplate = await prisma.documentTemplate.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends DocumentTemplateUpdateArgs>(args: SelectSubset<T, DocumentTemplateUpdateArgs<ExtArgs>>): Prisma__DocumentTemplateClient<$Result.GetResult<Prisma.$DocumentTemplatePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more DocumentTemplates.
     * @param {DocumentTemplateDeleteManyArgs} args - Arguments to filter DocumentTemplates to delete.
     * @example
     * // Delete a few DocumentTemplates
     * const { count } = await prisma.documentTemplate.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends DocumentTemplateDeleteManyArgs>(args?: SelectSubset<T, DocumentTemplateDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more DocumentTemplates.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DocumentTemplateUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many DocumentTemplates
     * const documentTemplate = await prisma.documentTemplate.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends DocumentTemplateUpdateManyArgs>(args: SelectSubset<T, DocumentTemplateUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more DocumentTemplates and returns the data updated in the database.
     * @param {DocumentTemplateUpdateManyAndReturnArgs} args - Arguments to update many DocumentTemplates.
     * @example
     * // Update many DocumentTemplates
     * const documentTemplate = await prisma.documentTemplate.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more DocumentTemplates and only return the `id`
     * const documentTemplateWithIdOnly = await prisma.documentTemplate.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends DocumentTemplateUpdateManyAndReturnArgs>(args: SelectSubset<T, DocumentTemplateUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DocumentTemplatePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one DocumentTemplate.
     * @param {DocumentTemplateUpsertArgs} args - Arguments to update or create a DocumentTemplate.
     * @example
     * // Update or create a DocumentTemplate
     * const documentTemplate = await prisma.documentTemplate.upsert({
     *   create: {
     *     // ... data to create a DocumentTemplate
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the DocumentTemplate we want to update
     *   }
     * })
     */
    upsert<T extends DocumentTemplateUpsertArgs>(args: SelectSubset<T, DocumentTemplateUpsertArgs<ExtArgs>>): Prisma__DocumentTemplateClient<$Result.GetResult<Prisma.$DocumentTemplatePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of DocumentTemplates.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DocumentTemplateCountArgs} args - Arguments to filter DocumentTemplates to count.
     * @example
     * // Count the number of DocumentTemplates
     * const count = await prisma.documentTemplate.count({
     *   where: {
     *     // ... the filter for the DocumentTemplates we want to count
     *   }
     * })
    **/
    count<T extends DocumentTemplateCountArgs>(
      args?: Subset<T, DocumentTemplateCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], DocumentTemplateCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a DocumentTemplate.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DocumentTemplateAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends DocumentTemplateAggregateArgs>(args: Subset<T, DocumentTemplateAggregateArgs>): Prisma.PrismaPromise<GetDocumentTemplateAggregateType<T>>

    /**
     * Group by DocumentTemplate.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DocumentTemplateGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends DocumentTemplateGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: DocumentTemplateGroupByArgs['orderBy'] }
        : { orderBy?: DocumentTemplateGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, DocumentTemplateGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetDocumentTemplateGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the DocumentTemplate model
   */
  readonly fields: DocumentTemplateFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for DocumentTemplate.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__DocumentTemplateClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    clauses<T extends DocumentTemplate$clausesArgs<ExtArgs> = {}>(args?: Subset<T, DocumentTemplate$clausesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TemplateClausePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    normativity<T extends DocumentTemplate$normativityArgs<ExtArgs> = {}>(args?: Subset<T, DocumentTemplate$normativityArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TemplateNormativityPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    documents<T extends DocumentTemplate$documentsArgs<ExtArgs> = {}>(args?: Subset<T, DocumentTemplate$documentsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserDocumentPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the DocumentTemplate model
   */
  interface DocumentTemplateFieldRefs {
    readonly id: FieldRef<"DocumentTemplate", 'String'>
    readonly name: FieldRef<"DocumentTemplate", 'String'>
    readonly description: FieldRef<"DocumentTemplate", 'String'>
    readonly category: FieldRef<"DocumentTemplate", 'String'>
    readonly subcategory: FieldRef<"DocumentTemplate", 'String'>
    readonly legalArea: FieldRef<"DocumentTemplate", 'String'>
    readonly audience: FieldRef<"DocumentTemplate", 'String'>
    readonly status: FieldRef<"DocumentTemplate", 'String'>
    readonly price: FieldRef<"DocumentTemplate", 'Float'>
    readonly estimatedQuestions: FieldRef<"DocumentTemplate", 'Int'>
    readonly estimatedMinutes: FieldRef<"DocumentTemplate", 'Int'>
    readonly rating: FieldRef<"DocumentTemplate", 'Float'>
    readonly ratingCount: FieldRef<"DocumentTemplate", 'Int'>
    readonly thumbnail: FieldRef<"DocumentTemplate", 'String'>
    readonly baseContent: FieldRef<"DocumentTemplate", 'String'>
    readonly headerContent: FieldRef<"DocumentTemplate", 'String'>
    readonly footerContent: FieldRef<"DocumentTemplate", 'String'>
    readonly wizardConfig: FieldRef<"DocumentTemplate", 'String'>
    readonly blurPreview: FieldRef<"DocumentTemplate", 'Boolean'>
    readonly createdAt: FieldRef<"DocumentTemplate", 'DateTime'>
    readonly updatedAt: FieldRef<"DocumentTemplate", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * DocumentTemplate findUnique
   */
  export type DocumentTemplateFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DocumentTemplate
     */
    select?: DocumentTemplateSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DocumentTemplate
     */
    omit?: DocumentTemplateOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DocumentTemplateInclude<ExtArgs> | null
    /**
     * Filter, which DocumentTemplate to fetch.
     */
    where: DocumentTemplateWhereUniqueInput
  }

  /**
   * DocumentTemplate findUniqueOrThrow
   */
  export type DocumentTemplateFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DocumentTemplate
     */
    select?: DocumentTemplateSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DocumentTemplate
     */
    omit?: DocumentTemplateOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DocumentTemplateInclude<ExtArgs> | null
    /**
     * Filter, which DocumentTemplate to fetch.
     */
    where: DocumentTemplateWhereUniqueInput
  }

  /**
   * DocumentTemplate findFirst
   */
  export type DocumentTemplateFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DocumentTemplate
     */
    select?: DocumentTemplateSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DocumentTemplate
     */
    omit?: DocumentTemplateOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DocumentTemplateInclude<ExtArgs> | null
    /**
     * Filter, which DocumentTemplate to fetch.
     */
    where?: DocumentTemplateWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of DocumentTemplates to fetch.
     */
    orderBy?: DocumentTemplateOrderByWithRelationInput | DocumentTemplateOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for DocumentTemplates.
     */
    cursor?: DocumentTemplateWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` DocumentTemplates from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` DocumentTemplates.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of DocumentTemplates.
     */
    distinct?: DocumentTemplateScalarFieldEnum | DocumentTemplateScalarFieldEnum[]
  }

  /**
   * DocumentTemplate findFirstOrThrow
   */
  export type DocumentTemplateFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DocumentTemplate
     */
    select?: DocumentTemplateSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DocumentTemplate
     */
    omit?: DocumentTemplateOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DocumentTemplateInclude<ExtArgs> | null
    /**
     * Filter, which DocumentTemplate to fetch.
     */
    where?: DocumentTemplateWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of DocumentTemplates to fetch.
     */
    orderBy?: DocumentTemplateOrderByWithRelationInput | DocumentTemplateOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for DocumentTemplates.
     */
    cursor?: DocumentTemplateWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` DocumentTemplates from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` DocumentTemplates.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of DocumentTemplates.
     */
    distinct?: DocumentTemplateScalarFieldEnum | DocumentTemplateScalarFieldEnum[]
  }

  /**
   * DocumentTemplate findMany
   */
  export type DocumentTemplateFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DocumentTemplate
     */
    select?: DocumentTemplateSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DocumentTemplate
     */
    omit?: DocumentTemplateOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DocumentTemplateInclude<ExtArgs> | null
    /**
     * Filter, which DocumentTemplates to fetch.
     */
    where?: DocumentTemplateWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of DocumentTemplates to fetch.
     */
    orderBy?: DocumentTemplateOrderByWithRelationInput | DocumentTemplateOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing DocumentTemplates.
     */
    cursor?: DocumentTemplateWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` DocumentTemplates from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` DocumentTemplates.
     */
    skip?: number
    distinct?: DocumentTemplateScalarFieldEnum | DocumentTemplateScalarFieldEnum[]
  }

  /**
   * DocumentTemplate create
   */
  export type DocumentTemplateCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DocumentTemplate
     */
    select?: DocumentTemplateSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DocumentTemplate
     */
    omit?: DocumentTemplateOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DocumentTemplateInclude<ExtArgs> | null
    /**
     * The data needed to create a DocumentTemplate.
     */
    data: XOR<DocumentTemplateCreateInput, DocumentTemplateUncheckedCreateInput>
  }

  /**
   * DocumentTemplate createMany
   */
  export type DocumentTemplateCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many DocumentTemplates.
     */
    data: DocumentTemplateCreateManyInput | DocumentTemplateCreateManyInput[]
  }

  /**
   * DocumentTemplate createManyAndReturn
   */
  export type DocumentTemplateCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DocumentTemplate
     */
    select?: DocumentTemplateSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the DocumentTemplate
     */
    omit?: DocumentTemplateOmit<ExtArgs> | null
    /**
     * The data used to create many DocumentTemplates.
     */
    data: DocumentTemplateCreateManyInput | DocumentTemplateCreateManyInput[]
  }

  /**
   * DocumentTemplate update
   */
  export type DocumentTemplateUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DocumentTemplate
     */
    select?: DocumentTemplateSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DocumentTemplate
     */
    omit?: DocumentTemplateOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DocumentTemplateInclude<ExtArgs> | null
    /**
     * The data needed to update a DocumentTemplate.
     */
    data: XOR<DocumentTemplateUpdateInput, DocumentTemplateUncheckedUpdateInput>
    /**
     * Choose, which DocumentTemplate to update.
     */
    where: DocumentTemplateWhereUniqueInput
  }

  /**
   * DocumentTemplate updateMany
   */
  export type DocumentTemplateUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update DocumentTemplates.
     */
    data: XOR<DocumentTemplateUpdateManyMutationInput, DocumentTemplateUncheckedUpdateManyInput>
    /**
     * Filter which DocumentTemplates to update
     */
    where?: DocumentTemplateWhereInput
    /**
     * Limit how many DocumentTemplates to update.
     */
    limit?: number
  }

  /**
   * DocumentTemplate updateManyAndReturn
   */
  export type DocumentTemplateUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DocumentTemplate
     */
    select?: DocumentTemplateSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the DocumentTemplate
     */
    omit?: DocumentTemplateOmit<ExtArgs> | null
    /**
     * The data used to update DocumentTemplates.
     */
    data: XOR<DocumentTemplateUpdateManyMutationInput, DocumentTemplateUncheckedUpdateManyInput>
    /**
     * Filter which DocumentTemplates to update
     */
    where?: DocumentTemplateWhereInput
    /**
     * Limit how many DocumentTemplates to update.
     */
    limit?: number
  }

  /**
   * DocumentTemplate upsert
   */
  export type DocumentTemplateUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DocumentTemplate
     */
    select?: DocumentTemplateSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DocumentTemplate
     */
    omit?: DocumentTemplateOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DocumentTemplateInclude<ExtArgs> | null
    /**
     * The filter to search for the DocumentTemplate to update in case it exists.
     */
    where: DocumentTemplateWhereUniqueInput
    /**
     * In case the DocumentTemplate found by the `where` argument doesn't exist, create a new DocumentTemplate with this data.
     */
    create: XOR<DocumentTemplateCreateInput, DocumentTemplateUncheckedCreateInput>
    /**
     * In case the DocumentTemplate was found with the provided `where` argument, update it with this data.
     */
    update: XOR<DocumentTemplateUpdateInput, DocumentTemplateUncheckedUpdateInput>
  }

  /**
   * DocumentTemplate delete
   */
  export type DocumentTemplateDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DocumentTemplate
     */
    select?: DocumentTemplateSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DocumentTemplate
     */
    omit?: DocumentTemplateOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DocumentTemplateInclude<ExtArgs> | null
    /**
     * Filter which DocumentTemplate to delete.
     */
    where: DocumentTemplateWhereUniqueInput
  }

  /**
   * DocumentTemplate deleteMany
   */
  export type DocumentTemplateDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which DocumentTemplates to delete
     */
    where?: DocumentTemplateWhereInput
    /**
     * Limit how many DocumentTemplates to delete.
     */
    limit?: number
  }

  /**
   * DocumentTemplate.clauses
   */
  export type DocumentTemplate$clausesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TemplateClause
     */
    select?: TemplateClauseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TemplateClause
     */
    omit?: TemplateClauseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TemplateClauseInclude<ExtArgs> | null
    where?: TemplateClauseWhereInput
    orderBy?: TemplateClauseOrderByWithRelationInput | TemplateClauseOrderByWithRelationInput[]
    cursor?: TemplateClauseWhereUniqueInput
    take?: number
    skip?: number
    distinct?: TemplateClauseScalarFieldEnum | TemplateClauseScalarFieldEnum[]
  }

  /**
   * DocumentTemplate.normativity
   */
  export type DocumentTemplate$normativityArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TemplateNormativity
     */
    select?: TemplateNormativitySelect<ExtArgs> | null
    /**
     * Omit specific fields from the TemplateNormativity
     */
    omit?: TemplateNormativityOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TemplateNormativityInclude<ExtArgs> | null
    where?: TemplateNormativityWhereInput
    orderBy?: TemplateNormativityOrderByWithRelationInput | TemplateNormativityOrderByWithRelationInput[]
    cursor?: TemplateNormativityWhereUniqueInput
    take?: number
    skip?: number
    distinct?: TemplateNormativityScalarFieldEnum | TemplateNormativityScalarFieldEnum[]
  }

  /**
   * DocumentTemplate.documents
   */
  export type DocumentTemplate$documentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserDocument
     */
    select?: UserDocumentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserDocument
     */
    omit?: UserDocumentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserDocumentInclude<ExtArgs> | null
    where?: UserDocumentWhereInput
    orderBy?: UserDocumentOrderByWithRelationInput | UserDocumentOrderByWithRelationInput[]
    cursor?: UserDocumentWhereUniqueInput
    take?: number
    skip?: number
    distinct?: UserDocumentScalarFieldEnum | UserDocumentScalarFieldEnum[]
  }

  /**
   * DocumentTemplate without action
   */
  export type DocumentTemplateDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DocumentTemplate
     */
    select?: DocumentTemplateSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DocumentTemplate
     */
    omit?: DocumentTemplateOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DocumentTemplateInclude<ExtArgs> | null
  }


  /**
   * Model Clause
   */

  export type AggregateClause = {
    _count: ClauseCountAggregateOutputType | null
    _min: ClauseMinAggregateOutputType | null
    _max: ClauseMaxAggregateOutputType | null
  }

  export type ClauseMinAggregateOutputType = {
    id: string | null
    title: string | null
    content: string | null
    legalArea: string | null
    category: string | null
    isDefault: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ClauseMaxAggregateOutputType = {
    id: string | null
    title: string | null
    content: string | null
    legalArea: string | null
    category: string | null
    isDefault: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ClauseCountAggregateOutputType = {
    id: number
    title: number
    content: number
    legalArea: number
    category: number
    isDefault: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type ClauseMinAggregateInputType = {
    id?: true
    title?: true
    content?: true
    legalArea?: true
    category?: true
    isDefault?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ClauseMaxAggregateInputType = {
    id?: true
    title?: true
    content?: true
    legalArea?: true
    category?: true
    isDefault?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ClauseCountAggregateInputType = {
    id?: true
    title?: true
    content?: true
    legalArea?: true
    category?: true
    isDefault?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type ClauseAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Clause to aggregate.
     */
    where?: ClauseWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Clauses to fetch.
     */
    orderBy?: ClauseOrderByWithRelationInput | ClauseOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ClauseWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Clauses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Clauses.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Clauses
    **/
    _count?: true | ClauseCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ClauseMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ClauseMaxAggregateInputType
  }

  export type GetClauseAggregateType<T extends ClauseAggregateArgs> = {
        [P in keyof T & keyof AggregateClause]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateClause[P]>
      : GetScalarType<T[P], AggregateClause[P]>
  }




  export type ClauseGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ClauseWhereInput
    orderBy?: ClauseOrderByWithAggregationInput | ClauseOrderByWithAggregationInput[]
    by: ClauseScalarFieldEnum[] | ClauseScalarFieldEnum
    having?: ClauseScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ClauseCountAggregateInputType | true
    _min?: ClauseMinAggregateInputType
    _max?: ClauseMaxAggregateInputType
  }

  export type ClauseGroupByOutputType = {
    id: string
    title: string
    content: string
    legalArea: string | null
    category: string | null
    isDefault: boolean
    createdAt: Date
    updatedAt: Date
    _count: ClauseCountAggregateOutputType | null
    _min: ClauseMinAggregateOutputType | null
    _max: ClauseMaxAggregateOutputType | null
  }

  type GetClauseGroupByPayload<T extends ClauseGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ClauseGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ClauseGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ClauseGroupByOutputType[P]>
            : GetScalarType<T[P], ClauseGroupByOutputType[P]>
        }
      >
    >


  export type ClauseSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    content?: boolean
    legalArea?: boolean
    category?: boolean
    isDefault?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    templates?: boolean | Clause$templatesArgs<ExtArgs>
    _count?: boolean | ClauseCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["clause"]>

  export type ClauseSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    content?: boolean
    legalArea?: boolean
    category?: boolean
    isDefault?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["clause"]>

  export type ClauseSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    content?: boolean
    legalArea?: boolean
    category?: boolean
    isDefault?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["clause"]>

  export type ClauseSelectScalar = {
    id?: boolean
    title?: boolean
    content?: boolean
    legalArea?: boolean
    category?: boolean
    isDefault?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type ClauseOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "title" | "content" | "legalArea" | "category" | "isDefault" | "createdAt" | "updatedAt", ExtArgs["result"]["clause"]>
  export type ClauseInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    templates?: boolean | Clause$templatesArgs<ExtArgs>
    _count?: boolean | ClauseCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type ClauseIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type ClauseIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $ClausePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Clause"
    objects: {
      templates: Prisma.$TemplateClausePayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      title: string
      content: string
      legalArea: string | null
      category: string | null
      isDefault: boolean
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["clause"]>
    composites: {}
  }

  type ClauseGetPayload<S extends boolean | null | undefined | ClauseDefaultArgs> = $Result.GetResult<Prisma.$ClausePayload, S>

  type ClauseCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ClauseFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ClauseCountAggregateInputType | true
    }

  export interface ClauseDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Clause'], meta: { name: 'Clause' } }
    /**
     * Find zero or one Clause that matches the filter.
     * @param {ClauseFindUniqueArgs} args - Arguments to find a Clause
     * @example
     * // Get one Clause
     * const clause = await prisma.clause.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ClauseFindUniqueArgs>(args: SelectSubset<T, ClauseFindUniqueArgs<ExtArgs>>): Prisma__ClauseClient<$Result.GetResult<Prisma.$ClausePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Clause that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ClauseFindUniqueOrThrowArgs} args - Arguments to find a Clause
     * @example
     * // Get one Clause
     * const clause = await prisma.clause.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ClauseFindUniqueOrThrowArgs>(args: SelectSubset<T, ClauseFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ClauseClient<$Result.GetResult<Prisma.$ClausePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Clause that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ClauseFindFirstArgs} args - Arguments to find a Clause
     * @example
     * // Get one Clause
     * const clause = await prisma.clause.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ClauseFindFirstArgs>(args?: SelectSubset<T, ClauseFindFirstArgs<ExtArgs>>): Prisma__ClauseClient<$Result.GetResult<Prisma.$ClausePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Clause that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ClauseFindFirstOrThrowArgs} args - Arguments to find a Clause
     * @example
     * // Get one Clause
     * const clause = await prisma.clause.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ClauseFindFirstOrThrowArgs>(args?: SelectSubset<T, ClauseFindFirstOrThrowArgs<ExtArgs>>): Prisma__ClauseClient<$Result.GetResult<Prisma.$ClausePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Clauses that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ClauseFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Clauses
     * const clauses = await prisma.clause.findMany()
     * 
     * // Get first 10 Clauses
     * const clauses = await prisma.clause.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const clauseWithIdOnly = await prisma.clause.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ClauseFindManyArgs>(args?: SelectSubset<T, ClauseFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ClausePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Clause.
     * @param {ClauseCreateArgs} args - Arguments to create a Clause.
     * @example
     * // Create one Clause
     * const Clause = await prisma.clause.create({
     *   data: {
     *     // ... data to create a Clause
     *   }
     * })
     * 
     */
    create<T extends ClauseCreateArgs>(args: SelectSubset<T, ClauseCreateArgs<ExtArgs>>): Prisma__ClauseClient<$Result.GetResult<Prisma.$ClausePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Clauses.
     * @param {ClauseCreateManyArgs} args - Arguments to create many Clauses.
     * @example
     * // Create many Clauses
     * const clause = await prisma.clause.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ClauseCreateManyArgs>(args?: SelectSubset<T, ClauseCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Clauses and returns the data saved in the database.
     * @param {ClauseCreateManyAndReturnArgs} args - Arguments to create many Clauses.
     * @example
     * // Create many Clauses
     * const clause = await prisma.clause.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Clauses and only return the `id`
     * const clauseWithIdOnly = await prisma.clause.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ClauseCreateManyAndReturnArgs>(args?: SelectSubset<T, ClauseCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ClausePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Clause.
     * @param {ClauseDeleteArgs} args - Arguments to delete one Clause.
     * @example
     * // Delete one Clause
     * const Clause = await prisma.clause.delete({
     *   where: {
     *     // ... filter to delete one Clause
     *   }
     * })
     * 
     */
    delete<T extends ClauseDeleteArgs>(args: SelectSubset<T, ClauseDeleteArgs<ExtArgs>>): Prisma__ClauseClient<$Result.GetResult<Prisma.$ClausePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Clause.
     * @param {ClauseUpdateArgs} args - Arguments to update one Clause.
     * @example
     * // Update one Clause
     * const clause = await prisma.clause.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ClauseUpdateArgs>(args: SelectSubset<T, ClauseUpdateArgs<ExtArgs>>): Prisma__ClauseClient<$Result.GetResult<Prisma.$ClausePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Clauses.
     * @param {ClauseDeleteManyArgs} args - Arguments to filter Clauses to delete.
     * @example
     * // Delete a few Clauses
     * const { count } = await prisma.clause.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ClauseDeleteManyArgs>(args?: SelectSubset<T, ClauseDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Clauses.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ClauseUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Clauses
     * const clause = await prisma.clause.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ClauseUpdateManyArgs>(args: SelectSubset<T, ClauseUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Clauses and returns the data updated in the database.
     * @param {ClauseUpdateManyAndReturnArgs} args - Arguments to update many Clauses.
     * @example
     * // Update many Clauses
     * const clause = await prisma.clause.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Clauses and only return the `id`
     * const clauseWithIdOnly = await prisma.clause.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends ClauseUpdateManyAndReturnArgs>(args: SelectSubset<T, ClauseUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ClausePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Clause.
     * @param {ClauseUpsertArgs} args - Arguments to update or create a Clause.
     * @example
     * // Update or create a Clause
     * const clause = await prisma.clause.upsert({
     *   create: {
     *     // ... data to create a Clause
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Clause we want to update
     *   }
     * })
     */
    upsert<T extends ClauseUpsertArgs>(args: SelectSubset<T, ClauseUpsertArgs<ExtArgs>>): Prisma__ClauseClient<$Result.GetResult<Prisma.$ClausePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Clauses.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ClauseCountArgs} args - Arguments to filter Clauses to count.
     * @example
     * // Count the number of Clauses
     * const count = await prisma.clause.count({
     *   where: {
     *     // ... the filter for the Clauses we want to count
     *   }
     * })
    **/
    count<T extends ClauseCountArgs>(
      args?: Subset<T, ClauseCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ClauseCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Clause.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ClauseAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ClauseAggregateArgs>(args: Subset<T, ClauseAggregateArgs>): Prisma.PrismaPromise<GetClauseAggregateType<T>>

    /**
     * Group by Clause.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ClauseGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ClauseGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ClauseGroupByArgs['orderBy'] }
        : { orderBy?: ClauseGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ClauseGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetClauseGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Clause model
   */
  readonly fields: ClauseFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Clause.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ClauseClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    templates<T extends Clause$templatesArgs<ExtArgs> = {}>(args?: Subset<T, Clause$templatesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TemplateClausePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Clause model
   */
  interface ClauseFieldRefs {
    readonly id: FieldRef<"Clause", 'String'>
    readonly title: FieldRef<"Clause", 'String'>
    readonly content: FieldRef<"Clause", 'String'>
    readonly legalArea: FieldRef<"Clause", 'String'>
    readonly category: FieldRef<"Clause", 'String'>
    readonly isDefault: FieldRef<"Clause", 'Boolean'>
    readonly createdAt: FieldRef<"Clause", 'DateTime'>
    readonly updatedAt: FieldRef<"Clause", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Clause findUnique
   */
  export type ClauseFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Clause
     */
    select?: ClauseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Clause
     */
    omit?: ClauseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClauseInclude<ExtArgs> | null
    /**
     * Filter, which Clause to fetch.
     */
    where: ClauseWhereUniqueInput
  }

  /**
   * Clause findUniqueOrThrow
   */
  export type ClauseFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Clause
     */
    select?: ClauseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Clause
     */
    omit?: ClauseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClauseInclude<ExtArgs> | null
    /**
     * Filter, which Clause to fetch.
     */
    where: ClauseWhereUniqueInput
  }

  /**
   * Clause findFirst
   */
  export type ClauseFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Clause
     */
    select?: ClauseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Clause
     */
    omit?: ClauseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClauseInclude<ExtArgs> | null
    /**
     * Filter, which Clause to fetch.
     */
    where?: ClauseWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Clauses to fetch.
     */
    orderBy?: ClauseOrderByWithRelationInput | ClauseOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Clauses.
     */
    cursor?: ClauseWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Clauses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Clauses.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Clauses.
     */
    distinct?: ClauseScalarFieldEnum | ClauseScalarFieldEnum[]
  }

  /**
   * Clause findFirstOrThrow
   */
  export type ClauseFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Clause
     */
    select?: ClauseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Clause
     */
    omit?: ClauseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClauseInclude<ExtArgs> | null
    /**
     * Filter, which Clause to fetch.
     */
    where?: ClauseWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Clauses to fetch.
     */
    orderBy?: ClauseOrderByWithRelationInput | ClauseOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Clauses.
     */
    cursor?: ClauseWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Clauses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Clauses.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Clauses.
     */
    distinct?: ClauseScalarFieldEnum | ClauseScalarFieldEnum[]
  }

  /**
   * Clause findMany
   */
  export type ClauseFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Clause
     */
    select?: ClauseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Clause
     */
    omit?: ClauseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClauseInclude<ExtArgs> | null
    /**
     * Filter, which Clauses to fetch.
     */
    where?: ClauseWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Clauses to fetch.
     */
    orderBy?: ClauseOrderByWithRelationInput | ClauseOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Clauses.
     */
    cursor?: ClauseWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Clauses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Clauses.
     */
    skip?: number
    distinct?: ClauseScalarFieldEnum | ClauseScalarFieldEnum[]
  }

  /**
   * Clause create
   */
  export type ClauseCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Clause
     */
    select?: ClauseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Clause
     */
    omit?: ClauseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClauseInclude<ExtArgs> | null
    /**
     * The data needed to create a Clause.
     */
    data: XOR<ClauseCreateInput, ClauseUncheckedCreateInput>
  }

  /**
   * Clause createMany
   */
  export type ClauseCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Clauses.
     */
    data: ClauseCreateManyInput | ClauseCreateManyInput[]
  }

  /**
   * Clause createManyAndReturn
   */
  export type ClauseCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Clause
     */
    select?: ClauseSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Clause
     */
    omit?: ClauseOmit<ExtArgs> | null
    /**
     * The data used to create many Clauses.
     */
    data: ClauseCreateManyInput | ClauseCreateManyInput[]
  }

  /**
   * Clause update
   */
  export type ClauseUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Clause
     */
    select?: ClauseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Clause
     */
    omit?: ClauseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClauseInclude<ExtArgs> | null
    /**
     * The data needed to update a Clause.
     */
    data: XOR<ClauseUpdateInput, ClauseUncheckedUpdateInput>
    /**
     * Choose, which Clause to update.
     */
    where: ClauseWhereUniqueInput
  }

  /**
   * Clause updateMany
   */
  export type ClauseUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Clauses.
     */
    data: XOR<ClauseUpdateManyMutationInput, ClauseUncheckedUpdateManyInput>
    /**
     * Filter which Clauses to update
     */
    where?: ClauseWhereInput
    /**
     * Limit how many Clauses to update.
     */
    limit?: number
  }

  /**
   * Clause updateManyAndReturn
   */
  export type ClauseUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Clause
     */
    select?: ClauseSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Clause
     */
    omit?: ClauseOmit<ExtArgs> | null
    /**
     * The data used to update Clauses.
     */
    data: XOR<ClauseUpdateManyMutationInput, ClauseUncheckedUpdateManyInput>
    /**
     * Filter which Clauses to update
     */
    where?: ClauseWhereInput
    /**
     * Limit how many Clauses to update.
     */
    limit?: number
  }

  /**
   * Clause upsert
   */
  export type ClauseUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Clause
     */
    select?: ClauseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Clause
     */
    omit?: ClauseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClauseInclude<ExtArgs> | null
    /**
     * The filter to search for the Clause to update in case it exists.
     */
    where: ClauseWhereUniqueInput
    /**
     * In case the Clause found by the `where` argument doesn't exist, create a new Clause with this data.
     */
    create: XOR<ClauseCreateInput, ClauseUncheckedCreateInput>
    /**
     * In case the Clause was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ClauseUpdateInput, ClauseUncheckedUpdateInput>
  }

  /**
   * Clause delete
   */
  export type ClauseDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Clause
     */
    select?: ClauseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Clause
     */
    omit?: ClauseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClauseInclude<ExtArgs> | null
    /**
     * Filter which Clause to delete.
     */
    where: ClauseWhereUniqueInput
  }

  /**
   * Clause deleteMany
   */
  export type ClauseDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Clauses to delete
     */
    where?: ClauseWhereInput
    /**
     * Limit how many Clauses to delete.
     */
    limit?: number
  }

  /**
   * Clause.templates
   */
  export type Clause$templatesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TemplateClause
     */
    select?: TemplateClauseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TemplateClause
     */
    omit?: TemplateClauseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TemplateClauseInclude<ExtArgs> | null
    where?: TemplateClauseWhereInput
    orderBy?: TemplateClauseOrderByWithRelationInput | TemplateClauseOrderByWithRelationInput[]
    cursor?: TemplateClauseWhereUniqueInput
    take?: number
    skip?: number
    distinct?: TemplateClauseScalarFieldEnum | TemplateClauseScalarFieldEnum[]
  }

  /**
   * Clause without action
   */
  export type ClauseDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Clause
     */
    select?: ClauseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Clause
     */
    omit?: ClauseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClauseInclude<ExtArgs> | null
  }


  /**
   * Model TemplateClause
   */

  export type AggregateTemplateClause = {
    _count: TemplateClauseCountAggregateOutputType | null
    _avg: TemplateClauseAvgAggregateOutputType | null
    _sum: TemplateClauseSumAggregateOutputType | null
    _min: TemplateClauseMinAggregateOutputType | null
    _max: TemplateClauseMaxAggregateOutputType | null
  }

  export type TemplateClauseAvgAggregateOutputType = {
    order: number | null
  }

  export type TemplateClauseSumAggregateOutputType = {
    order: number | null
  }

  export type TemplateClauseMinAggregateOutputType = {
    id: string | null
    templateId: string | null
    clauseId: string | null
    sectionName: string | null
    order: number | null
  }

  export type TemplateClauseMaxAggregateOutputType = {
    id: string | null
    templateId: string | null
    clauseId: string | null
    sectionName: string | null
    order: number | null
  }

  export type TemplateClauseCountAggregateOutputType = {
    id: number
    templateId: number
    clauseId: number
    sectionName: number
    order: number
    _all: number
  }


  export type TemplateClauseAvgAggregateInputType = {
    order?: true
  }

  export type TemplateClauseSumAggregateInputType = {
    order?: true
  }

  export type TemplateClauseMinAggregateInputType = {
    id?: true
    templateId?: true
    clauseId?: true
    sectionName?: true
    order?: true
  }

  export type TemplateClauseMaxAggregateInputType = {
    id?: true
    templateId?: true
    clauseId?: true
    sectionName?: true
    order?: true
  }

  export type TemplateClauseCountAggregateInputType = {
    id?: true
    templateId?: true
    clauseId?: true
    sectionName?: true
    order?: true
    _all?: true
  }

  export type TemplateClauseAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which TemplateClause to aggregate.
     */
    where?: TemplateClauseWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TemplateClauses to fetch.
     */
    orderBy?: TemplateClauseOrderByWithRelationInput | TemplateClauseOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: TemplateClauseWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TemplateClauses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TemplateClauses.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned TemplateClauses
    **/
    _count?: true | TemplateClauseCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: TemplateClauseAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: TemplateClauseSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: TemplateClauseMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: TemplateClauseMaxAggregateInputType
  }

  export type GetTemplateClauseAggregateType<T extends TemplateClauseAggregateArgs> = {
        [P in keyof T & keyof AggregateTemplateClause]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateTemplateClause[P]>
      : GetScalarType<T[P], AggregateTemplateClause[P]>
  }




  export type TemplateClauseGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TemplateClauseWhereInput
    orderBy?: TemplateClauseOrderByWithAggregationInput | TemplateClauseOrderByWithAggregationInput[]
    by: TemplateClauseScalarFieldEnum[] | TemplateClauseScalarFieldEnum
    having?: TemplateClauseScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: TemplateClauseCountAggregateInputType | true
    _avg?: TemplateClauseAvgAggregateInputType
    _sum?: TemplateClauseSumAggregateInputType
    _min?: TemplateClauseMinAggregateInputType
    _max?: TemplateClauseMaxAggregateInputType
  }

  export type TemplateClauseGroupByOutputType = {
    id: string
    templateId: string
    clauseId: string
    sectionName: string | null
    order: number
    _count: TemplateClauseCountAggregateOutputType | null
    _avg: TemplateClauseAvgAggregateOutputType | null
    _sum: TemplateClauseSumAggregateOutputType | null
    _min: TemplateClauseMinAggregateOutputType | null
    _max: TemplateClauseMaxAggregateOutputType | null
  }

  type GetTemplateClauseGroupByPayload<T extends TemplateClauseGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<TemplateClauseGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof TemplateClauseGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], TemplateClauseGroupByOutputType[P]>
            : GetScalarType<T[P], TemplateClauseGroupByOutputType[P]>
        }
      >
    >


  export type TemplateClauseSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    templateId?: boolean
    clauseId?: boolean
    sectionName?: boolean
    order?: boolean
    template?: boolean | DocumentTemplateDefaultArgs<ExtArgs>
    clause?: boolean | ClauseDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["templateClause"]>

  export type TemplateClauseSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    templateId?: boolean
    clauseId?: boolean
    sectionName?: boolean
    order?: boolean
    template?: boolean | DocumentTemplateDefaultArgs<ExtArgs>
    clause?: boolean | ClauseDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["templateClause"]>

  export type TemplateClauseSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    templateId?: boolean
    clauseId?: boolean
    sectionName?: boolean
    order?: boolean
    template?: boolean | DocumentTemplateDefaultArgs<ExtArgs>
    clause?: boolean | ClauseDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["templateClause"]>

  export type TemplateClauseSelectScalar = {
    id?: boolean
    templateId?: boolean
    clauseId?: boolean
    sectionName?: boolean
    order?: boolean
  }

  export type TemplateClauseOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "templateId" | "clauseId" | "sectionName" | "order", ExtArgs["result"]["templateClause"]>
  export type TemplateClauseInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    template?: boolean | DocumentTemplateDefaultArgs<ExtArgs>
    clause?: boolean | ClauseDefaultArgs<ExtArgs>
  }
  export type TemplateClauseIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    template?: boolean | DocumentTemplateDefaultArgs<ExtArgs>
    clause?: boolean | ClauseDefaultArgs<ExtArgs>
  }
  export type TemplateClauseIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    template?: boolean | DocumentTemplateDefaultArgs<ExtArgs>
    clause?: boolean | ClauseDefaultArgs<ExtArgs>
  }

  export type $TemplateClausePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "TemplateClause"
    objects: {
      template: Prisma.$DocumentTemplatePayload<ExtArgs>
      clause: Prisma.$ClausePayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      templateId: string
      clauseId: string
      sectionName: string | null
      order: number
    }, ExtArgs["result"]["templateClause"]>
    composites: {}
  }

  type TemplateClauseGetPayload<S extends boolean | null | undefined | TemplateClauseDefaultArgs> = $Result.GetResult<Prisma.$TemplateClausePayload, S>

  type TemplateClauseCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<TemplateClauseFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: TemplateClauseCountAggregateInputType | true
    }

  export interface TemplateClauseDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['TemplateClause'], meta: { name: 'TemplateClause' } }
    /**
     * Find zero or one TemplateClause that matches the filter.
     * @param {TemplateClauseFindUniqueArgs} args - Arguments to find a TemplateClause
     * @example
     * // Get one TemplateClause
     * const templateClause = await prisma.templateClause.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends TemplateClauseFindUniqueArgs>(args: SelectSubset<T, TemplateClauseFindUniqueArgs<ExtArgs>>): Prisma__TemplateClauseClient<$Result.GetResult<Prisma.$TemplateClausePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one TemplateClause that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {TemplateClauseFindUniqueOrThrowArgs} args - Arguments to find a TemplateClause
     * @example
     * // Get one TemplateClause
     * const templateClause = await prisma.templateClause.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends TemplateClauseFindUniqueOrThrowArgs>(args: SelectSubset<T, TemplateClauseFindUniqueOrThrowArgs<ExtArgs>>): Prisma__TemplateClauseClient<$Result.GetResult<Prisma.$TemplateClausePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first TemplateClause that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TemplateClauseFindFirstArgs} args - Arguments to find a TemplateClause
     * @example
     * // Get one TemplateClause
     * const templateClause = await prisma.templateClause.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends TemplateClauseFindFirstArgs>(args?: SelectSubset<T, TemplateClauseFindFirstArgs<ExtArgs>>): Prisma__TemplateClauseClient<$Result.GetResult<Prisma.$TemplateClausePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first TemplateClause that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TemplateClauseFindFirstOrThrowArgs} args - Arguments to find a TemplateClause
     * @example
     * // Get one TemplateClause
     * const templateClause = await prisma.templateClause.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends TemplateClauseFindFirstOrThrowArgs>(args?: SelectSubset<T, TemplateClauseFindFirstOrThrowArgs<ExtArgs>>): Prisma__TemplateClauseClient<$Result.GetResult<Prisma.$TemplateClausePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more TemplateClauses that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TemplateClauseFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all TemplateClauses
     * const templateClauses = await prisma.templateClause.findMany()
     * 
     * // Get first 10 TemplateClauses
     * const templateClauses = await prisma.templateClause.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const templateClauseWithIdOnly = await prisma.templateClause.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends TemplateClauseFindManyArgs>(args?: SelectSubset<T, TemplateClauseFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TemplateClausePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a TemplateClause.
     * @param {TemplateClauseCreateArgs} args - Arguments to create a TemplateClause.
     * @example
     * // Create one TemplateClause
     * const TemplateClause = await prisma.templateClause.create({
     *   data: {
     *     // ... data to create a TemplateClause
     *   }
     * })
     * 
     */
    create<T extends TemplateClauseCreateArgs>(args: SelectSubset<T, TemplateClauseCreateArgs<ExtArgs>>): Prisma__TemplateClauseClient<$Result.GetResult<Prisma.$TemplateClausePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many TemplateClauses.
     * @param {TemplateClauseCreateManyArgs} args - Arguments to create many TemplateClauses.
     * @example
     * // Create many TemplateClauses
     * const templateClause = await prisma.templateClause.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends TemplateClauseCreateManyArgs>(args?: SelectSubset<T, TemplateClauseCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many TemplateClauses and returns the data saved in the database.
     * @param {TemplateClauseCreateManyAndReturnArgs} args - Arguments to create many TemplateClauses.
     * @example
     * // Create many TemplateClauses
     * const templateClause = await prisma.templateClause.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many TemplateClauses and only return the `id`
     * const templateClauseWithIdOnly = await prisma.templateClause.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends TemplateClauseCreateManyAndReturnArgs>(args?: SelectSubset<T, TemplateClauseCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TemplateClausePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a TemplateClause.
     * @param {TemplateClauseDeleteArgs} args - Arguments to delete one TemplateClause.
     * @example
     * // Delete one TemplateClause
     * const TemplateClause = await prisma.templateClause.delete({
     *   where: {
     *     // ... filter to delete one TemplateClause
     *   }
     * })
     * 
     */
    delete<T extends TemplateClauseDeleteArgs>(args: SelectSubset<T, TemplateClauseDeleteArgs<ExtArgs>>): Prisma__TemplateClauseClient<$Result.GetResult<Prisma.$TemplateClausePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one TemplateClause.
     * @param {TemplateClauseUpdateArgs} args - Arguments to update one TemplateClause.
     * @example
     * // Update one TemplateClause
     * const templateClause = await prisma.templateClause.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends TemplateClauseUpdateArgs>(args: SelectSubset<T, TemplateClauseUpdateArgs<ExtArgs>>): Prisma__TemplateClauseClient<$Result.GetResult<Prisma.$TemplateClausePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more TemplateClauses.
     * @param {TemplateClauseDeleteManyArgs} args - Arguments to filter TemplateClauses to delete.
     * @example
     * // Delete a few TemplateClauses
     * const { count } = await prisma.templateClause.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends TemplateClauseDeleteManyArgs>(args?: SelectSubset<T, TemplateClauseDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more TemplateClauses.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TemplateClauseUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many TemplateClauses
     * const templateClause = await prisma.templateClause.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends TemplateClauseUpdateManyArgs>(args: SelectSubset<T, TemplateClauseUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more TemplateClauses and returns the data updated in the database.
     * @param {TemplateClauseUpdateManyAndReturnArgs} args - Arguments to update many TemplateClauses.
     * @example
     * // Update many TemplateClauses
     * const templateClause = await prisma.templateClause.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more TemplateClauses and only return the `id`
     * const templateClauseWithIdOnly = await prisma.templateClause.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends TemplateClauseUpdateManyAndReturnArgs>(args: SelectSubset<T, TemplateClauseUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TemplateClausePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one TemplateClause.
     * @param {TemplateClauseUpsertArgs} args - Arguments to update or create a TemplateClause.
     * @example
     * // Update or create a TemplateClause
     * const templateClause = await prisma.templateClause.upsert({
     *   create: {
     *     // ... data to create a TemplateClause
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the TemplateClause we want to update
     *   }
     * })
     */
    upsert<T extends TemplateClauseUpsertArgs>(args: SelectSubset<T, TemplateClauseUpsertArgs<ExtArgs>>): Prisma__TemplateClauseClient<$Result.GetResult<Prisma.$TemplateClausePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of TemplateClauses.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TemplateClauseCountArgs} args - Arguments to filter TemplateClauses to count.
     * @example
     * // Count the number of TemplateClauses
     * const count = await prisma.templateClause.count({
     *   where: {
     *     // ... the filter for the TemplateClauses we want to count
     *   }
     * })
    **/
    count<T extends TemplateClauseCountArgs>(
      args?: Subset<T, TemplateClauseCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], TemplateClauseCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a TemplateClause.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TemplateClauseAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends TemplateClauseAggregateArgs>(args: Subset<T, TemplateClauseAggregateArgs>): Prisma.PrismaPromise<GetTemplateClauseAggregateType<T>>

    /**
     * Group by TemplateClause.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TemplateClauseGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends TemplateClauseGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: TemplateClauseGroupByArgs['orderBy'] }
        : { orderBy?: TemplateClauseGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, TemplateClauseGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetTemplateClauseGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the TemplateClause model
   */
  readonly fields: TemplateClauseFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for TemplateClause.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__TemplateClauseClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    template<T extends DocumentTemplateDefaultArgs<ExtArgs> = {}>(args?: Subset<T, DocumentTemplateDefaultArgs<ExtArgs>>): Prisma__DocumentTemplateClient<$Result.GetResult<Prisma.$DocumentTemplatePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    clause<T extends ClauseDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ClauseDefaultArgs<ExtArgs>>): Prisma__ClauseClient<$Result.GetResult<Prisma.$ClausePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the TemplateClause model
   */
  interface TemplateClauseFieldRefs {
    readonly id: FieldRef<"TemplateClause", 'String'>
    readonly templateId: FieldRef<"TemplateClause", 'String'>
    readonly clauseId: FieldRef<"TemplateClause", 'String'>
    readonly sectionName: FieldRef<"TemplateClause", 'String'>
    readonly order: FieldRef<"TemplateClause", 'Int'>
  }
    

  // Custom InputTypes
  /**
   * TemplateClause findUnique
   */
  export type TemplateClauseFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TemplateClause
     */
    select?: TemplateClauseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TemplateClause
     */
    omit?: TemplateClauseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TemplateClauseInclude<ExtArgs> | null
    /**
     * Filter, which TemplateClause to fetch.
     */
    where: TemplateClauseWhereUniqueInput
  }

  /**
   * TemplateClause findUniqueOrThrow
   */
  export type TemplateClauseFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TemplateClause
     */
    select?: TemplateClauseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TemplateClause
     */
    omit?: TemplateClauseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TemplateClauseInclude<ExtArgs> | null
    /**
     * Filter, which TemplateClause to fetch.
     */
    where: TemplateClauseWhereUniqueInput
  }

  /**
   * TemplateClause findFirst
   */
  export type TemplateClauseFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TemplateClause
     */
    select?: TemplateClauseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TemplateClause
     */
    omit?: TemplateClauseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TemplateClauseInclude<ExtArgs> | null
    /**
     * Filter, which TemplateClause to fetch.
     */
    where?: TemplateClauseWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TemplateClauses to fetch.
     */
    orderBy?: TemplateClauseOrderByWithRelationInput | TemplateClauseOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for TemplateClauses.
     */
    cursor?: TemplateClauseWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TemplateClauses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TemplateClauses.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of TemplateClauses.
     */
    distinct?: TemplateClauseScalarFieldEnum | TemplateClauseScalarFieldEnum[]
  }

  /**
   * TemplateClause findFirstOrThrow
   */
  export type TemplateClauseFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TemplateClause
     */
    select?: TemplateClauseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TemplateClause
     */
    omit?: TemplateClauseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TemplateClauseInclude<ExtArgs> | null
    /**
     * Filter, which TemplateClause to fetch.
     */
    where?: TemplateClauseWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TemplateClauses to fetch.
     */
    orderBy?: TemplateClauseOrderByWithRelationInput | TemplateClauseOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for TemplateClauses.
     */
    cursor?: TemplateClauseWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TemplateClauses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TemplateClauses.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of TemplateClauses.
     */
    distinct?: TemplateClauseScalarFieldEnum | TemplateClauseScalarFieldEnum[]
  }

  /**
   * TemplateClause findMany
   */
  export type TemplateClauseFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TemplateClause
     */
    select?: TemplateClauseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TemplateClause
     */
    omit?: TemplateClauseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TemplateClauseInclude<ExtArgs> | null
    /**
     * Filter, which TemplateClauses to fetch.
     */
    where?: TemplateClauseWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TemplateClauses to fetch.
     */
    orderBy?: TemplateClauseOrderByWithRelationInput | TemplateClauseOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing TemplateClauses.
     */
    cursor?: TemplateClauseWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TemplateClauses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TemplateClauses.
     */
    skip?: number
    distinct?: TemplateClauseScalarFieldEnum | TemplateClauseScalarFieldEnum[]
  }

  /**
   * TemplateClause create
   */
  export type TemplateClauseCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TemplateClause
     */
    select?: TemplateClauseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TemplateClause
     */
    omit?: TemplateClauseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TemplateClauseInclude<ExtArgs> | null
    /**
     * The data needed to create a TemplateClause.
     */
    data: XOR<TemplateClauseCreateInput, TemplateClauseUncheckedCreateInput>
  }

  /**
   * TemplateClause createMany
   */
  export type TemplateClauseCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many TemplateClauses.
     */
    data: TemplateClauseCreateManyInput | TemplateClauseCreateManyInput[]
  }

  /**
   * TemplateClause createManyAndReturn
   */
  export type TemplateClauseCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TemplateClause
     */
    select?: TemplateClauseSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the TemplateClause
     */
    omit?: TemplateClauseOmit<ExtArgs> | null
    /**
     * The data used to create many TemplateClauses.
     */
    data: TemplateClauseCreateManyInput | TemplateClauseCreateManyInput[]
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TemplateClauseIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * TemplateClause update
   */
  export type TemplateClauseUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TemplateClause
     */
    select?: TemplateClauseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TemplateClause
     */
    omit?: TemplateClauseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TemplateClauseInclude<ExtArgs> | null
    /**
     * The data needed to update a TemplateClause.
     */
    data: XOR<TemplateClauseUpdateInput, TemplateClauseUncheckedUpdateInput>
    /**
     * Choose, which TemplateClause to update.
     */
    where: TemplateClauseWhereUniqueInput
  }

  /**
   * TemplateClause updateMany
   */
  export type TemplateClauseUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update TemplateClauses.
     */
    data: XOR<TemplateClauseUpdateManyMutationInput, TemplateClauseUncheckedUpdateManyInput>
    /**
     * Filter which TemplateClauses to update
     */
    where?: TemplateClauseWhereInput
    /**
     * Limit how many TemplateClauses to update.
     */
    limit?: number
  }

  /**
   * TemplateClause updateManyAndReturn
   */
  export type TemplateClauseUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TemplateClause
     */
    select?: TemplateClauseSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the TemplateClause
     */
    omit?: TemplateClauseOmit<ExtArgs> | null
    /**
     * The data used to update TemplateClauses.
     */
    data: XOR<TemplateClauseUpdateManyMutationInput, TemplateClauseUncheckedUpdateManyInput>
    /**
     * Filter which TemplateClauses to update
     */
    where?: TemplateClauseWhereInput
    /**
     * Limit how many TemplateClauses to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TemplateClauseIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * TemplateClause upsert
   */
  export type TemplateClauseUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TemplateClause
     */
    select?: TemplateClauseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TemplateClause
     */
    omit?: TemplateClauseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TemplateClauseInclude<ExtArgs> | null
    /**
     * The filter to search for the TemplateClause to update in case it exists.
     */
    where: TemplateClauseWhereUniqueInput
    /**
     * In case the TemplateClause found by the `where` argument doesn't exist, create a new TemplateClause with this data.
     */
    create: XOR<TemplateClauseCreateInput, TemplateClauseUncheckedCreateInput>
    /**
     * In case the TemplateClause was found with the provided `where` argument, update it with this data.
     */
    update: XOR<TemplateClauseUpdateInput, TemplateClauseUncheckedUpdateInput>
  }

  /**
   * TemplateClause delete
   */
  export type TemplateClauseDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TemplateClause
     */
    select?: TemplateClauseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TemplateClause
     */
    omit?: TemplateClauseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TemplateClauseInclude<ExtArgs> | null
    /**
     * Filter which TemplateClause to delete.
     */
    where: TemplateClauseWhereUniqueInput
  }

  /**
   * TemplateClause deleteMany
   */
  export type TemplateClauseDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which TemplateClauses to delete
     */
    where?: TemplateClauseWhereInput
    /**
     * Limit how many TemplateClauses to delete.
     */
    limit?: number
  }

  /**
   * TemplateClause without action
   */
  export type TemplateClauseDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TemplateClause
     */
    select?: TemplateClauseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TemplateClause
     */
    omit?: TemplateClauseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TemplateClauseInclude<ExtArgs> | null
  }


  /**
   * Model TemplateNormativity
   */

  export type AggregateTemplateNormativity = {
    _count: TemplateNormativityCountAggregateOutputType | null
    _min: TemplateNormativityMinAggregateOutputType | null
    _max: TemplateNormativityMaxAggregateOutputType | null
  }

  export type TemplateNormativityMinAggregateOutputType = {
    id: string | null
    templateId: string | null
    lawName: string | null
    lawReference: string | null
    articleNumber: string | null
    description: string | null
  }

  export type TemplateNormativityMaxAggregateOutputType = {
    id: string | null
    templateId: string | null
    lawName: string | null
    lawReference: string | null
    articleNumber: string | null
    description: string | null
  }

  export type TemplateNormativityCountAggregateOutputType = {
    id: number
    templateId: number
    lawName: number
    lawReference: number
    articleNumber: number
    description: number
    _all: number
  }


  export type TemplateNormativityMinAggregateInputType = {
    id?: true
    templateId?: true
    lawName?: true
    lawReference?: true
    articleNumber?: true
    description?: true
  }

  export type TemplateNormativityMaxAggregateInputType = {
    id?: true
    templateId?: true
    lawName?: true
    lawReference?: true
    articleNumber?: true
    description?: true
  }

  export type TemplateNormativityCountAggregateInputType = {
    id?: true
    templateId?: true
    lawName?: true
    lawReference?: true
    articleNumber?: true
    description?: true
    _all?: true
  }

  export type TemplateNormativityAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which TemplateNormativity to aggregate.
     */
    where?: TemplateNormativityWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TemplateNormativities to fetch.
     */
    orderBy?: TemplateNormativityOrderByWithRelationInput | TemplateNormativityOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: TemplateNormativityWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TemplateNormativities from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TemplateNormativities.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned TemplateNormativities
    **/
    _count?: true | TemplateNormativityCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: TemplateNormativityMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: TemplateNormativityMaxAggregateInputType
  }

  export type GetTemplateNormativityAggregateType<T extends TemplateNormativityAggregateArgs> = {
        [P in keyof T & keyof AggregateTemplateNormativity]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateTemplateNormativity[P]>
      : GetScalarType<T[P], AggregateTemplateNormativity[P]>
  }




  export type TemplateNormativityGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TemplateNormativityWhereInput
    orderBy?: TemplateNormativityOrderByWithAggregationInput | TemplateNormativityOrderByWithAggregationInput[]
    by: TemplateNormativityScalarFieldEnum[] | TemplateNormativityScalarFieldEnum
    having?: TemplateNormativityScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: TemplateNormativityCountAggregateInputType | true
    _min?: TemplateNormativityMinAggregateInputType
    _max?: TemplateNormativityMaxAggregateInputType
  }

  export type TemplateNormativityGroupByOutputType = {
    id: string
    templateId: string
    lawName: string
    lawReference: string
    articleNumber: string | null
    description: string | null
    _count: TemplateNormativityCountAggregateOutputType | null
    _min: TemplateNormativityMinAggregateOutputType | null
    _max: TemplateNormativityMaxAggregateOutputType | null
  }

  type GetTemplateNormativityGroupByPayload<T extends TemplateNormativityGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<TemplateNormativityGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof TemplateNormativityGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], TemplateNormativityGroupByOutputType[P]>
            : GetScalarType<T[P], TemplateNormativityGroupByOutputType[P]>
        }
      >
    >


  export type TemplateNormativitySelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    templateId?: boolean
    lawName?: boolean
    lawReference?: boolean
    articleNumber?: boolean
    description?: boolean
    template?: boolean | DocumentTemplateDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["templateNormativity"]>

  export type TemplateNormativitySelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    templateId?: boolean
    lawName?: boolean
    lawReference?: boolean
    articleNumber?: boolean
    description?: boolean
    template?: boolean | DocumentTemplateDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["templateNormativity"]>

  export type TemplateNormativitySelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    templateId?: boolean
    lawName?: boolean
    lawReference?: boolean
    articleNumber?: boolean
    description?: boolean
    template?: boolean | DocumentTemplateDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["templateNormativity"]>

  export type TemplateNormativitySelectScalar = {
    id?: boolean
    templateId?: boolean
    lawName?: boolean
    lawReference?: boolean
    articleNumber?: boolean
    description?: boolean
  }

  export type TemplateNormativityOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "templateId" | "lawName" | "lawReference" | "articleNumber" | "description", ExtArgs["result"]["templateNormativity"]>
  export type TemplateNormativityInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    template?: boolean | DocumentTemplateDefaultArgs<ExtArgs>
  }
  export type TemplateNormativityIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    template?: boolean | DocumentTemplateDefaultArgs<ExtArgs>
  }
  export type TemplateNormativityIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    template?: boolean | DocumentTemplateDefaultArgs<ExtArgs>
  }

  export type $TemplateNormativityPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "TemplateNormativity"
    objects: {
      template: Prisma.$DocumentTemplatePayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      templateId: string
      lawName: string
      lawReference: string
      articleNumber: string | null
      description: string | null
    }, ExtArgs["result"]["templateNormativity"]>
    composites: {}
  }

  type TemplateNormativityGetPayload<S extends boolean | null | undefined | TemplateNormativityDefaultArgs> = $Result.GetResult<Prisma.$TemplateNormativityPayload, S>

  type TemplateNormativityCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<TemplateNormativityFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: TemplateNormativityCountAggregateInputType | true
    }

  export interface TemplateNormativityDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['TemplateNormativity'], meta: { name: 'TemplateNormativity' } }
    /**
     * Find zero or one TemplateNormativity that matches the filter.
     * @param {TemplateNormativityFindUniqueArgs} args - Arguments to find a TemplateNormativity
     * @example
     * // Get one TemplateNormativity
     * const templateNormativity = await prisma.templateNormativity.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends TemplateNormativityFindUniqueArgs>(args: SelectSubset<T, TemplateNormativityFindUniqueArgs<ExtArgs>>): Prisma__TemplateNormativityClient<$Result.GetResult<Prisma.$TemplateNormativityPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one TemplateNormativity that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {TemplateNormativityFindUniqueOrThrowArgs} args - Arguments to find a TemplateNormativity
     * @example
     * // Get one TemplateNormativity
     * const templateNormativity = await prisma.templateNormativity.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends TemplateNormativityFindUniqueOrThrowArgs>(args: SelectSubset<T, TemplateNormativityFindUniqueOrThrowArgs<ExtArgs>>): Prisma__TemplateNormativityClient<$Result.GetResult<Prisma.$TemplateNormativityPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first TemplateNormativity that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TemplateNormativityFindFirstArgs} args - Arguments to find a TemplateNormativity
     * @example
     * // Get one TemplateNormativity
     * const templateNormativity = await prisma.templateNormativity.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends TemplateNormativityFindFirstArgs>(args?: SelectSubset<T, TemplateNormativityFindFirstArgs<ExtArgs>>): Prisma__TemplateNormativityClient<$Result.GetResult<Prisma.$TemplateNormativityPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first TemplateNormativity that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TemplateNormativityFindFirstOrThrowArgs} args - Arguments to find a TemplateNormativity
     * @example
     * // Get one TemplateNormativity
     * const templateNormativity = await prisma.templateNormativity.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends TemplateNormativityFindFirstOrThrowArgs>(args?: SelectSubset<T, TemplateNormativityFindFirstOrThrowArgs<ExtArgs>>): Prisma__TemplateNormativityClient<$Result.GetResult<Prisma.$TemplateNormativityPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more TemplateNormativities that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TemplateNormativityFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all TemplateNormativities
     * const templateNormativities = await prisma.templateNormativity.findMany()
     * 
     * // Get first 10 TemplateNormativities
     * const templateNormativities = await prisma.templateNormativity.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const templateNormativityWithIdOnly = await prisma.templateNormativity.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends TemplateNormativityFindManyArgs>(args?: SelectSubset<T, TemplateNormativityFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TemplateNormativityPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a TemplateNormativity.
     * @param {TemplateNormativityCreateArgs} args - Arguments to create a TemplateNormativity.
     * @example
     * // Create one TemplateNormativity
     * const TemplateNormativity = await prisma.templateNormativity.create({
     *   data: {
     *     // ... data to create a TemplateNormativity
     *   }
     * })
     * 
     */
    create<T extends TemplateNormativityCreateArgs>(args: SelectSubset<T, TemplateNormativityCreateArgs<ExtArgs>>): Prisma__TemplateNormativityClient<$Result.GetResult<Prisma.$TemplateNormativityPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many TemplateNormativities.
     * @param {TemplateNormativityCreateManyArgs} args - Arguments to create many TemplateNormativities.
     * @example
     * // Create many TemplateNormativities
     * const templateNormativity = await prisma.templateNormativity.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends TemplateNormativityCreateManyArgs>(args?: SelectSubset<T, TemplateNormativityCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many TemplateNormativities and returns the data saved in the database.
     * @param {TemplateNormativityCreateManyAndReturnArgs} args - Arguments to create many TemplateNormativities.
     * @example
     * // Create many TemplateNormativities
     * const templateNormativity = await prisma.templateNormativity.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many TemplateNormativities and only return the `id`
     * const templateNormativityWithIdOnly = await prisma.templateNormativity.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends TemplateNormativityCreateManyAndReturnArgs>(args?: SelectSubset<T, TemplateNormativityCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TemplateNormativityPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a TemplateNormativity.
     * @param {TemplateNormativityDeleteArgs} args - Arguments to delete one TemplateNormativity.
     * @example
     * // Delete one TemplateNormativity
     * const TemplateNormativity = await prisma.templateNormativity.delete({
     *   where: {
     *     // ... filter to delete one TemplateNormativity
     *   }
     * })
     * 
     */
    delete<T extends TemplateNormativityDeleteArgs>(args: SelectSubset<T, TemplateNormativityDeleteArgs<ExtArgs>>): Prisma__TemplateNormativityClient<$Result.GetResult<Prisma.$TemplateNormativityPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one TemplateNormativity.
     * @param {TemplateNormativityUpdateArgs} args - Arguments to update one TemplateNormativity.
     * @example
     * // Update one TemplateNormativity
     * const templateNormativity = await prisma.templateNormativity.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends TemplateNormativityUpdateArgs>(args: SelectSubset<T, TemplateNormativityUpdateArgs<ExtArgs>>): Prisma__TemplateNormativityClient<$Result.GetResult<Prisma.$TemplateNormativityPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more TemplateNormativities.
     * @param {TemplateNormativityDeleteManyArgs} args - Arguments to filter TemplateNormativities to delete.
     * @example
     * // Delete a few TemplateNormativities
     * const { count } = await prisma.templateNormativity.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends TemplateNormativityDeleteManyArgs>(args?: SelectSubset<T, TemplateNormativityDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more TemplateNormativities.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TemplateNormativityUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many TemplateNormativities
     * const templateNormativity = await prisma.templateNormativity.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends TemplateNormativityUpdateManyArgs>(args: SelectSubset<T, TemplateNormativityUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more TemplateNormativities and returns the data updated in the database.
     * @param {TemplateNormativityUpdateManyAndReturnArgs} args - Arguments to update many TemplateNormativities.
     * @example
     * // Update many TemplateNormativities
     * const templateNormativity = await prisma.templateNormativity.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more TemplateNormativities and only return the `id`
     * const templateNormativityWithIdOnly = await prisma.templateNormativity.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends TemplateNormativityUpdateManyAndReturnArgs>(args: SelectSubset<T, TemplateNormativityUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TemplateNormativityPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one TemplateNormativity.
     * @param {TemplateNormativityUpsertArgs} args - Arguments to update or create a TemplateNormativity.
     * @example
     * // Update or create a TemplateNormativity
     * const templateNormativity = await prisma.templateNormativity.upsert({
     *   create: {
     *     // ... data to create a TemplateNormativity
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the TemplateNormativity we want to update
     *   }
     * })
     */
    upsert<T extends TemplateNormativityUpsertArgs>(args: SelectSubset<T, TemplateNormativityUpsertArgs<ExtArgs>>): Prisma__TemplateNormativityClient<$Result.GetResult<Prisma.$TemplateNormativityPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of TemplateNormativities.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TemplateNormativityCountArgs} args - Arguments to filter TemplateNormativities to count.
     * @example
     * // Count the number of TemplateNormativities
     * const count = await prisma.templateNormativity.count({
     *   where: {
     *     // ... the filter for the TemplateNormativities we want to count
     *   }
     * })
    **/
    count<T extends TemplateNormativityCountArgs>(
      args?: Subset<T, TemplateNormativityCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], TemplateNormativityCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a TemplateNormativity.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TemplateNormativityAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends TemplateNormativityAggregateArgs>(args: Subset<T, TemplateNormativityAggregateArgs>): Prisma.PrismaPromise<GetTemplateNormativityAggregateType<T>>

    /**
     * Group by TemplateNormativity.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TemplateNormativityGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends TemplateNormativityGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: TemplateNormativityGroupByArgs['orderBy'] }
        : { orderBy?: TemplateNormativityGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, TemplateNormativityGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetTemplateNormativityGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the TemplateNormativity model
   */
  readonly fields: TemplateNormativityFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for TemplateNormativity.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__TemplateNormativityClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    template<T extends DocumentTemplateDefaultArgs<ExtArgs> = {}>(args?: Subset<T, DocumentTemplateDefaultArgs<ExtArgs>>): Prisma__DocumentTemplateClient<$Result.GetResult<Prisma.$DocumentTemplatePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the TemplateNormativity model
   */
  interface TemplateNormativityFieldRefs {
    readonly id: FieldRef<"TemplateNormativity", 'String'>
    readonly templateId: FieldRef<"TemplateNormativity", 'String'>
    readonly lawName: FieldRef<"TemplateNormativity", 'String'>
    readonly lawReference: FieldRef<"TemplateNormativity", 'String'>
    readonly articleNumber: FieldRef<"TemplateNormativity", 'String'>
    readonly description: FieldRef<"TemplateNormativity", 'String'>
  }
    

  // Custom InputTypes
  /**
   * TemplateNormativity findUnique
   */
  export type TemplateNormativityFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TemplateNormativity
     */
    select?: TemplateNormativitySelect<ExtArgs> | null
    /**
     * Omit specific fields from the TemplateNormativity
     */
    omit?: TemplateNormativityOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TemplateNormativityInclude<ExtArgs> | null
    /**
     * Filter, which TemplateNormativity to fetch.
     */
    where: TemplateNormativityWhereUniqueInput
  }

  /**
   * TemplateNormativity findUniqueOrThrow
   */
  export type TemplateNormativityFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TemplateNormativity
     */
    select?: TemplateNormativitySelect<ExtArgs> | null
    /**
     * Omit specific fields from the TemplateNormativity
     */
    omit?: TemplateNormativityOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TemplateNormativityInclude<ExtArgs> | null
    /**
     * Filter, which TemplateNormativity to fetch.
     */
    where: TemplateNormativityWhereUniqueInput
  }

  /**
   * TemplateNormativity findFirst
   */
  export type TemplateNormativityFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TemplateNormativity
     */
    select?: TemplateNormativitySelect<ExtArgs> | null
    /**
     * Omit specific fields from the TemplateNormativity
     */
    omit?: TemplateNormativityOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TemplateNormativityInclude<ExtArgs> | null
    /**
     * Filter, which TemplateNormativity to fetch.
     */
    where?: TemplateNormativityWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TemplateNormativities to fetch.
     */
    orderBy?: TemplateNormativityOrderByWithRelationInput | TemplateNormativityOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for TemplateNormativities.
     */
    cursor?: TemplateNormativityWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TemplateNormativities from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TemplateNormativities.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of TemplateNormativities.
     */
    distinct?: TemplateNormativityScalarFieldEnum | TemplateNormativityScalarFieldEnum[]
  }

  /**
   * TemplateNormativity findFirstOrThrow
   */
  export type TemplateNormativityFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TemplateNormativity
     */
    select?: TemplateNormativitySelect<ExtArgs> | null
    /**
     * Omit specific fields from the TemplateNormativity
     */
    omit?: TemplateNormativityOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TemplateNormativityInclude<ExtArgs> | null
    /**
     * Filter, which TemplateNormativity to fetch.
     */
    where?: TemplateNormativityWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TemplateNormativities to fetch.
     */
    orderBy?: TemplateNormativityOrderByWithRelationInput | TemplateNormativityOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for TemplateNormativities.
     */
    cursor?: TemplateNormativityWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TemplateNormativities from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TemplateNormativities.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of TemplateNormativities.
     */
    distinct?: TemplateNormativityScalarFieldEnum | TemplateNormativityScalarFieldEnum[]
  }

  /**
   * TemplateNormativity findMany
   */
  export type TemplateNormativityFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TemplateNormativity
     */
    select?: TemplateNormativitySelect<ExtArgs> | null
    /**
     * Omit specific fields from the TemplateNormativity
     */
    omit?: TemplateNormativityOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TemplateNormativityInclude<ExtArgs> | null
    /**
     * Filter, which TemplateNormativities to fetch.
     */
    where?: TemplateNormativityWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TemplateNormativities to fetch.
     */
    orderBy?: TemplateNormativityOrderByWithRelationInput | TemplateNormativityOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing TemplateNormativities.
     */
    cursor?: TemplateNormativityWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TemplateNormativities from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TemplateNormativities.
     */
    skip?: number
    distinct?: TemplateNormativityScalarFieldEnum | TemplateNormativityScalarFieldEnum[]
  }

  /**
   * TemplateNormativity create
   */
  export type TemplateNormativityCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TemplateNormativity
     */
    select?: TemplateNormativitySelect<ExtArgs> | null
    /**
     * Omit specific fields from the TemplateNormativity
     */
    omit?: TemplateNormativityOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TemplateNormativityInclude<ExtArgs> | null
    /**
     * The data needed to create a TemplateNormativity.
     */
    data: XOR<TemplateNormativityCreateInput, TemplateNormativityUncheckedCreateInput>
  }

  /**
   * TemplateNormativity createMany
   */
  export type TemplateNormativityCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many TemplateNormativities.
     */
    data: TemplateNormativityCreateManyInput | TemplateNormativityCreateManyInput[]
  }

  /**
   * TemplateNormativity createManyAndReturn
   */
  export type TemplateNormativityCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TemplateNormativity
     */
    select?: TemplateNormativitySelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the TemplateNormativity
     */
    omit?: TemplateNormativityOmit<ExtArgs> | null
    /**
     * The data used to create many TemplateNormativities.
     */
    data: TemplateNormativityCreateManyInput | TemplateNormativityCreateManyInput[]
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TemplateNormativityIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * TemplateNormativity update
   */
  export type TemplateNormativityUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TemplateNormativity
     */
    select?: TemplateNormativitySelect<ExtArgs> | null
    /**
     * Omit specific fields from the TemplateNormativity
     */
    omit?: TemplateNormativityOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TemplateNormativityInclude<ExtArgs> | null
    /**
     * The data needed to update a TemplateNormativity.
     */
    data: XOR<TemplateNormativityUpdateInput, TemplateNormativityUncheckedUpdateInput>
    /**
     * Choose, which TemplateNormativity to update.
     */
    where: TemplateNormativityWhereUniqueInput
  }

  /**
   * TemplateNormativity updateMany
   */
  export type TemplateNormativityUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update TemplateNormativities.
     */
    data: XOR<TemplateNormativityUpdateManyMutationInput, TemplateNormativityUncheckedUpdateManyInput>
    /**
     * Filter which TemplateNormativities to update
     */
    where?: TemplateNormativityWhereInput
    /**
     * Limit how many TemplateNormativities to update.
     */
    limit?: number
  }

  /**
   * TemplateNormativity updateManyAndReturn
   */
  export type TemplateNormativityUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TemplateNormativity
     */
    select?: TemplateNormativitySelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the TemplateNormativity
     */
    omit?: TemplateNormativityOmit<ExtArgs> | null
    /**
     * The data used to update TemplateNormativities.
     */
    data: XOR<TemplateNormativityUpdateManyMutationInput, TemplateNormativityUncheckedUpdateManyInput>
    /**
     * Filter which TemplateNormativities to update
     */
    where?: TemplateNormativityWhereInput
    /**
     * Limit how many TemplateNormativities to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TemplateNormativityIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * TemplateNormativity upsert
   */
  export type TemplateNormativityUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TemplateNormativity
     */
    select?: TemplateNormativitySelect<ExtArgs> | null
    /**
     * Omit specific fields from the TemplateNormativity
     */
    omit?: TemplateNormativityOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TemplateNormativityInclude<ExtArgs> | null
    /**
     * The filter to search for the TemplateNormativity to update in case it exists.
     */
    where: TemplateNormativityWhereUniqueInput
    /**
     * In case the TemplateNormativity found by the `where` argument doesn't exist, create a new TemplateNormativity with this data.
     */
    create: XOR<TemplateNormativityCreateInput, TemplateNormativityUncheckedCreateInput>
    /**
     * In case the TemplateNormativity was found with the provided `where` argument, update it with this data.
     */
    update: XOR<TemplateNormativityUpdateInput, TemplateNormativityUncheckedUpdateInput>
  }

  /**
   * TemplateNormativity delete
   */
  export type TemplateNormativityDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TemplateNormativity
     */
    select?: TemplateNormativitySelect<ExtArgs> | null
    /**
     * Omit specific fields from the TemplateNormativity
     */
    omit?: TemplateNormativityOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TemplateNormativityInclude<ExtArgs> | null
    /**
     * Filter which TemplateNormativity to delete.
     */
    where: TemplateNormativityWhereUniqueInput
  }

  /**
   * TemplateNormativity deleteMany
   */
  export type TemplateNormativityDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which TemplateNormativities to delete
     */
    where?: TemplateNormativityWhereInput
    /**
     * Limit how many TemplateNormativities to delete.
     */
    limit?: number
  }

  /**
   * TemplateNormativity without action
   */
  export type TemplateNormativityDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TemplateNormativity
     */
    select?: TemplateNormativitySelect<ExtArgs> | null
    /**
     * Omit specific fields from the TemplateNormativity
     */
    omit?: TemplateNormativityOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TemplateNormativityInclude<ExtArgs> | null
  }


  /**
   * Model UserDocument
   */

  export type AggregateUserDocument = {
    _count: UserDocumentCountAggregateOutputType | null
    _min: UserDocumentMinAggregateOutputType | null
    _max: UserDocumentMaxAggregateOutputType | null
  }

  export type UserDocumentMinAggregateOutputType = {
    id: string | null
    userId: string | null
    templateId: string | null
    title: string | null
    status: string | null
    answers: string | null
    generatedContent: string | null
    visitorPhone: string | null
    visitorName: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UserDocumentMaxAggregateOutputType = {
    id: string | null
    userId: string | null
    templateId: string | null
    title: string | null
    status: string | null
    answers: string | null
    generatedContent: string | null
    visitorPhone: string | null
    visitorName: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UserDocumentCountAggregateOutputType = {
    id: number
    userId: number
    templateId: number
    title: number
    status: number
    answers: number
    generatedContent: number
    visitorPhone: number
    visitorName: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type UserDocumentMinAggregateInputType = {
    id?: true
    userId?: true
    templateId?: true
    title?: true
    status?: true
    answers?: true
    generatedContent?: true
    visitorPhone?: true
    visitorName?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UserDocumentMaxAggregateInputType = {
    id?: true
    userId?: true
    templateId?: true
    title?: true
    status?: true
    answers?: true
    generatedContent?: true
    visitorPhone?: true
    visitorName?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UserDocumentCountAggregateInputType = {
    id?: true
    userId?: true
    templateId?: true
    title?: true
    status?: true
    answers?: true
    generatedContent?: true
    visitorPhone?: true
    visitorName?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type UserDocumentAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which UserDocument to aggregate.
     */
    where?: UserDocumentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UserDocuments to fetch.
     */
    orderBy?: UserDocumentOrderByWithRelationInput | UserDocumentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UserDocumentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UserDocuments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UserDocuments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned UserDocuments
    **/
    _count?: true | UserDocumentCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserDocumentMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserDocumentMaxAggregateInputType
  }

  export type GetUserDocumentAggregateType<T extends UserDocumentAggregateArgs> = {
        [P in keyof T & keyof AggregateUserDocument]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUserDocument[P]>
      : GetScalarType<T[P], AggregateUserDocument[P]>
  }




  export type UserDocumentGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserDocumentWhereInput
    orderBy?: UserDocumentOrderByWithAggregationInput | UserDocumentOrderByWithAggregationInput[]
    by: UserDocumentScalarFieldEnum[] | UserDocumentScalarFieldEnum
    having?: UserDocumentScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserDocumentCountAggregateInputType | true
    _min?: UserDocumentMinAggregateInputType
    _max?: UserDocumentMaxAggregateInputType
  }

  export type UserDocumentGroupByOutputType = {
    id: string
    userId: string | null
    templateId: string
    title: string
    status: string
    answers: string
    generatedContent: string | null
    visitorPhone: string | null
    visitorName: string | null
    createdAt: Date
    updatedAt: Date
    _count: UserDocumentCountAggregateOutputType | null
    _min: UserDocumentMinAggregateOutputType | null
    _max: UserDocumentMaxAggregateOutputType | null
  }

  type GetUserDocumentGroupByPayload<T extends UserDocumentGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UserDocumentGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserDocumentGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserDocumentGroupByOutputType[P]>
            : GetScalarType<T[P], UserDocumentGroupByOutputType[P]>
        }
      >
    >


  export type UserDocumentSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    templateId?: boolean
    title?: boolean
    status?: boolean
    answers?: boolean
    generatedContent?: boolean
    visitorPhone?: boolean
    visitorName?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    template?: boolean | DocumentTemplateDefaultArgs<ExtArgs>
    user?: boolean | UserDocument$userArgs<ExtArgs>
  }, ExtArgs["result"]["userDocument"]>

  export type UserDocumentSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    templateId?: boolean
    title?: boolean
    status?: boolean
    answers?: boolean
    generatedContent?: boolean
    visitorPhone?: boolean
    visitorName?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    template?: boolean | DocumentTemplateDefaultArgs<ExtArgs>
    user?: boolean | UserDocument$userArgs<ExtArgs>
  }, ExtArgs["result"]["userDocument"]>

  export type UserDocumentSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    templateId?: boolean
    title?: boolean
    status?: boolean
    answers?: boolean
    generatedContent?: boolean
    visitorPhone?: boolean
    visitorName?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    template?: boolean | DocumentTemplateDefaultArgs<ExtArgs>
    user?: boolean | UserDocument$userArgs<ExtArgs>
  }, ExtArgs["result"]["userDocument"]>

  export type UserDocumentSelectScalar = {
    id?: boolean
    userId?: boolean
    templateId?: boolean
    title?: boolean
    status?: boolean
    answers?: boolean
    generatedContent?: boolean
    visitorPhone?: boolean
    visitorName?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type UserDocumentOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "userId" | "templateId" | "title" | "status" | "answers" | "generatedContent" | "visitorPhone" | "visitorName" | "createdAt" | "updatedAt", ExtArgs["result"]["userDocument"]>
  export type UserDocumentInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    template?: boolean | DocumentTemplateDefaultArgs<ExtArgs>
    user?: boolean | UserDocument$userArgs<ExtArgs>
  }
  export type UserDocumentIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    template?: boolean | DocumentTemplateDefaultArgs<ExtArgs>
    user?: boolean | UserDocument$userArgs<ExtArgs>
  }
  export type UserDocumentIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    template?: boolean | DocumentTemplateDefaultArgs<ExtArgs>
    user?: boolean | UserDocument$userArgs<ExtArgs>
  }

  export type $UserDocumentPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "UserDocument"
    objects: {
      template: Prisma.$DocumentTemplatePayload<ExtArgs>
      user: Prisma.$UserPayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      userId: string | null
      templateId: string
      title: string
      status: string
      answers: string
      generatedContent: string | null
      visitorPhone: string | null
      visitorName: string | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["userDocument"]>
    composites: {}
  }

  type UserDocumentGetPayload<S extends boolean | null | undefined | UserDocumentDefaultArgs> = $Result.GetResult<Prisma.$UserDocumentPayload, S>

  type UserDocumentCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<UserDocumentFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: UserDocumentCountAggregateInputType | true
    }

  export interface UserDocumentDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['UserDocument'], meta: { name: 'UserDocument' } }
    /**
     * Find zero or one UserDocument that matches the filter.
     * @param {UserDocumentFindUniqueArgs} args - Arguments to find a UserDocument
     * @example
     * // Get one UserDocument
     * const userDocument = await prisma.userDocument.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UserDocumentFindUniqueArgs>(args: SelectSubset<T, UserDocumentFindUniqueArgs<ExtArgs>>): Prisma__UserDocumentClient<$Result.GetResult<Prisma.$UserDocumentPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one UserDocument that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {UserDocumentFindUniqueOrThrowArgs} args - Arguments to find a UserDocument
     * @example
     * // Get one UserDocument
     * const userDocument = await prisma.userDocument.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UserDocumentFindUniqueOrThrowArgs>(args: SelectSubset<T, UserDocumentFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UserDocumentClient<$Result.GetResult<Prisma.$UserDocumentPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first UserDocument that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserDocumentFindFirstArgs} args - Arguments to find a UserDocument
     * @example
     * // Get one UserDocument
     * const userDocument = await prisma.userDocument.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UserDocumentFindFirstArgs>(args?: SelectSubset<T, UserDocumentFindFirstArgs<ExtArgs>>): Prisma__UserDocumentClient<$Result.GetResult<Prisma.$UserDocumentPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first UserDocument that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserDocumentFindFirstOrThrowArgs} args - Arguments to find a UserDocument
     * @example
     * // Get one UserDocument
     * const userDocument = await prisma.userDocument.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UserDocumentFindFirstOrThrowArgs>(args?: SelectSubset<T, UserDocumentFindFirstOrThrowArgs<ExtArgs>>): Prisma__UserDocumentClient<$Result.GetResult<Prisma.$UserDocumentPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more UserDocuments that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserDocumentFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all UserDocuments
     * const userDocuments = await prisma.userDocument.findMany()
     * 
     * // Get first 10 UserDocuments
     * const userDocuments = await prisma.userDocument.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const userDocumentWithIdOnly = await prisma.userDocument.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends UserDocumentFindManyArgs>(args?: SelectSubset<T, UserDocumentFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserDocumentPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a UserDocument.
     * @param {UserDocumentCreateArgs} args - Arguments to create a UserDocument.
     * @example
     * // Create one UserDocument
     * const UserDocument = await prisma.userDocument.create({
     *   data: {
     *     // ... data to create a UserDocument
     *   }
     * })
     * 
     */
    create<T extends UserDocumentCreateArgs>(args: SelectSubset<T, UserDocumentCreateArgs<ExtArgs>>): Prisma__UserDocumentClient<$Result.GetResult<Prisma.$UserDocumentPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many UserDocuments.
     * @param {UserDocumentCreateManyArgs} args - Arguments to create many UserDocuments.
     * @example
     * // Create many UserDocuments
     * const userDocument = await prisma.userDocument.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UserDocumentCreateManyArgs>(args?: SelectSubset<T, UserDocumentCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many UserDocuments and returns the data saved in the database.
     * @param {UserDocumentCreateManyAndReturnArgs} args - Arguments to create many UserDocuments.
     * @example
     * // Create many UserDocuments
     * const userDocument = await prisma.userDocument.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many UserDocuments and only return the `id`
     * const userDocumentWithIdOnly = await prisma.userDocument.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends UserDocumentCreateManyAndReturnArgs>(args?: SelectSubset<T, UserDocumentCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserDocumentPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a UserDocument.
     * @param {UserDocumentDeleteArgs} args - Arguments to delete one UserDocument.
     * @example
     * // Delete one UserDocument
     * const UserDocument = await prisma.userDocument.delete({
     *   where: {
     *     // ... filter to delete one UserDocument
     *   }
     * })
     * 
     */
    delete<T extends UserDocumentDeleteArgs>(args: SelectSubset<T, UserDocumentDeleteArgs<ExtArgs>>): Prisma__UserDocumentClient<$Result.GetResult<Prisma.$UserDocumentPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one UserDocument.
     * @param {UserDocumentUpdateArgs} args - Arguments to update one UserDocument.
     * @example
     * // Update one UserDocument
     * const userDocument = await prisma.userDocument.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UserDocumentUpdateArgs>(args: SelectSubset<T, UserDocumentUpdateArgs<ExtArgs>>): Prisma__UserDocumentClient<$Result.GetResult<Prisma.$UserDocumentPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more UserDocuments.
     * @param {UserDocumentDeleteManyArgs} args - Arguments to filter UserDocuments to delete.
     * @example
     * // Delete a few UserDocuments
     * const { count } = await prisma.userDocument.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UserDocumentDeleteManyArgs>(args?: SelectSubset<T, UserDocumentDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more UserDocuments.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserDocumentUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many UserDocuments
     * const userDocument = await prisma.userDocument.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UserDocumentUpdateManyArgs>(args: SelectSubset<T, UserDocumentUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more UserDocuments and returns the data updated in the database.
     * @param {UserDocumentUpdateManyAndReturnArgs} args - Arguments to update many UserDocuments.
     * @example
     * // Update many UserDocuments
     * const userDocument = await prisma.userDocument.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more UserDocuments and only return the `id`
     * const userDocumentWithIdOnly = await prisma.userDocument.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends UserDocumentUpdateManyAndReturnArgs>(args: SelectSubset<T, UserDocumentUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserDocumentPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one UserDocument.
     * @param {UserDocumentUpsertArgs} args - Arguments to update or create a UserDocument.
     * @example
     * // Update or create a UserDocument
     * const userDocument = await prisma.userDocument.upsert({
     *   create: {
     *     // ... data to create a UserDocument
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the UserDocument we want to update
     *   }
     * })
     */
    upsert<T extends UserDocumentUpsertArgs>(args: SelectSubset<T, UserDocumentUpsertArgs<ExtArgs>>): Prisma__UserDocumentClient<$Result.GetResult<Prisma.$UserDocumentPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of UserDocuments.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserDocumentCountArgs} args - Arguments to filter UserDocuments to count.
     * @example
     * // Count the number of UserDocuments
     * const count = await prisma.userDocument.count({
     *   where: {
     *     // ... the filter for the UserDocuments we want to count
     *   }
     * })
    **/
    count<T extends UserDocumentCountArgs>(
      args?: Subset<T, UserDocumentCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserDocumentCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a UserDocument.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserDocumentAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UserDocumentAggregateArgs>(args: Subset<T, UserDocumentAggregateArgs>): Prisma.PrismaPromise<GetUserDocumentAggregateType<T>>

    /**
     * Group by UserDocument.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserDocumentGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends UserDocumentGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserDocumentGroupByArgs['orderBy'] }
        : { orderBy?: UserDocumentGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, UserDocumentGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserDocumentGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the UserDocument model
   */
  readonly fields: UserDocumentFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for UserDocument.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UserDocumentClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    template<T extends DocumentTemplateDefaultArgs<ExtArgs> = {}>(args?: Subset<T, DocumentTemplateDefaultArgs<ExtArgs>>): Prisma__DocumentTemplateClient<$Result.GetResult<Prisma.$DocumentTemplatePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    user<T extends UserDocument$userArgs<ExtArgs> = {}>(args?: Subset<T, UserDocument$userArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the UserDocument model
   */
  interface UserDocumentFieldRefs {
    readonly id: FieldRef<"UserDocument", 'String'>
    readonly userId: FieldRef<"UserDocument", 'String'>
    readonly templateId: FieldRef<"UserDocument", 'String'>
    readonly title: FieldRef<"UserDocument", 'String'>
    readonly status: FieldRef<"UserDocument", 'String'>
    readonly answers: FieldRef<"UserDocument", 'String'>
    readonly generatedContent: FieldRef<"UserDocument", 'String'>
    readonly visitorPhone: FieldRef<"UserDocument", 'String'>
    readonly visitorName: FieldRef<"UserDocument", 'String'>
    readonly createdAt: FieldRef<"UserDocument", 'DateTime'>
    readonly updatedAt: FieldRef<"UserDocument", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * UserDocument findUnique
   */
  export type UserDocumentFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserDocument
     */
    select?: UserDocumentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserDocument
     */
    omit?: UserDocumentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserDocumentInclude<ExtArgs> | null
    /**
     * Filter, which UserDocument to fetch.
     */
    where: UserDocumentWhereUniqueInput
  }

  /**
   * UserDocument findUniqueOrThrow
   */
  export type UserDocumentFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserDocument
     */
    select?: UserDocumentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserDocument
     */
    omit?: UserDocumentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserDocumentInclude<ExtArgs> | null
    /**
     * Filter, which UserDocument to fetch.
     */
    where: UserDocumentWhereUniqueInput
  }

  /**
   * UserDocument findFirst
   */
  export type UserDocumentFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserDocument
     */
    select?: UserDocumentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserDocument
     */
    omit?: UserDocumentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserDocumentInclude<ExtArgs> | null
    /**
     * Filter, which UserDocument to fetch.
     */
    where?: UserDocumentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UserDocuments to fetch.
     */
    orderBy?: UserDocumentOrderByWithRelationInput | UserDocumentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for UserDocuments.
     */
    cursor?: UserDocumentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UserDocuments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UserDocuments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of UserDocuments.
     */
    distinct?: UserDocumentScalarFieldEnum | UserDocumentScalarFieldEnum[]
  }

  /**
   * UserDocument findFirstOrThrow
   */
  export type UserDocumentFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserDocument
     */
    select?: UserDocumentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserDocument
     */
    omit?: UserDocumentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserDocumentInclude<ExtArgs> | null
    /**
     * Filter, which UserDocument to fetch.
     */
    where?: UserDocumentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UserDocuments to fetch.
     */
    orderBy?: UserDocumentOrderByWithRelationInput | UserDocumentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for UserDocuments.
     */
    cursor?: UserDocumentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UserDocuments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UserDocuments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of UserDocuments.
     */
    distinct?: UserDocumentScalarFieldEnum | UserDocumentScalarFieldEnum[]
  }

  /**
   * UserDocument findMany
   */
  export type UserDocumentFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserDocument
     */
    select?: UserDocumentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserDocument
     */
    omit?: UserDocumentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserDocumentInclude<ExtArgs> | null
    /**
     * Filter, which UserDocuments to fetch.
     */
    where?: UserDocumentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UserDocuments to fetch.
     */
    orderBy?: UserDocumentOrderByWithRelationInput | UserDocumentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing UserDocuments.
     */
    cursor?: UserDocumentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UserDocuments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UserDocuments.
     */
    skip?: number
    distinct?: UserDocumentScalarFieldEnum | UserDocumentScalarFieldEnum[]
  }

  /**
   * UserDocument create
   */
  export type UserDocumentCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserDocument
     */
    select?: UserDocumentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserDocument
     */
    omit?: UserDocumentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserDocumentInclude<ExtArgs> | null
    /**
     * The data needed to create a UserDocument.
     */
    data: XOR<UserDocumentCreateInput, UserDocumentUncheckedCreateInput>
  }

  /**
   * UserDocument createMany
   */
  export type UserDocumentCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many UserDocuments.
     */
    data: UserDocumentCreateManyInput | UserDocumentCreateManyInput[]
  }

  /**
   * UserDocument createManyAndReturn
   */
  export type UserDocumentCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserDocument
     */
    select?: UserDocumentSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the UserDocument
     */
    omit?: UserDocumentOmit<ExtArgs> | null
    /**
     * The data used to create many UserDocuments.
     */
    data: UserDocumentCreateManyInput | UserDocumentCreateManyInput[]
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserDocumentIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * UserDocument update
   */
  export type UserDocumentUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserDocument
     */
    select?: UserDocumentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserDocument
     */
    omit?: UserDocumentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserDocumentInclude<ExtArgs> | null
    /**
     * The data needed to update a UserDocument.
     */
    data: XOR<UserDocumentUpdateInput, UserDocumentUncheckedUpdateInput>
    /**
     * Choose, which UserDocument to update.
     */
    where: UserDocumentWhereUniqueInput
  }

  /**
   * UserDocument updateMany
   */
  export type UserDocumentUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update UserDocuments.
     */
    data: XOR<UserDocumentUpdateManyMutationInput, UserDocumentUncheckedUpdateManyInput>
    /**
     * Filter which UserDocuments to update
     */
    where?: UserDocumentWhereInput
    /**
     * Limit how many UserDocuments to update.
     */
    limit?: number
  }

  /**
   * UserDocument updateManyAndReturn
   */
  export type UserDocumentUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserDocument
     */
    select?: UserDocumentSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the UserDocument
     */
    omit?: UserDocumentOmit<ExtArgs> | null
    /**
     * The data used to update UserDocuments.
     */
    data: XOR<UserDocumentUpdateManyMutationInput, UserDocumentUncheckedUpdateManyInput>
    /**
     * Filter which UserDocuments to update
     */
    where?: UserDocumentWhereInput
    /**
     * Limit how many UserDocuments to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserDocumentIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * UserDocument upsert
   */
  export type UserDocumentUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserDocument
     */
    select?: UserDocumentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserDocument
     */
    omit?: UserDocumentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserDocumentInclude<ExtArgs> | null
    /**
     * The filter to search for the UserDocument to update in case it exists.
     */
    where: UserDocumentWhereUniqueInput
    /**
     * In case the UserDocument found by the `where` argument doesn't exist, create a new UserDocument with this data.
     */
    create: XOR<UserDocumentCreateInput, UserDocumentUncheckedCreateInput>
    /**
     * In case the UserDocument was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UserDocumentUpdateInput, UserDocumentUncheckedUpdateInput>
  }

  /**
   * UserDocument delete
   */
  export type UserDocumentDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserDocument
     */
    select?: UserDocumentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserDocument
     */
    omit?: UserDocumentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserDocumentInclude<ExtArgs> | null
    /**
     * Filter which UserDocument to delete.
     */
    where: UserDocumentWhereUniqueInput
  }

  /**
   * UserDocument deleteMany
   */
  export type UserDocumentDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which UserDocuments to delete
     */
    where?: UserDocumentWhereInput
    /**
     * Limit how many UserDocuments to delete.
     */
    limit?: number
  }

  /**
   * UserDocument.user
   */
  export type UserDocument$userArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    where?: UserWhereInput
  }

  /**
   * UserDocument without action
   */
  export type UserDocumentDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserDocument
     */
    select?: UserDocumentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserDocument
     */
    omit?: UserDocumentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserDocumentInclude<ExtArgs> | null
  }


  /**
   * Model Contact
   */

  export type AggregateContact = {
    _count: ContactCountAggregateOutputType | null
    _min: ContactMinAggregateOutputType | null
    _max: ContactMaxAggregateOutputType | null
  }

  export type ContactMinAggregateOutputType = {
    id: string | null
    userId: string | null
    name: string | null
    contactType: string | null
    documentType: string | null
    documentNumber: string | null
    address: string | null
    city: string | null
    phone: string | null
    email: string | null
    companyName: string | null
    notes: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ContactMaxAggregateOutputType = {
    id: string | null
    userId: string | null
    name: string | null
    contactType: string | null
    documentType: string | null
    documentNumber: string | null
    address: string | null
    city: string | null
    phone: string | null
    email: string | null
    companyName: string | null
    notes: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ContactCountAggregateOutputType = {
    id: number
    userId: number
    name: number
    contactType: number
    documentType: number
    documentNumber: number
    address: number
    city: number
    phone: number
    email: number
    companyName: number
    notes: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type ContactMinAggregateInputType = {
    id?: true
    userId?: true
    name?: true
    contactType?: true
    documentType?: true
    documentNumber?: true
    address?: true
    city?: true
    phone?: true
    email?: true
    companyName?: true
    notes?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ContactMaxAggregateInputType = {
    id?: true
    userId?: true
    name?: true
    contactType?: true
    documentType?: true
    documentNumber?: true
    address?: true
    city?: true
    phone?: true
    email?: true
    companyName?: true
    notes?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ContactCountAggregateInputType = {
    id?: true
    userId?: true
    name?: true
    contactType?: true
    documentType?: true
    documentNumber?: true
    address?: true
    city?: true
    phone?: true
    email?: true
    companyName?: true
    notes?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type ContactAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Contact to aggregate.
     */
    where?: ContactWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Contacts to fetch.
     */
    orderBy?: ContactOrderByWithRelationInput | ContactOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ContactWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Contacts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Contacts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Contacts
    **/
    _count?: true | ContactCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ContactMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ContactMaxAggregateInputType
  }

  export type GetContactAggregateType<T extends ContactAggregateArgs> = {
        [P in keyof T & keyof AggregateContact]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateContact[P]>
      : GetScalarType<T[P], AggregateContact[P]>
  }




  export type ContactGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ContactWhereInput
    orderBy?: ContactOrderByWithAggregationInput | ContactOrderByWithAggregationInput[]
    by: ContactScalarFieldEnum[] | ContactScalarFieldEnum
    having?: ContactScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ContactCountAggregateInputType | true
    _min?: ContactMinAggregateInputType
    _max?: ContactMaxAggregateInputType
  }

  export type ContactGroupByOutputType = {
    id: string
    userId: string
    name: string
    contactType: string
    documentType: string | null
    documentNumber: string | null
    address: string | null
    city: string | null
    phone: string | null
    email: string | null
    companyName: string | null
    notes: string | null
    createdAt: Date
    updatedAt: Date
    _count: ContactCountAggregateOutputType | null
    _min: ContactMinAggregateOutputType | null
    _max: ContactMaxAggregateOutputType | null
  }

  type GetContactGroupByPayload<T extends ContactGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ContactGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ContactGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ContactGroupByOutputType[P]>
            : GetScalarType<T[P], ContactGroupByOutputType[P]>
        }
      >
    >


  export type ContactSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    name?: boolean
    contactType?: boolean
    documentType?: boolean
    documentNumber?: boolean
    address?: boolean
    city?: boolean
    phone?: boolean
    email?: boolean
    companyName?: boolean
    notes?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["contact"]>

  export type ContactSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    name?: boolean
    contactType?: boolean
    documentType?: boolean
    documentNumber?: boolean
    address?: boolean
    city?: boolean
    phone?: boolean
    email?: boolean
    companyName?: boolean
    notes?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["contact"]>

  export type ContactSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    name?: boolean
    contactType?: boolean
    documentType?: boolean
    documentNumber?: boolean
    address?: boolean
    city?: boolean
    phone?: boolean
    email?: boolean
    companyName?: boolean
    notes?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["contact"]>

  export type ContactSelectScalar = {
    id?: boolean
    userId?: boolean
    name?: boolean
    contactType?: boolean
    documentType?: boolean
    documentNumber?: boolean
    address?: boolean
    city?: boolean
    phone?: boolean
    email?: boolean
    companyName?: boolean
    notes?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type ContactOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "userId" | "name" | "contactType" | "documentType" | "documentNumber" | "address" | "city" | "phone" | "email" | "companyName" | "notes" | "createdAt" | "updatedAt", ExtArgs["result"]["contact"]>
  export type ContactInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type ContactIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type ContactIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $ContactPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Contact"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      userId: string
      name: string
      contactType: string
      documentType: string | null
      documentNumber: string | null
      address: string | null
      city: string | null
      phone: string | null
      email: string | null
      companyName: string | null
      notes: string | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["contact"]>
    composites: {}
  }

  type ContactGetPayload<S extends boolean | null | undefined | ContactDefaultArgs> = $Result.GetResult<Prisma.$ContactPayload, S>

  type ContactCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ContactFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ContactCountAggregateInputType | true
    }

  export interface ContactDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Contact'], meta: { name: 'Contact' } }
    /**
     * Find zero or one Contact that matches the filter.
     * @param {ContactFindUniqueArgs} args - Arguments to find a Contact
     * @example
     * // Get one Contact
     * const contact = await prisma.contact.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ContactFindUniqueArgs>(args: SelectSubset<T, ContactFindUniqueArgs<ExtArgs>>): Prisma__ContactClient<$Result.GetResult<Prisma.$ContactPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Contact that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ContactFindUniqueOrThrowArgs} args - Arguments to find a Contact
     * @example
     * // Get one Contact
     * const contact = await prisma.contact.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ContactFindUniqueOrThrowArgs>(args: SelectSubset<T, ContactFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ContactClient<$Result.GetResult<Prisma.$ContactPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Contact that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ContactFindFirstArgs} args - Arguments to find a Contact
     * @example
     * // Get one Contact
     * const contact = await prisma.contact.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ContactFindFirstArgs>(args?: SelectSubset<T, ContactFindFirstArgs<ExtArgs>>): Prisma__ContactClient<$Result.GetResult<Prisma.$ContactPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Contact that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ContactFindFirstOrThrowArgs} args - Arguments to find a Contact
     * @example
     * // Get one Contact
     * const contact = await prisma.contact.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ContactFindFirstOrThrowArgs>(args?: SelectSubset<T, ContactFindFirstOrThrowArgs<ExtArgs>>): Prisma__ContactClient<$Result.GetResult<Prisma.$ContactPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Contacts that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ContactFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Contacts
     * const contacts = await prisma.contact.findMany()
     * 
     * // Get first 10 Contacts
     * const contacts = await prisma.contact.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const contactWithIdOnly = await prisma.contact.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ContactFindManyArgs>(args?: SelectSubset<T, ContactFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ContactPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Contact.
     * @param {ContactCreateArgs} args - Arguments to create a Contact.
     * @example
     * // Create one Contact
     * const Contact = await prisma.contact.create({
     *   data: {
     *     // ... data to create a Contact
     *   }
     * })
     * 
     */
    create<T extends ContactCreateArgs>(args: SelectSubset<T, ContactCreateArgs<ExtArgs>>): Prisma__ContactClient<$Result.GetResult<Prisma.$ContactPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Contacts.
     * @param {ContactCreateManyArgs} args - Arguments to create many Contacts.
     * @example
     * // Create many Contacts
     * const contact = await prisma.contact.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ContactCreateManyArgs>(args?: SelectSubset<T, ContactCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Contacts and returns the data saved in the database.
     * @param {ContactCreateManyAndReturnArgs} args - Arguments to create many Contacts.
     * @example
     * // Create many Contacts
     * const contact = await prisma.contact.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Contacts and only return the `id`
     * const contactWithIdOnly = await prisma.contact.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ContactCreateManyAndReturnArgs>(args?: SelectSubset<T, ContactCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ContactPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Contact.
     * @param {ContactDeleteArgs} args - Arguments to delete one Contact.
     * @example
     * // Delete one Contact
     * const Contact = await prisma.contact.delete({
     *   where: {
     *     // ... filter to delete one Contact
     *   }
     * })
     * 
     */
    delete<T extends ContactDeleteArgs>(args: SelectSubset<T, ContactDeleteArgs<ExtArgs>>): Prisma__ContactClient<$Result.GetResult<Prisma.$ContactPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Contact.
     * @param {ContactUpdateArgs} args - Arguments to update one Contact.
     * @example
     * // Update one Contact
     * const contact = await prisma.contact.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ContactUpdateArgs>(args: SelectSubset<T, ContactUpdateArgs<ExtArgs>>): Prisma__ContactClient<$Result.GetResult<Prisma.$ContactPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Contacts.
     * @param {ContactDeleteManyArgs} args - Arguments to filter Contacts to delete.
     * @example
     * // Delete a few Contacts
     * const { count } = await prisma.contact.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ContactDeleteManyArgs>(args?: SelectSubset<T, ContactDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Contacts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ContactUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Contacts
     * const contact = await prisma.contact.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ContactUpdateManyArgs>(args: SelectSubset<T, ContactUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Contacts and returns the data updated in the database.
     * @param {ContactUpdateManyAndReturnArgs} args - Arguments to update many Contacts.
     * @example
     * // Update many Contacts
     * const contact = await prisma.contact.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Contacts and only return the `id`
     * const contactWithIdOnly = await prisma.contact.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends ContactUpdateManyAndReturnArgs>(args: SelectSubset<T, ContactUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ContactPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Contact.
     * @param {ContactUpsertArgs} args - Arguments to update or create a Contact.
     * @example
     * // Update or create a Contact
     * const contact = await prisma.contact.upsert({
     *   create: {
     *     // ... data to create a Contact
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Contact we want to update
     *   }
     * })
     */
    upsert<T extends ContactUpsertArgs>(args: SelectSubset<T, ContactUpsertArgs<ExtArgs>>): Prisma__ContactClient<$Result.GetResult<Prisma.$ContactPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Contacts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ContactCountArgs} args - Arguments to filter Contacts to count.
     * @example
     * // Count the number of Contacts
     * const count = await prisma.contact.count({
     *   where: {
     *     // ... the filter for the Contacts we want to count
     *   }
     * })
    **/
    count<T extends ContactCountArgs>(
      args?: Subset<T, ContactCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ContactCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Contact.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ContactAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ContactAggregateArgs>(args: Subset<T, ContactAggregateArgs>): Prisma.PrismaPromise<GetContactAggregateType<T>>

    /**
     * Group by Contact.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ContactGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ContactGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ContactGroupByArgs['orderBy'] }
        : { orderBy?: ContactGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ContactGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetContactGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Contact model
   */
  readonly fields: ContactFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Contact.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ContactClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Contact model
   */
  interface ContactFieldRefs {
    readonly id: FieldRef<"Contact", 'String'>
    readonly userId: FieldRef<"Contact", 'String'>
    readonly name: FieldRef<"Contact", 'String'>
    readonly contactType: FieldRef<"Contact", 'String'>
    readonly documentType: FieldRef<"Contact", 'String'>
    readonly documentNumber: FieldRef<"Contact", 'String'>
    readonly address: FieldRef<"Contact", 'String'>
    readonly city: FieldRef<"Contact", 'String'>
    readonly phone: FieldRef<"Contact", 'String'>
    readonly email: FieldRef<"Contact", 'String'>
    readonly companyName: FieldRef<"Contact", 'String'>
    readonly notes: FieldRef<"Contact", 'String'>
    readonly createdAt: FieldRef<"Contact", 'DateTime'>
    readonly updatedAt: FieldRef<"Contact", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Contact findUnique
   */
  export type ContactFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Contact
     */
    select?: ContactSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Contact
     */
    omit?: ContactOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ContactInclude<ExtArgs> | null
    /**
     * Filter, which Contact to fetch.
     */
    where: ContactWhereUniqueInput
  }

  /**
   * Contact findUniqueOrThrow
   */
  export type ContactFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Contact
     */
    select?: ContactSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Contact
     */
    omit?: ContactOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ContactInclude<ExtArgs> | null
    /**
     * Filter, which Contact to fetch.
     */
    where: ContactWhereUniqueInput
  }

  /**
   * Contact findFirst
   */
  export type ContactFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Contact
     */
    select?: ContactSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Contact
     */
    omit?: ContactOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ContactInclude<ExtArgs> | null
    /**
     * Filter, which Contact to fetch.
     */
    where?: ContactWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Contacts to fetch.
     */
    orderBy?: ContactOrderByWithRelationInput | ContactOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Contacts.
     */
    cursor?: ContactWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Contacts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Contacts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Contacts.
     */
    distinct?: ContactScalarFieldEnum | ContactScalarFieldEnum[]
  }

  /**
   * Contact findFirstOrThrow
   */
  export type ContactFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Contact
     */
    select?: ContactSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Contact
     */
    omit?: ContactOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ContactInclude<ExtArgs> | null
    /**
     * Filter, which Contact to fetch.
     */
    where?: ContactWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Contacts to fetch.
     */
    orderBy?: ContactOrderByWithRelationInput | ContactOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Contacts.
     */
    cursor?: ContactWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Contacts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Contacts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Contacts.
     */
    distinct?: ContactScalarFieldEnum | ContactScalarFieldEnum[]
  }

  /**
   * Contact findMany
   */
  export type ContactFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Contact
     */
    select?: ContactSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Contact
     */
    omit?: ContactOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ContactInclude<ExtArgs> | null
    /**
     * Filter, which Contacts to fetch.
     */
    where?: ContactWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Contacts to fetch.
     */
    orderBy?: ContactOrderByWithRelationInput | ContactOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Contacts.
     */
    cursor?: ContactWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Contacts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Contacts.
     */
    skip?: number
    distinct?: ContactScalarFieldEnum | ContactScalarFieldEnum[]
  }

  /**
   * Contact create
   */
  export type ContactCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Contact
     */
    select?: ContactSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Contact
     */
    omit?: ContactOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ContactInclude<ExtArgs> | null
    /**
     * The data needed to create a Contact.
     */
    data: XOR<ContactCreateInput, ContactUncheckedCreateInput>
  }

  /**
   * Contact createMany
   */
  export type ContactCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Contacts.
     */
    data: ContactCreateManyInput | ContactCreateManyInput[]
  }

  /**
   * Contact createManyAndReturn
   */
  export type ContactCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Contact
     */
    select?: ContactSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Contact
     */
    omit?: ContactOmit<ExtArgs> | null
    /**
     * The data used to create many Contacts.
     */
    data: ContactCreateManyInput | ContactCreateManyInput[]
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ContactIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Contact update
   */
  export type ContactUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Contact
     */
    select?: ContactSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Contact
     */
    omit?: ContactOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ContactInclude<ExtArgs> | null
    /**
     * The data needed to update a Contact.
     */
    data: XOR<ContactUpdateInput, ContactUncheckedUpdateInput>
    /**
     * Choose, which Contact to update.
     */
    where: ContactWhereUniqueInput
  }

  /**
   * Contact updateMany
   */
  export type ContactUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Contacts.
     */
    data: XOR<ContactUpdateManyMutationInput, ContactUncheckedUpdateManyInput>
    /**
     * Filter which Contacts to update
     */
    where?: ContactWhereInput
    /**
     * Limit how many Contacts to update.
     */
    limit?: number
  }

  /**
   * Contact updateManyAndReturn
   */
  export type ContactUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Contact
     */
    select?: ContactSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Contact
     */
    omit?: ContactOmit<ExtArgs> | null
    /**
     * The data used to update Contacts.
     */
    data: XOR<ContactUpdateManyMutationInput, ContactUncheckedUpdateManyInput>
    /**
     * Filter which Contacts to update
     */
    where?: ContactWhereInput
    /**
     * Limit how many Contacts to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ContactIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Contact upsert
   */
  export type ContactUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Contact
     */
    select?: ContactSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Contact
     */
    omit?: ContactOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ContactInclude<ExtArgs> | null
    /**
     * The filter to search for the Contact to update in case it exists.
     */
    where: ContactWhereUniqueInput
    /**
     * In case the Contact found by the `where` argument doesn't exist, create a new Contact with this data.
     */
    create: XOR<ContactCreateInput, ContactUncheckedCreateInput>
    /**
     * In case the Contact was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ContactUpdateInput, ContactUncheckedUpdateInput>
  }

  /**
   * Contact delete
   */
  export type ContactDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Contact
     */
    select?: ContactSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Contact
     */
    omit?: ContactOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ContactInclude<ExtArgs> | null
    /**
     * Filter which Contact to delete.
     */
    where: ContactWhereUniqueInput
  }

  /**
   * Contact deleteMany
   */
  export type ContactDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Contacts to delete
     */
    where?: ContactWhereInput
    /**
     * Limit how many Contacts to delete.
     */
    limit?: number
  }

  /**
   * Contact without action
   */
  export type ContactDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Contact
     */
    select?: ContactSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Contact
     */
    omit?: ContactOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ContactInclude<ExtArgs> | null
  }


  /**
   * Model DocumentRequest
   */

  export type AggregateDocumentRequest = {
    _count: DocumentRequestCountAggregateOutputType | null
    _min: DocumentRequestMinAggregateOutputType | null
    _max: DocumentRequestMaxAggregateOutputType | null
  }

  export type DocumentRequestMinAggregateOutputType = {
    id: string | null
    userId: string | null
    title: string | null
    description: string | null
    status: string | null
    adminNotes: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type DocumentRequestMaxAggregateOutputType = {
    id: string | null
    userId: string | null
    title: string | null
    description: string | null
    status: string | null
    adminNotes: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type DocumentRequestCountAggregateOutputType = {
    id: number
    userId: number
    title: number
    description: number
    status: number
    adminNotes: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type DocumentRequestMinAggregateInputType = {
    id?: true
    userId?: true
    title?: true
    description?: true
    status?: true
    adminNotes?: true
    createdAt?: true
    updatedAt?: true
  }

  export type DocumentRequestMaxAggregateInputType = {
    id?: true
    userId?: true
    title?: true
    description?: true
    status?: true
    adminNotes?: true
    createdAt?: true
    updatedAt?: true
  }

  export type DocumentRequestCountAggregateInputType = {
    id?: true
    userId?: true
    title?: true
    description?: true
    status?: true
    adminNotes?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type DocumentRequestAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which DocumentRequest to aggregate.
     */
    where?: DocumentRequestWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of DocumentRequests to fetch.
     */
    orderBy?: DocumentRequestOrderByWithRelationInput | DocumentRequestOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: DocumentRequestWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` DocumentRequests from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` DocumentRequests.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned DocumentRequests
    **/
    _count?: true | DocumentRequestCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: DocumentRequestMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: DocumentRequestMaxAggregateInputType
  }

  export type GetDocumentRequestAggregateType<T extends DocumentRequestAggregateArgs> = {
        [P in keyof T & keyof AggregateDocumentRequest]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateDocumentRequest[P]>
      : GetScalarType<T[P], AggregateDocumentRequest[P]>
  }




  export type DocumentRequestGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: DocumentRequestWhereInput
    orderBy?: DocumentRequestOrderByWithAggregationInput | DocumentRequestOrderByWithAggregationInput[]
    by: DocumentRequestScalarFieldEnum[] | DocumentRequestScalarFieldEnum
    having?: DocumentRequestScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: DocumentRequestCountAggregateInputType | true
    _min?: DocumentRequestMinAggregateInputType
    _max?: DocumentRequestMaxAggregateInputType
  }

  export type DocumentRequestGroupByOutputType = {
    id: string
    userId: string | null
    title: string
    description: string
    status: string
    adminNotes: string | null
    createdAt: Date
    updatedAt: Date
    _count: DocumentRequestCountAggregateOutputType | null
    _min: DocumentRequestMinAggregateOutputType | null
    _max: DocumentRequestMaxAggregateOutputType | null
  }

  type GetDocumentRequestGroupByPayload<T extends DocumentRequestGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<DocumentRequestGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof DocumentRequestGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], DocumentRequestGroupByOutputType[P]>
            : GetScalarType<T[P], DocumentRequestGroupByOutputType[P]>
        }
      >
    >


  export type DocumentRequestSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    title?: boolean
    description?: boolean
    status?: boolean
    adminNotes?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["documentRequest"]>

  export type DocumentRequestSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    title?: boolean
    description?: boolean
    status?: boolean
    adminNotes?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["documentRequest"]>

  export type DocumentRequestSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    title?: boolean
    description?: boolean
    status?: boolean
    adminNotes?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["documentRequest"]>

  export type DocumentRequestSelectScalar = {
    id?: boolean
    userId?: boolean
    title?: boolean
    description?: boolean
    status?: boolean
    adminNotes?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type DocumentRequestOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "userId" | "title" | "description" | "status" | "adminNotes" | "createdAt" | "updatedAt", ExtArgs["result"]["documentRequest"]>

  export type $DocumentRequestPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "DocumentRequest"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      userId: string | null
      title: string
      description: string
      status: string
      adminNotes: string | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["documentRequest"]>
    composites: {}
  }

  type DocumentRequestGetPayload<S extends boolean | null | undefined | DocumentRequestDefaultArgs> = $Result.GetResult<Prisma.$DocumentRequestPayload, S>

  type DocumentRequestCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<DocumentRequestFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: DocumentRequestCountAggregateInputType | true
    }

  export interface DocumentRequestDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['DocumentRequest'], meta: { name: 'DocumentRequest' } }
    /**
     * Find zero or one DocumentRequest that matches the filter.
     * @param {DocumentRequestFindUniqueArgs} args - Arguments to find a DocumentRequest
     * @example
     * // Get one DocumentRequest
     * const documentRequest = await prisma.documentRequest.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends DocumentRequestFindUniqueArgs>(args: SelectSubset<T, DocumentRequestFindUniqueArgs<ExtArgs>>): Prisma__DocumentRequestClient<$Result.GetResult<Prisma.$DocumentRequestPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one DocumentRequest that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {DocumentRequestFindUniqueOrThrowArgs} args - Arguments to find a DocumentRequest
     * @example
     * // Get one DocumentRequest
     * const documentRequest = await prisma.documentRequest.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends DocumentRequestFindUniqueOrThrowArgs>(args: SelectSubset<T, DocumentRequestFindUniqueOrThrowArgs<ExtArgs>>): Prisma__DocumentRequestClient<$Result.GetResult<Prisma.$DocumentRequestPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first DocumentRequest that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DocumentRequestFindFirstArgs} args - Arguments to find a DocumentRequest
     * @example
     * // Get one DocumentRequest
     * const documentRequest = await prisma.documentRequest.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends DocumentRequestFindFirstArgs>(args?: SelectSubset<T, DocumentRequestFindFirstArgs<ExtArgs>>): Prisma__DocumentRequestClient<$Result.GetResult<Prisma.$DocumentRequestPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first DocumentRequest that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DocumentRequestFindFirstOrThrowArgs} args - Arguments to find a DocumentRequest
     * @example
     * // Get one DocumentRequest
     * const documentRequest = await prisma.documentRequest.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends DocumentRequestFindFirstOrThrowArgs>(args?: SelectSubset<T, DocumentRequestFindFirstOrThrowArgs<ExtArgs>>): Prisma__DocumentRequestClient<$Result.GetResult<Prisma.$DocumentRequestPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more DocumentRequests that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DocumentRequestFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all DocumentRequests
     * const documentRequests = await prisma.documentRequest.findMany()
     * 
     * // Get first 10 DocumentRequests
     * const documentRequests = await prisma.documentRequest.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const documentRequestWithIdOnly = await prisma.documentRequest.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends DocumentRequestFindManyArgs>(args?: SelectSubset<T, DocumentRequestFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DocumentRequestPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a DocumentRequest.
     * @param {DocumentRequestCreateArgs} args - Arguments to create a DocumentRequest.
     * @example
     * // Create one DocumentRequest
     * const DocumentRequest = await prisma.documentRequest.create({
     *   data: {
     *     // ... data to create a DocumentRequest
     *   }
     * })
     * 
     */
    create<T extends DocumentRequestCreateArgs>(args: SelectSubset<T, DocumentRequestCreateArgs<ExtArgs>>): Prisma__DocumentRequestClient<$Result.GetResult<Prisma.$DocumentRequestPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many DocumentRequests.
     * @param {DocumentRequestCreateManyArgs} args - Arguments to create many DocumentRequests.
     * @example
     * // Create many DocumentRequests
     * const documentRequest = await prisma.documentRequest.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends DocumentRequestCreateManyArgs>(args?: SelectSubset<T, DocumentRequestCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many DocumentRequests and returns the data saved in the database.
     * @param {DocumentRequestCreateManyAndReturnArgs} args - Arguments to create many DocumentRequests.
     * @example
     * // Create many DocumentRequests
     * const documentRequest = await prisma.documentRequest.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many DocumentRequests and only return the `id`
     * const documentRequestWithIdOnly = await prisma.documentRequest.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends DocumentRequestCreateManyAndReturnArgs>(args?: SelectSubset<T, DocumentRequestCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DocumentRequestPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a DocumentRequest.
     * @param {DocumentRequestDeleteArgs} args - Arguments to delete one DocumentRequest.
     * @example
     * // Delete one DocumentRequest
     * const DocumentRequest = await prisma.documentRequest.delete({
     *   where: {
     *     // ... filter to delete one DocumentRequest
     *   }
     * })
     * 
     */
    delete<T extends DocumentRequestDeleteArgs>(args: SelectSubset<T, DocumentRequestDeleteArgs<ExtArgs>>): Prisma__DocumentRequestClient<$Result.GetResult<Prisma.$DocumentRequestPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one DocumentRequest.
     * @param {DocumentRequestUpdateArgs} args - Arguments to update one DocumentRequest.
     * @example
     * // Update one DocumentRequest
     * const documentRequest = await prisma.documentRequest.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends DocumentRequestUpdateArgs>(args: SelectSubset<T, DocumentRequestUpdateArgs<ExtArgs>>): Prisma__DocumentRequestClient<$Result.GetResult<Prisma.$DocumentRequestPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more DocumentRequests.
     * @param {DocumentRequestDeleteManyArgs} args - Arguments to filter DocumentRequests to delete.
     * @example
     * // Delete a few DocumentRequests
     * const { count } = await prisma.documentRequest.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends DocumentRequestDeleteManyArgs>(args?: SelectSubset<T, DocumentRequestDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more DocumentRequests.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DocumentRequestUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many DocumentRequests
     * const documentRequest = await prisma.documentRequest.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends DocumentRequestUpdateManyArgs>(args: SelectSubset<T, DocumentRequestUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more DocumentRequests and returns the data updated in the database.
     * @param {DocumentRequestUpdateManyAndReturnArgs} args - Arguments to update many DocumentRequests.
     * @example
     * // Update many DocumentRequests
     * const documentRequest = await prisma.documentRequest.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more DocumentRequests and only return the `id`
     * const documentRequestWithIdOnly = await prisma.documentRequest.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends DocumentRequestUpdateManyAndReturnArgs>(args: SelectSubset<T, DocumentRequestUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DocumentRequestPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one DocumentRequest.
     * @param {DocumentRequestUpsertArgs} args - Arguments to update or create a DocumentRequest.
     * @example
     * // Update or create a DocumentRequest
     * const documentRequest = await prisma.documentRequest.upsert({
     *   create: {
     *     // ... data to create a DocumentRequest
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the DocumentRequest we want to update
     *   }
     * })
     */
    upsert<T extends DocumentRequestUpsertArgs>(args: SelectSubset<T, DocumentRequestUpsertArgs<ExtArgs>>): Prisma__DocumentRequestClient<$Result.GetResult<Prisma.$DocumentRequestPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of DocumentRequests.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DocumentRequestCountArgs} args - Arguments to filter DocumentRequests to count.
     * @example
     * // Count the number of DocumentRequests
     * const count = await prisma.documentRequest.count({
     *   where: {
     *     // ... the filter for the DocumentRequests we want to count
     *   }
     * })
    **/
    count<T extends DocumentRequestCountArgs>(
      args?: Subset<T, DocumentRequestCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], DocumentRequestCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a DocumentRequest.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DocumentRequestAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends DocumentRequestAggregateArgs>(args: Subset<T, DocumentRequestAggregateArgs>): Prisma.PrismaPromise<GetDocumentRequestAggregateType<T>>

    /**
     * Group by DocumentRequest.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DocumentRequestGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends DocumentRequestGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: DocumentRequestGroupByArgs['orderBy'] }
        : { orderBy?: DocumentRequestGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, DocumentRequestGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetDocumentRequestGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the DocumentRequest model
   */
  readonly fields: DocumentRequestFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for DocumentRequest.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__DocumentRequestClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the DocumentRequest model
   */
  interface DocumentRequestFieldRefs {
    readonly id: FieldRef<"DocumentRequest", 'String'>
    readonly userId: FieldRef<"DocumentRequest", 'String'>
    readonly title: FieldRef<"DocumentRequest", 'String'>
    readonly description: FieldRef<"DocumentRequest", 'String'>
    readonly status: FieldRef<"DocumentRequest", 'String'>
    readonly adminNotes: FieldRef<"DocumentRequest", 'String'>
    readonly createdAt: FieldRef<"DocumentRequest", 'DateTime'>
    readonly updatedAt: FieldRef<"DocumentRequest", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * DocumentRequest findUnique
   */
  export type DocumentRequestFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DocumentRequest
     */
    select?: DocumentRequestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DocumentRequest
     */
    omit?: DocumentRequestOmit<ExtArgs> | null
    /**
     * Filter, which DocumentRequest to fetch.
     */
    where: DocumentRequestWhereUniqueInput
  }

  /**
   * DocumentRequest findUniqueOrThrow
   */
  export type DocumentRequestFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DocumentRequest
     */
    select?: DocumentRequestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DocumentRequest
     */
    omit?: DocumentRequestOmit<ExtArgs> | null
    /**
     * Filter, which DocumentRequest to fetch.
     */
    where: DocumentRequestWhereUniqueInput
  }

  /**
   * DocumentRequest findFirst
   */
  export type DocumentRequestFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DocumentRequest
     */
    select?: DocumentRequestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DocumentRequest
     */
    omit?: DocumentRequestOmit<ExtArgs> | null
    /**
     * Filter, which DocumentRequest to fetch.
     */
    where?: DocumentRequestWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of DocumentRequests to fetch.
     */
    orderBy?: DocumentRequestOrderByWithRelationInput | DocumentRequestOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for DocumentRequests.
     */
    cursor?: DocumentRequestWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` DocumentRequests from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` DocumentRequests.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of DocumentRequests.
     */
    distinct?: DocumentRequestScalarFieldEnum | DocumentRequestScalarFieldEnum[]
  }

  /**
   * DocumentRequest findFirstOrThrow
   */
  export type DocumentRequestFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DocumentRequest
     */
    select?: DocumentRequestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DocumentRequest
     */
    omit?: DocumentRequestOmit<ExtArgs> | null
    /**
     * Filter, which DocumentRequest to fetch.
     */
    where?: DocumentRequestWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of DocumentRequests to fetch.
     */
    orderBy?: DocumentRequestOrderByWithRelationInput | DocumentRequestOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for DocumentRequests.
     */
    cursor?: DocumentRequestWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` DocumentRequests from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` DocumentRequests.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of DocumentRequests.
     */
    distinct?: DocumentRequestScalarFieldEnum | DocumentRequestScalarFieldEnum[]
  }

  /**
   * DocumentRequest findMany
   */
  export type DocumentRequestFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DocumentRequest
     */
    select?: DocumentRequestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DocumentRequest
     */
    omit?: DocumentRequestOmit<ExtArgs> | null
    /**
     * Filter, which DocumentRequests to fetch.
     */
    where?: DocumentRequestWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of DocumentRequests to fetch.
     */
    orderBy?: DocumentRequestOrderByWithRelationInput | DocumentRequestOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing DocumentRequests.
     */
    cursor?: DocumentRequestWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` DocumentRequests from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` DocumentRequests.
     */
    skip?: number
    distinct?: DocumentRequestScalarFieldEnum | DocumentRequestScalarFieldEnum[]
  }

  /**
   * DocumentRequest create
   */
  export type DocumentRequestCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DocumentRequest
     */
    select?: DocumentRequestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DocumentRequest
     */
    omit?: DocumentRequestOmit<ExtArgs> | null
    /**
     * The data needed to create a DocumentRequest.
     */
    data: XOR<DocumentRequestCreateInput, DocumentRequestUncheckedCreateInput>
  }

  /**
   * DocumentRequest createMany
   */
  export type DocumentRequestCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many DocumentRequests.
     */
    data: DocumentRequestCreateManyInput | DocumentRequestCreateManyInput[]
  }

  /**
   * DocumentRequest createManyAndReturn
   */
  export type DocumentRequestCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DocumentRequest
     */
    select?: DocumentRequestSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the DocumentRequest
     */
    omit?: DocumentRequestOmit<ExtArgs> | null
    /**
     * The data used to create many DocumentRequests.
     */
    data: DocumentRequestCreateManyInput | DocumentRequestCreateManyInput[]
  }

  /**
   * DocumentRequest update
   */
  export type DocumentRequestUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DocumentRequest
     */
    select?: DocumentRequestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DocumentRequest
     */
    omit?: DocumentRequestOmit<ExtArgs> | null
    /**
     * The data needed to update a DocumentRequest.
     */
    data: XOR<DocumentRequestUpdateInput, DocumentRequestUncheckedUpdateInput>
    /**
     * Choose, which DocumentRequest to update.
     */
    where: DocumentRequestWhereUniqueInput
  }

  /**
   * DocumentRequest updateMany
   */
  export type DocumentRequestUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update DocumentRequests.
     */
    data: XOR<DocumentRequestUpdateManyMutationInput, DocumentRequestUncheckedUpdateManyInput>
    /**
     * Filter which DocumentRequests to update
     */
    where?: DocumentRequestWhereInput
    /**
     * Limit how many DocumentRequests to update.
     */
    limit?: number
  }

  /**
   * DocumentRequest updateManyAndReturn
   */
  export type DocumentRequestUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DocumentRequest
     */
    select?: DocumentRequestSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the DocumentRequest
     */
    omit?: DocumentRequestOmit<ExtArgs> | null
    /**
     * The data used to update DocumentRequests.
     */
    data: XOR<DocumentRequestUpdateManyMutationInput, DocumentRequestUncheckedUpdateManyInput>
    /**
     * Filter which DocumentRequests to update
     */
    where?: DocumentRequestWhereInput
    /**
     * Limit how many DocumentRequests to update.
     */
    limit?: number
  }

  /**
   * DocumentRequest upsert
   */
  export type DocumentRequestUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DocumentRequest
     */
    select?: DocumentRequestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DocumentRequest
     */
    omit?: DocumentRequestOmit<ExtArgs> | null
    /**
     * The filter to search for the DocumentRequest to update in case it exists.
     */
    where: DocumentRequestWhereUniqueInput
    /**
     * In case the DocumentRequest found by the `where` argument doesn't exist, create a new DocumentRequest with this data.
     */
    create: XOR<DocumentRequestCreateInput, DocumentRequestUncheckedCreateInput>
    /**
     * In case the DocumentRequest was found with the provided `where` argument, update it with this data.
     */
    update: XOR<DocumentRequestUpdateInput, DocumentRequestUncheckedUpdateInput>
  }

  /**
   * DocumentRequest delete
   */
  export type DocumentRequestDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DocumentRequest
     */
    select?: DocumentRequestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DocumentRequest
     */
    omit?: DocumentRequestOmit<ExtArgs> | null
    /**
     * Filter which DocumentRequest to delete.
     */
    where: DocumentRequestWhereUniqueInput
  }

  /**
   * DocumentRequest deleteMany
   */
  export type DocumentRequestDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which DocumentRequests to delete
     */
    where?: DocumentRequestWhereInput
    /**
     * Limit how many DocumentRequests to delete.
     */
    limit?: number
  }

  /**
   * DocumentRequest without action
   */
  export type DocumentRequestDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DocumentRequest
     */
    select?: DocumentRequestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DocumentRequest
     */
    omit?: DocumentRequestOmit<ExtArgs> | null
  }


  /**
   * Model SiteSetting
   */

  export type AggregateSiteSetting = {
    _count: SiteSettingCountAggregateOutputType | null
    _min: SiteSettingMinAggregateOutputType | null
    _max: SiteSettingMaxAggregateOutputType | null
  }

  export type SiteSettingMinAggregateOutputType = {
    id: string | null
    key: string | null
    value: string | null
    updatedAt: Date | null
  }

  export type SiteSettingMaxAggregateOutputType = {
    id: string | null
    key: string | null
    value: string | null
    updatedAt: Date | null
  }

  export type SiteSettingCountAggregateOutputType = {
    id: number
    key: number
    value: number
    updatedAt: number
    _all: number
  }


  export type SiteSettingMinAggregateInputType = {
    id?: true
    key?: true
    value?: true
    updatedAt?: true
  }

  export type SiteSettingMaxAggregateInputType = {
    id?: true
    key?: true
    value?: true
    updatedAt?: true
  }

  export type SiteSettingCountAggregateInputType = {
    id?: true
    key?: true
    value?: true
    updatedAt?: true
    _all?: true
  }

  export type SiteSettingAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which SiteSetting to aggregate.
     */
    where?: SiteSettingWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SiteSettings to fetch.
     */
    orderBy?: SiteSettingOrderByWithRelationInput | SiteSettingOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: SiteSettingWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SiteSettings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SiteSettings.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned SiteSettings
    **/
    _count?: true | SiteSettingCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: SiteSettingMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: SiteSettingMaxAggregateInputType
  }

  export type GetSiteSettingAggregateType<T extends SiteSettingAggregateArgs> = {
        [P in keyof T & keyof AggregateSiteSetting]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateSiteSetting[P]>
      : GetScalarType<T[P], AggregateSiteSetting[P]>
  }




  export type SiteSettingGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SiteSettingWhereInput
    orderBy?: SiteSettingOrderByWithAggregationInput | SiteSettingOrderByWithAggregationInput[]
    by: SiteSettingScalarFieldEnum[] | SiteSettingScalarFieldEnum
    having?: SiteSettingScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: SiteSettingCountAggregateInputType | true
    _min?: SiteSettingMinAggregateInputType
    _max?: SiteSettingMaxAggregateInputType
  }

  export type SiteSettingGroupByOutputType = {
    id: string
    key: string
    value: string
    updatedAt: Date
    _count: SiteSettingCountAggregateOutputType | null
    _min: SiteSettingMinAggregateOutputType | null
    _max: SiteSettingMaxAggregateOutputType | null
  }

  type GetSiteSettingGroupByPayload<T extends SiteSettingGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<SiteSettingGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof SiteSettingGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], SiteSettingGroupByOutputType[P]>
            : GetScalarType<T[P], SiteSettingGroupByOutputType[P]>
        }
      >
    >


  export type SiteSettingSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    key?: boolean
    value?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["siteSetting"]>

  export type SiteSettingSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    key?: boolean
    value?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["siteSetting"]>

  export type SiteSettingSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    key?: boolean
    value?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["siteSetting"]>

  export type SiteSettingSelectScalar = {
    id?: boolean
    key?: boolean
    value?: boolean
    updatedAt?: boolean
  }

  export type SiteSettingOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "key" | "value" | "updatedAt", ExtArgs["result"]["siteSetting"]>

  export type $SiteSettingPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "SiteSetting"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      key: string
      value: string
      updatedAt: Date
    }, ExtArgs["result"]["siteSetting"]>
    composites: {}
  }

  type SiteSettingGetPayload<S extends boolean | null | undefined | SiteSettingDefaultArgs> = $Result.GetResult<Prisma.$SiteSettingPayload, S>

  type SiteSettingCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<SiteSettingFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: SiteSettingCountAggregateInputType | true
    }

  export interface SiteSettingDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['SiteSetting'], meta: { name: 'SiteSetting' } }
    /**
     * Find zero or one SiteSetting that matches the filter.
     * @param {SiteSettingFindUniqueArgs} args - Arguments to find a SiteSetting
     * @example
     * // Get one SiteSetting
     * const siteSetting = await prisma.siteSetting.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends SiteSettingFindUniqueArgs>(args: SelectSubset<T, SiteSettingFindUniqueArgs<ExtArgs>>): Prisma__SiteSettingClient<$Result.GetResult<Prisma.$SiteSettingPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one SiteSetting that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {SiteSettingFindUniqueOrThrowArgs} args - Arguments to find a SiteSetting
     * @example
     * // Get one SiteSetting
     * const siteSetting = await prisma.siteSetting.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends SiteSettingFindUniqueOrThrowArgs>(args: SelectSubset<T, SiteSettingFindUniqueOrThrowArgs<ExtArgs>>): Prisma__SiteSettingClient<$Result.GetResult<Prisma.$SiteSettingPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first SiteSetting that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SiteSettingFindFirstArgs} args - Arguments to find a SiteSetting
     * @example
     * // Get one SiteSetting
     * const siteSetting = await prisma.siteSetting.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends SiteSettingFindFirstArgs>(args?: SelectSubset<T, SiteSettingFindFirstArgs<ExtArgs>>): Prisma__SiteSettingClient<$Result.GetResult<Prisma.$SiteSettingPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first SiteSetting that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SiteSettingFindFirstOrThrowArgs} args - Arguments to find a SiteSetting
     * @example
     * // Get one SiteSetting
     * const siteSetting = await prisma.siteSetting.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends SiteSettingFindFirstOrThrowArgs>(args?: SelectSubset<T, SiteSettingFindFirstOrThrowArgs<ExtArgs>>): Prisma__SiteSettingClient<$Result.GetResult<Prisma.$SiteSettingPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more SiteSettings that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SiteSettingFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all SiteSettings
     * const siteSettings = await prisma.siteSetting.findMany()
     * 
     * // Get first 10 SiteSettings
     * const siteSettings = await prisma.siteSetting.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const siteSettingWithIdOnly = await prisma.siteSetting.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends SiteSettingFindManyArgs>(args?: SelectSubset<T, SiteSettingFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SiteSettingPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a SiteSetting.
     * @param {SiteSettingCreateArgs} args - Arguments to create a SiteSetting.
     * @example
     * // Create one SiteSetting
     * const SiteSetting = await prisma.siteSetting.create({
     *   data: {
     *     // ... data to create a SiteSetting
     *   }
     * })
     * 
     */
    create<T extends SiteSettingCreateArgs>(args: SelectSubset<T, SiteSettingCreateArgs<ExtArgs>>): Prisma__SiteSettingClient<$Result.GetResult<Prisma.$SiteSettingPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many SiteSettings.
     * @param {SiteSettingCreateManyArgs} args - Arguments to create many SiteSettings.
     * @example
     * // Create many SiteSettings
     * const siteSetting = await prisma.siteSetting.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends SiteSettingCreateManyArgs>(args?: SelectSubset<T, SiteSettingCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many SiteSettings and returns the data saved in the database.
     * @param {SiteSettingCreateManyAndReturnArgs} args - Arguments to create many SiteSettings.
     * @example
     * // Create many SiteSettings
     * const siteSetting = await prisma.siteSetting.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many SiteSettings and only return the `id`
     * const siteSettingWithIdOnly = await prisma.siteSetting.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends SiteSettingCreateManyAndReturnArgs>(args?: SelectSubset<T, SiteSettingCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SiteSettingPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a SiteSetting.
     * @param {SiteSettingDeleteArgs} args - Arguments to delete one SiteSetting.
     * @example
     * // Delete one SiteSetting
     * const SiteSetting = await prisma.siteSetting.delete({
     *   where: {
     *     // ... filter to delete one SiteSetting
     *   }
     * })
     * 
     */
    delete<T extends SiteSettingDeleteArgs>(args: SelectSubset<T, SiteSettingDeleteArgs<ExtArgs>>): Prisma__SiteSettingClient<$Result.GetResult<Prisma.$SiteSettingPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one SiteSetting.
     * @param {SiteSettingUpdateArgs} args - Arguments to update one SiteSetting.
     * @example
     * // Update one SiteSetting
     * const siteSetting = await prisma.siteSetting.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends SiteSettingUpdateArgs>(args: SelectSubset<T, SiteSettingUpdateArgs<ExtArgs>>): Prisma__SiteSettingClient<$Result.GetResult<Prisma.$SiteSettingPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more SiteSettings.
     * @param {SiteSettingDeleteManyArgs} args - Arguments to filter SiteSettings to delete.
     * @example
     * // Delete a few SiteSettings
     * const { count } = await prisma.siteSetting.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends SiteSettingDeleteManyArgs>(args?: SelectSubset<T, SiteSettingDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more SiteSettings.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SiteSettingUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many SiteSettings
     * const siteSetting = await prisma.siteSetting.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends SiteSettingUpdateManyArgs>(args: SelectSubset<T, SiteSettingUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more SiteSettings and returns the data updated in the database.
     * @param {SiteSettingUpdateManyAndReturnArgs} args - Arguments to update many SiteSettings.
     * @example
     * // Update many SiteSettings
     * const siteSetting = await prisma.siteSetting.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more SiteSettings and only return the `id`
     * const siteSettingWithIdOnly = await prisma.siteSetting.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends SiteSettingUpdateManyAndReturnArgs>(args: SelectSubset<T, SiteSettingUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SiteSettingPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one SiteSetting.
     * @param {SiteSettingUpsertArgs} args - Arguments to update or create a SiteSetting.
     * @example
     * // Update or create a SiteSetting
     * const siteSetting = await prisma.siteSetting.upsert({
     *   create: {
     *     // ... data to create a SiteSetting
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the SiteSetting we want to update
     *   }
     * })
     */
    upsert<T extends SiteSettingUpsertArgs>(args: SelectSubset<T, SiteSettingUpsertArgs<ExtArgs>>): Prisma__SiteSettingClient<$Result.GetResult<Prisma.$SiteSettingPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of SiteSettings.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SiteSettingCountArgs} args - Arguments to filter SiteSettings to count.
     * @example
     * // Count the number of SiteSettings
     * const count = await prisma.siteSetting.count({
     *   where: {
     *     // ... the filter for the SiteSettings we want to count
     *   }
     * })
    **/
    count<T extends SiteSettingCountArgs>(
      args?: Subset<T, SiteSettingCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], SiteSettingCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a SiteSetting.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SiteSettingAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends SiteSettingAggregateArgs>(args: Subset<T, SiteSettingAggregateArgs>): Prisma.PrismaPromise<GetSiteSettingAggregateType<T>>

    /**
     * Group by SiteSetting.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SiteSettingGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends SiteSettingGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: SiteSettingGroupByArgs['orderBy'] }
        : { orderBy?: SiteSettingGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, SiteSettingGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetSiteSettingGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the SiteSetting model
   */
  readonly fields: SiteSettingFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for SiteSetting.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__SiteSettingClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the SiteSetting model
   */
  interface SiteSettingFieldRefs {
    readonly id: FieldRef<"SiteSetting", 'String'>
    readonly key: FieldRef<"SiteSetting", 'String'>
    readonly value: FieldRef<"SiteSetting", 'String'>
    readonly updatedAt: FieldRef<"SiteSetting", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * SiteSetting findUnique
   */
  export type SiteSettingFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SiteSetting
     */
    select?: SiteSettingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SiteSetting
     */
    omit?: SiteSettingOmit<ExtArgs> | null
    /**
     * Filter, which SiteSetting to fetch.
     */
    where: SiteSettingWhereUniqueInput
  }

  /**
   * SiteSetting findUniqueOrThrow
   */
  export type SiteSettingFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SiteSetting
     */
    select?: SiteSettingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SiteSetting
     */
    omit?: SiteSettingOmit<ExtArgs> | null
    /**
     * Filter, which SiteSetting to fetch.
     */
    where: SiteSettingWhereUniqueInput
  }

  /**
   * SiteSetting findFirst
   */
  export type SiteSettingFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SiteSetting
     */
    select?: SiteSettingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SiteSetting
     */
    omit?: SiteSettingOmit<ExtArgs> | null
    /**
     * Filter, which SiteSetting to fetch.
     */
    where?: SiteSettingWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SiteSettings to fetch.
     */
    orderBy?: SiteSettingOrderByWithRelationInput | SiteSettingOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for SiteSettings.
     */
    cursor?: SiteSettingWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SiteSettings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SiteSettings.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of SiteSettings.
     */
    distinct?: SiteSettingScalarFieldEnum | SiteSettingScalarFieldEnum[]
  }

  /**
   * SiteSetting findFirstOrThrow
   */
  export type SiteSettingFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SiteSetting
     */
    select?: SiteSettingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SiteSetting
     */
    omit?: SiteSettingOmit<ExtArgs> | null
    /**
     * Filter, which SiteSetting to fetch.
     */
    where?: SiteSettingWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SiteSettings to fetch.
     */
    orderBy?: SiteSettingOrderByWithRelationInput | SiteSettingOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for SiteSettings.
     */
    cursor?: SiteSettingWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SiteSettings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SiteSettings.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of SiteSettings.
     */
    distinct?: SiteSettingScalarFieldEnum | SiteSettingScalarFieldEnum[]
  }

  /**
   * SiteSetting findMany
   */
  export type SiteSettingFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SiteSetting
     */
    select?: SiteSettingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SiteSetting
     */
    omit?: SiteSettingOmit<ExtArgs> | null
    /**
     * Filter, which SiteSettings to fetch.
     */
    where?: SiteSettingWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SiteSettings to fetch.
     */
    orderBy?: SiteSettingOrderByWithRelationInput | SiteSettingOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing SiteSettings.
     */
    cursor?: SiteSettingWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SiteSettings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SiteSettings.
     */
    skip?: number
    distinct?: SiteSettingScalarFieldEnum | SiteSettingScalarFieldEnum[]
  }

  /**
   * SiteSetting create
   */
  export type SiteSettingCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SiteSetting
     */
    select?: SiteSettingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SiteSetting
     */
    omit?: SiteSettingOmit<ExtArgs> | null
    /**
     * The data needed to create a SiteSetting.
     */
    data: XOR<SiteSettingCreateInput, SiteSettingUncheckedCreateInput>
  }

  /**
   * SiteSetting createMany
   */
  export type SiteSettingCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many SiteSettings.
     */
    data: SiteSettingCreateManyInput | SiteSettingCreateManyInput[]
  }

  /**
   * SiteSetting createManyAndReturn
   */
  export type SiteSettingCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SiteSetting
     */
    select?: SiteSettingSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the SiteSetting
     */
    omit?: SiteSettingOmit<ExtArgs> | null
    /**
     * The data used to create many SiteSettings.
     */
    data: SiteSettingCreateManyInput | SiteSettingCreateManyInput[]
  }

  /**
   * SiteSetting update
   */
  export type SiteSettingUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SiteSetting
     */
    select?: SiteSettingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SiteSetting
     */
    omit?: SiteSettingOmit<ExtArgs> | null
    /**
     * The data needed to update a SiteSetting.
     */
    data: XOR<SiteSettingUpdateInput, SiteSettingUncheckedUpdateInput>
    /**
     * Choose, which SiteSetting to update.
     */
    where: SiteSettingWhereUniqueInput
  }

  /**
   * SiteSetting updateMany
   */
  export type SiteSettingUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update SiteSettings.
     */
    data: XOR<SiteSettingUpdateManyMutationInput, SiteSettingUncheckedUpdateManyInput>
    /**
     * Filter which SiteSettings to update
     */
    where?: SiteSettingWhereInput
    /**
     * Limit how many SiteSettings to update.
     */
    limit?: number
  }

  /**
   * SiteSetting updateManyAndReturn
   */
  export type SiteSettingUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SiteSetting
     */
    select?: SiteSettingSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the SiteSetting
     */
    omit?: SiteSettingOmit<ExtArgs> | null
    /**
     * The data used to update SiteSettings.
     */
    data: XOR<SiteSettingUpdateManyMutationInput, SiteSettingUncheckedUpdateManyInput>
    /**
     * Filter which SiteSettings to update
     */
    where?: SiteSettingWhereInput
    /**
     * Limit how many SiteSettings to update.
     */
    limit?: number
  }

  /**
   * SiteSetting upsert
   */
  export type SiteSettingUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SiteSetting
     */
    select?: SiteSettingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SiteSetting
     */
    omit?: SiteSettingOmit<ExtArgs> | null
    /**
     * The filter to search for the SiteSetting to update in case it exists.
     */
    where: SiteSettingWhereUniqueInput
    /**
     * In case the SiteSetting found by the `where` argument doesn't exist, create a new SiteSetting with this data.
     */
    create: XOR<SiteSettingCreateInput, SiteSettingUncheckedCreateInput>
    /**
     * In case the SiteSetting was found with the provided `where` argument, update it with this data.
     */
    update: XOR<SiteSettingUpdateInput, SiteSettingUncheckedUpdateInput>
  }

  /**
   * SiteSetting delete
   */
  export type SiteSettingDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SiteSetting
     */
    select?: SiteSettingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SiteSetting
     */
    omit?: SiteSettingOmit<ExtArgs> | null
    /**
     * Filter which SiteSetting to delete.
     */
    where: SiteSettingWhereUniqueInput
  }

  /**
   * SiteSetting deleteMany
   */
  export type SiteSettingDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which SiteSettings to delete
     */
    where?: SiteSettingWhereInput
    /**
     * Limit how many SiteSettings to delete.
     */
    limit?: number
  }

  /**
   * SiteSetting without action
   */
  export type SiteSettingDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SiteSetting
     */
    select?: SiteSettingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SiteSetting
     */
    omit?: SiteSettingOmit<ExtArgs> | null
  }


  /**
   * Model Payment
   */

  export type AggregatePayment = {
    _count: PaymentCountAggregateOutputType | null
    _avg: PaymentAvgAggregateOutputType | null
    _sum: PaymentSumAggregateOutputType | null
    _min: PaymentMinAggregateOutputType | null
    _max: PaymentMaxAggregateOutputType | null
  }

  export type PaymentAvgAggregateOutputType = {
    amount: number | null
  }

  export type PaymentSumAggregateOutputType = {
    amount: number | null
  }

  export type PaymentMinAggregateOutputType = {
    id: string | null
    userId: string | null
    amount: number | null
    currency: string | null
    paymentMethod: string | null
    paymentGateway: string | null
    transactionRef: string | null
    status: string | null
    planName: string | null
    documentId: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type PaymentMaxAggregateOutputType = {
    id: string | null
    userId: string | null
    amount: number | null
    currency: string | null
    paymentMethod: string | null
    paymentGateway: string | null
    transactionRef: string | null
    status: string | null
    planName: string | null
    documentId: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type PaymentCountAggregateOutputType = {
    id: number
    userId: number
    amount: number
    currency: number
    paymentMethod: number
    paymentGateway: number
    transactionRef: number
    status: number
    planName: number
    documentId: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type PaymentAvgAggregateInputType = {
    amount?: true
  }

  export type PaymentSumAggregateInputType = {
    amount?: true
  }

  export type PaymentMinAggregateInputType = {
    id?: true
    userId?: true
    amount?: true
    currency?: true
    paymentMethod?: true
    paymentGateway?: true
    transactionRef?: true
    status?: true
    planName?: true
    documentId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type PaymentMaxAggregateInputType = {
    id?: true
    userId?: true
    amount?: true
    currency?: true
    paymentMethod?: true
    paymentGateway?: true
    transactionRef?: true
    status?: true
    planName?: true
    documentId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type PaymentCountAggregateInputType = {
    id?: true
    userId?: true
    amount?: true
    currency?: true
    paymentMethod?: true
    paymentGateway?: true
    transactionRef?: true
    status?: true
    planName?: true
    documentId?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type PaymentAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Payment to aggregate.
     */
    where?: PaymentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Payments to fetch.
     */
    orderBy?: PaymentOrderByWithRelationInput | PaymentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: PaymentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Payments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Payments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Payments
    **/
    _count?: true | PaymentCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: PaymentAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: PaymentSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: PaymentMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: PaymentMaxAggregateInputType
  }

  export type GetPaymentAggregateType<T extends PaymentAggregateArgs> = {
        [P in keyof T & keyof AggregatePayment]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregatePayment[P]>
      : GetScalarType<T[P], AggregatePayment[P]>
  }




  export type PaymentGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PaymentWhereInput
    orderBy?: PaymentOrderByWithAggregationInput | PaymentOrderByWithAggregationInput[]
    by: PaymentScalarFieldEnum[] | PaymentScalarFieldEnum
    having?: PaymentScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: PaymentCountAggregateInputType | true
    _avg?: PaymentAvgAggregateInputType
    _sum?: PaymentSumAggregateInputType
    _min?: PaymentMinAggregateInputType
    _max?: PaymentMaxAggregateInputType
  }

  export type PaymentGroupByOutputType = {
    id: string
    userId: string
    amount: number
    currency: string
    paymentMethod: string | null
    paymentGateway: string | null
    transactionRef: string | null
    status: string
    planName: string | null
    documentId: string | null
    createdAt: Date
    updatedAt: Date
    _count: PaymentCountAggregateOutputType | null
    _avg: PaymentAvgAggregateOutputType | null
    _sum: PaymentSumAggregateOutputType | null
    _min: PaymentMinAggregateOutputType | null
    _max: PaymentMaxAggregateOutputType | null
  }

  type GetPaymentGroupByPayload<T extends PaymentGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<PaymentGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof PaymentGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], PaymentGroupByOutputType[P]>
            : GetScalarType<T[P], PaymentGroupByOutputType[P]>
        }
      >
    >


  export type PaymentSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    amount?: boolean
    currency?: boolean
    paymentMethod?: boolean
    paymentGateway?: boolean
    transactionRef?: boolean
    status?: boolean
    planName?: boolean
    documentId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["payment"]>

  export type PaymentSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    amount?: boolean
    currency?: boolean
    paymentMethod?: boolean
    paymentGateway?: boolean
    transactionRef?: boolean
    status?: boolean
    planName?: boolean
    documentId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["payment"]>

  export type PaymentSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    amount?: boolean
    currency?: boolean
    paymentMethod?: boolean
    paymentGateway?: boolean
    transactionRef?: boolean
    status?: boolean
    planName?: boolean
    documentId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["payment"]>

  export type PaymentSelectScalar = {
    id?: boolean
    userId?: boolean
    amount?: boolean
    currency?: boolean
    paymentMethod?: boolean
    paymentGateway?: boolean
    transactionRef?: boolean
    status?: boolean
    planName?: boolean
    documentId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type PaymentOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "userId" | "amount" | "currency" | "paymentMethod" | "paymentGateway" | "transactionRef" | "status" | "planName" | "documentId" | "createdAt" | "updatedAt", ExtArgs["result"]["payment"]>

  export type $PaymentPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Payment"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      userId: string
      amount: number
      currency: string
      paymentMethod: string | null
      paymentGateway: string | null
      transactionRef: string | null
      status: string
      planName: string | null
      documentId: string | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["payment"]>
    composites: {}
  }

  type PaymentGetPayload<S extends boolean | null | undefined | PaymentDefaultArgs> = $Result.GetResult<Prisma.$PaymentPayload, S>

  type PaymentCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<PaymentFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: PaymentCountAggregateInputType | true
    }

  export interface PaymentDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Payment'], meta: { name: 'Payment' } }
    /**
     * Find zero or one Payment that matches the filter.
     * @param {PaymentFindUniqueArgs} args - Arguments to find a Payment
     * @example
     * // Get one Payment
     * const payment = await prisma.payment.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends PaymentFindUniqueArgs>(args: SelectSubset<T, PaymentFindUniqueArgs<ExtArgs>>): Prisma__PaymentClient<$Result.GetResult<Prisma.$PaymentPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Payment that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {PaymentFindUniqueOrThrowArgs} args - Arguments to find a Payment
     * @example
     * // Get one Payment
     * const payment = await prisma.payment.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends PaymentFindUniqueOrThrowArgs>(args: SelectSubset<T, PaymentFindUniqueOrThrowArgs<ExtArgs>>): Prisma__PaymentClient<$Result.GetResult<Prisma.$PaymentPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Payment that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PaymentFindFirstArgs} args - Arguments to find a Payment
     * @example
     * // Get one Payment
     * const payment = await prisma.payment.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends PaymentFindFirstArgs>(args?: SelectSubset<T, PaymentFindFirstArgs<ExtArgs>>): Prisma__PaymentClient<$Result.GetResult<Prisma.$PaymentPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Payment that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PaymentFindFirstOrThrowArgs} args - Arguments to find a Payment
     * @example
     * // Get one Payment
     * const payment = await prisma.payment.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends PaymentFindFirstOrThrowArgs>(args?: SelectSubset<T, PaymentFindFirstOrThrowArgs<ExtArgs>>): Prisma__PaymentClient<$Result.GetResult<Prisma.$PaymentPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Payments that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PaymentFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Payments
     * const payments = await prisma.payment.findMany()
     * 
     * // Get first 10 Payments
     * const payments = await prisma.payment.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const paymentWithIdOnly = await prisma.payment.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends PaymentFindManyArgs>(args?: SelectSubset<T, PaymentFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PaymentPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Payment.
     * @param {PaymentCreateArgs} args - Arguments to create a Payment.
     * @example
     * // Create one Payment
     * const Payment = await prisma.payment.create({
     *   data: {
     *     // ... data to create a Payment
     *   }
     * })
     * 
     */
    create<T extends PaymentCreateArgs>(args: SelectSubset<T, PaymentCreateArgs<ExtArgs>>): Prisma__PaymentClient<$Result.GetResult<Prisma.$PaymentPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Payments.
     * @param {PaymentCreateManyArgs} args - Arguments to create many Payments.
     * @example
     * // Create many Payments
     * const payment = await prisma.payment.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends PaymentCreateManyArgs>(args?: SelectSubset<T, PaymentCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Payments and returns the data saved in the database.
     * @param {PaymentCreateManyAndReturnArgs} args - Arguments to create many Payments.
     * @example
     * // Create many Payments
     * const payment = await prisma.payment.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Payments and only return the `id`
     * const paymentWithIdOnly = await prisma.payment.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends PaymentCreateManyAndReturnArgs>(args?: SelectSubset<T, PaymentCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PaymentPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Payment.
     * @param {PaymentDeleteArgs} args - Arguments to delete one Payment.
     * @example
     * // Delete one Payment
     * const Payment = await prisma.payment.delete({
     *   where: {
     *     // ... filter to delete one Payment
     *   }
     * })
     * 
     */
    delete<T extends PaymentDeleteArgs>(args: SelectSubset<T, PaymentDeleteArgs<ExtArgs>>): Prisma__PaymentClient<$Result.GetResult<Prisma.$PaymentPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Payment.
     * @param {PaymentUpdateArgs} args - Arguments to update one Payment.
     * @example
     * // Update one Payment
     * const payment = await prisma.payment.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends PaymentUpdateArgs>(args: SelectSubset<T, PaymentUpdateArgs<ExtArgs>>): Prisma__PaymentClient<$Result.GetResult<Prisma.$PaymentPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Payments.
     * @param {PaymentDeleteManyArgs} args - Arguments to filter Payments to delete.
     * @example
     * // Delete a few Payments
     * const { count } = await prisma.payment.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends PaymentDeleteManyArgs>(args?: SelectSubset<T, PaymentDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Payments.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PaymentUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Payments
     * const payment = await prisma.payment.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends PaymentUpdateManyArgs>(args: SelectSubset<T, PaymentUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Payments and returns the data updated in the database.
     * @param {PaymentUpdateManyAndReturnArgs} args - Arguments to update many Payments.
     * @example
     * // Update many Payments
     * const payment = await prisma.payment.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Payments and only return the `id`
     * const paymentWithIdOnly = await prisma.payment.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends PaymentUpdateManyAndReturnArgs>(args: SelectSubset<T, PaymentUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PaymentPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Payment.
     * @param {PaymentUpsertArgs} args - Arguments to update or create a Payment.
     * @example
     * // Update or create a Payment
     * const payment = await prisma.payment.upsert({
     *   create: {
     *     // ... data to create a Payment
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Payment we want to update
     *   }
     * })
     */
    upsert<T extends PaymentUpsertArgs>(args: SelectSubset<T, PaymentUpsertArgs<ExtArgs>>): Prisma__PaymentClient<$Result.GetResult<Prisma.$PaymentPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Payments.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PaymentCountArgs} args - Arguments to filter Payments to count.
     * @example
     * // Count the number of Payments
     * const count = await prisma.payment.count({
     *   where: {
     *     // ... the filter for the Payments we want to count
     *   }
     * })
    **/
    count<T extends PaymentCountArgs>(
      args?: Subset<T, PaymentCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], PaymentCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Payment.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PaymentAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends PaymentAggregateArgs>(args: Subset<T, PaymentAggregateArgs>): Prisma.PrismaPromise<GetPaymentAggregateType<T>>

    /**
     * Group by Payment.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PaymentGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends PaymentGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: PaymentGroupByArgs['orderBy'] }
        : { orderBy?: PaymentGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, PaymentGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPaymentGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Payment model
   */
  readonly fields: PaymentFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Payment.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__PaymentClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Payment model
   */
  interface PaymentFieldRefs {
    readonly id: FieldRef<"Payment", 'String'>
    readonly userId: FieldRef<"Payment", 'String'>
    readonly amount: FieldRef<"Payment", 'Float'>
    readonly currency: FieldRef<"Payment", 'String'>
    readonly paymentMethod: FieldRef<"Payment", 'String'>
    readonly paymentGateway: FieldRef<"Payment", 'String'>
    readonly transactionRef: FieldRef<"Payment", 'String'>
    readonly status: FieldRef<"Payment", 'String'>
    readonly planName: FieldRef<"Payment", 'String'>
    readonly documentId: FieldRef<"Payment", 'String'>
    readonly createdAt: FieldRef<"Payment", 'DateTime'>
    readonly updatedAt: FieldRef<"Payment", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Payment findUnique
   */
  export type PaymentFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Payment
     */
    select?: PaymentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Payment
     */
    omit?: PaymentOmit<ExtArgs> | null
    /**
     * Filter, which Payment to fetch.
     */
    where: PaymentWhereUniqueInput
  }

  /**
   * Payment findUniqueOrThrow
   */
  export type PaymentFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Payment
     */
    select?: PaymentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Payment
     */
    omit?: PaymentOmit<ExtArgs> | null
    /**
     * Filter, which Payment to fetch.
     */
    where: PaymentWhereUniqueInput
  }

  /**
   * Payment findFirst
   */
  export type PaymentFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Payment
     */
    select?: PaymentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Payment
     */
    omit?: PaymentOmit<ExtArgs> | null
    /**
     * Filter, which Payment to fetch.
     */
    where?: PaymentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Payments to fetch.
     */
    orderBy?: PaymentOrderByWithRelationInput | PaymentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Payments.
     */
    cursor?: PaymentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Payments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Payments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Payments.
     */
    distinct?: PaymentScalarFieldEnum | PaymentScalarFieldEnum[]
  }

  /**
   * Payment findFirstOrThrow
   */
  export type PaymentFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Payment
     */
    select?: PaymentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Payment
     */
    omit?: PaymentOmit<ExtArgs> | null
    /**
     * Filter, which Payment to fetch.
     */
    where?: PaymentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Payments to fetch.
     */
    orderBy?: PaymentOrderByWithRelationInput | PaymentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Payments.
     */
    cursor?: PaymentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Payments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Payments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Payments.
     */
    distinct?: PaymentScalarFieldEnum | PaymentScalarFieldEnum[]
  }

  /**
   * Payment findMany
   */
  export type PaymentFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Payment
     */
    select?: PaymentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Payment
     */
    omit?: PaymentOmit<ExtArgs> | null
    /**
     * Filter, which Payments to fetch.
     */
    where?: PaymentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Payments to fetch.
     */
    orderBy?: PaymentOrderByWithRelationInput | PaymentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Payments.
     */
    cursor?: PaymentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Payments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Payments.
     */
    skip?: number
    distinct?: PaymentScalarFieldEnum | PaymentScalarFieldEnum[]
  }

  /**
   * Payment create
   */
  export type PaymentCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Payment
     */
    select?: PaymentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Payment
     */
    omit?: PaymentOmit<ExtArgs> | null
    /**
     * The data needed to create a Payment.
     */
    data: XOR<PaymentCreateInput, PaymentUncheckedCreateInput>
  }

  /**
   * Payment createMany
   */
  export type PaymentCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Payments.
     */
    data: PaymentCreateManyInput | PaymentCreateManyInput[]
  }

  /**
   * Payment createManyAndReturn
   */
  export type PaymentCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Payment
     */
    select?: PaymentSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Payment
     */
    omit?: PaymentOmit<ExtArgs> | null
    /**
     * The data used to create many Payments.
     */
    data: PaymentCreateManyInput | PaymentCreateManyInput[]
  }

  /**
   * Payment update
   */
  export type PaymentUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Payment
     */
    select?: PaymentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Payment
     */
    omit?: PaymentOmit<ExtArgs> | null
    /**
     * The data needed to update a Payment.
     */
    data: XOR<PaymentUpdateInput, PaymentUncheckedUpdateInput>
    /**
     * Choose, which Payment to update.
     */
    where: PaymentWhereUniqueInput
  }

  /**
   * Payment updateMany
   */
  export type PaymentUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Payments.
     */
    data: XOR<PaymentUpdateManyMutationInput, PaymentUncheckedUpdateManyInput>
    /**
     * Filter which Payments to update
     */
    where?: PaymentWhereInput
    /**
     * Limit how many Payments to update.
     */
    limit?: number
  }

  /**
   * Payment updateManyAndReturn
   */
  export type PaymentUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Payment
     */
    select?: PaymentSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Payment
     */
    omit?: PaymentOmit<ExtArgs> | null
    /**
     * The data used to update Payments.
     */
    data: XOR<PaymentUpdateManyMutationInput, PaymentUncheckedUpdateManyInput>
    /**
     * Filter which Payments to update
     */
    where?: PaymentWhereInput
    /**
     * Limit how many Payments to update.
     */
    limit?: number
  }

  /**
   * Payment upsert
   */
  export type PaymentUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Payment
     */
    select?: PaymentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Payment
     */
    omit?: PaymentOmit<ExtArgs> | null
    /**
     * The filter to search for the Payment to update in case it exists.
     */
    where: PaymentWhereUniqueInput
    /**
     * In case the Payment found by the `where` argument doesn't exist, create a new Payment with this data.
     */
    create: XOR<PaymentCreateInput, PaymentUncheckedCreateInput>
    /**
     * In case the Payment was found with the provided `where` argument, update it with this data.
     */
    update: XOR<PaymentUpdateInput, PaymentUncheckedUpdateInput>
  }

  /**
   * Payment delete
   */
  export type PaymentDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Payment
     */
    select?: PaymentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Payment
     */
    omit?: PaymentOmit<ExtArgs> | null
    /**
     * Filter which Payment to delete.
     */
    where: PaymentWhereUniqueInput
  }

  /**
   * Payment deleteMany
   */
  export type PaymentDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Payments to delete
     */
    where?: PaymentWhereInput
    /**
     * Limit how many Payments to delete.
     */
    limit?: number
  }

  /**
   * Payment without action
   */
  export type PaymentDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Payment
     */
    select?: PaymentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Payment
     */
    omit?: PaymentOmit<ExtArgs> | null
  }


  /**
   * Model CreditTransaction
   */

  export type AggregateCreditTransaction = {
    _count: CreditTransactionCountAggregateOutputType | null
    _avg: CreditTransactionAvgAggregateOutputType | null
    _sum: CreditTransactionSumAggregateOutputType | null
    _min: CreditTransactionMinAggregateOutputType | null
    _max: CreditTransactionMaxAggregateOutputType | null
  }

  export type CreditTransactionAvgAggregateOutputType = {
    amount: number | null
  }

  export type CreditTransactionSumAggregateOutputType = {
    amount: number | null
  }

  export type CreditTransactionMinAggregateOutputType = {
    id: string | null
    userId: string | null
    amount: number | null
    type: string | null
    description: string | null
    adminId: string | null
    createdAt: Date | null
  }

  export type CreditTransactionMaxAggregateOutputType = {
    id: string | null
    userId: string | null
    amount: number | null
    type: string | null
    description: string | null
    adminId: string | null
    createdAt: Date | null
  }

  export type CreditTransactionCountAggregateOutputType = {
    id: number
    userId: number
    amount: number
    type: number
    description: number
    adminId: number
    createdAt: number
    _all: number
  }


  export type CreditTransactionAvgAggregateInputType = {
    amount?: true
  }

  export type CreditTransactionSumAggregateInputType = {
    amount?: true
  }

  export type CreditTransactionMinAggregateInputType = {
    id?: true
    userId?: true
    amount?: true
    type?: true
    description?: true
    adminId?: true
    createdAt?: true
  }

  export type CreditTransactionMaxAggregateInputType = {
    id?: true
    userId?: true
    amount?: true
    type?: true
    description?: true
    adminId?: true
    createdAt?: true
  }

  export type CreditTransactionCountAggregateInputType = {
    id?: true
    userId?: true
    amount?: true
    type?: true
    description?: true
    adminId?: true
    createdAt?: true
    _all?: true
  }

  export type CreditTransactionAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which CreditTransaction to aggregate.
     */
    where?: CreditTransactionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CreditTransactions to fetch.
     */
    orderBy?: CreditTransactionOrderByWithRelationInput | CreditTransactionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: CreditTransactionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CreditTransactions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CreditTransactions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned CreditTransactions
    **/
    _count?: true | CreditTransactionCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: CreditTransactionAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: CreditTransactionSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: CreditTransactionMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: CreditTransactionMaxAggregateInputType
  }

  export type GetCreditTransactionAggregateType<T extends CreditTransactionAggregateArgs> = {
        [P in keyof T & keyof AggregateCreditTransaction]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateCreditTransaction[P]>
      : GetScalarType<T[P], AggregateCreditTransaction[P]>
  }




  export type CreditTransactionGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CreditTransactionWhereInput
    orderBy?: CreditTransactionOrderByWithAggregationInput | CreditTransactionOrderByWithAggregationInput[]
    by: CreditTransactionScalarFieldEnum[] | CreditTransactionScalarFieldEnum
    having?: CreditTransactionScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: CreditTransactionCountAggregateInputType | true
    _avg?: CreditTransactionAvgAggregateInputType
    _sum?: CreditTransactionSumAggregateInputType
    _min?: CreditTransactionMinAggregateInputType
    _max?: CreditTransactionMaxAggregateInputType
  }

  export type CreditTransactionGroupByOutputType = {
    id: string
    userId: string
    amount: number
    type: string
    description: string | null
    adminId: string | null
    createdAt: Date
    _count: CreditTransactionCountAggregateOutputType | null
    _avg: CreditTransactionAvgAggregateOutputType | null
    _sum: CreditTransactionSumAggregateOutputType | null
    _min: CreditTransactionMinAggregateOutputType | null
    _max: CreditTransactionMaxAggregateOutputType | null
  }

  type GetCreditTransactionGroupByPayload<T extends CreditTransactionGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<CreditTransactionGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof CreditTransactionGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], CreditTransactionGroupByOutputType[P]>
            : GetScalarType<T[P], CreditTransactionGroupByOutputType[P]>
        }
      >
    >


  export type CreditTransactionSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    amount?: boolean
    type?: boolean
    description?: boolean
    adminId?: boolean
    createdAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    admin?: boolean | CreditTransaction$adminArgs<ExtArgs>
  }, ExtArgs["result"]["creditTransaction"]>

  export type CreditTransactionSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    amount?: boolean
    type?: boolean
    description?: boolean
    adminId?: boolean
    createdAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    admin?: boolean | CreditTransaction$adminArgs<ExtArgs>
  }, ExtArgs["result"]["creditTransaction"]>

  export type CreditTransactionSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    amount?: boolean
    type?: boolean
    description?: boolean
    adminId?: boolean
    createdAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    admin?: boolean | CreditTransaction$adminArgs<ExtArgs>
  }, ExtArgs["result"]["creditTransaction"]>

  export type CreditTransactionSelectScalar = {
    id?: boolean
    userId?: boolean
    amount?: boolean
    type?: boolean
    description?: boolean
    adminId?: boolean
    createdAt?: boolean
  }

  export type CreditTransactionOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "userId" | "amount" | "type" | "description" | "adminId" | "createdAt", ExtArgs["result"]["creditTransaction"]>
  export type CreditTransactionInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    admin?: boolean | CreditTransaction$adminArgs<ExtArgs>
  }
  export type CreditTransactionIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    admin?: boolean | CreditTransaction$adminArgs<ExtArgs>
  }
  export type CreditTransactionIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    admin?: boolean | CreditTransaction$adminArgs<ExtArgs>
  }

  export type $CreditTransactionPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "CreditTransaction"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
      admin: Prisma.$UserPayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      userId: string
      amount: number
      type: string
      description: string | null
      adminId: string | null
      createdAt: Date
    }, ExtArgs["result"]["creditTransaction"]>
    composites: {}
  }

  type CreditTransactionGetPayload<S extends boolean | null | undefined | CreditTransactionDefaultArgs> = $Result.GetResult<Prisma.$CreditTransactionPayload, S>

  type CreditTransactionCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<CreditTransactionFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: CreditTransactionCountAggregateInputType | true
    }

  export interface CreditTransactionDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['CreditTransaction'], meta: { name: 'CreditTransaction' } }
    /**
     * Find zero or one CreditTransaction that matches the filter.
     * @param {CreditTransactionFindUniqueArgs} args - Arguments to find a CreditTransaction
     * @example
     * // Get one CreditTransaction
     * const creditTransaction = await prisma.creditTransaction.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends CreditTransactionFindUniqueArgs>(args: SelectSubset<T, CreditTransactionFindUniqueArgs<ExtArgs>>): Prisma__CreditTransactionClient<$Result.GetResult<Prisma.$CreditTransactionPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one CreditTransaction that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {CreditTransactionFindUniqueOrThrowArgs} args - Arguments to find a CreditTransaction
     * @example
     * // Get one CreditTransaction
     * const creditTransaction = await prisma.creditTransaction.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends CreditTransactionFindUniqueOrThrowArgs>(args: SelectSubset<T, CreditTransactionFindUniqueOrThrowArgs<ExtArgs>>): Prisma__CreditTransactionClient<$Result.GetResult<Prisma.$CreditTransactionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first CreditTransaction that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CreditTransactionFindFirstArgs} args - Arguments to find a CreditTransaction
     * @example
     * // Get one CreditTransaction
     * const creditTransaction = await prisma.creditTransaction.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends CreditTransactionFindFirstArgs>(args?: SelectSubset<T, CreditTransactionFindFirstArgs<ExtArgs>>): Prisma__CreditTransactionClient<$Result.GetResult<Prisma.$CreditTransactionPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first CreditTransaction that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CreditTransactionFindFirstOrThrowArgs} args - Arguments to find a CreditTransaction
     * @example
     * // Get one CreditTransaction
     * const creditTransaction = await prisma.creditTransaction.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends CreditTransactionFindFirstOrThrowArgs>(args?: SelectSubset<T, CreditTransactionFindFirstOrThrowArgs<ExtArgs>>): Prisma__CreditTransactionClient<$Result.GetResult<Prisma.$CreditTransactionPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more CreditTransactions that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CreditTransactionFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all CreditTransactions
     * const creditTransactions = await prisma.creditTransaction.findMany()
     * 
     * // Get first 10 CreditTransactions
     * const creditTransactions = await prisma.creditTransaction.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const creditTransactionWithIdOnly = await prisma.creditTransaction.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends CreditTransactionFindManyArgs>(args?: SelectSubset<T, CreditTransactionFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CreditTransactionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a CreditTransaction.
     * @param {CreditTransactionCreateArgs} args - Arguments to create a CreditTransaction.
     * @example
     * // Create one CreditTransaction
     * const CreditTransaction = await prisma.creditTransaction.create({
     *   data: {
     *     // ... data to create a CreditTransaction
     *   }
     * })
     * 
     */
    create<T extends CreditTransactionCreateArgs>(args: SelectSubset<T, CreditTransactionCreateArgs<ExtArgs>>): Prisma__CreditTransactionClient<$Result.GetResult<Prisma.$CreditTransactionPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many CreditTransactions.
     * @param {CreditTransactionCreateManyArgs} args - Arguments to create many CreditTransactions.
     * @example
     * // Create many CreditTransactions
     * const creditTransaction = await prisma.creditTransaction.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends CreditTransactionCreateManyArgs>(args?: SelectSubset<T, CreditTransactionCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many CreditTransactions and returns the data saved in the database.
     * @param {CreditTransactionCreateManyAndReturnArgs} args - Arguments to create many CreditTransactions.
     * @example
     * // Create many CreditTransactions
     * const creditTransaction = await prisma.creditTransaction.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many CreditTransactions and only return the `id`
     * const creditTransactionWithIdOnly = await prisma.creditTransaction.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends CreditTransactionCreateManyAndReturnArgs>(args?: SelectSubset<T, CreditTransactionCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CreditTransactionPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a CreditTransaction.
     * @param {CreditTransactionDeleteArgs} args - Arguments to delete one CreditTransaction.
     * @example
     * // Delete one CreditTransaction
     * const CreditTransaction = await prisma.creditTransaction.delete({
     *   where: {
     *     // ... filter to delete one CreditTransaction
     *   }
     * })
     * 
     */
    delete<T extends CreditTransactionDeleteArgs>(args: SelectSubset<T, CreditTransactionDeleteArgs<ExtArgs>>): Prisma__CreditTransactionClient<$Result.GetResult<Prisma.$CreditTransactionPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one CreditTransaction.
     * @param {CreditTransactionUpdateArgs} args - Arguments to update one CreditTransaction.
     * @example
     * // Update one CreditTransaction
     * const creditTransaction = await prisma.creditTransaction.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends CreditTransactionUpdateArgs>(args: SelectSubset<T, CreditTransactionUpdateArgs<ExtArgs>>): Prisma__CreditTransactionClient<$Result.GetResult<Prisma.$CreditTransactionPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more CreditTransactions.
     * @param {CreditTransactionDeleteManyArgs} args - Arguments to filter CreditTransactions to delete.
     * @example
     * // Delete a few CreditTransactions
     * const { count } = await prisma.creditTransaction.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends CreditTransactionDeleteManyArgs>(args?: SelectSubset<T, CreditTransactionDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more CreditTransactions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CreditTransactionUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many CreditTransactions
     * const creditTransaction = await prisma.creditTransaction.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends CreditTransactionUpdateManyArgs>(args: SelectSubset<T, CreditTransactionUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more CreditTransactions and returns the data updated in the database.
     * @param {CreditTransactionUpdateManyAndReturnArgs} args - Arguments to update many CreditTransactions.
     * @example
     * // Update many CreditTransactions
     * const creditTransaction = await prisma.creditTransaction.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more CreditTransactions and only return the `id`
     * const creditTransactionWithIdOnly = await prisma.creditTransaction.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends CreditTransactionUpdateManyAndReturnArgs>(args: SelectSubset<T, CreditTransactionUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CreditTransactionPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one CreditTransaction.
     * @param {CreditTransactionUpsertArgs} args - Arguments to update or create a CreditTransaction.
     * @example
     * // Update or create a CreditTransaction
     * const creditTransaction = await prisma.creditTransaction.upsert({
     *   create: {
     *     // ... data to create a CreditTransaction
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the CreditTransaction we want to update
     *   }
     * })
     */
    upsert<T extends CreditTransactionUpsertArgs>(args: SelectSubset<T, CreditTransactionUpsertArgs<ExtArgs>>): Prisma__CreditTransactionClient<$Result.GetResult<Prisma.$CreditTransactionPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of CreditTransactions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CreditTransactionCountArgs} args - Arguments to filter CreditTransactions to count.
     * @example
     * // Count the number of CreditTransactions
     * const count = await prisma.creditTransaction.count({
     *   where: {
     *     // ... the filter for the CreditTransactions we want to count
     *   }
     * })
    **/
    count<T extends CreditTransactionCountArgs>(
      args?: Subset<T, CreditTransactionCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], CreditTransactionCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a CreditTransaction.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CreditTransactionAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends CreditTransactionAggregateArgs>(args: Subset<T, CreditTransactionAggregateArgs>): Prisma.PrismaPromise<GetCreditTransactionAggregateType<T>>

    /**
     * Group by CreditTransaction.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CreditTransactionGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends CreditTransactionGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: CreditTransactionGroupByArgs['orderBy'] }
        : { orderBy?: CreditTransactionGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, CreditTransactionGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetCreditTransactionGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the CreditTransaction model
   */
  readonly fields: CreditTransactionFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for CreditTransaction.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__CreditTransactionClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    admin<T extends CreditTransaction$adminArgs<ExtArgs> = {}>(args?: Subset<T, CreditTransaction$adminArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the CreditTransaction model
   */
  interface CreditTransactionFieldRefs {
    readonly id: FieldRef<"CreditTransaction", 'String'>
    readonly userId: FieldRef<"CreditTransaction", 'String'>
    readonly amount: FieldRef<"CreditTransaction", 'Int'>
    readonly type: FieldRef<"CreditTransaction", 'String'>
    readonly description: FieldRef<"CreditTransaction", 'String'>
    readonly adminId: FieldRef<"CreditTransaction", 'String'>
    readonly createdAt: FieldRef<"CreditTransaction", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * CreditTransaction findUnique
   */
  export type CreditTransactionFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CreditTransaction
     */
    select?: CreditTransactionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CreditTransaction
     */
    omit?: CreditTransactionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CreditTransactionInclude<ExtArgs> | null
    /**
     * Filter, which CreditTransaction to fetch.
     */
    where: CreditTransactionWhereUniqueInput
  }

  /**
   * CreditTransaction findUniqueOrThrow
   */
  export type CreditTransactionFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CreditTransaction
     */
    select?: CreditTransactionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CreditTransaction
     */
    omit?: CreditTransactionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CreditTransactionInclude<ExtArgs> | null
    /**
     * Filter, which CreditTransaction to fetch.
     */
    where: CreditTransactionWhereUniqueInput
  }

  /**
   * CreditTransaction findFirst
   */
  export type CreditTransactionFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CreditTransaction
     */
    select?: CreditTransactionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CreditTransaction
     */
    omit?: CreditTransactionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CreditTransactionInclude<ExtArgs> | null
    /**
     * Filter, which CreditTransaction to fetch.
     */
    where?: CreditTransactionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CreditTransactions to fetch.
     */
    orderBy?: CreditTransactionOrderByWithRelationInput | CreditTransactionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for CreditTransactions.
     */
    cursor?: CreditTransactionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CreditTransactions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CreditTransactions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of CreditTransactions.
     */
    distinct?: CreditTransactionScalarFieldEnum | CreditTransactionScalarFieldEnum[]
  }

  /**
   * CreditTransaction findFirstOrThrow
   */
  export type CreditTransactionFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CreditTransaction
     */
    select?: CreditTransactionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CreditTransaction
     */
    omit?: CreditTransactionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CreditTransactionInclude<ExtArgs> | null
    /**
     * Filter, which CreditTransaction to fetch.
     */
    where?: CreditTransactionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CreditTransactions to fetch.
     */
    orderBy?: CreditTransactionOrderByWithRelationInput | CreditTransactionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for CreditTransactions.
     */
    cursor?: CreditTransactionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CreditTransactions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CreditTransactions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of CreditTransactions.
     */
    distinct?: CreditTransactionScalarFieldEnum | CreditTransactionScalarFieldEnum[]
  }

  /**
   * CreditTransaction findMany
   */
  export type CreditTransactionFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CreditTransaction
     */
    select?: CreditTransactionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CreditTransaction
     */
    omit?: CreditTransactionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CreditTransactionInclude<ExtArgs> | null
    /**
     * Filter, which CreditTransactions to fetch.
     */
    where?: CreditTransactionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CreditTransactions to fetch.
     */
    orderBy?: CreditTransactionOrderByWithRelationInput | CreditTransactionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing CreditTransactions.
     */
    cursor?: CreditTransactionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CreditTransactions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CreditTransactions.
     */
    skip?: number
    distinct?: CreditTransactionScalarFieldEnum | CreditTransactionScalarFieldEnum[]
  }

  /**
   * CreditTransaction create
   */
  export type CreditTransactionCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CreditTransaction
     */
    select?: CreditTransactionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CreditTransaction
     */
    omit?: CreditTransactionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CreditTransactionInclude<ExtArgs> | null
    /**
     * The data needed to create a CreditTransaction.
     */
    data: XOR<CreditTransactionCreateInput, CreditTransactionUncheckedCreateInput>
  }

  /**
   * CreditTransaction createMany
   */
  export type CreditTransactionCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many CreditTransactions.
     */
    data: CreditTransactionCreateManyInput | CreditTransactionCreateManyInput[]
  }

  /**
   * CreditTransaction createManyAndReturn
   */
  export type CreditTransactionCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CreditTransaction
     */
    select?: CreditTransactionSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the CreditTransaction
     */
    omit?: CreditTransactionOmit<ExtArgs> | null
    /**
     * The data used to create many CreditTransactions.
     */
    data: CreditTransactionCreateManyInput | CreditTransactionCreateManyInput[]
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CreditTransactionIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * CreditTransaction update
   */
  export type CreditTransactionUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CreditTransaction
     */
    select?: CreditTransactionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CreditTransaction
     */
    omit?: CreditTransactionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CreditTransactionInclude<ExtArgs> | null
    /**
     * The data needed to update a CreditTransaction.
     */
    data: XOR<CreditTransactionUpdateInput, CreditTransactionUncheckedUpdateInput>
    /**
     * Choose, which CreditTransaction to update.
     */
    where: CreditTransactionWhereUniqueInput
  }

  /**
   * CreditTransaction updateMany
   */
  export type CreditTransactionUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update CreditTransactions.
     */
    data: XOR<CreditTransactionUpdateManyMutationInput, CreditTransactionUncheckedUpdateManyInput>
    /**
     * Filter which CreditTransactions to update
     */
    where?: CreditTransactionWhereInput
    /**
     * Limit how many CreditTransactions to update.
     */
    limit?: number
  }

  /**
   * CreditTransaction updateManyAndReturn
   */
  export type CreditTransactionUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CreditTransaction
     */
    select?: CreditTransactionSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the CreditTransaction
     */
    omit?: CreditTransactionOmit<ExtArgs> | null
    /**
     * The data used to update CreditTransactions.
     */
    data: XOR<CreditTransactionUpdateManyMutationInput, CreditTransactionUncheckedUpdateManyInput>
    /**
     * Filter which CreditTransactions to update
     */
    where?: CreditTransactionWhereInput
    /**
     * Limit how many CreditTransactions to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CreditTransactionIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * CreditTransaction upsert
   */
  export type CreditTransactionUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CreditTransaction
     */
    select?: CreditTransactionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CreditTransaction
     */
    omit?: CreditTransactionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CreditTransactionInclude<ExtArgs> | null
    /**
     * The filter to search for the CreditTransaction to update in case it exists.
     */
    where: CreditTransactionWhereUniqueInput
    /**
     * In case the CreditTransaction found by the `where` argument doesn't exist, create a new CreditTransaction with this data.
     */
    create: XOR<CreditTransactionCreateInput, CreditTransactionUncheckedCreateInput>
    /**
     * In case the CreditTransaction was found with the provided `where` argument, update it with this data.
     */
    update: XOR<CreditTransactionUpdateInput, CreditTransactionUncheckedUpdateInput>
  }

  /**
   * CreditTransaction delete
   */
  export type CreditTransactionDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CreditTransaction
     */
    select?: CreditTransactionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CreditTransaction
     */
    omit?: CreditTransactionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CreditTransactionInclude<ExtArgs> | null
    /**
     * Filter which CreditTransaction to delete.
     */
    where: CreditTransactionWhereUniqueInput
  }

  /**
   * CreditTransaction deleteMany
   */
  export type CreditTransactionDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which CreditTransactions to delete
     */
    where?: CreditTransactionWhereInput
    /**
     * Limit how many CreditTransactions to delete.
     */
    limit?: number
  }

  /**
   * CreditTransaction.admin
   */
  export type CreditTransaction$adminArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    where?: UserWhereInput
  }

  /**
   * CreditTransaction without action
   */
  export type CreditTransactionDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CreditTransaction
     */
    select?: CreditTransactionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the CreditTransaction
     */
    omit?: CreditTransactionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CreditTransactionInclude<ExtArgs> | null
  }


  /**
   * Model KnowledgeBase
   */

  export type AggregateKnowledgeBase = {
    _count: KnowledgeBaseCountAggregateOutputType | null
    _min: KnowledgeBaseMinAggregateOutputType | null
    _max: KnowledgeBaseMaxAggregateOutputType | null
  }

  export type KnowledgeBaseMinAggregateOutputType = {
    id: string | null
    title: string | null
    content: string | null
    category: string | null
    active: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type KnowledgeBaseMaxAggregateOutputType = {
    id: string | null
    title: string | null
    content: string | null
    category: string | null
    active: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type KnowledgeBaseCountAggregateOutputType = {
    id: number
    title: number
    content: number
    category: number
    active: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type KnowledgeBaseMinAggregateInputType = {
    id?: true
    title?: true
    content?: true
    category?: true
    active?: true
    createdAt?: true
    updatedAt?: true
  }

  export type KnowledgeBaseMaxAggregateInputType = {
    id?: true
    title?: true
    content?: true
    category?: true
    active?: true
    createdAt?: true
    updatedAt?: true
  }

  export type KnowledgeBaseCountAggregateInputType = {
    id?: true
    title?: true
    content?: true
    category?: true
    active?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type KnowledgeBaseAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which KnowledgeBase to aggregate.
     */
    where?: KnowledgeBaseWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of KnowledgeBases to fetch.
     */
    orderBy?: KnowledgeBaseOrderByWithRelationInput | KnowledgeBaseOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: KnowledgeBaseWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` KnowledgeBases from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` KnowledgeBases.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned KnowledgeBases
    **/
    _count?: true | KnowledgeBaseCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: KnowledgeBaseMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: KnowledgeBaseMaxAggregateInputType
  }

  export type GetKnowledgeBaseAggregateType<T extends KnowledgeBaseAggregateArgs> = {
        [P in keyof T & keyof AggregateKnowledgeBase]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateKnowledgeBase[P]>
      : GetScalarType<T[P], AggregateKnowledgeBase[P]>
  }




  export type KnowledgeBaseGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: KnowledgeBaseWhereInput
    orderBy?: KnowledgeBaseOrderByWithAggregationInput | KnowledgeBaseOrderByWithAggregationInput[]
    by: KnowledgeBaseScalarFieldEnum[] | KnowledgeBaseScalarFieldEnum
    having?: KnowledgeBaseScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: KnowledgeBaseCountAggregateInputType | true
    _min?: KnowledgeBaseMinAggregateInputType
    _max?: KnowledgeBaseMaxAggregateInputType
  }

  export type KnowledgeBaseGroupByOutputType = {
    id: string
    title: string
    content: string
    category: string
    active: boolean
    createdAt: Date
    updatedAt: Date
    _count: KnowledgeBaseCountAggregateOutputType | null
    _min: KnowledgeBaseMinAggregateOutputType | null
    _max: KnowledgeBaseMaxAggregateOutputType | null
  }

  type GetKnowledgeBaseGroupByPayload<T extends KnowledgeBaseGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<KnowledgeBaseGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof KnowledgeBaseGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], KnowledgeBaseGroupByOutputType[P]>
            : GetScalarType<T[P], KnowledgeBaseGroupByOutputType[P]>
        }
      >
    >


  export type KnowledgeBaseSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    content?: boolean
    category?: boolean
    active?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["knowledgeBase"]>

  export type KnowledgeBaseSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    content?: boolean
    category?: boolean
    active?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["knowledgeBase"]>

  export type KnowledgeBaseSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    content?: boolean
    category?: boolean
    active?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["knowledgeBase"]>

  export type KnowledgeBaseSelectScalar = {
    id?: boolean
    title?: boolean
    content?: boolean
    category?: boolean
    active?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type KnowledgeBaseOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "title" | "content" | "category" | "active" | "createdAt" | "updatedAt", ExtArgs["result"]["knowledgeBase"]>

  export type $KnowledgeBasePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "KnowledgeBase"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      title: string
      content: string
      category: string
      active: boolean
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["knowledgeBase"]>
    composites: {}
  }

  type KnowledgeBaseGetPayload<S extends boolean | null | undefined | KnowledgeBaseDefaultArgs> = $Result.GetResult<Prisma.$KnowledgeBasePayload, S>

  type KnowledgeBaseCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<KnowledgeBaseFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: KnowledgeBaseCountAggregateInputType | true
    }

  export interface KnowledgeBaseDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['KnowledgeBase'], meta: { name: 'KnowledgeBase' } }
    /**
     * Find zero or one KnowledgeBase that matches the filter.
     * @param {KnowledgeBaseFindUniqueArgs} args - Arguments to find a KnowledgeBase
     * @example
     * // Get one KnowledgeBase
     * const knowledgeBase = await prisma.knowledgeBase.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends KnowledgeBaseFindUniqueArgs>(args: SelectSubset<T, KnowledgeBaseFindUniqueArgs<ExtArgs>>): Prisma__KnowledgeBaseClient<$Result.GetResult<Prisma.$KnowledgeBasePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one KnowledgeBase that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {KnowledgeBaseFindUniqueOrThrowArgs} args - Arguments to find a KnowledgeBase
     * @example
     * // Get one KnowledgeBase
     * const knowledgeBase = await prisma.knowledgeBase.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends KnowledgeBaseFindUniqueOrThrowArgs>(args: SelectSubset<T, KnowledgeBaseFindUniqueOrThrowArgs<ExtArgs>>): Prisma__KnowledgeBaseClient<$Result.GetResult<Prisma.$KnowledgeBasePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first KnowledgeBase that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {KnowledgeBaseFindFirstArgs} args - Arguments to find a KnowledgeBase
     * @example
     * // Get one KnowledgeBase
     * const knowledgeBase = await prisma.knowledgeBase.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends KnowledgeBaseFindFirstArgs>(args?: SelectSubset<T, KnowledgeBaseFindFirstArgs<ExtArgs>>): Prisma__KnowledgeBaseClient<$Result.GetResult<Prisma.$KnowledgeBasePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first KnowledgeBase that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {KnowledgeBaseFindFirstOrThrowArgs} args - Arguments to find a KnowledgeBase
     * @example
     * // Get one KnowledgeBase
     * const knowledgeBase = await prisma.knowledgeBase.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends KnowledgeBaseFindFirstOrThrowArgs>(args?: SelectSubset<T, KnowledgeBaseFindFirstOrThrowArgs<ExtArgs>>): Prisma__KnowledgeBaseClient<$Result.GetResult<Prisma.$KnowledgeBasePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more KnowledgeBases that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {KnowledgeBaseFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all KnowledgeBases
     * const knowledgeBases = await prisma.knowledgeBase.findMany()
     * 
     * // Get first 10 KnowledgeBases
     * const knowledgeBases = await prisma.knowledgeBase.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const knowledgeBaseWithIdOnly = await prisma.knowledgeBase.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends KnowledgeBaseFindManyArgs>(args?: SelectSubset<T, KnowledgeBaseFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$KnowledgeBasePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a KnowledgeBase.
     * @param {KnowledgeBaseCreateArgs} args - Arguments to create a KnowledgeBase.
     * @example
     * // Create one KnowledgeBase
     * const KnowledgeBase = await prisma.knowledgeBase.create({
     *   data: {
     *     // ... data to create a KnowledgeBase
     *   }
     * })
     * 
     */
    create<T extends KnowledgeBaseCreateArgs>(args: SelectSubset<T, KnowledgeBaseCreateArgs<ExtArgs>>): Prisma__KnowledgeBaseClient<$Result.GetResult<Prisma.$KnowledgeBasePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many KnowledgeBases.
     * @param {KnowledgeBaseCreateManyArgs} args - Arguments to create many KnowledgeBases.
     * @example
     * // Create many KnowledgeBases
     * const knowledgeBase = await prisma.knowledgeBase.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends KnowledgeBaseCreateManyArgs>(args?: SelectSubset<T, KnowledgeBaseCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many KnowledgeBases and returns the data saved in the database.
     * @param {KnowledgeBaseCreateManyAndReturnArgs} args - Arguments to create many KnowledgeBases.
     * @example
     * // Create many KnowledgeBases
     * const knowledgeBase = await prisma.knowledgeBase.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many KnowledgeBases and only return the `id`
     * const knowledgeBaseWithIdOnly = await prisma.knowledgeBase.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends KnowledgeBaseCreateManyAndReturnArgs>(args?: SelectSubset<T, KnowledgeBaseCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$KnowledgeBasePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a KnowledgeBase.
     * @param {KnowledgeBaseDeleteArgs} args - Arguments to delete one KnowledgeBase.
     * @example
     * // Delete one KnowledgeBase
     * const KnowledgeBase = await prisma.knowledgeBase.delete({
     *   where: {
     *     // ... filter to delete one KnowledgeBase
     *   }
     * })
     * 
     */
    delete<T extends KnowledgeBaseDeleteArgs>(args: SelectSubset<T, KnowledgeBaseDeleteArgs<ExtArgs>>): Prisma__KnowledgeBaseClient<$Result.GetResult<Prisma.$KnowledgeBasePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one KnowledgeBase.
     * @param {KnowledgeBaseUpdateArgs} args - Arguments to update one KnowledgeBase.
     * @example
     * // Update one KnowledgeBase
     * const knowledgeBase = await prisma.knowledgeBase.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends KnowledgeBaseUpdateArgs>(args: SelectSubset<T, KnowledgeBaseUpdateArgs<ExtArgs>>): Prisma__KnowledgeBaseClient<$Result.GetResult<Prisma.$KnowledgeBasePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more KnowledgeBases.
     * @param {KnowledgeBaseDeleteManyArgs} args - Arguments to filter KnowledgeBases to delete.
     * @example
     * // Delete a few KnowledgeBases
     * const { count } = await prisma.knowledgeBase.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends KnowledgeBaseDeleteManyArgs>(args?: SelectSubset<T, KnowledgeBaseDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more KnowledgeBases.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {KnowledgeBaseUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many KnowledgeBases
     * const knowledgeBase = await prisma.knowledgeBase.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends KnowledgeBaseUpdateManyArgs>(args: SelectSubset<T, KnowledgeBaseUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more KnowledgeBases and returns the data updated in the database.
     * @param {KnowledgeBaseUpdateManyAndReturnArgs} args - Arguments to update many KnowledgeBases.
     * @example
     * // Update many KnowledgeBases
     * const knowledgeBase = await prisma.knowledgeBase.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more KnowledgeBases and only return the `id`
     * const knowledgeBaseWithIdOnly = await prisma.knowledgeBase.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends KnowledgeBaseUpdateManyAndReturnArgs>(args: SelectSubset<T, KnowledgeBaseUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$KnowledgeBasePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one KnowledgeBase.
     * @param {KnowledgeBaseUpsertArgs} args - Arguments to update or create a KnowledgeBase.
     * @example
     * // Update or create a KnowledgeBase
     * const knowledgeBase = await prisma.knowledgeBase.upsert({
     *   create: {
     *     // ... data to create a KnowledgeBase
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the KnowledgeBase we want to update
     *   }
     * })
     */
    upsert<T extends KnowledgeBaseUpsertArgs>(args: SelectSubset<T, KnowledgeBaseUpsertArgs<ExtArgs>>): Prisma__KnowledgeBaseClient<$Result.GetResult<Prisma.$KnowledgeBasePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of KnowledgeBases.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {KnowledgeBaseCountArgs} args - Arguments to filter KnowledgeBases to count.
     * @example
     * // Count the number of KnowledgeBases
     * const count = await prisma.knowledgeBase.count({
     *   where: {
     *     // ... the filter for the KnowledgeBases we want to count
     *   }
     * })
    **/
    count<T extends KnowledgeBaseCountArgs>(
      args?: Subset<T, KnowledgeBaseCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], KnowledgeBaseCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a KnowledgeBase.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {KnowledgeBaseAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends KnowledgeBaseAggregateArgs>(args: Subset<T, KnowledgeBaseAggregateArgs>): Prisma.PrismaPromise<GetKnowledgeBaseAggregateType<T>>

    /**
     * Group by KnowledgeBase.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {KnowledgeBaseGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends KnowledgeBaseGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: KnowledgeBaseGroupByArgs['orderBy'] }
        : { orderBy?: KnowledgeBaseGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, KnowledgeBaseGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetKnowledgeBaseGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the KnowledgeBase model
   */
  readonly fields: KnowledgeBaseFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for KnowledgeBase.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__KnowledgeBaseClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the KnowledgeBase model
   */
  interface KnowledgeBaseFieldRefs {
    readonly id: FieldRef<"KnowledgeBase", 'String'>
    readonly title: FieldRef<"KnowledgeBase", 'String'>
    readonly content: FieldRef<"KnowledgeBase", 'String'>
    readonly category: FieldRef<"KnowledgeBase", 'String'>
    readonly active: FieldRef<"KnowledgeBase", 'Boolean'>
    readonly createdAt: FieldRef<"KnowledgeBase", 'DateTime'>
    readonly updatedAt: FieldRef<"KnowledgeBase", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * KnowledgeBase findUnique
   */
  export type KnowledgeBaseFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the KnowledgeBase
     */
    select?: KnowledgeBaseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the KnowledgeBase
     */
    omit?: KnowledgeBaseOmit<ExtArgs> | null
    /**
     * Filter, which KnowledgeBase to fetch.
     */
    where: KnowledgeBaseWhereUniqueInput
  }

  /**
   * KnowledgeBase findUniqueOrThrow
   */
  export type KnowledgeBaseFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the KnowledgeBase
     */
    select?: KnowledgeBaseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the KnowledgeBase
     */
    omit?: KnowledgeBaseOmit<ExtArgs> | null
    /**
     * Filter, which KnowledgeBase to fetch.
     */
    where: KnowledgeBaseWhereUniqueInput
  }

  /**
   * KnowledgeBase findFirst
   */
  export type KnowledgeBaseFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the KnowledgeBase
     */
    select?: KnowledgeBaseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the KnowledgeBase
     */
    omit?: KnowledgeBaseOmit<ExtArgs> | null
    /**
     * Filter, which KnowledgeBase to fetch.
     */
    where?: KnowledgeBaseWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of KnowledgeBases to fetch.
     */
    orderBy?: KnowledgeBaseOrderByWithRelationInput | KnowledgeBaseOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for KnowledgeBases.
     */
    cursor?: KnowledgeBaseWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` KnowledgeBases from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` KnowledgeBases.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of KnowledgeBases.
     */
    distinct?: KnowledgeBaseScalarFieldEnum | KnowledgeBaseScalarFieldEnum[]
  }

  /**
   * KnowledgeBase findFirstOrThrow
   */
  export type KnowledgeBaseFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the KnowledgeBase
     */
    select?: KnowledgeBaseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the KnowledgeBase
     */
    omit?: KnowledgeBaseOmit<ExtArgs> | null
    /**
     * Filter, which KnowledgeBase to fetch.
     */
    where?: KnowledgeBaseWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of KnowledgeBases to fetch.
     */
    orderBy?: KnowledgeBaseOrderByWithRelationInput | KnowledgeBaseOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for KnowledgeBases.
     */
    cursor?: KnowledgeBaseWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` KnowledgeBases from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` KnowledgeBases.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of KnowledgeBases.
     */
    distinct?: KnowledgeBaseScalarFieldEnum | KnowledgeBaseScalarFieldEnum[]
  }

  /**
   * KnowledgeBase findMany
   */
  export type KnowledgeBaseFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the KnowledgeBase
     */
    select?: KnowledgeBaseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the KnowledgeBase
     */
    omit?: KnowledgeBaseOmit<ExtArgs> | null
    /**
     * Filter, which KnowledgeBases to fetch.
     */
    where?: KnowledgeBaseWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of KnowledgeBases to fetch.
     */
    orderBy?: KnowledgeBaseOrderByWithRelationInput | KnowledgeBaseOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing KnowledgeBases.
     */
    cursor?: KnowledgeBaseWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` KnowledgeBases from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` KnowledgeBases.
     */
    skip?: number
    distinct?: KnowledgeBaseScalarFieldEnum | KnowledgeBaseScalarFieldEnum[]
  }

  /**
   * KnowledgeBase create
   */
  export type KnowledgeBaseCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the KnowledgeBase
     */
    select?: KnowledgeBaseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the KnowledgeBase
     */
    omit?: KnowledgeBaseOmit<ExtArgs> | null
    /**
     * The data needed to create a KnowledgeBase.
     */
    data: XOR<KnowledgeBaseCreateInput, KnowledgeBaseUncheckedCreateInput>
  }

  /**
   * KnowledgeBase createMany
   */
  export type KnowledgeBaseCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many KnowledgeBases.
     */
    data: KnowledgeBaseCreateManyInput | KnowledgeBaseCreateManyInput[]
  }

  /**
   * KnowledgeBase createManyAndReturn
   */
  export type KnowledgeBaseCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the KnowledgeBase
     */
    select?: KnowledgeBaseSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the KnowledgeBase
     */
    omit?: KnowledgeBaseOmit<ExtArgs> | null
    /**
     * The data used to create many KnowledgeBases.
     */
    data: KnowledgeBaseCreateManyInput | KnowledgeBaseCreateManyInput[]
  }

  /**
   * KnowledgeBase update
   */
  export type KnowledgeBaseUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the KnowledgeBase
     */
    select?: KnowledgeBaseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the KnowledgeBase
     */
    omit?: KnowledgeBaseOmit<ExtArgs> | null
    /**
     * The data needed to update a KnowledgeBase.
     */
    data: XOR<KnowledgeBaseUpdateInput, KnowledgeBaseUncheckedUpdateInput>
    /**
     * Choose, which KnowledgeBase to update.
     */
    where: KnowledgeBaseWhereUniqueInput
  }

  /**
   * KnowledgeBase updateMany
   */
  export type KnowledgeBaseUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update KnowledgeBases.
     */
    data: XOR<KnowledgeBaseUpdateManyMutationInput, KnowledgeBaseUncheckedUpdateManyInput>
    /**
     * Filter which KnowledgeBases to update
     */
    where?: KnowledgeBaseWhereInput
    /**
     * Limit how many KnowledgeBases to update.
     */
    limit?: number
  }

  /**
   * KnowledgeBase updateManyAndReturn
   */
  export type KnowledgeBaseUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the KnowledgeBase
     */
    select?: KnowledgeBaseSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the KnowledgeBase
     */
    omit?: KnowledgeBaseOmit<ExtArgs> | null
    /**
     * The data used to update KnowledgeBases.
     */
    data: XOR<KnowledgeBaseUpdateManyMutationInput, KnowledgeBaseUncheckedUpdateManyInput>
    /**
     * Filter which KnowledgeBases to update
     */
    where?: KnowledgeBaseWhereInput
    /**
     * Limit how many KnowledgeBases to update.
     */
    limit?: number
  }

  /**
   * KnowledgeBase upsert
   */
  export type KnowledgeBaseUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the KnowledgeBase
     */
    select?: KnowledgeBaseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the KnowledgeBase
     */
    omit?: KnowledgeBaseOmit<ExtArgs> | null
    /**
     * The filter to search for the KnowledgeBase to update in case it exists.
     */
    where: KnowledgeBaseWhereUniqueInput
    /**
     * In case the KnowledgeBase found by the `where` argument doesn't exist, create a new KnowledgeBase with this data.
     */
    create: XOR<KnowledgeBaseCreateInput, KnowledgeBaseUncheckedCreateInput>
    /**
     * In case the KnowledgeBase was found with the provided `where` argument, update it with this data.
     */
    update: XOR<KnowledgeBaseUpdateInput, KnowledgeBaseUncheckedUpdateInput>
  }

  /**
   * KnowledgeBase delete
   */
  export type KnowledgeBaseDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the KnowledgeBase
     */
    select?: KnowledgeBaseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the KnowledgeBase
     */
    omit?: KnowledgeBaseOmit<ExtArgs> | null
    /**
     * Filter which KnowledgeBase to delete.
     */
    where: KnowledgeBaseWhereUniqueInput
  }

  /**
   * KnowledgeBase deleteMany
   */
  export type KnowledgeBaseDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which KnowledgeBases to delete
     */
    where?: KnowledgeBaseWhereInput
    /**
     * Limit how many KnowledgeBases to delete.
     */
    limit?: number
  }

  /**
   * KnowledgeBase without action
   */
  export type KnowledgeBaseDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the KnowledgeBase
     */
    select?: KnowledgeBaseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the KnowledgeBase
     */
    omit?: KnowledgeBaseOmit<ExtArgs> | null
  }


  /**
   * Model Publication
   */

  export type AggregatePublication = {
    _count: PublicationCountAggregateOutputType | null
    _avg: PublicationAvgAggregateOutputType | null
    _sum: PublicationSumAggregateOutputType | null
    _min: PublicationMinAggregateOutputType | null
    _max: PublicationMaxAggregateOutputType | null
  }

  export type PublicationAvgAggregateOutputType = {
    order: number | null
  }

  export type PublicationSumAggregateOutputType = {
    order: number | null
  }

  export type PublicationMinAggregateOutputType = {
    id: string | null
    title: string | null
    description: string | null
    content: string | null
    imageUrl: string | null
    order: number | null
    active: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type PublicationMaxAggregateOutputType = {
    id: string | null
    title: string | null
    description: string | null
    content: string | null
    imageUrl: string | null
    order: number | null
    active: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type PublicationCountAggregateOutputType = {
    id: number
    title: number
    description: number
    content: number
    imageUrl: number
    order: number
    active: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type PublicationAvgAggregateInputType = {
    order?: true
  }

  export type PublicationSumAggregateInputType = {
    order?: true
  }

  export type PublicationMinAggregateInputType = {
    id?: true
    title?: true
    description?: true
    content?: true
    imageUrl?: true
    order?: true
    active?: true
    createdAt?: true
    updatedAt?: true
  }

  export type PublicationMaxAggregateInputType = {
    id?: true
    title?: true
    description?: true
    content?: true
    imageUrl?: true
    order?: true
    active?: true
    createdAt?: true
    updatedAt?: true
  }

  export type PublicationCountAggregateInputType = {
    id?: true
    title?: true
    description?: true
    content?: true
    imageUrl?: true
    order?: true
    active?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type PublicationAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Publication to aggregate.
     */
    where?: PublicationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Publications to fetch.
     */
    orderBy?: PublicationOrderByWithRelationInput | PublicationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: PublicationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Publications from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Publications.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Publications
    **/
    _count?: true | PublicationCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: PublicationAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: PublicationSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: PublicationMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: PublicationMaxAggregateInputType
  }

  export type GetPublicationAggregateType<T extends PublicationAggregateArgs> = {
        [P in keyof T & keyof AggregatePublication]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregatePublication[P]>
      : GetScalarType<T[P], AggregatePublication[P]>
  }




  export type PublicationGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PublicationWhereInput
    orderBy?: PublicationOrderByWithAggregationInput | PublicationOrderByWithAggregationInput[]
    by: PublicationScalarFieldEnum[] | PublicationScalarFieldEnum
    having?: PublicationScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: PublicationCountAggregateInputType | true
    _avg?: PublicationAvgAggregateInputType
    _sum?: PublicationSumAggregateInputType
    _min?: PublicationMinAggregateInputType
    _max?: PublicationMaxAggregateInputType
  }

  export type PublicationGroupByOutputType = {
    id: string
    title: string
    description: string
    content: string
    imageUrl: string | null
    order: number
    active: boolean
    createdAt: Date
    updatedAt: Date
    _count: PublicationCountAggregateOutputType | null
    _avg: PublicationAvgAggregateOutputType | null
    _sum: PublicationSumAggregateOutputType | null
    _min: PublicationMinAggregateOutputType | null
    _max: PublicationMaxAggregateOutputType | null
  }

  type GetPublicationGroupByPayload<T extends PublicationGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<PublicationGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof PublicationGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], PublicationGroupByOutputType[P]>
            : GetScalarType<T[P], PublicationGroupByOutputType[P]>
        }
      >
    >


  export type PublicationSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    description?: boolean
    content?: boolean
    imageUrl?: boolean
    order?: boolean
    active?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["publication"]>

  export type PublicationSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    description?: boolean
    content?: boolean
    imageUrl?: boolean
    order?: boolean
    active?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["publication"]>

  export type PublicationSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    description?: boolean
    content?: boolean
    imageUrl?: boolean
    order?: boolean
    active?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["publication"]>

  export type PublicationSelectScalar = {
    id?: boolean
    title?: boolean
    description?: boolean
    content?: boolean
    imageUrl?: boolean
    order?: boolean
    active?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type PublicationOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "title" | "description" | "content" | "imageUrl" | "order" | "active" | "createdAt" | "updatedAt", ExtArgs["result"]["publication"]>

  export type $PublicationPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Publication"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      title: string
      description: string
      content: string
      imageUrl: string | null
      order: number
      active: boolean
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["publication"]>
    composites: {}
  }

  type PublicationGetPayload<S extends boolean | null | undefined | PublicationDefaultArgs> = $Result.GetResult<Prisma.$PublicationPayload, S>

  type PublicationCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<PublicationFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: PublicationCountAggregateInputType | true
    }

  export interface PublicationDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Publication'], meta: { name: 'Publication' } }
    /**
     * Find zero or one Publication that matches the filter.
     * @param {PublicationFindUniqueArgs} args - Arguments to find a Publication
     * @example
     * // Get one Publication
     * const publication = await prisma.publication.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends PublicationFindUniqueArgs>(args: SelectSubset<T, PublicationFindUniqueArgs<ExtArgs>>): Prisma__PublicationClient<$Result.GetResult<Prisma.$PublicationPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Publication that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {PublicationFindUniqueOrThrowArgs} args - Arguments to find a Publication
     * @example
     * // Get one Publication
     * const publication = await prisma.publication.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends PublicationFindUniqueOrThrowArgs>(args: SelectSubset<T, PublicationFindUniqueOrThrowArgs<ExtArgs>>): Prisma__PublicationClient<$Result.GetResult<Prisma.$PublicationPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Publication that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PublicationFindFirstArgs} args - Arguments to find a Publication
     * @example
     * // Get one Publication
     * const publication = await prisma.publication.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends PublicationFindFirstArgs>(args?: SelectSubset<T, PublicationFindFirstArgs<ExtArgs>>): Prisma__PublicationClient<$Result.GetResult<Prisma.$PublicationPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Publication that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PublicationFindFirstOrThrowArgs} args - Arguments to find a Publication
     * @example
     * // Get one Publication
     * const publication = await prisma.publication.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends PublicationFindFirstOrThrowArgs>(args?: SelectSubset<T, PublicationFindFirstOrThrowArgs<ExtArgs>>): Prisma__PublicationClient<$Result.GetResult<Prisma.$PublicationPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Publications that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PublicationFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Publications
     * const publications = await prisma.publication.findMany()
     * 
     * // Get first 10 Publications
     * const publications = await prisma.publication.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const publicationWithIdOnly = await prisma.publication.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends PublicationFindManyArgs>(args?: SelectSubset<T, PublicationFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PublicationPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Publication.
     * @param {PublicationCreateArgs} args - Arguments to create a Publication.
     * @example
     * // Create one Publication
     * const Publication = await prisma.publication.create({
     *   data: {
     *     // ... data to create a Publication
     *   }
     * })
     * 
     */
    create<T extends PublicationCreateArgs>(args: SelectSubset<T, PublicationCreateArgs<ExtArgs>>): Prisma__PublicationClient<$Result.GetResult<Prisma.$PublicationPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Publications.
     * @param {PublicationCreateManyArgs} args - Arguments to create many Publications.
     * @example
     * // Create many Publications
     * const publication = await prisma.publication.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends PublicationCreateManyArgs>(args?: SelectSubset<T, PublicationCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Publications and returns the data saved in the database.
     * @param {PublicationCreateManyAndReturnArgs} args - Arguments to create many Publications.
     * @example
     * // Create many Publications
     * const publication = await prisma.publication.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Publications and only return the `id`
     * const publicationWithIdOnly = await prisma.publication.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends PublicationCreateManyAndReturnArgs>(args?: SelectSubset<T, PublicationCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PublicationPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Publication.
     * @param {PublicationDeleteArgs} args - Arguments to delete one Publication.
     * @example
     * // Delete one Publication
     * const Publication = await prisma.publication.delete({
     *   where: {
     *     // ... filter to delete one Publication
     *   }
     * })
     * 
     */
    delete<T extends PublicationDeleteArgs>(args: SelectSubset<T, PublicationDeleteArgs<ExtArgs>>): Prisma__PublicationClient<$Result.GetResult<Prisma.$PublicationPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Publication.
     * @param {PublicationUpdateArgs} args - Arguments to update one Publication.
     * @example
     * // Update one Publication
     * const publication = await prisma.publication.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends PublicationUpdateArgs>(args: SelectSubset<T, PublicationUpdateArgs<ExtArgs>>): Prisma__PublicationClient<$Result.GetResult<Prisma.$PublicationPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Publications.
     * @param {PublicationDeleteManyArgs} args - Arguments to filter Publications to delete.
     * @example
     * // Delete a few Publications
     * const { count } = await prisma.publication.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends PublicationDeleteManyArgs>(args?: SelectSubset<T, PublicationDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Publications.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PublicationUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Publications
     * const publication = await prisma.publication.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends PublicationUpdateManyArgs>(args: SelectSubset<T, PublicationUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Publications and returns the data updated in the database.
     * @param {PublicationUpdateManyAndReturnArgs} args - Arguments to update many Publications.
     * @example
     * // Update many Publications
     * const publication = await prisma.publication.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Publications and only return the `id`
     * const publicationWithIdOnly = await prisma.publication.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends PublicationUpdateManyAndReturnArgs>(args: SelectSubset<T, PublicationUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PublicationPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Publication.
     * @param {PublicationUpsertArgs} args - Arguments to update or create a Publication.
     * @example
     * // Update or create a Publication
     * const publication = await prisma.publication.upsert({
     *   create: {
     *     // ... data to create a Publication
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Publication we want to update
     *   }
     * })
     */
    upsert<T extends PublicationUpsertArgs>(args: SelectSubset<T, PublicationUpsertArgs<ExtArgs>>): Prisma__PublicationClient<$Result.GetResult<Prisma.$PublicationPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Publications.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PublicationCountArgs} args - Arguments to filter Publications to count.
     * @example
     * // Count the number of Publications
     * const count = await prisma.publication.count({
     *   where: {
     *     // ... the filter for the Publications we want to count
     *   }
     * })
    **/
    count<T extends PublicationCountArgs>(
      args?: Subset<T, PublicationCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], PublicationCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Publication.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PublicationAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends PublicationAggregateArgs>(args: Subset<T, PublicationAggregateArgs>): Prisma.PrismaPromise<GetPublicationAggregateType<T>>

    /**
     * Group by Publication.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PublicationGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends PublicationGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: PublicationGroupByArgs['orderBy'] }
        : { orderBy?: PublicationGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, PublicationGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPublicationGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Publication model
   */
  readonly fields: PublicationFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Publication.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__PublicationClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Publication model
   */
  interface PublicationFieldRefs {
    readonly id: FieldRef<"Publication", 'String'>
    readonly title: FieldRef<"Publication", 'String'>
    readonly description: FieldRef<"Publication", 'String'>
    readonly content: FieldRef<"Publication", 'String'>
    readonly imageUrl: FieldRef<"Publication", 'String'>
    readonly order: FieldRef<"Publication", 'Int'>
    readonly active: FieldRef<"Publication", 'Boolean'>
    readonly createdAt: FieldRef<"Publication", 'DateTime'>
    readonly updatedAt: FieldRef<"Publication", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Publication findUnique
   */
  export type PublicationFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Publication
     */
    select?: PublicationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Publication
     */
    omit?: PublicationOmit<ExtArgs> | null
    /**
     * Filter, which Publication to fetch.
     */
    where: PublicationWhereUniqueInput
  }

  /**
   * Publication findUniqueOrThrow
   */
  export type PublicationFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Publication
     */
    select?: PublicationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Publication
     */
    omit?: PublicationOmit<ExtArgs> | null
    /**
     * Filter, which Publication to fetch.
     */
    where: PublicationWhereUniqueInput
  }

  /**
   * Publication findFirst
   */
  export type PublicationFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Publication
     */
    select?: PublicationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Publication
     */
    omit?: PublicationOmit<ExtArgs> | null
    /**
     * Filter, which Publication to fetch.
     */
    where?: PublicationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Publications to fetch.
     */
    orderBy?: PublicationOrderByWithRelationInput | PublicationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Publications.
     */
    cursor?: PublicationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Publications from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Publications.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Publications.
     */
    distinct?: PublicationScalarFieldEnum | PublicationScalarFieldEnum[]
  }

  /**
   * Publication findFirstOrThrow
   */
  export type PublicationFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Publication
     */
    select?: PublicationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Publication
     */
    omit?: PublicationOmit<ExtArgs> | null
    /**
     * Filter, which Publication to fetch.
     */
    where?: PublicationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Publications to fetch.
     */
    orderBy?: PublicationOrderByWithRelationInput | PublicationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Publications.
     */
    cursor?: PublicationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Publications from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Publications.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Publications.
     */
    distinct?: PublicationScalarFieldEnum | PublicationScalarFieldEnum[]
  }

  /**
   * Publication findMany
   */
  export type PublicationFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Publication
     */
    select?: PublicationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Publication
     */
    omit?: PublicationOmit<ExtArgs> | null
    /**
     * Filter, which Publications to fetch.
     */
    where?: PublicationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Publications to fetch.
     */
    orderBy?: PublicationOrderByWithRelationInput | PublicationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Publications.
     */
    cursor?: PublicationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Publications from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Publications.
     */
    skip?: number
    distinct?: PublicationScalarFieldEnum | PublicationScalarFieldEnum[]
  }

  /**
   * Publication create
   */
  export type PublicationCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Publication
     */
    select?: PublicationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Publication
     */
    omit?: PublicationOmit<ExtArgs> | null
    /**
     * The data needed to create a Publication.
     */
    data: XOR<PublicationCreateInput, PublicationUncheckedCreateInput>
  }

  /**
   * Publication createMany
   */
  export type PublicationCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Publications.
     */
    data: PublicationCreateManyInput | PublicationCreateManyInput[]
  }

  /**
   * Publication createManyAndReturn
   */
  export type PublicationCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Publication
     */
    select?: PublicationSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Publication
     */
    omit?: PublicationOmit<ExtArgs> | null
    /**
     * The data used to create many Publications.
     */
    data: PublicationCreateManyInput | PublicationCreateManyInput[]
  }

  /**
   * Publication update
   */
  export type PublicationUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Publication
     */
    select?: PublicationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Publication
     */
    omit?: PublicationOmit<ExtArgs> | null
    /**
     * The data needed to update a Publication.
     */
    data: XOR<PublicationUpdateInput, PublicationUncheckedUpdateInput>
    /**
     * Choose, which Publication to update.
     */
    where: PublicationWhereUniqueInput
  }

  /**
   * Publication updateMany
   */
  export type PublicationUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Publications.
     */
    data: XOR<PublicationUpdateManyMutationInput, PublicationUncheckedUpdateManyInput>
    /**
     * Filter which Publications to update
     */
    where?: PublicationWhereInput
    /**
     * Limit how many Publications to update.
     */
    limit?: number
  }

  /**
   * Publication updateManyAndReturn
   */
  export type PublicationUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Publication
     */
    select?: PublicationSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Publication
     */
    omit?: PublicationOmit<ExtArgs> | null
    /**
     * The data used to update Publications.
     */
    data: XOR<PublicationUpdateManyMutationInput, PublicationUncheckedUpdateManyInput>
    /**
     * Filter which Publications to update
     */
    where?: PublicationWhereInput
    /**
     * Limit how many Publications to update.
     */
    limit?: number
  }

  /**
   * Publication upsert
   */
  export type PublicationUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Publication
     */
    select?: PublicationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Publication
     */
    omit?: PublicationOmit<ExtArgs> | null
    /**
     * The filter to search for the Publication to update in case it exists.
     */
    where: PublicationWhereUniqueInput
    /**
     * In case the Publication found by the `where` argument doesn't exist, create a new Publication with this data.
     */
    create: XOR<PublicationCreateInput, PublicationUncheckedCreateInput>
    /**
     * In case the Publication was found with the provided `where` argument, update it with this data.
     */
    update: XOR<PublicationUpdateInput, PublicationUncheckedUpdateInput>
  }

  /**
   * Publication delete
   */
  export type PublicationDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Publication
     */
    select?: PublicationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Publication
     */
    omit?: PublicationOmit<ExtArgs> | null
    /**
     * Filter which Publication to delete.
     */
    where: PublicationWhereUniqueInput
  }

  /**
   * Publication deleteMany
   */
  export type PublicationDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Publications to delete
     */
    where?: PublicationWhereInput
    /**
     * Limit how many Publications to delete.
     */
    limit?: number
  }

  /**
   * Publication without action
   */
  export type PublicationDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Publication
     */
    select?: PublicationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Publication
     */
    omit?: PublicationOmit<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const UserScalarFieldEnum: {
    id: 'id',
    username: 'username',
    passwordHash: 'passwordHash',
    name: 'name',
    email: 'email',
    phone: 'phone',
    role: 'role',
    status: 'status',
    credits: 'credits',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum]


  export const DocumentTemplateScalarFieldEnum: {
    id: 'id',
    name: 'name',
    description: 'description',
    category: 'category',
    subcategory: 'subcategory',
    legalArea: 'legalArea',
    audience: 'audience',
    status: 'status',
    price: 'price',
    estimatedQuestions: 'estimatedQuestions',
    estimatedMinutes: 'estimatedMinutes',
    rating: 'rating',
    ratingCount: 'ratingCount',
    thumbnail: 'thumbnail',
    baseContent: 'baseContent',
    headerContent: 'headerContent',
    footerContent: 'footerContent',
    wizardConfig: 'wizardConfig',
    blurPreview: 'blurPreview',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type DocumentTemplateScalarFieldEnum = (typeof DocumentTemplateScalarFieldEnum)[keyof typeof DocumentTemplateScalarFieldEnum]


  export const ClauseScalarFieldEnum: {
    id: 'id',
    title: 'title',
    content: 'content',
    legalArea: 'legalArea',
    category: 'category',
    isDefault: 'isDefault',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type ClauseScalarFieldEnum = (typeof ClauseScalarFieldEnum)[keyof typeof ClauseScalarFieldEnum]


  export const TemplateClauseScalarFieldEnum: {
    id: 'id',
    templateId: 'templateId',
    clauseId: 'clauseId',
    sectionName: 'sectionName',
    order: 'order'
  };

  export type TemplateClauseScalarFieldEnum = (typeof TemplateClauseScalarFieldEnum)[keyof typeof TemplateClauseScalarFieldEnum]


  export const TemplateNormativityScalarFieldEnum: {
    id: 'id',
    templateId: 'templateId',
    lawName: 'lawName',
    lawReference: 'lawReference',
    articleNumber: 'articleNumber',
    description: 'description'
  };

  export type TemplateNormativityScalarFieldEnum = (typeof TemplateNormativityScalarFieldEnum)[keyof typeof TemplateNormativityScalarFieldEnum]


  export const UserDocumentScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    templateId: 'templateId',
    title: 'title',
    status: 'status',
    answers: 'answers',
    generatedContent: 'generatedContent',
    visitorPhone: 'visitorPhone',
    visitorName: 'visitorName',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type UserDocumentScalarFieldEnum = (typeof UserDocumentScalarFieldEnum)[keyof typeof UserDocumentScalarFieldEnum]


  export const ContactScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    name: 'name',
    contactType: 'contactType',
    documentType: 'documentType',
    documentNumber: 'documentNumber',
    address: 'address',
    city: 'city',
    phone: 'phone',
    email: 'email',
    companyName: 'companyName',
    notes: 'notes',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type ContactScalarFieldEnum = (typeof ContactScalarFieldEnum)[keyof typeof ContactScalarFieldEnum]


  export const DocumentRequestScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    title: 'title',
    description: 'description',
    status: 'status',
    adminNotes: 'adminNotes',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type DocumentRequestScalarFieldEnum = (typeof DocumentRequestScalarFieldEnum)[keyof typeof DocumentRequestScalarFieldEnum]


  export const SiteSettingScalarFieldEnum: {
    id: 'id',
    key: 'key',
    value: 'value',
    updatedAt: 'updatedAt'
  };

  export type SiteSettingScalarFieldEnum = (typeof SiteSettingScalarFieldEnum)[keyof typeof SiteSettingScalarFieldEnum]


  export const PaymentScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    amount: 'amount',
    currency: 'currency',
    paymentMethod: 'paymentMethod',
    paymentGateway: 'paymentGateway',
    transactionRef: 'transactionRef',
    status: 'status',
    planName: 'planName',
    documentId: 'documentId',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type PaymentScalarFieldEnum = (typeof PaymentScalarFieldEnum)[keyof typeof PaymentScalarFieldEnum]


  export const CreditTransactionScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    amount: 'amount',
    type: 'type',
    description: 'description',
    adminId: 'adminId',
    createdAt: 'createdAt'
  };

  export type CreditTransactionScalarFieldEnum = (typeof CreditTransactionScalarFieldEnum)[keyof typeof CreditTransactionScalarFieldEnum]


  export const KnowledgeBaseScalarFieldEnum: {
    id: 'id',
    title: 'title',
    content: 'content',
    category: 'category',
    active: 'active',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type KnowledgeBaseScalarFieldEnum = (typeof KnowledgeBaseScalarFieldEnum)[keyof typeof KnowledgeBaseScalarFieldEnum]


  export const PublicationScalarFieldEnum: {
    id: 'id',
    title: 'title',
    description: 'description',
    content: 'content',
    imageUrl: 'imageUrl',
    order: 'order',
    active: 'active',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type PublicationScalarFieldEnum = (typeof PublicationScalarFieldEnum)[keyof typeof PublicationScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    
  /**
   * Deep Input Types
   */


  export type UserWhereInput = {
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    id?: StringFilter<"User"> | string
    username?: StringFilter<"User"> | string
    passwordHash?: StringFilter<"User"> | string
    name?: StringFilter<"User"> | string
    email?: StringNullableFilter<"User"> | string | null
    phone?: StringNullableFilter<"User"> | string | null
    role?: StringFilter<"User"> | string
    status?: StringFilter<"User"> | string
    credits?: IntFilter<"User"> | number
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    documents?: UserDocumentListRelationFilter
    contacts?: ContactListRelationFilter
    creditTransactions?: CreditTransactionListRelationFilter
    creditGrants?: CreditTransactionListRelationFilter
  }

  export type UserOrderByWithRelationInput = {
    id?: SortOrder
    username?: SortOrder
    passwordHash?: SortOrder
    name?: SortOrder
    email?: SortOrderInput | SortOrder
    phone?: SortOrderInput | SortOrder
    role?: SortOrder
    status?: SortOrder
    credits?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    documents?: UserDocumentOrderByRelationAggregateInput
    contacts?: ContactOrderByRelationAggregateInput
    creditTransactions?: CreditTransactionOrderByRelationAggregateInput
    creditGrants?: CreditTransactionOrderByRelationAggregateInput
  }

  export type UserWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    username?: string
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    passwordHash?: StringFilter<"User"> | string
    name?: StringFilter<"User"> | string
    email?: StringNullableFilter<"User"> | string | null
    phone?: StringNullableFilter<"User"> | string | null
    role?: StringFilter<"User"> | string
    status?: StringFilter<"User"> | string
    credits?: IntFilter<"User"> | number
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    documents?: UserDocumentListRelationFilter
    contacts?: ContactListRelationFilter
    creditTransactions?: CreditTransactionListRelationFilter
    creditGrants?: CreditTransactionListRelationFilter
  }, "id" | "username">

  export type UserOrderByWithAggregationInput = {
    id?: SortOrder
    username?: SortOrder
    passwordHash?: SortOrder
    name?: SortOrder
    email?: SortOrderInput | SortOrder
    phone?: SortOrderInput | SortOrder
    role?: SortOrder
    status?: SortOrder
    credits?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: UserCountOrderByAggregateInput
    _avg?: UserAvgOrderByAggregateInput
    _max?: UserMaxOrderByAggregateInput
    _min?: UserMinOrderByAggregateInput
    _sum?: UserSumOrderByAggregateInput
  }

  export type UserScalarWhereWithAggregatesInput = {
    AND?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    OR?: UserScalarWhereWithAggregatesInput[]
    NOT?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"User"> | string
    username?: StringWithAggregatesFilter<"User"> | string
    passwordHash?: StringWithAggregatesFilter<"User"> | string
    name?: StringWithAggregatesFilter<"User"> | string
    email?: StringNullableWithAggregatesFilter<"User"> | string | null
    phone?: StringNullableWithAggregatesFilter<"User"> | string | null
    role?: StringWithAggregatesFilter<"User"> | string
    status?: StringWithAggregatesFilter<"User"> | string
    credits?: IntWithAggregatesFilter<"User"> | number
    createdAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
  }

  export type DocumentTemplateWhereInput = {
    AND?: DocumentTemplateWhereInput | DocumentTemplateWhereInput[]
    OR?: DocumentTemplateWhereInput[]
    NOT?: DocumentTemplateWhereInput | DocumentTemplateWhereInput[]
    id?: StringFilter<"DocumentTemplate"> | string
    name?: StringFilter<"DocumentTemplate"> | string
    description?: StringFilter<"DocumentTemplate"> | string
    category?: StringFilter<"DocumentTemplate"> | string
    subcategory?: StringNullableFilter<"DocumentTemplate"> | string | null
    legalArea?: StringFilter<"DocumentTemplate"> | string
    audience?: StringFilter<"DocumentTemplate"> | string
    status?: StringFilter<"DocumentTemplate"> | string
    price?: FloatFilter<"DocumentTemplate"> | number
    estimatedQuestions?: IntFilter<"DocumentTemplate"> | number
    estimatedMinutes?: IntFilter<"DocumentTemplate"> | number
    rating?: FloatFilter<"DocumentTemplate"> | number
    ratingCount?: IntFilter<"DocumentTemplate"> | number
    thumbnail?: StringNullableFilter<"DocumentTemplate"> | string | null
    baseContent?: StringFilter<"DocumentTemplate"> | string
    headerContent?: StringNullableFilter<"DocumentTemplate"> | string | null
    footerContent?: StringNullableFilter<"DocumentTemplate"> | string | null
    wizardConfig?: StringFilter<"DocumentTemplate"> | string
    blurPreview?: BoolFilter<"DocumentTemplate"> | boolean
    createdAt?: DateTimeFilter<"DocumentTemplate"> | Date | string
    updatedAt?: DateTimeFilter<"DocumentTemplate"> | Date | string
    clauses?: TemplateClauseListRelationFilter
    normativity?: TemplateNormativityListRelationFilter
    documents?: UserDocumentListRelationFilter
  }

  export type DocumentTemplateOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrder
    category?: SortOrder
    subcategory?: SortOrderInput | SortOrder
    legalArea?: SortOrder
    audience?: SortOrder
    status?: SortOrder
    price?: SortOrder
    estimatedQuestions?: SortOrder
    estimatedMinutes?: SortOrder
    rating?: SortOrder
    ratingCount?: SortOrder
    thumbnail?: SortOrderInput | SortOrder
    baseContent?: SortOrder
    headerContent?: SortOrderInput | SortOrder
    footerContent?: SortOrderInput | SortOrder
    wizardConfig?: SortOrder
    blurPreview?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    clauses?: TemplateClauseOrderByRelationAggregateInput
    normativity?: TemplateNormativityOrderByRelationAggregateInput
    documents?: UserDocumentOrderByRelationAggregateInput
  }

  export type DocumentTemplateWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: DocumentTemplateWhereInput | DocumentTemplateWhereInput[]
    OR?: DocumentTemplateWhereInput[]
    NOT?: DocumentTemplateWhereInput | DocumentTemplateWhereInput[]
    name?: StringFilter<"DocumentTemplate"> | string
    description?: StringFilter<"DocumentTemplate"> | string
    category?: StringFilter<"DocumentTemplate"> | string
    subcategory?: StringNullableFilter<"DocumentTemplate"> | string | null
    legalArea?: StringFilter<"DocumentTemplate"> | string
    audience?: StringFilter<"DocumentTemplate"> | string
    status?: StringFilter<"DocumentTemplate"> | string
    price?: FloatFilter<"DocumentTemplate"> | number
    estimatedQuestions?: IntFilter<"DocumentTemplate"> | number
    estimatedMinutes?: IntFilter<"DocumentTemplate"> | number
    rating?: FloatFilter<"DocumentTemplate"> | number
    ratingCount?: IntFilter<"DocumentTemplate"> | number
    thumbnail?: StringNullableFilter<"DocumentTemplate"> | string | null
    baseContent?: StringFilter<"DocumentTemplate"> | string
    headerContent?: StringNullableFilter<"DocumentTemplate"> | string | null
    footerContent?: StringNullableFilter<"DocumentTemplate"> | string | null
    wizardConfig?: StringFilter<"DocumentTemplate"> | string
    blurPreview?: BoolFilter<"DocumentTemplate"> | boolean
    createdAt?: DateTimeFilter<"DocumentTemplate"> | Date | string
    updatedAt?: DateTimeFilter<"DocumentTemplate"> | Date | string
    clauses?: TemplateClauseListRelationFilter
    normativity?: TemplateNormativityListRelationFilter
    documents?: UserDocumentListRelationFilter
  }, "id">

  export type DocumentTemplateOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrder
    category?: SortOrder
    subcategory?: SortOrderInput | SortOrder
    legalArea?: SortOrder
    audience?: SortOrder
    status?: SortOrder
    price?: SortOrder
    estimatedQuestions?: SortOrder
    estimatedMinutes?: SortOrder
    rating?: SortOrder
    ratingCount?: SortOrder
    thumbnail?: SortOrderInput | SortOrder
    baseContent?: SortOrder
    headerContent?: SortOrderInput | SortOrder
    footerContent?: SortOrderInput | SortOrder
    wizardConfig?: SortOrder
    blurPreview?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: DocumentTemplateCountOrderByAggregateInput
    _avg?: DocumentTemplateAvgOrderByAggregateInput
    _max?: DocumentTemplateMaxOrderByAggregateInput
    _min?: DocumentTemplateMinOrderByAggregateInput
    _sum?: DocumentTemplateSumOrderByAggregateInput
  }

  export type DocumentTemplateScalarWhereWithAggregatesInput = {
    AND?: DocumentTemplateScalarWhereWithAggregatesInput | DocumentTemplateScalarWhereWithAggregatesInput[]
    OR?: DocumentTemplateScalarWhereWithAggregatesInput[]
    NOT?: DocumentTemplateScalarWhereWithAggregatesInput | DocumentTemplateScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"DocumentTemplate"> | string
    name?: StringWithAggregatesFilter<"DocumentTemplate"> | string
    description?: StringWithAggregatesFilter<"DocumentTemplate"> | string
    category?: StringWithAggregatesFilter<"DocumentTemplate"> | string
    subcategory?: StringNullableWithAggregatesFilter<"DocumentTemplate"> | string | null
    legalArea?: StringWithAggregatesFilter<"DocumentTemplate"> | string
    audience?: StringWithAggregatesFilter<"DocumentTemplate"> | string
    status?: StringWithAggregatesFilter<"DocumentTemplate"> | string
    price?: FloatWithAggregatesFilter<"DocumentTemplate"> | number
    estimatedQuestions?: IntWithAggregatesFilter<"DocumentTemplate"> | number
    estimatedMinutes?: IntWithAggregatesFilter<"DocumentTemplate"> | number
    rating?: FloatWithAggregatesFilter<"DocumentTemplate"> | number
    ratingCount?: IntWithAggregatesFilter<"DocumentTemplate"> | number
    thumbnail?: StringNullableWithAggregatesFilter<"DocumentTemplate"> | string | null
    baseContent?: StringWithAggregatesFilter<"DocumentTemplate"> | string
    headerContent?: StringNullableWithAggregatesFilter<"DocumentTemplate"> | string | null
    footerContent?: StringNullableWithAggregatesFilter<"DocumentTemplate"> | string | null
    wizardConfig?: StringWithAggregatesFilter<"DocumentTemplate"> | string
    blurPreview?: BoolWithAggregatesFilter<"DocumentTemplate"> | boolean
    createdAt?: DateTimeWithAggregatesFilter<"DocumentTemplate"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"DocumentTemplate"> | Date | string
  }

  export type ClauseWhereInput = {
    AND?: ClauseWhereInput | ClauseWhereInput[]
    OR?: ClauseWhereInput[]
    NOT?: ClauseWhereInput | ClauseWhereInput[]
    id?: StringFilter<"Clause"> | string
    title?: StringFilter<"Clause"> | string
    content?: StringFilter<"Clause"> | string
    legalArea?: StringNullableFilter<"Clause"> | string | null
    category?: StringNullableFilter<"Clause"> | string | null
    isDefault?: BoolFilter<"Clause"> | boolean
    createdAt?: DateTimeFilter<"Clause"> | Date | string
    updatedAt?: DateTimeFilter<"Clause"> | Date | string
    templates?: TemplateClauseListRelationFilter
  }

  export type ClauseOrderByWithRelationInput = {
    id?: SortOrder
    title?: SortOrder
    content?: SortOrder
    legalArea?: SortOrderInput | SortOrder
    category?: SortOrderInput | SortOrder
    isDefault?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    templates?: TemplateClauseOrderByRelationAggregateInput
  }

  export type ClauseWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: ClauseWhereInput | ClauseWhereInput[]
    OR?: ClauseWhereInput[]
    NOT?: ClauseWhereInput | ClauseWhereInput[]
    title?: StringFilter<"Clause"> | string
    content?: StringFilter<"Clause"> | string
    legalArea?: StringNullableFilter<"Clause"> | string | null
    category?: StringNullableFilter<"Clause"> | string | null
    isDefault?: BoolFilter<"Clause"> | boolean
    createdAt?: DateTimeFilter<"Clause"> | Date | string
    updatedAt?: DateTimeFilter<"Clause"> | Date | string
    templates?: TemplateClauseListRelationFilter
  }, "id">

  export type ClauseOrderByWithAggregationInput = {
    id?: SortOrder
    title?: SortOrder
    content?: SortOrder
    legalArea?: SortOrderInput | SortOrder
    category?: SortOrderInput | SortOrder
    isDefault?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: ClauseCountOrderByAggregateInput
    _max?: ClauseMaxOrderByAggregateInput
    _min?: ClauseMinOrderByAggregateInput
  }

  export type ClauseScalarWhereWithAggregatesInput = {
    AND?: ClauseScalarWhereWithAggregatesInput | ClauseScalarWhereWithAggregatesInput[]
    OR?: ClauseScalarWhereWithAggregatesInput[]
    NOT?: ClauseScalarWhereWithAggregatesInput | ClauseScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Clause"> | string
    title?: StringWithAggregatesFilter<"Clause"> | string
    content?: StringWithAggregatesFilter<"Clause"> | string
    legalArea?: StringNullableWithAggregatesFilter<"Clause"> | string | null
    category?: StringNullableWithAggregatesFilter<"Clause"> | string | null
    isDefault?: BoolWithAggregatesFilter<"Clause"> | boolean
    createdAt?: DateTimeWithAggregatesFilter<"Clause"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Clause"> | Date | string
  }

  export type TemplateClauseWhereInput = {
    AND?: TemplateClauseWhereInput | TemplateClauseWhereInput[]
    OR?: TemplateClauseWhereInput[]
    NOT?: TemplateClauseWhereInput | TemplateClauseWhereInput[]
    id?: StringFilter<"TemplateClause"> | string
    templateId?: StringFilter<"TemplateClause"> | string
    clauseId?: StringFilter<"TemplateClause"> | string
    sectionName?: StringNullableFilter<"TemplateClause"> | string | null
    order?: IntFilter<"TemplateClause"> | number
    template?: XOR<DocumentTemplateScalarRelationFilter, DocumentTemplateWhereInput>
    clause?: XOR<ClauseScalarRelationFilter, ClauseWhereInput>
  }

  export type TemplateClauseOrderByWithRelationInput = {
    id?: SortOrder
    templateId?: SortOrder
    clauseId?: SortOrder
    sectionName?: SortOrderInput | SortOrder
    order?: SortOrder
    template?: DocumentTemplateOrderByWithRelationInput
    clause?: ClauseOrderByWithRelationInput
  }

  export type TemplateClauseWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: TemplateClauseWhereInput | TemplateClauseWhereInput[]
    OR?: TemplateClauseWhereInput[]
    NOT?: TemplateClauseWhereInput | TemplateClauseWhereInput[]
    templateId?: StringFilter<"TemplateClause"> | string
    clauseId?: StringFilter<"TemplateClause"> | string
    sectionName?: StringNullableFilter<"TemplateClause"> | string | null
    order?: IntFilter<"TemplateClause"> | number
    template?: XOR<DocumentTemplateScalarRelationFilter, DocumentTemplateWhereInput>
    clause?: XOR<ClauseScalarRelationFilter, ClauseWhereInput>
  }, "id">

  export type TemplateClauseOrderByWithAggregationInput = {
    id?: SortOrder
    templateId?: SortOrder
    clauseId?: SortOrder
    sectionName?: SortOrderInput | SortOrder
    order?: SortOrder
    _count?: TemplateClauseCountOrderByAggregateInput
    _avg?: TemplateClauseAvgOrderByAggregateInput
    _max?: TemplateClauseMaxOrderByAggregateInput
    _min?: TemplateClauseMinOrderByAggregateInput
    _sum?: TemplateClauseSumOrderByAggregateInput
  }

  export type TemplateClauseScalarWhereWithAggregatesInput = {
    AND?: TemplateClauseScalarWhereWithAggregatesInput | TemplateClauseScalarWhereWithAggregatesInput[]
    OR?: TemplateClauseScalarWhereWithAggregatesInput[]
    NOT?: TemplateClauseScalarWhereWithAggregatesInput | TemplateClauseScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"TemplateClause"> | string
    templateId?: StringWithAggregatesFilter<"TemplateClause"> | string
    clauseId?: StringWithAggregatesFilter<"TemplateClause"> | string
    sectionName?: StringNullableWithAggregatesFilter<"TemplateClause"> | string | null
    order?: IntWithAggregatesFilter<"TemplateClause"> | number
  }

  export type TemplateNormativityWhereInput = {
    AND?: TemplateNormativityWhereInput | TemplateNormativityWhereInput[]
    OR?: TemplateNormativityWhereInput[]
    NOT?: TemplateNormativityWhereInput | TemplateNormativityWhereInput[]
    id?: StringFilter<"TemplateNormativity"> | string
    templateId?: StringFilter<"TemplateNormativity"> | string
    lawName?: StringFilter<"TemplateNormativity"> | string
    lawReference?: StringFilter<"TemplateNormativity"> | string
    articleNumber?: StringNullableFilter<"TemplateNormativity"> | string | null
    description?: StringNullableFilter<"TemplateNormativity"> | string | null
    template?: XOR<DocumentTemplateScalarRelationFilter, DocumentTemplateWhereInput>
  }

  export type TemplateNormativityOrderByWithRelationInput = {
    id?: SortOrder
    templateId?: SortOrder
    lawName?: SortOrder
    lawReference?: SortOrder
    articleNumber?: SortOrderInput | SortOrder
    description?: SortOrderInput | SortOrder
    template?: DocumentTemplateOrderByWithRelationInput
  }

  export type TemplateNormativityWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: TemplateNormativityWhereInput | TemplateNormativityWhereInput[]
    OR?: TemplateNormativityWhereInput[]
    NOT?: TemplateNormativityWhereInput | TemplateNormativityWhereInput[]
    templateId?: StringFilter<"TemplateNormativity"> | string
    lawName?: StringFilter<"TemplateNormativity"> | string
    lawReference?: StringFilter<"TemplateNormativity"> | string
    articleNumber?: StringNullableFilter<"TemplateNormativity"> | string | null
    description?: StringNullableFilter<"TemplateNormativity"> | string | null
    template?: XOR<DocumentTemplateScalarRelationFilter, DocumentTemplateWhereInput>
  }, "id">

  export type TemplateNormativityOrderByWithAggregationInput = {
    id?: SortOrder
    templateId?: SortOrder
    lawName?: SortOrder
    lawReference?: SortOrder
    articleNumber?: SortOrderInput | SortOrder
    description?: SortOrderInput | SortOrder
    _count?: TemplateNormativityCountOrderByAggregateInput
    _max?: TemplateNormativityMaxOrderByAggregateInput
    _min?: TemplateNormativityMinOrderByAggregateInput
  }

  export type TemplateNormativityScalarWhereWithAggregatesInput = {
    AND?: TemplateNormativityScalarWhereWithAggregatesInput | TemplateNormativityScalarWhereWithAggregatesInput[]
    OR?: TemplateNormativityScalarWhereWithAggregatesInput[]
    NOT?: TemplateNormativityScalarWhereWithAggregatesInput | TemplateNormativityScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"TemplateNormativity"> | string
    templateId?: StringWithAggregatesFilter<"TemplateNormativity"> | string
    lawName?: StringWithAggregatesFilter<"TemplateNormativity"> | string
    lawReference?: StringWithAggregatesFilter<"TemplateNormativity"> | string
    articleNumber?: StringNullableWithAggregatesFilter<"TemplateNormativity"> | string | null
    description?: StringNullableWithAggregatesFilter<"TemplateNormativity"> | string | null
  }

  export type UserDocumentWhereInput = {
    AND?: UserDocumentWhereInput | UserDocumentWhereInput[]
    OR?: UserDocumentWhereInput[]
    NOT?: UserDocumentWhereInput | UserDocumentWhereInput[]
    id?: StringFilter<"UserDocument"> | string
    userId?: StringNullableFilter<"UserDocument"> | string | null
    templateId?: StringFilter<"UserDocument"> | string
    title?: StringFilter<"UserDocument"> | string
    status?: StringFilter<"UserDocument"> | string
    answers?: StringFilter<"UserDocument"> | string
    generatedContent?: StringNullableFilter<"UserDocument"> | string | null
    visitorPhone?: StringNullableFilter<"UserDocument"> | string | null
    visitorName?: StringNullableFilter<"UserDocument"> | string | null
    createdAt?: DateTimeFilter<"UserDocument"> | Date | string
    updatedAt?: DateTimeFilter<"UserDocument"> | Date | string
    template?: XOR<DocumentTemplateScalarRelationFilter, DocumentTemplateWhereInput>
    user?: XOR<UserNullableScalarRelationFilter, UserWhereInput> | null
  }

  export type UserDocumentOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrderInput | SortOrder
    templateId?: SortOrder
    title?: SortOrder
    status?: SortOrder
    answers?: SortOrder
    generatedContent?: SortOrderInput | SortOrder
    visitorPhone?: SortOrderInput | SortOrder
    visitorName?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    template?: DocumentTemplateOrderByWithRelationInput
    user?: UserOrderByWithRelationInput
  }

  export type UserDocumentWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: UserDocumentWhereInput | UserDocumentWhereInput[]
    OR?: UserDocumentWhereInput[]
    NOT?: UserDocumentWhereInput | UserDocumentWhereInput[]
    userId?: StringNullableFilter<"UserDocument"> | string | null
    templateId?: StringFilter<"UserDocument"> | string
    title?: StringFilter<"UserDocument"> | string
    status?: StringFilter<"UserDocument"> | string
    answers?: StringFilter<"UserDocument"> | string
    generatedContent?: StringNullableFilter<"UserDocument"> | string | null
    visitorPhone?: StringNullableFilter<"UserDocument"> | string | null
    visitorName?: StringNullableFilter<"UserDocument"> | string | null
    createdAt?: DateTimeFilter<"UserDocument"> | Date | string
    updatedAt?: DateTimeFilter<"UserDocument"> | Date | string
    template?: XOR<DocumentTemplateScalarRelationFilter, DocumentTemplateWhereInput>
    user?: XOR<UserNullableScalarRelationFilter, UserWhereInput> | null
  }, "id">

  export type UserDocumentOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrderInput | SortOrder
    templateId?: SortOrder
    title?: SortOrder
    status?: SortOrder
    answers?: SortOrder
    generatedContent?: SortOrderInput | SortOrder
    visitorPhone?: SortOrderInput | SortOrder
    visitorName?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: UserDocumentCountOrderByAggregateInput
    _max?: UserDocumentMaxOrderByAggregateInput
    _min?: UserDocumentMinOrderByAggregateInput
  }

  export type UserDocumentScalarWhereWithAggregatesInput = {
    AND?: UserDocumentScalarWhereWithAggregatesInput | UserDocumentScalarWhereWithAggregatesInput[]
    OR?: UserDocumentScalarWhereWithAggregatesInput[]
    NOT?: UserDocumentScalarWhereWithAggregatesInput | UserDocumentScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"UserDocument"> | string
    userId?: StringNullableWithAggregatesFilter<"UserDocument"> | string | null
    templateId?: StringWithAggregatesFilter<"UserDocument"> | string
    title?: StringWithAggregatesFilter<"UserDocument"> | string
    status?: StringWithAggregatesFilter<"UserDocument"> | string
    answers?: StringWithAggregatesFilter<"UserDocument"> | string
    generatedContent?: StringNullableWithAggregatesFilter<"UserDocument"> | string | null
    visitorPhone?: StringNullableWithAggregatesFilter<"UserDocument"> | string | null
    visitorName?: StringNullableWithAggregatesFilter<"UserDocument"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"UserDocument"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"UserDocument"> | Date | string
  }

  export type ContactWhereInput = {
    AND?: ContactWhereInput | ContactWhereInput[]
    OR?: ContactWhereInput[]
    NOT?: ContactWhereInput | ContactWhereInput[]
    id?: StringFilter<"Contact"> | string
    userId?: StringFilter<"Contact"> | string
    name?: StringFilter<"Contact"> | string
    contactType?: StringFilter<"Contact"> | string
    documentType?: StringNullableFilter<"Contact"> | string | null
    documentNumber?: StringNullableFilter<"Contact"> | string | null
    address?: StringNullableFilter<"Contact"> | string | null
    city?: StringNullableFilter<"Contact"> | string | null
    phone?: StringNullableFilter<"Contact"> | string | null
    email?: StringNullableFilter<"Contact"> | string | null
    companyName?: StringNullableFilter<"Contact"> | string | null
    notes?: StringNullableFilter<"Contact"> | string | null
    createdAt?: DateTimeFilter<"Contact"> | Date | string
    updatedAt?: DateTimeFilter<"Contact"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type ContactOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    name?: SortOrder
    contactType?: SortOrder
    documentType?: SortOrderInput | SortOrder
    documentNumber?: SortOrderInput | SortOrder
    address?: SortOrderInput | SortOrder
    city?: SortOrderInput | SortOrder
    phone?: SortOrderInput | SortOrder
    email?: SortOrderInput | SortOrder
    companyName?: SortOrderInput | SortOrder
    notes?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    user?: UserOrderByWithRelationInput
  }

  export type ContactWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: ContactWhereInput | ContactWhereInput[]
    OR?: ContactWhereInput[]
    NOT?: ContactWhereInput | ContactWhereInput[]
    userId?: StringFilter<"Contact"> | string
    name?: StringFilter<"Contact"> | string
    contactType?: StringFilter<"Contact"> | string
    documentType?: StringNullableFilter<"Contact"> | string | null
    documentNumber?: StringNullableFilter<"Contact"> | string | null
    address?: StringNullableFilter<"Contact"> | string | null
    city?: StringNullableFilter<"Contact"> | string | null
    phone?: StringNullableFilter<"Contact"> | string | null
    email?: StringNullableFilter<"Contact"> | string | null
    companyName?: StringNullableFilter<"Contact"> | string | null
    notes?: StringNullableFilter<"Contact"> | string | null
    createdAt?: DateTimeFilter<"Contact"> | Date | string
    updatedAt?: DateTimeFilter<"Contact"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "id">

  export type ContactOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    name?: SortOrder
    contactType?: SortOrder
    documentType?: SortOrderInput | SortOrder
    documentNumber?: SortOrderInput | SortOrder
    address?: SortOrderInput | SortOrder
    city?: SortOrderInput | SortOrder
    phone?: SortOrderInput | SortOrder
    email?: SortOrderInput | SortOrder
    companyName?: SortOrderInput | SortOrder
    notes?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: ContactCountOrderByAggregateInput
    _max?: ContactMaxOrderByAggregateInput
    _min?: ContactMinOrderByAggregateInput
  }

  export type ContactScalarWhereWithAggregatesInput = {
    AND?: ContactScalarWhereWithAggregatesInput | ContactScalarWhereWithAggregatesInput[]
    OR?: ContactScalarWhereWithAggregatesInput[]
    NOT?: ContactScalarWhereWithAggregatesInput | ContactScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Contact"> | string
    userId?: StringWithAggregatesFilter<"Contact"> | string
    name?: StringWithAggregatesFilter<"Contact"> | string
    contactType?: StringWithAggregatesFilter<"Contact"> | string
    documentType?: StringNullableWithAggregatesFilter<"Contact"> | string | null
    documentNumber?: StringNullableWithAggregatesFilter<"Contact"> | string | null
    address?: StringNullableWithAggregatesFilter<"Contact"> | string | null
    city?: StringNullableWithAggregatesFilter<"Contact"> | string | null
    phone?: StringNullableWithAggregatesFilter<"Contact"> | string | null
    email?: StringNullableWithAggregatesFilter<"Contact"> | string | null
    companyName?: StringNullableWithAggregatesFilter<"Contact"> | string | null
    notes?: StringNullableWithAggregatesFilter<"Contact"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"Contact"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Contact"> | Date | string
  }

  export type DocumentRequestWhereInput = {
    AND?: DocumentRequestWhereInput | DocumentRequestWhereInput[]
    OR?: DocumentRequestWhereInput[]
    NOT?: DocumentRequestWhereInput | DocumentRequestWhereInput[]
    id?: StringFilter<"DocumentRequest"> | string
    userId?: StringNullableFilter<"DocumentRequest"> | string | null
    title?: StringFilter<"DocumentRequest"> | string
    description?: StringFilter<"DocumentRequest"> | string
    status?: StringFilter<"DocumentRequest"> | string
    adminNotes?: StringNullableFilter<"DocumentRequest"> | string | null
    createdAt?: DateTimeFilter<"DocumentRequest"> | Date | string
    updatedAt?: DateTimeFilter<"DocumentRequest"> | Date | string
  }

  export type DocumentRequestOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrderInput | SortOrder
    title?: SortOrder
    description?: SortOrder
    status?: SortOrder
    adminNotes?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type DocumentRequestWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: DocumentRequestWhereInput | DocumentRequestWhereInput[]
    OR?: DocumentRequestWhereInput[]
    NOT?: DocumentRequestWhereInput | DocumentRequestWhereInput[]
    userId?: StringNullableFilter<"DocumentRequest"> | string | null
    title?: StringFilter<"DocumentRequest"> | string
    description?: StringFilter<"DocumentRequest"> | string
    status?: StringFilter<"DocumentRequest"> | string
    adminNotes?: StringNullableFilter<"DocumentRequest"> | string | null
    createdAt?: DateTimeFilter<"DocumentRequest"> | Date | string
    updatedAt?: DateTimeFilter<"DocumentRequest"> | Date | string
  }, "id">

  export type DocumentRequestOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrderInput | SortOrder
    title?: SortOrder
    description?: SortOrder
    status?: SortOrder
    adminNotes?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: DocumentRequestCountOrderByAggregateInput
    _max?: DocumentRequestMaxOrderByAggregateInput
    _min?: DocumentRequestMinOrderByAggregateInput
  }

  export type DocumentRequestScalarWhereWithAggregatesInput = {
    AND?: DocumentRequestScalarWhereWithAggregatesInput | DocumentRequestScalarWhereWithAggregatesInput[]
    OR?: DocumentRequestScalarWhereWithAggregatesInput[]
    NOT?: DocumentRequestScalarWhereWithAggregatesInput | DocumentRequestScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"DocumentRequest"> | string
    userId?: StringNullableWithAggregatesFilter<"DocumentRequest"> | string | null
    title?: StringWithAggregatesFilter<"DocumentRequest"> | string
    description?: StringWithAggregatesFilter<"DocumentRequest"> | string
    status?: StringWithAggregatesFilter<"DocumentRequest"> | string
    adminNotes?: StringNullableWithAggregatesFilter<"DocumentRequest"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"DocumentRequest"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"DocumentRequest"> | Date | string
  }

  export type SiteSettingWhereInput = {
    AND?: SiteSettingWhereInput | SiteSettingWhereInput[]
    OR?: SiteSettingWhereInput[]
    NOT?: SiteSettingWhereInput | SiteSettingWhereInput[]
    id?: StringFilter<"SiteSetting"> | string
    key?: StringFilter<"SiteSetting"> | string
    value?: StringFilter<"SiteSetting"> | string
    updatedAt?: DateTimeFilter<"SiteSetting"> | Date | string
  }

  export type SiteSettingOrderByWithRelationInput = {
    id?: SortOrder
    key?: SortOrder
    value?: SortOrder
    updatedAt?: SortOrder
  }

  export type SiteSettingWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    key?: string
    AND?: SiteSettingWhereInput | SiteSettingWhereInput[]
    OR?: SiteSettingWhereInput[]
    NOT?: SiteSettingWhereInput | SiteSettingWhereInput[]
    value?: StringFilter<"SiteSetting"> | string
    updatedAt?: DateTimeFilter<"SiteSetting"> | Date | string
  }, "id" | "key">

  export type SiteSettingOrderByWithAggregationInput = {
    id?: SortOrder
    key?: SortOrder
    value?: SortOrder
    updatedAt?: SortOrder
    _count?: SiteSettingCountOrderByAggregateInput
    _max?: SiteSettingMaxOrderByAggregateInput
    _min?: SiteSettingMinOrderByAggregateInput
  }

  export type SiteSettingScalarWhereWithAggregatesInput = {
    AND?: SiteSettingScalarWhereWithAggregatesInput | SiteSettingScalarWhereWithAggregatesInput[]
    OR?: SiteSettingScalarWhereWithAggregatesInput[]
    NOT?: SiteSettingScalarWhereWithAggregatesInput | SiteSettingScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"SiteSetting"> | string
    key?: StringWithAggregatesFilter<"SiteSetting"> | string
    value?: StringWithAggregatesFilter<"SiteSetting"> | string
    updatedAt?: DateTimeWithAggregatesFilter<"SiteSetting"> | Date | string
  }

  export type PaymentWhereInput = {
    AND?: PaymentWhereInput | PaymentWhereInput[]
    OR?: PaymentWhereInput[]
    NOT?: PaymentWhereInput | PaymentWhereInput[]
    id?: StringFilter<"Payment"> | string
    userId?: StringFilter<"Payment"> | string
    amount?: FloatFilter<"Payment"> | number
    currency?: StringFilter<"Payment"> | string
    paymentMethod?: StringNullableFilter<"Payment"> | string | null
    paymentGateway?: StringNullableFilter<"Payment"> | string | null
    transactionRef?: StringNullableFilter<"Payment"> | string | null
    status?: StringFilter<"Payment"> | string
    planName?: StringNullableFilter<"Payment"> | string | null
    documentId?: StringNullableFilter<"Payment"> | string | null
    createdAt?: DateTimeFilter<"Payment"> | Date | string
    updatedAt?: DateTimeFilter<"Payment"> | Date | string
  }

  export type PaymentOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    amount?: SortOrder
    currency?: SortOrder
    paymentMethod?: SortOrderInput | SortOrder
    paymentGateway?: SortOrderInput | SortOrder
    transactionRef?: SortOrderInput | SortOrder
    status?: SortOrder
    planName?: SortOrderInput | SortOrder
    documentId?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type PaymentWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: PaymentWhereInput | PaymentWhereInput[]
    OR?: PaymentWhereInput[]
    NOT?: PaymentWhereInput | PaymentWhereInput[]
    userId?: StringFilter<"Payment"> | string
    amount?: FloatFilter<"Payment"> | number
    currency?: StringFilter<"Payment"> | string
    paymentMethod?: StringNullableFilter<"Payment"> | string | null
    paymentGateway?: StringNullableFilter<"Payment"> | string | null
    transactionRef?: StringNullableFilter<"Payment"> | string | null
    status?: StringFilter<"Payment"> | string
    planName?: StringNullableFilter<"Payment"> | string | null
    documentId?: StringNullableFilter<"Payment"> | string | null
    createdAt?: DateTimeFilter<"Payment"> | Date | string
    updatedAt?: DateTimeFilter<"Payment"> | Date | string
  }, "id">

  export type PaymentOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    amount?: SortOrder
    currency?: SortOrder
    paymentMethod?: SortOrderInput | SortOrder
    paymentGateway?: SortOrderInput | SortOrder
    transactionRef?: SortOrderInput | SortOrder
    status?: SortOrder
    planName?: SortOrderInput | SortOrder
    documentId?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: PaymentCountOrderByAggregateInput
    _avg?: PaymentAvgOrderByAggregateInput
    _max?: PaymentMaxOrderByAggregateInput
    _min?: PaymentMinOrderByAggregateInput
    _sum?: PaymentSumOrderByAggregateInput
  }

  export type PaymentScalarWhereWithAggregatesInput = {
    AND?: PaymentScalarWhereWithAggregatesInput | PaymentScalarWhereWithAggregatesInput[]
    OR?: PaymentScalarWhereWithAggregatesInput[]
    NOT?: PaymentScalarWhereWithAggregatesInput | PaymentScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Payment"> | string
    userId?: StringWithAggregatesFilter<"Payment"> | string
    amount?: FloatWithAggregatesFilter<"Payment"> | number
    currency?: StringWithAggregatesFilter<"Payment"> | string
    paymentMethod?: StringNullableWithAggregatesFilter<"Payment"> | string | null
    paymentGateway?: StringNullableWithAggregatesFilter<"Payment"> | string | null
    transactionRef?: StringNullableWithAggregatesFilter<"Payment"> | string | null
    status?: StringWithAggregatesFilter<"Payment"> | string
    planName?: StringNullableWithAggregatesFilter<"Payment"> | string | null
    documentId?: StringNullableWithAggregatesFilter<"Payment"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"Payment"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Payment"> | Date | string
  }

  export type CreditTransactionWhereInput = {
    AND?: CreditTransactionWhereInput | CreditTransactionWhereInput[]
    OR?: CreditTransactionWhereInput[]
    NOT?: CreditTransactionWhereInput | CreditTransactionWhereInput[]
    id?: StringFilter<"CreditTransaction"> | string
    userId?: StringFilter<"CreditTransaction"> | string
    amount?: IntFilter<"CreditTransaction"> | number
    type?: StringFilter<"CreditTransaction"> | string
    description?: StringNullableFilter<"CreditTransaction"> | string | null
    adminId?: StringNullableFilter<"CreditTransaction"> | string | null
    createdAt?: DateTimeFilter<"CreditTransaction"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    admin?: XOR<UserNullableScalarRelationFilter, UserWhereInput> | null
  }

  export type CreditTransactionOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    amount?: SortOrder
    type?: SortOrder
    description?: SortOrderInput | SortOrder
    adminId?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    user?: UserOrderByWithRelationInput
    admin?: UserOrderByWithRelationInput
  }

  export type CreditTransactionWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: CreditTransactionWhereInput | CreditTransactionWhereInput[]
    OR?: CreditTransactionWhereInput[]
    NOT?: CreditTransactionWhereInput | CreditTransactionWhereInput[]
    userId?: StringFilter<"CreditTransaction"> | string
    amount?: IntFilter<"CreditTransaction"> | number
    type?: StringFilter<"CreditTransaction"> | string
    description?: StringNullableFilter<"CreditTransaction"> | string | null
    adminId?: StringNullableFilter<"CreditTransaction"> | string | null
    createdAt?: DateTimeFilter<"CreditTransaction"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    admin?: XOR<UserNullableScalarRelationFilter, UserWhereInput> | null
  }, "id">

  export type CreditTransactionOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    amount?: SortOrder
    type?: SortOrder
    description?: SortOrderInput | SortOrder
    adminId?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    _count?: CreditTransactionCountOrderByAggregateInput
    _avg?: CreditTransactionAvgOrderByAggregateInput
    _max?: CreditTransactionMaxOrderByAggregateInput
    _min?: CreditTransactionMinOrderByAggregateInput
    _sum?: CreditTransactionSumOrderByAggregateInput
  }

  export type CreditTransactionScalarWhereWithAggregatesInput = {
    AND?: CreditTransactionScalarWhereWithAggregatesInput | CreditTransactionScalarWhereWithAggregatesInput[]
    OR?: CreditTransactionScalarWhereWithAggregatesInput[]
    NOT?: CreditTransactionScalarWhereWithAggregatesInput | CreditTransactionScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"CreditTransaction"> | string
    userId?: StringWithAggregatesFilter<"CreditTransaction"> | string
    amount?: IntWithAggregatesFilter<"CreditTransaction"> | number
    type?: StringWithAggregatesFilter<"CreditTransaction"> | string
    description?: StringNullableWithAggregatesFilter<"CreditTransaction"> | string | null
    adminId?: StringNullableWithAggregatesFilter<"CreditTransaction"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"CreditTransaction"> | Date | string
  }

  export type KnowledgeBaseWhereInput = {
    AND?: KnowledgeBaseWhereInput | KnowledgeBaseWhereInput[]
    OR?: KnowledgeBaseWhereInput[]
    NOT?: KnowledgeBaseWhereInput | KnowledgeBaseWhereInput[]
    id?: StringFilter<"KnowledgeBase"> | string
    title?: StringFilter<"KnowledgeBase"> | string
    content?: StringFilter<"KnowledgeBase"> | string
    category?: StringFilter<"KnowledgeBase"> | string
    active?: BoolFilter<"KnowledgeBase"> | boolean
    createdAt?: DateTimeFilter<"KnowledgeBase"> | Date | string
    updatedAt?: DateTimeFilter<"KnowledgeBase"> | Date | string
  }

  export type KnowledgeBaseOrderByWithRelationInput = {
    id?: SortOrder
    title?: SortOrder
    content?: SortOrder
    category?: SortOrder
    active?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type KnowledgeBaseWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: KnowledgeBaseWhereInput | KnowledgeBaseWhereInput[]
    OR?: KnowledgeBaseWhereInput[]
    NOT?: KnowledgeBaseWhereInput | KnowledgeBaseWhereInput[]
    title?: StringFilter<"KnowledgeBase"> | string
    content?: StringFilter<"KnowledgeBase"> | string
    category?: StringFilter<"KnowledgeBase"> | string
    active?: BoolFilter<"KnowledgeBase"> | boolean
    createdAt?: DateTimeFilter<"KnowledgeBase"> | Date | string
    updatedAt?: DateTimeFilter<"KnowledgeBase"> | Date | string
  }, "id">

  export type KnowledgeBaseOrderByWithAggregationInput = {
    id?: SortOrder
    title?: SortOrder
    content?: SortOrder
    category?: SortOrder
    active?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: KnowledgeBaseCountOrderByAggregateInput
    _max?: KnowledgeBaseMaxOrderByAggregateInput
    _min?: KnowledgeBaseMinOrderByAggregateInput
  }

  export type KnowledgeBaseScalarWhereWithAggregatesInput = {
    AND?: KnowledgeBaseScalarWhereWithAggregatesInput | KnowledgeBaseScalarWhereWithAggregatesInput[]
    OR?: KnowledgeBaseScalarWhereWithAggregatesInput[]
    NOT?: KnowledgeBaseScalarWhereWithAggregatesInput | KnowledgeBaseScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"KnowledgeBase"> | string
    title?: StringWithAggregatesFilter<"KnowledgeBase"> | string
    content?: StringWithAggregatesFilter<"KnowledgeBase"> | string
    category?: StringWithAggregatesFilter<"KnowledgeBase"> | string
    active?: BoolWithAggregatesFilter<"KnowledgeBase"> | boolean
    createdAt?: DateTimeWithAggregatesFilter<"KnowledgeBase"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"KnowledgeBase"> | Date | string
  }

  export type PublicationWhereInput = {
    AND?: PublicationWhereInput | PublicationWhereInput[]
    OR?: PublicationWhereInput[]
    NOT?: PublicationWhereInput | PublicationWhereInput[]
    id?: StringFilter<"Publication"> | string
    title?: StringFilter<"Publication"> | string
    description?: StringFilter<"Publication"> | string
    content?: StringFilter<"Publication"> | string
    imageUrl?: StringNullableFilter<"Publication"> | string | null
    order?: IntFilter<"Publication"> | number
    active?: BoolFilter<"Publication"> | boolean
    createdAt?: DateTimeFilter<"Publication"> | Date | string
    updatedAt?: DateTimeFilter<"Publication"> | Date | string
  }

  export type PublicationOrderByWithRelationInput = {
    id?: SortOrder
    title?: SortOrder
    description?: SortOrder
    content?: SortOrder
    imageUrl?: SortOrderInput | SortOrder
    order?: SortOrder
    active?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type PublicationWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: PublicationWhereInput | PublicationWhereInput[]
    OR?: PublicationWhereInput[]
    NOT?: PublicationWhereInput | PublicationWhereInput[]
    title?: StringFilter<"Publication"> | string
    description?: StringFilter<"Publication"> | string
    content?: StringFilter<"Publication"> | string
    imageUrl?: StringNullableFilter<"Publication"> | string | null
    order?: IntFilter<"Publication"> | number
    active?: BoolFilter<"Publication"> | boolean
    createdAt?: DateTimeFilter<"Publication"> | Date | string
    updatedAt?: DateTimeFilter<"Publication"> | Date | string
  }, "id">

  export type PublicationOrderByWithAggregationInput = {
    id?: SortOrder
    title?: SortOrder
    description?: SortOrder
    content?: SortOrder
    imageUrl?: SortOrderInput | SortOrder
    order?: SortOrder
    active?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: PublicationCountOrderByAggregateInput
    _avg?: PublicationAvgOrderByAggregateInput
    _max?: PublicationMaxOrderByAggregateInput
    _min?: PublicationMinOrderByAggregateInput
    _sum?: PublicationSumOrderByAggregateInput
  }

  export type PublicationScalarWhereWithAggregatesInput = {
    AND?: PublicationScalarWhereWithAggregatesInput | PublicationScalarWhereWithAggregatesInput[]
    OR?: PublicationScalarWhereWithAggregatesInput[]
    NOT?: PublicationScalarWhereWithAggregatesInput | PublicationScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Publication"> | string
    title?: StringWithAggregatesFilter<"Publication"> | string
    description?: StringWithAggregatesFilter<"Publication"> | string
    content?: StringWithAggregatesFilter<"Publication"> | string
    imageUrl?: StringNullableWithAggregatesFilter<"Publication"> | string | null
    order?: IntWithAggregatesFilter<"Publication"> | number
    active?: BoolWithAggregatesFilter<"Publication"> | boolean
    createdAt?: DateTimeWithAggregatesFilter<"Publication"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Publication"> | Date | string
  }

  export type UserCreateInput = {
    id?: string
    username: string
    passwordHash: string
    name: string
    email?: string | null
    phone?: string | null
    role?: string
    status?: string
    credits?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    documents?: UserDocumentCreateNestedManyWithoutUserInput
    contacts?: ContactCreateNestedManyWithoutUserInput
    creditTransactions?: CreditTransactionCreateNestedManyWithoutUserInput
    creditGrants?: CreditTransactionCreateNestedManyWithoutAdminInput
  }

  export type UserUncheckedCreateInput = {
    id?: string
    username: string
    passwordHash: string
    name: string
    email?: string | null
    phone?: string | null
    role?: string
    status?: string
    credits?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    documents?: UserDocumentUncheckedCreateNestedManyWithoutUserInput
    contacts?: ContactUncheckedCreateNestedManyWithoutUserInput
    creditTransactions?: CreditTransactionUncheckedCreateNestedManyWithoutUserInput
    creditGrants?: CreditTransactionUncheckedCreateNestedManyWithoutAdminInput
  }

  export type UserUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    role?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    credits?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    documents?: UserDocumentUpdateManyWithoutUserNestedInput
    contacts?: ContactUpdateManyWithoutUserNestedInput
    creditTransactions?: CreditTransactionUpdateManyWithoutUserNestedInput
    creditGrants?: CreditTransactionUpdateManyWithoutAdminNestedInput
  }

  export type UserUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    role?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    credits?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    documents?: UserDocumentUncheckedUpdateManyWithoutUserNestedInput
    contacts?: ContactUncheckedUpdateManyWithoutUserNestedInput
    creditTransactions?: CreditTransactionUncheckedUpdateManyWithoutUserNestedInput
    creditGrants?: CreditTransactionUncheckedUpdateManyWithoutAdminNestedInput
  }

  export type UserCreateManyInput = {
    id?: string
    username: string
    passwordHash: string
    name: string
    email?: string | null
    phone?: string | null
    role?: string
    status?: string
    credits?: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UserUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    role?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    credits?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    role?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    credits?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DocumentTemplateCreateInput = {
    id?: string
    name: string
    description: string
    category: string
    subcategory?: string | null
    legalArea: string
    audience?: string
    status?: string
    price?: number
    estimatedQuestions?: number
    estimatedMinutes?: number
    rating?: number
    ratingCount?: number
    thumbnail?: string | null
    baseContent: string
    headerContent?: string | null
    footerContent?: string | null
    wizardConfig: string
    blurPreview?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    clauses?: TemplateClauseCreateNestedManyWithoutTemplateInput
    normativity?: TemplateNormativityCreateNestedManyWithoutTemplateInput
    documents?: UserDocumentCreateNestedManyWithoutTemplateInput
  }

  export type DocumentTemplateUncheckedCreateInput = {
    id?: string
    name: string
    description: string
    category: string
    subcategory?: string | null
    legalArea: string
    audience?: string
    status?: string
    price?: number
    estimatedQuestions?: number
    estimatedMinutes?: number
    rating?: number
    ratingCount?: number
    thumbnail?: string | null
    baseContent: string
    headerContent?: string | null
    footerContent?: string | null
    wizardConfig: string
    blurPreview?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    clauses?: TemplateClauseUncheckedCreateNestedManyWithoutTemplateInput
    normativity?: TemplateNormativityUncheckedCreateNestedManyWithoutTemplateInput
    documents?: UserDocumentUncheckedCreateNestedManyWithoutTemplateInput
  }

  export type DocumentTemplateUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    category?: StringFieldUpdateOperationsInput | string
    subcategory?: NullableStringFieldUpdateOperationsInput | string | null
    legalArea?: StringFieldUpdateOperationsInput | string
    audience?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    price?: FloatFieldUpdateOperationsInput | number
    estimatedQuestions?: IntFieldUpdateOperationsInput | number
    estimatedMinutes?: IntFieldUpdateOperationsInput | number
    rating?: FloatFieldUpdateOperationsInput | number
    ratingCount?: IntFieldUpdateOperationsInput | number
    thumbnail?: NullableStringFieldUpdateOperationsInput | string | null
    baseContent?: StringFieldUpdateOperationsInput | string
    headerContent?: NullableStringFieldUpdateOperationsInput | string | null
    footerContent?: NullableStringFieldUpdateOperationsInput | string | null
    wizardConfig?: StringFieldUpdateOperationsInput | string
    blurPreview?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    clauses?: TemplateClauseUpdateManyWithoutTemplateNestedInput
    normativity?: TemplateNormativityUpdateManyWithoutTemplateNestedInput
    documents?: UserDocumentUpdateManyWithoutTemplateNestedInput
  }

  export type DocumentTemplateUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    category?: StringFieldUpdateOperationsInput | string
    subcategory?: NullableStringFieldUpdateOperationsInput | string | null
    legalArea?: StringFieldUpdateOperationsInput | string
    audience?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    price?: FloatFieldUpdateOperationsInput | number
    estimatedQuestions?: IntFieldUpdateOperationsInput | number
    estimatedMinutes?: IntFieldUpdateOperationsInput | number
    rating?: FloatFieldUpdateOperationsInput | number
    ratingCount?: IntFieldUpdateOperationsInput | number
    thumbnail?: NullableStringFieldUpdateOperationsInput | string | null
    baseContent?: StringFieldUpdateOperationsInput | string
    headerContent?: NullableStringFieldUpdateOperationsInput | string | null
    footerContent?: NullableStringFieldUpdateOperationsInput | string | null
    wizardConfig?: StringFieldUpdateOperationsInput | string
    blurPreview?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    clauses?: TemplateClauseUncheckedUpdateManyWithoutTemplateNestedInput
    normativity?: TemplateNormativityUncheckedUpdateManyWithoutTemplateNestedInput
    documents?: UserDocumentUncheckedUpdateManyWithoutTemplateNestedInput
  }

  export type DocumentTemplateCreateManyInput = {
    id?: string
    name: string
    description: string
    category: string
    subcategory?: string | null
    legalArea: string
    audience?: string
    status?: string
    price?: number
    estimatedQuestions?: number
    estimatedMinutes?: number
    rating?: number
    ratingCount?: number
    thumbnail?: string | null
    baseContent: string
    headerContent?: string | null
    footerContent?: string | null
    wizardConfig: string
    blurPreview?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type DocumentTemplateUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    category?: StringFieldUpdateOperationsInput | string
    subcategory?: NullableStringFieldUpdateOperationsInput | string | null
    legalArea?: StringFieldUpdateOperationsInput | string
    audience?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    price?: FloatFieldUpdateOperationsInput | number
    estimatedQuestions?: IntFieldUpdateOperationsInput | number
    estimatedMinutes?: IntFieldUpdateOperationsInput | number
    rating?: FloatFieldUpdateOperationsInput | number
    ratingCount?: IntFieldUpdateOperationsInput | number
    thumbnail?: NullableStringFieldUpdateOperationsInput | string | null
    baseContent?: StringFieldUpdateOperationsInput | string
    headerContent?: NullableStringFieldUpdateOperationsInput | string | null
    footerContent?: NullableStringFieldUpdateOperationsInput | string | null
    wizardConfig?: StringFieldUpdateOperationsInput | string
    blurPreview?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DocumentTemplateUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    category?: StringFieldUpdateOperationsInput | string
    subcategory?: NullableStringFieldUpdateOperationsInput | string | null
    legalArea?: StringFieldUpdateOperationsInput | string
    audience?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    price?: FloatFieldUpdateOperationsInput | number
    estimatedQuestions?: IntFieldUpdateOperationsInput | number
    estimatedMinutes?: IntFieldUpdateOperationsInput | number
    rating?: FloatFieldUpdateOperationsInput | number
    ratingCount?: IntFieldUpdateOperationsInput | number
    thumbnail?: NullableStringFieldUpdateOperationsInput | string | null
    baseContent?: StringFieldUpdateOperationsInput | string
    headerContent?: NullableStringFieldUpdateOperationsInput | string | null
    footerContent?: NullableStringFieldUpdateOperationsInput | string | null
    wizardConfig?: StringFieldUpdateOperationsInput | string
    blurPreview?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ClauseCreateInput = {
    id?: string
    title: string
    content: string
    legalArea?: string | null
    category?: string | null
    isDefault?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    templates?: TemplateClauseCreateNestedManyWithoutClauseInput
  }

  export type ClauseUncheckedCreateInput = {
    id?: string
    title: string
    content: string
    legalArea?: string | null
    category?: string | null
    isDefault?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    templates?: TemplateClauseUncheckedCreateNestedManyWithoutClauseInput
  }

  export type ClauseUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    legalArea?: NullableStringFieldUpdateOperationsInput | string | null
    category?: NullableStringFieldUpdateOperationsInput | string | null
    isDefault?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    templates?: TemplateClauseUpdateManyWithoutClauseNestedInput
  }

  export type ClauseUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    legalArea?: NullableStringFieldUpdateOperationsInput | string | null
    category?: NullableStringFieldUpdateOperationsInput | string | null
    isDefault?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    templates?: TemplateClauseUncheckedUpdateManyWithoutClauseNestedInput
  }

  export type ClauseCreateManyInput = {
    id?: string
    title: string
    content: string
    legalArea?: string | null
    category?: string | null
    isDefault?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ClauseUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    legalArea?: NullableStringFieldUpdateOperationsInput | string | null
    category?: NullableStringFieldUpdateOperationsInput | string | null
    isDefault?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ClauseUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    legalArea?: NullableStringFieldUpdateOperationsInput | string | null
    category?: NullableStringFieldUpdateOperationsInput | string | null
    isDefault?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TemplateClauseCreateInput = {
    id?: string
    sectionName?: string | null
    order?: number
    template: DocumentTemplateCreateNestedOneWithoutClausesInput
    clause: ClauseCreateNestedOneWithoutTemplatesInput
  }

  export type TemplateClauseUncheckedCreateInput = {
    id?: string
    templateId: string
    clauseId: string
    sectionName?: string | null
    order?: number
  }

  export type TemplateClauseUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    sectionName?: NullableStringFieldUpdateOperationsInput | string | null
    order?: IntFieldUpdateOperationsInput | number
    template?: DocumentTemplateUpdateOneRequiredWithoutClausesNestedInput
    clause?: ClauseUpdateOneRequiredWithoutTemplatesNestedInput
  }

  export type TemplateClauseUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    templateId?: StringFieldUpdateOperationsInput | string
    clauseId?: StringFieldUpdateOperationsInput | string
    sectionName?: NullableStringFieldUpdateOperationsInput | string | null
    order?: IntFieldUpdateOperationsInput | number
  }

  export type TemplateClauseCreateManyInput = {
    id?: string
    templateId: string
    clauseId: string
    sectionName?: string | null
    order?: number
  }

  export type TemplateClauseUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    sectionName?: NullableStringFieldUpdateOperationsInput | string | null
    order?: IntFieldUpdateOperationsInput | number
  }

  export type TemplateClauseUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    templateId?: StringFieldUpdateOperationsInput | string
    clauseId?: StringFieldUpdateOperationsInput | string
    sectionName?: NullableStringFieldUpdateOperationsInput | string | null
    order?: IntFieldUpdateOperationsInput | number
  }

  export type TemplateNormativityCreateInput = {
    id?: string
    lawName: string
    lawReference: string
    articleNumber?: string | null
    description?: string | null
    template: DocumentTemplateCreateNestedOneWithoutNormativityInput
  }

  export type TemplateNormativityUncheckedCreateInput = {
    id?: string
    templateId: string
    lawName: string
    lawReference: string
    articleNumber?: string | null
    description?: string | null
  }

  export type TemplateNormativityUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    lawName?: StringFieldUpdateOperationsInput | string
    lawReference?: StringFieldUpdateOperationsInput | string
    articleNumber?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    template?: DocumentTemplateUpdateOneRequiredWithoutNormativityNestedInput
  }

  export type TemplateNormativityUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    templateId?: StringFieldUpdateOperationsInput | string
    lawName?: StringFieldUpdateOperationsInput | string
    lawReference?: StringFieldUpdateOperationsInput | string
    articleNumber?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type TemplateNormativityCreateManyInput = {
    id?: string
    templateId: string
    lawName: string
    lawReference: string
    articleNumber?: string | null
    description?: string | null
  }

  export type TemplateNormativityUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    lawName?: StringFieldUpdateOperationsInput | string
    lawReference?: StringFieldUpdateOperationsInput | string
    articleNumber?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type TemplateNormativityUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    templateId?: StringFieldUpdateOperationsInput | string
    lawName?: StringFieldUpdateOperationsInput | string
    lawReference?: StringFieldUpdateOperationsInput | string
    articleNumber?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type UserDocumentCreateInput = {
    id?: string
    title: string
    status?: string
    answers: string
    generatedContent?: string | null
    visitorPhone?: string | null
    visitorName?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    template: DocumentTemplateCreateNestedOneWithoutDocumentsInput
    user?: UserCreateNestedOneWithoutDocumentsInput
  }

  export type UserDocumentUncheckedCreateInput = {
    id?: string
    userId?: string | null
    templateId: string
    title: string
    status?: string
    answers: string
    generatedContent?: string | null
    visitorPhone?: string | null
    visitorName?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UserDocumentUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    answers?: StringFieldUpdateOperationsInput | string
    generatedContent?: NullableStringFieldUpdateOperationsInput | string | null
    visitorPhone?: NullableStringFieldUpdateOperationsInput | string | null
    visitorName?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    template?: DocumentTemplateUpdateOneRequiredWithoutDocumentsNestedInput
    user?: UserUpdateOneWithoutDocumentsNestedInput
  }

  export type UserDocumentUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: NullableStringFieldUpdateOperationsInput | string | null
    templateId?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    answers?: StringFieldUpdateOperationsInput | string
    generatedContent?: NullableStringFieldUpdateOperationsInput | string | null
    visitorPhone?: NullableStringFieldUpdateOperationsInput | string | null
    visitorName?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserDocumentCreateManyInput = {
    id?: string
    userId?: string | null
    templateId: string
    title: string
    status?: string
    answers: string
    generatedContent?: string | null
    visitorPhone?: string | null
    visitorName?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UserDocumentUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    answers?: StringFieldUpdateOperationsInput | string
    generatedContent?: NullableStringFieldUpdateOperationsInput | string | null
    visitorPhone?: NullableStringFieldUpdateOperationsInput | string | null
    visitorName?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserDocumentUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: NullableStringFieldUpdateOperationsInput | string | null
    templateId?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    answers?: StringFieldUpdateOperationsInput | string
    generatedContent?: NullableStringFieldUpdateOperationsInput | string | null
    visitorPhone?: NullableStringFieldUpdateOperationsInput | string | null
    visitorName?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ContactCreateInput = {
    id?: string
    name: string
    contactType: string
    documentType?: string | null
    documentNumber?: string | null
    address?: string | null
    city?: string | null
    phone?: string | null
    email?: string | null
    companyName?: string | null
    notes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutContactsInput
  }

  export type ContactUncheckedCreateInput = {
    id?: string
    userId: string
    name: string
    contactType: string
    documentType?: string | null
    documentNumber?: string | null
    address?: string | null
    city?: string | null
    phone?: string | null
    email?: string | null
    companyName?: string | null
    notes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ContactUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    contactType?: StringFieldUpdateOperationsInput | string
    documentType?: NullableStringFieldUpdateOperationsInput | string | null
    documentNumber?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    city?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    companyName?: NullableStringFieldUpdateOperationsInput | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutContactsNestedInput
  }

  export type ContactUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    contactType?: StringFieldUpdateOperationsInput | string
    documentType?: NullableStringFieldUpdateOperationsInput | string | null
    documentNumber?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    city?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    companyName?: NullableStringFieldUpdateOperationsInput | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ContactCreateManyInput = {
    id?: string
    userId: string
    name: string
    contactType: string
    documentType?: string | null
    documentNumber?: string | null
    address?: string | null
    city?: string | null
    phone?: string | null
    email?: string | null
    companyName?: string | null
    notes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ContactUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    contactType?: StringFieldUpdateOperationsInput | string
    documentType?: NullableStringFieldUpdateOperationsInput | string | null
    documentNumber?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    city?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    companyName?: NullableStringFieldUpdateOperationsInput | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ContactUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    contactType?: StringFieldUpdateOperationsInput | string
    documentType?: NullableStringFieldUpdateOperationsInput | string | null
    documentNumber?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    city?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    companyName?: NullableStringFieldUpdateOperationsInput | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DocumentRequestCreateInput = {
    id?: string
    userId?: string | null
    title: string
    description: string
    status?: string
    adminNotes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type DocumentRequestUncheckedCreateInput = {
    id?: string
    userId?: string | null
    title: string
    description: string
    status?: string
    adminNotes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type DocumentRequestUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: NullableStringFieldUpdateOperationsInput | string | null
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    adminNotes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DocumentRequestUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: NullableStringFieldUpdateOperationsInput | string | null
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    adminNotes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DocumentRequestCreateManyInput = {
    id?: string
    userId?: string | null
    title: string
    description: string
    status?: string
    adminNotes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type DocumentRequestUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: NullableStringFieldUpdateOperationsInput | string | null
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    adminNotes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DocumentRequestUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: NullableStringFieldUpdateOperationsInput | string | null
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    adminNotes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SiteSettingCreateInput = {
    id?: string
    key: string
    value: string
    updatedAt?: Date | string
  }

  export type SiteSettingUncheckedCreateInput = {
    id?: string
    key: string
    value: string
    updatedAt?: Date | string
  }

  export type SiteSettingUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    key?: StringFieldUpdateOperationsInput | string
    value?: StringFieldUpdateOperationsInput | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SiteSettingUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    key?: StringFieldUpdateOperationsInput | string
    value?: StringFieldUpdateOperationsInput | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SiteSettingCreateManyInput = {
    id?: string
    key: string
    value: string
    updatedAt?: Date | string
  }

  export type SiteSettingUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    key?: StringFieldUpdateOperationsInput | string
    value?: StringFieldUpdateOperationsInput | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SiteSettingUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    key?: StringFieldUpdateOperationsInput | string
    value?: StringFieldUpdateOperationsInput | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PaymentCreateInput = {
    id?: string
    userId: string
    amount: number
    currency?: string
    paymentMethod?: string | null
    paymentGateway?: string | null
    transactionRef?: string | null
    status?: string
    planName?: string | null
    documentId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type PaymentUncheckedCreateInput = {
    id?: string
    userId: string
    amount: number
    currency?: string
    paymentMethod?: string | null
    paymentGateway?: string | null
    transactionRef?: string | null
    status?: string
    planName?: string | null
    documentId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type PaymentUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    amount?: FloatFieldUpdateOperationsInput | number
    currency?: StringFieldUpdateOperationsInput | string
    paymentMethod?: NullableStringFieldUpdateOperationsInput | string | null
    paymentGateway?: NullableStringFieldUpdateOperationsInput | string | null
    transactionRef?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    planName?: NullableStringFieldUpdateOperationsInput | string | null
    documentId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PaymentUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    amount?: FloatFieldUpdateOperationsInput | number
    currency?: StringFieldUpdateOperationsInput | string
    paymentMethod?: NullableStringFieldUpdateOperationsInput | string | null
    paymentGateway?: NullableStringFieldUpdateOperationsInput | string | null
    transactionRef?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    planName?: NullableStringFieldUpdateOperationsInput | string | null
    documentId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PaymentCreateManyInput = {
    id?: string
    userId: string
    amount: number
    currency?: string
    paymentMethod?: string | null
    paymentGateway?: string | null
    transactionRef?: string | null
    status?: string
    planName?: string | null
    documentId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type PaymentUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    amount?: FloatFieldUpdateOperationsInput | number
    currency?: StringFieldUpdateOperationsInput | string
    paymentMethod?: NullableStringFieldUpdateOperationsInput | string | null
    paymentGateway?: NullableStringFieldUpdateOperationsInput | string | null
    transactionRef?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    planName?: NullableStringFieldUpdateOperationsInput | string | null
    documentId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PaymentUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    amount?: FloatFieldUpdateOperationsInput | number
    currency?: StringFieldUpdateOperationsInput | string
    paymentMethod?: NullableStringFieldUpdateOperationsInput | string | null
    paymentGateway?: NullableStringFieldUpdateOperationsInput | string | null
    transactionRef?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    planName?: NullableStringFieldUpdateOperationsInput | string | null
    documentId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CreditTransactionCreateInput = {
    id?: string
    amount: number
    type: string
    description?: string | null
    createdAt?: Date | string
    user: UserCreateNestedOneWithoutCreditTransactionsInput
    admin?: UserCreateNestedOneWithoutCreditGrantsInput
  }

  export type CreditTransactionUncheckedCreateInput = {
    id?: string
    userId: string
    amount: number
    type: string
    description?: string | null
    adminId?: string | null
    createdAt?: Date | string
  }

  export type CreditTransactionUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    amount?: IntFieldUpdateOperationsInput | number
    type?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutCreditTransactionsNestedInput
    admin?: UserUpdateOneWithoutCreditGrantsNestedInput
  }

  export type CreditTransactionUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    amount?: IntFieldUpdateOperationsInput | number
    type?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    adminId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CreditTransactionCreateManyInput = {
    id?: string
    userId: string
    amount: number
    type: string
    description?: string | null
    adminId?: string | null
    createdAt?: Date | string
  }

  export type CreditTransactionUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    amount?: IntFieldUpdateOperationsInput | number
    type?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CreditTransactionUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    amount?: IntFieldUpdateOperationsInput | number
    type?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    adminId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type KnowledgeBaseCreateInput = {
    id?: string
    title: string
    content: string
    category?: string
    active?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type KnowledgeBaseUncheckedCreateInput = {
    id?: string
    title: string
    content: string
    category?: string
    active?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type KnowledgeBaseUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    category?: StringFieldUpdateOperationsInput | string
    active?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type KnowledgeBaseUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    category?: StringFieldUpdateOperationsInput | string
    active?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type KnowledgeBaseCreateManyInput = {
    id?: string
    title: string
    content: string
    category?: string
    active?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type KnowledgeBaseUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    category?: StringFieldUpdateOperationsInput | string
    active?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type KnowledgeBaseUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    category?: StringFieldUpdateOperationsInput | string
    active?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PublicationCreateInput = {
    id?: string
    title: string
    description: string
    content?: string
    imageUrl?: string | null
    order?: number
    active?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type PublicationUncheckedCreateInput = {
    id?: string
    title: string
    description: string
    content?: string
    imageUrl?: string | null
    order?: number
    active?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type PublicationUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    order?: IntFieldUpdateOperationsInput | number
    active?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PublicationUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    order?: IntFieldUpdateOperationsInput | number
    active?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PublicationCreateManyInput = {
    id?: string
    title: string
    description: string
    content?: string
    imageUrl?: string | null
    order?: number
    active?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type PublicationUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    order?: IntFieldUpdateOperationsInput | number
    active?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PublicationUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    order?: IntFieldUpdateOperationsInput | number
    active?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type UserDocumentListRelationFilter = {
    every?: UserDocumentWhereInput
    some?: UserDocumentWhereInput
    none?: UserDocumentWhereInput
  }

  export type ContactListRelationFilter = {
    every?: ContactWhereInput
    some?: ContactWhereInput
    none?: ContactWhereInput
  }

  export type CreditTransactionListRelationFilter = {
    every?: CreditTransactionWhereInput
    some?: CreditTransactionWhereInput
    none?: CreditTransactionWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type UserDocumentOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ContactOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type CreditTransactionOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type UserCountOrderByAggregateInput = {
    id?: SortOrder
    username?: SortOrder
    passwordHash?: SortOrder
    name?: SortOrder
    email?: SortOrder
    phone?: SortOrder
    role?: SortOrder
    status?: SortOrder
    credits?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserAvgOrderByAggregateInput = {
    credits?: SortOrder
  }

  export type UserMaxOrderByAggregateInput = {
    id?: SortOrder
    username?: SortOrder
    passwordHash?: SortOrder
    name?: SortOrder
    email?: SortOrder
    phone?: SortOrder
    role?: SortOrder
    status?: SortOrder
    credits?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserMinOrderByAggregateInput = {
    id?: SortOrder
    username?: SortOrder
    passwordHash?: SortOrder
    name?: SortOrder
    email?: SortOrder
    phone?: SortOrder
    role?: SortOrder
    status?: SortOrder
    credits?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserSumOrderByAggregateInput = {
    credits?: SortOrder
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type FloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type TemplateClauseListRelationFilter = {
    every?: TemplateClauseWhereInput
    some?: TemplateClauseWhereInput
    none?: TemplateClauseWhereInput
  }

  export type TemplateNormativityListRelationFilter = {
    every?: TemplateNormativityWhereInput
    some?: TemplateNormativityWhereInput
    none?: TemplateNormativityWhereInput
  }

  export type TemplateClauseOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type TemplateNormativityOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type DocumentTemplateCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrder
    category?: SortOrder
    subcategory?: SortOrder
    legalArea?: SortOrder
    audience?: SortOrder
    status?: SortOrder
    price?: SortOrder
    estimatedQuestions?: SortOrder
    estimatedMinutes?: SortOrder
    rating?: SortOrder
    ratingCount?: SortOrder
    thumbnail?: SortOrder
    baseContent?: SortOrder
    headerContent?: SortOrder
    footerContent?: SortOrder
    wizardConfig?: SortOrder
    blurPreview?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type DocumentTemplateAvgOrderByAggregateInput = {
    price?: SortOrder
    estimatedQuestions?: SortOrder
    estimatedMinutes?: SortOrder
    rating?: SortOrder
    ratingCount?: SortOrder
  }

  export type DocumentTemplateMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrder
    category?: SortOrder
    subcategory?: SortOrder
    legalArea?: SortOrder
    audience?: SortOrder
    status?: SortOrder
    price?: SortOrder
    estimatedQuestions?: SortOrder
    estimatedMinutes?: SortOrder
    rating?: SortOrder
    ratingCount?: SortOrder
    thumbnail?: SortOrder
    baseContent?: SortOrder
    headerContent?: SortOrder
    footerContent?: SortOrder
    wizardConfig?: SortOrder
    blurPreview?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type DocumentTemplateMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrder
    category?: SortOrder
    subcategory?: SortOrder
    legalArea?: SortOrder
    audience?: SortOrder
    status?: SortOrder
    price?: SortOrder
    estimatedQuestions?: SortOrder
    estimatedMinutes?: SortOrder
    rating?: SortOrder
    ratingCount?: SortOrder
    thumbnail?: SortOrder
    baseContent?: SortOrder
    headerContent?: SortOrder
    footerContent?: SortOrder
    wizardConfig?: SortOrder
    blurPreview?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type DocumentTemplateSumOrderByAggregateInput = {
    price?: SortOrder
    estimatedQuestions?: SortOrder
    estimatedMinutes?: SortOrder
    rating?: SortOrder
    ratingCount?: SortOrder
  }

  export type FloatWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedFloatFilter<$PrismaModel>
    _min?: NestedFloatFilter<$PrismaModel>
    _max?: NestedFloatFilter<$PrismaModel>
  }

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type ClauseCountOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    content?: SortOrder
    legalArea?: SortOrder
    category?: SortOrder
    isDefault?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ClauseMaxOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    content?: SortOrder
    legalArea?: SortOrder
    category?: SortOrder
    isDefault?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ClauseMinOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    content?: SortOrder
    legalArea?: SortOrder
    category?: SortOrder
    isDefault?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type DocumentTemplateScalarRelationFilter = {
    is?: DocumentTemplateWhereInput
    isNot?: DocumentTemplateWhereInput
  }

  export type ClauseScalarRelationFilter = {
    is?: ClauseWhereInput
    isNot?: ClauseWhereInput
  }

  export type TemplateClauseCountOrderByAggregateInput = {
    id?: SortOrder
    templateId?: SortOrder
    clauseId?: SortOrder
    sectionName?: SortOrder
    order?: SortOrder
  }

  export type TemplateClauseAvgOrderByAggregateInput = {
    order?: SortOrder
  }

  export type TemplateClauseMaxOrderByAggregateInput = {
    id?: SortOrder
    templateId?: SortOrder
    clauseId?: SortOrder
    sectionName?: SortOrder
    order?: SortOrder
  }

  export type TemplateClauseMinOrderByAggregateInput = {
    id?: SortOrder
    templateId?: SortOrder
    clauseId?: SortOrder
    sectionName?: SortOrder
    order?: SortOrder
  }

  export type TemplateClauseSumOrderByAggregateInput = {
    order?: SortOrder
  }

  export type TemplateNormativityCountOrderByAggregateInput = {
    id?: SortOrder
    templateId?: SortOrder
    lawName?: SortOrder
    lawReference?: SortOrder
    articleNumber?: SortOrder
    description?: SortOrder
  }

  export type TemplateNormativityMaxOrderByAggregateInput = {
    id?: SortOrder
    templateId?: SortOrder
    lawName?: SortOrder
    lawReference?: SortOrder
    articleNumber?: SortOrder
    description?: SortOrder
  }

  export type TemplateNormativityMinOrderByAggregateInput = {
    id?: SortOrder
    templateId?: SortOrder
    lawName?: SortOrder
    lawReference?: SortOrder
    articleNumber?: SortOrder
    description?: SortOrder
  }

  export type UserNullableScalarRelationFilter = {
    is?: UserWhereInput | null
    isNot?: UserWhereInput | null
  }

  export type UserDocumentCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    templateId?: SortOrder
    title?: SortOrder
    status?: SortOrder
    answers?: SortOrder
    generatedContent?: SortOrder
    visitorPhone?: SortOrder
    visitorName?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserDocumentMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    templateId?: SortOrder
    title?: SortOrder
    status?: SortOrder
    answers?: SortOrder
    generatedContent?: SortOrder
    visitorPhone?: SortOrder
    visitorName?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserDocumentMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    templateId?: SortOrder
    title?: SortOrder
    status?: SortOrder
    answers?: SortOrder
    generatedContent?: SortOrder
    visitorPhone?: SortOrder
    visitorName?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserScalarRelationFilter = {
    is?: UserWhereInput
    isNot?: UserWhereInput
  }

  export type ContactCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    name?: SortOrder
    contactType?: SortOrder
    documentType?: SortOrder
    documentNumber?: SortOrder
    address?: SortOrder
    city?: SortOrder
    phone?: SortOrder
    email?: SortOrder
    companyName?: SortOrder
    notes?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ContactMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    name?: SortOrder
    contactType?: SortOrder
    documentType?: SortOrder
    documentNumber?: SortOrder
    address?: SortOrder
    city?: SortOrder
    phone?: SortOrder
    email?: SortOrder
    companyName?: SortOrder
    notes?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ContactMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    name?: SortOrder
    contactType?: SortOrder
    documentType?: SortOrder
    documentNumber?: SortOrder
    address?: SortOrder
    city?: SortOrder
    phone?: SortOrder
    email?: SortOrder
    companyName?: SortOrder
    notes?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type DocumentRequestCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    title?: SortOrder
    description?: SortOrder
    status?: SortOrder
    adminNotes?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type DocumentRequestMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    title?: SortOrder
    description?: SortOrder
    status?: SortOrder
    adminNotes?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type DocumentRequestMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    title?: SortOrder
    description?: SortOrder
    status?: SortOrder
    adminNotes?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type SiteSettingCountOrderByAggregateInput = {
    id?: SortOrder
    key?: SortOrder
    value?: SortOrder
    updatedAt?: SortOrder
  }

  export type SiteSettingMaxOrderByAggregateInput = {
    id?: SortOrder
    key?: SortOrder
    value?: SortOrder
    updatedAt?: SortOrder
  }

  export type SiteSettingMinOrderByAggregateInput = {
    id?: SortOrder
    key?: SortOrder
    value?: SortOrder
    updatedAt?: SortOrder
  }

  export type PaymentCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    amount?: SortOrder
    currency?: SortOrder
    paymentMethod?: SortOrder
    paymentGateway?: SortOrder
    transactionRef?: SortOrder
    status?: SortOrder
    planName?: SortOrder
    documentId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type PaymentAvgOrderByAggregateInput = {
    amount?: SortOrder
  }

  export type PaymentMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    amount?: SortOrder
    currency?: SortOrder
    paymentMethod?: SortOrder
    paymentGateway?: SortOrder
    transactionRef?: SortOrder
    status?: SortOrder
    planName?: SortOrder
    documentId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type PaymentMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    amount?: SortOrder
    currency?: SortOrder
    paymentMethod?: SortOrder
    paymentGateway?: SortOrder
    transactionRef?: SortOrder
    status?: SortOrder
    planName?: SortOrder
    documentId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type PaymentSumOrderByAggregateInput = {
    amount?: SortOrder
  }

  export type CreditTransactionCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    amount?: SortOrder
    type?: SortOrder
    description?: SortOrder
    adminId?: SortOrder
    createdAt?: SortOrder
  }

  export type CreditTransactionAvgOrderByAggregateInput = {
    amount?: SortOrder
  }

  export type CreditTransactionMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    amount?: SortOrder
    type?: SortOrder
    description?: SortOrder
    adminId?: SortOrder
    createdAt?: SortOrder
  }

  export type CreditTransactionMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    amount?: SortOrder
    type?: SortOrder
    description?: SortOrder
    adminId?: SortOrder
    createdAt?: SortOrder
  }

  export type CreditTransactionSumOrderByAggregateInput = {
    amount?: SortOrder
  }

  export type KnowledgeBaseCountOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    content?: SortOrder
    category?: SortOrder
    active?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type KnowledgeBaseMaxOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    content?: SortOrder
    category?: SortOrder
    active?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type KnowledgeBaseMinOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    content?: SortOrder
    category?: SortOrder
    active?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type PublicationCountOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    description?: SortOrder
    content?: SortOrder
    imageUrl?: SortOrder
    order?: SortOrder
    active?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type PublicationAvgOrderByAggregateInput = {
    order?: SortOrder
  }

  export type PublicationMaxOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    description?: SortOrder
    content?: SortOrder
    imageUrl?: SortOrder
    order?: SortOrder
    active?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type PublicationMinOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    description?: SortOrder
    content?: SortOrder
    imageUrl?: SortOrder
    order?: SortOrder
    active?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type PublicationSumOrderByAggregateInput = {
    order?: SortOrder
  }

  export type UserDocumentCreateNestedManyWithoutUserInput = {
    create?: XOR<UserDocumentCreateWithoutUserInput, UserDocumentUncheckedCreateWithoutUserInput> | UserDocumentCreateWithoutUserInput[] | UserDocumentUncheckedCreateWithoutUserInput[]
    connectOrCreate?: UserDocumentCreateOrConnectWithoutUserInput | UserDocumentCreateOrConnectWithoutUserInput[]
    createMany?: UserDocumentCreateManyUserInputEnvelope
    connect?: UserDocumentWhereUniqueInput | UserDocumentWhereUniqueInput[]
  }

  export type ContactCreateNestedManyWithoutUserInput = {
    create?: XOR<ContactCreateWithoutUserInput, ContactUncheckedCreateWithoutUserInput> | ContactCreateWithoutUserInput[] | ContactUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ContactCreateOrConnectWithoutUserInput | ContactCreateOrConnectWithoutUserInput[]
    createMany?: ContactCreateManyUserInputEnvelope
    connect?: ContactWhereUniqueInput | ContactWhereUniqueInput[]
  }

  export type CreditTransactionCreateNestedManyWithoutUserInput = {
    create?: XOR<CreditTransactionCreateWithoutUserInput, CreditTransactionUncheckedCreateWithoutUserInput> | CreditTransactionCreateWithoutUserInput[] | CreditTransactionUncheckedCreateWithoutUserInput[]
    connectOrCreate?: CreditTransactionCreateOrConnectWithoutUserInput | CreditTransactionCreateOrConnectWithoutUserInput[]
    createMany?: CreditTransactionCreateManyUserInputEnvelope
    connect?: CreditTransactionWhereUniqueInput | CreditTransactionWhereUniqueInput[]
  }

  export type CreditTransactionCreateNestedManyWithoutAdminInput = {
    create?: XOR<CreditTransactionCreateWithoutAdminInput, CreditTransactionUncheckedCreateWithoutAdminInput> | CreditTransactionCreateWithoutAdminInput[] | CreditTransactionUncheckedCreateWithoutAdminInput[]
    connectOrCreate?: CreditTransactionCreateOrConnectWithoutAdminInput | CreditTransactionCreateOrConnectWithoutAdminInput[]
    createMany?: CreditTransactionCreateManyAdminInputEnvelope
    connect?: CreditTransactionWhereUniqueInput | CreditTransactionWhereUniqueInput[]
  }

  export type UserDocumentUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<UserDocumentCreateWithoutUserInput, UserDocumentUncheckedCreateWithoutUserInput> | UserDocumentCreateWithoutUserInput[] | UserDocumentUncheckedCreateWithoutUserInput[]
    connectOrCreate?: UserDocumentCreateOrConnectWithoutUserInput | UserDocumentCreateOrConnectWithoutUserInput[]
    createMany?: UserDocumentCreateManyUserInputEnvelope
    connect?: UserDocumentWhereUniqueInput | UserDocumentWhereUniqueInput[]
  }

  export type ContactUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<ContactCreateWithoutUserInput, ContactUncheckedCreateWithoutUserInput> | ContactCreateWithoutUserInput[] | ContactUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ContactCreateOrConnectWithoutUserInput | ContactCreateOrConnectWithoutUserInput[]
    createMany?: ContactCreateManyUserInputEnvelope
    connect?: ContactWhereUniqueInput | ContactWhereUniqueInput[]
  }

  export type CreditTransactionUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<CreditTransactionCreateWithoutUserInput, CreditTransactionUncheckedCreateWithoutUserInput> | CreditTransactionCreateWithoutUserInput[] | CreditTransactionUncheckedCreateWithoutUserInput[]
    connectOrCreate?: CreditTransactionCreateOrConnectWithoutUserInput | CreditTransactionCreateOrConnectWithoutUserInput[]
    createMany?: CreditTransactionCreateManyUserInputEnvelope
    connect?: CreditTransactionWhereUniqueInput | CreditTransactionWhereUniqueInput[]
  }

  export type CreditTransactionUncheckedCreateNestedManyWithoutAdminInput = {
    create?: XOR<CreditTransactionCreateWithoutAdminInput, CreditTransactionUncheckedCreateWithoutAdminInput> | CreditTransactionCreateWithoutAdminInput[] | CreditTransactionUncheckedCreateWithoutAdminInput[]
    connectOrCreate?: CreditTransactionCreateOrConnectWithoutAdminInput | CreditTransactionCreateOrConnectWithoutAdminInput[]
    createMany?: CreditTransactionCreateManyAdminInputEnvelope
    connect?: CreditTransactionWhereUniqueInput | CreditTransactionWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type UserDocumentUpdateManyWithoutUserNestedInput = {
    create?: XOR<UserDocumentCreateWithoutUserInput, UserDocumentUncheckedCreateWithoutUserInput> | UserDocumentCreateWithoutUserInput[] | UserDocumentUncheckedCreateWithoutUserInput[]
    connectOrCreate?: UserDocumentCreateOrConnectWithoutUserInput | UserDocumentCreateOrConnectWithoutUserInput[]
    upsert?: UserDocumentUpsertWithWhereUniqueWithoutUserInput | UserDocumentUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: UserDocumentCreateManyUserInputEnvelope
    set?: UserDocumentWhereUniqueInput | UserDocumentWhereUniqueInput[]
    disconnect?: UserDocumentWhereUniqueInput | UserDocumentWhereUniqueInput[]
    delete?: UserDocumentWhereUniqueInput | UserDocumentWhereUniqueInput[]
    connect?: UserDocumentWhereUniqueInput | UserDocumentWhereUniqueInput[]
    update?: UserDocumentUpdateWithWhereUniqueWithoutUserInput | UserDocumentUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: UserDocumentUpdateManyWithWhereWithoutUserInput | UserDocumentUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: UserDocumentScalarWhereInput | UserDocumentScalarWhereInput[]
  }

  export type ContactUpdateManyWithoutUserNestedInput = {
    create?: XOR<ContactCreateWithoutUserInput, ContactUncheckedCreateWithoutUserInput> | ContactCreateWithoutUserInput[] | ContactUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ContactCreateOrConnectWithoutUserInput | ContactCreateOrConnectWithoutUserInput[]
    upsert?: ContactUpsertWithWhereUniqueWithoutUserInput | ContactUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: ContactCreateManyUserInputEnvelope
    set?: ContactWhereUniqueInput | ContactWhereUniqueInput[]
    disconnect?: ContactWhereUniqueInput | ContactWhereUniqueInput[]
    delete?: ContactWhereUniqueInput | ContactWhereUniqueInput[]
    connect?: ContactWhereUniqueInput | ContactWhereUniqueInput[]
    update?: ContactUpdateWithWhereUniqueWithoutUserInput | ContactUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: ContactUpdateManyWithWhereWithoutUserInput | ContactUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: ContactScalarWhereInput | ContactScalarWhereInput[]
  }

  export type CreditTransactionUpdateManyWithoutUserNestedInput = {
    create?: XOR<CreditTransactionCreateWithoutUserInput, CreditTransactionUncheckedCreateWithoutUserInput> | CreditTransactionCreateWithoutUserInput[] | CreditTransactionUncheckedCreateWithoutUserInput[]
    connectOrCreate?: CreditTransactionCreateOrConnectWithoutUserInput | CreditTransactionCreateOrConnectWithoutUserInput[]
    upsert?: CreditTransactionUpsertWithWhereUniqueWithoutUserInput | CreditTransactionUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: CreditTransactionCreateManyUserInputEnvelope
    set?: CreditTransactionWhereUniqueInput | CreditTransactionWhereUniqueInput[]
    disconnect?: CreditTransactionWhereUniqueInput | CreditTransactionWhereUniqueInput[]
    delete?: CreditTransactionWhereUniqueInput | CreditTransactionWhereUniqueInput[]
    connect?: CreditTransactionWhereUniqueInput | CreditTransactionWhereUniqueInput[]
    update?: CreditTransactionUpdateWithWhereUniqueWithoutUserInput | CreditTransactionUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: CreditTransactionUpdateManyWithWhereWithoutUserInput | CreditTransactionUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: CreditTransactionScalarWhereInput | CreditTransactionScalarWhereInput[]
  }

  export type CreditTransactionUpdateManyWithoutAdminNestedInput = {
    create?: XOR<CreditTransactionCreateWithoutAdminInput, CreditTransactionUncheckedCreateWithoutAdminInput> | CreditTransactionCreateWithoutAdminInput[] | CreditTransactionUncheckedCreateWithoutAdminInput[]
    connectOrCreate?: CreditTransactionCreateOrConnectWithoutAdminInput | CreditTransactionCreateOrConnectWithoutAdminInput[]
    upsert?: CreditTransactionUpsertWithWhereUniqueWithoutAdminInput | CreditTransactionUpsertWithWhereUniqueWithoutAdminInput[]
    createMany?: CreditTransactionCreateManyAdminInputEnvelope
    set?: CreditTransactionWhereUniqueInput | CreditTransactionWhereUniqueInput[]
    disconnect?: CreditTransactionWhereUniqueInput | CreditTransactionWhereUniqueInput[]
    delete?: CreditTransactionWhereUniqueInput | CreditTransactionWhereUniqueInput[]
    connect?: CreditTransactionWhereUniqueInput | CreditTransactionWhereUniqueInput[]
    update?: CreditTransactionUpdateWithWhereUniqueWithoutAdminInput | CreditTransactionUpdateWithWhereUniqueWithoutAdminInput[]
    updateMany?: CreditTransactionUpdateManyWithWhereWithoutAdminInput | CreditTransactionUpdateManyWithWhereWithoutAdminInput[]
    deleteMany?: CreditTransactionScalarWhereInput | CreditTransactionScalarWhereInput[]
  }

  export type UserDocumentUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<UserDocumentCreateWithoutUserInput, UserDocumentUncheckedCreateWithoutUserInput> | UserDocumentCreateWithoutUserInput[] | UserDocumentUncheckedCreateWithoutUserInput[]
    connectOrCreate?: UserDocumentCreateOrConnectWithoutUserInput | UserDocumentCreateOrConnectWithoutUserInput[]
    upsert?: UserDocumentUpsertWithWhereUniqueWithoutUserInput | UserDocumentUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: UserDocumentCreateManyUserInputEnvelope
    set?: UserDocumentWhereUniqueInput | UserDocumentWhereUniqueInput[]
    disconnect?: UserDocumentWhereUniqueInput | UserDocumentWhereUniqueInput[]
    delete?: UserDocumentWhereUniqueInput | UserDocumentWhereUniqueInput[]
    connect?: UserDocumentWhereUniqueInput | UserDocumentWhereUniqueInput[]
    update?: UserDocumentUpdateWithWhereUniqueWithoutUserInput | UserDocumentUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: UserDocumentUpdateManyWithWhereWithoutUserInput | UserDocumentUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: UserDocumentScalarWhereInput | UserDocumentScalarWhereInput[]
  }

  export type ContactUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<ContactCreateWithoutUserInput, ContactUncheckedCreateWithoutUserInput> | ContactCreateWithoutUserInput[] | ContactUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ContactCreateOrConnectWithoutUserInput | ContactCreateOrConnectWithoutUserInput[]
    upsert?: ContactUpsertWithWhereUniqueWithoutUserInput | ContactUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: ContactCreateManyUserInputEnvelope
    set?: ContactWhereUniqueInput | ContactWhereUniqueInput[]
    disconnect?: ContactWhereUniqueInput | ContactWhereUniqueInput[]
    delete?: ContactWhereUniqueInput | ContactWhereUniqueInput[]
    connect?: ContactWhereUniqueInput | ContactWhereUniqueInput[]
    update?: ContactUpdateWithWhereUniqueWithoutUserInput | ContactUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: ContactUpdateManyWithWhereWithoutUserInput | ContactUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: ContactScalarWhereInput | ContactScalarWhereInput[]
  }

  export type CreditTransactionUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<CreditTransactionCreateWithoutUserInput, CreditTransactionUncheckedCreateWithoutUserInput> | CreditTransactionCreateWithoutUserInput[] | CreditTransactionUncheckedCreateWithoutUserInput[]
    connectOrCreate?: CreditTransactionCreateOrConnectWithoutUserInput | CreditTransactionCreateOrConnectWithoutUserInput[]
    upsert?: CreditTransactionUpsertWithWhereUniqueWithoutUserInput | CreditTransactionUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: CreditTransactionCreateManyUserInputEnvelope
    set?: CreditTransactionWhereUniqueInput | CreditTransactionWhereUniqueInput[]
    disconnect?: CreditTransactionWhereUniqueInput | CreditTransactionWhereUniqueInput[]
    delete?: CreditTransactionWhereUniqueInput | CreditTransactionWhereUniqueInput[]
    connect?: CreditTransactionWhereUniqueInput | CreditTransactionWhereUniqueInput[]
    update?: CreditTransactionUpdateWithWhereUniqueWithoutUserInput | CreditTransactionUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: CreditTransactionUpdateManyWithWhereWithoutUserInput | CreditTransactionUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: CreditTransactionScalarWhereInput | CreditTransactionScalarWhereInput[]
  }

  export type CreditTransactionUncheckedUpdateManyWithoutAdminNestedInput = {
    create?: XOR<CreditTransactionCreateWithoutAdminInput, CreditTransactionUncheckedCreateWithoutAdminInput> | CreditTransactionCreateWithoutAdminInput[] | CreditTransactionUncheckedCreateWithoutAdminInput[]
    connectOrCreate?: CreditTransactionCreateOrConnectWithoutAdminInput | CreditTransactionCreateOrConnectWithoutAdminInput[]
    upsert?: CreditTransactionUpsertWithWhereUniqueWithoutAdminInput | CreditTransactionUpsertWithWhereUniqueWithoutAdminInput[]
    createMany?: CreditTransactionCreateManyAdminInputEnvelope
    set?: CreditTransactionWhereUniqueInput | CreditTransactionWhereUniqueInput[]
    disconnect?: CreditTransactionWhereUniqueInput | CreditTransactionWhereUniqueInput[]
    delete?: CreditTransactionWhereUniqueInput | CreditTransactionWhereUniqueInput[]
    connect?: CreditTransactionWhereUniqueInput | CreditTransactionWhereUniqueInput[]
    update?: CreditTransactionUpdateWithWhereUniqueWithoutAdminInput | CreditTransactionUpdateWithWhereUniqueWithoutAdminInput[]
    updateMany?: CreditTransactionUpdateManyWithWhereWithoutAdminInput | CreditTransactionUpdateManyWithWhereWithoutAdminInput[]
    deleteMany?: CreditTransactionScalarWhereInput | CreditTransactionScalarWhereInput[]
  }

  export type TemplateClauseCreateNestedManyWithoutTemplateInput = {
    create?: XOR<TemplateClauseCreateWithoutTemplateInput, TemplateClauseUncheckedCreateWithoutTemplateInput> | TemplateClauseCreateWithoutTemplateInput[] | TemplateClauseUncheckedCreateWithoutTemplateInput[]
    connectOrCreate?: TemplateClauseCreateOrConnectWithoutTemplateInput | TemplateClauseCreateOrConnectWithoutTemplateInput[]
    createMany?: TemplateClauseCreateManyTemplateInputEnvelope
    connect?: TemplateClauseWhereUniqueInput | TemplateClauseWhereUniqueInput[]
  }

  export type TemplateNormativityCreateNestedManyWithoutTemplateInput = {
    create?: XOR<TemplateNormativityCreateWithoutTemplateInput, TemplateNormativityUncheckedCreateWithoutTemplateInput> | TemplateNormativityCreateWithoutTemplateInput[] | TemplateNormativityUncheckedCreateWithoutTemplateInput[]
    connectOrCreate?: TemplateNormativityCreateOrConnectWithoutTemplateInput | TemplateNormativityCreateOrConnectWithoutTemplateInput[]
    createMany?: TemplateNormativityCreateManyTemplateInputEnvelope
    connect?: TemplateNormativityWhereUniqueInput | TemplateNormativityWhereUniqueInput[]
  }

  export type UserDocumentCreateNestedManyWithoutTemplateInput = {
    create?: XOR<UserDocumentCreateWithoutTemplateInput, UserDocumentUncheckedCreateWithoutTemplateInput> | UserDocumentCreateWithoutTemplateInput[] | UserDocumentUncheckedCreateWithoutTemplateInput[]
    connectOrCreate?: UserDocumentCreateOrConnectWithoutTemplateInput | UserDocumentCreateOrConnectWithoutTemplateInput[]
    createMany?: UserDocumentCreateManyTemplateInputEnvelope
    connect?: UserDocumentWhereUniqueInput | UserDocumentWhereUniqueInput[]
  }

  export type TemplateClauseUncheckedCreateNestedManyWithoutTemplateInput = {
    create?: XOR<TemplateClauseCreateWithoutTemplateInput, TemplateClauseUncheckedCreateWithoutTemplateInput> | TemplateClauseCreateWithoutTemplateInput[] | TemplateClauseUncheckedCreateWithoutTemplateInput[]
    connectOrCreate?: TemplateClauseCreateOrConnectWithoutTemplateInput | TemplateClauseCreateOrConnectWithoutTemplateInput[]
    createMany?: TemplateClauseCreateManyTemplateInputEnvelope
    connect?: TemplateClauseWhereUniqueInput | TemplateClauseWhereUniqueInput[]
  }

  export type TemplateNormativityUncheckedCreateNestedManyWithoutTemplateInput = {
    create?: XOR<TemplateNormativityCreateWithoutTemplateInput, TemplateNormativityUncheckedCreateWithoutTemplateInput> | TemplateNormativityCreateWithoutTemplateInput[] | TemplateNormativityUncheckedCreateWithoutTemplateInput[]
    connectOrCreate?: TemplateNormativityCreateOrConnectWithoutTemplateInput | TemplateNormativityCreateOrConnectWithoutTemplateInput[]
    createMany?: TemplateNormativityCreateManyTemplateInputEnvelope
    connect?: TemplateNormativityWhereUniqueInput | TemplateNormativityWhereUniqueInput[]
  }

  export type UserDocumentUncheckedCreateNestedManyWithoutTemplateInput = {
    create?: XOR<UserDocumentCreateWithoutTemplateInput, UserDocumentUncheckedCreateWithoutTemplateInput> | UserDocumentCreateWithoutTemplateInput[] | UserDocumentUncheckedCreateWithoutTemplateInput[]
    connectOrCreate?: UserDocumentCreateOrConnectWithoutTemplateInput | UserDocumentCreateOrConnectWithoutTemplateInput[]
    createMany?: UserDocumentCreateManyTemplateInputEnvelope
    connect?: UserDocumentWhereUniqueInput | UserDocumentWhereUniqueInput[]
  }

  export type FloatFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type TemplateClauseUpdateManyWithoutTemplateNestedInput = {
    create?: XOR<TemplateClauseCreateWithoutTemplateInput, TemplateClauseUncheckedCreateWithoutTemplateInput> | TemplateClauseCreateWithoutTemplateInput[] | TemplateClauseUncheckedCreateWithoutTemplateInput[]
    connectOrCreate?: TemplateClauseCreateOrConnectWithoutTemplateInput | TemplateClauseCreateOrConnectWithoutTemplateInput[]
    upsert?: TemplateClauseUpsertWithWhereUniqueWithoutTemplateInput | TemplateClauseUpsertWithWhereUniqueWithoutTemplateInput[]
    createMany?: TemplateClauseCreateManyTemplateInputEnvelope
    set?: TemplateClauseWhereUniqueInput | TemplateClauseWhereUniqueInput[]
    disconnect?: TemplateClauseWhereUniqueInput | TemplateClauseWhereUniqueInput[]
    delete?: TemplateClauseWhereUniqueInput | TemplateClauseWhereUniqueInput[]
    connect?: TemplateClauseWhereUniqueInput | TemplateClauseWhereUniqueInput[]
    update?: TemplateClauseUpdateWithWhereUniqueWithoutTemplateInput | TemplateClauseUpdateWithWhereUniqueWithoutTemplateInput[]
    updateMany?: TemplateClauseUpdateManyWithWhereWithoutTemplateInput | TemplateClauseUpdateManyWithWhereWithoutTemplateInput[]
    deleteMany?: TemplateClauseScalarWhereInput | TemplateClauseScalarWhereInput[]
  }

  export type TemplateNormativityUpdateManyWithoutTemplateNestedInput = {
    create?: XOR<TemplateNormativityCreateWithoutTemplateInput, TemplateNormativityUncheckedCreateWithoutTemplateInput> | TemplateNormativityCreateWithoutTemplateInput[] | TemplateNormativityUncheckedCreateWithoutTemplateInput[]
    connectOrCreate?: TemplateNormativityCreateOrConnectWithoutTemplateInput | TemplateNormativityCreateOrConnectWithoutTemplateInput[]
    upsert?: TemplateNormativityUpsertWithWhereUniqueWithoutTemplateInput | TemplateNormativityUpsertWithWhereUniqueWithoutTemplateInput[]
    createMany?: TemplateNormativityCreateManyTemplateInputEnvelope
    set?: TemplateNormativityWhereUniqueInput | TemplateNormativityWhereUniqueInput[]
    disconnect?: TemplateNormativityWhereUniqueInput | TemplateNormativityWhereUniqueInput[]
    delete?: TemplateNormativityWhereUniqueInput | TemplateNormativityWhereUniqueInput[]
    connect?: TemplateNormativityWhereUniqueInput | TemplateNormativityWhereUniqueInput[]
    update?: TemplateNormativityUpdateWithWhereUniqueWithoutTemplateInput | TemplateNormativityUpdateWithWhereUniqueWithoutTemplateInput[]
    updateMany?: TemplateNormativityUpdateManyWithWhereWithoutTemplateInput | TemplateNormativityUpdateManyWithWhereWithoutTemplateInput[]
    deleteMany?: TemplateNormativityScalarWhereInput | TemplateNormativityScalarWhereInput[]
  }

  export type UserDocumentUpdateManyWithoutTemplateNestedInput = {
    create?: XOR<UserDocumentCreateWithoutTemplateInput, UserDocumentUncheckedCreateWithoutTemplateInput> | UserDocumentCreateWithoutTemplateInput[] | UserDocumentUncheckedCreateWithoutTemplateInput[]
    connectOrCreate?: UserDocumentCreateOrConnectWithoutTemplateInput | UserDocumentCreateOrConnectWithoutTemplateInput[]
    upsert?: UserDocumentUpsertWithWhereUniqueWithoutTemplateInput | UserDocumentUpsertWithWhereUniqueWithoutTemplateInput[]
    createMany?: UserDocumentCreateManyTemplateInputEnvelope
    set?: UserDocumentWhereUniqueInput | UserDocumentWhereUniqueInput[]
    disconnect?: UserDocumentWhereUniqueInput | UserDocumentWhereUniqueInput[]
    delete?: UserDocumentWhereUniqueInput | UserDocumentWhereUniqueInput[]
    connect?: UserDocumentWhereUniqueInput | UserDocumentWhereUniqueInput[]
    update?: UserDocumentUpdateWithWhereUniqueWithoutTemplateInput | UserDocumentUpdateWithWhereUniqueWithoutTemplateInput[]
    updateMany?: UserDocumentUpdateManyWithWhereWithoutTemplateInput | UserDocumentUpdateManyWithWhereWithoutTemplateInput[]
    deleteMany?: UserDocumentScalarWhereInput | UserDocumentScalarWhereInput[]
  }

  export type TemplateClauseUncheckedUpdateManyWithoutTemplateNestedInput = {
    create?: XOR<TemplateClauseCreateWithoutTemplateInput, TemplateClauseUncheckedCreateWithoutTemplateInput> | TemplateClauseCreateWithoutTemplateInput[] | TemplateClauseUncheckedCreateWithoutTemplateInput[]
    connectOrCreate?: TemplateClauseCreateOrConnectWithoutTemplateInput | TemplateClauseCreateOrConnectWithoutTemplateInput[]
    upsert?: TemplateClauseUpsertWithWhereUniqueWithoutTemplateInput | TemplateClauseUpsertWithWhereUniqueWithoutTemplateInput[]
    createMany?: TemplateClauseCreateManyTemplateInputEnvelope
    set?: TemplateClauseWhereUniqueInput | TemplateClauseWhereUniqueInput[]
    disconnect?: TemplateClauseWhereUniqueInput | TemplateClauseWhereUniqueInput[]
    delete?: TemplateClauseWhereUniqueInput | TemplateClauseWhereUniqueInput[]
    connect?: TemplateClauseWhereUniqueInput | TemplateClauseWhereUniqueInput[]
    update?: TemplateClauseUpdateWithWhereUniqueWithoutTemplateInput | TemplateClauseUpdateWithWhereUniqueWithoutTemplateInput[]
    updateMany?: TemplateClauseUpdateManyWithWhereWithoutTemplateInput | TemplateClauseUpdateManyWithWhereWithoutTemplateInput[]
    deleteMany?: TemplateClauseScalarWhereInput | TemplateClauseScalarWhereInput[]
  }

  export type TemplateNormativityUncheckedUpdateManyWithoutTemplateNestedInput = {
    create?: XOR<TemplateNormativityCreateWithoutTemplateInput, TemplateNormativityUncheckedCreateWithoutTemplateInput> | TemplateNormativityCreateWithoutTemplateInput[] | TemplateNormativityUncheckedCreateWithoutTemplateInput[]
    connectOrCreate?: TemplateNormativityCreateOrConnectWithoutTemplateInput | TemplateNormativityCreateOrConnectWithoutTemplateInput[]
    upsert?: TemplateNormativityUpsertWithWhereUniqueWithoutTemplateInput | TemplateNormativityUpsertWithWhereUniqueWithoutTemplateInput[]
    createMany?: TemplateNormativityCreateManyTemplateInputEnvelope
    set?: TemplateNormativityWhereUniqueInput | TemplateNormativityWhereUniqueInput[]
    disconnect?: TemplateNormativityWhereUniqueInput | TemplateNormativityWhereUniqueInput[]
    delete?: TemplateNormativityWhereUniqueInput | TemplateNormativityWhereUniqueInput[]
    connect?: TemplateNormativityWhereUniqueInput | TemplateNormativityWhereUniqueInput[]
    update?: TemplateNormativityUpdateWithWhereUniqueWithoutTemplateInput | TemplateNormativityUpdateWithWhereUniqueWithoutTemplateInput[]
    updateMany?: TemplateNormativityUpdateManyWithWhereWithoutTemplateInput | TemplateNormativityUpdateManyWithWhereWithoutTemplateInput[]
    deleteMany?: TemplateNormativityScalarWhereInput | TemplateNormativityScalarWhereInput[]
  }

  export type UserDocumentUncheckedUpdateManyWithoutTemplateNestedInput = {
    create?: XOR<UserDocumentCreateWithoutTemplateInput, UserDocumentUncheckedCreateWithoutTemplateInput> | UserDocumentCreateWithoutTemplateInput[] | UserDocumentUncheckedCreateWithoutTemplateInput[]
    connectOrCreate?: UserDocumentCreateOrConnectWithoutTemplateInput | UserDocumentCreateOrConnectWithoutTemplateInput[]
    upsert?: UserDocumentUpsertWithWhereUniqueWithoutTemplateInput | UserDocumentUpsertWithWhereUniqueWithoutTemplateInput[]
    createMany?: UserDocumentCreateManyTemplateInputEnvelope
    set?: UserDocumentWhereUniqueInput | UserDocumentWhereUniqueInput[]
    disconnect?: UserDocumentWhereUniqueInput | UserDocumentWhereUniqueInput[]
    delete?: UserDocumentWhereUniqueInput | UserDocumentWhereUniqueInput[]
    connect?: UserDocumentWhereUniqueInput | UserDocumentWhereUniqueInput[]
    update?: UserDocumentUpdateWithWhereUniqueWithoutTemplateInput | UserDocumentUpdateWithWhereUniqueWithoutTemplateInput[]
    updateMany?: UserDocumentUpdateManyWithWhereWithoutTemplateInput | UserDocumentUpdateManyWithWhereWithoutTemplateInput[]
    deleteMany?: UserDocumentScalarWhereInput | UserDocumentScalarWhereInput[]
  }

  export type TemplateClauseCreateNestedManyWithoutClauseInput = {
    create?: XOR<TemplateClauseCreateWithoutClauseInput, TemplateClauseUncheckedCreateWithoutClauseInput> | TemplateClauseCreateWithoutClauseInput[] | TemplateClauseUncheckedCreateWithoutClauseInput[]
    connectOrCreate?: TemplateClauseCreateOrConnectWithoutClauseInput | TemplateClauseCreateOrConnectWithoutClauseInput[]
    createMany?: TemplateClauseCreateManyClauseInputEnvelope
    connect?: TemplateClauseWhereUniqueInput | TemplateClauseWhereUniqueInput[]
  }

  export type TemplateClauseUncheckedCreateNestedManyWithoutClauseInput = {
    create?: XOR<TemplateClauseCreateWithoutClauseInput, TemplateClauseUncheckedCreateWithoutClauseInput> | TemplateClauseCreateWithoutClauseInput[] | TemplateClauseUncheckedCreateWithoutClauseInput[]
    connectOrCreate?: TemplateClauseCreateOrConnectWithoutClauseInput | TemplateClauseCreateOrConnectWithoutClauseInput[]
    createMany?: TemplateClauseCreateManyClauseInputEnvelope
    connect?: TemplateClauseWhereUniqueInput | TemplateClauseWhereUniqueInput[]
  }

  export type TemplateClauseUpdateManyWithoutClauseNestedInput = {
    create?: XOR<TemplateClauseCreateWithoutClauseInput, TemplateClauseUncheckedCreateWithoutClauseInput> | TemplateClauseCreateWithoutClauseInput[] | TemplateClauseUncheckedCreateWithoutClauseInput[]
    connectOrCreate?: TemplateClauseCreateOrConnectWithoutClauseInput | TemplateClauseCreateOrConnectWithoutClauseInput[]
    upsert?: TemplateClauseUpsertWithWhereUniqueWithoutClauseInput | TemplateClauseUpsertWithWhereUniqueWithoutClauseInput[]
    createMany?: TemplateClauseCreateManyClauseInputEnvelope
    set?: TemplateClauseWhereUniqueInput | TemplateClauseWhereUniqueInput[]
    disconnect?: TemplateClauseWhereUniqueInput | TemplateClauseWhereUniqueInput[]
    delete?: TemplateClauseWhereUniqueInput | TemplateClauseWhereUniqueInput[]
    connect?: TemplateClauseWhereUniqueInput | TemplateClauseWhereUniqueInput[]
    update?: TemplateClauseUpdateWithWhereUniqueWithoutClauseInput | TemplateClauseUpdateWithWhereUniqueWithoutClauseInput[]
    updateMany?: TemplateClauseUpdateManyWithWhereWithoutClauseInput | TemplateClauseUpdateManyWithWhereWithoutClauseInput[]
    deleteMany?: TemplateClauseScalarWhereInput | TemplateClauseScalarWhereInput[]
  }

  export type TemplateClauseUncheckedUpdateManyWithoutClauseNestedInput = {
    create?: XOR<TemplateClauseCreateWithoutClauseInput, TemplateClauseUncheckedCreateWithoutClauseInput> | TemplateClauseCreateWithoutClauseInput[] | TemplateClauseUncheckedCreateWithoutClauseInput[]
    connectOrCreate?: TemplateClauseCreateOrConnectWithoutClauseInput | TemplateClauseCreateOrConnectWithoutClauseInput[]
    upsert?: TemplateClauseUpsertWithWhereUniqueWithoutClauseInput | TemplateClauseUpsertWithWhereUniqueWithoutClauseInput[]
    createMany?: TemplateClauseCreateManyClauseInputEnvelope
    set?: TemplateClauseWhereUniqueInput | TemplateClauseWhereUniqueInput[]
    disconnect?: TemplateClauseWhereUniqueInput | TemplateClauseWhereUniqueInput[]
    delete?: TemplateClauseWhereUniqueInput | TemplateClauseWhereUniqueInput[]
    connect?: TemplateClauseWhereUniqueInput | TemplateClauseWhereUniqueInput[]
    update?: TemplateClauseUpdateWithWhereUniqueWithoutClauseInput | TemplateClauseUpdateWithWhereUniqueWithoutClauseInput[]
    updateMany?: TemplateClauseUpdateManyWithWhereWithoutClauseInput | TemplateClauseUpdateManyWithWhereWithoutClauseInput[]
    deleteMany?: TemplateClauseScalarWhereInput | TemplateClauseScalarWhereInput[]
  }

  export type DocumentTemplateCreateNestedOneWithoutClausesInput = {
    create?: XOR<DocumentTemplateCreateWithoutClausesInput, DocumentTemplateUncheckedCreateWithoutClausesInput>
    connectOrCreate?: DocumentTemplateCreateOrConnectWithoutClausesInput
    connect?: DocumentTemplateWhereUniqueInput
  }

  export type ClauseCreateNestedOneWithoutTemplatesInput = {
    create?: XOR<ClauseCreateWithoutTemplatesInput, ClauseUncheckedCreateWithoutTemplatesInput>
    connectOrCreate?: ClauseCreateOrConnectWithoutTemplatesInput
    connect?: ClauseWhereUniqueInput
  }

  export type DocumentTemplateUpdateOneRequiredWithoutClausesNestedInput = {
    create?: XOR<DocumentTemplateCreateWithoutClausesInput, DocumentTemplateUncheckedCreateWithoutClausesInput>
    connectOrCreate?: DocumentTemplateCreateOrConnectWithoutClausesInput
    upsert?: DocumentTemplateUpsertWithoutClausesInput
    connect?: DocumentTemplateWhereUniqueInput
    update?: XOR<XOR<DocumentTemplateUpdateToOneWithWhereWithoutClausesInput, DocumentTemplateUpdateWithoutClausesInput>, DocumentTemplateUncheckedUpdateWithoutClausesInput>
  }

  export type ClauseUpdateOneRequiredWithoutTemplatesNestedInput = {
    create?: XOR<ClauseCreateWithoutTemplatesInput, ClauseUncheckedCreateWithoutTemplatesInput>
    connectOrCreate?: ClauseCreateOrConnectWithoutTemplatesInput
    upsert?: ClauseUpsertWithoutTemplatesInput
    connect?: ClauseWhereUniqueInput
    update?: XOR<XOR<ClauseUpdateToOneWithWhereWithoutTemplatesInput, ClauseUpdateWithoutTemplatesInput>, ClauseUncheckedUpdateWithoutTemplatesInput>
  }

  export type DocumentTemplateCreateNestedOneWithoutNormativityInput = {
    create?: XOR<DocumentTemplateCreateWithoutNormativityInput, DocumentTemplateUncheckedCreateWithoutNormativityInput>
    connectOrCreate?: DocumentTemplateCreateOrConnectWithoutNormativityInput
    connect?: DocumentTemplateWhereUniqueInput
  }

  export type DocumentTemplateUpdateOneRequiredWithoutNormativityNestedInput = {
    create?: XOR<DocumentTemplateCreateWithoutNormativityInput, DocumentTemplateUncheckedCreateWithoutNormativityInput>
    connectOrCreate?: DocumentTemplateCreateOrConnectWithoutNormativityInput
    upsert?: DocumentTemplateUpsertWithoutNormativityInput
    connect?: DocumentTemplateWhereUniqueInput
    update?: XOR<XOR<DocumentTemplateUpdateToOneWithWhereWithoutNormativityInput, DocumentTemplateUpdateWithoutNormativityInput>, DocumentTemplateUncheckedUpdateWithoutNormativityInput>
  }

  export type DocumentTemplateCreateNestedOneWithoutDocumentsInput = {
    create?: XOR<DocumentTemplateCreateWithoutDocumentsInput, DocumentTemplateUncheckedCreateWithoutDocumentsInput>
    connectOrCreate?: DocumentTemplateCreateOrConnectWithoutDocumentsInput
    connect?: DocumentTemplateWhereUniqueInput
  }

  export type UserCreateNestedOneWithoutDocumentsInput = {
    create?: XOR<UserCreateWithoutDocumentsInput, UserUncheckedCreateWithoutDocumentsInput>
    connectOrCreate?: UserCreateOrConnectWithoutDocumentsInput
    connect?: UserWhereUniqueInput
  }

  export type DocumentTemplateUpdateOneRequiredWithoutDocumentsNestedInput = {
    create?: XOR<DocumentTemplateCreateWithoutDocumentsInput, DocumentTemplateUncheckedCreateWithoutDocumentsInput>
    connectOrCreate?: DocumentTemplateCreateOrConnectWithoutDocumentsInput
    upsert?: DocumentTemplateUpsertWithoutDocumentsInput
    connect?: DocumentTemplateWhereUniqueInput
    update?: XOR<XOR<DocumentTemplateUpdateToOneWithWhereWithoutDocumentsInput, DocumentTemplateUpdateWithoutDocumentsInput>, DocumentTemplateUncheckedUpdateWithoutDocumentsInput>
  }

  export type UserUpdateOneWithoutDocumentsNestedInput = {
    create?: XOR<UserCreateWithoutDocumentsInput, UserUncheckedCreateWithoutDocumentsInput>
    connectOrCreate?: UserCreateOrConnectWithoutDocumentsInput
    upsert?: UserUpsertWithoutDocumentsInput
    disconnect?: UserWhereInput | boolean
    delete?: UserWhereInput | boolean
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutDocumentsInput, UserUpdateWithoutDocumentsInput>, UserUncheckedUpdateWithoutDocumentsInput>
  }

  export type UserCreateNestedOneWithoutContactsInput = {
    create?: XOR<UserCreateWithoutContactsInput, UserUncheckedCreateWithoutContactsInput>
    connectOrCreate?: UserCreateOrConnectWithoutContactsInput
    connect?: UserWhereUniqueInput
  }

  export type UserUpdateOneRequiredWithoutContactsNestedInput = {
    create?: XOR<UserCreateWithoutContactsInput, UserUncheckedCreateWithoutContactsInput>
    connectOrCreate?: UserCreateOrConnectWithoutContactsInput
    upsert?: UserUpsertWithoutContactsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutContactsInput, UserUpdateWithoutContactsInput>, UserUncheckedUpdateWithoutContactsInput>
  }

  export type UserCreateNestedOneWithoutCreditTransactionsInput = {
    create?: XOR<UserCreateWithoutCreditTransactionsInput, UserUncheckedCreateWithoutCreditTransactionsInput>
    connectOrCreate?: UserCreateOrConnectWithoutCreditTransactionsInput
    connect?: UserWhereUniqueInput
  }

  export type UserCreateNestedOneWithoutCreditGrantsInput = {
    create?: XOR<UserCreateWithoutCreditGrantsInput, UserUncheckedCreateWithoutCreditGrantsInput>
    connectOrCreate?: UserCreateOrConnectWithoutCreditGrantsInput
    connect?: UserWhereUniqueInput
  }

  export type UserUpdateOneRequiredWithoutCreditTransactionsNestedInput = {
    create?: XOR<UserCreateWithoutCreditTransactionsInput, UserUncheckedCreateWithoutCreditTransactionsInput>
    connectOrCreate?: UserCreateOrConnectWithoutCreditTransactionsInput
    upsert?: UserUpsertWithoutCreditTransactionsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutCreditTransactionsInput, UserUpdateWithoutCreditTransactionsInput>, UserUncheckedUpdateWithoutCreditTransactionsInput>
  }

  export type UserUpdateOneWithoutCreditGrantsNestedInput = {
    create?: XOR<UserCreateWithoutCreditGrantsInput, UserUncheckedCreateWithoutCreditGrantsInput>
    connectOrCreate?: UserCreateOrConnectWithoutCreditGrantsInput
    upsert?: UserUpsertWithoutCreditGrantsInput
    disconnect?: UserWhereInput | boolean
    delete?: UserWhereInput | boolean
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutCreditGrantsInput, UserUpdateWithoutCreditGrantsInput>, UserUncheckedUpdateWithoutCreditGrantsInput>
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type NestedFloatWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedFloatFilter<$PrismaModel>
    _min?: NestedFloatFilter<$PrismaModel>
    _max?: NestedFloatFilter<$PrismaModel>
  }

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type UserDocumentCreateWithoutUserInput = {
    id?: string
    title: string
    status?: string
    answers: string
    generatedContent?: string | null
    visitorPhone?: string | null
    visitorName?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    template: DocumentTemplateCreateNestedOneWithoutDocumentsInput
  }

  export type UserDocumentUncheckedCreateWithoutUserInput = {
    id?: string
    templateId: string
    title: string
    status?: string
    answers: string
    generatedContent?: string | null
    visitorPhone?: string | null
    visitorName?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UserDocumentCreateOrConnectWithoutUserInput = {
    where: UserDocumentWhereUniqueInput
    create: XOR<UserDocumentCreateWithoutUserInput, UserDocumentUncheckedCreateWithoutUserInput>
  }

  export type UserDocumentCreateManyUserInputEnvelope = {
    data: UserDocumentCreateManyUserInput | UserDocumentCreateManyUserInput[]
  }

  export type ContactCreateWithoutUserInput = {
    id?: string
    name: string
    contactType: string
    documentType?: string | null
    documentNumber?: string | null
    address?: string | null
    city?: string | null
    phone?: string | null
    email?: string | null
    companyName?: string | null
    notes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ContactUncheckedCreateWithoutUserInput = {
    id?: string
    name: string
    contactType: string
    documentType?: string | null
    documentNumber?: string | null
    address?: string | null
    city?: string | null
    phone?: string | null
    email?: string | null
    companyName?: string | null
    notes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ContactCreateOrConnectWithoutUserInput = {
    where: ContactWhereUniqueInput
    create: XOR<ContactCreateWithoutUserInput, ContactUncheckedCreateWithoutUserInput>
  }

  export type ContactCreateManyUserInputEnvelope = {
    data: ContactCreateManyUserInput | ContactCreateManyUserInput[]
  }

  export type CreditTransactionCreateWithoutUserInput = {
    id?: string
    amount: number
    type: string
    description?: string | null
    createdAt?: Date | string
    admin?: UserCreateNestedOneWithoutCreditGrantsInput
  }

  export type CreditTransactionUncheckedCreateWithoutUserInput = {
    id?: string
    amount: number
    type: string
    description?: string | null
    adminId?: string | null
    createdAt?: Date | string
  }

  export type CreditTransactionCreateOrConnectWithoutUserInput = {
    where: CreditTransactionWhereUniqueInput
    create: XOR<CreditTransactionCreateWithoutUserInput, CreditTransactionUncheckedCreateWithoutUserInput>
  }

  export type CreditTransactionCreateManyUserInputEnvelope = {
    data: CreditTransactionCreateManyUserInput | CreditTransactionCreateManyUserInput[]
  }

  export type CreditTransactionCreateWithoutAdminInput = {
    id?: string
    amount: number
    type: string
    description?: string | null
    createdAt?: Date | string
    user: UserCreateNestedOneWithoutCreditTransactionsInput
  }

  export type CreditTransactionUncheckedCreateWithoutAdminInput = {
    id?: string
    userId: string
    amount: number
    type: string
    description?: string | null
    createdAt?: Date | string
  }

  export type CreditTransactionCreateOrConnectWithoutAdminInput = {
    where: CreditTransactionWhereUniqueInput
    create: XOR<CreditTransactionCreateWithoutAdminInput, CreditTransactionUncheckedCreateWithoutAdminInput>
  }

  export type CreditTransactionCreateManyAdminInputEnvelope = {
    data: CreditTransactionCreateManyAdminInput | CreditTransactionCreateManyAdminInput[]
  }

  export type UserDocumentUpsertWithWhereUniqueWithoutUserInput = {
    where: UserDocumentWhereUniqueInput
    update: XOR<UserDocumentUpdateWithoutUserInput, UserDocumentUncheckedUpdateWithoutUserInput>
    create: XOR<UserDocumentCreateWithoutUserInput, UserDocumentUncheckedCreateWithoutUserInput>
  }

  export type UserDocumentUpdateWithWhereUniqueWithoutUserInput = {
    where: UserDocumentWhereUniqueInput
    data: XOR<UserDocumentUpdateWithoutUserInput, UserDocumentUncheckedUpdateWithoutUserInput>
  }

  export type UserDocumentUpdateManyWithWhereWithoutUserInput = {
    where: UserDocumentScalarWhereInput
    data: XOR<UserDocumentUpdateManyMutationInput, UserDocumentUncheckedUpdateManyWithoutUserInput>
  }

  export type UserDocumentScalarWhereInput = {
    AND?: UserDocumentScalarWhereInput | UserDocumentScalarWhereInput[]
    OR?: UserDocumentScalarWhereInput[]
    NOT?: UserDocumentScalarWhereInput | UserDocumentScalarWhereInput[]
    id?: StringFilter<"UserDocument"> | string
    userId?: StringNullableFilter<"UserDocument"> | string | null
    templateId?: StringFilter<"UserDocument"> | string
    title?: StringFilter<"UserDocument"> | string
    status?: StringFilter<"UserDocument"> | string
    answers?: StringFilter<"UserDocument"> | string
    generatedContent?: StringNullableFilter<"UserDocument"> | string | null
    visitorPhone?: StringNullableFilter<"UserDocument"> | string | null
    visitorName?: StringNullableFilter<"UserDocument"> | string | null
    createdAt?: DateTimeFilter<"UserDocument"> | Date | string
    updatedAt?: DateTimeFilter<"UserDocument"> | Date | string
  }

  export type ContactUpsertWithWhereUniqueWithoutUserInput = {
    where: ContactWhereUniqueInput
    update: XOR<ContactUpdateWithoutUserInput, ContactUncheckedUpdateWithoutUserInput>
    create: XOR<ContactCreateWithoutUserInput, ContactUncheckedCreateWithoutUserInput>
  }

  export type ContactUpdateWithWhereUniqueWithoutUserInput = {
    where: ContactWhereUniqueInput
    data: XOR<ContactUpdateWithoutUserInput, ContactUncheckedUpdateWithoutUserInput>
  }

  export type ContactUpdateManyWithWhereWithoutUserInput = {
    where: ContactScalarWhereInput
    data: XOR<ContactUpdateManyMutationInput, ContactUncheckedUpdateManyWithoutUserInput>
  }

  export type ContactScalarWhereInput = {
    AND?: ContactScalarWhereInput | ContactScalarWhereInput[]
    OR?: ContactScalarWhereInput[]
    NOT?: ContactScalarWhereInput | ContactScalarWhereInput[]
    id?: StringFilter<"Contact"> | string
    userId?: StringFilter<"Contact"> | string
    name?: StringFilter<"Contact"> | string
    contactType?: StringFilter<"Contact"> | string
    documentType?: StringNullableFilter<"Contact"> | string | null
    documentNumber?: StringNullableFilter<"Contact"> | string | null
    address?: StringNullableFilter<"Contact"> | string | null
    city?: StringNullableFilter<"Contact"> | string | null
    phone?: StringNullableFilter<"Contact"> | string | null
    email?: StringNullableFilter<"Contact"> | string | null
    companyName?: StringNullableFilter<"Contact"> | string | null
    notes?: StringNullableFilter<"Contact"> | string | null
    createdAt?: DateTimeFilter<"Contact"> | Date | string
    updatedAt?: DateTimeFilter<"Contact"> | Date | string
  }

  export type CreditTransactionUpsertWithWhereUniqueWithoutUserInput = {
    where: CreditTransactionWhereUniqueInput
    update: XOR<CreditTransactionUpdateWithoutUserInput, CreditTransactionUncheckedUpdateWithoutUserInput>
    create: XOR<CreditTransactionCreateWithoutUserInput, CreditTransactionUncheckedCreateWithoutUserInput>
  }

  export type CreditTransactionUpdateWithWhereUniqueWithoutUserInput = {
    where: CreditTransactionWhereUniqueInput
    data: XOR<CreditTransactionUpdateWithoutUserInput, CreditTransactionUncheckedUpdateWithoutUserInput>
  }

  export type CreditTransactionUpdateManyWithWhereWithoutUserInput = {
    where: CreditTransactionScalarWhereInput
    data: XOR<CreditTransactionUpdateManyMutationInput, CreditTransactionUncheckedUpdateManyWithoutUserInput>
  }

  export type CreditTransactionScalarWhereInput = {
    AND?: CreditTransactionScalarWhereInput | CreditTransactionScalarWhereInput[]
    OR?: CreditTransactionScalarWhereInput[]
    NOT?: CreditTransactionScalarWhereInput | CreditTransactionScalarWhereInput[]
    id?: StringFilter<"CreditTransaction"> | string
    userId?: StringFilter<"CreditTransaction"> | string
    amount?: IntFilter<"CreditTransaction"> | number
    type?: StringFilter<"CreditTransaction"> | string
    description?: StringNullableFilter<"CreditTransaction"> | string | null
    adminId?: StringNullableFilter<"CreditTransaction"> | string | null
    createdAt?: DateTimeFilter<"CreditTransaction"> | Date | string
  }

  export type CreditTransactionUpsertWithWhereUniqueWithoutAdminInput = {
    where: CreditTransactionWhereUniqueInput
    update: XOR<CreditTransactionUpdateWithoutAdminInput, CreditTransactionUncheckedUpdateWithoutAdminInput>
    create: XOR<CreditTransactionCreateWithoutAdminInput, CreditTransactionUncheckedCreateWithoutAdminInput>
  }

  export type CreditTransactionUpdateWithWhereUniqueWithoutAdminInput = {
    where: CreditTransactionWhereUniqueInput
    data: XOR<CreditTransactionUpdateWithoutAdminInput, CreditTransactionUncheckedUpdateWithoutAdminInput>
  }

  export type CreditTransactionUpdateManyWithWhereWithoutAdminInput = {
    where: CreditTransactionScalarWhereInput
    data: XOR<CreditTransactionUpdateManyMutationInput, CreditTransactionUncheckedUpdateManyWithoutAdminInput>
  }

  export type TemplateClauseCreateWithoutTemplateInput = {
    id?: string
    sectionName?: string | null
    order?: number
    clause: ClauseCreateNestedOneWithoutTemplatesInput
  }

  export type TemplateClauseUncheckedCreateWithoutTemplateInput = {
    id?: string
    clauseId: string
    sectionName?: string | null
    order?: number
  }

  export type TemplateClauseCreateOrConnectWithoutTemplateInput = {
    where: TemplateClauseWhereUniqueInput
    create: XOR<TemplateClauseCreateWithoutTemplateInput, TemplateClauseUncheckedCreateWithoutTemplateInput>
  }

  export type TemplateClauseCreateManyTemplateInputEnvelope = {
    data: TemplateClauseCreateManyTemplateInput | TemplateClauseCreateManyTemplateInput[]
  }

  export type TemplateNormativityCreateWithoutTemplateInput = {
    id?: string
    lawName: string
    lawReference: string
    articleNumber?: string | null
    description?: string | null
  }

  export type TemplateNormativityUncheckedCreateWithoutTemplateInput = {
    id?: string
    lawName: string
    lawReference: string
    articleNumber?: string | null
    description?: string | null
  }

  export type TemplateNormativityCreateOrConnectWithoutTemplateInput = {
    where: TemplateNormativityWhereUniqueInput
    create: XOR<TemplateNormativityCreateWithoutTemplateInput, TemplateNormativityUncheckedCreateWithoutTemplateInput>
  }

  export type TemplateNormativityCreateManyTemplateInputEnvelope = {
    data: TemplateNormativityCreateManyTemplateInput | TemplateNormativityCreateManyTemplateInput[]
  }

  export type UserDocumentCreateWithoutTemplateInput = {
    id?: string
    title: string
    status?: string
    answers: string
    generatedContent?: string | null
    visitorPhone?: string | null
    visitorName?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    user?: UserCreateNestedOneWithoutDocumentsInput
  }

  export type UserDocumentUncheckedCreateWithoutTemplateInput = {
    id?: string
    userId?: string | null
    title: string
    status?: string
    answers: string
    generatedContent?: string | null
    visitorPhone?: string | null
    visitorName?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UserDocumentCreateOrConnectWithoutTemplateInput = {
    where: UserDocumentWhereUniqueInput
    create: XOR<UserDocumentCreateWithoutTemplateInput, UserDocumentUncheckedCreateWithoutTemplateInput>
  }

  export type UserDocumentCreateManyTemplateInputEnvelope = {
    data: UserDocumentCreateManyTemplateInput | UserDocumentCreateManyTemplateInput[]
  }

  export type TemplateClauseUpsertWithWhereUniqueWithoutTemplateInput = {
    where: TemplateClauseWhereUniqueInput
    update: XOR<TemplateClauseUpdateWithoutTemplateInput, TemplateClauseUncheckedUpdateWithoutTemplateInput>
    create: XOR<TemplateClauseCreateWithoutTemplateInput, TemplateClauseUncheckedCreateWithoutTemplateInput>
  }

  export type TemplateClauseUpdateWithWhereUniqueWithoutTemplateInput = {
    where: TemplateClauseWhereUniqueInput
    data: XOR<TemplateClauseUpdateWithoutTemplateInput, TemplateClauseUncheckedUpdateWithoutTemplateInput>
  }

  export type TemplateClauseUpdateManyWithWhereWithoutTemplateInput = {
    where: TemplateClauseScalarWhereInput
    data: XOR<TemplateClauseUpdateManyMutationInput, TemplateClauseUncheckedUpdateManyWithoutTemplateInput>
  }

  export type TemplateClauseScalarWhereInput = {
    AND?: TemplateClauseScalarWhereInput | TemplateClauseScalarWhereInput[]
    OR?: TemplateClauseScalarWhereInput[]
    NOT?: TemplateClauseScalarWhereInput | TemplateClauseScalarWhereInput[]
    id?: StringFilter<"TemplateClause"> | string
    templateId?: StringFilter<"TemplateClause"> | string
    clauseId?: StringFilter<"TemplateClause"> | string
    sectionName?: StringNullableFilter<"TemplateClause"> | string | null
    order?: IntFilter<"TemplateClause"> | number
  }

  export type TemplateNormativityUpsertWithWhereUniqueWithoutTemplateInput = {
    where: TemplateNormativityWhereUniqueInput
    update: XOR<TemplateNormativityUpdateWithoutTemplateInput, TemplateNormativityUncheckedUpdateWithoutTemplateInput>
    create: XOR<TemplateNormativityCreateWithoutTemplateInput, TemplateNormativityUncheckedCreateWithoutTemplateInput>
  }

  export type TemplateNormativityUpdateWithWhereUniqueWithoutTemplateInput = {
    where: TemplateNormativityWhereUniqueInput
    data: XOR<TemplateNormativityUpdateWithoutTemplateInput, TemplateNormativityUncheckedUpdateWithoutTemplateInput>
  }

  export type TemplateNormativityUpdateManyWithWhereWithoutTemplateInput = {
    where: TemplateNormativityScalarWhereInput
    data: XOR<TemplateNormativityUpdateManyMutationInput, TemplateNormativityUncheckedUpdateManyWithoutTemplateInput>
  }

  export type TemplateNormativityScalarWhereInput = {
    AND?: TemplateNormativityScalarWhereInput | TemplateNormativityScalarWhereInput[]
    OR?: TemplateNormativityScalarWhereInput[]
    NOT?: TemplateNormativityScalarWhereInput | TemplateNormativityScalarWhereInput[]
    id?: StringFilter<"TemplateNormativity"> | string
    templateId?: StringFilter<"TemplateNormativity"> | string
    lawName?: StringFilter<"TemplateNormativity"> | string
    lawReference?: StringFilter<"TemplateNormativity"> | string
    articleNumber?: StringNullableFilter<"TemplateNormativity"> | string | null
    description?: StringNullableFilter<"TemplateNormativity"> | string | null
  }

  export type UserDocumentUpsertWithWhereUniqueWithoutTemplateInput = {
    where: UserDocumentWhereUniqueInput
    update: XOR<UserDocumentUpdateWithoutTemplateInput, UserDocumentUncheckedUpdateWithoutTemplateInput>
    create: XOR<UserDocumentCreateWithoutTemplateInput, UserDocumentUncheckedCreateWithoutTemplateInput>
  }

  export type UserDocumentUpdateWithWhereUniqueWithoutTemplateInput = {
    where: UserDocumentWhereUniqueInput
    data: XOR<UserDocumentUpdateWithoutTemplateInput, UserDocumentUncheckedUpdateWithoutTemplateInput>
  }

  export type UserDocumentUpdateManyWithWhereWithoutTemplateInput = {
    where: UserDocumentScalarWhereInput
    data: XOR<UserDocumentUpdateManyMutationInput, UserDocumentUncheckedUpdateManyWithoutTemplateInput>
  }

  export type TemplateClauseCreateWithoutClauseInput = {
    id?: string
    sectionName?: string | null
    order?: number
    template: DocumentTemplateCreateNestedOneWithoutClausesInput
  }

  export type TemplateClauseUncheckedCreateWithoutClauseInput = {
    id?: string
    templateId: string
    sectionName?: string | null
    order?: number
  }

  export type TemplateClauseCreateOrConnectWithoutClauseInput = {
    where: TemplateClauseWhereUniqueInput
    create: XOR<TemplateClauseCreateWithoutClauseInput, TemplateClauseUncheckedCreateWithoutClauseInput>
  }

  export type TemplateClauseCreateManyClauseInputEnvelope = {
    data: TemplateClauseCreateManyClauseInput | TemplateClauseCreateManyClauseInput[]
  }

  export type TemplateClauseUpsertWithWhereUniqueWithoutClauseInput = {
    where: TemplateClauseWhereUniqueInput
    update: XOR<TemplateClauseUpdateWithoutClauseInput, TemplateClauseUncheckedUpdateWithoutClauseInput>
    create: XOR<TemplateClauseCreateWithoutClauseInput, TemplateClauseUncheckedCreateWithoutClauseInput>
  }

  export type TemplateClauseUpdateWithWhereUniqueWithoutClauseInput = {
    where: TemplateClauseWhereUniqueInput
    data: XOR<TemplateClauseUpdateWithoutClauseInput, TemplateClauseUncheckedUpdateWithoutClauseInput>
  }

  export type TemplateClauseUpdateManyWithWhereWithoutClauseInput = {
    where: TemplateClauseScalarWhereInput
    data: XOR<TemplateClauseUpdateManyMutationInput, TemplateClauseUncheckedUpdateManyWithoutClauseInput>
  }

  export type DocumentTemplateCreateWithoutClausesInput = {
    id?: string
    name: string
    description: string
    category: string
    subcategory?: string | null
    legalArea: string
    audience?: string
    status?: string
    price?: number
    estimatedQuestions?: number
    estimatedMinutes?: number
    rating?: number
    ratingCount?: number
    thumbnail?: string | null
    baseContent: string
    headerContent?: string | null
    footerContent?: string | null
    wizardConfig: string
    blurPreview?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    normativity?: TemplateNormativityCreateNestedManyWithoutTemplateInput
    documents?: UserDocumentCreateNestedManyWithoutTemplateInput
  }

  export type DocumentTemplateUncheckedCreateWithoutClausesInput = {
    id?: string
    name: string
    description: string
    category: string
    subcategory?: string | null
    legalArea: string
    audience?: string
    status?: string
    price?: number
    estimatedQuestions?: number
    estimatedMinutes?: number
    rating?: number
    ratingCount?: number
    thumbnail?: string | null
    baseContent: string
    headerContent?: string | null
    footerContent?: string | null
    wizardConfig: string
    blurPreview?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    normativity?: TemplateNormativityUncheckedCreateNestedManyWithoutTemplateInput
    documents?: UserDocumentUncheckedCreateNestedManyWithoutTemplateInput
  }

  export type DocumentTemplateCreateOrConnectWithoutClausesInput = {
    where: DocumentTemplateWhereUniqueInput
    create: XOR<DocumentTemplateCreateWithoutClausesInput, DocumentTemplateUncheckedCreateWithoutClausesInput>
  }

  export type ClauseCreateWithoutTemplatesInput = {
    id?: string
    title: string
    content: string
    legalArea?: string | null
    category?: string | null
    isDefault?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ClauseUncheckedCreateWithoutTemplatesInput = {
    id?: string
    title: string
    content: string
    legalArea?: string | null
    category?: string | null
    isDefault?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ClauseCreateOrConnectWithoutTemplatesInput = {
    where: ClauseWhereUniqueInput
    create: XOR<ClauseCreateWithoutTemplatesInput, ClauseUncheckedCreateWithoutTemplatesInput>
  }

  export type DocumentTemplateUpsertWithoutClausesInput = {
    update: XOR<DocumentTemplateUpdateWithoutClausesInput, DocumentTemplateUncheckedUpdateWithoutClausesInput>
    create: XOR<DocumentTemplateCreateWithoutClausesInput, DocumentTemplateUncheckedCreateWithoutClausesInput>
    where?: DocumentTemplateWhereInput
  }

  export type DocumentTemplateUpdateToOneWithWhereWithoutClausesInput = {
    where?: DocumentTemplateWhereInput
    data: XOR<DocumentTemplateUpdateWithoutClausesInput, DocumentTemplateUncheckedUpdateWithoutClausesInput>
  }

  export type DocumentTemplateUpdateWithoutClausesInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    category?: StringFieldUpdateOperationsInput | string
    subcategory?: NullableStringFieldUpdateOperationsInput | string | null
    legalArea?: StringFieldUpdateOperationsInput | string
    audience?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    price?: FloatFieldUpdateOperationsInput | number
    estimatedQuestions?: IntFieldUpdateOperationsInput | number
    estimatedMinutes?: IntFieldUpdateOperationsInput | number
    rating?: FloatFieldUpdateOperationsInput | number
    ratingCount?: IntFieldUpdateOperationsInput | number
    thumbnail?: NullableStringFieldUpdateOperationsInput | string | null
    baseContent?: StringFieldUpdateOperationsInput | string
    headerContent?: NullableStringFieldUpdateOperationsInput | string | null
    footerContent?: NullableStringFieldUpdateOperationsInput | string | null
    wizardConfig?: StringFieldUpdateOperationsInput | string
    blurPreview?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    normativity?: TemplateNormativityUpdateManyWithoutTemplateNestedInput
    documents?: UserDocumentUpdateManyWithoutTemplateNestedInput
  }

  export type DocumentTemplateUncheckedUpdateWithoutClausesInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    category?: StringFieldUpdateOperationsInput | string
    subcategory?: NullableStringFieldUpdateOperationsInput | string | null
    legalArea?: StringFieldUpdateOperationsInput | string
    audience?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    price?: FloatFieldUpdateOperationsInput | number
    estimatedQuestions?: IntFieldUpdateOperationsInput | number
    estimatedMinutes?: IntFieldUpdateOperationsInput | number
    rating?: FloatFieldUpdateOperationsInput | number
    ratingCount?: IntFieldUpdateOperationsInput | number
    thumbnail?: NullableStringFieldUpdateOperationsInput | string | null
    baseContent?: StringFieldUpdateOperationsInput | string
    headerContent?: NullableStringFieldUpdateOperationsInput | string | null
    footerContent?: NullableStringFieldUpdateOperationsInput | string | null
    wizardConfig?: StringFieldUpdateOperationsInput | string
    blurPreview?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    normativity?: TemplateNormativityUncheckedUpdateManyWithoutTemplateNestedInput
    documents?: UserDocumentUncheckedUpdateManyWithoutTemplateNestedInput
  }

  export type ClauseUpsertWithoutTemplatesInput = {
    update: XOR<ClauseUpdateWithoutTemplatesInput, ClauseUncheckedUpdateWithoutTemplatesInput>
    create: XOR<ClauseCreateWithoutTemplatesInput, ClauseUncheckedCreateWithoutTemplatesInput>
    where?: ClauseWhereInput
  }

  export type ClauseUpdateToOneWithWhereWithoutTemplatesInput = {
    where?: ClauseWhereInput
    data: XOR<ClauseUpdateWithoutTemplatesInput, ClauseUncheckedUpdateWithoutTemplatesInput>
  }

  export type ClauseUpdateWithoutTemplatesInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    legalArea?: NullableStringFieldUpdateOperationsInput | string | null
    category?: NullableStringFieldUpdateOperationsInput | string | null
    isDefault?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ClauseUncheckedUpdateWithoutTemplatesInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    legalArea?: NullableStringFieldUpdateOperationsInput | string | null
    category?: NullableStringFieldUpdateOperationsInput | string | null
    isDefault?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DocumentTemplateCreateWithoutNormativityInput = {
    id?: string
    name: string
    description: string
    category: string
    subcategory?: string | null
    legalArea: string
    audience?: string
    status?: string
    price?: number
    estimatedQuestions?: number
    estimatedMinutes?: number
    rating?: number
    ratingCount?: number
    thumbnail?: string | null
    baseContent: string
    headerContent?: string | null
    footerContent?: string | null
    wizardConfig: string
    blurPreview?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    clauses?: TemplateClauseCreateNestedManyWithoutTemplateInput
    documents?: UserDocumentCreateNestedManyWithoutTemplateInput
  }

  export type DocumentTemplateUncheckedCreateWithoutNormativityInput = {
    id?: string
    name: string
    description: string
    category: string
    subcategory?: string | null
    legalArea: string
    audience?: string
    status?: string
    price?: number
    estimatedQuestions?: number
    estimatedMinutes?: number
    rating?: number
    ratingCount?: number
    thumbnail?: string | null
    baseContent: string
    headerContent?: string | null
    footerContent?: string | null
    wizardConfig: string
    blurPreview?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    clauses?: TemplateClauseUncheckedCreateNestedManyWithoutTemplateInput
    documents?: UserDocumentUncheckedCreateNestedManyWithoutTemplateInput
  }

  export type DocumentTemplateCreateOrConnectWithoutNormativityInput = {
    where: DocumentTemplateWhereUniqueInput
    create: XOR<DocumentTemplateCreateWithoutNormativityInput, DocumentTemplateUncheckedCreateWithoutNormativityInput>
  }

  export type DocumentTemplateUpsertWithoutNormativityInput = {
    update: XOR<DocumentTemplateUpdateWithoutNormativityInput, DocumentTemplateUncheckedUpdateWithoutNormativityInput>
    create: XOR<DocumentTemplateCreateWithoutNormativityInput, DocumentTemplateUncheckedCreateWithoutNormativityInput>
    where?: DocumentTemplateWhereInput
  }

  export type DocumentTemplateUpdateToOneWithWhereWithoutNormativityInput = {
    where?: DocumentTemplateWhereInput
    data: XOR<DocumentTemplateUpdateWithoutNormativityInput, DocumentTemplateUncheckedUpdateWithoutNormativityInput>
  }

  export type DocumentTemplateUpdateWithoutNormativityInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    category?: StringFieldUpdateOperationsInput | string
    subcategory?: NullableStringFieldUpdateOperationsInput | string | null
    legalArea?: StringFieldUpdateOperationsInput | string
    audience?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    price?: FloatFieldUpdateOperationsInput | number
    estimatedQuestions?: IntFieldUpdateOperationsInput | number
    estimatedMinutes?: IntFieldUpdateOperationsInput | number
    rating?: FloatFieldUpdateOperationsInput | number
    ratingCount?: IntFieldUpdateOperationsInput | number
    thumbnail?: NullableStringFieldUpdateOperationsInput | string | null
    baseContent?: StringFieldUpdateOperationsInput | string
    headerContent?: NullableStringFieldUpdateOperationsInput | string | null
    footerContent?: NullableStringFieldUpdateOperationsInput | string | null
    wizardConfig?: StringFieldUpdateOperationsInput | string
    blurPreview?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    clauses?: TemplateClauseUpdateManyWithoutTemplateNestedInput
    documents?: UserDocumentUpdateManyWithoutTemplateNestedInput
  }

  export type DocumentTemplateUncheckedUpdateWithoutNormativityInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    category?: StringFieldUpdateOperationsInput | string
    subcategory?: NullableStringFieldUpdateOperationsInput | string | null
    legalArea?: StringFieldUpdateOperationsInput | string
    audience?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    price?: FloatFieldUpdateOperationsInput | number
    estimatedQuestions?: IntFieldUpdateOperationsInput | number
    estimatedMinutes?: IntFieldUpdateOperationsInput | number
    rating?: FloatFieldUpdateOperationsInput | number
    ratingCount?: IntFieldUpdateOperationsInput | number
    thumbnail?: NullableStringFieldUpdateOperationsInput | string | null
    baseContent?: StringFieldUpdateOperationsInput | string
    headerContent?: NullableStringFieldUpdateOperationsInput | string | null
    footerContent?: NullableStringFieldUpdateOperationsInput | string | null
    wizardConfig?: StringFieldUpdateOperationsInput | string
    blurPreview?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    clauses?: TemplateClauseUncheckedUpdateManyWithoutTemplateNestedInput
    documents?: UserDocumentUncheckedUpdateManyWithoutTemplateNestedInput
  }

  export type DocumentTemplateCreateWithoutDocumentsInput = {
    id?: string
    name: string
    description: string
    category: string
    subcategory?: string | null
    legalArea: string
    audience?: string
    status?: string
    price?: number
    estimatedQuestions?: number
    estimatedMinutes?: number
    rating?: number
    ratingCount?: number
    thumbnail?: string | null
    baseContent: string
    headerContent?: string | null
    footerContent?: string | null
    wizardConfig: string
    blurPreview?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    clauses?: TemplateClauseCreateNestedManyWithoutTemplateInput
    normativity?: TemplateNormativityCreateNestedManyWithoutTemplateInput
  }

  export type DocumentTemplateUncheckedCreateWithoutDocumentsInput = {
    id?: string
    name: string
    description: string
    category: string
    subcategory?: string | null
    legalArea: string
    audience?: string
    status?: string
    price?: number
    estimatedQuestions?: number
    estimatedMinutes?: number
    rating?: number
    ratingCount?: number
    thumbnail?: string | null
    baseContent: string
    headerContent?: string | null
    footerContent?: string | null
    wizardConfig: string
    blurPreview?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    clauses?: TemplateClauseUncheckedCreateNestedManyWithoutTemplateInput
    normativity?: TemplateNormativityUncheckedCreateNestedManyWithoutTemplateInput
  }

  export type DocumentTemplateCreateOrConnectWithoutDocumentsInput = {
    where: DocumentTemplateWhereUniqueInput
    create: XOR<DocumentTemplateCreateWithoutDocumentsInput, DocumentTemplateUncheckedCreateWithoutDocumentsInput>
  }

  export type UserCreateWithoutDocumentsInput = {
    id?: string
    username: string
    passwordHash: string
    name: string
    email?: string | null
    phone?: string | null
    role?: string
    status?: string
    credits?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    contacts?: ContactCreateNestedManyWithoutUserInput
    creditTransactions?: CreditTransactionCreateNestedManyWithoutUserInput
    creditGrants?: CreditTransactionCreateNestedManyWithoutAdminInput
  }

  export type UserUncheckedCreateWithoutDocumentsInput = {
    id?: string
    username: string
    passwordHash: string
    name: string
    email?: string | null
    phone?: string | null
    role?: string
    status?: string
    credits?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    contacts?: ContactUncheckedCreateNestedManyWithoutUserInput
    creditTransactions?: CreditTransactionUncheckedCreateNestedManyWithoutUserInput
    creditGrants?: CreditTransactionUncheckedCreateNestedManyWithoutAdminInput
  }

  export type UserCreateOrConnectWithoutDocumentsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutDocumentsInput, UserUncheckedCreateWithoutDocumentsInput>
  }

  export type DocumentTemplateUpsertWithoutDocumentsInput = {
    update: XOR<DocumentTemplateUpdateWithoutDocumentsInput, DocumentTemplateUncheckedUpdateWithoutDocumentsInput>
    create: XOR<DocumentTemplateCreateWithoutDocumentsInput, DocumentTemplateUncheckedCreateWithoutDocumentsInput>
    where?: DocumentTemplateWhereInput
  }

  export type DocumentTemplateUpdateToOneWithWhereWithoutDocumentsInput = {
    where?: DocumentTemplateWhereInput
    data: XOR<DocumentTemplateUpdateWithoutDocumentsInput, DocumentTemplateUncheckedUpdateWithoutDocumentsInput>
  }

  export type DocumentTemplateUpdateWithoutDocumentsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    category?: StringFieldUpdateOperationsInput | string
    subcategory?: NullableStringFieldUpdateOperationsInput | string | null
    legalArea?: StringFieldUpdateOperationsInput | string
    audience?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    price?: FloatFieldUpdateOperationsInput | number
    estimatedQuestions?: IntFieldUpdateOperationsInput | number
    estimatedMinutes?: IntFieldUpdateOperationsInput | number
    rating?: FloatFieldUpdateOperationsInput | number
    ratingCount?: IntFieldUpdateOperationsInput | number
    thumbnail?: NullableStringFieldUpdateOperationsInput | string | null
    baseContent?: StringFieldUpdateOperationsInput | string
    headerContent?: NullableStringFieldUpdateOperationsInput | string | null
    footerContent?: NullableStringFieldUpdateOperationsInput | string | null
    wizardConfig?: StringFieldUpdateOperationsInput | string
    blurPreview?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    clauses?: TemplateClauseUpdateManyWithoutTemplateNestedInput
    normativity?: TemplateNormativityUpdateManyWithoutTemplateNestedInput
  }

  export type DocumentTemplateUncheckedUpdateWithoutDocumentsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    category?: StringFieldUpdateOperationsInput | string
    subcategory?: NullableStringFieldUpdateOperationsInput | string | null
    legalArea?: StringFieldUpdateOperationsInput | string
    audience?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    price?: FloatFieldUpdateOperationsInput | number
    estimatedQuestions?: IntFieldUpdateOperationsInput | number
    estimatedMinutes?: IntFieldUpdateOperationsInput | number
    rating?: FloatFieldUpdateOperationsInput | number
    ratingCount?: IntFieldUpdateOperationsInput | number
    thumbnail?: NullableStringFieldUpdateOperationsInput | string | null
    baseContent?: StringFieldUpdateOperationsInput | string
    headerContent?: NullableStringFieldUpdateOperationsInput | string | null
    footerContent?: NullableStringFieldUpdateOperationsInput | string | null
    wizardConfig?: StringFieldUpdateOperationsInput | string
    blurPreview?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    clauses?: TemplateClauseUncheckedUpdateManyWithoutTemplateNestedInput
    normativity?: TemplateNormativityUncheckedUpdateManyWithoutTemplateNestedInput
  }

  export type UserUpsertWithoutDocumentsInput = {
    update: XOR<UserUpdateWithoutDocumentsInput, UserUncheckedUpdateWithoutDocumentsInput>
    create: XOR<UserCreateWithoutDocumentsInput, UserUncheckedCreateWithoutDocumentsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutDocumentsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutDocumentsInput, UserUncheckedUpdateWithoutDocumentsInput>
  }

  export type UserUpdateWithoutDocumentsInput = {
    id?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    role?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    credits?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    contacts?: ContactUpdateManyWithoutUserNestedInput
    creditTransactions?: CreditTransactionUpdateManyWithoutUserNestedInput
    creditGrants?: CreditTransactionUpdateManyWithoutAdminNestedInput
  }

  export type UserUncheckedUpdateWithoutDocumentsInput = {
    id?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    role?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    credits?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    contacts?: ContactUncheckedUpdateManyWithoutUserNestedInput
    creditTransactions?: CreditTransactionUncheckedUpdateManyWithoutUserNestedInput
    creditGrants?: CreditTransactionUncheckedUpdateManyWithoutAdminNestedInput
  }

  export type UserCreateWithoutContactsInput = {
    id?: string
    username: string
    passwordHash: string
    name: string
    email?: string | null
    phone?: string | null
    role?: string
    status?: string
    credits?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    documents?: UserDocumentCreateNestedManyWithoutUserInput
    creditTransactions?: CreditTransactionCreateNestedManyWithoutUserInput
    creditGrants?: CreditTransactionCreateNestedManyWithoutAdminInput
  }

  export type UserUncheckedCreateWithoutContactsInput = {
    id?: string
    username: string
    passwordHash: string
    name: string
    email?: string | null
    phone?: string | null
    role?: string
    status?: string
    credits?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    documents?: UserDocumentUncheckedCreateNestedManyWithoutUserInput
    creditTransactions?: CreditTransactionUncheckedCreateNestedManyWithoutUserInput
    creditGrants?: CreditTransactionUncheckedCreateNestedManyWithoutAdminInput
  }

  export type UserCreateOrConnectWithoutContactsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutContactsInput, UserUncheckedCreateWithoutContactsInput>
  }

  export type UserUpsertWithoutContactsInput = {
    update: XOR<UserUpdateWithoutContactsInput, UserUncheckedUpdateWithoutContactsInput>
    create: XOR<UserCreateWithoutContactsInput, UserUncheckedCreateWithoutContactsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutContactsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutContactsInput, UserUncheckedUpdateWithoutContactsInput>
  }

  export type UserUpdateWithoutContactsInput = {
    id?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    role?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    credits?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    documents?: UserDocumentUpdateManyWithoutUserNestedInput
    creditTransactions?: CreditTransactionUpdateManyWithoutUserNestedInput
    creditGrants?: CreditTransactionUpdateManyWithoutAdminNestedInput
  }

  export type UserUncheckedUpdateWithoutContactsInput = {
    id?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    role?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    credits?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    documents?: UserDocumentUncheckedUpdateManyWithoutUserNestedInput
    creditTransactions?: CreditTransactionUncheckedUpdateManyWithoutUserNestedInput
    creditGrants?: CreditTransactionUncheckedUpdateManyWithoutAdminNestedInput
  }

  export type UserCreateWithoutCreditTransactionsInput = {
    id?: string
    username: string
    passwordHash: string
    name: string
    email?: string | null
    phone?: string | null
    role?: string
    status?: string
    credits?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    documents?: UserDocumentCreateNestedManyWithoutUserInput
    contacts?: ContactCreateNestedManyWithoutUserInput
    creditGrants?: CreditTransactionCreateNestedManyWithoutAdminInput
  }

  export type UserUncheckedCreateWithoutCreditTransactionsInput = {
    id?: string
    username: string
    passwordHash: string
    name: string
    email?: string | null
    phone?: string | null
    role?: string
    status?: string
    credits?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    documents?: UserDocumentUncheckedCreateNestedManyWithoutUserInput
    contacts?: ContactUncheckedCreateNestedManyWithoutUserInput
    creditGrants?: CreditTransactionUncheckedCreateNestedManyWithoutAdminInput
  }

  export type UserCreateOrConnectWithoutCreditTransactionsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutCreditTransactionsInput, UserUncheckedCreateWithoutCreditTransactionsInput>
  }

  export type UserCreateWithoutCreditGrantsInput = {
    id?: string
    username: string
    passwordHash: string
    name: string
    email?: string | null
    phone?: string | null
    role?: string
    status?: string
    credits?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    documents?: UserDocumentCreateNestedManyWithoutUserInput
    contacts?: ContactCreateNestedManyWithoutUserInput
    creditTransactions?: CreditTransactionCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutCreditGrantsInput = {
    id?: string
    username: string
    passwordHash: string
    name: string
    email?: string | null
    phone?: string | null
    role?: string
    status?: string
    credits?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    documents?: UserDocumentUncheckedCreateNestedManyWithoutUserInput
    contacts?: ContactUncheckedCreateNestedManyWithoutUserInput
    creditTransactions?: CreditTransactionUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutCreditGrantsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutCreditGrantsInput, UserUncheckedCreateWithoutCreditGrantsInput>
  }

  export type UserUpsertWithoutCreditTransactionsInput = {
    update: XOR<UserUpdateWithoutCreditTransactionsInput, UserUncheckedUpdateWithoutCreditTransactionsInput>
    create: XOR<UserCreateWithoutCreditTransactionsInput, UserUncheckedCreateWithoutCreditTransactionsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutCreditTransactionsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutCreditTransactionsInput, UserUncheckedUpdateWithoutCreditTransactionsInput>
  }

  export type UserUpdateWithoutCreditTransactionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    role?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    credits?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    documents?: UserDocumentUpdateManyWithoutUserNestedInput
    contacts?: ContactUpdateManyWithoutUserNestedInput
    creditGrants?: CreditTransactionUpdateManyWithoutAdminNestedInput
  }

  export type UserUncheckedUpdateWithoutCreditTransactionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    role?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    credits?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    documents?: UserDocumentUncheckedUpdateManyWithoutUserNestedInput
    contacts?: ContactUncheckedUpdateManyWithoutUserNestedInput
    creditGrants?: CreditTransactionUncheckedUpdateManyWithoutAdminNestedInput
  }

  export type UserUpsertWithoutCreditGrantsInput = {
    update: XOR<UserUpdateWithoutCreditGrantsInput, UserUncheckedUpdateWithoutCreditGrantsInput>
    create: XOR<UserCreateWithoutCreditGrantsInput, UserUncheckedCreateWithoutCreditGrantsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutCreditGrantsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutCreditGrantsInput, UserUncheckedUpdateWithoutCreditGrantsInput>
  }

  export type UserUpdateWithoutCreditGrantsInput = {
    id?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    role?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    credits?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    documents?: UserDocumentUpdateManyWithoutUserNestedInput
    contacts?: ContactUpdateManyWithoutUserNestedInput
    creditTransactions?: CreditTransactionUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutCreditGrantsInput = {
    id?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    role?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    credits?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    documents?: UserDocumentUncheckedUpdateManyWithoutUserNestedInput
    contacts?: ContactUncheckedUpdateManyWithoutUserNestedInput
    creditTransactions?: CreditTransactionUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserDocumentCreateManyUserInput = {
    id?: string
    templateId: string
    title: string
    status?: string
    answers: string
    generatedContent?: string | null
    visitorPhone?: string | null
    visitorName?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ContactCreateManyUserInput = {
    id?: string
    name: string
    contactType: string
    documentType?: string | null
    documentNumber?: string | null
    address?: string | null
    city?: string | null
    phone?: string | null
    email?: string | null
    companyName?: string | null
    notes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type CreditTransactionCreateManyUserInput = {
    id?: string
    amount: number
    type: string
    description?: string | null
    adminId?: string | null
    createdAt?: Date | string
  }

  export type CreditTransactionCreateManyAdminInput = {
    id?: string
    userId: string
    amount: number
    type: string
    description?: string | null
    createdAt?: Date | string
  }

  export type UserDocumentUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    answers?: StringFieldUpdateOperationsInput | string
    generatedContent?: NullableStringFieldUpdateOperationsInput | string | null
    visitorPhone?: NullableStringFieldUpdateOperationsInput | string | null
    visitorName?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    template?: DocumentTemplateUpdateOneRequiredWithoutDocumentsNestedInput
  }

  export type UserDocumentUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    templateId?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    answers?: StringFieldUpdateOperationsInput | string
    generatedContent?: NullableStringFieldUpdateOperationsInput | string | null
    visitorPhone?: NullableStringFieldUpdateOperationsInput | string | null
    visitorName?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserDocumentUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    templateId?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    answers?: StringFieldUpdateOperationsInput | string
    generatedContent?: NullableStringFieldUpdateOperationsInput | string | null
    visitorPhone?: NullableStringFieldUpdateOperationsInput | string | null
    visitorName?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ContactUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    contactType?: StringFieldUpdateOperationsInput | string
    documentType?: NullableStringFieldUpdateOperationsInput | string | null
    documentNumber?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    city?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    companyName?: NullableStringFieldUpdateOperationsInput | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ContactUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    contactType?: StringFieldUpdateOperationsInput | string
    documentType?: NullableStringFieldUpdateOperationsInput | string | null
    documentNumber?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    city?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    companyName?: NullableStringFieldUpdateOperationsInput | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ContactUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    contactType?: StringFieldUpdateOperationsInput | string
    documentType?: NullableStringFieldUpdateOperationsInput | string | null
    documentNumber?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    city?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    companyName?: NullableStringFieldUpdateOperationsInput | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CreditTransactionUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    amount?: IntFieldUpdateOperationsInput | number
    type?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    admin?: UserUpdateOneWithoutCreditGrantsNestedInput
  }

  export type CreditTransactionUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    amount?: IntFieldUpdateOperationsInput | number
    type?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    adminId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CreditTransactionUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    amount?: IntFieldUpdateOperationsInput | number
    type?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    adminId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CreditTransactionUpdateWithoutAdminInput = {
    id?: StringFieldUpdateOperationsInput | string
    amount?: IntFieldUpdateOperationsInput | number
    type?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutCreditTransactionsNestedInput
  }

  export type CreditTransactionUncheckedUpdateWithoutAdminInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    amount?: IntFieldUpdateOperationsInput | number
    type?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CreditTransactionUncheckedUpdateManyWithoutAdminInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    amount?: IntFieldUpdateOperationsInput | number
    type?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TemplateClauseCreateManyTemplateInput = {
    id?: string
    clauseId: string
    sectionName?: string | null
    order?: number
  }

  export type TemplateNormativityCreateManyTemplateInput = {
    id?: string
    lawName: string
    lawReference: string
    articleNumber?: string | null
    description?: string | null
  }

  export type UserDocumentCreateManyTemplateInput = {
    id?: string
    userId?: string | null
    title: string
    status?: string
    answers: string
    generatedContent?: string | null
    visitorPhone?: string | null
    visitorName?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type TemplateClauseUpdateWithoutTemplateInput = {
    id?: StringFieldUpdateOperationsInput | string
    sectionName?: NullableStringFieldUpdateOperationsInput | string | null
    order?: IntFieldUpdateOperationsInput | number
    clause?: ClauseUpdateOneRequiredWithoutTemplatesNestedInput
  }

  export type TemplateClauseUncheckedUpdateWithoutTemplateInput = {
    id?: StringFieldUpdateOperationsInput | string
    clauseId?: StringFieldUpdateOperationsInput | string
    sectionName?: NullableStringFieldUpdateOperationsInput | string | null
    order?: IntFieldUpdateOperationsInput | number
  }

  export type TemplateClauseUncheckedUpdateManyWithoutTemplateInput = {
    id?: StringFieldUpdateOperationsInput | string
    clauseId?: StringFieldUpdateOperationsInput | string
    sectionName?: NullableStringFieldUpdateOperationsInput | string | null
    order?: IntFieldUpdateOperationsInput | number
  }

  export type TemplateNormativityUpdateWithoutTemplateInput = {
    id?: StringFieldUpdateOperationsInput | string
    lawName?: StringFieldUpdateOperationsInput | string
    lawReference?: StringFieldUpdateOperationsInput | string
    articleNumber?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type TemplateNormativityUncheckedUpdateWithoutTemplateInput = {
    id?: StringFieldUpdateOperationsInput | string
    lawName?: StringFieldUpdateOperationsInput | string
    lawReference?: StringFieldUpdateOperationsInput | string
    articleNumber?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type TemplateNormativityUncheckedUpdateManyWithoutTemplateInput = {
    id?: StringFieldUpdateOperationsInput | string
    lawName?: StringFieldUpdateOperationsInput | string
    lawReference?: StringFieldUpdateOperationsInput | string
    articleNumber?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type UserDocumentUpdateWithoutTemplateInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    answers?: StringFieldUpdateOperationsInput | string
    generatedContent?: NullableStringFieldUpdateOperationsInput | string | null
    visitorPhone?: NullableStringFieldUpdateOperationsInput | string | null
    visitorName?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneWithoutDocumentsNestedInput
  }

  export type UserDocumentUncheckedUpdateWithoutTemplateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: NullableStringFieldUpdateOperationsInput | string | null
    title?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    answers?: StringFieldUpdateOperationsInput | string
    generatedContent?: NullableStringFieldUpdateOperationsInput | string | null
    visitorPhone?: NullableStringFieldUpdateOperationsInput | string | null
    visitorName?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserDocumentUncheckedUpdateManyWithoutTemplateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: NullableStringFieldUpdateOperationsInput | string | null
    title?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    answers?: StringFieldUpdateOperationsInput | string
    generatedContent?: NullableStringFieldUpdateOperationsInput | string | null
    visitorPhone?: NullableStringFieldUpdateOperationsInput | string | null
    visitorName?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TemplateClauseCreateManyClauseInput = {
    id?: string
    templateId: string
    sectionName?: string | null
    order?: number
  }

  export type TemplateClauseUpdateWithoutClauseInput = {
    id?: StringFieldUpdateOperationsInput | string
    sectionName?: NullableStringFieldUpdateOperationsInput | string | null
    order?: IntFieldUpdateOperationsInput | number
    template?: DocumentTemplateUpdateOneRequiredWithoutClausesNestedInput
  }

  export type TemplateClauseUncheckedUpdateWithoutClauseInput = {
    id?: StringFieldUpdateOperationsInput | string
    templateId?: StringFieldUpdateOperationsInput | string
    sectionName?: NullableStringFieldUpdateOperationsInput | string | null
    order?: IntFieldUpdateOperationsInput | number
  }

  export type TemplateClauseUncheckedUpdateManyWithoutClauseInput = {
    id?: StringFieldUpdateOperationsInput | string
    templateId?: StringFieldUpdateOperationsInput | string
    sectionName?: NullableStringFieldUpdateOperationsInput | string | null
    order?: IntFieldUpdateOperationsInput | number
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}