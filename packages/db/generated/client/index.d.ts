
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
 * Model Post
 * 
 */
export type Post = $Result.DefaultSelection<Prisma.$PostPayload>
/**
 * Model StripePayment
 * 
 */
export type StripePayment = $Result.DefaultSelection<Prisma.$StripePaymentPayload>
/**
 * Model User
 * 
 */
export type User = $Result.DefaultSelection<Prisma.$UserPayload>
/**
 * Model FounderLogTag
 * 
 */
export type FounderLogTag = $Result.DefaultSelection<Prisma.$FounderLogTagPayload>
/**
 * Model FounderLogEntry
 * 
 */
export type FounderLogEntry = $Result.DefaultSelection<Prisma.$FounderLogEntryPayload>
/**
 * Model FounderLogEntryTag
 * 
 */
export type FounderLogEntryTag = $Result.DefaultSelection<Prisma.$FounderLogEntryTagPayload>
/**
 * Model FounderLogReflection
 * 
 */
export type FounderLogReflection = $Result.DefaultSelection<Prisma.$FounderLogReflectionPayload>

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Posts
 * const posts = await prisma.post.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
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
   * // Fetch zero or more Posts
   * const posts = await prisma.post.findMany()
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
   * Add a middleware
   * @deprecated since 4.16.0. For new code, prefer client extensions instead.
   * @see https://pris.ly/d/extensions
   */
  $use(cb: Prisma.Middleware): void

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
   * `prisma.post`: Exposes CRUD operations for the **Post** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Posts
    * const posts = await prisma.post.findMany()
    * ```
    */
  get post(): Prisma.PostDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.stripePayment`: Exposes CRUD operations for the **StripePayment** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more StripePayments
    * const stripePayments = await prisma.stripePayment.findMany()
    * ```
    */
  get stripePayment(): Prisma.StripePaymentDelegate<ExtArgs, ClientOptions>;

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
   * `prisma.founderLogTag`: Exposes CRUD operations for the **FounderLogTag** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more FounderLogTags
    * const founderLogTags = await prisma.founderLogTag.findMany()
    * ```
    */
  get founderLogTag(): Prisma.FounderLogTagDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.founderLogEntry`: Exposes CRUD operations for the **FounderLogEntry** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more FounderLogEntries
    * const founderLogEntries = await prisma.founderLogEntry.findMany()
    * ```
    */
  get founderLogEntry(): Prisma.FounderLogEntryDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.founderLogEntryTag`: Exposes CRUD operations for the **FounderLogEntryTag** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more FounderLogEntryTags
    * const founderLogEntryTags = await prisma.founderLogEntryTag.findMany()
    * ```
    */
  get founderLogEntryTag(): Prisma.FounderLogEntryTagDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.founderLogReflection`: Exposes CRUD operations for the **FounderLogReflection** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more FounderLogReflections
    * const founderLogReflections = await prisma.founderLogReflection.findMany()
    * ```
    */
  get founderLogReflection(): Prisma.FounderLogReflectionDelegate<ExtArgs, ClientOptions>;
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
   * Prisma Client JS version: 6.5.0
   * Query Engine version: 173f8d54f8d52e692c7e27e72a88314ec7aeff60
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


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
    Post: 'Post',
    StripePayment: 'StripePayment',
    User: 'User',
    FounderLogTag: 'FounderLogTag',
    FounderLogEntry: 'FounderLogEntry',
    FounderLogEntryTag: 'FounderLogEntryTag',
    FounderLogReflection: 'FounderLogReflection'
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
      modelProps: "post" | "stripePayment" | "user" | "founderLogTag" | "founderLogEntry" | "founderLogEntryTag" | "founderLogReflection"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      Post: {
        payload: Prisma.$PostPayload<ExtArgs>
        fields: Prisma.PostFieldRefs
        operations: {
          findUnique: {
            args: Prisma.PostFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PostPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.PostFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PostPayload>
          }
          findFirst: {
            args: Prisma.PostFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PostPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.PostFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PostPayload>
          }
          findMany: {
            args: Prisma.PostFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PostPayload>[]
          }
          create: {
            args: Prisma.PostCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PostPayload>
          }
          createMany: {
            args: Prisma.PostCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.PostCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PostPayload>[]
          }
          delete: {
            args: Prisma.PostDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PostPayload>
          }
          update: {
            args: Prisma.PostUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PostPayload>
          }
          deleteMany: {
            args: Prisma.PostDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.PostUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.PostUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PostPayload>[]
          }
          upsert: {
            args: Prisma.PostUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PostPayload>
          }
          aggregate: {
            args: Prisma.PostAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregatePost>
          }
          groupBy: {
            args: Prisma.PostGroupByArgs<ExtArgs>
            result: $Utils.Optional<PostGroupByOutputType>[]
          }
          count: {
            args: Prisma.PostCountArgs<ExtArgs>
            result: $Utils.Optional<PostCountAggregateOutputType> | number
          }
        }
      }
      StripePayment: {
        payload: Prisma.$StripePaymentPayload<ExtArgs>
        fields: Prisma.StripePaymentFieldRefs
        operations: {
          findUnique: {
            args: Prisma.StripePaymentFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StripePaymentPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.StripePaymentFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StripePaymentPayload>
          }
          findFirst: {
            args: Prisma.StripePaymentFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StripePaymentPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.StripePaymentFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StripePaymentPayload>
          }
          findMany: {
            args: Prisma.StripePaymentFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StripePaymentPayload>[]
          }
          create: {
            args: Prisma.StripePaymentCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StripePaymentPayload>
          }
          createMany: {
            args: Prisma.StripePaymentCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.StripePaymentCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StripePaymentPayload>[]
          }
          delete: {
            args: Prisma.StripePaymentDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StripePaymentPayload>
          }
          update: {
            args: Prisma.StripePaymentUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StripePaymentPayload>
          }
          deleteMany: {
            args: Prisma.StripePaymentDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.StripePaymentUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.StripePaymentUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StripePaymentPayload>[]
          }
          upsert: {
            args: Prisma.StripePaymentUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StripePaymentPayload>
          }
          aggregate: {
            args: Prisma.StripePaymentAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateStripePayment>
          }
          groupBy: {
            args: Prisma.StripePaymentGroupByArgs<ExtArgs>
            result: $Utils.Optional<StripePaymentGroupByOutputType>[]
          }
          count: {
            args: Prisma.StripePaymentCountArgs<ExtArgs>
            result: $Utils.Optional<StripePaymentCountAggregateOutputType> | number
          }
        }
      }
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
      FounderLogTag: {
        payload: Prisma.$FounderLogTagPayload<ExtArgs>
        fields: Prisma.FounderLogTagFieldRefs
        operations: {
          findUnique: {
            args: Prisma.FounderLogTagFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FounderLogTagPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.FounderLogTagFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FounderLogTagPayload>
          }
          findFirst: {
            args: Prisma.FounderLogTagFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FounderLogTagPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.FounderLogTagFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FounderLogTagPayload>
          }
          findMany: {
            args: Prisma.FounderLogTagFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FounderLogTagPayload>[]
          }
          create: {
            args: Prisma.FounderLogTagCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FounderLogTagPayload>
          }
          createMany: {
            args: Prisma.FounderLogTagCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.FounderLogTagCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FounderLogTagPayload>[]
          }
          delete: {
            args: Prisma.FounderLogTagDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FounderLogTagPayload>
          }
          update: {
            args: Prisma.FounderLogTagUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FounderLogTagPayload>
          }
          deleteMany: {
            args: Prisma.FounderLogTagDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.FounderLogTagUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.FounderLogTagUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FounderLogTagPayload>[]
          }
          upsert: {
            args: Prisma.FounderLogTagUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FounderLogTagPayload>
          }
          aggregate: {
            args: Prisma.FounderLogTagAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateFounderLogTag>
          }
          groupBy: {
            args: Prisma.FounderLogTagGroupByArgs<ExtArgs>
            result: $Utils.Optional<FounderLogTagGroupByOutputType>[]
          }
          count: {
            args: Prisma.FounderLogTagCountArgs<ExtArgs>
            result: $Utils.Optional<FounderLogTagCountAggregateOutputType> | number
          }
        }
      }
      FounderLogEntry: {
        payload: Prisma.$FounderLogEntryPayload<ExtArgs>
        fields: Prisma.FounderLogEntryFieldRefs
        operations: {
          findUnique: {
            args: Prisma.FounderLogEntryFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FounderLogEntryPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.FounderLogEntryFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FounderLogEntryPayload>
          }
          findFirst: {
            args: Prisma.FounderLogEntryFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FounderLogEntryPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.FounderLogEntryFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FounderLogEntryPayload>
          }
          findMany: {
            args: Prisma.FounderLogEntryFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FounderLogEntryPayload>[]
          }
          create: {
            args: Prisma.FounderLogEntryCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FounderLogEntryPayload>
          }
          createMany: {
            args: Prisma.FounderLogEntryCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.FounderLogEntryCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FounderLogEntryPayload>[]
          }
          delete: {
            args: Prisma.FounderLogEntryDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FounderLogEntryPayload>
          }
          update: {
            args: Prisma.FounderLogEntryUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FounderLogEntryPayload>
          }
          deleteMany: {
            args: Prisma.FounderLogEntryDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.FounderLogEntryUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.FounderLogEntryUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FounderLogEntryPayload>[]
          }
          upsert: {
            args: Prisma.FounderLogEntryUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FounderLogEntryPayload>
          }
          aggregate: {
            args: Prisma.FounderLogEntryAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateFounderLogEntry>
          }
          groupBy: {
            args: Prisma.FounderLogEntryGroupByArgs<ExtArgs>
            result: $Utils.Optional<FounderLogEntryGroupByOutputType>[]
          }
          count: {
            args: Prisma.FounderLogEntryCountArgs<ExtArgs>
            result: $Utils.Optional<FounderLogEntryCountAggregateOutputType> | number
          }
        }
      }
      FounderLogEntryTag: {
        payload: Prisma.$FounderLogEntryTagPayload<ExtArgs>
        fields: Prisma.FounderLogEntryTagFieldRefs
        operations: {
          findUnique: {
            args: Prisma.FounderLogEntryTagFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FounderLogEntryTagPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.FounderLogEntryTagFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FounderLogEntryTagPayload>
          }
          findFirst: {
            args: Prisma.FounderLogEntryTagFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FounderLogEntryTagPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.FounderLogEntryTagFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FounderLogEntryTagPayload>
          }
          findMany: {
            args: Prisma.FounderLogEntryTagFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FounderLogEntryTagPayload>[]
          }
          create: {
            args: Prisma.FounderLogEntryTagCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FounderLogEntryTagPayload>
          }
          createMany: {
            args: Prisma.FounderLogEntryTagCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.FounderLogEntryTagCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FounderLogEntryTagPayload>[]
          }
          delete: {
            args: Prisma.FounderLogEntryTagDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FounderLogEntryTagPayload>
          }
          update: {
            args: Prisma.FounderLogEntryTagUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FounderLogEntryTagPayload>
          }
          deleteMany: {
            args: Prisma.FounderLogEntryTagDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.FounderLogEntryTagUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.FounderLogEntryTagUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FounderLogEntryTagPayload>[]
          }
          upsert: {
            args: Prisma.FounderLogEntryTagUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FounderLogEntryTagPayload>
          }
          aggregate: {
            args: Prisma.FounderLogEntryTagAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateFounderLogEntryTag>
          }
          groupBy: {
            args: Prisma.FounderLogEntryTagGroupByArgs<ExtArgs>
            result: $Utils.Optional<FounderLogEntryTagGroupByOutputType>[]
          }
          count: {
            args: Prisma.FounderLogEntryTagCountArgs<ExtArgs>
            result: $Utils.Optional<FounderLogEntryTagCountAggregateOutputType> | number
          }
        }
      }
      FounderLogReflection: {
        payload: Prisma.$FounderLogReflectionPayload<ExtArgs>
        fields: Prisma.FounderLogReflectionFieldRefs
        operations: {
          findUnique: {
            args: Prisma.FounderLogReflectionFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FounderLogReflectionPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.FounderLogReflectionFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FounderLogReflectionPayload>
          }
          findFirst: {
            args: Prisma.FounderLogReflectionFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FounderLogReflectionPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.FounderLogReflectionFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FounderLogReflectionPayload>
          }
          findMany: {
            args: Prisma.FounderLogReflectionFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FounderLogReflectionPayload>[]
          }
          create: {
            args: Prisma.FounderLogReflectionCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FounderLogReflectionPayload>
          }
          createMany: {
            args: Prisma.FounderLogReflectionCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.FounderLogReflectionCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FounderLogReflectionPayload>[]
          }
          delete: {
            args: Prisma.FounderLogReflectionDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FounderLogReflectionPayload>
          }
          update: {
            args: Prisma.FounderLogReflectionUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FounderLogReflectionPayload>
          }
          deleteMany: {
            args: Prisma.FounderLogReflectionDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.FounderLogReflectionUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.FounderLogReflectionUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FounderLogReflectionPayload>[]
          }
          upsert: {
            args: Prisma.FounderLogReflectionUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FounderLogReflectionPayload>
          }
          aggregate: {
            args: Prisma.FounderLogReflectionAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateFounderLogReflection>
          }
          groupBy: {
            args: Prisma.FounderLogReflectionGroupByArgs<ExtArgs>
            result: $Utils.Optional<FounderLogReflectionGroupByOutputType>[]
          }
          count: {
            args: Prisma.FounderLogReflectionCountArgs<ExtArgs>
            result: $Utils.Optional<FounderLogReflectionCountAggregateOutputType> | number
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
     * // Defaults to stdout
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events
     * log: [
     *   { emit: 'stdout', level: 'query' },
     *   { emit: 'stdout', level: 'info' },
     *   { emit: 'stdout', level: 'warn' }
     *   { emit: 'stdout', level: 'error' }
     * ]
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
    post?: PostOmit
    stripePayment?: StripePaymentOmit
    user?: UserOmit
    founderLogTag?: FounderLogTagOmit
    founderLogEntry?: FounderLogEntryOmit
    founderLogEntryTag?: FounderLogEntryTagOmit
    founderLogReflection?: FounderLogReflectionOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type GetLogType<T extends LogLevel | LogDefinition> = T extends LogDefinition ? T['emit'] extends 'event' ? T['level'] : never : never
  export type GetEvents<T extends any> = T extends Array<LogLevel | LogDefinition> ?
    GetLogType<T[0]> | GetLogType<T[1]> | GetLogType<T[2]> | GetLogType<T[3]>
    : never

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

  /**
   * These options are being passed into the middleware as "params"
   */
  export type MiddlewareParams = {
    model?: ModelName
    action: PrismaAction
    args: any
    dataPath: string[]
    runInTransaction: boolean
  }

  /**
   * The `T` type makes sure, that the `return proceed` is not forgotten in the middleware implementation
   */
  export type Middleware<T = any> = (
    params: MiddlewareParams,
    next: (params: MiddlewareParams) => $Utils.JsPromise<T>,
  ) => $Utils.JsPromise<T>

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
    entries: number
    reflections: number
  }

  export type UserCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    entries?: boolean | UserCountOutputTypeCountEntriesArgs
    reflections?: boolean | UserCountOutputTypeCountReflectionsArgs
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
  export type UserCountOutputTypeCountEntriesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: FounderLogEntryWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountReflectionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: FounderLogReflectionWhereInput
  }


  /**
   * Count Type FounderLogTagCountOutputType
   */

  export type FounderLogTagCountOutputType = {
    entries: number
  }

  export type FounderLogTagCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    entries?: boolean | FounderLogTagCountOutputTypeCountEntriesArgs
  }

  // Custom InputTypes
  /**
   * FounderLogTagCountOutputType without action
   */
  export type FounderLogTagCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FounderLogTagCountOutputType
     */
    select?: FounderLogTagCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * FounderLogTagCountOutputType without action
   */
  export type FounderLogTagCountOutputTypeCountEntriesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: FounderLogEntryTagWhereInput
  }


  /**
   * Count Type FounderLogEntryCountOutputType
   */

  export type FounderLogEntryCountOutputType = {
    tags: number
  }

  export type FounderLogEntryCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    tags?: boolean | FounderLogEntryCountOutputTypeCountTagsArgs
  }

  // Custom InputTypes
  /**
   * FounderLogEntryCountOutputType without action
   */
  export type FounderLogEntryCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FounderLogEntryCountOutputType
     */
    select?: FounderLogEntryCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * FounderLogEntryCountOutputType without action
   */
  export type FounderLogEntryCountOutputTypeCountTagsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: FounderLogEntryTagWhereInput
  }


  /**
   * Models
   */

  /**
   * Model Post
   */

  export type AggregatePost = {
    _count: PostCountAggregateOutputType | null
    _min: PostMinAggregateOutputType | null
    _max: PostMaxAggregateOutputType | null
  }

  export type PostMinAggregateOutputType = {
    id: string | null
    title: string | null
    content: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type PostMaxAggregateOutputType = {
    id: string | null
    title: string | null
    content: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type PostCountAggregateOutputType = {
    id: number
    title: number
    content: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type PostMinAggregateInputType = {
    id?: true
    title?: true
    content?: true
    createdAt?: true
    updatedAt?: true
  }

  export type PostMaxAggregateInputType = {
    id?: true
    title?: true
    content?: true
    createdAt?: true
    updatedAt?: true
  }

  export type PostCountAggregateInputType = {
    id?: true
    title?: true
    content?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type PostAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Post to aggregate.
     */
    where?: PostWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Posts to fetch.
     */
    orderBy?: PostOrderByWithRelationInput | PostOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: PostWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Posts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Posts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Posts
    **/
    _count?: true | PostCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: PostMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: PostMaxAggregateInputType
  }

  export type GetPostAggregateType<T extends PostAggregateArgs> = {
        [P in keyof T & keyof AggregatePost]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregatePost[P]>
      : GetScalarType<T[P], AggregatePost[P]>
  }




  export type PostGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PostWhereInput
    orderBy?: PostOrderByWithAggregationInput | PostOrderByWithAggregationInput[]
    by: PostScalarFieldEnum[] | PostScalarFieldEnum
    having?: PostScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: PostCountAggregateInputType | true
    _min?: PostMinAggregateInputType
    _max?: PostMaxAggregateInputType
  }

  export type PostGroupByOutputType = {
    id: string
    title: string
    content: string
    createdAt: Date
    updatedAt: Date
    _count: PostCountAggregateOutputType | null
    _min: PostMinAggregateOutputType | null
    _max: PostMaxAggregateOutputType | null
  }

  type GetPostGroupByPayload<T extends PostGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<PostGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof PostGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], PostGroupByOutputType[P]>
            : GetScalarType<T[P], PostGroupByOutputType[P]>
        }
      >
    >


  export type PostSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    content?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["post"]>

  export type PostSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    content?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["post"]>

  export type PostSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    content?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["post"]>

  export type PostSelectScalar = {
    id?: boolean
    title?: boolean
    content?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type PostOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "title" | "content" | "createdAt" | "updatedAt", ExtArgs["result"]["post"]>

  export type $PostPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Post"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      title: string
      content: string
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["post"]>
    composites: {}
  }

  type PostGetPayload<S extends boolean | null | undefined | PostDefaultArgs> = $Result.GetResult<Prisma.$PostPayload, S>

  type PostCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<PostFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: PostCountAggregateInputType | true
    }

  export interface PostDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Post'], meta: { name: 'Post' } }
    /**
     * Find zero or one Post that matches the filter.
     * @param {PostFindUniqueArgs} args - Arguments to find a Post
     * @example
     * // Get one Post
     * const post = await prisma.post.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends PostFindUniqueArgs>(args: SelectSubset<T, PostFindUniqueArgs<ExtArgs>>): Prisma__PostClient<$Result.GetResult<Prisma.$PostPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Post that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {PostFindUniqueOrThrowArgs} args - Arguments to find a Post
     * @example
     * // Get one Post
     * const post = await prisma.post.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends PostFindUniqueOrThrowArgs>(args: SelectSubset<T, PostFindUniqueOrThrowArgs<ExtArgs>>): Prisma__PostClient<$Result.GetResult<Prisma.$PostPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Post that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PostFindFirstArgs} args - Arguments to find a Post
     * @example
     * // Get one Post
     * const post = await prisma.post.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends PostFindFirstArgs>(args?: SelectSubset<T, PostFindFirstArgs<ExtArgs>>): Prisma__PostClient<$Result.GetResult<Prisma.$PostPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Post that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PostFindFirstOrThrowArgs} args - Arguments to find a Post
     * @example
     * // Get one Post
     * const post = await prisma.post.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends PostFindFirstOrThrowArgs>(args?: SelectSubset<T, PostFindFirstOrThrowArgs<ExtArgs>>): Prisma__PostClient<$Result.GetResult<Prisma.$PostPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Posts that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PostFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Posts
     * const posts = await prisma.post.findMany()
     * 
     * // Get first 10 Posts
     * const posts = await prisma.post.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const postWithIdOnly = await prisma.post.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends PostFindManyArgs>(args?: SelectSubset<T, PostFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PostPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Post.
     * @param {PostCreateArgs} args - Arguments to create a Post.
     * @example
     * // Create one Post
     * const Post = await prisma.post.create({
     *   data: {
     *     // ... data to create a Post
     *   }
     * })
     * 
     */
    create<T extends PostCreateArgs>(args: SelectSubset<T, PostCreateArgs<ExtArgs>>): Prisma__PostClient<$Result.GetResult<Prisma.$PostPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Posts.
     * @param {PostCreateManyArgs} args - Arguments to create many Posts.
     * @example
     * // Create many Posts
     * const post = await prisma.post.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends PostCreateManyArgs>(args?: SelectSubset<T, PostCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Posts and returns the data saved in the database.
     * @param {PostCreateManyAndReturnArgs} args - Arguments to create many Posts.
     * @example
     * // Create many Posts
     * const post = await prisma.post.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Posts and only return the `id`
     * const postWithIdOnly = await prisma.post.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends PostCreateManyAndReturnArgs>(args?: SelectSubset<T, PostCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PostPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Post.
     * @param {PostDeleteArgs} args - Arguments to delete one Post.
     * @example
     * // Delete one Post
     * const Post = await prisma.post.delete({
     *   where: {
     *     // ... filter to delete one Post
     *   }
     * })
     * 
     */
    delete<T extends PostDeleteArgs>(args: SelectSubset<T, PostDeleteArgs<ExtArgs>>): Prisma__PostClient<$Result.GetResult<Prisma.$PostPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Post.
     * @param {PostUpdateArgs} args - Arguments to update one Post.
     * @example
     * // Update one Post
     * const post = await prisma.post.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends PostUpdateArgs>(args: SelectSubset<T, PostUpdateArgs<ExtArgs>>): Prisma__PostClient<$Result.GetResult<Prisma.$PostPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Posts.
     * @param {PostDeleteManyArgs} args - Arguments to filter Posts to delete.
     * @example
     * // Delete a few Posts
     * const { count } = await prisma.post.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends PostDeleteManyArgs>(args?: SelectSubset<T, PostDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Posts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PostUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Posts
     * const post = await prisma.post.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends PostUpdateManyArgs>(args: SelectSubset<T, PostUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Posts and returns the data updated in the database.
     * @param {PostUpdateManyAndReturnArgs} args - Arguments to update many Posts.
     * @example
     * // Update many Posts
     * const post = await prisma.post.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Posts and only return the `id`
     * const postWithIdOnly = await prisma.post.updateManyAndReturn({
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
    updateManyAndReturn<T extends PostUpdateManyAndReturnArgs>(args: SelectSubset<T, PostUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PostPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Post.
     * @param {PostUpsertArgs} args - Arguments to update or create a Post.
     * @example
     * // Update or create a Post
     * const post = await prisma.post.upsert({
     *   create: {
     *     // ... data to create a Post
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Post we want to update
     *   }
     * })
     */
    upsert<T extends PostUpsertArgs>(args: SelectSubset<T, PostUpsertArgs<ExtArgs>>): Prisma__PostClient<$Result.GetResult<Prisma.$PostPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Posts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PostCountArgs} args - Arguments to filter Posts to count.
     * @example
     * // Count the number of Posts
     * const count = await prisma.post.count({
     *   where: {
     *     // ... the filter for the Posts we want to count
     *   }
     * })
    **/
    count<T extends PostCountArgs>(
      args?: Subset<T, PostCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], PostCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Post.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PostAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends PostAggregateArgs>(args: Subset<T, PostAggregateArgs>): Prisma.PrismaPromise<GetPostAggregateType<T>>

    /**
     * Group by Post.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PostGroupByArgs} args - Group by arguments.
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
      T extends PostGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: PostGroupByArgs['orderBy'] }
        : { orderBy?: PostGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, PostGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPostGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Post model
   */
  readonly fields: PostFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Post.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__PostClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
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
   * Fields of the Post model
   */ 
  interface PostFieldRefs {
    readonly id: FieldRef<"Post", 'String'>
    readonly title: FieldRef<"Post", 'String'>
    readonly content: FieldRef<"Post", 'String'>
    readonly createdAt: FieldRef<"Post", 'DateTime'>
    readonly updatedAt: FieldRef<"Post", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Post findUnique
   */
  export type PostFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Post
     */
    select?: PostSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Post
     */
    omit?: PostOmit<ExtArgs> | null
    /**
     * Filter, which Post to fetch.
     */
    where: PostWhereUniqueInput
  }

  /**
   * Post findUniqueOrThrow
   */
  export type PostFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Post
     */
    select?: PostSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Post
     */
    omit?: PostOmit<ExtArgs> | null
    /**
     * Filter, which Post to fetch.
     */
    where: PostWhereUniqueInput
  }

  /**
   * Post findFirst
   */
  export type PostFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Post
     */
    select?: PostSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Post
     */
    omit?: PostOmit<ExtArgs> | null
    /**
     * Filter, which Post to fetch.
     */
    where?: PostWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Posts to fetch.
     */
    orderBy?: PostOrderByWithRelationInput | PostOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Posts.
     */
    cursor?: PostWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Posts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Posts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Posts.
     */
    distinct?: PostScalarFieldEnum | PostScalarFieldEnum[]
  }

  /**
   * Post findFirstOrThrow
   */
  export type PostFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Post
     */
    select?: PostSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Post
     */
    omit?: PostOmit<ExtArgs> | null
    /**
     * Filter, which Post to fetch.
     */
    where?: PostWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Posts to fetch.
     */
    orderBy?: PostOrderByWithRelationInput | PostOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Posts.
     */
    cursor?: PostWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Posts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Posts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Posts.
     */
    distinct?: PostScalarFieldEnum | PostScalarFieldEnum[]
  }

  /**
   * Post findMany
   */
  export type PostFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Post
     */
    select?: PostSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Post
     */
    omit?: PostOmit<ExtArgs> | null
    /**
     * Filter, which Posts to fetch.
     */
    where?: PostWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Posts to fetch.
     */
    orderBy?: PostOrderByWithRelationInput | PostOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Posts.
     */
    cursor?: PostWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Posts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Posts.
     */
    skip?: number
    distinct?: PostScalarFieldEnum | PostScalarFieldEnum[]
  }

  /**
   * Post create
   */
  export type PostCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Post
     */
    select?: PostSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Post
     */
    omit?: PostOmit<ExtArgs> | null
    /**
     * The data needed to create a Post.
     */
    data: XOR<PostCreateInput, PostUncheckedCreateInput>
  }

  /**
   * Post createMany
   */
  export type PostCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Posts.
     */
    data: PostCreateManyInput | PostCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Post createManyAndReturn
   */
  export type PostCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Post
     */
    select?: PostSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Post
     */
    omit?: PostOmit<ExtArgs> | null
    /**
     * The data used to create many Posts.
     */
    data: PostCreateManyInput | PostCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Post update
   */
  export type PostUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Post
     */
    select?: PostSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Post
     */
    omit?: PostOmit<ExtArgs> | null
    /**
     * The data needed to update a Post.
     */
    data: XOR<PostUpdateInput, PostUncheckedUpdateInput>
    /**
     * Choose, which Post to update.
     */
    where: PostWhereUniqueInput
  }

  /**
   * Post updateMany
   */
  export type PostUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Posts.
     */
    data: XOR<PostUpdateManyMutationInput, PostUncheckedUpdateManyInput>
    /**
     * Filter which Posts to update
     */
    where?: PostWhereInput
    /**
     * Limit how many Posts to update.
     */
    limit?: number
  }

  /**
   * Post updateManyAndReturn
   */
  export type PostUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Post
     */
    select?: PostSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Post
     */
    omit?: PostOmit<ExtArgs> | null
    /**
     * The data used to update Posts.
     */
    data: XOR<PostUpdateManyMutationInput, PostUncheckedUpdateManyInput>
    /**
     * Filter which Posts to update
     */
    where?: PostWhereInput
    /**
     * Limit how many Posts to update.
     */
    limit?: number
  }

  /**
   * Post upsert
   */
  export type PostUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Post
     */
    select?: PostSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Post
     */
    omit?: PostOmit<ExtArgs> | null
    /**
     * The filter to search for the Post to update in case it exists.
     */
    where: PostWhereUniqueInput
    /**
     * In case the Post found by the `where` argument doesn't exist, create a new Post with this data.
     */
    create: XOR<PostCreateInput, PostUncheckedCreateInput>
    /**
     * In case the Post was found with the provided `where` argument, update it with this data.
     */
    update: XOR<PostUpdateInput, PostUncheckedUpdateInput>
  }

  /**
   * Post delete
   */
  export type PostDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Post
     */
    select?: PostSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Post
     */
    omit?: PostOmit<ExtArgs> | null
    /**
     * Filter which Post to delete.
     */
    where: PostWhereUniqueInput
  }

  /**
   * Post deleteMany
   */
  export type PostDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Posts to delete
     */
    where?: PostWhereInput
    /**
     * Limit how many Posts to delete.
     */
    limit?: number
  }

  /**
   * Post without action
   */
  export type PostDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Post
     */
    select?: PostSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Post
     */
    omit?: PostOmit<ExtArgs> | null
  }


  /**
   * Model StripePayment
   */

  export type AggregateStripePayment = {
    _count: StripePaymentCountAggregateOutputType | null
    _avg: StripePaymentAvgAggregateOutputType | null
    _sum: StripePaymentSumAggregateOutputType | null
    _min: StripePaymentMinAggregateOutputType | null
    _max: StripePaymentMaxAggregateOutputType | null
  }

  export type StripePaymentAvgAggregateOutputType = {
    amount: number | null
  }

  export type StripePaymentSumAggregateOutputType = {
    amount: number | null
  }

  export type StripePaymentMinAggregateOutputType = {
    id: string | null
    clerkUserId: string | null
    amount: number | null
    currency: string | null
    status: string | null
    stripePaymentId: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type StripePaymentMaxAggregateOutputType = {
    id: string | null
    clerkUserId: string | null
    amount: number | null
    currency: string | null
    status: string | null
    stripePaymentId: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type StripePaymentCountAggregateOutputType = {
    id: number
    clerkUserId: number
    amount: number
    currency: number
    status: number
    stripePaymentId: number
    metadata: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type StripePaymentAvgAggregateInputType = {
    amount?: true
  }

  export type StripePaymentSumAggregateInputType = {
    amount?: true
  }

  export type StripePaymentMinAggregateInputType = {
    id?: true
    clerkUserId?: true
    amount?: true
    currency?: true
    status?: true
    stripePaymentId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type StripePaymentMaxAggregateInputType = {
    id?: true
    clerkUserId?: true
    amount?: true
    currency?: true
    status?: true
    stripePaymentId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type StripePaymentCountAggregateInputType = {
    id?: true
    clerkUserId?: true
    amount?: true
    currency?: true
    status?: true
    stripePaymentId?: true
    metadata?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type StripePaymentAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which StripePayment to aggregate.
     */
    where?: StripePaymentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of StripePayments to fetch.
     */
    orderBy?: StripePaymentOrderByWithRelationInput | StripePaymentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: StripePaymentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` StripePayments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` StripePayments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned StripePayments
    **/
    _count?: true | StripePaymentCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: StripePaymentAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: StripePaymentSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: StripePaymentMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: StripePaymentMaxAggregateInputType
  }

  export type GetStripePaymentAggregateType<T extends StripePaymentAggregateArgs> = {
        [P in keyof T & keyof AggregateStripePayment]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateStripePayment[P]>
      : GetScalarType<T[P], AggregateStripePayment[P]>
  }




  export type StripePaymentGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: StripePaymentWhereInput
    orderBy?: StripePaymentOrderByWithAggregationInput | StripePaymentOrderByWithAggregationInput[]
    by: StripePaymentScalarFieldEnum[] | StripePaymentScalarFieldEnum
    having?: StripePaymentScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: StripePaymentCountAggregateInputType | true
    _avg?: StripePaymentAvgAggregateInputType
    _sum?: StripePaymentSumAggregateInputType
    _min?: StripePaymentMinAggregateInputType
    _max?: StripePaymentMaxAggregateInputType
  }

  export type StripePaymentGroupByOutputType = {
    id: string
    clerkUserId: string
    amount: number
    currency: string
    status: string
    stripePaymentId: string
    metadata: JsonValue | null
    createdAt: Date
    updatedAt: Date
    _count: StripePaymentCountAggregateOutputType | null
    _avg: StripePaymentAvgAggregateOutputType | null
    _sum: StripePaymentSumAggregateOutputType | null
    _min: StripePaymentMinAggregateOutputType | null
    _max: StripePaymentMaxAggregateOutputType | null
  }

  type GetStripePaymentGroupByPayload<T extends StripePaymentGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<StripePaymentGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof StripePaymentGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], StripePaymentGroupByOutputType[P]>
            : GetScalarType<T[P], StripePaymentGroupByOutputType[P]>
        }
      >
    >


  export type StripePaymentSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    clerkUserId?: boolean
    amount?: boolean
    currency?: boolean
    status?: boolean
    stripePaymentId?: boolean
    metadata?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["stripePayment"]>

  export type StripePaymentSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    clerkUserId?: boolean
    amount?: boolean
    currency?: boolean
    status?: boolean
    stripePaymentId?: boolean
    metadata?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["stripePayment"]>

  export type StripePaymentSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    clerkUserId?: boolean
    amount?: boolean
    currency?: boolean
    status?: boolean
    stripePaymentId?: boolean
    metadata?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["stripePayment"]>

  export type StripePaymentSelectScalar = {
    id?: boolean
    clerkUserId?: boolean
    amount?: boolean
    currency?: boolean
    status?: boolean
    stripePaymentId?: boolean
    metadata?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type StripePaymentOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "clerkUserId" | "amount" | "currency" | "status" | "stripePaymentId" | "metadata" | "createdAt" | "updatedAt", ExtArgs["result"]["stripePayment"]>

  export type $StripePaymentPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "StripePayment"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      clerkUserId: string
      amount: number
      currency: string
      status: string
      stripePaymentId: string
      metadata: Prisma.JsonValue | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["stripePayment"]>
    composites: {}
  }

  type StripePaymentGetPayload<S extends boolean | null | undefined | StripePaymentDefaultArgs> = $Result.GetResult<Prisma.$StripePaymentPayload, S>

  type StripePaymentCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<StripePaymentFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: StripePaymentCountAggregateInputType | true
    }

  export interface StripePaymentDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['StripePayment'], meta: { name: 'StripePayment' } }
    /**
     * Find zero or one StripePayment that matches the filter.
     * @param {StripePaymentFindUniqueArgs} args - Arguments to find a StripePayment
     * @example
     * // Get one StripePayment
     * const stripePayment = await prisma.stripePayment.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends StripePaymentFindUniqueArgs>(args: SelectSubset<T, StripePaymentFindUniqueArgs<ExtArgs>>): Prisma__StripePaymentClient<$Result.GetResult<Prisma.$StripePaymentPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one StripePayment that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {StripePaymentFindUniqueOrThrowArgs} args - Arguments to find a StripePayment
     * @example
     * // Get one StripePayment
     * const stripePayment = await prisma.stripePayment.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends StripePaymentFindUniqueOrThrowArgs>(args: SelectSubset<T, StripePaymentFindUniqueOrThrowArgs<ExtArgs>>): Prisma__StripePaymentClient<$Result.GetResult<Prisma.$StripePaymentPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first StripePayment that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StripePaymentFindFirstArgs} args - Arguments to find a StripePayment
     * @example
     * // Get one StripePayment
     * const stripePayment = await prisma.stripePayment.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends StripePaymentFindFirstArgs>(args?: SelectSubset<T, StripePaymentFindFirstArgs<ExtArgs>>): Prisma__StripePaymentClient<$Result.GetResult<Prisma.$StripePaymentPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first StripePayment that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StripePaymentFindFirstOrThrowArgs} args - Arguments to find a StripePayment
     * @example
     * // Get one StripePayment
     * const stripePayment = await prisma.stripePayment.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends StripePaymentFindFirstOrThrowArgs>(args?: SelectSubset<T, StripePaymentFindFirstOrThrowArgs<ExtArgs>>): Prisma__StripePaymentClient<$Result.GetResult<Prisma.$StripePaymentPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more StripePayments that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StripePaymentFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all StripePayments
     * const stripePayments = await prisma.stripePayment.findMany()
     * 
     * // Get first 10 StripePayments
     * const stripePayments = await prisma.stripePayment.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const stripePaymentWithIdOnly = await prisma.stripePayment.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends StripePaymentFindManyArgs>(args?: SelectSubset<T, StripePaymentFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$StripePaymentPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a StripePayment.
     * @param {StripePaymentCreateArgs} args - Arguments to create a StripePayment.
     * @example
     * // Create one StripePayment
     * const StripePayment = await prisma.stripePayment.create({
     *   data: {
     *     // ... data to create a StripePayment
     *   }
     * })
     * 
     */
    create<T extends StripePaymentCreateArgs>(args: SelectSubset<T, StripePaymentCreateArgs<ExtArgs>>): Prisma__StripePaymentClient<$Result.GetResult<Prisma.$StripePaymentPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many StripePayments.
     * @param {StripePaymentCreateManyArgs} args - Arguments to create many StripePayments.
     * @example
     * // Create many StripePayments
     * const stripePayment = await prisma.stripePayment.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends StripePaymentCreateManyArgs>(args?: SelectSubset<T, StripePaymentCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many StripePayments and returns the data saved in the database.
     * @param {StripePaymentCreateManyAndReturnArgs} args - Arguments to create many StripePayments.
     * @example
     * // Create many StripePayments
     * const stripePayment = await prisma.stripePayment.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many StripePayments and only return the `id`
     * const stripePaymentWithIdOnly = await prisma.stripePayment.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends StripePaymentCreateManyAndReturnArgs>(args?: SelectSubset<T, StripePaymentCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$StripePaymentPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a StripePayment.
     * @param {StripePaymentDeleteArgs} args - Arguments to delete one StripePayment.
     * @example
     * // Delete one StripePayment
     * const StripePayment = await prisma.stripePayment.delete({
     *   where: {
     *     // ... filter to delete one StripePayment
     *   }
     * })
     * 
     */
    delete<T extends StripePaymentDeleteArgs>(args: SelectSubset<T, StripePaymentDeleteArgs<ExtArgs>>): Prisma__StripePaymentClient<$Result.GetResult<Prisma.$StripePaymentPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one StripePayment.
     * @param {StripePaymentUpdateArgs} args - Arguments to update one StripePayment.
     * @example
     * // Update one StripePayment
     * const stripePayment = await prisma.stripePayment.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends StripePaymentUpdateArgs>(args: SelectSubset<T, StripePaymentUpdateArgs<ExtArgs>>): Prisma__StripePaymentClient<$Result.GetResult<Prisma.$StripePaymentPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more StripePayments.
     * @param {StripePaymentDeleteManyArgs} args - Arguments to filter StripePayments to delete.
     * @example
     * // Delete a few StripePayments
     * const { count } = await prisma.stripePayment.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends StripePaymentDeleteManyArgs>(args?: SelectSubset<T, StripePaymentDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more StripePayments.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StripePaymentUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many StripePayments
     * const stripePayment = await prisma.stripePayment.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends StripePaymentUpdateManyArgs>(args: SelectSubset<T, StripePaymentUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more StripePayments and returns the data updated in the database.
     * @param {StripePaymentUpdateManyAndReturnArgs} args - Arguments to update many StripePayments.
     * @example
     * // Update many StripePayments
     * const stripePayment = await prisma.stripePayment.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more StripePayments and only return the `id`
     * const stripePaymentWithIdOnly = await prisma.stripePayment.updateManyAndReturn({
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
    updateManyAndReturn<T extends StripePaymentUpdateManyAndReturnArgs>(args: SelectSubset<T, StripePaymentUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$StripePaymentPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one StripePayment.
     * @param {StripePaymentUpsertArgs} args - Arguments to update or create a StripePayment.
     * @example
     * // Update or create a StripePayment
     * const stripePayment = await prisma.stripePayment.upsert({
     *   create: {
     *     // ... data to create a StripePayment
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the StripePayment we want to update
     *   }
     * })
     */
    upsert<T extends StripePaymentUpsertArgs>(args: SelectSubset<T, StripePaymentUpsertArgs<ExtArgs>>): Prisma__StripePaymentClient<$Result.GetResult<Prisma.$StripePaymentPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of StripePayments.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StripePaymentCountArgs} args - Arguments to filter StripePayments to count.
     * @example
     * // Count the number of StripePayments
     * const count = await prisma.stripePayment.count({
     *   where: {
     *     // ... the filter for the StripePayments we want to count
     *   }
     * })
    **/
    count<T extends StripePaymentCountArgs>(
      args?: Subset<T, StripePaymentCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], StripePaymentCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a StripePayment.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StripePaymentAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends StripePaymentAggregateArgs>(args: Subset<T, StripePaymentAggregateArgs>): Prisma.PrismaPromise<GetStripePaymentAggregateType<T>>

    /**
     * Group by StripePayment.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StripePaymentGroupByArgs} args - Group by arguments.
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
      T extends StripePaymentGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: StripePaymentGroupByArgs['orderBy'] }
        : { orderBy?: StripePaymentGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, StripePaymentGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetStripePaymentGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the StripePayment model
   */
  readonly fields: StripePaymentFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for StripePayment.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__StripePaymentClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
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
   * Fields of the StripePayment model
   */ 
  interface StripePaymentFieldRefs {
    readonly id: FieldRef<"StripePayment", 'String'>
    readonly clerkUserId: FieldRef<"StripePayment", 'String'>
    readonly amount: FieldRef<"StripePayment", 'Int'>
    readonly currency: FieldRef<"StripePayment", 'String'>
    readonly status: FieldRef<"StripePayment", 'String'>
    readonly stripePaymentId: FieldRef<"StripePayment", 'String'>
    readonly metadata: FieldRef<"StripePayment", 'Json'>
    readonly createdAt: FieldRef<"StripePayment", 'DateTime'>
    readonly updatedAt: FieldRef<"StripePayment", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * StripePayment findUnique
   */
  export type StripePaymentFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StripePayment
     */
    select?: StripePaymentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the StripePayment
     */
    omit?: StripePaymentOmit<ExtArgs> | null
    /**
     * Filter, which StripePayment to fetch.
     */
    where: StripePaymentWhereUniqueInput
  }

  /**
   * StripePayment findUniqueOrThrow
   */
  export type StripePaymentFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StripePayment
     */
    select?: StripePaymentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the StripePayment
     */
    omit?: StripePaymentOmit<ExtArgs> | null
    /**
     * Filter, which StripePayment to fetch.
     */
    where: StripePaymentWhereUniqueInput
  }

  /**
   * StripePayment findFirst
   */
  export type StripePaymentFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StripePayment
     */
    select?: StripePaymentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the StripePayment
     */
    omit?: StripePaymentOmit<ExtArgs> | null
    /**
     * Filter, which StripePayment to fetch.
     */
    where?: StripePaymentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of StripePayments to fetch.
     */
    orderBy?: StripePaymentOrderByWithRelationInput | StripePaymentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for StripePayments.
     */
    cursor?: StripePaymentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` StripePayments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` StripePayments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of StripePayments.
     */
    distinct?: StripePaymentScalarFieldEnum | StripePaymentScalarFieldEnum[]
  }

  /**
   * StripePayment findFirstOrThrow
   */
  export type StripePaymentFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StripePayment
     */
    select?: StripePaymentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the StripePayment
     */
    omit?: StripePaymentOmit<ExtArgs> | null
    /**
     * Filter, which StripePayment to fetch.
     */
    where?: StripePaymentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of StripePayments to fetch.
     */
    orderBy?: StripePaymentOrderByWithRelationInput | StripePaymentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for StripePayments.
     */
    cursor?: StripePaymentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` StripePayments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` StripePayments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of StripePayments.
     */
    distinct?: StripePaymentScalarFieldEnum | StripePaymentScalarFieldEnum[]
  }

  /**
   * StripePayment findMany
   */
  export type StripePaymentFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StripePayment
     */
    select?: StripePaymentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the StripePayment
     */
    omit?: StripePaymentOmit<ExtArgs> | null
    /**
     * Filter, which StripePayments to fetch.
     */
    where?: StripePaymentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of StripePayments to fetch.
     */
    orderBy?: StripePaymentOrderByWithRelationInput | StripePaymentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing StripePayments.
     */
    cursor?: StripePaymentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` StripePayments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` StripePayments.
     */
    skip?: number
    distinct?: StripePaymentScalarFieldEnum | StripePaymentScalarFieldEnum[]
  }

  /**
   * StripePayment create
   */
  export type StripePaymentCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StripePayment
     */
    select?: StripePaymentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the StripePayment
     */
    omit?: StripePaymentOmit<ExtArgs> | null
    /**
     * The data needed to create a StripePayment.
     */
    data: XOR<StripePaymentCreateInput, StripePaymentUncheckedCreateInput>
  }

  /**
   * StripePayment createMany
   */
  export type StripePaymentCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many StripePayments.
     */
    data: StripePaymentCreateManyInput | StripePaymentCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * StripePayment createManyAndReturn
   */
  export type StripePaymentCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StripePayment
     */
    select?: StripePaymentSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the StripePayment
     */
    omit?: StripePaymentOmit<ExtArgs> | null
    /**
     * The data used to create many StripePayments.
     */
    data: StripePaymentCreateManyInput | StripePaymentCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * StripePayment update
   */
  export type StripePaymentUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StripePayment
     */
    select?: StripePaymentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the StripePayment
     */
    omit?: StripePaymentOmit<ExtArgs> | null
    /**
     * The data needed to update a StripePayment.
     */
    data: XOR<StripePaymentUpdateInput, StripePaymentUncheckedUpdateInput>
    /**
     * Choose, which StripePayment to update.
     */
    where: StripePaymentWhereUniqueInput
  }

  /**
   * StripePayment updateMany
   */
  export type StripePaymentUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update StripePayments.
     */
    data: XOR<StripePaymentUpdateManyMutationInput, StripePaymentUncheckedUpdateManyInput>
    /**
     * Filter which StripePayments to update
     */
    where?: StripePaymentWhereInput
    /**
     * Limit how many StripePayments to update.
     */
    limit?: number
  }

  /**
   * StripePayment updateManyAndReturn
   */
  export type StripePaymentUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StripePayment
     */
    select?: StripePaymentSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the StripePayment
     */
    omit?: StripePaymentOmit<ExtArgs> | null
    /**
     * The data used to update StripePayments.
     */
    data: XOR<StripePaymentUpdateManyMutationInput, StripePaymentUncheckedUpdateManyInput>
    /**
     * Filter which StripePayments to update
     */
    where?: StripePaymentWhereInput
    /**
     * Limit how many StripePayments to update.
     */
    limit?: number
  }

  /**
   * StripePayment upsert
   */
  export type StripePaymentUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StripePayment
     */
    select?: StripePaymentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the StripePayment
     */
    omit?: StripePaymentOmit<ExtArgs> | null
    /**
     * The filter to search for the StripePayment to update in case it exists.
     */
    where: StripePaymentWhereUniqueInput
    /**
     * In case the StripePayment found by the `where` argument doesn't exist, create a new StripePayment with this data.
     */
    create: XOR<StripePaymentCreateInput, StripePaymentUncheckedCreateInput>
    /**
     * In case the StripePayment was found with the provided `where` argument, update it with this data.
     */
    update: XOR<StripePaymentUpdateInput, StripePaymentUncheckedUpdateInput>
  }

  /**
   * StripePayment delete
   */
  export type StripePaymentDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StripePayment
     */
    select?: StripePaymentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the StripePayment
     */
    omit?: StripePaymentOmit<ExtArgs> | null
    /**
     * Filter which StripePayment to delete.
     */
    where: StripePaymentWhereUniqueInput
  }

  /**
   * StripePayment deleteMany
   */
  export type StripePaymentDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which StripePayments to delete
     */
    where?: StripePaymentWhereInput
    /**
     * Limit how many StripePayments to delete.
     */
    limit?: number
  }

  /**
   * StripePayment without action
   */
  export type StripePaymentDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StripePayment
     */
    select?: StripePaymentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the StripePayment
     */
    omit?: StripePaymentOmit<ExtArgs> | null
  }


  /**
   * Model User
   */

  export type AggregateUser = {
    _count: UserCountAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  export type UserMinAggregateOutputType = {
    id: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UserMaxAggregateOutputType = {
    id: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UserCountAggregateOutputType = {
    id: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type UserMinAggregateInputType = {
    id?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UserMaxAggregateInputType = {
    id?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UserCountAggregateInputType = {
    id?: true
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
    _min?: UserMinAggregateInputType
    _max?: UserMaxAggregateInputType
  }

  export type UserGroupByOutputType = {
    id: string
    createdAt: Date
    updatedAt: Date
    _count: UserCountAggregateOutputType | null
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
    createdAt?: boolean
    updatedAt?: boolean
    entries?: boolean | User$entriesArgs<ExtArgs>
    reflections?: boolean | User$reflectionsArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["user"]>

  export type UserSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectScalar = {
    id?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type UserOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "createdAt" | "updatedAt", ExtArgs["result"]["user"]>
  export type UserInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    entries?: boolean | User$entriesArgs<ExtArgs>
    reflections?: boolean | User$reflectionsArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type UserIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type UserIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $UserPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "User"
    objects: {
      entries: Prisma.$FounderLogEntryPayload<ExtArgs>[]
      reflections: Prisma.$FounderLogReflectionPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
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
    entries<T extends User$entriesArgs<ExtArgs> = {}>(args?: Subset<T, User$entriesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FounderLogEntryPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    reflections<T extends User$reflectionsArgs<ExtArgs> = {}>(args?: Subset<T, User$reflectionsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FounderLogReflectionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
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
    skipDuplicates?: boolean
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
    skipDuplicates?: boolean
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
   * User.entries
   */
  export type User$entriesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FounderLogEntry
     */
    select?: FounderLogEntrySelect<ExtArgs> | null
    /**
     * Omit specific fields from the FounderLogEntry
     */
    omit?: FounderLogEntryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FounderLogEntryInclude<ExtArgs> | null
    where?: FounderLogEntryWhereInput
    orderBy?: FounderLogEntryOrderByWithRelationInput | FounderLogEntryOrderByWithRelationInput[]
    cursor?: FounderLogEntryWhereUniqueInput
    take?: number
    skip?: number
    distinct?: FounderLogEntryScalarFieldEnum | FounderLogEntryScalarFieldEnum[]
  }

  /**
   * User.reflections
   */
  export type User$reflectionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FounderLogReflection
     */
    select?: FounderLogReflectionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FounderLogReflection
     */
    omit?: FounderLogReflectionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FounderLogReflectionInclude<ExtArgs> | null
    where?: FounderLogReflectionWhereInput
    orderBy?: FounderLogReflectionOrderByWithRelationInput | FounderLogReflectionOrderByWithRelationInput[]
    cursor?: FounderLogReflectionWhereUniqueInput
    take?: number
    skip?: number
    distinct?: FounderLogReflectionScalarFieldEnum | FounderLogReflectionScalarFieldEnum[]
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
   * Model FounderLogTag
   */

  export type AggregateFounderLogTag = {
    _count: FounderLogTagCountAggregateOutputType | null
    _min: FounderLogTagMinAggregateOutputType | null
    _max: FounderLogTagMaxAggregateOutputType | null
  }

  export type FounderLogTagMinAggregateOutputType = {
    id: string | null
    name: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type FounderLogTagMaxAggregateOutputType = {
    id: string | null
    name: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type FounderLogTagCountAggregateOutputType = {
    id: number
    name: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type FounderLogTagMinAggregateInputType = {
    id?: true
    name?: true
    createdAt?: true
    updatedAt?: true
  }

  export type FounderLogTagMaxAggregateInputType = {
    id?: true
    name?: true
    createdAt?: true
    updatedAt?: true
  }

  export type FounderLogTagCountAggregateInputType = {
    id?: true
    name?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type FounderLogTagAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which FounderLogTag to aggregate.
     */
    where?: FounderLogTagWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of FounderLogTags to fetch.
     */
    orderBy?: FounderLogTagOrderByWithRelationInput | FounderLogTagOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: FounderLogTagWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` FounderLogTags from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` FounderLogTags.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned FounderLogTags
    **/
    _count?: true | FounderLogTagCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: FounderLogTagMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: FounderLogTagMaxAggregateInputType
  }

  export type GetFounderLogTagAggregateType<T extends FounderLogTagAggregateArgs> = {
        [P in keyof T & keyof AggregateFounderLogTag]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateFounderLogTag[P]>
      : GetScalarType<T[P], AggregateFounderLogTag[P]>
  }




  export type FounderLogTagGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: FounderLogTagWhereInput
    orderBy?: FounderLogTagOrderByWithAggregationInput | FounderLogTagOrderByWithAggregationInput[]
    by: FounderLogTagScalarFieldEnum[] | FounderLogTagScalarFieldEnum
    having?: FounderLogTagScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: FounderLogTagCountAggregateInputType | true
    _min?: FounderLogTagMinAggregateInputType
    _max?: FounderLogTagMaxAggregateInputType
  }

  export type FounderLogTagGroupByOutputType = {
    id: string
    name: string
    createdAt: Date
    updatedAt: Date
    _count: FounderLogTagCountAggregateOutputType | null
    _min: FounderLogTagMinAggregateOutputType | null
    _max: FounderLogTagMaxAggregateOutputType | null
  }

  type GetFounderLogTagGroupByPayload<T extends FounderLogTagGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<FounderLogTagGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof FounderLogTagGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], FounderLogTagGroupByOutputType[P]>
            : GetScalarType<T[P], FounderLogTagGroupByOutputType[P]>
        }
      >
    >


  export type FounderLogTagSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    entries?: boolean | FounderLogTag$entriesArgs<ExtArgs>
    _count?: boolean | FounderLogTagCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["founderLogTag"]>

  export type FounderLogTagSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["founderLogTag"]>

  export type FounderLogTagSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["founderLogTag"]>

  export type FounderLogTagSelectScalar = {
    id?: boolean
    name?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type FounderLogTagOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "createdAt" | "updatedAt", ExtArgs["result"]["founderLogTag"]>
  export type FounderLogTagInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    entries?: boolean | FounderLogTag$entriesArgs<ExtArgs>
    _count?: boolean | FounderLogTagCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type FounderLogTagIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type FounderLogTagIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $FounderLogTagPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "FounderLogTag"
    objects: {
      entries: Prisma.$FounderLogEntryTagPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["founderLogTag"]>
    composites: {}
  }

  type FounderLogTagGetPayload<S extends boolean | null | undefined | FounderLogTagDefaultArgs> = $Result.GetResult<Prisma.$FounderLogTagPayload, S>

  type FounderLogTagCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<FounderLogTagFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: FounderLogTagCountAggregateInputType | true
    }

  export interface FounderLogTagDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['FounderLogTag'], meta: { name: 'FounderLogTag' } }
    /**
     * Find zero or one FounderLogTag that matches the filter.
     * @param {FounderLogTagFindUniqueArgs} args - Arguments to find a FounderLogTag
     * @example
     * // Get one FounderLogTag
     * const founderLogTag = await prisma.founderLogTag.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends FounderLogTagFindUniqueArgs>(args: SelectSubset<T, FounderLogTagFindUniqueArgs<ExtArgs>>): Prisma__FounderLogTagClient<$Result.GetResult<Prisma.$FounderLogTagPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one FounderLogTag that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {FounderLogTagFindUniqueOrThrowArgs} args - Arguments to find a FounderLogTag
     * @example
     * // Get one FounderLogTag
     * const founderLogTag = await prisma.founderLogTag.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends FounderLogTagFindUniqueOrThrowArgs>(args: SelectSubset<T, FounderLogTagFindUniqueOrThrowArgs<ExtArgs>>): Prisma__FounderLogTagClient<$Result.GetResult<Prisma.$FounderLogTagPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first FounderLogTag that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FounderLogTagFindFirstArgs} args - Arguments to find a FounderLogTag
     * @example
     * // Get one FounderLogTag
     * const founderLogTag = await prisma.founderLogTag.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends FounderLogTagFindFirstArgs>(args?: SelectSubset<T, FounderLogTagFindFirstArgs<ExtArgs>>): Prisma__FounderLogTagClient<$Result.GetResult<Prisma.$FounderLogTagPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first FounderLogTag that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FounderLogTagFindFirstOrThrowArgs} args - Arguments to find a FounderLogTag
     * @example
     * // Get one FounderLogTag
     * const founderLogTag = await prisma.founderLogTag.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends FounderLogTagFindFirstOrThrowArgs>(args?: SelectSubset<T, FounderLogTagFindFirstOrThrowArgs<ExtArgs>>): Prisma__FounderLogTagClient<$Result.GetResult<Prisma.$FounderLogTagPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more FounderLogTags that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FounderLogTagFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all FounderLogTags
     * const founderLogTags = await prisma.founderLogTag.findMany()
     * 
     * // Get first 10 FounderLogTags
     * const founderLogTags = await prisma.founderLogTag.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const founderLogTagWithIdOnly = await prisma.founderLogTag.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends FounderLogTagFindManyArgs>(args?: SelectSubset<T, FounderLogTagFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FounderLogTagPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a FounderLogTag.
     * @param {FounderLogTagCreateArgs} args - Arguments to create a FounderLogTag.
     * @example
     * // Create one FounderLogTag
     * const FounderLogTag = await prisma.founderLogTag.create({
     *   data: {
     *     // ... data to create a FounderLogTag
     *   }
     * })
     * 
     */
    create<T extends FounderLogTagCreateArgs>(args: SelectSubset<T, FounderLogTagCreateArgs<ExtArgs>>): Prisma__FounderLogTagClient<$Result.GetResult<Prisma.$FounderLogTagPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many FounderLogTags.
     * @param {FounderLogTagCreateManyArgs} args - Arguments to create many FounderLogTags.
     * @example
     * // Create many FounderLogTags
     * const founderLogTag = await prisma.founderLogTag.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends FounderLogTagCreateManyArgs>(args?: SelectSubset<T, FounderLogTagCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many FounderLogTags and returns the data saved in the database.
     * @param {FounderLogTagCreateManyAndReturnArgs} args - Arguments to create many FounderLogTags.
     * @example
     * // Create many FounderLogTags
     * const founderLogTag = await prisma.founderLogTag.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many FounderLogTags and only return the `id`
     * const founderLogTagWithIdOnly = await prisma.founderLogTag.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends FounderLogTagCreateManyAndReturnArgs>(args?: SelectSubset<T, FounderLogTagCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FounderLogTagPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a FounderLogTag.
     * @param {FounderLogTagDeleteArgs} args - Arguments to delete one FounderLogTag.
     * @example
     * // Delete one FounderLogTag
     * const FounderLogTag = await prisma.founderLogTag.delete({
     *   where: {
     *     // ... filter to delete one FounderLogTag
     *   }
     * })
     * 
     */
    delete<T extends FounderLogTagDeleteArgs>(args: SelectSubset<T, FounderLogTagDeleteArgs<ExtArgs>>): Prisma__FounderLogTagClient<$Result.GetResult<Prisma.$FounderLogTagPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one FounderLogTag.
     * @param {FounderLogTagUpdateArgs} args - Arguments to update one FounderLogTag.
     * @example
     * // Update one FounderLogTag
     * const founderLogTag = await prisma.founderLogTag.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends FounderLogTagUpdateArgs>(args: SelectSubset<T, FounderLogTagUpdateArgs<ExtArgs>>): Prisma__FounderLogTagClient<$Result.GetResult<Prisma.$FounderLogTagPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more FounderLogTags.
     * @param {FounderLogTagDeleteManyArgs} args - Arguments to filter FounderLogTags to delete.
     * @example
     * // Delete a few FounderLogTags
     * const { count } = await prisma.founderLogTag.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends FounderLogTagDeleteManyArgs>(args?: SelectSubset<T, FounderLogTagDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more FounderLogTags.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FounderLogTagUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many FounderLogTags
     * const founderLogTag = await prisma.founderLogTag.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends FounderLogTagUpdateManyArgs>(args: SelectSubset<T, FounderLogTagUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more FounderLogTags and returns the data updated in the database.
     * @param {FounderLogTagUpdateManyAndReturnArgs} args - Arguments to update many FounderLogTags.
     * @example
     * // Update many FounderLogTags
     * const founderLogTag = await prisma.founderLogTag.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more FounderLogTags and only return the `id`
     * const founderLogTagWithIdOnly = await prisma.founderLogTag.updateManyAndReturn({
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
    updateManyAndReturn<T extends FounderLogTagUpdateManyAndReturnArgs>(args: SelectSubset<T, FounderLogTagUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FounderLogTagPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one FounderLogTag.
     * @param {FounderLogTagUpsertArgs} args - Arguments to update or create a FounderLogTag.
     * @example
     * // Update or create a FounderLogTag
     * const founderLogTag = await prisma.founderLogTag.upsert({
     *   create: {
     *     // ... data to create a FounderLogTag
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the FounderLogTag we want to update
     *   }
     * })
     */
    upsert<T extends FounderLogTagUpsertArgs>(args: SelectSubset<T, FounderLogTagUpsertArgs<ExtArgs>>): Prisma__FounderLogTagClient<$Result.GetResult<Prisma.$FounderLogTagPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of FounderLogTags.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FounderLogTagCountArgs} args - Arguments to filter FounderLogTags to count.
     * @example
     * // Count the number of FounderLogTags
     * const count = await prisma.founderLogTag.count({
     *   where: {
     *     // ... the filter for the FounderLogTags we want to count
     *   }
     * })
    **/
    count<T extends FounderLogTagCountArgs>(
      args?: Subset<T, FounderLogTagCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], FounderLogTagCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a FounderLogTag.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FounderLogTagAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends FounderLogTagAggregateArgs>(args: Subset<T, FounderLogTagAggregateArgs>): Prisma.PrismaPromise<GetFounderLogTagAggregateType<T>>

    /**
     * Group by FounderLogTag.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FounderLogTagGroupByArgs} args - Group by arguments.
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
      T extends FounderLogTagGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: FounderLogTagGroupByArgs['orderBy'] }
        : { orderBy?: FounderLogTagGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, FounderLogTagGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetFounderLogTagGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the FounderLogTag model
   */
  readonly fields: FounderLogTagFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for FounderLogTag.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__FounderLogTagClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    entries<T extends FounderLogTag$entriesArgs<ExtArgs> = {}>(args?: Subset<T, FounderLogTag$entriesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FounderLogEntryTagPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
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
   * Fields of the FounderLogTag model
   */ 
  interface FounderLogTagFieldRefs {
    readonly id: FieldRef<"FounderLogTag", 'String'>
    readonly name: FieldRef<"FounderLogTag", 'String'>
    readonly createdAt: FieldRef<"FounderLogTag", 'DateTime'>
    readonly updatedAt: FieldRef<"FounderLogTag", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * FounderLogTag findUnique
   */
  export type FounderLogTagFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FounderLogTag
     */
    select?: FounderLogTagSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FounderLogTag
     */
    omit?: FounderLogTagOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FounderLogTagInclude<ExtArgs> | null
    /**
     * Filter, which FounderLogTag to fetch.
     */
    where: FounderLogTagWhereUniqueInput
  }

  /**
   * FounderLogTag findUniqueOrThrow
   */
  export type FounderLogTagFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FounderLogTag
     */
    select?: FounderLogTagSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FounderLogTag
     */
    omit?: FounderLogTagOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FounderLogTagInclude<ExtArgs> | null
    /**
     * Filter, which FounderLogTag to fetch.
     */
    where: FounderLogTagWhereUniqueInput
  }

  /**
   * FounderLogTag findFirst
   */
  export type FounderLogTagFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FounderLogTag
     */
    select?: FounderLogTagSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FounderLogTag
     */
    omit?: FounderLogTagOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FounderLogTagInclude<ExtArgs> | null
    /**
     * Filter, which FounderLogTag to fetch.
     */
    where?: FounderLogTagWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of FounderLogTags to fetch.
     */
    orderBy?: FounderLogTagOrderByWithRelationInput | FounderLogTagOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for FounderLogTags.
     */
    cursor?: FounderLogTagWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` FounderLogTags from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` FounderLogTags.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of FounderLogTags.
     */
    distinct?: FounderLogTagScalarFieldEnum | FounderLogTagScalarFieldEnum[]
  }

  /**
   * FounderLogTag findFirstOrThrow
   */
  export type FounderLogTagFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FounderLogTag
     */
    select?: FounderLogTagSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FounderLogTag
     */
    omit?: FounderLogTagOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FounderLogTagInclude<ExtArgs> | null
    /**
     * Filter, which FounderLogTag to fetch.
     */
    where?: FounderLogTagWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of FounderLogTags to fetch.
     */
    orderBy?: FounderLogTagOrderByWithRelationInput | FounderLogTagOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for FounderLogTags.
     */
    cursor?: FounderLogTagWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` FounderLogTags from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` FounderLogTags.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of FounderLogTags.
     */
    distinct?: FounderLogTagScalarFieldEnum | FounderLogTagScalarFieldEnum[]
  }

  /**
   * FounderLogTag findMany
   */
  export type FounderLogTagFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FounderLogTag
     */
    select?: FounderLogTagSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FounderLogTag
     */
    omit?: FounderLogTagOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FounderLogTagInclude<ExtArgs> | null
    /**
     * Filter, which FounderLogTags to fetch.
     */
    where?: FounderLogTagWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of FounderLogTags to fetch.
     */
    orderBy?: FounderLogTagOrderByWithRelationInput | FounderLogTagOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing FounderLogTags.
     */
    cursor?: FounderLogTagWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` FounderLogTags from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` FounderLogTags.
     */
    skip?: number
    distinct?: FounderLogTagScalarFieldEnum | FounderLogTagScalarFieldEnum[]
  }

  /**
   * FounderLogTag create
   */
  export type FounderLogTagCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FounderLogTag
     */
    select?: FounderLogTagSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FounderLogTag
     */
    omit?: FounderLogTagOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FounderLogTagInclude<ExtArgs> | null
    /**
     * The data needed to create a FounderLogTag.
     */
    data: XOR<FounderLogTagCreateInput, FounderLogTagUncheckedCreateInput>
  }

  /**
   * FounderLogTag createMany
   */
  export type FounderLogTagCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many FounderLogTags.
     */
    data: FounderLogTagCreateManyInput | FounderLogTagCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * FounderLogTag createManyAndReturn
   */
  export type FounderLogTagCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FounderLogTag
     */
    select?: FounderLogTagSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the FounderLogTag
     */
    omit?: FounderLogTagOmit<ExtArgs> | null
    /**
     * The data used to create many FounderLogTags.
     */
    data: FounderLogTagCreateManyInput | FounderLogTagCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * FounderLogTag update
   */
  export type FounderLogTagUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FounderLogTag
     */
    select?: FounderLogTagSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FounderLogTag
     */
    omit?: FounderLogTagOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FounderLogTagInclude<ExtArgs> | null
    /**
     * The data needed to update a FounderLogTag.
     */
    data: XOR<FounderLogTagUpdateInput, FounderLogTagUncheckedUpdateInput>
    /**
     * Choose, which FounderLogTag to update.
     */
    where: FounderLogTagWhereUniqueInput
  }

  /**
   * FounderLogTag updateMany
   */
  export type FounderLogTagUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update FounderLogTags.
     */
    data: XOR<FounderLogTagUpdateManyMutationInput, FounderLogTagUncheckedUpdateManyInput>
    /**
     * Filter which FounderLogTags to update
     */
    where?: FounderLogTagWhereInput
    /**
     * Limit how many FounderLogTags to update.
     */
    limit?: number
  }

  /**
   * FounderLogTag updateManyAndReturn
   */
  export type FounderLogTagUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FounderLogTag
     */
    select?: FounderLogTagSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the FounderLogTag
     */
    omit?: FounderLogTagOmit<ExtArgs> | null
    /**
     * The data used to update FounderLogTags.
     */
    data: XOR<FounderLogTagUpdateManyMutationInput, FounderLogTagUncheckedUpdateManyInput>
    /**
     * Filter which FounderLogTags to update
     */
    where?: FounderLogTagWhereInput
    /**
     * Limit how many FounderLogTags to update.
     */
    limit?: number
  }

  /**
   * FounderLogTag upsert
   */
  export type FounderLogTagUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FounderLogTag
     */
    select?: FounderLogTagSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FounderLogTag
     */
    omit?: FounderLogTagOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FounderLogTagInclude<ExtArgs> | null
    /**
     * The filter to search for the FounderLogTag to update in case it exists.
     */
    where: FounderLogTagWhereUniqueInput
    /**
     * In case the FounderLogTag found by the `where` argument doesn't exist, create a new FounderLogTag with this data.
     */
    create: XOR<FounderLogTagCreateInput, FounderLogTagUncheckedCreateInput>
    /**
     * In case the FounderLogTag was found with the provided `where` argument, update it with this data.
     */
    update: XOR<FounderLogTagUpdateInput, FounderLogTagUncheckedUpdateInput>
  }

  /**
   * FounderLogTag delete
   */
  export type FounderLogTagDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FounderLogTag
     */
    select?: FounderLogTagSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FounderLogTag
     */
    omit?: FounderLogTagOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FounderLogTagInclude<ExtArgs> | null
    /**
     * Filter which FounderLogTag to delete.
     */
    where: FounderLogTagWhereUniqueInput
  }

  /**
   * FounderLogTag deleteMany
   */
  export type FounderLogTagDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which FounderLogTags to delete
     */
    where?: FounderLogTagWhereInput
    /**
     * Limit how many FounderLogTags to delete.
     */
    limit?: number
  }

  /**
   * FounderLogTag.entries
   */
  export type FounderLogTag$entriesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FounderLogEntryTag
     */
    select?: FounderLogEntryTagSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FounderLogEntryTag
     */
    omit?: FounderLogEntryTagOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FounderLogEntryTagInclude<ExtArgs> | null
    where?: FounderLogEntryTagWhereInput
    orderBy?: FounderLogEntryTagOrderByWithRelationInput | FounderLogEntryTagOrderByWithRelationInput[]
    cursor?: FounderLogEntryTagWhereUniqueInput
    take?: number
    skip?: number
    distinct?: FounderLogEntryTagScalarFieldEnum | FounderLogEntryTagScalarFieldEnum[]
  }

  /**
   * FounderLogTag without action
   */
  export type FounderLogTagDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FounderLogTag
     */
    select?: FounderLogTagSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FounderLogTag
     */
    omit?: FounderLogTagOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FounderLogTagInclude<ExtArgs> | null
  }


  /**
   * Model FounderLogEntry
   */

  export type AggregateFounderLogEntry = {
    _count: FounderLogEntryCountAggregateOutputType | null
    _avg: FounderLogEntryAvgAggregateOutputType | null
    _sum: FounderLogEntrySumAggregateOutputType | null
    _min: FounderLogEntryMinAggregateOutputType | null
    _max: FounderLogEntryMaxAggregateOutputType | null
  }

  export type FounderLogEntryAvgAggregateOutputType = {
    upvoteCount: number | null
  }

  export type FounderLogEntrySumAggregateOutputType = {
    upvoteCount: number | null
  }

  export type FounderLogEntryMinAggregateOutputType = {
    id: string | null
    userId: string | null
    content: string | null
    upvoteCount: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type FounderLogEntryMaxAggregateOutputType = {
    id: string | null
    userId: string | null
    content: string | null
    upvoteCount: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type FounderLogEntryCountAggregateOutputType = {
    id: number
    userId: number
    content: number
    upvoteCount: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type FounderLogEntryAvgAggregateInputType = {
    upvoteCount?: true
  }

  export type FounderLogEntrySumAggregateInputType = {
    upvoteCount?: true
  }

  export type FounderLogEntryMinAggregateInputType = {
    id?: true
    userId?: true
    content?: true
    upvoteCount?: true
    createdAt?: true
    updatedAt?: true
  }

  export type FounderLogEntryMaxAggregateInputType = {
    id?: true
    userId?: true
    content?: true
    upvoteCount?: true
    createdAt?: true
    updatedAt?: true
  }

  export type FounderLogEntryCountAggregateInputType = {
    id?: true
    userId?: true
    content?: true
    upvoteCount?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type FounderLogEntryAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which FounderLogEntry to aggregate.
     */
    where?: FounderLogEntryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of FounderLogEntries to fetch.
     */
    orderBy?: FounderLogEntryOrderByWithRelationInput | FounderLogEntryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: FounderLogEntryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` FounderLogEntries from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` FounderLogEntries.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned FounderLogEntries
    **/
    _count?: true | FounderLogEntryCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: FounderLogEntryAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: FounderLogEntrySumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: FounderLogEntryMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: FounderLogEntryMaxAggregateInputType
  }

  export type GetFounderLogEntryAggregateType<T extends FounderLogEntryAggregateArgs> = {
        [P in keyof T & keyof AggregateFounderLogEntry]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateFounderLogEntry[P]>
      : GetScalarType<T[P], AggregateFounderLogEntry[P]>
  }




  export type FounderLogEntryGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: FounderLogEntryWhereInput
    orderBy?: FounderLogEntryOrderByWithAggregationInput | FounderLogEntryOrderByWithAggregationInput[]
    by: FounderLogEntryScalarFieldEnum[] | FounderLogEntryScalarFieldEnum
    having?: FounderLogEntryScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: FounderLogEntryCountAggregateInputType | true
    _avg?: FounderLogEntryAvgAggregateInputType
    _sum?: FounderLogEntrySumAggregateInputType
    _min?: FounderLogEntryMinAggregateInputType
    _max?: FounderLogEntryMaxAggregateInputType
  }

  export type FounderLogEntryGroupByOutputType = {
    id: string
    userId: string
    content: string
    upvoteCount: number
    createdAt: Date
    updatedAt: Date
    _count: FounderLogEntryCountAggregateOutputType | null
    _avg: FounderLogEntryAvgAggregateOutputType | null
    _sum: FounderLogEntrySumAggregateOutputType | null
    _min: FounderLogEntryMinAggregateOutputType | null
    _max: FounderLogEntryMaxAggregateOutputType | null
  }

  type GetFounderLogEntryGroupByPayload<T extends FounderLogEntryGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<FounderLogEntryGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof FounderLogEntryGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], FounderLogEntryGroupByOutputType[P]>
            : GetScalarType<T[P], FounderLogEntryGroupByOutputType[P]>
        }
      >
    >


  export type FounderLogEntrySelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    content?: boolean
    upvoteCount?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    tags?: boolean | FounderLogEntry$tagsArgs<ExtArgs>
    _count?: boolean | FounderLogEntryCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["founderLogEntry"]>

  export type FounderLogEntrySelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    content?: boolean
    upvoteCount?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["founderLogEntry"]>

  export type FounderLogEntrySelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    content?: boolean
    upvoteCount?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["founderLogEntry"]>

  export type FounderLogEntrySelectScalar = {
    id?: boolean
    userId?: boolean
    content?: boolean
    upvoteCount?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type FounderLogEntryOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "userId" | "content" | "upvoteCount" | "createdAt" | "updatedAt", ExtArgs["result"]["founderLogEntry"]>
  export type FounderLogEntryInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    tags?: boolean | FounderLogEntry$tagsArgs<ExtArgs>
    _count?: boolean | FounderLogEntryCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type FounderLogEntryIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type FounderLogEntryIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $FounderLogEntryPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "FounderLogEntry"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
      tags: Prisma.$FounderLogEntryTagPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      userId: string
      content: string
      upvoteCount: number
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["founderLogEntry"]>
    composites: {}
  }

  type FounderLogEntryGetPayload<S extends boolean | null | undefined | FounderLogEntryDefaultArgs> = $Result.GetResult<Prisma.$FounderLogEntryPayload, S>

  type FounderLogEntryCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<FounderLogEntryFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: FounderLogEntryCountAggregateInputType | true
    }

  export interface FounderLogEntryDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['FounderLogEntry'], meta: { name: 'FounderLogEntry' } }
    /**
     * Find zero or one FounderLogEntry that matches the filter.
     * @param {FounderLogEntryFindUniqueArgs} args - Arguments to find a FounderLogEntry
     * @example
     * // Get one FounderLogEntry
     * const founderLogEntry = await prisma.founderLogEntry.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends FounderLogEntryFindUniqueArgs>(args: SelectSubset<T, FounderLogEntryFindUniqueArgs<ExtArgs>>): Prisma__FounderLogEntryClient<$Result.GetResult<Prisma.$FounderLogEntryPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one FounderLogEntry that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {FounderLogEntryFindUniqueOrThrowArgs} args - Arguments to find a FounderLogEntry
     * @example
     * // Get one FounderLogEntry
     * const founderLogEntry = await prisma.founderLogEntry.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends FounderLogEntryFindUniqueOrThrowArgs>(args: SelectSubset<T, FounderLogEntryFindUniqueOrThrowArgs<ExtArgs>>): Prisma__FounderLogEntryClient<$Result.GetResult<Prisma.$FounderLogEntryPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first FounderLogEntry that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FounderLogEntryFindFirstArgs} args - Arguments to find a FounderLogEntry
     * @example
     * // Get one FounderLogEntry
     * const founderLogEntry = await prisma.founderLogEntry.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends FounderLogEntryFindFirstArgs>(args?: SelectSubset<T, FounderLogEntryFindFirstArgs<ExtArgs>>): Prisma__FounderLogEntryClient<$Result.GetResult<Prisma.$FounderLogEntryPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first FounderLogEntry that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FounderLogEntryFindFirstOrThrowArgs} args - Arguments to find a FounderLogEntry
     * @example
     * // Get one FounderLogEntry
     * const founderLogEntry = await prisma.founderLogEntry.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends FounderLogEntryFindFirstOrThrowArgs>(args?: SelectSubset<T, FounderLogEntryFindFirstOrThrowArgs<ExtArgs>>): Prisma__FounderLogEntryClient<$Result.GetResult<Prisma.$FounderLogEntryPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more FounderLogEntries that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FounderLogEntryFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all FounderLogEntries
     * const founderLogEntries = await prisma.founderLogEntry.findMany()
     * 
     * // Get first 10 FounderLogEntries
     * const founderLogEntries = await prisma.founderLogEntry.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const founderLogEntryWithIdOnly = await prisma.founderLogEntry.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends FounderLogEntryFindManyArgs>(args?: SelectSubset<T, FounderLogEntryFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FounderLogEntryPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a FounderLogEntry.
     * @param {FounderLogEntryCreateArgs} args - Arguments to create a FounderLogEntry.
     * @example
     * // Create one FounderLogEntry
     * const FounderLogEntry = await prisma.founderLogEntry.create({
     *   data: {
     *     // ... data to create a FounderLogEntry
     *   }
     * })
     * 
     */
    create<T extends FounderLogEntryCreateArgs>(args: SelectSubset<T, FounderLogEntryCreateArgs<ExtArgs>>): Prisma__FounderLogEntryClient<$Result.GetResult<Prisma.$FounderLogEntryPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many FounderLogEntries.
     * @param {FounderLogEntryCreateManyArgs} args - Arguments to create many FounderLogEntries.
     * @example
     * // Create many FounderLogEntries
     * const founderLogEntry = await prisma.founderLogEntry.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends FounderLogEntryCreateManyArgs>(args?: SelectSubset<T, FounderLogEntryCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many FounderLogEntries and returns the data saved in the database.
     * @param {FounderLogEntryCreateManyAndReturnArgs} args - Arguments to create many FounderLogEntries.
     * @example
     * // Create many FounderLogEntries
     * const founderLogEntry = await prisma.founderLogEntry.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many FounderLogEntries and only return the `id`
     * const founderLogEntryWithIdOnly = await prisma.founderLogEntry.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends FounderLogEntryCreateManyAndReturnArgs>(args?: SelectSubset<T, FounderLogEntryCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FounderLogEntryPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a FounderLogEntry.
     * @param {FounderLogEntryDeleteArgs} args - Arguments to delete one FounderLogEntry.
     * @example
     * // Delete one FounderLogEntry
     * const FounderLogEntry = await prisma.founderLogEntry.delete({
     *   where: {
     *     // ... filter to delete one FounderLogEntry
     *   }
     * })
     * 
     */
    delete<T extends FounderLogEntryDeleteArgs>(args: SelectSubset<T, FounderLogEntryDeleteArgs<ExtArgs>>): Prisma__FounderLogEntryClient<$Result.GetResult<Prisma.$FounderLogEntryPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one FounderLogEntry.
     * @param {FounderLogEntryUpdateArgs} args - Arguments to update one FounderLogEntry.
     * @example
     * // Update one FounderLogEntry
     * const founderLogEntry = await prisma.founderLogEntry.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends FounderLogEntryUpdateArgs>(args: SelectSubset<T, FounderLogEntryUpdateArgs<ExtArgs>>): Prisma__FounderLogEntryClient<$Result.GetResult<Prisma.$FounderLogEntryPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more FounderLogEntries.
     * @param {FounderLogEntryDeleteManyArgs} args - Arguments to filter FounderLogEntries to delete.
     * @example
     * // Delete a few FounderLogEntries
     * const { count } = await prisma.founderLogEntry.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends FounderLogEntryDeleteManyArgs>(args?: SelectSubset<T, FounderLogEntryDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more FounderLogEntries.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FounderLogEntryUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many FounderLogEntries
     * const founderLogEntry = await prisma.founderLogEntry.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends FounderLogEntryUpdateManyArgs>(args: SelectSubset<T, FounderLogEntryUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more FounderLogEntries and returns the data updated in the database.
     * @param {FounderLogEntryUpdateManyAndReturnArgs} args - Arguments to update many FounderLogEntries.
     * @example
     * // Update many FounderLogEntries
     * const founderLogEntry = await prisma.founderLogEntry.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more FounderLogEntries and only return the `id`
     * const founderLogEntryWithIdOnly = await prisma.founderLogEntry.updateManyAndReturn({
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
    updateManyAndReturn<T extends FounderLogEntryUpdateManyAndReturnArgs>(args: SelectSubset<T, FounderLogEntryUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FounderLogEntryPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one FounderLogEntry.
     * @param {FounderLogEntryUpsertArgs} args - Arguments to update or create a FounderLogEntry.
     * @example
     * // Update or create a FounderLogEntry
     * const founderLogEntry = await prisma.founderLogEntry.upsert({
     *   create: {
     *     // ... data to create a FounderLogEntry
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the FounderLogEntry we want to update
     *   }
     * })
     */
    upsert<T extends FounderLogEntryUpsertArgs>(args: SelectSubset<T, FounderLogEntryUpsertArgs<ExtArgs>>): Prisma__FounderLogEntryClient<$Result.GetResult<Prisma.$FounderLogEntryPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of FounderLogEntries.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FounderLogEntryCountArgs} args - Arguments to filter FounderLogEntries to count.
     * @example
     * // Count the number of FounderLogEntries
     * const count = await prisma.founderLogEntry.count({
     *   where: {
     *     // ... the filter for the FounderLogEntries we want to count
     *   }
     * })
    **/
    count<T extends FounderLogEntryCountArgs>(
      args?: Subset<T, FounderLogEntryCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], FounderLogEntryCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a FounderLogEntry.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FounderLogEntryAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends FounderLogEntryAggregateArgs>(args: Subset<T, FounderLogEntryAggregateArgs>): Prisma.PrismaPromise<GetFounderLogEntryAggregateType<T>>

    /**
     * Group by FounderLogEntry.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FounderLogEntryGroupByArgs} args - Group by arguments.
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
      T extends FounderLogEntryGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: FounderLogEntryGroupByArgs['orderBy'] }
        : { orderBy?: FounderLogEntryGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, FounderLogEntryGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetFounderLogEntryGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the FounderLogEntry model
   */
  readonly fields: FounderLogEntryFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for FounderLogEntry.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__FounderLogEntryClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    tags<T extends FounderLogEntry$tagsArgs<ExtArgs> = {}>(args?: Subset<T, FounderLogEntry$tagsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FounderLogEntryTagPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
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
   * Fields of the FounderLogEntry model
   */ 
  interface FounderLogEntryFieldRefs {
    readonly id: FieldRef<"FounderLogEntry", 'String'>
    readonly userId: FieldRef<"FounderLogEntry", 'String'>
    readonly content: FieldRef<"FounderLogEntry", 'String'>
    readonly upvoteCount: FieldRef<"FounderLogEntry", 'Int'>
    readonly createdAt: FieldRef<"FounderLogEntry", 'DateTime'>
    readonly updatedAt: FieldRef<"FounderLogEntry", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * FounderLogEntry findUnique
   */
  export type FounderLogEntryFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FounderLogEntry
     */
    select?: FounderLogEntrySelect<ExtArgs> | null
    /**
     * Omit specific fields from the FounderLogEntry
     */
    omit?: FounderLogEntryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FounderLogEntryInclude<ExtArgs> | null
    /**
     * Filter, which FounderLogEntry to fetch.
     */
    where: FounderLogEntryWhereUniqueInput
  }

  /**
   * FounderLogEntry findUniqueOrThrow
   */
  export type FounderLogEntryFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FounderLogEntry
     */
    select?: FounderLogEntrySelect<ExtArgs> | null
    /**
     * Omit specific fields from the FounderLogEntry
     */
    omit?: FounderLogEntryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FounderLogEntryInclude<ExtArgs> | null
    /**
     * Filter, which FounderLogEntry to fetch.
     */
    where: FounderLogEntryWhereUniqueInput
  }

  /**
   * FounderLogEntry findFirst
   */
  export type FounderLogEntryFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FounderLogEntry
     */
    select?: FounderLogEntrySelect<ExtArgs> | null
    /**
     * Omit specific fields from the FounderLogEntry
     */
    omit?: FounderLogEntryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FounderLogEntryInclude<ExtArgs> | null
    /**
     * Filter, which FounderLogEntry to fetch.
     */
    where?: FounderLogEntryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of FounderLogEntries to fetch.
     */
    orderBy?: FounderLogEntryOrderByWithRelationInput | FounderLogEntryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for FounderLogEntries.
     */
    cursor?: FounderLogEntryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` FounderLogEntries from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` FounderLogEntries.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of FounderLogEntries.
     */
    distinct?: FounderLogEntryScalarFieldEnum | FounderLogEntryScalarFieldEnum[]
  }

  /**
   * FounderLogEntry findFirstOrThrow
   */
  export type FounderLogEntryFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FounderLogEntry
     */
    select?: FounderLogEntrySelect<ExtArgs> | null
    /**
     * Omit specific fields from the FounderLogEntry
     */
    omit?: FounderLogEntryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FounderLogEntryInclude<ExtArgs> | null
    /**
     * Filter, which FounderLogEntry to fetch.
     */
    where?: FounderLogEntryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of FounderLogEntries to fetch.
     */
    orderBy?: FounderLogEntryOrderByWithRelationInput | FounderLogEntryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for FounderLogEntries.
     */
    cursor?: FounderLogEntryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` FounderLogEntries from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` FounderLogEntries.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of FounderLogEntries.
     */
    distinct?: FounderLogEntryScalarFieldEnum | FounderLogEntryScalarFieldEnum[]
  }

  /**
   * FounderLogEntry findMany
   */
  export type FounderLogEntryFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FounderLogEntry
     */
    select?: FounderLogEntrySelect<ExtArgs> | null
    /**
     * Omit specific fields from the FounderLogEntry
     */
    omit?: FounderLogEntryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FounderLogEntryInclude<ExtArgs> | null
    /**
     * Filter, which FounderLogEntries to fetch.
     */
    where?: FounderLogEntryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of FounderLogEntries to fetch.
     */
    orderBy?: FounderLogEntryOrderByWithRelationInput | FounderLogEntryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing FounderLogEntries.
     */
    cursor?: FounderLogEntryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` FounderLogEntries from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` FounderLogEntries.
     */
    skip?: number
    distinct?: FounderLogEntryScalarFieldEnum | FounderLogEntryScalarFieldEnum[]
  }

  /**
   * FounderLogEntry create
   */
  export type FounderLogEntryCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FounderLogEntry
     */
    select?: FounderLogEntrySelect<ExtArgs> | null
    /**
     * Omit specific fields from the FounderLogEntry
     */
    omit?: FounderLogEntryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FounderLogEntryInclude<ExtArgs> | null
    /**
     * The data needed to create a FounderLogEntry.
     */
    data: XOR<FounderLogEntryCreateInput, FounderLogEntryUncheckedCreateInput>
  }

  /**
   * FounderLogEntry createMany
   */
  export type FounderLogEntryCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many FounderLogEntries.
     */
    data: FounderLogEntryCreateManyInput | FounderLogEntryCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * FounderLogEntry createManyAndReturn
   */
  export type FounderLogEntryCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FounderLogEntry
     */
    select?: FounderLogEntrySelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the FounderLogEntry
     */
    omit?: FounderLogEntryOmit<ExtArgs> | null
    /**
     * The data used to create many FounderLogEntries.
     */
    data: FounderLogEntryCreateManyInput | FounderLogEntryCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FounderLogEntryIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * FounderLogEntry update
   */
  export type FounderLogEntryUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FounderLogEntry
     */
    select?: FounderLogEntrySelect<ExtArgs> | null
    /**
     * Omit specific fields from the FounderLogEntry
     */
    omit?: FounderLogEntryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FounderLogEntryInclude<ExtArgs> | null
    /**
     * The data needed to update a FounderLogEntry.
     */
    data: XOR<FounderLogEntryUpdateInput, FounderLogEntryUncheckedUpdateInput>
    /**
     * Choose, which FounderLogEntry to update.
     */
    where: FounderLogEntryWhereUniqueInput
  }

  /**
   * FounderLogEntry updateMany
   */
  export type FounderLogEntryUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update FounderLogEntries.
     */
    data: XOR<FounderLogEntryUpdateManyMutationInput, FounderLogEntryUncheckedUpdateManyInput>
    /**
     * Filter which FounderLogEntries to update
     */
    where?: FounderLogEntryWhereInput
    /**
     * Limit how many FounderLogEntries to update.
     */
    limit?: number
  }

  /**
   * FounderLogEntry updateManyAndReturn
   */
  export type FounderLogEntryUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FounderLogEntry
     */
    select?: FounderLogEntrySelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the FounderLogEntry
     */
    omit?: FounderLogEntryOmit<ExtArgs> | null
    /**
     * The data used to update FounderLogEntries.
     */
    data: XOR<FounderLogEntryUpdateManyMutationInput, FounderLogEntryUncheckedUpdateManyInput>
    /**
     * Filter which FounderLogEntries to update
     */
    where?: FounderLogEntryWhereInput
    /**
     * Limit how many FounderLogEntries to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FounderLogEntryIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * FounderLogEntry upsert
   */
  export type FounderLogEntryUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FounderLogEntry
     */
    select?: FounderLogEntrySelect<ExtArgs> | null
    /**
     * Omit specific fields from the FounderLogEntry
     */
    omit?: FounderLogEntryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FounderLogEntryInclude<ExtArgs> | null
    /**
     * The filter to search for the FounderLogEntry to update in case it exists.
     */
    where: FounderLogEntryWhereUniqueInput
    /**
     * In case the FounderLogEntry found by the `where` argument doesn't exist, create a new FounderLogEntry with this data.
     */
    create: XOR<FounderLogEntryCreateInput, FounderLogEntryUncheckedCreateInput>
    /**
     * In case the FounderLogEntry was found with the provided `where` argument, update it with this data.
     */
    update: XOR<FounderLogEntryUpdateInput, FounderLogEntryUncheckedUpdateInput>
  }

  /**
   * FounderLogEntry delete
   */
  export type FounderLogEntryDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FounderLogEntry
     */
    select?: FounderLogEntrySelect<ExtArgs> | null
    /**
     * Omit specific fields from the FounderLogEntry
     */
    omit?: FounderLogEntryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FounderLogEntryInclude<ExtArgs> | null
    /**
     * Filter which FounderLogEntry to delete.
     */
    where: FounderLogEntryWhereUniqueInput
  }

  /**
   * FounderLogEntry deleteMany
   */
  export type FounderLogEntryDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which FounderLogEntries to delete
     */
    where?: FounderLogEntryWhereInput
    /**
     * Limit how many FounderLogEntries to delete.
     */
    limit?: number
  }

  /**
   * FounderLogEntry.tags
   */
  export type FounderLogEntry$tagsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FounderLogEntryTag
     */
    select?: FounderLogEntryTagSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FounderLogEntryTag
     */
    omit?: FounderLogEntryTagOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FounderLogEntryTagInclude<ExtArgs> | null
    where?: FounderLogEntryTagWhereInput
    orderBy?: FounderLogEntryTagOrderByWithRelationInput | FounderLogEntryTagOrderByWithRelationInput[]
    cursor?: FounderLogEntryTagWhereUniqueInput
    take?: number
    skip?: number
    distinct?: FounderLogEntryTagScalarFieldEnum | FounderLogEntryTagScalarFieldEnum[]
  }

  /**
   * FounderLogEntry without action
   */
  export type FounderLogEntryDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FounderLogEntry
     */
    select?: FounderLogEntrySelect<ExtArgs> | null
    /**
     * Omit specific fields from the FounderLogEntry
     */
    omit?: FounderLogEntryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FounderLogEntryInclude<ExtArgs> | null
  }


  /**
   * Model FounderLogEntryTag
   */

  export type AggregateFounderLogEntryTag = {
    _count: FounderLogEntryTagCountAggregateOutputType | null
    _min: FounderLogEntryTagMinAggregateOutputType | null
    _max: FounderLogEntryTagMaxAggregateOutputType | null
  }

  export type FounderLogEntryTagMinAggregateOutputType = {
    id: string | null
    entryId: string | null
    tagId: string | null
    createdAt: Date | null
  }

  export type FounderLogEntryTagMaxAggregateOutputType = {
    id: string | null
    entryId: string | null
    tagId: string | null
    createdAt: Date | null
  }

  export type FounderLogEntryTagCountAggregateOutputType = {
    id: number
    entryId: number
    tagId: number
    createdAt: number
    _all: number
  }


  export type FounderLogEntryTagMinAggregateInputType = {
    id?: true
    entryId?: true
    tagId?: true
    createdAt?: true
  }

  export type FounderLogEntryTagMaxAggregateInputType = {
    id?: true
    entryId?: true
    tagId?: true
    createdAt?: true
  }

  export type FounderLogEntryTagCountAggregateInputType = {
    id?: true
    entryId?: true
    tagId?: true
    createdAt?: true
    _all?: true
  }

  export type FounderLogEntryTagAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which FounderLogEntryTag to aggregate.
     */
    where?: FounderLogEntryTagWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of FounderLogEntryTags to fetch.
     */
    orderBy?: FounderLogEntryTagOrderByWithRelationInput | FounderLogEntryTagOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: FounderLogEntryTagWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` FounderLogEntryTags from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` FounderLogEntryTags.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned FounderLogEntryTags
    **/
    _count?: true | FounderLogEntryTagCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: FounderLogEntryTagMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: FounderLogEntryTagMaxAggregateInputType
  }

  export type GetFounderLogEntryTagAggregateType<T extends FounderLogEntryTagAggregateArgs> = {
        [P in keyof T & keyof AggregateFounderLogEntryTag]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateFounderLogEntryTag[P]>
      : GetScalarType<T[P], AggregateFounderLogEntryTag[P]>
  }




  export type FounderLogEntryTagGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: FounderLogEntryTagWhereInput
    orderBy?: FounderLogEntryTagOrderByWithAggregationInput | FounderLogEntryTagOrderByWithAggregationInput[]
    by: FounderLogEntryTagScalarFieldEnum[] | FounderLogEntryTagScalarFieldEnum
    having?: FounderLogEntryTagScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: FounderLogEntryTagCountAggregateInputType | true
    _min?: FounderLogEntryTagMinAggregateInputType
    _max?: FounderLogEntryTagMaxAggregateInputType
  }

  export type FounderLogEntryTagGroupByOutputType = {
    id: string
    entryId: string
    tagId: string
    createdAt: Date
    _count: FounderLogEntryTagCountAggregateOutputType | null
    _min: FounderLogEntryTagMinAggregateOutputType | null
    _max: FounderLogEntryTagMaxAggregateOutputType | null
  }

  type GetFounderLogEntryTagGroupByPayload<T extends FounderLogEntryTagGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<FounderLogEntryTagGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof FounderLogEntryTagGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], FounderLogEntryTagGroupByOutputType[P]>
            : GetScalarType<T[P], FounderLogEntryTagGroupByOutputType[P]>
        }
      >
    >


  export type FounderLogEntryTagSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    entryId?: boolean
    tagId?: boolean
    createdAt?: boolean
    entry?: boolean | FounderLogEntryDefaultArgs<ExtArgs>
    tag?: boolean | FounderLogTagDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["founderLogEntryTag"]>

  export type FounderLogEntryTagSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    entryId?: boolean
    tagId?: boolean
    createdAt?: boolean
    entry?: boolean | FounderLogEntryDefaultArgs<ExtArgs>
    tag?: boolean | FounderLogTagDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["founderLogEntryTag"]>

  export type FounderLogEntryTagSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    entryId?: boolean
    tagId?: boolean
    createdAt?: boolean
    entry?: boolean | FounderLogEntryDefaultArgs<ExtArgs>
    tag?: boolean | FounderLogTagDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["founderLogEntryTag"]>

  export type FounderLogEntryTagSelectScalar = {
    id?: boolean
    entryId?: boolean
    tagId?: boolean
    createdAt?: boolean
  }

  export type FounderLogEntryTagOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "entryId" | "tagId" | "createdAt", ExtArgs["result"]["founderLogEntryTag"]>
  export type FounderLogEntryTagInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    entry?: boolean | FounderLogEntryDefaultArgs<ExtArgs>
    tag?: boolean | FounderLogTagDefaultArgs<ExtArgs>
  }
  export type FounderLogEntryTagIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    entry?: boolean | FounderLogEntryDefaultArgs<ExtArgs>
    tag?: boolean | FounderLogTagDefaultArgs<ExtArgs>
  }
  export type FounderLogEntryTagIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    entry?: boolean | FounderLogEntryDefaultArgs<ExtArgs>
    tag?: boolean | FounderLogTagDefaultArgs<ExtArgs>
  }

  export type $FounderLogEntryTagPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "FounderLogEntryTag"
    objects: {
      entry: Prisma.$FounderLogEntryPayload<ExtArgs>
      tag: Prisma.$FounderLogTagPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      entryId: string
      tagId: string
      createdAt: Date
    }, ExtArgs["result"]["founderLogEntryTag"]>
    composites: {}
  }

  type FounderLogEntryTagGetPayload<S extends boolean | null | undefined | FounderLogEntryTagDefaultArgs> = $Result.GetResult<Prisma.$FounderLogEntryTagPayload, S>

  type FounderLogEntryTagCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<FounderLogEntryTagFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: FounderLogEntryTagCountAggregateInputType | true
    }

  export interface FounderLogEntryTagDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['FounderLogEntryTag'], meta: { name: 'FounderLogEntryTag' } }
    /**
     * Find zero or one FounderLogEntryTag that matches the filter.
     * @param {FounderLogEntryTagFindUniqueArgs} args - Arguments to find a FounderLogEntryTag
     * @example
     * // Get one FounderLogEntryTag
     * const founderLogEntryTag = await prisma.founderLogEntryTag.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends FounderLogEntryTagFindUniqueArgs>(args: SelectSubset<T, FounderLogEntryTagFindUniqueArgs<ExtArgs>>): Prisma__FounderLogEntryTagClient<$Result.GetResult<Prisma.$FounderLogEntryTagPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one FounderLogEntryTag that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {FounderLogEntryTagFindUniqueOrThrowArgs} args - Arguments to find a FounderLogEntryTag
     * @example
     * // Get one FounderLogEntryTag
     * const founderLogEntryTag = await prisma.founderLogEntryTag.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends FounderLogEntryTagFindUniqueOrThrowArgs>(args: SelectSubset<T, FounderLogEntryTagFindUniqueOrThrowArgs<ExtArgs>>): Prisma__FounderLogEntryTagClient<$Result.GetResult<Prisma.$FounderLogEntryTagPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first FounderLogEntryTag that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FounderLogEntryTagFindFirstArgs} args - Arguments to find a FounderLogEntryTag
     * @example
     * // Get one FounderLogEntryTag
     * const founderLogEntryTag = await prisma.founderLogEntryTag.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends FounderLogEntryTagFindFirstArgs>(args?: SelectSubset<T, FounderLogEntryTagFindFirstArgs<ExtArgs>>): Prisma__FounderLogEntryTagClient<$Result.GetResult<Prisma.$FounderLogEntryTagPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first FounderLogEntryTag that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FounderLogEntryTagFindFirstOrThrowArgs} args - Arguments to find a FounderLogEntryTag
     * @example
     * // Get one FounderLogEntryTag
     * const founderLogEntryTag = await prisma.founderLogEntryTag.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends FounderLogEntryTagFindFirstOrThrowArgs>(args?: SelectSubset<T, FounderLogEntryTagFindFirstOrThrowArgs<ExtArgs>>): Prisma__FounderLogEntryTagClient<$Result.GetResult<Prisma.$FounderLogEntryTagPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more FounderLogEntryTags that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FounderLogEntryTagFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all FounderLogEntryTags
     * const founderLogEntryTags = await prisma.founderLogEntryTag.findMany()
     * 
     * // Get first 10 FounderLogEntryTags
     * const founderLogEntryTags = await prisma.founderLogEntryTag.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const founderLogEntryTagWithIdOnly = await prisma.founderLogEntryTag.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends FounderLogEntryTagFindManyArgs>(args?: SelectSubset<T, FounderLogEntryTagFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FounderLogEntryTagPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a FounderLogEntryTag.
     * @param {FounderLogEntryTagCreateArgs} args - Arguments to create a FounderLogEntryTag.
     * @example
     * // Create one FounderLogEntryTag
     * const FounderLogEntryTag = await prisma.founderLogEntryTag.create({
     *   data: {
     *     // ... data to create a FounderLogEntryTag
     *   }
     * })
     * 
     */
    create<T extends FounderLogEntryTagCreateArgs>(args: SelectSubset<T, FounderLogEntryTagCreateArgs<ExtArgs>>): Prisma__FounderLogEntryTagClient<$Result.GetResult<Prisma.$FounderLogEntryTagPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many FounderLogEntryTags.
     * @param {FounderLogEntryTagCreateManyArgs} args - Arguments to create many FounderLogEntryTags.
     * @example
     * // Create many FounderLogEntryTags
     * const founderLogEntryTag = await prisma.founderLogEntryTag.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends FounderLogEntryTagCreateManyArgs>(args?: SelectSubset<T, FounderLogEntryTagCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many FounderLogEntryTags and returns the data saved in the database.
     * @param {FounderLogEntryTagCreateManyAndReturnArgs} args - Arguments to create many FounderLogEntryTags.
     * @example
     * // Create many FounderLogEntryTags
     * const founderLogEntryTag = await prisma.founderLogEntryTag.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many FounderLogEntryTags and only return the `id`
     * const founderLogEntryTagWithIdOnly = await prisma.founderLogEntryTag.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends FounderLogEntryTagCreateManyAndReturnArgs>(args?: SelectSubset<T, FounderLogEntryTagCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FounderLogEntryTagPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a FounderLogEntryTag.
     * @param {FounderLogEntryTagDeleteArgs} args - Arguments to delete one FounderLogEntryTag.
     * @example
     * // Delete one FounderLogEntryTag
     * const FounderLogEntryTag = await prisma.founderLogEntryTag.delete({
     *   where: {
     *     // ... filter to delete one FounderLogEntryTag
     *   }
     * })
     * 
     */
    delete<T extends FounderLogEntryTagDeleteArgs>(args: SelectSubset<T, FounderLogEntryTagDeleteArgs<ExtArgs>>): Prisma__FounderLogEntryTagClient<$Result.GetResult<Prisma.$FounderLogEntryTagPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one FounderLogEntryTag.
     * @param {FounderLogEntryTagUpdateArgs} args - Arguments to update one FounderLogEntryTag.
     * @example
     * // Update one FounderLogEntryTag
     * const founderLogEntryTag = await prisma.founderLogEntryTag.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends FounderLogEntryTagUpdateArgs>(args: SelectSubset<T, FounderLogEntryTagUpdateArgs<ExtArgs>>): Prisma__FounderLogEntryTagClient<$Result.GetResult<Prisma.$FounderLogEntryTagPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more FounderLogEntryTags.
     * @param {FounderLogEntryTagDeleteManyArgs} args - Arguments to filter FounderLogEntryTags to delete.
     * @example
     * // Delete a few FounderLogEntryTags
     * const { count } = await prisma.founderLogEntryTag.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends FounderLogEntryTagDeleteManyArgs>(args?: SelectSubset<T, FounderLogEntryTagDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more FounderLogEntryTags.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FounderLogEntryTagUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many FounderLogEntryTags
     * const founderLogEntryTag = await prisma.founderLogEntryTag.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends FounderLogEntryTagUpdateManyArgs>(args: SelectSubset<T, FounderLogEntryTagUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more FounderLogEntryTags and returns the data updated in the database.
     * @param {FounderLogEntryTagUpdateManyAndReturnArgs} args - Arguments to update many FounderLogEntryTags.
     * @example
     * // Update many FounderLogEntryTags
     * const founderLogEntryTag = await prisma.founderLogEntryTag.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more FounderLogEntryTags and only return the `id`
     * const founderLogEntryTagWithIdOnly = await prisma.founderLogEntryTag.updateManyAndReturn({
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
    updateManyAndReturn<T extends FounderLogEntryTagUpdateManyAndReturnArgs>(args: SelectSubset<T, FounderLogEntryTagUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FounderLogEntryTagPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one FounderLogEntryTag.
     * @param {FounderLogEntryTagUpsertArgs} args - Arguments to update or create a FounderLogEntryTag.
     * @example
     * // Update or create a FounderLogEntryTag
     * const founderLogEntryTag = await prisma.founderLogEntryTag.upsert({
     *   create: {
     *     // ... data to create a FounderLogEntryTag
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the FounderLogEntryTag we want to update
     *   }
     * })
     */
    upsert<T extends FounderLogEntryTagUpsertArgs>(args: SelectSubset<T, FounderLogEntryTagUpsertArgs<ExtArgs>>): Prisma__FounderLogEntryTagClient<$Result.GetResult<Prisma.$FounderLogEntryTagPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of FounderLogEntryTags.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FounderLogEntryTagCountArgs} args - Arguments to filter FounderLogEntryTags to count.
     * @example
     * // Count the number of FounderLogEntryTags
     * const count = await prisma.founderLogEntryTag.count({
     *   where: {
     *     // ... the filter for the FounderLogEntryTags we want to count
     *   }
     * })
    **/
    count<T extends FounderLogEntryTagCountArgs>(
      args?: Subset<T, FounderLogEntryTagCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], FounderLogEntryTagCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a FounderLogEntryTag.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FounderLogEntryTagAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends FounderLogEntryTagAggregateArgs>(args: Subset<T, FounderLogEntryTagAggregateArgs>): Prisma.PrismaPromise<GetFounderLogEntryTagAggregateType<T>>

    /**
     * Group by FounderLogEntryTag.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FounderLogEntryTagGroupByArgs} args - Group by arguments.
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
      T extends FounderLogEntryTagGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: FounderLogEntryTagGroupByArgs['orderBy'] }
        : { orderBy?: FounderLogEntryTagGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, FounderLogEntryTagGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetFounderLogEntryTagGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the FounderLogEntryTag model
   */
  readonly fields: FounderLogEntryTagFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for FounderLogEntryTag.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__FounderLogEntryTagClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    entry<T extends FounderLogEntryDefaultArgs<ExtArgs> = {}>(args?: Subset<T, FounderLogEntryDefaultArgs<ExtArgs>>): Prisma__FounderLogEntryClient<$Result.GetResult<Prisma.$FounderLogEntryPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    tag<T extends FounderLogTagDefaultArgs<ExtArgs> = {}>(args?: Subset<T, FounderLogTagDefaultArgs<ExtArgs>>): Prisma__FounderLogTagClient<$Result.GetResult<Prisma.$FounderLogTagPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
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
   * Fields of the FounderLogEntryTag model
   */ 
  interface FounderLogEntryTagFieldRefs {
    readonly id: FieldRef<"FounderLogEntryTag", 'String'>
    readonly entryId: FieldRef<"FounderLogEntryTag", 'String'>
    readonly tagId: FieldRef<"FounderLogEntryTag", 'String'>
    readonly createdAt: FieldRef<"FounderLogEntryTag", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * FounderLogEntryTag findUnique
   */
  export type FounderLogEntryTagFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FounderLogEntryTag
     */
    select?: FounderLogEntryTagSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FounderLogEntryTag
     */
    omit?: FounderLogEntryTagOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FounderLogEntryTagInclude<ExtArgs> | null
    /**
     * Filter, which FounderLogEntryTag to fetch.
     */
    where: FounderLogEntryTagWhereUniqueInput
  }

  /**
   * FounderLogEntryTag findUniqueOrThrow
   */
  export type FounderLogEntryTagFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FounderLogEntryTag
     */
    select?: FounderLogEntryTagSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FounderLogEntryTag
     */
    omit?: FounderLogEntryTagOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FounderLogEntryTagInclude<ExtArgs> | null
    /**
     * Filter, which FounderLogEntryTag to fetch.
     */
    where: FounderLogEntryTagWhereUniqueInput
  }

  /**
   * FounderLogEntryTag findFirst
   */
  export type FounderLogEntryTagFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FounderLogEntryTag
     */
    select?: FounderLogEntryTagSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FounderLogEntryTag
     */
    omit?: FounderLogEntryTagOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FounderLogEntryTagInclude<ExtArgs> | null
    /**
     * Filter, which FounderLogEntryTag to fetch.
     */
    where?: FounderLogEntryTagWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of FounderLogEntryTags to fetch.
     */
    orderBy?: FounderLogEntryTagOrderByWithRelationInput | FounderLogEntryTagOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for FounderLogEntryTags.
     */
    cursor?: FounderLogEntryTagWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` FounderLogEntryTags from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` FounderLogEntryTags.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of FounderLogEntryTags.
     */
    distinct?: FounderLogEntryTagScalarFieldEnum | FounderLogEntryTagScalarFieldEnum[]
  }

  /**
   * FounderLogEntryTag findFirstOrThrow
   */
  export type FounderLogEntryTagFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FounderLogEntryTag
     */
    select?: FounderLogEntryTagSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FounderLogEntryTag
     */
    omit?: FounderLogEntryTagOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FounderLogEntryTagInclude<ExtArgs> | null
    /**
     * Filter, which FounderLogEntryTag to fetch.
     */
    where?: FounderLogEntryTagWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of FounderLogEntryTags to fetch.
     */
    orderBy?: FounderLogEntryTagOrderByWithRelationInput | FounderLogEntryTagOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for FounderLogEntryTags.
     */
    cursor?: FounderLogEntryTagWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` FounderLogEntryTags from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` FounderLogEntryTags.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of FounderLogEntryTags.
     */
    distinct?: FounderLogEntryTagScalarFieldEnum | FounderLogEntryTagScalarFieldEnum[]
  }

  /**
   * FounderLogEntryTag findMany
   */
  export type FounderLogEntryTagFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FounderLogEntryTag
     */
    select?: FounderLogEntryTagSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FounderLogEntryTag
     */
    omit?: FounderLogEntryTagOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FounderLogEntryTagInclude<ExtArgs> | null
    /**
     * Filter, which FounderLogEntryTags to fetch.
     */
    where?: FounderLogEntryTagWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of FounderLogEntryTags to fetch.
     */
    orderBy?: FounderLogEntryTagOrderByWithRelationInput | FounderLogEntryTagOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing FounderLogEntryTags.
     */
    cursor?: FounderLogEntryTagWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` FounderLogEntryTags from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` FounderLogEntryTags.
     */
    skip?: number
    distinct?: FounderLogEntryTagScalarFieldEnum | FounderLogEntryTagScalarFieldEnum[]
  }

  /**
   * FounderLogEntryTag create
   */
  export type FounderLogEntryTagCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FounderLogEntryTag
     */
    select?: FounderLogEntryTagSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FounderLogEntryTag
     */
    omit?: FounderLogEntryTagOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FounderLogEntryTagInclude<ExtArgs> | null
    /**
     * The data needed to create a FounderLogEntryTag.
     */
    data: XOR<FounderLogEntryTagCreateInput, FounderLogEntryTagUncheckedCreateInput>
  }

  /**
   * FounderLogEntryTag createMany
   */
  export type FounderLogEntryTagCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many FounderLogEntryTags.
     */
    data: FounderLogEntryTagCreateManyInput | FounderLogEntryTagCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * FounderLogEntryTag createManyAndReturn
   */
  export type FounderLogEntryTagCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FounderLogEntryTag
     */
    select?: FounderLogEntryTagSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the FounderLogEntryTag
     */
    omit?: FounderLogEntryTagOmit<ExtArgs> | null
    /**
     * The data used to create many FounderLogEntryTags.
     */
    data: FounderLogEntryTagCreateManyInput | FounderLogEntryTagCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FounderLogEntryTagIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * FounderLogEntryTag update
   */
  export type FounderLogEntryTagUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FounderLogEntryTag
     */
    select?: FounderLogEntryTagSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FounderLogEntryTag
     */
    omit?: FounderLogEntryTagOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FounderLogEntryTagInclude<ExtArgs> | null
    /**
     * The data needed to update a FounderLogEntryTag.
     */
    data: XOR<FounderLogEntryTagUpdateInput, FounderLogEntryTagUncheckedUpdateInput>
    /**
     * Choose, which FounderLogEntryTag to update.
     */
    where: FounderLogEntryTagWhereUniqueInput
  }

  /**
   * FounderLogEntryTag updateMany
   */
  export type FounderLogEntryTagUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update FounderLogEntryTags.
     */
    data: XOR<FounderLogEntryTagUpdateManyMutationInput, FounderLogEntryTagUncheckedUpdateManyInput>
    /**
     * Filter which FounderLogEntryTags to update
     */
    where?: FounderLogEntryTagWhereInput
    /**
     * Limit how many FounderLogEntryTags to update.
     */
    limit?: number
  }

  /**
   * FounderLogEntryTag updateManyAndReturn
   */
  export type FounderLogEntryTagUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FounderLogEntryTag
     */
    select?: FounderLogEntryTagSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the FounderLogEntryTag
     */
    omit?: FounderLogEntryTagOmit<ExtArgs> | null
    /**
     * The data used to update FounderLogEntryTags.
     */
    data: XOR<FounderLogEntryTagUpdateManyMutationInput, FounderLogEntryTagUncheckedUpdateManyInput>
    /**
     * Filter which FounderLogEntryTags to update
     */
    where?: FounderLogEntryTagWhereInput
    /**
     * Limit how many FounderLogEntryTags to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FounderLogEntryTagIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * FounderLogEntryTag upsert
   */
  export type FounderLogEntryTagUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FounderLogEntryTag
     */
    select?: FounderLogEntryTagSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FounderLogEntryTag
     */
    omit?: FounderLogEntryTagOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FounderLogEntryTagInclude<ExtArgs> | null
    /**
     * The filter to search for the FounderLogEntryTag to update in case it exists.
     */
    where: FounderLogEntryTagWhereUniqueInput
    /**
     * In case the FounderLogEntryTag found by the `where` argument doesn't exist, create a new FounderLogEntryTag with this data.
     */
    create: XOR<FounderLogEntryTagCreateInput, FounderLogEntryTagUncheckedCreateInput>
    /**
     * In case the FounderLogEntryTag was found with the provided `where` argument, update it with this data.
     */
    update: XOR<FounderLogEntryTagUpdateInput, FounderLogEntryTagUncheckedUpdateInput>
  }

  /**
   * FounderLogEntryTag delete
   */
  export type FounderLogEntryTagDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FounderLogEntryTag
     */
    select?: FounderLogEntryTagSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FounderLogEntryTag
     */
    omit?: FounderLogEntryTagOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FounderLogEntryTagInclude<ExtArgs> | null
    /**
     * Filter which FounderLogEntryTag to delete.
     */
    where: FounderLogEntryTagWhereUniqueInput
  }

  /**
   * FounderLogEntryTag deleteMany
   */
  export type FounderLogEntryTagDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which FounderLogEntryTags to delete
     */
    where?: FounderLogEntryTagWhereInput
    /**
     * Limit how many FounderLogEntryTags to delete.
     */
    limit?: number
  }

  /**
   * FounderLogEntryTag without action
   */
  export type FounderLogEntryTagDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FounderLogEntryTag
     */
    select?: FounderLogEntryTagSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FounderLogEntryTag
     */
    omit?: FounderLogEntryTagOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FounderLogEntryTagInclude<ExtArgs> | null
  }


  /**
   * Model FounderLogReflection
   */

  export type AggregateFounderLogReflection = {
    _count: FounderLogReflectionCountAggregateOutputType | null
    _min: FounderLogReflectionMinAggregateOutputType | null
    _max: FounderLogReflectionMaxAggregateOutputType | null
  }

  export type FounderLogReflectionMinAggregateOutputType = {
    id: string | null
    userId: string | null
    type: string | null
    content: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type FounderLogReflectionMaxAggregateOutputType = {
    id: string | null
    userId: string | null
    type: string | null
    content: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type FounderLogReflectionCountAggregateOutputType = {
    id: number
    userId: number
    type: number
    content: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type FounderLogReflectionMinAggregateInputType = {
    id?: true
    userId?: true
    type?: true
    content?: true
    createdAt?: true
    updatedAt?: true
  }

  export type FounderLogReflectionMaxAggregateInputType = {
    id?: true
    userId?: true
    type?: true
    content?: true
    createdAt?: true
    updatedAt?: true
  }

  export type FounderLogReflectionCountAggregateInputType = {
    id?: true
    userId?: true
    type?: true
    content?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type FounderLogReflectionAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which FounderLogReflection to aggregate.
     */
    where?: FounderLogReflectionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of FounderLogReflections to fetch.
     */
    orderBy?: FounderLogReflectionOrderByWithRelationInput | FounderLogReflectionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: FounderLogReflectionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` FounderLogReflections from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` FounderLogReflections.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned FounderLogReflections
    **/
    _count?: true | FounderLogReflectionCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: FounderLogReflectionMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: FounderLogReflectionMaxAggregateInputType
  }

  export type GetFounderLogReflectionAggregateType<T extends FounderLogReflectionAggregateArgs> = {
        [P in keyof T & keyof AggregateFounderLogReflection]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateFounderLogReflection[P]>
      : GetScalarType<T[P], AggregateFounderLogReflection[P]>
  }




  export type FounderLogReflectionGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: FounderLogReflectionWhereInput
    orderBy?: FounderLogReflectionOrderByWithAggregationInput | FounderLogReflectionOrderByWithAggregationInput[]
    by: FounderLogReflectionScalarFieldEnum[] | FounderLogReflectionScalarFieldEnum
    having?: FounderLogReflectionScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: FounderLogReflectionCountAggregateInputType | true
    _min?: FounderLogReflectionMinAggregateInputType
    _max?: FounderLogReflectionMaxAggregateInputType
  }

  export type FounderLogReflectionGroupByOutputType = {
    id: string
    userId: string
    type: string
    content: string
    createdAt: Date
    updatedAt: Date
    _count: FounderLogReflectionCountAggregateOutputType | null
    _min: FounderLogReflectionMinAggregateOutputType | null
    _max: FounderLogReflectionMaxAggregateOutputType | null
  }

  type GetFounderLogReflectionGroupByPayload<T extends FounderLogReflectionGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<FounderLogReflectionGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof FounderLogReflectionGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], FounderLogReflectionGroupByOutputType[P]>
            : GetScalarType<T[P], FounderLogReflectionGroupByOutputType[P]>
        }
      >
    >


  export type FounderLogReflectionSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    type?: boolean
    content?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["founderLogReflection"]>

  export type FounderLogReflectionSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    type?: boolean
    content?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["founderLogReflection"]>

  export type FounderLogReflectionSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    type?: boolean
    content?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["founderLogReflection"]>

  export type FounderLogReflectionSelectScalar = {
    id?: boolean
    userId?: boolean
    type?: boolean
    content?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type FounderLogReflectionOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "userId" | "type" | "content" | "createdAt" | "updatedAt", ExtArgs["result"]["founderLogReflection"]>
  export type FounderLogReflectionInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type FounderLogReflectionIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type FounderLogReflectionIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $FounderLogReflectionPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "FounderLogReflection"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      userId: string
      type: string
      content: string
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["founderLogReflection"]>
    composites: {}
  }

  type FounderLogReflectionGetPayload<S extends boolean | null | undefined | FounderLogReflectionDefaultArgs> = $Result.GetResult<Prisma.$FounderLogReflectionPayload, S>

  type FounderLogReflectionCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<FounderLogReflectionFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: FounderLogReflectionCountAggregateInputType | true
    }

  export interface FounderLogReflectionDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['FounderLogReflection'], meta: { name: 'FounderLogReflection' } }
    /**
     * Find zero or one FounderLogReflection that matches the filter.
     * @param {FounderLogReflectionFindUniqueArgs} args - Arguments to find a FounderLogReflection
     * @example
     * // Get one FounderLogReflection
     * const founderLogReflection = await prisma.founderLogReflection.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends FounderLogReflectionFindUniqueArgs>(args: SelectSubset<T, FounderLogReflectionFindUniqueArgs<ExtArgs>>): Prisma__FounderLogReflectionClient<$Result.GetResult<Prisma.$FounderLogReflectionPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one FounderLogReflection that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {FounderLogReflectionFindUniqueOrThrowArgs} args - Arguments to find a FounderLogReflection
     * @example
     * // Get one FounderLogReflection
     * const founderLogReflection = await prisma.founderLogReflection.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends FounderLogReflectionFindUniqueOrThrowArgs>(args: SelectSubset<T, FounderLogReflectionFindUniqueOrThrowArgs<ExtArgs>>): Prisma__FounderLogReflectionClient<$Result.GetResult<Prisma.$FounderLogReflectionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first FounderLogReflection that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FounderLogReflectionFindFirstArgs} args - Arguments to find a FounderLogReflection
     * @example
     * // Get one FounderLogReflection
     * const founderLogReflection = await prisma.founderLogReflection.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends FounderLogReflectionFindFirstArgs>(args?: SelectSubset<T, FounderLogReflectionFindFirstArgs<ExtArgs>>): Prisma__FounderLogReflectionClient<$Result.GetResult<Prisma.$FounderLogReflectionPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first FounderLogReflection that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FounderLogReflectionFindFirstOrThrowArgs} args - Arguments to find a FounderLogReflection
     * @example
     * // Get one FounderLogReflection
     * const founderLogReflection = await prisma.founderLogReflection.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends FounderLogReflectionFindFirstOrThrowArgs>(args?: SelectSubset<T, FounderLogReflectionFindFirstOrThrowArgs<ExtArgs>>): Prisma__FounderLogReflectionClient<$Result.GetResult<Prisma.$FounderLogReflectionPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more FounderLogReflections that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FounderLogReflectionFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all FounderLogReflections
     * const founderLogReflections = await prisma.founderLogReflection.findMany()
     * 
     * // Get first 10 FounderLogReflections
     * const founderLogReflections = await prisma.founderLogReflection.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const founderLogReflectionWithIdOnly = await prisma.founderLogReflection.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends FounderLogReflectionFindManyArgs>(args?: SelectSubset<T, FounderLogReflectionFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FounderLogReflectionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a FounderLogReflection.
     * @param {FounderLogReflectionCreateArgs} args - Arguments to create a FounderLogReflection.
     * @example
     * // Create one FounderLogReflection
     * const FounderLogReflection = await prisma.founderLogReflection.create({
     *   data: {
     *     // ... data to create a FounderLogReflection
     *   }
     * })
     * 
     */
    create<T extends FounderLogReflectionCreateArgs>(args: SelectSubset<T, FounderLogReflectionCreateArgs<ExtArgs>>): Prisma__FounderLogReflectionClient<$Result.GetResult<Prisma.$FounderLogReflectionPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many FounderLogReflections.
     * @param {FounderLogReflectionCreateManyArgs} args - Arguments to create many FounderLogReflections.
     * @example
     * // Create many FounderLogReflections
     * const founderLogReflection = await prisma.founderLogReflection.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends FounderLogReflectionCreateManyArgs>(args?: SelectSubset<T, FounderLogReflectionCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many FounderLogReflections and returns the data saved in the database.
     * @param {FounderLogReflectionCreateManyAndReturnArgs} args - Arguments to create many FounderLogReflections.
     * @example
     * // Create many FounderLogReflections
     * const founderLogReflection = await prisma.founderLogReflection.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many FounderLogReflections and only return the `id`
     * const founderLogReflectionWithIdOnly = await prisma.founderLogReflection.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends FounderLogReflectionCreateManyAndReturnArgs>(args?: SelectSubset<T, FounderLogReflectionCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FounderLogReflectionPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a FounderLogReflection.
     * @param {FounderLogReflectionDeleteArgs} args - Arguments to delete one FounderLogReflection.
     * @example
     * // Delete one FounderLogReflection
     * const FounderLogReflection = await prisma.founderLogReflection.delete({
     *   where: {
     *     // ... filter to delete one FounderLogReflection
     *   }
     * })
     * 
     */
    delete<T extends FounderLogReflectionDeleteArgs>(args: SelectSubset<T, FounderLogReflectionDeleteArgs<ExtArgs>>): Prisma__FounderLogReflectionClient<$Result.GetResult<Prisma.$FounderLogReflectionPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one FounderLogReflection.
     * @param {FounderLogReflectionUpdateArgs} args - Arguments to update one FounderLogReflection.
     * @example
     * // Update one FounderLogReflection
     * const founderLogReflection = await prisma.founderLogReflection.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends FounderLogReflectionUpdateArgs>(args: SelectSubset<T, FounderLogReflectionUpdateArgs<ExtArgs>>): Prisma__FounderLogReflectionClient<$Result.GetResult<Prisma.$FounderLogReflectionPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more FounderLogReflections.
     * @param {FounderLogReflectionDeleteManyArgs} args - Arguments to filter FounderLogReflections to delete.
     * @example
     * // Delete a few FounderLogReflections
     * const { count } = await prisma.founderLogReflection.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends FounderLogReflectionDeleteManyArgs>(args?: SelectSubset<T, FounderLogReflectionDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more FounderLogReflections.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FounderLogReflectionUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many FounderLogReflections
     * const founderLogReflection = await prisma.founderLogReflection.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends FounderLogReflectionUpdateManyArgs>(args: SelectSubset<T, FounderLogReflectionUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more FounderLogReflections and returns the data updated in the database.
     * @param {FounderLogReflectionUpdateManyAndReturnArgs} args - Arguments to update many FounderLogReflections.
     * @example
     * // Update many FounderLogReflections
     * const founderLogReflection = await prisma.founderLogReflection.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more FounderLogReflections and only return the `id`
     * const founderLogReflectionWithIdOnly = await prisma.founderLogReflection.updateManyAndReturn({
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
    updateManyAndReturn<T extends FounderLogReflectionUpdateManyAndReturnArgs>(args: SelectSubset<T, FounderLogReflectionUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FounderLogReflectionPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one FounderLogReflection.
     * @param {FounderLogReflectionUpsertArgs} args - Arguments to update or create a FounderLogReflection.
     * @example
     * // Update or create a FounderLogReflection
     * const founderLogReflection = await prisma.founderLogReflection.upsert({
     *   create: {
     *     // ... data to create a FounderLogReflection
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the FounderLogReflection we want to update
     *   }
     * })
     */
    upsert<T extends FounderLogReflectionUpsertArgs>(args: SelectSubset<T, FounderLogReflectionUpsertArgs<ExtArgs>>): Prisma__FounderLogReflectionClient<$Result.GetResult<Prisma.$FounderLogReflectionPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of FounderLogReflections.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FounderLogReflectionCountArgs} args - Arguments to filter FounderLogReflections to count.
     * @example
     * // Count the number of FounderLogReflections
     * const count = await prisma.founderLogReflection.count({
     *   where: {
     *     // ... the filter for the FounderLogReflections we want to count
     *   }
     * })
    **/
    count<T extends FounderLogReflectionCountArgs>(
      args?: Subset<T, FounderLogReflectionCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], FounderLogReflectionCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a FounderLogReflection.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FounderLogReflectionAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends FounderLogReflectionAggregateArgs>(args: Subset<T, FounderLogReflectionAggregateArgs>): Prisma.PrismaPromise<GetFounderLogReflectionAggregateType<T>>

    /**
     * Group by FounderLogReflection.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FounderLogReflectionGroupByArgs} args - Group by arguments.
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
      T extends FounderLogReflectionGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: FounderLogReflectionGroupByArgs['orderBy'] }
        : { orderBy?: FounderLogReflectionGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, FounderLogReflectionGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetFounderLogReflectionGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the FounderLogReflection model
   */
  readonly fields: FounderLogReflectionFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for FounderLogReflection.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__FounderLogReflectionClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
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
   * Fields of the FounderLogReflection model
   */ 
  interface FounderLogReflectionFieldRefs {
    readonly id: FieldRef<"FounderLogReflection", 'String'>
    readonly userId: FieldRef<"FounderLogReflection", 'String'>
    readonly type: FieldRef<"FounderLogReflection", 'String'>
    readonly content: FieldRef<"FounderLogReflection", 'String'>
    readonly createdAt: FieldRef<"FounderLogReflection", 'DateTime'>
    readonly updatedAt: FieldRef<"FounderLogReflection", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * FounderLogReflection findUnique
   */
  export type FounderLogReflectionFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FounderLogReflection
     */
    select?: FounderLogReflectionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FounderLogReflection
     */
    omit?: FounderLogReflectionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FounderLogReflectionInclude<ExtArgs> | null
    /**
     * Filter, which FounderLogReflection to fetch.
     */
    where: FounderLogReflectionWhereUniqueInput
  }

  /**
   * FounderLogReflection findUniqueOrThrow
   */
  export type FounderLogReflectionFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FounderLogReflection
     */
    select?: FounderLogReflectionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FounderLogReflection
     */
    omit?: FounderLogReflectionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FounderLogReflectionInclude<ExtArgs> | null
    /**
     * Filter, which FounderLogReflection to fetch.
     */
    where: FounderLogReflectionWhereUniqueInput
  }

  /**
   * FounderLogReflection findFirst
   */
  export type FounderLogReflectionFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FounderLogReflection
     */
    select?: FounderLogReflectionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FounderLogReflection
     */
    omit?: FounderLogReflectionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FounderLogReflectionInclude<ExtArgs> | null
    /**
     * Filter, which FounderLogReflection to fetch.
     */
    where?: FounderLogReflectionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of FounderLogReflections to fetch.
     */
    orderBy?: FounderLogReflectionOrderByWithRelationInput | FounderLogReflectionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for FounderLogReflections.
     */
    cursor?: FounderLogReflectionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` FounderLogReflections from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` FounderLogReflections.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of FounderLogReflections.
     */
    distinct?: FounderLogReflectionScalarFieldEnum | FounderLogReflectionScalarFieldEnum[]
  }

  /**
   * FounderLogReflection findFirstOrThrow
   */
  export type FounderLogReflectionFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FounderLogReflection
     */
    select?: FounderLogReflectionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FounderLogReflection
     */
    omit?: FounderLogReflectionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FounderLogReflectionInclude<ExtArgs> | null
    /**
     * Filter, which FounderLogReflection to fetch.
     */
    where?: FounderLogReflectionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of FounderLogReflections to fetch.
     */
    orderBy?: FounderLogReflectionOrderByWithRelationInput | FounderLogReflectionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for FounderLogReflections.
     */
    cursor?: FounderLogReflectionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` FounderLogReflections from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` FounderLogReflections.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of FounderLogReflections.
     */
    distinct?: FounderLogReflectionScalarFieldEnum | FounderLogReflectionScalarFieldEnum[]
  }

  /**
   * FounderLogReflection findMany
   */
  export type FounderLogReflectionFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FounderLogReflection
     */
    select?: FounderLogReflectionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FounderLogReflection
     */
    omit?: FounderLogReflectionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FounderLogReflectionInclude<ExtArgs> | null
    /**
     * Filter, which FounderLogReflections to fetch.
     */
    where?: FounderLogReflectionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of FounderLogReflections to fetch.
     */
    orderBy?: FounderLogReflectionOrderByWithRelationInput | FounderLogReflectionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing FounderLogReflections.
     */
    cursor?: FounderLogReflectionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` FounderLogReflections from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` FounderLogReflections.
     */
    skip?: number
    distinct?: FounderLogReflectionScalarFieldEnum | FounderLogReflectionScalarFieldEnum[]
  }

  /**
   * FounderLogReflection create
   */
  export type FounderLogReflectionCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FounderLogReflection
     */
    select?: FounderLogReflectionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FounderLogReflection
     */
    omit?: FounderLogReflectionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FounderLogReflectionInclude<ExtArgs> | null
    /**
     * The data needed to create a FounderLogReflection.
     */
    data: XOR<FounderLogReflectionCreateInput, FounderLogReflectionUncheckedCreateInput>
  }

  /**
   * FounderLogReflection createMany
   */
  export type FounderLogReflectionCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many FounderLogReflections.
     */
    data: FounderLogReflectionCreateManyInput | FounderLogReflectionCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * FounderLogReflection createManyAndReturn
   */
  export type FounderLogReflectionCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FounderLogReflection
     */
    select?: FounderLogReflectionSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the FounderLogReflection
     */
    omit?: FounderLogReflectionOmit<ExtArgs> | null
    /**
     * The data used to create many FounderLogReflections.
     */
    data: FounderLogReflectionCreateManyInput | FounderLogReflectionCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FounderLogReflectionIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * FounderLogReflection update
   */
  export type FounderLogReflectionUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FounderLogReflection
     */
    select?: FounderLogReflectionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FounderLogReflection
     */
    omit?: FounderLogReflectionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FounderLogReflectionInclude<ExtArgs> | null
    /**
     * The data needed to update a FounderLogReflection.
     */
    data: XOR<FounderLogReflectionUpdateInput, FounderLogReflectionUncheckedUpdateInput>
    /**
     * Choose, which FounderLogReflection to update.
     */
    where: FounderLogReflectionWhereUniqueInput
  }

  /**
   * FounderLogReflection updateMany
   */
  export type FounderLogReflectionUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update FounderLogReflections.
     */
    data: XOR<FounderLogReflectionUpdateManyMutationInput, FounderLogReflectionUncheckedUpdateManyInput>
    /**
     * Filter which FounderLogReflections to update
     */
    where?: FounderLogReflectionWhereInput
    /**
     * Limit how many FounderLogReflections to update.
     */
    limit?: number
  }

  /**
   * FounderLogReflection updateManyAndReturn
   */
  export type FounderLogReflectionUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FounderLogReflection
     */
    select?: FounderLogReflectionSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the FounderLogReflection
     */
    omit?: FounderLogReflectionOmit<ExtArgs> | null
    /**
     * The data used to update FounderLogReflections.
     */
    data: XOR<FounderLogReflectionUpdateManyMutationInput, FounderLogReflectionUncheckedUpdateManyInput>
    /**
     * Filter which FounderLogReflections to update
     */
    where?: FounderLogReflectionWhereInput
    /**
     * Limit how many FounderLogReflections to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FounderLogReflectionIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * FounderLogReflection upsert
   */
  export type FounderLogReflectionUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FounderLogReflection
     */
    select?: FounderLogReflectionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FounderLogReflection
     */
    omit?: FounderLogReflectionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FounderLogReflectionInclude<ExtArgs> | null
    /**
     * The filter to search for the FounderLogReflection to update in case it exists.
     */
    where: FounderLogReflectionWhereUniqueInput
    /**
     * In case the FounderLogReflection found by the `where` argument doesn't exist, create a new FounderLogReflection with this data.
     */
    create: XOR<FounderLogReflectionCreateInput, FounderLogReflectionUncheckedCreateInput>
    /**
     * In case the FounderLogReflection was found with the provided `where` argument, update it with this data.
     */
    update: XOR<FounderLogReflectionUpdateInput, FounderLogReflectionUncheckedUpdateInput>
  }

  /**
   * FounderLogReflection delete
   */
  export type FounderLogReflectionDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FounderLogReflection
     */
    select?: FounderLogReflectionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FounderLogReflection
     */
    omit?: FounderLogReflectionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FounderLogReflectionInclude<ExtArgs> | null
    /**
     * Filter which FounderLogReflection to delete.
     */
    where: FounderLogReflectionWhereUniqueInput
  }

  /**
   * FounderLogReflection deleteMany
   */
  export type FounderLogReflectionDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which FounderLogReflections to delete
     */
    where?: FounderLogReflectionWhereInput
    /**
     * Limit how many FounderLogReflections to delete.
     */
    limit?: number
  }

  /**
   * FounderLogReflection without action
   */
  export type FounderLogReflectionDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FounderLogReflection
     */
    select?: FounderLogReflectionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FounderLogReflection
     */
    omit?: FounderLogReflectionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FounderLogReflectionInclude<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const PostScalarFieldEnum: {
    id: 'id',
    title: 'title',
    content: 'content',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type PostScalarFieldEnum = (typeof PostScalarFieldEnum)[keyof typeof PostScalarFieldEnum]


  export const StripePaymentScalarFieldEnum: {
    id: 'id',
    clerkUserId: 'clerkUserId',
    amount: 'amount',
    currency: 'currency',
    status: 'status',
    stripePaymentId: 'stripePaymentId',
    metadata: 'metadata',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type StripePaymentScalarFieldEnum = (typeof StripePaymentScalarFieldEnum)[keyof typeof StripePaymentScalarFieldEnum]


  export const UserScalarFieldEnum: {
    id: 'id',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum]


  export const FounderLogTagScalarFieldEnum: {
    id: 'id',
    name: 'name',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type FounderLogTagScalarFieldEnum = (typeof FounderLogTagScalarFieldEnum)[keyof typeof FounderLogTagScalarFieldEnum]


  export const FounderLogEntryScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    content: 'content',
    upvoteCount: 'upvoteCount',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type FounderLogEntryScalarFieldEnum = (typeof FounderLogEntryScalarFieldEnum)[keyof typeof FounderLogEntryScalarFieldEnum]


  export const FounderLogEntryTagScalarFieldEnum: {
    id: 'id',
    entryId: 'entryId',
    tagId: 'tagId',
    createdAt: 'createdAt'
  };

  export type FounderLogEntryTagScalarFieldEnum = (typeof FounderLogEntryTagScalarFieldEnum)[keyof typeof FounderLogEntryTagScalarFieldEnum]


  export const FounderLogReflectionScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    type: 'type',
    content: 'content',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type FounderLogReflectionScalarFieldEnum = (typeof FounderLogReflectionScalarFieldEnum)[keyof typeof FounderLogReflectionScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const NullableJsonNullValueInput: {
    DbNull: typeof DbNull,
    JsonNull: typeof JsonNull
  };

  export type NullableJsonNullValueInput = (typeof NullableJsonNullValueInput)[keyof typeof NullableJsonNullValueInput]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const JsonNullValueFilter: {
    DbNull: typeof DbNull,
    JsonNull: typeof JsonNull,
    AnyNull: typeof AnyNull
  };

  export type JsonNullValueFilter = (typeof JsonNullValueFilter)[keyof typeof JsonNullValueFilter]


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
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'Json'
   */
  export type JsonFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Json'>
    


  /**
   * Reference to a field of type 'QueryMode'
   */
  export type EnumQueryModeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'QueryMode'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    
  /**
   * Deep Input Types
   */


  export type PostWhereInput = {
    AND?: PostWhereInput | PostWhereInput[]
    OR?: PostWhereInput[]
    NOT?: PostWhereInput | PostWhereInput[]
    id?: StringFilter<"Post"> | string
    title?: StringFilter<"Post"> | string
    content?: StringFilter<"Post"> | string
    createdAt?: DateTimeFilter<"Post"> | Date | string
    updatedAt?: DateTimeFilter<"Post"> | Date | string
  }

  export type PostOrderByWithRelationInput = {
    id?: SortOrder
    title?: SortOrder
    content?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type PostWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: PostWhereInput | PostWhereInput[]
    OR?: PostWhereInput[]
    NOT?: PostWhereInput | PostWhereInput[]
    title?: StringFilter<"Post"> | string
    content?: StringFilter<"Post"> | string
    createdAt?: DateTimeFilter<"Post"> | Date | string
    updatedAt?: DateTimeFilter<"Post"> | Date | string
  }, "id">

  export type PostOrderByWithAggregationInput = {
    id?: SortOrder
    title?: SortOrder
    content?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: PostCountOrderByAggregateInput
    _max?: PostMaxOrderByAggregateInput
    _min?: PostMinOrderByAggregateInput
  }

  export type PostScalarWhereWithAggregatesInput = {
    AND?: PostScalarWhereWithAggregatesInput | PostScalarWhereWithAggregatesInput[]
    OR?: PostScalarWhereWithAggregatesInput[]
    NOT?: PostScalarWhereWithAggregatesInput | PostScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Post"> | string
    title?: StringWithAggregatesFilter<"Post"> | string
    content?: StringWithAggregatesFilter<"Post"> | string
    createdAt?: DateTimeWithAggregatesFilter<"Post"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Post"> | Date | string
  }

  export type StripePaymentWhereInput = {
    AND?: StripePaymentWhereInput | StripePaymentWhereInput[]
    OR?: StripePaymentWhereInput[]
    NOT?: StripePaymentWhereInput | StripePaymentWhereInput[]
    id?: StringFilter<"StripePayment"> | string
    clerkUserId?: StringFilter<"StripePayment"> | string
    amount?: IntFilter<"StripePayment"> | number
    currency?: StringFilter<"StripePayment"> | string
    status?: StringFilter<"StripePayment"> | string
    stripePaymentId?: StringFilter<"StripePayment"> | string
    metadata?: JsonNullableFilter<"StripePayment">
    createdAt?: DateTimeFilter<"StripePayment"> | Date | string
    updatedAt?: DateTimeFilter<"StripePayment"> | Date | string
  }

  export type StripePaymentOrderByWithRelationInput = {
    id?: SortOrder
    clerkUserId?: SortOrder
    amount?: SortOrder
    currency?: SortOrder
    status?: SortOrder
    stripePaymentId?: SortOrder
    metadata?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type StripePaymentWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    stripePaymentId?: string
    AND?: StripePaymentWhereInput | StripePaymentWhereInput[]
    OR?: StripePaymentWhereInput[]
    NOT?: StripePaymentWhereInput | StripePaymentWhereInput[]
    clerkUserId?: StringFilter<"StripePayment"> | string
    amount?: IntFilter<"StripePayment"> | number
    currency?: StringFilter<"StripePayment"> | string
    status?: StringFilter<"StripePayment"> | string
    metadata?: JsonNullableFilter<"StripePayment">
    createdAt?: DateTimeFilter<"StripePayment"> | Date | string
    updatedAt?: DateTimeFilter<"StripePayment"> | Date | string
  }, "id" | "stripePaymentId">

  export type StripePaymentOrderByWithAggregationInput = {
    id?: SortOrder
    clerkUserId?: SortOrder
    amount?: SortOrder
    currency?: SortOrder
    status?: SortOrder
    stripePaymentId?: SortOrder
    metadata?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: StripePaymentCountOrderByAggregateInput
    _avg?: StripePaymentAvgOrderByAggregateInput
    _max?: StripePaymentMaxOrderByAggregateInput
    _min?: StripePaymentMinOrderByAggregateInput
    _sum?: StripePaymentSumOrderByAggregateInput
  }

  export type StripePaymentScalarWhereWithAggregatesInput = {
    AND?: StripePaymentScalarWhereWithAggregatesInput | StripePaymentScalarWhereWithAggregatesInput[]
    OR?: StripePaymentScalarWhereWithAggregatesInput[]
    NOT?: StripePaymentScalarWhereWithAggregatesInput | StripePaymentScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"StripePayment"> | string
    clerkUserId?: StringWithAggregatesFilter<"StripePayment"> | string
    amount?: IntWithAggregatesFilter<"StripePayment"> | number
    currency?: StringWithAggregatesFilter<"StripePayment"> | string
    status?: StringWithAggregatesFilter<"StripePayment"> | string
    stripePaymentId?: StringWithAggregatesFilter<"StripePayment"> | string
    metadata?: JsonNullableWithAggregatesFilter<"StripePayment">
    createdAt?: DateTimeWithAggregatesFilter<"StripePayment"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"StripePayment"> | Date | string
  }

  export type UserWhereInput = {
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    id?: StringFilter<"User"> | string
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    entries?: FounderLogEntryListRelationFilter
    reflections?: FounderLogReflectionListRelationFilter
  }

  export type UserOrderByWithRelationInput = {
    id?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    entries?: FounderLogEntryOrderByRelationAggregateInput
    reflections?: FounderLogReflectionOrderByRelationAggregateInput
  }

  export type UserWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    entries?: FounderLogEntryListRelationFilter
    reflections?: FounderLogReflectionListRelationFilter
  }, "id">

  export type UserOrderByWithAggregationInput = {
    id?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: UserCountOrderByAggregateInput
    _max?: UserMaxOrderByAggregateInput
    _min?: UserMinOrderByAggregateInput
  }

  export type UserScalarWhereWithAggregatesInput = {
    AND?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    OR?: UserScalarWhereWithAggregatesInput[]
    NOT?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"User"> | string
    createdAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
  }

  export type FounderLogTagWhereInput = {
    AND?: FounderLogTagWhereInput | FounderLogTagWhereInput[]
    OR?: FounderLogTagWhereInput[]
    NOT?: FounderLogTagWhereInput | FounderLogTagWhereInput[]
    id?: StringFilter<"FounderLogTag"> | string
    name?: StringFilter<"FounderLogTag"> | string
    createdAt?: DateTimeFilter<"FounderLogTag"> | Date | string
    updatedAt?: DateTimeFilter<"FounderLogTag"> | Date | string
    entries?: FounderLogEntryTagListRelationFilter
  }

  export type FounderLogTagOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    entries?: FounderLogEntryTagOrderByRelationAggregateInput
  }

  export type FounderLogTagWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    name?: string
    AND?: FounderLogTagWhereInput | FounderLogTagWhereInput[]
    OR?: FounderLogTagWhereInput[]
    NOT?: FounderLogTagWhereInput | FounderLogTagWhereInput[]
    createdAt?: DateTimeFilter<"FounderLogTag"> | Date | string
    updatedAt?: DateTimeFilter<"FounderLogTag"> | Date | string
    entries?: FounderLogEntryTagListRelationFilter
  }, "id" | "name">

  export type FounderLogTagOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: FounderLogTagCountOrderByAggregateInput
    _max?: FounderLogTagMaxOrderByAggregateInput
    _min?: FounderLogTagMinOrderByAggregateInput
  }

  export type FounderLogTagScalarWhereWithAggregatesInput = {
    AND?: FounderLogTagScalarWhereWithAggregatesInput | FounderLogTagScalarWhereWithAggregatesInput[]
    OR?: FounderLogTagScalarWhereWithAggregatesInput[]
    NOT?: FounderLogTagScalarWhereWithAggregatesInput | FounderLogTagScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"FounderLogTag"> | string
    name?: StringWithAggregatesFilter<"FounderLogTag"> | string
    createdAt?: DateTimeWithAggregatesFilter<"FounderLogTag"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"FounderLogTag"> | Date | string
  }

  export type FounderLogEntryWhereInput = {
    AND?: FounderLogEntryWhereInput | FounderLogEntryWhereInput[]
    OR?: FounderLogEntryWhereInput[]
    NOT?: FounderLogEntryWhereInput | FounderLogEntryWhereInput[]
    id?: StringFilter<"FounderLogEntry"> | string
    userId?: StringFilter<"FounderLogEntry"> | string
    content?: StringFilter<"FounderLogEntry"> | string
    upvoteCount?: IntFilter<"FounderLogEntry"> | number
    createdAt?: DateTimeFilter<"FounderLogEntry"> | Date | string
    updatedAt?: DateTimeFilter<"FounderLogEntry"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    tags?: FounderLogEntryTagListRelationFilter
  }

  export type FounderLogEntryOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    content?: SortOrder
    upvoteCount?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    user?: UserOrderByWithRelationInput
    tags?: FounderLogEntryTagOrderByRelationAggregateInput
  }

  export type FounderLogEntryWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: FounderLogEntryWhereInput | FounderLogEntryWhereInput[]
    OR?: FounderLogEntryWhereInput[]
    NOT?: FounderLogEntryWhereInput | FounderLogEntryWhereInput[]
    userId?: StringFilter<"FounderLogEntry"> | string
    content?: StringFilter<"FounderLogEntry"> | string
    upvoteCount?: IntFilter<"FounderLogEntry"> | number
    createdAt?: DateTimeFilter<"FounderLogEntry"> | Date | string
    updatedAt?: DateTimeFilter<"FounderLogEntry"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    tags?: FounderLogEntryTagListRelationFilter
  }, "id">

  export type FounderLogEntryOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    content?: SortOrder
    upvoteCount?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: FounderLogEntryCountOrderByAggregateInput
    _avg?: FounderLogEntryAvgOrderByAggregateInput
    _max?: FounderLogEntryMaxOrderByAggregateInput
    _min?: FounderLogEntryMinOrderByAggregateInput
    _sum?: FounderLogEntrySumOrderByAggregateInput
  }

  export type FounderLogEntryScalarWhereWithAggregatesInput = {
    AND?: FounderLogEntryScalarWhereWithAggregatesInput | FounderLogEntryScalarWhereWithAggregatesInput[]
    OR?: FounderLogEntryScalarWhereWithAggregatesInput[]
    NOT?: FounderLogEntryScalarWhereWithAggregatesInput | FounderLogEntryScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"FounderLogEntry"> | string
    userId?: StringWithAggregatesFilter<"FounderLogEntry"> | string
    content?: StringWithAggregatesFilter<"FounderLogEntry"> | string
    upvoteCount?: IntWithAggregatesFilter<"FounderLogEntry"> | number
    createdAt?: DateTimeWithAggregatesFilter<"FounderLogEntry"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"FounderLogEntry"> | Date | string
  }

  export type FounderLogEntryTagWhereInput = {
    AND?: FounderLogEntryTagWhereInput | FounderLogEntryTagWhereInput[]
    OR?: FounderLogEntryTagWhereInput[]
    NOT?: FounderLogEntryTagWhereInput | FounderLogEntryTagWhereInput[]
    id?: StringFilter<"FounderLogEntryTag"> | string
    entryId?: StringFilter<"FounderLogEntryTag"> | string
    tagId?: StringFilter<"FounderLogEntryTag"> | string
    createdAt?: DateTimeFilter<"FounderLogEntryTag"> | Date | string
    entry?: XOR<FounderLogEntryScalarRelationFilter, FounderLogEntryWhereInput>
    tag?: XOR<FounderLogTagScalarRelationFilter, FounderLogTagWhereInput>
  }

  export type FounderLogEntryTagOrderByWithRelationInput = {
    id?: SortOrder
    entryId?: SortOrder
    tagId?: SortOrder
    createdAt?: SortOrder
    entry?: FounderLogEntryOrderByWithRelationInput
    tag?: FounderLogTagOrderByWithRelationInput
  }

  export type FounderLogEntryTagWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    entryId_tagId?: FounderLogEntryTagEntryIdTagIdCompoundUniqueInput
    AND?: FounderLogEntryTagWhereInput | FounderLogEntryTagWhereInput[]
    OR?: FounderLogEntryTagWhereInput[]
    NOT?: FounderLogEntryTagWhereInput | FounderLogEntryTagWhereInput[]
    entryId?: StringFilter<"FounderLogEntryTag"> | string
    tagId?: StringFilter<"FounderLogEntryTag"> | string
    createdAt?: DateTimeFilter<"FounderLogEntryTag"> | Date | string
    entry?: XOR<FounderLogEntryScalarRelationFilter, FounderLogEntryWhereInput>
    tag?: XOR<FounderLogTagScalarRelationFilter, FounderLogTagWhereInput>
  }, "id" | "entryId_tagId">

  export type FounderLogEntryTagOrderByWithAggregationInput = {
    id?: SortOrder
    entryId?: SortOrder
    tagId?: SortOrder
    createdAt?: SortOrder
    _count?: FounderLogEntryTagCountOrderByAggregateInput
    _max?: FounderLogEntryTagMaxOrderByAggregateInput
    _min?: FounderLogEntryTagMinOrderByAggregateInput
  }

  export type FounderLogEntryTagScalarWhereWithAggregatesInput = {
    AND?: FounderLogEntryTagScalarWhereWithAggregatesInput | FounderLogEntryTagScalarWhereWithAggregatesInput[]
    OR?: FounderLogEntryTagScalarWhereWithAggregatesInput[]
    NOT?: FounderLogEntryTagScalarWhereWithAggregatesInput | FounderLogEntryTagScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"FounderLogEntryTag"> | string
    entryId?: StringWithAggregatesFilter<"FounderLogEntryTag"> | string
    tagId?: StringWithAggregatesFilter<"FounderLogEntryTag"> | string
    createdAt?: DateTimeWithAggregatesFilter<"FounderLogEntryTag"> | Date | string
  }

  export type FounderLogReflectionWhereInput = {
    AND?: FounderLogReflectionWhereInput | FounderLogReflectionWhereInput[]
    OR?: FounderLogReflectionWhereInput[]
    NOT?: FounderLogReflectionWhereInput | FounderLogReflectionWhereInput[]
    id?: StringFilter<"FounderLogReflection"> | string
    userId?: StringFilter<"FounderLogReflection"> | string
    type?: StringFilter<"FounderLogReflection"> | string
    content?: StringFilter<"FounderLogReflection"> | string
    createdAt?: DateTimeFilter<"FounderLogReflection"> | Date | string
    updatedAt?: DateTimeFilter<"FounderLogReflection"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type FounderLogReflectionOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    type?: SortOrder
    content?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    user?: UserOrderByWithRelationInput
  }

  export type FounderLogReflectionWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: FounderLogReflectionWhereInput | FounderLogReflectionWhereInput[]
    OR?: FounderLogReflectionWhereInput[]
    NOT?: FounderLogReflectionWhereInput | FounderLogReflectionWhereInput[]
    userId?: StringFilter<"FounderLogReflection"> | string
    type?: StringFilter<"FounderLogReflection"> | string
    content?: StringFilter<"FounderLogReflection"> | string
    createdAt?: DateTimeFilter<"FounderLogReflection"> | Date | string
    updatedAt?: DateTimeFilter<"FounderLogReflection"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "id">

  export type FounderLogReflectionOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    type?: SortOrder
    content?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: FounderLogReflectionCountOrderByAggregateInput
    _max?: FounderLogReflectionMaxOrderByAggregateInput
    _min?: FounderLogReflectionMinOrderByAggregateInput
  }

  export type FounderLogReflectionScalarWhereWithAggregatesInput = {
    AND?: FounderLogReflectionScalarWhereWithAggregatesInput | FounderLogReflectionScalarWhereWithAggregatesInput[]
    OR?: FounderLogReflectionScalarWhereWithAggregatesInput[]
    NOT?: FounderLogReflectionScalarWhereWithAggregatesInput | FounderLogReflectionScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"FounderLogReflection"> | string
    userId?: StringWithAggregatesFilter<"FounderLogReflection"> | string
    type?: StringWithAggregatesFilter<"FounderLogReflection"> | string
    content?: StringWithAggregatesFilter<"FounderLogReflection"> | string
    createdAt?: DateTimeWithAggregatesFilter<"FounderLogReflection"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"FounderLogReflection"> | Date | string
  }

  export type PostCreateInput = {
    id?: string
    title: string
    content: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type PostUncheckedCreateInput = {
    id?: string
    title: string
    content: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type PostUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PostUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PostCreateManyInput = {
    id?: string
    title: string
    content: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type PostUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PostUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StripePaymentCreateInput = {
    id?: string
    clerkUserId: string
    amount: number
    currency?: string
    status: string
    stripePaymentId: string
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type StripePaymentUncheckedCreateInput = {
    id?: string
    clerkUserId: string
    amount: number
    currency?: string
    status: string
    stripePaymentId: string
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type StripePaymentUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    clerkUserId?: StringFieldUpdateOperationsInput | string
    amount?: IntFieldUpdateOperationsInput | number
    currency?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    stripePaymentId?: StringFieldUpdateOperationsInput | string
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StripePaymentUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    clerkUserId?: StringFieldUpdateOperationsInput | string
    amount?: IntFieldUpdateOperationsInput | number
    currency?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    stripePaymentId?: StringFieldUpdateOperationsInput | string
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StripePaymentCreateManyInput = {
    id?: string
    clerkUserId: string
    amount: number
    currency?: string
    status: string
    stripePaymentId: string
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type StripePaymentUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    clerkUserId?: StringFieldUpdateOperationsInput | string
    amount?: IntFieldUpdateOperationsInput | number
    currency?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    stripePaymentId?: StringFieldUpdateOperationsInput | string
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StripePaymentUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    clerkUserId?: StringFieldUpdateOperationsInput | string
    amount?: IntFieldUpdateOperationsInput | number
    currency?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    stripePaymentId?: StringFieldUpdateOperationsInput | string
    metadata?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserCreateInput = {
    id: string
    createdAt?: Date | string
    updatedAt?: Date | string
    entries?: FounderLogEntryCreateNestedManyWithoutUserInput
    reflections?: FounderLogReflectionCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateInput = {
    id: string
    createdAt?: Date | string
    updatedAt?: Date | string
    entries?: FounderLogEntryUncheckedCreateNestedManyWithoutUserInput
    reflections?: FounderLogReflectionUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    entries?: FounderLogEntryUpdateManyWithoutUserNestedInput
    reflections?: FounderLogReflectionUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    entries?: FounderLogEntryUncheckedUpdateManyWithoutUserNestedInput
    reflections?: FounderLogReflectionUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserCreateManyInput = {
    id: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UserUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FounderLogTagCreateInput = {
    id?: string
    name: string
    createdAt?: Date | string
    updatedAt?: Date | string
    entries?: FounderLogEntryTagCreateNestedManyWithoutTagInput
  }

  export type FounderLogTagUncheckedCreateInput = {
    id?: string
    name: string
    createdAt?: Date | string
    updatedAt?: Date | string
    entries?: FounderLogEntryTagUncheckedCreateNestedManyWithoutTagInput
  }

  export type FounderLogTagUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    entries?: FounderLogEntryTagUpdateManyWithoutTagNestedInput
  }

  export type FounderLogTagUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    entries?: FounderLogEntryTagUncheckedUpdateManyWithoutTagNestedInput
  }

  export type FounderLogTagCreateManyInput = {
    id?: string
    name: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type FounderLogTagUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FounderLogTagUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FounderLogEntryCreateInput = {
    id?: string
    content: string
    upvoteCount?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutEntriesInput
    tags?: FounderLogEntryTagCreateNestedManyWithoutEntryInput
  }

  export type FounderLogEntryUncheckedCreateInput = {
    id?: string
    userId: string
    content: string
    upvoteCount?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    tags?: FounderLogEntryTagUncheckedCreateNestedManyWithoutEntryInput
  }

  export type FounderLogEntryUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    upvoteCount?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutEntriesNestedInput
    tags?: FounderLogEntryTagUpdateManyWithoutEntryNestedInput
  }

  export type FounderLogEntryUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    upvoteCount?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    tags?: FounderLogEntryTagUncheckedUpdateManyWithoutEntryNestedInput
  }

  export type FounderLogEntryCreateManyInput = {
    id?: string
    userId: string
    content: string
    upvoteCount?: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type FounderLogEntryUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    upvoteCount?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FounderLogEntryUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    upvoteCount?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FounderLogEntryTagCreateInput = {
    id?: string
    createdAt?: Date | string
    entry: FounderLogEntryCreateNestedOneWithoutTagsInput
    tag: FounderLogTagCreateNestedOneWithoutEntriesInput
  }

  export type FounderLogEntryTagUncheckedCreateInput = {
    id?: string
    entryId: string
    tagId: string
    createdAt?: Date | string
  }

  export type FounderLogEntryTagUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    entry?: FounderLogEntryUpdateOneRequiredWithoutTagsNestedInput
    tag?: FounderLogTagUpdateOneRequiredWithoutEntriesNestedInput
  }

  export type FounderLogEntryTagUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    entryId?: StringFieldUpdateOperationsInput | string
    tagId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FounderLogEntryTagCreateManyInput = {
    id?: string
    entryId: string
    tagId: string
    createdAt?: Date | string
  }

  export type FounderLogEntryTagUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FounderLogEntryTagUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    entryId?: StringFieldUpdateOperationsInput | string
    tagId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FounderLogReflectionCreateInput = {
    id?: string
    type: string
    content: string
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutReflectionsInput
  }

  export type FounderLogReflectionUncheckedCreateInput = {
    id?: string
    userId: string
    type: string
    content: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type FounderLogReflectionUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutReflectionsNestedInput
  }

  export type FounderLogReflectionUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FounderLogReflectionCreateManyInput = {
    id?: string
    userId: string
    type: string
    content: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type FounderLogReflectionUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FounderLogReflectionUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type PostCountOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    content?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type PostMaxOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    content?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type PostMinOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    content?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }
  export type JsonNullableFilter<$PrismaModel = never> = 
    | PatchUndefined<
        Either<Required<JsonNullableFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonNullableFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonNullableFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonNullableFilterBase<$PrismaModel>>, 'path'>>

  export type JsonNullableFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type StripePaymentCountOrderByAggregateInput = {
    id?: SortOrder
    clerkUserId?: SortOrder
    amount?: SortOrder
    currency?: SortOrder
    status?: SortOrder
    stripePaymentId?: SortOrder
    metadata?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type StripePaymentAvgOrderByAggregateInput = {
    amount?: SortOrder
  }

  export type StripePaymentMaxOrderByAggregateInput = {
    id?: SortOrder
    clerkUserId?: SortOrder
    amount?: SortOrder
    currency?: SortOrder
    status?: SortOrder
    stripePaymentId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type StripePaymentMinOrderByAggregateInput = {
    id?: SortOrder
    clerkUserId?: SortOrder
    amount?: SortOrder
    currency?: SortOrder
    status?: SortOrder
    stripePaymentId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type StripePaymentSumOrderByAggregateInput = {
    amount?: SortOrder
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
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
  export type JsonNullableWithAggregatesFilter<$PrismaModel = never> = 
    | PatchUndefined<
        Either<Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, 'path'>>

  export type JsonNullableWithAggregatesFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedJsonNullableFilter<$PrismaModel>
    _max?: NestedJsonNullableFilter<$PrismaModel>
  }

  export type FounderLogEntryListRelationFilter = {
    every?: FounderLogEntryWhereInput
    some?: FounderLogEntryWhereInput
    none?: FounderLogEntryWhereInput
  }

  export type FounderLogReflectionListRelationFilter = {
    every?: FounderLogReflectionWhereInput
    some?: FounderLogReflectionWhereInput
    none?: FounderLogReflectionWhereInput
  }

  export type FounderLogEntryOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type FounderLogReflectionOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type UserCountOrderByAggregateInput = {
    id?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserMaxOrderByAggregateInput = {
    id?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserMinOrderByAggregateInput = {
    id?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type FounderLogEntryTagListRelationFilter = {
    every?: FounderLogEntryTagWhereInput
    some?: FounderLogEntryTagWhereInput
    none?: FounderLogEntryTagWhereInput
  }

  export type FounderLogEntryTagOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type FounderLogTagCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type FounderLogTagMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type FounderLogTagMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserScalarRelationFilter = {
    is?: UserWhereInput
    isNot?: UserWhereInput
  }

  export type FounderLogEntryCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    content?: SortOrder
    upvoteCount?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type FounderLogEntryAvgOrderByAggregateInput = {
    upvoteCount?: SortOrder
  }

  export type FounderLogEntryMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    content?: SortOrder
    upvoteCount?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type FounderLogEntryMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    content?: SortOrder
    upvoteCount?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type FounderLogEntrySumOrderByAggregateInput = {
    upvoteCount?: SortOrder
  }

  export type FounderLogEntryScalarRelationFilter = {
    is?: FounderLogEntryWhereInput
    isNot?: FounderLogEntryWhereInput
  }

  export type FounderLogTagScalarRelationFilter = {
    is?: FounderLogTagWhereInput
    isNot?: FounderLogTagWhereInput
  }

  export type FounderLogEntryTagEntryIdTagIdCompoundUniqueInput = {
    entryId: string
    tagId: string
  }

  export type FounderLogEntryTagCountOrderByAggregateInput = {
    id?: SortOrder
    entryId?: SortOrder
    tagId?: SortOrder
    createdAt?: SortOrder
  }

  export type FounderLogEntryTagMaxOrderByAggregateInput = {
    id?: SortOrder
    entryId?: SortOrder
    tagId?: SortOrder
    createdAt?: SortOrder
  }

  export type FounderLogEntryTagMinOrderByAggregateInput = {
    id?: SortOrder
    entryId?: SortOrder
    tagId?: SortOrder
    createdAt?: SortOrder
  }

  export type FounderLogReflectionCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    type?: SortOrder
    content?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type FounderLogReflectionMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    type?: SortOrder
    content?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type FounderLogReflectionMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    type?: SortOrder
    content?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type FounderLogEntryCreateNestedManyWithoutUserInput = {
    create?: XOR<FounderLogEntryCreateWithoutUserInput, FounderLogEntryUncheckedCreateWithoutUserInput> | FounderLogEntryCreateWithoutUserInput[] | FounderLogEntryUncheckedCreateWithoutUserInput[]
    connectOrCreate?: FounderLogEntryCreateOrConnectWithoutUserInput | FounderLogEntryCreateOrConnectWithoutUserInput[]
    createMany?: FounderLogEntryCreateManyUserInputEnvelope
    connect?: FounderLogEntryWhereUniqueInput | FounderLogEntryWhereUniqueInput[]
  }

  export type FounderLogReflectionCreateNestedManyWithoutUserInput = {
    create?: XOR<FounderLogReflectionCreateWithoutUserInput, FounderLogReflectionUncheckedCreateWithoutUserInput> | FounderLogReflectionCreateWithoutUserInput[] | FounderLogReflectionUncheckedCreateWithoutUserInput[]
    connectOrCreate?: FounderLogReflectionCreateOrConnectWithoutUserInput | FounderLogReflectionCreateOrConnectWithoutUserInput[]
    createMany?: FounderLogReflectionCreateManyUserInputEnvelope
    connect?: FounderLogReflectionWhereUniqueInput | FounderLogReflectionWhereUniqueInput[]
  }

  export type FounderLogEntryUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<FounderLogEntryCreateWithoutUserInput, FounderLogEntryUncheckedCreateWithoutUserInput> | FounderLogEntryCreateWithoutUserInput[] | FounderLogEntryUncheckedCreateWithoutUserInput[]
    connectOrCreate?: FounderLogEntryCreateOrConnectWithoutUserInput | FounderLogEntryCreateOrConnectWithoutUserInput[]
    createMany?: FounderLogEntryCreateManyUserInputEnvelope
    connect?: FounderLogEntryWhereUniqueInput | FounderLogEntryWhereUniqueInput[]
  }

  export type FounderLogReflectionUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<FounderLogReflectionCreateWithoutUserInput, FounderLogReflectionUncheckedCreateWithoutUserInput> | FounderLogReflectionCreateWithoutUserInput[] | FounderLogReflectionUncheckedCreateWithoutUserInput[]
    connectOrCreate?: FounderLogReflectionCreateOrConnectWithoutUserInput | FounderLogReflectionCreateOrConnectWithoutUserInput[]
    createMany?: FounderLogReflectionCreateManyUserInputEnvelope
    connect?: FounderLogReflectionWhereUniqueInput | FounderLogReflectionWhereUniqueInput[]
  }

  export type FounderLogEntryUpdateManyWithoutUserNestedInput = {
    create?: XOR<FounderLogEntryCreateWithoutUserInput, FounderLogEntryUncheckedCreateWithoutUserInput> | FounderLogEntryCreateWithoutUserInput[] | FounderLogEntryUncheckedCreateWithoutUserInput[]
    connectOrCreate?: FounderLogEntryCreateOrConnectWithoutUserInput | FounderLogEntryCreateOrConnectWithoutUserInput[]
    upsert?: FounderLogEntryUpsertWithWhereUniqueWithoutUserInput | FounderLogEntryUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: FounderLogEntryCreateManyUserInputEnvelope
    set?: FounderLogEntryWhereUniqueInput | FounderLogEntryWhereUniqueInput[]
    disconnect?: FounderLogEntryWhereUniqueInput | FounderLogEntryWhereUniqueInput[]
    delete?: FounderLogEntryWhereUniqueInput | FounderLogEntryWhereUniqueInput[]
    connect?: FounderLogEntryWhereUniqueInput | FounderLogEntryWhereUniqueInput[]
    update?: FounderLogEntryUpdateWithWhereUniqueWithoutUserInput | FounderLogEntryUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: FounderLogEntryUpdateManyWithWhereWithoutUserInput | FounderLogEntryUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: FounderLogEntryScalarWhereInput | FounderLogEntryScalarWhereInput[]
  }

  export type FounderLogReflectionUpdateManyWithoutUserNestedInput = {
    create?: XOR<FounderLogReflectionCreateWithoutUserInput, FounderLogReflectionUncheckedCreateWithoutUserInput> | FounderLogReflectionCreateWithoutUserInput[] | FounderLogReflectionUncheckedCreateWithoutUserInput[]
    connectOrCreate?: FounderLogReflectionCreateOrConnectWithoutUserInput | FounderLogReflectionCreateOrConnectWithoutUserInput[]
    upsert?: FounderLogReflectionUpsertWithWhereUniqueWithoutUserInput | FounderLogReflectionUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: FounderLogReflectionCreateManyUserInputEnvelope
    set?: FounderLogReflectionWhereUniqueInput | FounderLogReflectionWhereUniqueInput[]
    disconnect?: FounderLogReflectionWhereUniqueInput | FounderLogReflectionWhereUniqueInput[]
    delete?: FounderLogReflectionWhereUniqueInput | FounderLogReflectionWhereUniqueInput[]
    connect?: FounderLogReflectionWhereUniqueInput | FounderLogReflectionWhereUniqueInput[]
    update?: FounderLogReflectionUpdateWithWhereUniqueWithoutUserInput | FounderLogReflectionUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: FounderLogReflectionUpdateManyWithWhereWithoutUserInput | FounderLogReflectionUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: FounderLogReflectionScalarWhereInput | FounderLogReflectionScalarWhereInput[]
  }

  export type FounderLogEntryUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<FounderLogEntryCreateWithoutUserInput, FounderLogEntryUncheckedCreateWithoutUserInput> | FounderLogEntryCreateWithoutUserInput[] | FounderLogEntryUncheckedCreateWithoutUserInput[]
    connectOrCreate?: FounderLogEntryCreateOrConnectWithoutUserInput | FounderLogEntryCreateOrConnectWithoutUserInput[]
    upsert?: FounderLogEntryUpsertWithWhereUniqueWithoutUserInput | FounderLogEntryUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: FounderLogEntryCreateManyUserInputEnvelope
    set?: FounderLogEntryWhereUniqueInput | FounderLogEntryWhereUniqueInput[]
    disconnect?: FounderLogEntryWhereUniqueInput | FounderLogEntryWhereUniqueInput[]
    delete?: FounderLogEntryWhereUniqueInput | FounderLogEntryWhereUniqueInput[]
    connect?: FounderLogEntryWhereUniqueInput | FounderLogEntryWhereUniqueInput[]
    update?: FounderLogEntryUpdateWithWhereUniqueWithoutUserInput | FounderLogEntryUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: FounderLogEntryUpdateManyWithWhereWithoutUserInput | FounderLogEntryUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: FounderLogEntryScalarWhereInput | FounderLogEntryScalarWhereInput[]
  }

  export type FounderLogReflectionUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<FounderLogReflectionCreateWithoutUserInput, FounderLogReflectionUncheckedCreateWithoutUserInput> | FounderLogReflectionCreateWithoutUserInput[] | FounderLogReflectionUncheckedCreateWithoutUserInput[]
    connectOrCreate?: FounderLogReflectionCreateOrConnectWithoutUserInput | FounderLogReflectionCreateOrConnectWithoutUserInput[]
    upsert?: FounderLogReflectionUpsertWithWhereUniqueWithoutUserInput | FounderLogReflectionUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: FounderLogReflectionCreateManyUserInputEnvelope
    set?: FounderLogReflectionWhereUniqueInput | FounderLogReflectionWhereUniqueInput[]
    disconnect?: FounderLogReflectionWhereUniqueInput | FounderLogReflectionWhereUniqueInput[]
    delete?: FounderLogReflectionWhereUniqueInput | FounderLogReflectionWhereUniqueInput[]
    connect?: FounderLogReflectionWhereUniqueInput | FounderLogReflectionWhereUniqueInput[]
    update?: FounderLogReflectionUpdateWithWhereUniqueWithoutUserInput | FounderLogReflectionUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: FounderLogReflectionUpdateManyWithWhereWithoutUserInput | FounderLogReflectionUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: FounderLogReflectionScalarWhereInput | FounderLogReflectionScalarWhereInput[]
  }

  export type FounderLogEntryTagCreateNestedManyWithoutTagInput = {
    create?: XOR<FounderLogEntryTagCreateWithoutTagInput, FounderLogEntryTagUncheckedCreateWithoutTagInput> | FounderLogEntryTagCreateWithoutTagInput[] | FounderLogEntryTagUncheckedCreateWithoutTagInput[]
    connectOrCreate?: FounderLogEntryTagCreateOrConnectWithoutTagInput | FounderLogEntryTagCreateOrConnectWithoutTagInput[]
    createMany?: FounderLogEntryTagCreateManyTagInputEnvelope
    connect?: FounderLogEntryTagWhereUniqueInput | FounderLogEntryTagWhereUniqueInput[]
  }

  export type FounderLogEntryTagUncheckedCreateNestedManyWithoutTagInput = {
    create?: XOR<FounderLogEntryTagCreateWithoutTagInput, FounderLogEntryTagUncheckedCreateWithoutTagInput> | FounderLogEntryTagCreateWithoutTagInput[] | FounderLogEntryTagUncheckedCreateWithoutTagInput[]
    connectOrCreate?: FounderLogEntryTagCreateOrConnectWithoutTagInput | FounderLogEntryTagCreateOrConnectWithoutTagInput[]
    createMany?: FounderLogEntryTagCreateManyTagInputEnvelope
    connect?: FounderLogEntryTagWhereUniqueInput | FounderLogEntryTagWhereUniqueInput[]
  }

  export type FounderLogEntryTagUpdateManyWithoutTagNestedInput = {
    create?: XOR<FounderLogEntryTagCreateWithoutTagInput, FounderLogEntryTagUncheckedCreateWithoutTagInput> | FounderLogEntryTagCreateWithoutTagInput[] | FounderLogEntryTagUncheckedCreateWithoutTagInput[]
    connectOrCreate?: FounderLogEntryTagCreateOrConnectWithoutTagInput | FounderLogEntryTagCreateOrConnectWithoutTagInput[]
    upsert?: FounderLogEntryTagUpsertWithWhereUniqueWithoutTagInput | FounderLogEntryTagUpsertWithWhereUniqueWithoutTagInput[]
    createMany?: FounderLogEntryTagCreateManyTagInputEnvelope
    set?: FounderLogEntryTagWhereUniqueInput | FounderLogEntryTagWhereUniqueInput[]
    disconnect?: FounderLogEntryTagWhereUniqueInput | FounderLogEntryTagWhereUniqueInput[]
    delete?: FounderLogEntryTagWhereUniqueInput | FounderLogEntryTagWhereUniqueInput[]
    connect?: FounderLogEntryTagWhereUniqueInput | FounderLogEntryTagWhereUniqueInput[]
    update?: FounderLogEntryTagUpdateWithWhereUniqueWithoutTagInput | FounderLogEntryTagUpdateWithWhereUniqueWithoutTagInput[]
    updateMany?: FounderLogEntryTagUpdateManyWithWhereWithoutTagInput | FounderLogEntryTagUpdateManyWithWhereWithoutTagInput[]
    deleteMany?: FounderLogEntryTagScalarWhereInput | FounderLogEntryTagScalarWhereInput[]
  }

  export type FounderLogEntryTagUncheckedUpdateManyWithoutTagNestedInput = {
    create?: XOR<FounderLogEntryTagCreateWithoutTagInput, FounderLogEntryTagUncheckedCreateWithoutTagInput> | FounderLogEntryTagCreateWithoutTagInput[] | FounderLogEntryTagUncheckedCreateWithoutTagInput[]
    connectOrCreate?: FounderLogEntryTagCreateOrConnectWithoutTagInput | FounderLogEntryTagCreateOrConnectWithoutTagInput[]
    upsert?: FounderLogEntryTagUpsertWithWhereUniqueWithoutTagInput | FounderLogEntryTagUpsertWithWhereUniqueWithoutTagInput[]
    createMany?: FounderLogEntryTagCreateManyTagInputEnvelope
    set?: FounderLogEntryTagWhereUniqueInput | FounderLogEntryTagWhereUniqueInput[]
    disconnect?: FounderLogEntryTagWhereUniqueInput | FounderLogEntryTagWhereUniqueInput[]
    delete?: FounderLogEntryTagWhereUniqueInput | FounderLogEntryTagWhereUniqueInput[]
    connect?: FounderLogEntryTagWhereUniqueInput | FounderLogEntryTagWhereUniqueInput[]
    update?: FounderLogEntryTagUpdateWithWhereUniqueWithoutTagInput | FounderLogEntryTagUpdateWithWhereUniqueWithoutTagInput[]
    updateMany?: FounderLogEntryTagUpdateManyWithWhereWithoutTagInput | FounderLogEntryTagUpdateManyWithWhereWithoutTagInput[]
    deleteMany?: FounderLogEntryTagScalarWhereInput | FounderLogEntryTagScalarWhereInput[]
  }

  export type UserCreateNestedOneWithoutEntriesInput = {
    create?: XOR<UserCreateWithoutEntriesInput, UserUncheckedCreateWithoutEntriesInput>
    connectOrCreate?: UserCreateOrConnectWithoutEntriesInput
    connect?: UserWhereUniqueInput
  }

  export type FounderLogEntryTagCreateNestedManyWithoutEntryInput = {
    create?: XOR<FounderLogEntryTagCreateWithoutEntryInput, FounderLogEntryTagUncheckedCreateWithoutEntryInput> | FounderLogEntryTagCreateWithoutEntryInput[] | FounderLogEntryTagUncheckedCreateWithoutEntryInput[]
    connectOrCreate?: FounderLogEntryTagCreateOrConnectWithoutEntryInput | FounderLogEntryTagCreateOrConnectWithoutEntryInput[]
    createMany?: FounderLogEntryTagCreateManyEntryInputEnvelope
    connect?: FounderLogEntryTagWhereUniqueInput | FounderLogEntryTagWhereUniqueInput[]
  }

  export type FounderLogEntryTagUncheckedCreateNestedManyWithoutEntryInput = {
    create?: XOR<FounderLogEntryTagCreateWithoutEntryInput, FounderLogEntryTagUncheckedCreateWithoutEntryInput> | FounderLogEntryTagCreateWithoutEntryInput[] | FounderLogEntryTagUncheckedCreateWithoutEntryInput[]
    connectOrCreate?: FounderLogEntryTagCreateOrConnectWithoutEntryInput | FounderLogEntryTagCreateOrConnectWithoutEntryInput[]
    createMany?: FounderLogEntryTagCreateManyEntryInputEnvelope
    connect?: FounderLogEntryTagWhereUniqueInput | FounderLogEntryTagWhereUniqueInput[]
  }

  export type UserUpdateOneRequiredWithoutEntriesNestedInput = {
    create?: XOR<UserCreateWithoutEntriesInput, UserUncheckedCreateWithoutEntriesInput>
    connectOrCreate?: UserCreateOrConnectWithoutEntriesInput
    upsert?: UserUpsertWithoutEntriesInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutEntriesInput, UserUpdateWithoutEntriesInput>, UserUncheckedUpdateWithoutEntriesInput>
  }

  export type FounderLogEntryTagUpdateManyWithoutEntryNestedInput = {
    create?: XOR<FounderLogEntryTagCreateWithoutEntryInput, FounderLogEntryTagUncheckedCreateWithoutEntryInput> | FounderLogEntryTagCreateWithoutEntryInput[] | FounderLogEntryTagUncheckedCreateWithoutEntryInput[]
    connectOrCreate?: FounderLogEntryTagCreateOrConnectWithoutEntryInput | FounderLogEntryTagCreateOrConnectWithoutEntryInput[]
    upsert?: FounderLogEntryTagUpsertWithWhereUniqueWithoutEntryInput | FounderLogEntryTagUpsertWithWhereUniqueWithoutEntryInput[]
    createMany?: FounderLogEntryTagCreateManyEntryInputEnvelope
    set?: FounderLogEntryTagWhereUniqueInput | FounderLogEntryTagWhereUniqueInput[]
    disconnect?: FounderLogEntryTagWhereUniqueInput | FounderLogEntryTagWhereUniqueInput[]
    delete?: FounderLogEntryTagWhereUniqueInput | FounderLogEntryTagWhereUniqueInput[]
    connect?: FounderLogEntryTagWhereUniqueInput | FounderLogEntryTagWhereUniqueInput[]
    update?: FounderLogEntryTagUpdateWithWhereUniqueWithoutEntryInput | FounderLogEntryTagUpdateWithWhereUniqueWithoutEntryInput[]
    updateMany?: FounderLogEntryTagUpdateManyWithWhereWithoutEntryInput | FounderLogEntryTagUpdateManyWithWhereWithoutEntryInput[]
    deleteMany?: FounderLogEntryTagScalarWhereInput | FounderLogEntryTagScalarWhereInput[]
  }

  export type FounderLogEntryTagUncheckedUpdateManyWithoutEntryNestedInput = {
    create?: XOR<FounderLogEntryTagCreateWithoutEntryInput, FounderLogEntryTagUncheckedCreateWithoutEntryInput> | FounderLogEntryTagCreateWithoutEntryInput[] | FounderLogEntryTagUncheckedCreateWithoutEntryInput[]
    connectOrCreate?: FounderLogEntryTagCreateOrConnectWithoutEntryInput | FounderLogEntryTagCreateOrConnectWithoutEntryInput[]
    upsert?: FounderLogEntryTagUpsertWithWhereUniqueWithoutEntryInput | FounderLogEntryTagUpsertWithWhereUniqueWithoutEntryInput[]
    createMany?: FounderLogEntryTagCreateManyEntryInputEnvelope
    set?: FounderLogEntryTagWhereUniqueInput | FounderLogEntryTagWhereUniqueInput[]
    disconnect?: FounderLogEntryTagWhereUniqueInput | FounderLogEntryTagWhereUniqueInput[]
    delete?: FounderLogEntryTagWhereUniqueInput | FounderLogEntryTagWhereUniqueInput[]
    connect?: FounderLogEntryTagWhereUniqueInput | FounderLogEntryTagWhereUniqueInput[]
    update?: FounderLogEntryTagUpdateWithWhereUniqueWithoutEntryInput | FounderLogEntryTagUpdateWithWhereUniqueWithoutEntryInput[]
    updateMany?: FounderLogEntryTagUpdateManyWithWhereWithoutEntryInput | FounderLogEntryTagUpdateManyWithWhereWithoutEntryInput[]
    deleteMany?: FounderLogEntryTagScalarWhereInput | FounderLogEntryTagScalarWhereInput[]
  }

  export type FounderLogEntryCreateNestedOneWithoutTagsInput = {
    create?: XOR<FounderLogEntryCreateWithoutTagsInput, FounderLogEntryUncheckedCreateWithoutTagsInput>
    connectOrCreate?: FounderLogEntryCreateOrConnectWithoutTagsInput
    connect?: FounderLogEntryWhereUniqueInput
  }

  export type FounderLogTagCreateNestedOneWithoutEntriesInput = {
    create?: XOR<FounderLogTagCreateWithoutEntriesInput, FounderLogTagUncheckedCreateWithoutEntriesInput>
    connectOrCreate?: FounderLogTagCreateOrConnectWithoutEntriesInput
    connect?: FounderLogTagWhereUniqueInput
  }

  export type FounderLogEntryUpdateOneRequiredWithoutTagsNestedInput = {
    create?: XOR<FounderLogEntryCreateWithoutTagsInput, FounderLogEntryUncheckedCreateWithoutTagsInput>
    connectOrCreate?: FounderLogEntryCreateOrConnectWithoutTagsInput
    upsert?: FounderLogEntryUpsertWithoutTagsInput
    connect?: FounderLogEntryWhereUniqueInput
    update?: XOR<XOR<FounderLogEntryUpdateToOneWithWhereWithoutTagsInput, FounderLogEntryUpdateWithoutTagsInput>, FounderLogEntryUncheckedUpdateWithoutTagsInput>
  }

  export type FounderLogTagUpdateOneRequiredWithoutEntriesNestedInput = {
    create?: XOR<FounderLogTagCreateWithoutEntriesInput, FounderLogTagUncheckedCreateWithoutEntriesInput>
    connectOrCreate?: FounderLogTagCreateOrConnectWithoutEntriesInput
    upsert?: FounderLogTagUpsertWithoutEntriesInput
    connect?: FounderLogTagWhereUniqueInput
    update?: XOR<XOR<FounderLogTagUpdateToOneWithWhereWithoutEntriesInput, FounderLogTagUpdateWithoutEntriesInput>, FounderLogTagUncheckedUpdateWithoutEntriesInput>
  }

  export type UserCreateNestedOneWithoutReflectionsInput = {
    create?: XOR<UserCreateWithoutReflectionsInput, UserUncheckedCreateWithoutReflectionsInput>
    connectOrCreate?: UserCreateOrConnectWithoutReflectionsInput
    connect?: UserWhereUniqueInput
  }

  export type UserUpdateOneRequiredWithoutReflectionsNestedInput = {
    create?: XOR<UserCreateWithoutReflectionsInput, UserUncheckedCreateWithoutReflectionsInput>
    connectOrCreate?: UserCreateOrConnectWithoutReflectionsInput
    upsert?: UserUpsertWithoutReflectionsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutReflectionsInput, UserUpdateWithoutReflectionsInput>, UserUncheckedUpdateWithoutReflectionsInput>
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
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

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
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
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }
  export type NestedJsonNullableFilter<$PrismaModel = never> = 
    | PatchUndefined<
        Either<Required<NestedJsonNullableFilterBase<$PrismaModel>>, Exclude<keyof Required<NestedJsonNullableFilterBase<$PrismaModel>>, 'path'>>,
        Required<NestedJsonNullableFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<NestedJsonNullableFilterBase<$PrismaModel>>, 'path'>>

  export type NestedJsonNullableFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type FounderLogEntryCreateWithoutUserInput = {
    id?: string
    content: string
    upvoteCount?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    tags?: FounderLogEntryTagCreateNestedManyWithoutEntryInput
  }

  export type FounderLogEntryUncheckedCreateWithoutUserInput = {
    id?: string
    content: string
    upvoteCount?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    tags?: FounderLogEntryTagUncheckedCreateNestedManyWithoutEntryInput
  }

  export type FounderLogEntryCreateOrConnectWithoutUserInput = {
    where: FounderLogEntryWhereUniqueInput
    create: XOR<FounderLogEntryCreateWithoutUserInput, FounderLogEntryUncheckedCreateWithoutUserInput>
  }

  export type FounderLogEntryCreateManyUserInputEnvelope = {
    data: FounderLogEntryCreateManyUserInput | FounderLogEntryCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type FounderLogReflectionCreateWithoutUserInput = {
    id?: string
    type: string
    content: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type FounderLogReflectionUncheckedCreateWithoutUserInput = {
    id?: string
    type: string
    content: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type FounderLogReflectionCreateOrConnectWithoutUserInput = {
    where: FounderLogReflectionWhereUniqueInput
    create: XOR<FounderLogReflectionCreateWithoutUserInput, FounderLogReflectionUncheckedCreateWithoutUserInput>
  }

  export type FounderLogReflectionCreateManyUserInputEnvelope = {
    data: FounderLogReflectionCreateManyUserInput | FounderLogReflectionCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type FounderLogEntryUpsertWithWhereUniqueWithoutUserInput = {
    where: FounderLogEntryWhereUniqueInput
    update: XOR<FounderLogEntryUpdateWithoutUserInput, FounderLogEntryUncheckedUpdateWithoutUserInput>
    create: XOR<FounderLogEntryCreateWithoutUserInput, FounderLogEntryUncheckedCreateWithoutUserInput>
  }

  export type FounderLogEntryUpdateWithWhereUniqueWithoutUserInput = {
    where: FounderLogEntryWhereUniqueInput
    data: XOR<FounderLogEntryUpdateWithoutUserInput, FounderLogEntryUncheckedUpdateWithoutUserInput>
  }

  export type FounderLogEntryUpdateManyWithWhereWithoutUserInput = {
    where: FounderLogEntryScalarWhereInput
    data: XOR<FounderLogEntryUpdateManyMutationInput, FounderLogEntryUncheckedUpdateManyWithoutUserInput>
  }

  export type FounderLogEntryScalarWhereInput = {
    AND?: FounderLogEntryScalarWhereInput | FounderLogEntryScalarWhereInput[]
    OR?: FounderLogEntryScalarWhereInput[]
    NOT?: FounderLogEntryScalarWhereInput | FounderLogEntryScalarWhereInput[]
    id?: StringFilter<"FounderLogEntry"> | string
    userId?: StringFilter<"FounderLogEntry"> | string
    content?: StringFilter<"FounderLogEntry"> | string
    upvoteCount?: IntFilter<"FounderLogEntry"> | number
    createdAt?: DateTimeFilter<"FounderLogEntry"> | Date | string
    updatedAt?: DateTimeFilter<"FounderLogEntry"> | Date | string
  }

  export type FounderLogReflectionUpsertWithWhereUniqueWithoutUserInput = {
    where: FounderLogReflectionWhereUniqueInput
    update: XOR<FounderLogReflectionUpdateWithoutUserInput, FounderLogReflectionUncheckedUpdateWithoutUserInput>
    create: XOR<FounderLogReflectionCreateWithoutUserInput, FounderLogReflectionUncheckedCreateWithoutUserInput>
  }

  export type FounderLogReflectionUpdateWithWhereUniqueWithoutUserInput = {
    where: FounderLogReflectionWhereUniqueInput
    data: XOR<FounderLogReflectionUpdateWithoutUserInput, FounderLogReflectionUncheckedUpdateWithoutUserInput>
  }

  export type FounderLogReflectionUpdateManyWithWhereWithoutUserInput = {
    where: FounderLogReflectionScalarWhereInput
    data: XOR<FounderLogReflectionUpdateManyMutationInput, FounderLogReflectionUncheckedUpdateManyWithoutUserInput>
  }

  export type FounderLogReflectionScalarWhereInput = {
    AND?: FounderLogReflectionScalarWhereInput | FounderLogReflectionScalarWhereInput[]
    OR?: FounderLogReflectionScalarWhereInput[]
    NOT?: FounderLogReflectionScalarWhereInput | FounderLogReflectionScalarWhereInput[]
    id?: StringFilter<"FounderLogReflection"> | string
    userId?: StringFilter<"FounderLogReflection"> | string
    type?: StringFilter<"FounderLogReflection"> | string
    content?: StringFilter<"FounderLogReflection"> | string
    createdAt?: DateTimeFilter<"FounderLogReflection"> | Date | string
    updatedAt?: DateTimeFilter<"FounderLogReflection"> | Date | string
  }

  export type FounderLogEntryTagCreateWithoutTagInput = {
    id?: string
    createdAt?: Date | string
    entry: FounderLogEntryCreateNestedOneWithoutTagsInput
  }

  export type FounderLogEntryTagUncheckedCreateWithoutTagInput = {
    id?: string
    entryId: string
    createdAt?: Date | string
  }

  export type FounderLogEntryTagCreateOrConnectWithoutTagInput = {
    where: FounderLogEntryTagWhereUniqueInput
    create: XOR<FounderLogEntryTagCreateWithoutTagInput, FounderLogEntryTagUncheckedCreateWithoutTagInput>
  }

  export type FounderLogEntryTagCreateManyTagInputEnvelope = {
    data: FounderLogEntryTagCreateManyTagInput | FounderLogEntryTagCreateManyTagInput[]
    skipDuplicates?: boolean
  }

  export type FounderLogEntryTagUpsertWithWhereUniqueWithoutTagInput = {
    where: FounderLogEntryTagWhereUniqueInput
    update: XOR<FounderLogEntryTagUpdateWithoutTagInput, FounderLogEntryTagUncheckedUpdateWithoutTagInput>
    create: XOR<FounderLogEntryTagCreateWithoutTagInput, FounderLogEntryTagUncheckedCreateWithoutTagInput>
  }

  export type FounderLogEntryTagUpdateWithWhereUniqueWithoutTagInput = {
    where: FounderLogEntryTagWhereUniqueInput
    data: XOR<FounderLogEntryTagUpdateWithoutTagInput, FounderLogEntryTagUncheckedUpdateWithoutTagInput>
  }

  export type FounderLogEntryTagUpdateManyWithWhereWithoutTagInput = {
    where: FounderLogEntryTagScalarWhereInput
    data: XOR<FounderLogEntryTagUpdateManyMutationInput, FounderLogEntryTagUncheckedUpdateManyWithoutTagInput>
  }

  export type FounderLogEntryTagScalarWhereInput = {
    AND?: FounderLogEntryTagScalarWhereInput | FounderLogEntryTagScalarWhereInput[]
    OR?: FounderLogEntryTagScalarWhereInput[]
    NOT?: FounderLogEntryTagScalarWhereInput | FounderLogEntryTagScalarWhereInput[]
    id?: StringFilter<"FounderLogEntryTag"> | string
    entryId?: StringFilter<"FounderLogEntryTag"> | string
    tagId?: StringFilter<"FounderLogEntryTag"> | string
    createdAt?: DateTimeFilter<"FounderLogEntryTag"> | Date | string
  }

  export type UserCreateWithoutEntriesInput = {
    id: string
    createdAt?: Date | string
    updatedAt?: Date | string
    reflections?: FounderLogReflectionCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutEntriesInput = {
    id: string
    createdAt?: Date | string
    updatedAt?: Date | string
    reflections?: FounderLogReflectionUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutEntriesInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutEntriesInput, UserUncheckedCreateWithoutEntriesInput>
  }

  export type FounderLogEntryTagCreateWithoutEntryInput = {
    id?: string
    createdAt?: Date | string
    tag: FounderLogTagCreateNestedOneWithoutEntriesInput
  }

  export type FounderLogEntryTagUncheckedCreateWithoutEntryInput = {
    id?: string
    tagId: string
    createdAt?: Date | string
  }

  export type FounderLogEntryTagCreateOrConnectWithoutEntryInput = {
    where: FounderLogEntryTagWhereUniqueInput
    create: XOR<FounderLogEntryTagCreateWithoutEntryInput, FounderLogEntryTagUncheckedCreateWithoutEntryInput>
  }

  export type FounderLogEntryTagCreateManyEntryInputEnvelope = {
    data: FounderLogEntryTagCreateManyEntryInput | FounderLogEntryTagCreateManyEntryInput[]
    skipDuplicates?: boolean
  }

  export type UserUpsertWithoutEntriesInput = {
    update: XOR<UserUpdateWithoutEntriesInput, UserUncheckedUpdateWithoutEntriesInput>
    create: XOR<UserCreateWithoutEntriesInput, UserUncheckedCreateWithoutEntriesInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutEntriesInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutEntriesInput, UserUncheckedUpdateWithoutEntriesInput>
  }

  export type UserUpdateWithoutEntriesInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    reflections?: FounderLogReflectionUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutEntriesInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    reflections?: FounderLogReflectionUncheckedUpdateManyWithoutUserNestedInput
  }

  export type FounderLogEntryTagUpsertWithWhereUniqueWithoutEntryInput = {
    where: FounderLogEntryTagWhereUniqueInput
    update: XOR<FounderLogEntryTagUpdateWithoutEntryInput, FounderLogEntryTagUncheckedUpdateWithoutEntryInput>
    create: XOR<FounderLogEntryTagCreateWithoutEntryInput, FounderLogEntryTagUncheckedCreateWithoutEntryInput>
  }

  export type FounderLogEntryTagUpdateWithWhereUniqueWithoutEntryInput = {
    where: FounderLogEntryTagWhereUniqueInput
    data: XOR<FounderLogEntryTagUpdateWithoutEntryInput, FounderLogEntryTagUncheckedUpdateWithoutEntryInput>
  }

  export type FounderLogEntryTagUpdateManyWithWhereWithoutEntryInput = {
    where: FounderLogEntryTagScalarWhereInput
    data: XOR<FounderLogEntryTagUpdateManyMutationInput, FounderLogEntryTagUncheckedUpdateManyWithoutEntryInput>
  }

  export type FounderLogEntryCreateWithoutTagsInput = {
    id?: string
    content: string
    upvoteCount?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutEntriesInput
  }

  export type FounderLogEntryUncheckedCreateWithoutTagsInput = {
    id?: string
    userId: string
    content: string
    upvoteCount?: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type FounderLogEntryCreateOrConnectWithoutTagsInput = {
    where: FounderLogEntryWhereUniqueInput
    create: XOR<FounderLogEntryCreateWithoutTagsInput, FounderLogEntryUncheckedCreateWithoutTagsInput>
  }

  export type FounderLogTagCreateWithoutEntriesInput = {
    id?: string
    name: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type FounderLogTagUncheckedCreateWithoutEntriesInput = {
    id?: string
    name: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type FounderLogTagCreateOrConnectWithoutEntriesInput = {
    where: FounderLogTagWhereUniqueInput
    create: XOR<FounderLogTagCreateWithoutEntriesInput, FounderLogTagUncheckedCreateWithoutEntriesInput>
  }

  export type FounderLogEntryUpsertWithoutTagsInput = {
    update: XOR<FounderLogEntryUpdateWithoutTagsInput, FounderLogEntryUncheckedUpdateWithoutTagsInput>
    create: XOR<FounderLogEntryCreateWithoutTagsInput, FounderLogEntryUncheckedCreateWithoutTagsInput>
    where?: FounderLogEntryWhereInput
  }

  export type FounderLogEntryUpdateToOneWithWhereWithoutTagsInput = {
    where?: FounderLogEntryWhereInput
    data: XOR<FounderLogEntryUpdateWithoutTagsInput, FounderLogEntryUncheckedUpdateWithoutTagsInput>
  }

  export type FounderLogEntryUpdateWithoutTagsInput = {
    id?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    upvoteCount?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutEntriesNestedInput
  }

  export type FounderLogEntryUncheckedUpdateWithoutTagsInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    upvoteCount?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FounderLogTagUpsertWithoutEntriesInput = {
    update: XOR<FounderLogTagUpdateWithoutEntriesInput, FounderLogTagUncheckedUpdateWithoutEntriesInput>
    create: XOR<FounderLogTagCreateWithoutEntriesInput, FounderLogTagUncheckedCreateWithoutEntriesInput>
    where?: FounderLogTagWhereInput
  }

  export type FounderLogTagUpdateToOneWithWhereWithoutEntriesInput = {
    where?: FounderLogTagWhereInput
    data: XOR<FounderLogTagUpdateWithoutEntriesInput, FounderLogTagUncheckedUpdateWithoutEntriesInput>
  }

  export type FounderLogTagUpdateWithoutEntriesInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FounderLogTagUncheckedUpdateWithoutEntriesInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserCreateWithoutReflectionsInput = {
    id: string
    createdAt?: Date | string
    updatedAt?: Date | string
    entries?: FounderLogEntryCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutReflectionsInput = {
    id: string
    createdAt?: Date | string
    updatedAt?: Date | string
    entries?: FounderLogEntryUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutReflectionsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutReflectionsInput, UserUncheckedCreateWithoutReflectionsInput>
  }

  export type UserUpsertWithoutReflectionsInput = {
    update: XOR<UserUpdateWithoutReflectionsInput, UserUncheckedUpdateWithoutReflectionsInput>
    create: XOR<UserCreateWithoutReflectionsInput, UserUncheckedCreateWithoutReflectionsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutReflectionsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutReflectionsInput, UserUncheckedUpdateWithoutReflectionsInput>
  }

  export type UserUpdateWithoutReflectionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    entries?: FounderLogEntryUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutReflectionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    entries?: FounderLogEntryUncheckedUpdateManyWithoutUserNestedInput
  }

  export type FounderLogEntryCreateManyUserInput = {
    id?: string
    content: string
    upvoteCount?: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type FounderLogReflectionCreateManyUserInput = {
    id?: string
    type: string
    content: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type FounderLogEntryUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    upvoteCount?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    tags?: FounderLogEntryTagUpdateManyWithoutEntryNestedInput
  }

  export type FounderLogEntryUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    upvoteCount?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    tags?: FounderLogEntryTagUncheckedUpdateManyWithoutEntryNestedInput
  }

  export type FounderLogEntryUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    upvoteCount?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FounderLogReflectionUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FounderLogReflectionUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FounderLogReflectionUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FounderLogEntryTagCreateManyTagInput = {
    id?: string
    entryId: string
    createdAt?: Date | string
  }

  export type FounderLogEntryTagUpdateWithoutTagInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    entry?: FounderLogEntryUpdateOneRequiredWithoutTagsNestedInput
  }

  export type FounderLogEntryTagUncheckedUpdateWithoutTagInput = {
    id?: StringFieldUpdateOperationsInput | string
    entryId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FounderLogEntryTagUncheckedUpdateManyWithoutTagInput = {
    id?: StringFieldUpdateOperationsInput | string
    entryId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FounderLogEntryTagCreateManyEntryInput = {
    id?: string
    tagId: string
    createdAt?: Date | string
  }

  export type FounderLogEntryTagUpdateWithoutEntryInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    tag?: FounderLogTagUpdateOneRequiredWithoutEntriesNestedInput
  }

  export type FounderLogEntryTagUncheckedUpdateWithoutEntryInput = {
    id?: StringFieldUpdateOperationsInput | string
    tagId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FounderLogEntryTagUncheckedUpdateManyWithoutEntryInput = {
    id?: StringFieldUpdateOperationsInput | string
    tagId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
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