import { z } from 'zod';
import { Prisma } from '../node';

/////////////////////////////////////////
// HELPER FUNCTIONS
/////////////////////////////////////////

// JSON
//------------------------------------------------------

export type NullableJsonInput = Prisma.JsonValue | null | 'JsonNull' | 'DbNull' | Prisma.NullTypes.DbNull | Prisma.NullTypes.JsonNull;

export const transformJsonNull = (v?: NullableJsonInput) => {
  if (!v || v === 'DbNull') return Prisma.DbNull;
  if (v === 'JsonNull') return Prisma.JsonNull;
  return v;
};

export const JsonValueSchema: z.ZodType<Prisma.JsonValue> = z.lazy(() =>
  z.union([
    z.string(),
    z.number(),
    z.boolean(),
    z.literal(null),
    z.record(z.lazy(() => JsonValueSchema.optional())),
    z.array(z.lazy(() => JsonValueSchema)),
  ])
);

export type JsonValueType = z.infer<typeof JsonValueSchema>;

export const NullableJsonValue = z
  .union([JsonValueSchema, z.literal('DbNull'), z.literal('JsonNull')])
  .nullable()
  .transform((v) => transformJsonNull(v));

export type NullableJsonValueType = z.infer<typeof NullableJsonValue>;

export const InputJsonValueSchema: z.ZodType<Prisma.InputJsonValue> = z.lazy(() =>
  z.union([
    z.string(),
    z.number(),
    z.boolean(),
    z.object({ toJSON: z.function(z.tuple([]), z.any()) }),
    z.record(z.lazy(() => z.union([InputJsonValueSchema, z.literal(null)]))),
    z.array(z.lazy(() => z.union([InputJsonValueSchema, z.literal(null)]))),
  ])
);

export type InputJsonValueType = z.infer<typeof InputJsonValueSchema>;


/////////////////////////////////////////
// ENUMS
/////////////////////////////////////////

export const TransactionIsolationLevelSchema = z.enum(['ReadUncommitted','ReadCommitted','RepeatableRead','Serializable']);

export const PostScalarFieldEnumSchema = z.enum(['id','title','content','createdAt','updatedAt']);

export const UserScalarFieldEnumSchema = z.enum(['id','firstName','lastName','username','primaryEmailAddress','imageUrl','clerkUserProperties','stripeCustomerId','accessType','stripeUserProperties','createdAt','updatedAt']);

export const FounderLogTagScalarFieldEnumSchema = z.enum(['id','name','createdAt','updatedAt']);

export const FounderLogEntryScalarFieldEnumSchema = z.enum(['id','userId','content','upvoteCount','createdAt','updatedAt']);

export const FounderLogEntryTagScalarFieldEnumSchema = z.enum(['id','entryId','tagId','createdAt']);

export const FounderLogReflectionScalarFieldEnumSchema = z.enum(['id','userId','type','content','createdAt','updatedAt']);

export const SortOrderSchema = z.enum(['asc','desc']);

export const NullableJsonNullValueInputSchema = z.enum(['DbNull','JsonNull',]).transform((value) => value === 'JsonNull' ? Prisma.JsonNull : value === 'DbNull' ? Prisma.DbNull : value);

export const QueryModeSchema = z.enum(['default','insensitive']);

export const JsonNullValueFilterSchema = z.enum(['DbNull','JsonNull','AnyNull',]).transform((value) => value === 'JsonNull' ? Prisma.JsonNull : value === 'DbNull' ? Prisma.JsonNull : value === 'AnyNull' ? Prisma.AnyNull : value);

export const NullsOrderSchema = z.enum(['first','last']);

export const AccessTypeSchema = z.enum(['TRIAL','FREE','LIFETIME','MONTHLY','YEARLY']);

export type AccessTypeType = `${z.infer<typeof AccessTypeSchema>}`

/////////////////////////////////////////
// MODELS
/////////////////////////////////////////

/////////////////////////////////////////
// POST SCHEMA
/////////////////////////////////////////

export const PostSchema = z.object({
  id: z.string().uuid(),
  title: z.string(),
  content: z.string(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
})

export type Post = z.infer<typeof PostSchema>

/////////////////////////////////////////
// USER SCHEMA
/////////////////////////////////////////

export const UserSchema = z.object({
  accessType: AccessTypeSchema,
  id: z.string(),
  firstName: z.string().nullable(),
  lastName: z.string().nullable(),
  username: z.string().nullable(),
  primaryEmailAddress: z.string().nullable(),
  imageUrl: z.string().nullable(),
  clerkUserProperties: JsonValueSchema.nullable(),
  stripeCustomerId: z.string().nullable(),
  stripeUserProperties: JsonValueSchema.nullable(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
})

export type User = z.infer<typeof UserSchema>

/////////////////////////////////////////
// FOUNDER LOG TAG SCHEMA
/////////////////////////////////////////

export const FounderLogTagSchema = z.object({
  id: z.string().cuid(),
  name: z.string(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
})

export type FounderLogTag = z.infer<typeof FounderLogTagSchema>

/////////////////////////////////////////
// FOUNDER LOG ENTRY SCHEMA
/////////////////////////////////////////

export const FounderLogEntrySchema = z.object({
  id: z.string().cuid(),
  userId: z.string(),
  content: z.string(),
  upvoteCount: z.number().int(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
})

export type FounderLogEntry = z.infer<typeof FounderLogEntrySchema>

/////////////////////////////////////////
// FOUNDER LOG ENTRY TAG SCHEMA
/////////////////////////////////////////

export const FounderLogEntryTagSchema = z.object({
  id: z.string().cuid(),
  entryId: z.string(),
  tagId: z.string(),
  createdAt: z.coerce.date(),
})

export type FounderLogEntryTag = z.infer<typeof FounderLogEntryTagSchema>

/////////////////////////////////////////
// FOUNDER LOG REFLECTION SCHEMA
/////////////////////////////////////////

export const FounderLogReflectionSchema = z.object({
  id: z.string().cuid(),
  userId: z.string(),
  type: z.string(),
  content: z.string(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
})

export type FounderLogReflection = z.infer<typeof FounderLogReflectionSchema>

/////////////////////////////////////////
// SELECT & INCLUDE
/////////////////////////////////////////

// POST
//------------------------------------------------------

export const PostSelectSchema: z.ZodType<Prisma.PostSelect> = z.object({
  id: z.boolean().optional(),
  title: z.boolean().optional(),
  content: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  updatedAt: z.boolean().optional(),
}).strict()

// USER
//------------------------------------------------------

export const UserIncludeSchema: z.ZodType<Prisma.UserInclude> = z.object({
  entries: z.union([z.boolean(),z.lazy(() => FounderLogEntryFindManyArgsSchema)]).optional(),
  reflections: z.union([z.boolean(),z.lazy(() => FounderLogReflectionFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => UserCountOutputTypeArgsSchema)]).optional(),
}).strict()

export const UserArgsSchema: z.ZodType<Prisma.UserDefaultArgs> = z.object({
  select: z.lazy(() => UserSelectSchema).optional(),
  include: z.lazy(() => UserIncludeSchema).optional(),
}).strict();

export const UserCountOutputTypeArgsSchema: z.ZodType<Prisma.UserCountOutputTypeDefaultArgs> = z.object({
  select: z.lazy(() => UserCountOutputTypeSelectSchema).nullish(),
}).strict();

export const UserCountOutputTypeSelectSchema: z.ZodType<Prisma.UserCountOutputTypeSelect> = z.object({
  entries: z.boolean().optional(),
  reflections: z.boolean().optional(),
}).strict();

export const UserSelectSchema: z.ZodType<Prisma.UserSelect> = z.object({
  id: z.boolean().optional(),
  firstName: z.boolean().optional(),
  lastName: z.boolean().optional(),
  username: z.boolean().optional(),
  primaryEmailAddress: z.boolean().optional(),
  imageUrl: z.boolean().optional(),
  clerkUserProperties: z.boolean().optional(),
  stripeCustomerId: z.boolean().optional(),
  accessType: z.boolean().optional(),
  stripeUserProperties: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  updatedAt: z.boolean().optional(),
  entries: z.union([z.boolean(),z.lazy(() => FounderLogEntryFindManyArgsSchema)]).optional(),
  reflections: z.union([z.boolean(),z.lazy(() => FounderLogReflectionFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => UserCountOutputTypeArgsSchema)]).optional(),
}).strict()

// FOUNDER LOG TAG
//------------------------------------------------------

export const FounderLogTagIncludeSchema: z.ZodType<Prisma.FounderLogTagInclude> = z.object({
  entries: z.union([z.boolean(),z.lazy(() => FounderLogEntryTagFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => FounderLogTagCountOutputTypeArgsSchema)]).optional(),
}).strict()

export const FounderLogTagArgsSchema: z.ZodType<Prisma.FounderLogTagDefaultArgs> = z.object({
  select: z.lazy(() => FounderLogTagSelectSchema).optional(),
  include: z.lazy(() => FounderLogTagIncludeSchema).optional(),
}).strict();

export const FounderLogTagCountOutputTypeArgsSchema: z.ZodType<Prisma.FounderLogTagCountOutputTypeDefaultArgs> = z.object({
  select: z.lazy(() => FounderLogTagCountOutputTypeSelectSchema).nullish(),
}).strict();

export const FounderLogTagCountOutputTypeSelectSchema: z.ZodType<Prisma.FounderLogTagCountOutputTypeSelect> = z.object({
  entries: z.boolean().optional(),
}).strict();

export const FounderLogTagSelectSchema: z.ZodType<Prisma.FounderLogTagSelect> = z.object({
  id: z.boolean().optional(),
  name: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  updatedAt: z.boolean().optional(),
  entries: z.union([z.boolean(),z.lazy(() => FounderLogEntryTagFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => FounderLogTagCountOutputTypeArgsSchema)]).optional(),
}).strict()

// FOUNDER LOG ENTRY
//------------------------------------------------------

export const FounderLogEntryIncludeSchema: z.ZodType<Prisma.FounderLogEntryInclude> = z.object({
  user: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
  tags: z.union([z.boolean(),z.lazy(() => FounderLogEntryTagFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => FounderLogEntryCountOutputTypeArgsSchema)]).optional(),
}).strict()

export const FounderLogEntryArgsSchema: z.ZodType<Prisma.FounderLogEntryDefaultArgs> = z.object({
  select: z.lazy(() => FounderLogEntrySelectSchema).optional(),
  include: z.lazy(() => FounderLogEntryIncludeSchema).optional(),
}).strict();

export const FounderLogEntryCountOutputTypeArgsSchema: z.ZodType<Prisma.FounderLogEntryCountOutputTypeDefaultArgs> = z.object({
  select: z.lazy(() => FounderLogEntryCountOutputTypeSelectSchema).nullish(),
}).strict();

export const FounderLogEntryCountOutputTypeSelectSchema: z.ZodType<Prisma.FounderLogEntryCountOutputTypeSelect> = z.object({
  tags: z.boolean().optional(),
}).strict();

export const FounderLogEntrySelectSchema: z.ZodType<Prisma.FounderLogEntrySelect> = z.object({
  id: z.boolean().optional(),
  userId: z.boolean().optional(),
  content: z.boolean().optional(),
  upvoteCount: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  updatedAt: z.boolean().optional(),
  user: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
  tags: z.union([z.boolean(),z.lazy(() => FounderLogEntryTagFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => FounderLogEntryCountOutputTypeArgsSchema)]).optional(),
}).strict()

// FOUNDER LOG ENTRY TAG
//------------------------------------------------------

export const FounderLogEntryTagIncludeSchema: z.ZodType<Prisma.FounderLogEntryTagInclude> = z.object({
  entry: z.union([z.boolean(),z.lazy(() => FounderLogEntryArgsSchema)]).optional(),
  tag: z.union([z.boolean(),z.lazy(() => FounderLogTagArgsSchema)]).optional(),
}).strict()

export const FounderLogEntryTagArgsSchema: z.ZodType<Prisma.FounderLogEntryTagDefaultArgs> = z.object({
  select: z.lazy(() => FounderLogEntryTagSelectSchema).optional(),
  include: z.lazy(() => FounderLogEntryTagIncludeSchema).optional(),
}).strict();

export const FounderLogEntryTagSelectSchema: z.ZodType<Prisma.FounderLogEntryTagSelect> = z.object({
  id: z.boolean().optional(),
  entryId: z.boolean().optional(),
  tagId: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  entry: z.union([z.boolean(),z.lazy(() => FounderLogEntryArgsSchema)]).optional(),
  tag: z.union([z.boolean(),z.lazy(() => FounderLogTagArgsSchema)]).optional(),
}).strict()

// FOUNDER LOG REFLECTION
//------------------------------------------------------

export const FounderLogReflectionIncludeSchema: z.ZodType<Prisma.FounderLogReflectionInclude> = z.object({
  user: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
}).strict()

export const FounderLogReflectionArgsSchema: z.ZodType<Prisma.FounderLogReflectionDefaultArgs> = z.object({
  select: z.lazy(() => FounderLogReflectionSelectSchema).optional(),
  include: z.lazy(() => FounderLogReflectionIncludeSchema).optional(),
}).strict();

export const FounderLogReflectionSelectSchema: z.ZodType<Prisma.FounderLogReflectionSelect> = z.object({
  id: z.boolean().optional(),
  userId: z.boolean().optional(),
  type: z.boolean().optional(),
  content: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  updatedAt: z.boolean().optional(),
  user: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
}).strict()


/////////////////////////////////////////
// INPUT TYPES
/////////////////////////////////////////

export const PostWhereInputSchema: z.ZodType<Prisma.PostWhereInput> = z.object({
  AND: z.union([ z.lazy(() => PostWhereInputSchema),z.lazy(() => PostWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => PostWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => PostWhereInputSchema),z.lazy(() => PostWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  title: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  content: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
}).strict();

export const PostOrderByWithRelationInputSchema: z.ZodType<Prisma.PostOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  title: z.lazy(() => SortOrderSchema).optional(),
  content: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const PostWhereUniqueInputSchema: z.ZodType<Prisma.PostWhereUniqueInput> = z.object({
  id: z.string().uuid()
})
.and(z.object({
  id: z.string().uuid().optional(),
  AND: z.union([ z.lazy(() => PostWhereInputSchema),z.lazy(() => PostWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => PostWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => PostWhereInputSchema),z.lazy(() => PostWhereInputSchema).array() ]).optional(),
  title: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  content: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
}).strict());

export const PostOrderByWithAggregationInputSchema: z.ZodType<Prisma.PostOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  title: z.lazy(() => SortOrderSchema).optional(),
  content: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => PostCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => PostMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => PostMinOrderByAggregateInputSchema).optional()
}).strict();

export const PostScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.PostScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => PostScalarWhereWithAggregatesInputSchema),z.lazy(() => PostScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => PostScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => PostScalarWhereWithAggregatesInputSchema),z.lazy(() => PostScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  title: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  content: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
}).strict();

export const UserWhereInputSchema: z.ZodType<Prisma.UserWhereInput> = z.object({
  AND: z.union([ z.lazy(() => UserWhereInputSchema),z.lazy(() => UserWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => UserWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => UserWhereInputSchema),z.lazy(() => UserWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  firstName: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  lastName: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  username: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  primaryEmailAddress: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  imageUrl: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  clerkUserProperties: z.lazy(() => JsonNullableFilterSchema).optional(),
  stripeCustomerId: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  accessType: z.union([ z.lazy(() => EnumAccessTypeFilterSchema),z.lazy(() => AccessTypeSchema) ]).optional(),
  stripeUserProperties: z.lazy(() => JsonNullableFilterSchema).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  entries: z.lazy(() => FounderLogEntryListRelationFilterSchema).optional(),
  reflections: z.lazy(() => FounderLogReflectionListRelationFilterSchema).optional()
}).strict();

export const UserOrderByWithRelationInputSchema: z.ZodType<Prisma.UserOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  firstName: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  lastName: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  username: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  primaryEmailAddress: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  imageUrl: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  clerkUserProperties: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  stripeCustomerId: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  accessType: z.lazy(() => SortOrderSchema).optional(),
  stripeUserProperties: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  entries: z.lazy(() => FounderLogEntryOrderByRelationAggregateInputSchema).optional(),
  reflections: z.lazy(() => FounderLogReflectionOrderByRelationAggregateInputSchema).optional()
}).strict();

export const UserWhereUniqueInputSchema: z.ZodType<Prisma.UserWhereUniqueInput> = z.union([
  z.object({
    id: z.string(),
    username: z.string(),
    primaryEmailAddress: z.string(),
    stripeCustomerId: z.string()
  }),
  z.object({
    id: z.string(),
    username: z.string(),
    primaryEmailAddress: z.string(),
  }),
  z.object({
    id: z.string(),
    username: z.string(),
    stripeCustomerId: z.string(),
  }),
  z.object({
    id: z.string(),
    username: z.string(),
  }),
  z.object({
    id: z.string(),
    primaryEmailAddress: z.string(),
    stripeCustomerId: z.string(),
  }),
  z.object({
    id: z.string(),
    primaryEmailAddress: z.string(),
  }),
  z.object({
    id: z.string(),
    stripeCustomerId: z.string(),
  }),
  z.object({
    id: z.string(),
  }),
  z.object({
    username: z.string(),
    primaryEmailAddress: z.string(),
    stripeCustomerId: z.string(),
  }),
  z.object({
    username: z.string(),
    primaryEmailAddress: z.string(),
  }),
  z.object({
    username: z.string(),
    stripeCustomerId: z.string(),
  }),
  z.object({
    username: z.string(),
  }),
  z.object({
    primaryEmailAddress: z.string(),
    stripeCustomerId: z.string(),
  }),
  z.object({
    primaryEmailAddress: z.string(),
  }),
  z.object({
    stripeCustomerId: z.string(),
  }),
])
.and(z.object({
  id: z.string().optional(),
  username: z.string().optional(),
  primaryEmailAddress: z.string().optional(),
  stripeCustomerId: z.string().optional(),
  AND: z.union([ z.lazy(() => UserWhereInputSchema),z.lazy(() => UserWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => UserWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => UserWhereInputSchema),z.lazy(() => UserWhereInputSchema).array() ]).optional(),
  firstName: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  lastName: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  imageUrl: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  clerkUserProperties: z.lazy(() => JsonNullableFilterSchema).optional(),
  accessType: z.union([ z.lazy(() => EnumAccessTypeFilterSchema),z.lazy(() => AccessTypeSchema) ]).optional(),
  stripeUserProperties: z.lazy(() => JsonNullableFilterSchema).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  entries: z.lazy(() => FounderLogEntryListRelationFilterSchema).optional(),
  reflections: z.lazy(() => FounderLogReflectionListRelationFilterSchema).optional()
}).strict());

export const UserOrderByWithAggregationInputSchema: z.ZodType<Prisma.UserOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  firstName: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  lastName: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  username: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  primaryEmailAddress: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  imageUrl: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  clerkUserProperties: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  stripeCustomerId: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  accessType: z.lazy(() => SortOrderSchema).optional(),
  stripeUserProperties: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => UserCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => UserMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => UserMinOrderByAggregateInputSchema).optional()
}).strict();

export const UserScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.UserScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => UserScalarWhereWithAggregatesInputSchema),z.lazy(() => UserScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => UserScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => UserScalarWhereWithAggregatesInputSchema),z.lazy(() => UserScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  firstName: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  lastName: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  username: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  primaryEmailAddress: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  imageUrl: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  clerkUserProperties: z.lazy(() => JsonNullableWithAggregatesFilterSchema).optional(),
  stripeCustomerId: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  accessType: z.union([ z.lazy(() => EnumAccessTypeWithAggregatesFilterSchema),z.lazy(() => AccessTypeSchema) ]).optional(),
  stripeUserProperties: z.lazy(() => JsonNullableWithAggregatesFilterSchema).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
}).strict();

export const FounderLogTagWhereInputSchema: z.ZodType<Prisma.FounderLogTagWhereInput> = z.object({
  AND: z.union([ z.lazy(() => FounderLogTagWhereInputSchema),z.lazy(() => FounderLogTagWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => FounderLogTagWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => FounderLogTagWhereInputSchema),z.lazy(() => FounderLogTagWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  entries: z.lazy(() => FounderLogEntryTagListRelationFilterSchema).optional()
}).strict();

export const FounderLogTagOrderByWithRelationInputSchema: z.ZodType<Prisma.FounderLogTagOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  entries: z.lazy(() => FounderLogEntryTagOrderByRelationAggregateInputSchema).optional()
}).strict();

export const FounderLogTagWhereUniqueInputSchema: z.ZodType<Prisma.FounderLogTagWhereUniqueInput> = z.union([
  z.object({
    id: z.string().cuid(),
    name: z.string()
  }),
  z.object({
    id: z.string().cuid(),
  }),
  z.object({
    name: z.string(),
  }),
])
.and(z.object({
  id: z.string().cuid().optional(),
  name: z.string().optional(),
  AND: z.union([ z.lazy(() => FounderLogTagWhereInputSchema),z.lazy(() => FounderLogTagWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => FounderLogTagWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => FounderLogTagWhereInputSchema),z.lazy(() => FounderLogTagWhereInputSchema).array() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  entries: z.lazy(() => FounderLogEntryTagListRelationFilterSchema).optional()
}).strict());

export const FounderLogTagOrderByWithAggregationInputSchema: z.ZodType<Prisma.FounderLogTagOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => FounderLogTagCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => FounderLogTagMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => FounderLogTagMinOrderByAggregateInputSchema).optional()
}).strict();

export const FounderLogTagScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.FounderLogTagScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => FounderLogTagScalarWhereWithAggregatesInputSchema),z.lazy(() => FounderLogTagScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => FounderLogTagScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => FounderLogTagScalarWhereWithAggregatesInputSchema),z.lazy(() => FounderLogTagScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
}).strict();

export const FounderLogEntryWhereInputSchema: z.ZodType<Prisma.FounderLogEntryWhereInput> = z.object({
  AND: z.union([ z.lazy(() => FounderLogEntryWhereInputSchema),z.lazy(() => FounderLogEntryWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => FounderLogEntryWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => FounderLogEntryWhereInputSchema),z.lazy(() => FounderLogEntryWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  userId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  content: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  upvoteCount: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  user: z.union([ z.lazy(() => UserScalarRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional(),
  tags: z.lazy(() => FounderLogEntryTagListRelationFilterSchema).optional()
}).strict();

export const FounderLogEntryOrderByWithRelationInputSchema: z.ZodType<Prisma.FounderLogEntryOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  content: z.lazy(() => SortOrderSchema).optional(),
  upvoteCount: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  user: z.lazy(() => UserOrderByWithRelationInputSchema).optional(),
  tags: z.lazy(() => FounderLogEntryTagOrderByRelationAggregateInputSchema).optional()
}).strict();

export const FounderLogEntryWhereUniqueInputSchema: z.ZodType<Prisma.FounderLogEntryWhereUniqueInput> = z.object({
  id: z.string().cuid()
})
.and(z.object({
  id: z.string().cuid().optional(),
  AND: z.union([ z.lazy(() => FounderLogEntryWhereInputSchema),z.lazy(() => FounderLogEntryWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => FounderLogEntryWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => FounderLogEntryWhereInputSchema),z.lazy(() => FounderLogEntryWhereInputSchema).array() ]).optional(),
  userId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  content: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  upvoteCount: z.union([ z.lazy(() => IntFilterSchema),z.number().int() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  user: z.union([ z.lazy(() => UserScalarRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional(),
  tags: z.lazy(() => FounderLogEntryTagListRelationFilterSchema).optional()
}).strict());

export const FounderLogEntryOrderByWithAggregationInputSchema: z.ZodType<Prisma.FounderLogEntryOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  content: z.lazy(() => SortOrderSchema).optional(),
  upvoteCount: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => FounderLogEntryCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => FounderLogEntryAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => FounderLogEntryMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => FounderLogEntryMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => FounderLogEntrySumOrderByAggregateInputSchema).optional()
}).strict();

export const FounderLogEntryScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.FounderLogEntryScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => FounderLogEntryScalarWhereWithAggregatesInputSchema),z.lazy(() => FounderLogEntryScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => FounderLogEntryScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => FounderLogEntryScalarWhereWithAggregatesInputSchema),z.lazy(() => FounderLogEntryScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  userId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  content: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  upvoteCount: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
}).strict();

export const FounderLogEntryTagWhereInputSchema: z.ZodType<Prisma.FounderLogEntryTagWhereInput> = z.object({
  AND: z.union([ z.lazy(() => FounderLogEntryTagWhereInputSchema),z.lazy(() => FounderLogEntryTagWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => FounderLogEntryTagWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => FounderLogEntryTagWhereInputSchema),z.lazy(() => FounderLogEntryTagWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  entryId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  tagId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  entry: z.union([ z.lazy(() => FounderLogEntryScalarRelationFilterSchema),z.lazy(() => FounderLogEntryWhereInputSchema) ]).optional(),
  tag: z.union([ z.lazy(() => FounderLogTagScalarRelationFilterSchema),z.lazy(() => FounderLogTagWhereInputSchema) ]).optional(),
}).strict();

export const FounderLogEntryTagOrderByWithRelationInputSchema: z.ZodType<Prisma.FounderLogEntryTagOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  entryId: z.lazy(() => SortOrderSchema).optional(),
  tagId: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  entry: z.lazy(() => FounderLogEntryOrderByWithRelationInputSchema).optional(),
  tag: z.lazy(() => FounderLogTagOrderByWithRelationInputSchema).optional()
}).strict();

export const FounderLogEntryTagWhereUniqueInputSchema: z.ZodType<Prisma.FounderLogEntryTagWhereUniqueInput> = z.union([
  z.object({
    id: z.string().cuid(),
    entryId_tagId: z.lazy(() => FounderLogEntryTagEntryIdTagIdCompoundUniqueInputSchema)
  }),
  z.object({
    id: z.string().cuid(),
  }),
  z.object({
    entryId_tagId: z.lazy(() => FounderLogEntryTagEntryIdTagIdCompoundUniqueInputSchema),
  }),
])
.and(z.object({
  id: z.string().cuid().optional(),
  entryId_tagId: z.lazy(() => FounderLogEntryTagEntryIdTagIdCompoundUniqueInputSchema).optional(),
  AND: z.union([ z.lazy(() => FounderLogEntryTagWhereInputSchema),z.lazy(() => FounderLogEntryTagWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => FounderLogEntryTagWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => FounderLogEntryTagWhereInputSchema),z.lazy(() => FounderLogEntryTagWhereInputSchema).array() ]).optional(),
  entryId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  tagId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  entry: z.union([ z.lazy(() => FounderLogEntryScalarRelationFilterSchema),z.lazy(() => FounderLogEntryWhereInputSchema) ]).optional(),
  tag: z.union([ z.lazy(() => FounderLogTagScalarRelationFilterSchema),z.lazy(() => FounderLogTagWhereInputSchema) ]).optional(),
}).strict());

export const FounderLogEntryTagOrderByWithAggregationInputSchema: z.ZodType<Prisma.FounderLogEntryTagOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  entryId: z.lazy(() => SortOrderSchema).optional(),
  tagId: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => FounderLogEntryTagCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => FounderLogEntryTagMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => FounderLogEntryTagMinOrderByAggregateInputSchema).optional()
}).strict();

export const FounderLogEntryTagScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.FounderLogEntryTagScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => FounderLogEntryTagScalarWhereWithAggregatesInputSchema),z.lazy(() => FounderLogEntryTagScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => FounderLogEntryTagScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => FounderLogEntryTagScalarWhereWithAggregatesInputSchema),z.lazy(() => FounderLogEntryTagScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  entryId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  tagId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
}).strict();

export const FounderLogReflectionWhereInputSchema: z.ZodType<Prisma.FounderLogReflectionWhereInput> = z.object({
  AND: z.union([ z.lazy(() => FounderLogReflectionWhereInputSchema),z.lazy(() => FounderLogReflectionWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => FounderLogReflectionWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => FounderLogReflectionWhereInputSchema),z.lazy(() => FounderLogReflectionWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  userId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  type: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  content: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  user: z.union([ z.lazy(() => UserScalarRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional(),
}).strict();

export const FounderLogReflectionOrderByWithRelationInputSchema: z.ZodType<Prisma.FounderLogReflectionOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  type: z.lazy(() => SortOrderSchema).optional(),
  content: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  user: z.lazy(() => UserOrderByWithRelationInputSchema).optional()
}).strict();

export const FounderLogReflectionWhereUniqueInputSchema: z.ZodType<Prisma.FounderLogReflectionWhereUniqueInput> = z.object({
  id: z.string().cuid()
})
.and(z.object({
  id: z.string().cuid().optional(),
  AND: z.union([ z.lazy(() => FounderLogReflectionWhereInputSchema),z.lazy(() => FounderLogReflectionWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => FounderLogReflectionWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => FounderLogReflectionWhereInputSchema),z.lazy(() => FounderLogReflectionWhereInputSchema).array() ]).optional(),
  userId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  type: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  content: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  user: z.union([ z.lazy(() => UserScalarRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional(),
}).strict());

export const FounderLogReflectionOrderByWithAggregationInputSchema: z.ZodType<Prisma.FounderLogReflectionOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  type: z.lazy(() => SortOrderSchema).optional(),
  content: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => FounderLogReflectionCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => FounderLogReflectionMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => FounderLogReflectionMinOrderByAggregateInputSchema).optional()
}).strict();

export const FounderLogReflectionScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.FounderLogReflectionScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => FounderLogReflectionScalarWhereWithAggregatesInputSchema),z.lazy(() => FounderLogReflectionScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => FounderLogReflectionScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => FounderLogReflectionScalarWhereWithAggregatesInputSchema),z.lazy(() => FounderLogReflectionScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  userId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  type: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  content: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
}).strict();

export const PostCreateInputSchema: z.ZodType<Prisma.PostCreateInput> = z.object({
  id: z.string().uuid().optional(),
  title: z.string(),
  content: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const PostUncheckedCreateInputSchema: z.ZodType<Prisma.PostUncheckedCreateInput> = z.object({
  id: z.string().uuid().optional(),
  title: z.string(),
  content: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const PostUpdateInputSchema: z.ZodType<Prisma.PostUpdateInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  content: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const PostUncheckedUpdateInputSchema: z.ZodType<Prisma.PostUncheckedUpdateInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  content: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const PostCreateManyInputSchema: z.ZodType<Prisma.PostCreateManyInput> = z.object({
  id: z.string().uuid().optional(),
  title: z.string(),
  content: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const PostUpdateManyMutationInputSchema: z.ZodType<Prisma.PostUpdateManyMutationInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  content: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const PostUncheckedUpdateManyInputSchema: z.ZodType<Prisma.PostUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  content: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const UserCreateInputSchema: z.ZodType<Prisma.UserCreateInput> = z.object({
  id: z.string(),
  firstName: z.string().optional().nullable(),
  lastName: z.string().optional().nullable(),
  username: z.string().optional().nullable(),
  primaryEmailAddress: z.string().optional().nullable(),
  imageUrl: z.string().optional().nullable(),
  clerkUserProperties: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  stripeCustomerId: z.string().optional().nullable(),
  accessType: z.lazy(() => AccessTypeSchema).optional(),
  stripeUserProperties: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  entries: z.lazy(() => FounderLogEntryCreateNestedManyWithoutUserInputSchema).optional(),
  reflections: z.lazy(() => FounderLogReflectionCreateNestedManyWithoutUserInputSchema).optional()
}).strict();

export const UserUncheckedCreateInputSchema: z.ZodType<Prisma.UserUncheckedCreateInput> = z.object({
  id: z.string(),
  firstName: z.string().optional().nullable(),
  lastName: z.string().optional().nullable(),
  username: z.string().optional().nullable(),
  primaryEmailAddress: z.string().optional().nullable(),
  imageUrl: z.string().optional().nullable(),
  clerkUserProperties: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  stripeCustomerId: z.string().optional().nullable(),
  accessType: z.lazy(() => AccessTypeSchema).optional(),
  stripeUserProperties: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  entries: z.lazy(() => FounderLogEntryUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  reflections: z.lazy(() => FounderLogReflectionUncheckedCreateNestedManyWithoutUserInputSchema).optional()
}).strict();

export const UserUpdateInputSchema: z.ZodType<Prisma.UserUpdateInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  firstName: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  lastName: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  username: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  primaryEmailAddress: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  imageUrl: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  clerkUserProperties: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  stripeCustomerId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  accessType: z.union([ z.lazy(() => AccessTypeSchema),z.lazy(() => EnumAccessTypeFieldUpdateOperationsInputSchema) ]).optional(),
  stripeUserProperties: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  entries: z.lazy(() => FounderLogEntryUpdateManyWithoutUserNestedInputSchema).optional(),
  reflections: z.lazy(() => FounderLogReflectionUpdateManyWithoutUserNestedInputSchema).optional()
}).strict();

export const UserUncheckedUpdateInputSchema: z.ZodType<Prisma.UserUncheckedUpdateInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  firstName: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  lastName: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  username: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  primaryEmailAddress: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  imageUrl: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  clerkUserProperties: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  stripeCustomerId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  accessType: z.union([ z.lazy(() => AccessTypeSchema),z.lazy(() => EnumAccessTypeFieldUpdateOperationsInputSchema) ]).optional(),
  stripeUserProperties: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  entries: z.lazy(() => FounderLogEntryUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  reflections: z.lazy(() => FounderLogReflectionUncheckedUpdateManyWithoutUserNestedInputSchema).optional()
}).strict();

export const UserCreateManyInputSchema: z.ZodType<Prisma.UserCreateManyInput> = z.object({
  id: z.string(),
  firstName: z.string().optional().nullable(),
  lastName: z.string().optional().nullable(),
  username: z.string().optional().nullable(),
  primaryEmailAddress: z.string().optional().nullable(),
  imageUrl: z.string().optional().nullable(),
  clerkUserProperties: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  stripeCustomerId: z.string().optional().nullable(),
  accessType: z.lazy(() => AccessTypeSchema).optional(),
  stripeUserProperties: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const UserUpdateManyMutationInputSchema: z.ZodType<Prisma.UserUpdateManyMutationInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  firstName: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  lastName: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  username: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  primaryEmailAddress: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  imageUrl: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  clerkUserProperties: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  stripeCustomerId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  accessType: z.union([ z.lazy(() => AccessTypeSchema),z.lazy(() => EnumAccessTypeFieldUpdateOperationsInputSchema) ]).optional(),
  stripeUserProperties: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const UserUncheckedUpdateManyInputSchema: z.ZodType<Prisma.UserUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  firstName: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  lastName: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  username: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  primaryEmailAddress: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  imageUrl: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  clerkUserProperties: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  stripeCustomerId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  accessType: z.union([ z.lazy(() => AccessTypeSchema),z.lazy(() => EnumAccessTypeFieldUpdateOperationsInputSchema) ]).optional(),
  stripeUserProperties: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const FounderLogTagCreateInputSchema: z.ZodType<Prisma.FounderLogTagCreateInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  entries: z.lazy(() => FounderLogEntryTagCreateNestedManyWithoutTagInputSchema).optional()
}).strict();

export const FounderLogTagUncheckedCreateInputSchema: z.ZodType<Prisma.FounderLogTagUncheckedCreateInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  entries: z.lazy(() => FounderLogEntryTagUncheckedCreateNestedManyWithoutTagInputSchema).optional()
}).strict();

export const FounderLogTagUpdateInputSchema: z.ZodType<Prisma.FounderLogTagUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  entries: z.lazy(() => FounderLogEntryTagUpdateManyWithoutTagNestedInputSchema).optional()
}).strict();

export const FounderLogTagUncheckedUpdateInputSchema: z.ZodType<Prisma.FounderLogTagUncheckedUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  entries: z.lazy(() => FounderLogEntryTagUncheckedUpdateManyWithoutTagNestedInputSchema).optional()
}).strict();

export const FounderLogTagCreateManyInputSchema: z.ZodType<Prisma.FounderLogTagCreateManyInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const FounderLogTagUpdateManyMutationInputSchema: z.ZodType<Prisma.FounderLogTagUpdateManyMutationInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const FounderLogTagUncheckedUpdateManyInputSchema: z.ZodType<Prisma.FounderLogTagUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const FounderLogEntryCreateInputSchema: z.ZodType<Prisma.FounderLogEntryCreateInput> = z.object({
  id: z.string().cuid().optional(),
  content: z.string(),
  upvoteCount: z.number().int().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  user: z.lazy(() => UserCreateNestedOneWithoutEntriesInputSchema),
  tags: z.lazy(() => FounderLogEntryTagCreateNestedManyWithoutEntryInputSchema).optional()
}).strict();

export const FounderLogEntryUncheckedCreateInputSchema: z.ZodType<Prisma.FounderLogEntryUncheckedCreateInput> = z.object({
  id: z.string().cuid().optional(),
  userId: z.string(),
  content: z.string(),
  upvoteCount: z.number().int().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  tags: z.lazy(() => FounderLogEntryTagUncheckedCreateNestedManyWithoutEntryInputSchema).optional()
}).strict();

export const FounderLogEntryUpdateInputSchema: z.ZodType<Prisma.FounderLogEntryUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  content: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  upvoteCount: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  user: z.lazy(() => UserUpdateOneRequiredWithoutEntriesNestedInputSchema).optional(),
  tags: z.lazy(() => FounderLogEntryTagUpdateManyWithoutEntryNestedInputSchema).optional()
}).strict();

export const FounderLogEntryUncheckedUpdateInputSchema: z.ZodType<Prisma.FounderLogEntryUncheckedUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  content: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  upvoteCount: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  tags: z.lazy(() => FounderLogEntryTagUncheckedUpdateManyWithoutEntryNestedInputSchema).optional()
}).strict();

export const FounderLogEntryCreateManyInputSchema: z.ZodType<Prisma.FounderLogEntryCreateManyInput> = z.object({
  id: z.string().cuid().optional(),
  userId: z.string(),
  content: z.string(),
  upvoteCount: z.number().int().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const FounderLogEntryUpdateManyMutationInputSchema: z.ZodType<Prisma.FounderLogEntryUpdateManyMutationInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  content: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  upvoteCount: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const FounderLogEntryUncheckedUpdateManyInputSchema: z.ZodType<Prisma.FounderLogEntryUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  content: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  upvoteCount: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const FounderLogEntryTagCreateInputSchema: z.ZodType<Prisma.FounderLogEntryTagCreateInput> = z.object({
  id: z.string().cuid().optional(),
  createdAt: z.coerce.date().optional(),
  entry: z.lazy(() => FounderLogEntryCreateNestedOneWithoutTagsInputSchema),
  tag: z.lazy(() => FounderLogTagCreateNestedOneWithoutEntriesInputSchema)
}).strict();

export const FounderLogEntryTagUncheckedCreateInputSchema: z.ZodType<Prisma.FounderLogEntryTagUncheckedCreateInput> = z.object({
  id: z.string().cuid().optional(),
  entryId: z.string(),
  tagId: z.string(),
  createdAt: z.coerce.date().optional()
}).strict();

export const FounderLogEntryTagUpdateInputSchema: z.ZodType<Prisma.FounderLogEntryTagUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  entry: z.lazy(() => FounderLogEntryUpdateOneRequiredWithoutTagsNestedInputSchema).optional(),
  tag: z.lazy(() => FounderLogTagUpdateOneRequiredWithoutEntriesNestedInputSchema).optional()
}).strict();

export const FounderLogEntryTagUncheckedUpdateInputSchema: z.ZodType<Prisma.FounderLogEntryTagUncheckedUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  entryId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  tagId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const FounderLogEntryTagCreateManyInputSchema: z.ZodType<Prisma.FounderLogEntryTagCreateManyInput> = z.object({
  id: z.string().cuid().optional(),
  entryId: z.string(),
  tagId: z.string(),
  createdAt: z.coerce.date().optional()
}).strict();

export const FounderLogEntryTagUpdateManyMutationInputSchema: z.ZodType<Prisma.FounderLogEntryTagUpdateManyMutationInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const FounderLogEntryTagUncheckedUpdateManyInputSchema: z.ZodType<Prisma.FounderLogEntryTagUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  entryId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  tagId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const FounderLogReflectionCreateInputSchema: z.ZodType<Prisma.FounderLogReflectionCreateInput> = z.object({
  id: z.string().cuid().optional(),
  type: z.string(),
  content: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  user: z.lazy(() => UserCreateNestedOneWithoutReflectionsInputSchema)
}).strict();

export const FounderLogReflectionUncheckedCreateInputSchema: z.ZodType<Prisma.FounderLogReflectionUncheckedCreateInput> = z.object({
  id: z.string().cuid().optional(),
  userId: z.string(),
  type: z.string(),
  content: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const FounderLogReflectionUpdateInputSchema: z.ZodType<Prisma.FounderLogReflectionUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  content: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  user: z.lazy(() => UserUpdateOneRequiredWithoutReflectionsNestedInputSchema).optional()
}).strict();

export const FounderLogReflectionUncheckedUpdateInputSchema: z.ZodType<Prisma.FounderLogReflectionUncheckedUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  content: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const FounderLogReflectionCreateManyInputSchema: z.ZodType<Prisma.FounderLogReflectionCreateManyInput> = z.object({
  id: z.string().cuid().optional(),
  userId: z.string(),
  type: z.string(),
  content: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const FounderLogReflectionUpdateManyMutationInputSchema: z.ZodType<Prisma.FounderLogReflectionUpdateManyMutationInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  content: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const FounderLogReflectionUncheckedUpdateManyInputSchema: z.ZodType<Prisma.FounderLogReflectionUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  content: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const StringFilterSchema: z.ZodType<Prisma.StringFilter> = z.object({
  equals: z.string().optional(),
  in: z.string().array().optional(),
  notIn: z.string().array().optional(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  mode: z.lazy(() => QueryModeSchema).optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringFilterSchema) ]).optional(),
}).strict();

export const DateTimeFilterSchema: z.ZodType<Prisma.DateTimeFilter> = z.object({
  equals: z.coerce.date().optional(),
  in: z.coerce.date().array().optional(),
  notIn: z.coerce.date().array().optional(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeFilterSchema) ]).optional(),
}).strict();

export const PostCountOrderByAggregateInputSchema: z.ZodType<Prisma.PostCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  title: z.lazy(() => SortOrderSchema).optional(),
  content: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const PostMaxOrderByAggregateInputSchema: z.ZodType<Prisma.PostMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  title: z.lazy(() => SortOrderSchema).optional(),
  content: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const PostMinOrderByAggregateInputSchema: z.ZodType<Prisma.PostMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  title: z.lazy(() => SortOrderSchema).optional(),
  content: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const StringWithAggregatesFilterSchema: z.ZodType<Prisma.StringWithAggregatesFilter> = z.object({
  equals: z.string().optional(),
  in: z.string().array().optional(),
  notIn: z.string().array().optional(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  mode: z.lazy(() => QueryModeSchema).optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedStringFilterSchema).optional(),
  _max: z.lazy(() => NestedStringFilterSchema).optional()
}).strict();

export const DateTimeWithAggregatesFilterSchema: z.ZodType<Prisma.DateTimeWithAggregatesFilter> = z.object({
  equals: z.coerce.date().optional(),
  in: z.coerce.date().array().optional(),
  notIn: z.coerce.date().array().optional(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedDateTimeFilterSchema).optional(),
  _max: z.lazy(() => NestedDateTimeFilterSchema).optional()
}).strict();

export const StringNullableFilterSchema: z.ZodType<Prisma.StringNullableFilter> = z.object({
  equals: z.string().optional().nullable(),
  in: z.string().array().optional().nullable(),
  notIn: z.string().array().optional().nullable(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  mode: z.lazy(() => QueryModeSchema).optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const JsonNullableFilterSchema: z.ZodType<Prisma.JsonNullableFilter> = z.object({
  equals: InputJsonValueSchema.optional(),
  path: z.string().array().optional(),
  mode: z.lazy(() => QueryModeSchema).optional(),
  string_contains: z.string().optional(),
  string_starts_with: z.string().optional(),
  string_ends_with: z.string().optional(),
  array_starts_with: InputJsonValueSchema.optional().nullable(),
  array_ends_with: InputJsonValueSchema.optional().nullable(),
  array_contains: InputJsonValueSchema.optional().nullable(),
  lt: InputJsonValueSchema.optional(),
  lte: InputJsonValueSchema.optional(),
  gt: InputJsonValueSchema.optional(),
  gte: InputJsonValueSchema.optional(),
  not: InputJsonValueSchema.optional()
}).strict();

export const EnumAccessTypeFilterSchema: z.ZodType<Prisma.EnumAccessTypeFilter> = z.object({
  equals: z.lazy(() => AccessTypeSchema).optional(),
  in: z.lazy(() => AccessTypeSchema).array().optional(),
  notIn: z.lazy(() => AccessTypeSchema).array().optional(),
  not: z.union([ z.lazy(() => AccessTypeSchema),z.lazy(() => NestedEnumAccessTypeFilterSchema) ]).optional(),
}).strict();

export const FounderLogEntryListRelationFilterSchema: z.ZodType<Prisma.FounderLogEntryListRelationFilter> = z.object({
  every: z.lazy(() => FounderLogEntryWhereInputSchema).optional(),
  some: z.lazy(() => FounderLogEntryWhereInputSchema).optional(),
  none: z.lazy(() => FounderLogEntryWhereInputSchema).optional()
}).strict();

export const FounderLogReflectionListRelationFilterSchema: z.ZodType<Prisma.FounderLogReflectionListRelationFilter> = z.object({
  every: z.lazy(() => FounderLogReflectionWhereInputSchema).optional(),
  some: z.lazy(() => FounderLogReflectionWhereInputSchema).optional(),
  none: z.lazy(() => FounderLogReflectionWhereInputSchema).optional()
}).strict();

export const SortOrderInputSchema: z.ZodType<Prisma.SortOrderInput> = z.object({
  sort: z.lazy(() => SortOrderSchema),
  nulls: z.lazy(() => NullsOrderSchema).optional()
}).strict();

export const FounderLogEntryOrderByRelationAggregateInputSchema: z.ZodType<Prisma.FounderLogEntryOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const FounderLogReflectionOrderByRelationAggregateInputSchema: z.ZodType<Prisma.FounderLogReflectionOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const UserCountOrderByAggregateInputSchema: z.ZodType<Prisma.UserCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  firstName: z.lazy(() => SortOrderSchema).optional(),
  lastName: z.lazy(() => SortOrderSchema).optional(),
  username: z.lazy(() => SortOrderSchema).optional(),
  primaryEmailAddress: z.lazy(() => SortOrderSchema).optional(),
  imageUrl: z.lazy(() => SortOrderSchema).optional(),
  clerkUserProperties: z.lazy(() => SortOrderSchema).optional(),
  stripeCustomerId: z.lazy(() => SortOrderSchema).optional(),
  accessType: z.lazy(() => SortOrderSchema).optional(),
  stripeUserProperties: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const UserMaxOrderByAggregateInputSchema: z.ZodType<Prisma.UserMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  firstName: z.lazy(() => SortOrderSchema).optional(),
  lastName: z.lazy(() => SortOrderSchema).optional(),
  username: z.lazy(() => SortOrderSchema).optional(),
  primaryEmailAddress: z.lazy(() => SortOrderSchema).optional(),
  imageUrl: z.lazy(() => SortOrderSchema).optional(),
  stripeCustomerId: z.lazy(() => SortOrderSchema).optional(),
  accessType: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const UserMinOrderByAggregateInputSchema: z.ZodType<Prisma.UserMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  firstName: z.lazy(() => SortOrderSchema).optional(),
  lastName: z.lazy(() => SortOrderSchema).optional(),
  username: z.lazy(() => SortOrderSchema).optional(),
  primaryEmailAddress: z.lazy(() => SortOrderSchema).optional(),
  imageUrl: z.lazy(() => SortOrderSchema).optional(),
  stripeCustomerId: z.lazy(() => SortOrderSchema).optional(),
  accessType: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const StringNullableWithAggregatesFilterSchema: z.ZodType<Prisma.StringNullableWithAggregatesFilter> = z.object({
  equals: z.string().optional().nullable(),
  in: z.string().array().optional().nullable(),
  notIn: z.string().array().optional().nullable(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  mode: z.lazy(() => QueryModeSchema).optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedStringNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedStringNullableFilterSchema).optional()
}).strict();

export const JsonNullableWithAggregatesFilterSchema: z.ZodType<Prisma.JsonNullableWithAggregatesFilter> = z.object({
  equals: InputJsonValueSchema.optional(),
  path: z.string().array().optional(),
  mode: z.lazy(() => QueryModeSchema).optional(),
  string_contains: z.string().optional(),
  string_starts_with: z.string().optional(),
  string_ends_with: z.string().optional(),
  array_starts_with: InputJsonValueSchema.optional().nullable(),
  array_ends_with: InputJsonValueSchema.optional().nullable(),
  array_contains: InputJsonValueSchema.optional().nullable(),
  lt: InputJsonValueSchema.optional(),
  lte: InputJsonValueSchema.optional(),
  gt: InputJsonValueSchema.optional(),
  gte: InputJsonValueSchema.optional(),
  not: InputJsonValueSchema.optional(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedJsonNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedJsonNullableFilterSchema).optional()
}).strict();

export const EnumAccessTypeWithAggregatesFilterSchema: z.ZodType<Prisma.EnumAccessTypeWithAggregatesFilter> = z.object({
  equals: z.lazy(() => AccessTypeSchema).optional(),
  in: z.lazy(() => AccessTypeSchema).array().optional(),
  notIn: z.lazy(() => AccessTypeSchema).array().optional(),
  not: z.union([ z.lazy(() => AccessTypeSchema),z.lazy(() => NestedEnumAccessTypeWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumAccessTypeFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumAccessTypeFilterSchema).optional()
}).strict();

export const FounderLogEntryTagListRelationFilterSchema: z.ZodType<Prisma.FounderLogEntryTagListRelationFilter> = z.object({
  every: z.lazy(() => FounderLogEntryTagWhereInputSchema).optional(),
  some: z.lazy(() => FounderLogEntryTagWhereInputSchema).optional(),
  none: z.lazy(() => FounderLogEntryTagWhereInputSchema).optional()
}).strict();

export const FounderLogEntryTagOrderByRelationAggregateInputSchema: z.ZodType<Prisma.FounderLogEntryTagOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const FounderLogTagCountOrderByAggregateInputSchema: z.ZodType<Prisma.FounderLogTagCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const FounderLogTagMaxOrderByAggregateInputSchema: z.ZodType<Prisma.FounderLogTagMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const FounderLogTagMinOrderByAggregateInputSchema: z.ZodType<Prisma.FounderLogTagMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const IntFilterSchema: z.ZodType<Prisma.IntFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntFilterSchema) ]).optional(),
}).strict();

export const UserScalarRelationFilterSchema: z.ZodType<Prisma.UserScalarRelationFilter> = z.object({
  is: z.lazy(() => UserWhereInputSchema).optional(),
  isNot: z.lazy(() => UserWhereInputSchema).optional()
}).strict();

export const FounderLogEntryCountOrderByAggregateInputSchema: z.ZodType<Prisma.FounderLogEntryCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  content: z.lazy(() => SortOrderSchema).optional(),
  upvoteCount: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const FounderLogEntryAvgOrderByAggregateInputSchema: z.ZodType<Prisma.FounderLogEntryAvgOrderByAggregateInput> = z.object({
  upvoteCount: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const FounderLogEntryMaxOrderByAggregateInputSchema: z.ZodType<Prisma.FounderLogEntryMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  content: z.lazy(() => SortOrderSchema).optional(),
  upvoteCount: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const FounderLogEntryMinOrderByAggregateInputSchema: z.ZodType<Prisma.FounderLogEntryMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  content: z.lazy(() => SortOrderSchema).optional(),
  upvoteCount: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const FounderLogEntrySumOrderByAggregateInputSchema: z.ZodType<Prisma.FounderLogEntrySumOrderByAggregateInput> = z.object({
  upvoteCount: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const IntWithAggregatesFilterSchema: z.ZodType<Prisma.IntWithAggregatesFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _avg: z.lazy(() => NestedFloatFilterSchema).optional(),
  _sum: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedIntFilterSchema).optional(),
  _max: z.lazy(() => NestedIntFilterSchema).optional()
}).strict();

export const FounderLogEntryScalarRelationFilterSchema: z.ZodType<Prisma.FounderLogEntryScalarRelationFilter> = z.object({
  is: z.lazy(() => FounderLogEntryWhereInputSchema).optional(),
  isNot: z.lazy(() => FounderLogEntryWhereInputSchema).optional()
}).strict();

export const FounderLogTagScalarRelationFilterSchema: z.ZodType<Prisma.FounderLogTagScalarRelationFilter> = z.object({
  is: z.lazy(() => FounderLogTagWhereInputSchema).optional(),
  isNot: z.lazy(() => FounderLogTagWhereInputSchema).optional()
}).strict();

export const FounderLogEntryTagEntryIdTagIdCompoundUniqueInputSchema: z.ZodType<Prisma.FounderLogEntryTagEntryIdTagIdCompoundUniqueInput> = z.object({
  entryId: z.string(),
  tagId: z.string()
}).strict();

export const FounderLogEntryTagCountOrderByAggregateInputSchema: z.ZodType<Prisma.FounderLogEntryTagCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  entryId: z.lazy(() => SortOrderSchema).optional(),
  tagId: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const FounderLogEntryTagMaxOrderByAggregateInputSchema: z.ZodType<Prisma.FounderLogEntryTagMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  entryId: z.lazy(() => SortOrderSchema).optional(),
  tagId: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const FounderLogEntryTagMinOrderByAggregateInputSchema: z.ZodType<Prisma.FounderLogEntryTagMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  entryId: z.lazy(() => SortOrderSchema).optional(),
  tagId: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const FounderLogReflectionCountOrderByAggregateInputSchema: z.ZodType<Prisma.FounderLogReflectionCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  type: z.lazy(() => SortOrderSchema).optional(),
  content: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const FounderLogReflectionMaxOrderByAggregateInputSchema: z.ZodType<Prisma.FounderLogReflectionMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  type: z.lazy(() => SortOrderSchema).optional(),
  content: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const FounderLogReflectionMinOrderByAggregateInputSchema: z.ZodType<Prisma.FounderLogReflectionMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  type: z.lazy(() => SortOrderSchema).optional(),
  content: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const StringFieldUpdateOperationsInputSchema: z.ZodType<Prisma.StringFieldUpdateOperationsInput> = z.object({
  set: z.string().optional()
}).strict();

export const DateTimeFieldUpdateOperationsInputSchema: z.ZodType<Prisma.DateTimeFieldUpdateOperationsInput> = z.object({
  set: z.coerce.date().optional()
}).strict();

export const FounderLogEntryCreateNestedManyWithoutUserInputSchema: z.ZodType<Prisma.FounderLogEntryCreateNestedManyWithoutUserInput> = z.object({
  create: z.union([ z.lazy(() => FounderLogEntryCreateWithoutUserInputSchema),z.lazy(() => FounderLogEntryCreateWithoutUserInputSchema).array(),z.lazy(() => FounderLogEntryUncheckedCreateWithoutUserInputSchema),z.lazy(() => FounderLogEntryUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => FounderLogEntryCreateOrConnectWithoutUserInputSchema),z.lazy(() => FounderLogEntryCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => FounderLogEntryCreateManyUserInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => FounderLogEntryWhereUniqueInputSchema),z.lazy(() => FounderLogEntryWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const FounderLogReflectionCreateNestedManyWithoutUserInputSchema: z.ZodType<Prisma.FounderLogReflectionCreateNestedManyWithoutUserInput> = z.object({
  create: z.union([ z.lazy(() => FounderLogReflectionCreateWithoutUserInputSchema),z.lazy(() => FounderLogReflectionCreateWithoutUserInputSchema).array(),z.lazy(() => FounderLogReflectionUncheckedCreateWithoutUserInputSchema),z.lazy(() => FounderLogReflectionUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => FounderLogReflectionCreateOrConnectWithoutUserInputSchema),z.lazy(() => FounderLogReflectionCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => FounderLogReflectionCreateManyUserInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => FounderLogReflectionWhereUniqueInputSchema),z.lazy(() => FounderLogReflectionWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const FounderLogEntryUncheckedCreateNestedManyWithoutUserInputSchema: z.ZodType<Prisma.FounderLogEntryUncheckedCreateNestedManyWithoutUserInput> = z.object({
  create: z.union([ z.lazy(() => FounderLogEntryCreateWithoutUserInputSchema),z.lazy(() => FounderLogEntryCreateWithoutUserInputSchema).array(),z.lazy(() => FounderLogEntryUncheckedCreateWithoutUserInputSchema),z.lazy(() => FounderLogEntryUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => FounderLogEntryCreateOrConnectWithoutUserInputSchema),z.lazy(() => FounderLogEntryCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => FounderLogEntryCreateManyUserInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => FounderLogEntryWhereUniqueInputSchema),z.lazy(() => FounderLogEntryWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const FounderLogReflectionUncheckedCreateNestedManyWithoutUserInputSchema: z.ZodType<Prisma.FounderLogReflectionUncheckedCreateNestedManyWithoutUserInput> = z.object({
  create: z.union([ z.lazy(() => FounderLogReflectionCreateWithoutUserInputSchema),z.lazy(() => FounderLogReflectionCreateWithoutUserInputSchema).array(),z.lazy(() => FounderLogReflectionUncheckedCreateWithoutUserInputSchema),z.lazy(() => FounderLogReflectionUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => FounderLogReflectionCreateOrConnectWithoutUserInputSchema),z.lazy(() => FounderLogReflectionCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => FounderLogReflectionCreateManyUserInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => FounderLogReflectionWhereUniqueInputSchema),z.lazy(() => FounderLogReflectionWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const NullableStringFieldUpdateOperationsInputSchema: z.ZodType<Prisma.NullableStringFieldUpdateOperationsInput> = z.object({
  set: z.string().optional().nullable()
}).strict();

export const EnumAccessTypeFieldUpdateOperationsInputSchema: z.ZodType<Prisma.EnumAccessTypeFieldUpdateOperationsInput> = z.object({
  set: z.lazy(() => AccessTypeSchema).optional()
}).strict();

export const FounderLogEntryUpdateManyWithoutUserNestedInputSchema: z.ZodType<Prisma.FounderLogEntryUpdateManyWithoutUserNestedInput> = z.object({
  create: z.union([ z.lazy(() => FounderLogEntryCreateWithoutUserInputSchema),z.lazy(() => FounderLogEntryCreateWithoutUserInputSchema).array(),z.lazy(() => FounderLogEntryUncheckedCreateWithoutUserInputSchema),z.lazy(() => FounderLogEntryUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => FounderLogEntryCreateOrConnectWithoutUserInputSchema),z.lazy(() => FounderLogEntryCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => FounderLogEntryUpsertWithWhereUniqueWithoutUserInputSchema),z.lazy(() => FounderLogEntryUpsertWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => FounderLogEntryCreateManyUserInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => FounderLogEntryWhereUniqueInputSchema),z.lazy(() => FounderLogEntryWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => FounderLogEntryWhereUniqueInputSchema),z.lazy(() => FounderLogEntryWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => FounderLogEntryWhereUniqueInputSchema),z.lazy(() => FounderLogEntryWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => FounderLogEntryWhereUniqueInputSchema),z.lazy(() => FounderLogEntryWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => FounderLogEntryUpdateWithWhereUniqueWithoutUserInputSchema),z.lazy(() => FounderLogEntryUpdateWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => FounderLogEntryUpdateManyWithWhereWithoutUserInputSchema),z.lazy(() => FounderLogEntryUpdateManyWithWhereWithoutUserInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => FounderLogEntryScalarWhereInputSchema),z.lazy(() => FounderLogEntryScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const FounderLogReflectionUpdateManyWithoutUserNestedInputSchema: z.ZodType<Prisma.FounderLogReflectionUpdateManyWithoutUserNestedInput> = z.object({
  create: z.union([ z.lazy(() => FounderLogReflectionCreateWithoutUserInputSchema),z.lazy(() => FounderLogReflectionCreateWithoutUserInputSchema).array(),z.lazy(() => FounderLogReflectionUncheckedCreateWithoutUserInputSchema),z.lazy(() => FounderLogReflectionUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => FounderLogReflectionCreateOrConnectWithoutUserInputSchema),z.lazy(() => FounderLogReflectionCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => FounderLogReflectionUpsertWithWhereUniqueWithoutUserInputSchema),z.lazy(() => FounderLogReflectionUpsertWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => FounderLogReflectionCreateManyUserInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => FounderLogReflectionWhereUniqueInputSchema),z.lazy(() => FounderLogReflectionWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => FounderLogReflectionWhereUniqueInputSchema),z.lazy(() => FounderLogReflectionWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => FounderLogReflectionWhereUniqueInputSchema),z.lazy(() => FounderLogReflectionWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => FounderLogReflectionWhereUniqueInputSchema),z.lazy(() => FounderLogReflectionWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => FounderLogReflectionUpdateWithWhereUniqueWithoutUserInputSchema),z.lazy(() => FounderLogReflectionUpdateWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => FounderLogReflectionUpdateManyWithWhereWithoutUserInputSchema),z.lazy(() => FounderLogReflectionUpdateManyWithWhereWithoutUserInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => FounderLogReflectionScalarWhereInputSchema),z.lazy(() => FounderLogReflectionScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const FounderLogEntryUncheckedUpdateManyWithoutUserNestedInputSchema: z.ZodType<Prisma.FounderLogEntryUncheckedUpdateManyWithoutUserNestedInput> = z.object({
  create: z.union([ z.lazy(() => FounderLogEntryCreateWithoutUserInputSchema),z.lazy(() => FounderLogEntryCreateWithoutUserInputSchema).array(),z.lazy(() => FounderLogEntryUncheckedCreateWithoutUserInputSchema),z.lazy(() => FounderLogEntryUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => FounderLogEntryCreateOrConnectWithoutUserInputSchema),z.lazy(() => FounderLogEntryCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => FounderLogEntryUpsertWithWhereUniqueWithoutUserInputSchema),z.lazy(() => FounderLogEntryUpsertWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => FounderLogEntryCreateManyUserInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => FounderLogEntryWhereUniqueInputSchema),z.lazy(() => FounderLogEntryWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => FounderLogEntryWhereUniqueInputSchema),z.lazy(() => FounderLogEntryWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => FounderLogEntryWhereUniqueInputSchema),z.lazy(() => FounderLogEntryWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => FounderLogEntryWhereUniqueInputSchema),z.lazy(() => FounderLogEntryWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => FounderLogEntryUpdateWithWhereUniqueWithoutUserInputSchema),z.lazy(() => FounderLogEntryUpdateWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => FounderLogEntryUpdateManyWithWhereWithoutUserInputSchema),z.lazy(() => FounderLogEntryUpdateManyWithWhereWithoutUserInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => FounderLogEntryScalarWhereInputSchema),z.lazy(() => FounderLogEntryScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const FounderLogReflectionUncheckedUpdateManyWithoutUserNestedInputSchema: z.ZodType<Prisma.FounderLogReflectionUncheckedUpdateManyWithoutUserNestedInput> = z.object({
  create: z.union([ z.lazy(() => FounderLogReflectionCreateWithoutUserInputSchema),z.lazy(() => FounderLogReflectionCreateWithoutUserInputSchema).array(),z.lazy(() => FounderLogReflectionUncheckedCreateWithoutUserInputSchema),z.lazy(() => FounderLogReflectionUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => FounderLogReflectionCreateOrConnectWithoutUserInputSchema),z.lazy(() => FounderLogReflectionCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => FounderLogReflectionUpsertWithWhereUniqueWithoutUserInputSchema),z.lazy(() => FounderLogReflectionUpsertWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => FounderLogReflectionCreateManyUserInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => FounderLogReflectionWhereUniqueInputSchema),z.lazy(() => FounderLogReflectionWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => FounderLogReflectionWhereUniqueInputSchema),z.lazy(() => FounderLogReflectionWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => FounderLogReflectionWhereUniqueInputSchema),z.lazy(() => FounderLogReflectionWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => FounderLogReflectionWhereUniqueInputSchema),z.lazy(() => FounderLogReflectionWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => FounderLogReflectionUpdateWithWhereUniqueWithoutUserInputSchema),z.lazy(() => FounderLogReflectionUpdateWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => FounderLogReflectionUpdateManyWithWhereWithoutUserInputSchema),z.lazy(() => FounderLogReflectionUpdateManyWithWhereWithoutUserInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => FounderLogReflectionScalarWhereInputSchema),z.lazy(() => FounderLogReflectionScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const FounderLogEntryTagCreateNestedManyWithoutTagInputSchema: z.ZodType<Prisma.FounderLogEntryTagCreateNestedManyWithoutTagInput> = z.object({
  create: z.union([ z.lazy(() => FounderLogEntryTagCreateWithoutTagInputSchema),z.lazy(() => FounderLogEntryTagCreateWithoutTagInputSchema).array(),z.lazy(() => FounderLogEntryTagUncheckedCreateWithoutTagInputSchema),z.lazy(() => FounderLogEntryTagUncheckedCreateWithoutTagInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => FounderLogEntryTagCreateOrConnectWithoutTagInputSchema),z.lazy(() => FounderLogEntryTagCreateOrConnectWithoutTagInputSchema).array() ]).optional(),
  createMany: z.lazy(() => FounderLogEntryTagCreateManyTagInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => FounderLogEntryTagWhereUniqueInputSchema),z.lazy(() => FounderLogEntryTagWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const FounderLogEntryTagUncheckedCreateNestedManyWithoutTagInputSchema: z.ZodType<Prisma.FounderLogEntryTagUncheckedCreateNestedManyWithoutTagInput> = z.object({
  create: z.union([ z.lazy(() => FounderLogEntryTagCreateWithoutTagInputSchema),z.lazy(() => FounderLogEntryTagCreateWithoutTagInputSchema).array(),z.lazy(() => FounderLogEntryTagUncheckedCreateWithoutTagInputSchema),z.lazy(() => FounderLogEntryTagUncheckedCreateWithoutTagInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => FounderLogEntryTagCreateOrConnectWithoutTagInputSchema),z.lazy(() => FounderLogEntryTagCreateOrConnectWithoutTagInputSchema).array() ]).optional(),
  createMany: z.lazy(() => FounderLogEntryTagCreateManyTagInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => FounderLogEntryTagWhereUniqueInputSchema),z.lazy(() => FounderLogEntryTagWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const FounderLogEntryTagUpdateManyWithoutTagNestedInputSchema: z.ZodType<Prisma.FounderLogEntryTagUpdateManyWithoutTagNestedInput> = z.object({
  create: z.union([ z.lazy(() => FounderLogEntryTagCreateWithoutTagInputSchema),z.lazy(() => FounderLogEntryTagCreateWithoutTagInputSchema).array(),z.lazy(() => FounderLogEntryTagUncheckedCreateWithoutTagInputSchema),z.lazy(() => FounderLogEntryTagUncheckedCreateWithoutTagInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => FounderLogEntryTagCreateOrConnectWithoutTagInputSchema),z.lazy(() => FounderLogEntryTagCreateOrConnectWithoutTagInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => FounderLogEntryTagUpsertWithWhereUniqueWithoutTagInputSchema),z.lazy(() => FounderLogEntryTagUpsertWithWhereUniqueWithoutTagInputSchema).array() ]).optional(),
  createMany: z.lazy(() => FounderLogEntryTagCreateManyTagInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => FounderLogEntryTagWhereUniqueInputSchema),z.lazy(() => FounderLogEntryTagWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => FounderLogEntryTagWhereUniqueInputSchema),z.lazy(() => FounderLogEntryTagWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => FounderLogEntryTagWhereUniqueInputSchema),z.lazy(() => FounderLogEntryTagWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => FounderLogEntryTagWhereUniqueInputSchema),z.lazy(() => FounderLogEntryTagWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => FounderLogEntryTagUpdateWithWhereUniqueWithoutTagInputSchema),z.lazy(() => FounderLogEntryTagUpdateWithWhereUniqueWithoutTagInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => FounderLogEntryTagUpdateManyWithWhereWithoutTagInputSchema),z.lazy(() => FounderLogEntryTagUpdateManyWithWhereWithoutTagInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => FounderLogEntryTagScalarWhereInputSchema),z.lazy(() => FounderLogEntryTagScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const FounderLogEntryTagUncheckedUpdateManyWithoutTagNestedInputSchema: z.ZodType<Prisma.FounderLogEntryTagUncheckedUpdateManyWithoutTagNestedInput> = z.object({
  create: z.union([ z.lazy(() => FounderLogEntryTagCreateWithoutTagInputSchema),z.lazy(() => FounderLogEntryTagCreateWithoutTagInputSchema).array(),z.lazy(() => FounderLogEntryTagUncheckedCreateWithoutTagInputSchema),z.lazy(() => FounderLogEntryTagUncheckedCreateWithoutTagInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => FounderLogEntryTagCreateOrConnectWithoutTagInputSchema),z.lazy(() => FounderLogEntryTagCreateOrConnectWithoutTagInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => FounderLogEntryTagUpsertWithWhereUniqueWithoutTagInputSchema),z.lazy(() => FounderLogEntryTagUpsertWithWhereUniqueWithoutTagInputSchema).array() ]).optional(),
  createMany: z.lazy(() => FounderLogEntryTagCreateManyTagInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => FounderLogEntryTagWhereUniqueInputSchema),z.lazy(() => FounderLogEntryTagWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => FounderLogEntryTagWhereUniqueInputSchema),z.lazy(() => FounderLogEntryTagWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => FounderLogEntryTagWhereUniqueInputSchema),z.lazy(() => FounderLogEntryTagWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => FounderLogEntryTagWhereUniqueInputSchema),z.lazy(() => FounderLogEntryTagWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => FounderLogEntryTagUpdateWithWhereUniqueWithoutTagInputSchema),z.lazy(() => FounderLogEntryTagUpdateWithWhereUniqueWithoutTagInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => FounderLogEntryTagUpdateManyWithWhereWithoutTagInputSchema),z.lazy(() => FounderLogEntryTagUpdateManyWithWhereWithoutTagInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => FounderLogEntryTagScalarWhereInputSchema),z.lazy(() => FounderLogEntryTagScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const UserCreateNestedOneWithoutEntriesInputSchema: z.ZodType<Prisma.UserCreateNestedOneWithoutEntriesInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutEntriesInputSchema),z.lazy(() => UserUncheckedCreateWithoutEntriesInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutEntriesInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional()
}).strict();

export const FounderLogEntryTagCreateNestedManyWithoutEntryInputSchema: z.ZodType<Prisma.FounderLogEntryTagCreateNestedManyWithoutEntryInput> = z.object({
  create: z.union([ z.lazy(() => FounderLogEntryTagCreateWithoutEntryInputSchema),z.lazy(() => FounderLogEntryTagCreateWithoutEntryInputSchema).array(),z.lazy(() => FounderLogEntryTagUncheckedCreateWithoutEntryInputSchema),z.lazy(() => FounderLogEntryTagUncheckedCreateWithoutEntryInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => FounderLogEntryTagCreateOrConnectWithoutEntryInputSchema),z.lazy(() => FounderLogEntryTagCreateOrConnectWithoutEntryInputSchema).array() ]).optional(),
  createMany: z.lazy(() => FounderLogEntryTagCreateManyEntryInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => FounderLogEntryTagWhereUniqueInputSchema),z.lazy(() => FounderLogEntryTagWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const FounderLogEntryTagUncheckedCreateNestedManyWithoutEntryInputSchema: z.ZodType<Prisma.FounderLogEntryTagUncheckedCreateNestedManyWithoutEntryInput> = z.object({
  create: z.union([ z.lazy(() => FounderLogEntryTagCreateWithoutEntryInputSchema),z.lazy(() => FounderLogEntryTagCreateWithoutEntryInputSchema).array(),z.lazy(() => FounderLogEntryTagUncheckedCreateWithoutEntryInputSchema),z.lazy(() => FounderLogEntryTagUncheckedCreateWithoutEntryInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => FounderLogEntryTagCreateOrConnectWithoutEntryInputSchema),z.lazy(() => FounderLogEntryTagCreateOrConnectWithoutEntryInputSchema).array() ]).optional(),
  createMany: z.lazy(() => FounderLogEntryTagCreateManyEntryInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => FounderLogEntryTagWhereUniqueInputSchema),z.lazy(() => FounderLogEntryTagWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const IntFieldUpdateOperationsInputSchema: z.ZodType<Prisma.IntFieldUpdateOperationsInput> = z.object({
  set: z.number().optional(),
  increment: z.number().optional(),
  decrement: z.number().optional(),
  multiply: z.number().optional(),
  divide: z.number().optional()
}).strict();

export const UserUpdateOneRequiredWithoutEntriesNestedInputSchema: z.ZodType<Prisma.UserUpdateOneRequiredWithoutEntriesNestedInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutEntriesInputSchema),z.lazy(() => UserUncheckedCreateWithoutEntriesInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutEntriesInputSchema).optional(),
  upsert: z.lazy(() => UserUpsertWithoutEntriesInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => UserUpdateToOneWithWhereWithoutEntriesInputSchema),z.lazy(() => UserUpdateWithoutEntriesInputSchema),z.lazy(() => UserUncheckedUpdateWithoutEntriesInputSchema) ]).optional(),
}).strict();

export const FounderLogEntryTagUpdateManyWithoutEntryNestedInputSchema: z.ZodType<Prisma.FounderLogEntryTagUpdateManyWithoutEntryNestedInput> = z.object({
  create: z.union([ z.lazy(() => FounderLogEntryTagCreateWithoutEntryInputSchema),z.lazy(() => FounderLogEntryTagCreateWithoutEntryInputSchema).array(),z.lazy(() => FounderLogEntryTagUncheckedCreateWithoutEntryInputSchema),z.lazy(() => FounderLogEntryTagUncheckedCreateWithoutEntryInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => FounderLogEntryTagCreateOrConnectWithoutEntryInputSchema),z.lazy(() => FounderLogEntryTagCreateOrConnectWithoutEntryInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => FounderLogEntryTagUpsertWithWhereUniqueWithoutEntryInputSchema),z.lazy(() => FounderLogEntryTagUpsertWithWhereUniqueWithoutEntryInputSchema).array() ]).optional(),
  createMany: z.lazy(() => FounderLogEntryTagCreateManyEntryInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => FounderLogEntryTagWhereUniqueInputSchema),z.lazy(() => FounderLogEntryTagWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => FounderLogEntryTagWhereUniqueInputSchema),z.lazy(() => FounderLogEntryTagWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => FounderLogEntryTagWhereUniqueInputSchema),z.lazy(() => FounderLogEntryTagWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => FounderLogEntryTagWhereUniqueInputSchema),z.lazy(() => FounderLogEntryTagWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => FounderLogEntryTagUpdateWithWhereUniqueWithoutEntryInputSchema),z.lazy(() => FounderLogEntryTagUpdateWithWhereUniqueWithoutEntryInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => FounderLogEntryTagUpdateManyWithWhereWithoutEntryInputSchema),z.lazy(() => FounderLogEntryTagUpdateManyWithWhereWithoutEntryInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => FounderLogEntryTagScalarWhereInputSchema),z.lazy(() => FounderLogEntryTagScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const FounderLogEntryTagUncheckedUpdateManyWithoutEntryNestedInputSchema: z.ZodType<Prisma.FounderLogEntryTagUncheckedUpdateManyWithoutEntryNestedInput> = z.object({
  create: z.union([ z.lazy(() => FounderLogEntryTagCreateWithoutEntryInputSchema),z.lazy(() => FounderLogEntryTagCreateWithoutEntryInputSchema).array(),z.lazy(() => FounderLogEntryTagUncheckedCreateWithoutEntryInputSchema),z.lazy(() => FounderLogEntryTagUncheckedCreateWithoutEntryInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => FounderLogEntryTagCreateOrConnectWithoutEntryInputSchema),z.lazy(() => FounderLogEntryTagCreateOrConnectWithoutEntryInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => FounderLogEntryTagUpsertWithWhereUniqueWithoutEntryInputSchema),z.lazy(() => FounderLogEntryTagUpsertWithWhereUniqueWithoutEntryInputSchema).array() ]).optional(),
  createMany: z.lazy(() => FounderLogEntryTagCreateManyEntryInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => FounderLogEntryTagWhereUniqueInputSchema),z.lazy(() => FounderLogEntryTagWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => FounderLogEntryTagWhereUniqueInputSchema),z.lazy(() => FounderLogEntryTagWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => FounderLogEntryTagWhereUniqueInputSchema),z.lazy(() => FounderLogEntryTagWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => FounderLogEntryTagWhereUniqueInputSchema),z.lazy(() => FounderLogEntryTagWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => FounderLogEntryTagUpdateWithWhereUniqueWithoutEntryInputSchema),z.lazy(() => FounderLogEntryTagUpdateWithWhereUniqueWithoutEntryInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => FounderLogEntryTagUpdateManyWithWhereWithoutEntryInputSchema),z.lazy(() => FounderLogEntryTagUpdateManyWithWhereWithoutEntryInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => FounderLogEntryTagScalarWhereInputSchema),z.lazy(() => FounderLogEntryTagScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const FounderLogEntryCreateNestedOneWithoutTagsInputSchema: z.ZodType<Prisma.FounderLogEntryCreateNestedOneWithoutTagsInput> = z.object({
  create: z.union([ z.lazy(() => FounderLogEntryCreateWithoutTagsInputSchema),z.lazy(() => FounderLogEntryUncheckedCreateWithoutTagsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => FounderLogEntryCreateOrConnectWithoutTagsInputSchema).optional(),
  connect: z.lazy(() => FounderLogEntryWhereUniqueInputSchema).optional()
}).strict();

export const FounderLogTagCreateNestedOneWithoutEntriesInputSchema: z.ZodType<Prisma.FounderLogTagCreateNestedOneWithoutEntriesInput> = z.object({
  create: z.union([ z.lazy(() => FounderLogTagCreateWithoutEntriesInputSchema),z.lazy(() => FounderLogTagUncheckedCreateWithoutEntriesInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => FounderLogTagCreateOrConnectWithoutEntriesInputSchema).optional(),
  connect: z.lazy(() => FounderLogTagWhereUniqueInputSchema).optional()
}).strict();

export const FounderLogEntryUpdateOneRequiredWithoutTagsNestedInputSchema: z.ZodType<Prisma.FounderLogEntryUpdateOneRequiredWithoutTagsNestedInput> = z.object({
  create: z.union([ z.lazy(() => FounderLogEntryCreateWithoutTagsInputSchema),z.lazy(() => FounderLogEntryUncheckedCreateWithoutTagsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => FounderLogEntryCreateOrConnectWithoutTagsInputSchema).optional(),
  upsert: z.lazy(() => FounderLogEntryUpsertWithoutTagsInputSchema).optional(),
  connect: z.lazy(() => FounderLogEntryWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => FounderLogEntryUpdateToOneWithWhereWithoutTagsInputSchema),z.lazy(() => FounderLogEntryUpdateWithoutTagsInputSchema),z.lazy(() => FounderLogEntryUncheckedUpdateWithoutTagsInputSchema) ]).optional(),
}).strict();

export const FounderLogTagUpdateOneRequiredWithoutEntriesNestedInputSchema: z.ZodType<Prisma.FounderLogTagUpdateOneRequiredWithoutEntriesNestedInput> = z.object({
  create: z.union([ z.lazy(() => FounderLogTagCreateWithoutEntriesInputSchema),z.lazy(() => FounderLogTagUncheckedCreateWithoutEntriesInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => FounderLogTagCreateOrConnectWithoutEntriesInputSchema).optional(),
  upsert: z.lazy(() => FounderLogTagUpsertWithoutEntriesInputSchema).optional(),
  connect: z.lazy(() => FounderLogTagWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => FounderLogTagUpdateToOneWithWhereWithoutEntriesInputSchema),z.lazy(() => FounderLogTagUpdateWithoutEntriesInputSchema),z.lazy(() => FounderLogTagUncheckedUpdateWithoutEntriesInputSchema) ]).optional(),
}).strict();

export const UserCreateNestedOneWithoutReflectionsInputSchema: z.ZodType<Prisma.UserCreateNestedOneWithoutReflectionsInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutReflectionsInputSchema),z.lazy(() => UserUncheckedCreateWithoutReflectionsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutReflectionsInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional()
}).strict();

export const UserUpdateOneRequiredWithoutReflectionsNestedInputSchema: z.ZodType<Prisma.UserUpdateOneRequiredWithoutReflectionsNestedInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutReflectionsInputSchema),z.lazy(() => UserUncheckedCreateWithoutReflectionsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutReflectionsInputSchema).optional(),
  upsert: z.lazy(() => UserUpsertWithoutReflectionsInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => UserUpdateToOneWithWhereWithoutReflectionsInputSchema),z.lazy(() => UserUpdateWithoutReflectionsInputSchema),z.lazy(() => UserUncheckedUpdateWithoutReflectionsInputSchema) ]).optional(),
}).strict();

export const NestedStringFilterSchema: z.ZodType<Prisma.NestedStringFilter> = z.object({
  equals: z.string().optional(),
  in: z.string().array().optional(),
  notIn: z.string().array().optional(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringFilterSchema) ]).optional(),
}).strict();

export const NestedDateTimeFilterSchema: z.ZodType<Prisma.NestedDateTimeFilter> = z.object({
  equals: z.coerce.date().optional(),
  in: z.coerce.date().array().optional(),
  notIn: z.coerce.date().array().optional(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeFilterSchema) ]).optional(),
}).strict();

export const NestedStringWithAggregatesFilterSchema: z.ZodType<Prisma.NestedStringWithAggregatesFilter> = z.object({
  equals: z.string().optional(),
  in: z.string().array().optional(),
  notIn: z.string().array().optional(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedStringFilterSchema).optional(),
  _max: z.lazy(() => NestedStringFilterSchema).optional()
}).strict();

export const NestedIntFilterSchema: z.ZodType<Prisma.NestedIntFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntFilterSchema) ]).optional(),
}).strict();

export const NestedDateTimeWithAggregatesFilterSchema: z.ZodType<Prisma.NestedDateTimeWithAggregatesFilter> = z.object({
  equals: z.coerce.date().optional(),
  in: z.coerce.date().array().optional(),
  notIn: z.coerce.date().array().optional(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedDateTimeFilterSchema).optional(),
  _max: z.lazy(() => NestedDateTimeFilterSchema).optional()
}).strict();

export const NestedStringNullableFilterSchema: z.ZodType<Prisma.NestedStringNullableFilter> = z.object({
  equals: z.string().optional().nullable(),
  in: z.string().array().optional().nullable(),
  notIn: z.string().array().optional().nullable(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const NestedEnumAccessTypeFilterSchema: z.ZodType<Prisma.NestedEnumAccessTypeFilter> = z.object({
  equals: z.lazy(() => AccessTypeSchema).optional(),
  in: z.lazy(() => AccessTypeSchema).array().optional(),
  notIn: z.lazy(() => AccessTypeSchema).array().optional(),
  not: z.union([ z.lazy(() => AccessTypeSchema),z.lazy(() => NestedEnumAccessTypeFilterSchema) ]).optional(),
}).strict();

export const NestedStringNullableWithAggregatesFilterSchema: z.ZodType<Prisma.NestedStringNullableWithAggregatesFilter> = z.object({
  equals: z.string().optional().nullable(),
  in: z.string().array().optional().nullable(),
  notIn: z.string().array().optional().nullable(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedStringNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedStringNullableFilterSchema).optional()
}).strict();

export const NestedIntNullableFilterSchema: z.ZodType<Prisma.NestedIntNullableFilter> = z.object({
  equals: z.number().optional().nullable(),
  in: z.number().array().optional().nullable(),
  notIn: z.number().array().optional().nullable(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const NestedJsonNullableFilterSchema: z.ZodType<Prisma.NestedJsonNullableFilter> = z.object({
  equals: InputJsonValueSchema.optional(),
  path: z.string().array().optional(),
  mode: z.lazy(() => QueryModeSchema).optional(),
  string_contains: z.string().optional(),
  string_starts_with: z.string().optional(),
  string_ends_with: z.string().optional(),
  array_starts_with: InputJsonValueSchema.optional().nullable(),
  array_ends_with: InputJsonValueSchema.optional().nullable(),
  array_contains: InputJsonValueSchema.optional().nullable(),
  lt: InputJsonValueSchema.optional(),
  lte: InputJsonValueSchema.optional(),
  gt: InputJsonValueSchema.optional(),
  gte: InputJsonValueSchema.optional(),
  not: InputJsonValueSchema.optional()
}).strict();

export const NestedEnumAccessTypeWithAggregatesFilterSchema: z.ZodType<Prisma.NestedEnumAccessTypeWithAggregatesFilter> = z.object({
  equals: z.lazy(() => AccessTypeSchema).optional(),
  in: z.lazy(() => AccessTypeSchema).array().optional(),
  notIn: z.lazy(() => AccessTypeSchema).array().optional(),
  not: z.union([ z.lazy(() => AccessTypeSchema),z.lazy(() => NestedEnumAccessTypeWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumAccessTypeFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumAccessTypeFilterSchema).optional()
}).strict();

export const NestedIntWithAggregatesFilterSchema: z.ZodType<Prisma.NestedIntWithAggregatesFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _avg: z.lazy(() => NestedFloatFilterSchema).optional(),
  _sum: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedIntFilterSchema).optional(),
  _max: z.lazy(() => NestedIntFilterSchema).optional()
}).strict();

export const NestedFloatFilterSchema: z.ZodType<Prisma.NestedFloatFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedFloatFilterSchema) ]).optional(),
}).strict();

export const FounderLogEntryCreateWithoutUserInputSchema: z.ZodType<Prisma.FounderLogEntryCreateWithoutUserInput> = z.object({
  id: z.string().cuid().optional(),
  content: z.string(),
  upvoteCount: z.number().int().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  tags: z.lazy(() => FounderLogEntryTagCreateNestedManyWithoutEntryInputSchema).optional()
}).strict();

export const FounderLogEntryUncheckedCreateWithoutUserInputSchema: z.ZodType<Prisma.FounderLogEntryUncheckedCreateWithoutUserInput> = z.object({
  id: z.string().cuid().optional(),
  content: z.string(),
  upvoteCount: z.number().int().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  tags: z.lazy(() => FounderLogEntryTagUncheckedCreateNestedManyWithoutEntryInputSchema).optional()
}).strict();

export const FounderLogEntryCreateOrConnectWithoutUserInputSchema: z.ZodType<Prisma.FounderLogEntryCreateOrConnectWithoutUserInput> = z.object({
  where: z.lazy(() => FounderLogEntryWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => FounderLogEntryCreateWithoutUserInputSchema),z.lazy(() => FounderLogEntryUncheckedCreateWithoutUserInputSchema) ]),
}).strict();

export const FounderLogEntryCreateManyUserInputEnvelopeSchema: z.ZodType<Prisma.FounderLogEntryCreateManyUserInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => FounderLogEntryCreateManyUserInputSchema),z.lazy(() => FounderLogEntryCreateManyUserInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const FounderLogReflectionCreateWithoutUserInputSchema: z.ZodType<Prisma.FounderLogReflectionCreateWithoutUserInput> = z.object({
  id: z.string().cuid().optional(),
  type: z.string(),
  content: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const FounderLogReflectionUncheckedCreateWithoutUserInputSchema: z.ZodType<Prisma.FounderLogReflectionUncheckedCreateWithoutUserInput> = z.object({
  id: z.string().cuid().optional(),
  type: z.string(),
  content: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const FounderLogReflectionCreateOrConnectWithoutUserInputSchema: z.ZodType<Prisma.FounderLogReflectionCreateOrConnectWithoutUserInput> = z.object({
  where: z.lazy(() => FounderLogReflectionWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => FounderLogReflectionCreateWithoutUserInputSchema),z.lazy(() => FounderLogReflectionUncheckedCreateWithoutUserInputSchema) ]),
}).strict();

export const FounderLogReflectionCreateManyUserInputEnvelopeSchema: z.ZodType<Prisma.FounderLogReflectionCreateManyUserInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => FounderLogReflectionCreateManyUserInputSchema),z.lazy(() => FounderLogReflectionCreateManyUserInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const FounderLogEntryUpsertWithWhereUniqueWithoutUserInputSchema: z.ZodType<Prisma.FounderLogEntryUpsertWithWhereUniqueWithoutUserInput> = z.object({
  where: z.lazy(() => FounderLogEntryWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => FounderLogEntryUpdateWithoutUserInputSchema),z.lazy(() => FounderLogEntryUncheckedUpdateWithoutUserInputSchema) ]),
  create: z.union([ z.lazy(() => FounderLogEntryCreateWithoutUserInputSchema),z.lazy(() => FounderLogEntryUncheckedCreateWithoutUserInputSchema) ]),
}).strict();

export const FounderLogEntryUpdateWithWhereUniqueWithoutUserInputSchema: z.ZodType<Prisma.FounderLogEntryUpdateWithWhereUniqueWithoutUserInput> = z.object({
  where: z.lazy(() => FounderLogEntryWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => FounderLogEntryUpdateWithoutUserInputSchema),z.lazy(() => FounderLogEntryUncheckedUpdateWithoutUserInputSchema) ]),
}).strict();

export const FounderLogEntryUpdateManyWithWhereWithoutUserInputSchema: z.ZodType<Prisma.FounderLogEntryUpdateManyWithWhereWithoutUserInput> = z.object({
  where: z.lazy(() => FounderLogEntryScalarWhereInputSchema),
  data: z.union([ z.lazy(() => FounderLogEntryUpdateManyMutationInputSchema),z.lazy(() => FounderLogEntryUncheckedUpdateManyWithoutUserInputSchema) ]),
}).strict();

export const FounderLogEntryScalarWhereInputSchema: z.ZodType<Prisma.FounderLogEntryScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => FounderLogEntryScalarWhereInputSchema),z.lazy(() => FounderLogEntryScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => FounderLogEntryScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => FounderLogEntryScalarWhereInputSchema),z.lazy(() => FounderLogEntryScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  userId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  content: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  upvoteCount: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
}).strict();

export const FounderLogReflectionUpsertWithWhereUniqueWithoutUserInputSchema: z.ZodType<Prisma.FounderLogReflectionUpsertWithWhereUniqueWithoutUserInput> = z.object({
  where: z.lazy(() => FounderLogReflectionWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => FounderLogReflectionUpdateWithoutUserInputSchema),z.lazy(() => FounderLogReflectionUncheckedUpdateWithoutUserInputSchema) ]),
  create: z.union([ z.lazy(() => FounderLogReflectionCreateWithoutUserInputSchema),z.lazy(() => FounderLogReflectionUncheckedCreateWithoutUserInputSchema) ]),
}).strict();

export const FounderLogReflectionUpdateWithWhereUniqueWithoutUserInputSchema: z.ZodType<Prisma.FounderLogReflectionUpdateWithWhereUniqueWithoutUserInput> = z.object({
  where: z.lazy(() => FounderLogReflectionWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => FounderLogReflectionUpdateWithoutUserInputSchema),z.lazy(() => FounderLogReflectionUncheckedUpdateWithoutUserInputSchema) ]),
}).strict();

export const FounderLogReflectionUpdateManyWithWhereWithoutUserInputSchema: z.ZodType<Prisma.FounderLogReflectionUpdateManyWithWhereWithoutUserInput> = z.object({
  where: z.lazy(() => FounderLogReflectionScalarWhereInputSchema),
  data: z.union([ z.lazy(() => FounderLogReflectionUpdateManyMutationInputSchema),z.lazy(() => FounderLogReflectionUncheckedUpdateManyWithoutUserInputSchema) ]),
}).strict();

export const FounderLogReflectionScalarWhereInputSchema: z.ZodType<Prisma.FounderLogReflectionScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => FounderLogReflectionScalarWhereInputSchema),z.lazy(() => FounderLogReflectionScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => FounderLogReflectionScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => FounderLogReflectionScalarWhereInputSchema),z.lazy(() => FounderLogReflectionScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  userId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  type: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  content: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
}).strict();

export const FounderLogEntryTagCreateWithoutTagInputSchema: z.ZodType<Prisma.FounderLogEntryTagCreateWithoutTagInput> = z.object({
  id: z.string().cuid().optional(),
  createdAt: z.coerce.date().optional(),
  entry: z.lazy(() => FounderLogEntryCreateNestedOneWithoutTagsInputSchema)
}).strict();

export const FounderLogEntryTagUncheckedCreateWithoutTagInputSchema: z.ZodType<Prisma.FounderLogEntryTagUncheckedCreateWithoutTagInput> = z.object({
  id: z.string().cuid().optional(),
  entryId: z.string(),
  createdAt: z.coerce.date().optional()
}).strict();

export const FounderLogEntryTagCreateOrConnectWithoutTagInputSchema: z.ZodType<Prisma.FounderLogEntryTagCreateOrConnectWithoutTagInput> = z.object({
  where: z.lazy(() => FounderLogEntryTagWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => FounderLogEntryTagCreateWithoutTagInputSchema),z.lazy(() => FounderLogEntryTagUncheckedCreateWithoutTagInputSchema) ]),
}).strict();

export const FounderLogEntryTagCreateManyTagInputEnvelopeSchema: z.ZodType<Prisma.FounderLogEntryTagCreateManyTagInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => FounderLogEntryTagCreateManyTagInputSchema),z.lazy(() => FounderLogEntryTagCreateManyTagInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const FounderLogEntryTagUpsertWithWhereUniqueWithoutTagInputSchema: z.ZodType<Prisma.FounderLogEntryTagUpsertWithWhereUniqueWithoutTagInput> = z.object({
  where: z.lazy(() => FounderLogEntryTagWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => FounderLogEntryTagUpdateWithoutTagInputSchema),z.lazy(() => FounderLogEntryTagUncheckedUpdateWithoutTagInputSchema) ]),
  create: z.union([ z.lazy(() => FounderLogEntryTagCreateWithoutTagInputSchema),z.lazy(() => FounderLogEntryTagUncheckedCreateWithoutTagInputSchema) ]),
}).strict();

export const FounderLogEntryTagUpdateWithWhereUniqueWithoutTagInputSchema: z.ZodType<Prisma.FounderLogEntryTagUpdateWithWhereUniqueWithoutTagInput> = z.object({
  where: z.lazy(() => FounderLogEntryTagWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => FounderLogEntryTagUpdateWithoutTagInputSchema),z.lazy(() => FounderLogEntryTagUncheckedUpdateWithoutTagInputSchema) ]),
}).strict();

export const FounderLogEntryTagUpdateManyWithWhereWithoutTagInputSchema: z.ZodType<Prisma.FounderLogEntryTagUpdateManyWithWhereWithoutTagInput> = z.object({
  where: z.lazy(() => FounderLogEntryTagScalarWhereInputSchema),
  data: z.union([ z.lazy(() => FounderLogEntryTagUpdateManyMutationInputSchema),z.lazy(() => FounderLogEntryTagUncheckedUpdateManyWithoutTagInputSchema) ]),
}).strict();

export const FounderLogEntryTagScalarWhereInputSchema: z.ZodType<Prisma.FounderLogEntryTagScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => FounderLogEntryTagScalarWhereInputSchema),z.lazy(() => FounderLogEntryTagScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => FounderLogEntryTagScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => FounderLogEntryTagScalarWhereInputSchema),z.lazy(() => FounderLogEntryTagScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  entryId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  tagId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
}).strict();

export const UserCreateWithoutEntriesInputSchema: z.ZodType<Prisma.UserCreateWithoutEntriesInput> = z.object({
  id: z.string(),
  firstName: z.string().optional().nullable(),
  lastName: z.string().optional().nullable(),
  username: z.string().optional().nullable(),
  primaryEmailAddress: z.string().optional().nullable(),
  imageUrl: z.string().optional().nullable(),
  clerkUserProperties: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  stripeCustomerId: z.string().optional().nullable(),
  accessType: z.lazy(() => AccessTypeSchema).optional(),
  stripeUserProperties: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  reflections: z.lazy(() => FounderLogReflectionCreateNestedManyWithoutUserInputSchema).optional()
}).strict();

export const UserUncheckedCreateWithoutEntriesInputSchema: z.ZodType<Prisma.UserUncheckedCreateWithoutEntriesInput> = z.object({
  id: z.string(),
  firstName: z.string().optional().nullable(),
  lastName: z.string().optional().nullable(),
  username: z.string().optional().nullable(),
  primaryEmailAddress: z.string().optional().nullable(),
  imageUrl: z.string().optional().nullable(),
  clerkUserProperties: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  stripeCustomerId: z.string().optional().nullable(),
  accessType: z.lazy(() => AccessTypeSchema).optional(),
  stripeUserProperties: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  reflections: z.lazy(() => FounderLogReflectionUncheckedCreateNestedManyWithoutUserInputSchema).optional()
}).strict();

export const UserCreateOrConnectWithoutEntriesInputSchema: z.ZodType<Prisma.UserCreateOrConnectWithoutEntriesInput> = z.object({
  where: z.lazy(() => UserWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => UserCreateWithoutEntriesInputSchema),z.lazy(() => UserUncheckedCreateWithoutEntriesInputSchema) ]),
}).strict();

export const FounderLogEntryTagCreateWithoutEntryInputSchema: z.ZodType<Prisma.FounderLogEntryTagCreateWithoutEntryInput> = z.object({
  id: z.string().cuid().optional(),
  createdAt: z.coerce.date().optional(),
  tag: z.lazy(() => FounderLogTagCreateNestedOneWithoutEntriesInputSchema)
}).strict();

export const FounderLogEntryTagUncheckedCreateWithoutEntryInputSchema: z.ZodType<Prisma.FounderLogEntryTagUncheckedCreateWithoutEntryInput> = z.object({
  id: z.string().cuid().optional(),
  tagId: z.string(),
  createdAt: z.coerce.date().optional()
}).strict();

export const FounderLogEntryTagCreateOrConnectWithoutEntryInputSchema: z.ZodType<Prisma.FounderLogEntryTagCreateOrConnectWithoutEntryInput> = z.object({
  where: z.lazy(() => FounderLogEntryTagWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => FounderLogEntryTagCreateWithoutEntryInputSchema),z.lazy(() => FounderLogEntryTagUncheckedCreateWithoutEntryInputSchema) ]),
}).strict();

export const FounderLogEntryTagCreateManyEntryInputEnvelopeSchema: z.ZodType<Prisma.FounderLogEntryTagCreateManyEntryInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => FounderLogEntryTagCreateManyEntryInputSchema),z.lazy(() => FounderLogEntryTagCreateManyEntryInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const UserUpsertWithoutEntriesInputSchema: z.ZodType<Prisma.UserUpsertWithoutEntriesInput> = z.object({
  update: z.union([ z.lazy(() => UserUpdateWithoutEntriesInputSchema),z.lazy(() => UserUncheckedUpdateWithoutEntriesInputSchema) ]),
  create: z.union([ z.lazy(() => UserCreateWithoutEntriesInputSchema),z.lazy(() => UserUncheckedCreateWithoutEntriesInputSchema) ]),
  where: z.lazy(() => UserWhereInputSchema).optional()
}).strict();

export const UserUpdateToOneWithWhereWithoutEntriesInputSchema: z.ZodType<Prisma.UserUpdateToOneWithWhereWithoutEntriesInput> = z.object({
  where: z.lazy(() => UserWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => UserUpdateWithoutEntriesInputSchema),z.lazy(() => UserUncheckedUpdateWithoutEntriesInputSchema) ]),
}).strict();

export const UserUpdateWithoutEntriesInputSchema: z.ZodType<Prisma.UserUpdateWithoutEntriesInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  firstName: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  lastName: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  username: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  primaryEmailAddress: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  imageUrl: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  clerkUserProperties: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  stripeCustomerId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  accessType: z.union([ z.lazy(() => AccessTypeSchema),z.lazy(() => EnumAccessTypeFieldUpdateOperationsInputSchema) ]).optional(),
  stripeUserProperties: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  reflections: z.lazy(() => FounderLogReflectionUpdateManyWithoutUserNestedInputSchema).optional()
}).strict();

export const UserUncheckedUpdateWithoutEntriesInputSchema: z.ZodType<Prisma.UserUncheckedUpdateWithoutEntriesInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  firstName: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  lastName: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  username: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  primaryEmailAddress: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  imageUrl: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  clerkUserProperties: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  stripeCustomerId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  accessType: z.union([ z.lazy(() => AccessTypeSchema),z.lazy(() => EnumAccessTypeFieldUpdateOperationsInputSchema) ]).optional(),
  stripeUserProperties: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  reflections: z.lazy(() => FounderLogReflectionUncheckedUpdateManyWithoutUserNestedInputSchema).optional()
}).strict();

export const FounderLogEntryTagUpsertWithWhereUniqueWithoutEntryInputSchema: z.ZodType<Prisma.FounderLogEntryTagUpsertWithWhereUniqueWithoutEntryInput> = z.object({
  where: z.lazy(() => FounderLogEntryTagWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => FounderLogEntryTagUpdateWithoutEntryInputSchema),z.lazy(() => FounderLogEntryTagUncheckedUpdateWithoutEntryInputSchema) ]),
  create: z.union([ z.lazy(() => FounderLogEntryTagCreateWithoutEntryInputSchema),z.lazy(() => FounderLogEntryTagUncheckedCreateWithoutEntryInputSchema) ]),
}).strict();

export const FounderLogEntryTagUpdateWithWhereUniqueWithoutEntryInputSchema: z.ZodType<Prisma.FounderLogEntryTagUpdateWithWhereUniqueWithoutEntryInput> = z.object({
  where: z.lazy(() => FounderLogEntryTagWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => FounderLogEntryTagUpdateWithoutEntryInputSchema),z.lazy(() => FounderLogEntryTagUncheckedUpdateWithoutEntryInputSchema) ]),
}).strict();

export const FounderLogEntryTagUpdateManyWithWhereWithoutEntryInputSchema: z.ZodType<Prisma.FounderLogEntryTagUpdateManyWithWhereWithoutEntryInput> = z.object({
  where: z.lazy(() => FounderLogEntryTagScalarWhereInputSchema),
  data: z.union([ z.lazy(() => FounderLogEntryTagUpdateManyMutationInputSchema),z.lazy(() => FounderLogEntryTagUncheckedUpdateManyWithoutEntryInputSchema) ]),
}).strict();

export const FounderLogEntryCreateWithoutTagsInputSchema: z.ZodType<Prisma.FounderLogEntryCreateWithoutTagsInput> = z.object({
  id: z.string().cuid().optional(),
  content: z.string(),
  upvoteCount: z.number().int().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  user: z.lazy(() => UserCreateNestedOneWithoutEntriesInputSchema)
}).strict();

export const FounderLogEntryUncheckedCreateWithoutTagsInputSchema: z.ZodType<Prisma.FounderLogEntryUncheckedCreateWithoutTagsInput> = z.object({
  id: z.string().cuid().optional(),
  userId: z.string(),
  content: z.string(),
  upvoteCount: z.number().int().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const FounderLogEntryCreateOrConnectWithoutTagsInputSchema: z.ZodType<Prisma.FounderLogEntryCreateOrConnectWithoutTagsInput> = z.object({
  where: z.lazy(() => FounderLogEntryWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => FounderLogEntryCreateWithoutTagsInputSchema),z.lazy(() => FounderLogEntryUncheckedCreateWithoutTagsInputSchema) ]),
}).strict();

export const FounderLogTagCreateWithoutEntriesInputSchema: z.ZodType<Prisma.FounderLogTagCreateWithoutEntriesInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const FounderLogTagUncheckedCreateWithoutEntriesInputSchema: z.ZodType<Prisma.FounderLogTagUncheckedCreateWithoutEntriesInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const FounderLogTagCreateOrConnectWithoutEntriesInputSchema: z.ZodType<Prisma.FounderLogTagCreateOrConnectWithoutEntriesInput> = z.object({
  where: z.lazy(() => FounderLogTagWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => FounderLogTagCreateWithoutEntriesInputSchema),z.lazy(() => FounderLogTagUncheckedCreateWithoutEntriesInputSchema) ]),
}).strict();

export const FounderLogEntryUpsertWithoutTagsInputSchema: z.ZodType<Prisma.FounderLogEntryUpsertWithoutTagsInput> = z.object({
  update: z.union([ z.lazy(() => FounderLogEntryUpdateWithoutTagsInputSchema),z.lazy(() => FounderLogEntryUncheckedUpdateWithoutTagsInputSchema) ]),
  create: z.union([ z.lazy(() => FounderLogEntryCreateWithoutTagsInputSchema),z.lazy(() => FounderLogEntryUncheckedCreateWithoutTagsInputSchema) ]),
  where: z.lazy(() => FounderLogEntryWhereInputSchema).optional()
}).strict();

export const FounderLogEntryUpdateToOneWithWhereWithoutTagsInputSchema: z.ZodType<Prisma.FounderLogEntryUpdateToOneWithWhereWithoutTagsInput> = z.object({
  where: z.lazy(() => FounderLogEntryWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => FounderLogEntryUpdateWithoutTagsInputSchema),z.lazy(() => FounderLogEntryUncheckedUpdateWithoutTagsInputSchema) ]),
}).strict();

export const FounderLogEntryUpdateWithoutTagsInputSchema: z.ZodType<Prisma.FounderLogEntryUpdateWithoutTagsInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  content: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  upvoteCount: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  user: z.lazy(() => UserUpdateOneRequiredWithoutEntriesNestedInputSchema).optional()
}).strict();

export const FounderLogEntryUncheckedUpdateWithoutTagsInputSchema: z.ZodType<Prisma.FounderLogEntryUncheckedUpdateWithoutTagsInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  content: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  upvoteCount: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const FounderLogTagUpsertWithoutEntriesInputSchema: z.ZodType<Prisma.FounderLogTagUpsertWithoutEntriesInput> = z.object({
  update: z.union([ z.lazy(() => FounderLogTagUpdateWithoutEntriesInputSchema),z.lazy(() => FounderLogTagUncheckedUpdateWithoutEntriesInputSchema) ]),
  create: z.union([ z.lazy(() => FounderLogTagCreateWithoutEntriesInputSchema),z.lazy(() => FounderLogTagUncheckedCreateWithoutEntriesInputSchema) ]),
  where: z.lazy(() => FounderLogTagWhereInputSchema).optional()
}).strict();

export const FounderLogTagUpdateToOneWithWhereWithoutEntriesInputSchema: z.ZodType<Prisma.FounderLogTagUpdateToOneWithWhereWithoutEntriesInput> = z.object({
  where: z.lazy(() => FounderLogTagWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => FounderLogTagUpdateWithoutEntriesInputSchema),z.lazy(() => FounderLogTagUncheckedUpdateWithoutEntriesInputSchema) ]),
}).strict();

export const FounderLogTagUpdateWithoutEntriesInputSchema: z.ZodType<Prisma.FounderLogTagUpdateWithoutEntriesInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const FounderLogTagUncheckedUpdateWithoutEntriesInputSchema: z.ZodType<Prisma.FounderLogTagUncheckedUpdateWithoutEntriesInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const UserCreateWithoutReflectionsInputSchema: z.ZodType<Prisma.UserCreateWithoutReflectionsInput> = z.object({
  id: z.string(),
  firstName: z.string().optional().nullable(),
  lastName: z.string().optional().nullable(),
  username: z.string().optional().nullable(),
  primaryEmailAddress: z.string().optional().nullable(),
  imageUrl: z.string().optional().nullable(),
  clerkUserProperties: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  stripeCustomerId: z.string().optional().nullable(),
  accessType: z.lazy(() => AccessTypeSchema).optional(),
  stripeUserProperties: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  entries: z.lazy(() => FounderLogEntryCreateNestedManyWithoutUserInputSchema).optional()
}).strict();

export const UserUncheckedCreateWithoutReflectionsInputSchema: z.ZodType<Prisma.UserUncheckedCreateWithoutReflectionsInput> = z.object({
  id: z.string(),
  firstName: z.string().optional().nullable(),
  lastName: z.string().optional().nullable(),
  username: z.string().optional().nullable(),
  primaryEmailAddress: z.string().optional().nullable(),
  imageUrl: z.string().optional().nullable(),
  clerkUserProperties: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  stripeCustomerId: z.string().optional().nullable(),
  accessType: z.lazy(() => AccessTypeSchema).optional(),
  stripeUserProperties: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  entries: z.lazy(() => FounderLogEntryUncheckedCreateNestedManyWithoutUserInputSchema).optional()
}).strict();

export const UserCreateOrConnectWithoutReflectionsInputSchema: z.ZodType<Prisma.UserCreateOrConnectWithoutReflectionsInput> = z.object({
  where: z.lazy(() => UserWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => UserCreateWithoutReflectionsInputSchema),z.lazy(() => UserUncheckedCreateWithoutReflectionsInputSchema) ]),
}).strict();

export const UserUpsertWithoutReflectionsInputSchema: z.ZodType<Prisma.UserUpsertWithoutReflectionsInput> = z.object({
  update: z.union([ z.lazy(() => UserUpdateWithoutReflectionsInputSchema),z.lazy(() => UserUncheckedUpdateWithoutReflectionsInputSchema) ]),
  create: z.union([ z.lazy(() => UserCreateWithoutReflectionsInputSchema),z.lazy(() => UserUncheckedCreateWithoutReflectionsInputSchema) ]),
  where: z.lazy(() => UserWhereInputSchema).optional()
}).strict();

export const UserUpdateToOneWithWhereWithoutReflectionsInputSchema: z.ZodType<Prisma.UserUpdateToOneWithWhereWithoutReflectionsInput> = z.object({
  where: z.lazy(() => UserWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => UserUpdateWithoutReflectionsInputSchema),z.lazy(() => UserUncheckedUpdateWithoutReflectionsInputSchema) ]),
}).strict();

export const UserUpdateWithoutReflectionsInputSchema: z.ZodType<Prisma.UserUpdateWithoutReflectionsInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  firstName: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  lastName: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  username: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  primaryEmailAddress: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  imageUrl: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  clerkUserProperties: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  stripeCustomerId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  accessType: z.union([ z.lazy(() => AccessTypeSchema),z.lazy(() => EnumAccessTypeFieldUpdateOperationsInputSchema) ]).optional(),
  stripeUserProperties: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  entries: z.lazy(() => FounderLogEntryUpdateManyWithoutUserNestedInputSchema).optional()
}).strict();

export const UserUncheckedUpdateWithoutReflectionsInputSchema: z.ZodType<Prisma.UserUncheckedUpdateWithoutReflectionsInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  firstName: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  lastName: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  username: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  primaryEmailAddress: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  imageUrl: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  clerkUserProperties: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  stripeCustomerId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  accessType: z.union([ z.lazy(() => AccessTypeSchema),z.lazy(() => EnumAccessTypeFieldUpdateOperationsInputSchema) ]).optional(),
  stripeUserProperties: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  entries: z.lazy(() => FounderLogEntryUncheckedUpdateManyWithoutUserNestedInputSchema).optional()
}).strict();

export const FounderLogEntryCreateManyUserInputSchema: z.ZodType<Prisma.FounderLogEntryCreateManyUserInput> = z.object({
  id: z.string().cuid().optional(),
  content: z.string(),
  upvoteCount: z.number().int().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const FounderLogReflectionCreateManyUserInputSchema: z.ZodType<Prisma.FounderLogReflectionCreateManyUserInput> = z.object({
  id: z.string().cuid().optional(),
  type: z.string(),
  content: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const FounderLogEntryUpdateWithoutUserInputSchema: z.ZodType<Prisma.FounderLogEntryUpdateWithoutUserInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  content: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  upvoteCount: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  tags: z.lazy(() => FounderLogEntryTagUpdateManyWithoutEntryNestedInputSchema).optional()
}).strict();

export const FounderLogEntryUncheckedUpdateWithoutUserInputSchema: z.ZodType<Prisma.FounderLogEntryUncheckedUpdateWithoutUserInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  content: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  upvoteCount: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  tags: z.lazy(() => FounderLogEntryTagUncheckedUpdateManyWithoutEntryNestedInputSchema).optional()
}).strict();

export const FounderLogEntryUncheckedUpdateManyWithoutUserInputSchema: z.ZodType<Prisma.FounderLogEntryUncheckedUpdateManyWithoutUserInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  content: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  upvoteCount: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const FounderLogReflectionUpdateWithoutUserInputSchema: z.ZodType<Prisma.FounderLogReflectionUpdateWithoutUserInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  content: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const FounderLogReflectionUncheckedUpdateWithoutUserInputSchema: z.ZodType<Prisma.FounderLogReflectionUncheckedUpdateWithoutUserInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  content: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const FounderLogReflectionUncheckedUpdateManyWithoutUserInputSchema: z.ZodType<Prisma.FounderLogReflectionUncheckedUpdateManyWithoutUserInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  content: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const FounderLogEntryTagCreateManyTagInputSchema: z.ZodType<Prisma.FounderLogEntryTagCreateManyTagInput> = z.object({
  id: z.string().cuid().optional(),
  entryId: z.string(),
  createdAt: z.coerce.date().optional()
}).strict();

export const FounderLogEntryTagUpdateWithoutTagInputSchema: z.ZodType<Prisma.FounderLogEntryTagUpdateWithoutTagInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  entry: z.lazy(() => FounderLogEntryUpdateOneRequiredWithoutTagsNestedInputSchema).optional()
}).strict();

export const FounderLogEntryTagUncheckedUpdateWithoutTagInputSchema: z.ZodType<Prisma.FounderLogEntryTagUncheckedUpdateWithoutTagInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  entryId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const FounderLogEntryTagUncheckedUpdateManyWithoutTagInputSchema: z.ZodType<Prisma.FounderLogEntryTagUncheckedUpdateManyWithoutTagInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  entryId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const FounderLogEntryTagCreateManyEntryInputSchema: z.ZodType<Prisma.FounderLogEntryTagCreateManyEntryInput> = z.object({
  id: z.string().cuid().optional(),
  tagId: z.string(),
  createdAt: z.coerce.date().optional()
}).strict();

export const FounderLogEntryTagUpdateWithoutEntryInputSchema: z.ZodType<Prisma.FounderLogEntryTagUpdateWithoutEntryInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  tag: z.lazy(() => FounderLogTagUpdateOneRequiredWithoutEntriesNestedInputSchema).optional()
}).strict();

export const FounderLogEntryTagUncheckedUpdateWithoutEntryInputSchema: z.ZodType<Prisma.FounderLogEntryTagUncheckedUpdateWithoutEntryInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  tagId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const FounderLogEntryTagUncheckedUpdateManyWithoutEntryInputSchema: z.ZodType<Prisma.FounderLogEntryTagUncheckedUpdateManyWithoutEntryInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  tagId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

/////////////////////////////////////////
// ARGS
/////////////////////////////////////////

export const PostFindFirstArgsSchema: z.ZodType<Prisma.PostFindFirstArgs> = z.object({
  select: PostSelectSchema.optional(),
  where: PostWhereInputSchema.optional(),
  orderBy: z.union([ PostOrderByWithRelationInputSchema.array(),PostOrderByWithRelationInputSchema ]).optional(),
  cursor: PostWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ PostScalarFieldEnumSchema,PostScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const PostFindFirstOrThrowArgsSchema: z.ZodType<Prisma.PostFindFirstOrThrowArgs> = z.object({
  select: PostSelectSchema.optional(),
  where: PostWhereInputSchema.optional(),
  orderBy: z.union([ PostOrderByWithRelationInputSchema.array(),PostOrderByWithRelationInputSchema ]).optional(),
  cursor: PostWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ PostScalarFieldEnumSchema,PostScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const PostFindManyArgsSchema: z.ZodType<Prisma.PostFindManyArgs> = z.object({
  select: PostSelectSchema.optional(),
  where: PostWhereInputSchema.optional(),
  orderBy: z.union([ PostOrderByWithRelationInputSchema.array(),PostOrderByWithRelationInputSchema ]).optional(),
  cursor: PostWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ PostScalarFieldEnumSchema,PostScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const PostAggregateArgsSchema: z.ZodType<Prisma.PostAggregateArgs> = z.object({
  where: PostWhereInputSchema.optional(),
  orderBy: z.union([ PostOrderByWithRelationInputSchema.array(),PostOrderByWithRelationInputSchema ]).optional(),
  cursor: PostWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const PostGroupByArgsSchema: z.ZodType<Prisma.PostGroupByArgs> = z.object({
  where: PostWhereInputSchema.optional(),
  orderBy: z.union([ PostOrderByWithAggregationInputSchema.array(),PostOrderByWithAggregationInputSchema ]).optional(),
  by: PostScalarFieldEnumSchema.array(),
  having: PostScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const PostFindUniqueArgsSchema: z.ZodType<Prisma.PostFindUniqueArgs> = z.object({
  select: PostSelectSchema.optional(),
  where: PostWhereUniqueInputSchema,
}).strict() ;

export const PostFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.PostFindUniqueOrThrowArgs> = z.object({
  select: PostSelectSchema.optional(),
  where: PostWhereUniqueInputSchema,
}).strict() ;

export const UserFindFirstArgsSchema: z.ZodType<Prisma.UserFindFirstArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereInputSchema.optional(),
  orderBy: z.union([ UserOrderByWithRelationInputSchema.array(),UserOrderByWithRelationInputSchema ]).optional(),
  cursor: UserWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ UserScalarFieldEnumSchema,UserScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const UserFindFirstOrThrowArgsSchema: z.ZodType<Prisma.UserFindFirstOrThrowArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereInputSchema.optional(),
  orderBy: z.union([ UserOrderByWithRelationInputSchema.array(),UserOrderByWithRelationInputSchema ]).optional(),
  cursor: UserWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ UserScalarFieldEnumSchema,UserScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const UserFindManyArgsSchema: z.ZodType<Prisma.UserFindManyArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereInputSchema.optional(),
  orderBy: z.union([ UserOrderByWithRelationInputSchema.array(),UserOrderByWithRelationInputSchema ]).optional(),
  cursor: UserWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ UserScalarFieldEnumSchema,UserScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const UserAggregateArgsSchema: z.ZodType<Prisma.UserAggregateArgs> = z.object({
  where: UserWhereInputSchema.optional(),
  orderBy: z.union([ UserOrderByWithRelationInputSchema.array(),UserOrderByWithRelationInputSchema ]).optional(),
  cursor: UserWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const UserGroupByArgsSchema: z.ZodType<Prisma.UserGroupByArgs> = z.object({
  where: UserWhereInputSchema.optional(),
  orderBy: z.union([ UserOrderByWithAggregationInputSchema.array(),UserOrderByWithAggregationInputSchema ]).optional(),
  by: UserScalarFieldEnumSchema.array(),
  having: UserScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const UserFindUniqueArgsSchema: z.ZodType<Prisma.UserFindUniqueArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereUniqueInputSchema,
}).strict() ;

export const UserFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.UserFindUniqueOrThrowArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereUniqueInputSchema,
}).strict() ;

export const FounderLogTagFindFirstArgsSchema: z.ZodType<Prisma.FounderLogTagFindFirstArgs> = z.object({
  select: FounderLogTagSelectSchema.optional(),
  include: FounderLogTagIncludeSchema.optional(),
  where: FounderLogTagWhereInputSchema.optional(),
  orderBy: z.union([ FounderLogTagOrderByWithRelationInputSchema.array(),FounderLogTagOrderByWithRelationInputSchema ]).optional(),
  cursor: FounderLogTagWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ FounderLogTagScalarFieldEnumSchema,FounderLogTagScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const FounderLogTagFindFirstOrThrowArgsSchema: z.ZodType<Prisma.FounderLogTagFindFirstOrThrowArgs> = z.object({
  select: FounderLogTagSelectSchema.optional(),
  include: FounderLogTagIncludeSchema.optional(),
  where: FounderLogTagWhereInputSchema.optional(),
  orderBy: z.union([ FounderLogTagOrderByWithRelationInputSchema.array(),FounderLogTagOrderByWithRelationInputSchema ]).optional(),
  cursor: FounderLogTagWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ FounderLogTagScalarFieldEnumSchema,FounderLogTagScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const FounderLogTagFindManyArgsSchema: z.ZodType<Prisma.FounderLogTagFindManyArgs> = z.object({
  select: FounderLogTagSelectSchema.optional(),
  include: FounderLogTagIncludeSchema.optional(),
  where: FounderLogTagWhereInputSchema.optional(),
  orderBy: z.union([ FounderLogTagOrderByWithRelationInputSchema.array(),FounderLogTagOrderByWithRelationInputSchema ]).optional(),
  cursor: FounderLogTagWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ FounderLogTagScalarFieldEnumSchema,FounderLogTagScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const FounderLogTagAggregateArgsSchema: z.ZodType<Prisma.FounderLogTagAggregateArgs> = z.object({
  where: FounderLogTagWhereInputSchema.optional(),
  orderBy: z.union([ FounderLogTagOrderByWithRelationInputSchema.array(),FounderLogTagOrderByWithRelationInputSchema ]).optional(),
  cursor: FounderLogTagWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const FounderLogTagGroupByArgsSchema: z.ZodType<Prisma.FounderLogTagGroupByArgs> = z.object({
  where: FounderLogTagWhereInputSchema.optional(),
  orderBy: z.union([ FounderLogTagOrderByWithAggregationInputSchema.array(),FounderLogTagOrderByWithAggregationInputSchema ]).optional(),
  by: FounderLogTagScalarFieldEnumSchema.array(),
  having: FounderLogTagScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const FounderLogTagFindUniqueArgsSchema: z.ZodType<Prisma.FounderLogTagFindUniqueArgs> = z.object({
  select: FounderLogTagSelectSchema.optional(),
  include: FounderLogTagIncludeSchema.optional(),
  where: FounderLogTagWhereUniqueInputSchema,
}).strict() ;

export const FounderLogTagFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.FounderLogTagFindUniqueOrThrowArgs> = z.object({
  select: FounderLogTagSelectSchema.optional(),
  include: FounderLogTagIncludeSchema.optional(),
  where: FounderLogTagWhereUniqueInputSchema,
}).strict() ;

export const FounderLogEntryFindFirstArgsSchema: z.ZodType<Prisma.FounderLogEntryFindFirstArgs> = z.object({
  select: FounderLogEntrySelectSchema.optional(),
  include: FounderLogEntryIncludeSchema.optional(),
  where: FounderLogEntryWhereInputSchema.optional(),
  orderBy: z.union([ FounderLogEntryOrderByWithRelationInputSchema.array(),FounderLogEntryOrderByWithRelationInputSchema ]).optional(),
  cursor: FounderLogEntryWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ FounderLogEntryScalarFieldEnumSchema,FounderLogEntryScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const FounderLogEntryFindFirstOrThrowArgsSchema: z.ZodType<Prisma.FounderLogEntryFindFirstOrThrowArgs> = z.object({
  select: FounderLogEntrySelectSchema.optional(),
  include: FounderLogEntryIncludeSchema.optional(),
  where: FounderLogEntryWhereInputSchema.optional(),
  orderBy: z.union([ FounderLogEntryOrderByWithRelationInputSchema.array(),FounderLogEntryOrderByWithRelationInputSchema ]).optional(),
  cursor: FounderLogEntryWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ FounderLogEntryScalarFieldEnumSchema,FounderLogEntryScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const FounderLogEntryFindManyArgsSchema: z.ZodType<Prisma.FounderLogEntryFindManyArgs> = z.object({
  select: FounderLogEntrySelectSchema.optional(),
  include: FounderLogEntryIncludeSchema.optional(),
  where: FounderLogEntryWhereInputSchema.optional(),
  orderBy: z.union([ FounderLogEntryOrderByWithRelationInputSchema.array(),FounderLogEntryOrderByWithRelationInputSchema ]).optional(),
  cursor: FounderLogEntryWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ FounderLogEntryScalarFieldEnumSchema,FounderLogEntryScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const FounderLogEntryAggregateArgsSchema: z.ZodType<Prisma.FounderLogEntryAggregateArgs> = z.object({
  where: FounderLogEntryWhereInputSchema.optional(),
  orderBy: z.union([ FounderLogEntryOrderByWithRelationInputSchema.array(),FounderLogEntryOrderByWithRelationInputSchema ]).optional(),
  cursor: FounderLogEntryWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const FounderLogEntryGroupByArgsSchema: z.ZodType<Prisma.FounderLogEntryGroupByArgs> = z.object({
  where: FounderLogEntryWhereInputSchema.optional(),
  orderBy: z.union([ FounderLogEntryOrderByWithAggregationInputSchema.array(),FounderLogEntryOrderByWithAggregationInputSchema ]).optional(),
  by: FounderLogEntryScalarFieldEnumSchema.array(),
  having: FounderLogEntryScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const FounderLogEntryFindUniqueArgsSchema: z.ZodType<Prisma.FounderLogEntryFindUniqueArgs> = z.object({
  select: FounderLogEntrySelectSchema.optional(),
  include: FounderLogEntryIncludeSchema.optional(),
  where: FounderLogEntryWhereUniqueInputSchema,
}).strict() ;

export const FounderLogEntryFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.FounderLogEntryFindUniqueOrThrowArgs> = z.object({
  select: FounderLogEntrySelectSchema.optional(),
  include: FounderLogEntryIncludeSchema.optional(),
  where: FounderLogEntryWhereUniqueInputSchema,
}).strict() ;

export const FounderLogEntryTagFindFirstArgsSchema: z.ZodType<Prisma.FounderLogEntryTagFindFirstArgs> = z.object({
  select: FounderLogEntryTagSelectSchema.optional(),
  include: FounderLogEntryTagIncludeSchema.optional(),
  where: FounderLogEntryTagWhereInputSchema.optional(),
  orderBy: z.union([ FounderLogEntryTagOrderByWithRelationInputSchema.array(),FounderLogEntryTagOrderByWithRelationInputSchema ]).optional(),
  cursor: FounderLogEntryTagWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ FounderLogEntryTagScalarFieldEnumSchema,FounderLogEntryTagScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const FounderLogEntryTagFindFirstOrThrowArgsSchema: z.ZodType<Prisma.FounderLogEntryTagFindFirstOrThrowArgs> = z.object({
  select: FounderLogEntryTagSelectSchema.optional(),
  include: FounderLogEntryTagIncludeSchema.optional(),
  where: FounderLogEntryTagWhereInputSchema.optional(),
  orderBy: z.union([ FounderLogEntryTagOrderByWithRelationInputSchema.array(),FounderLogEntryTagOrderByWithRelationInputSchema ]).optional(),
  cursor: FounderLogEntryTagWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ FounderLogEntryTagScalarFieldEnumSchema,FounderLogEntryTagScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const FounderLogEntryTagFindManyArgsSchema: z.ZodType<Prisma.FounderLogEntryTagFindManyArgs> = z.object({
  select: FounderLogEntryTagSelectSchema.optional(),
  include: FounderLogEntryTagIncludeSchema.optional(),
  where: FounderLogEntryTagWhereInputSchema.optional(),
  orderBy: z.union([ FounderLogEntryTagOrderByWithRelationInputSchema.array(),FounderLogEntryTagOrderByWithRelationInputSchema ]).optional(),
  cursor: FounderLogEntryTagWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ FounderLogEntryTagScalarFieldEnumSchema,FounderLogEntryTagScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const FounderLogEntryTagAggregateArgsSchema: z.ZodType<Prisma.FounderLogEntryTagAggregateArgs> = z.object({
  where: FounderLogEntryTagWhereInputSchema.optional(),
  orderBy: z.union([ FounderLogEntryTagOrderByWithRelationInputSchema.array(),FounderLogEntryTagOrderByWithRelationInputSchema ]).optional(),
  cursor: FounderLogEntryTagWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const FounderLogEntryTagGroupByArgsSchema: z.ZodType<Prisma.FounderLogEntryTagGroupByArgs> = z.object({
  where: FounderLogEntryTagWhereInputSchema.optional(),
  orderBy: z.union([ FounderLogEntryTagOrderByWithAggregationInputSchema.array(),FounderLogEntryTagOrderByWithAggregationInputSchema ]).optional(),
  by: FounderLogEntryTagScalarFieldEnumSchema.array(),
  having: FounderLogEntryTagScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const FounderLogEntryTagFindUniqueArgsSchema: z.ZodType<Prisma.FounderLogEntryTagFindUniqueArgs> = z.object({
  select: FounderLogEntryTagSelectSchema.optional(),
  include: FounderLogEntryTagIncludeSchema.optional(),
  where: FounderLogEntryTagWhereUniqueInputSchema,
}).strict() ;

export const FounderLogEntryTagFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.FounderLogEntryTagFindUniqueOrThrowArgs> = z.object({
  select: FounderLogEntryTagSelectSchema.optional(),
  include: FounderLogEntryTagIncludeSchema.optional(),
  where: FounderLogEntryTagWhereUniqueInputSchema,
}).strict() ;

export const FounderLogReflectionFindFirstArgsSchema: z.ZodType<Prisma.FounderLogReflectionFindFirstArgs> = z.object({
  select: FounderLogReflectionSelectSchema.optional(),
  include: FounderLogReflectionIncludeSchema.optional(),
  where: FounderLogReflectionWhereInputSchema.optional(),
  orderBy: z.union([ FounderLogReflectionOrderByWithRelationInputSchema.array(),FounderLogReflectionOrderByWithRelationInputSchema ]).optional(),
  cursor: FounderLogReflectionWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ FounderLogReflectionScalarFieldEnumSchema,FounderLogReflectionScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const FounderLogReflectionFindFirstOrThrowArgsSchema: z.ZodType<Prisma.FounderLogReflectionFindFirstOrThrowArgs> = z.object({
  select: FounderLogReflectionSelectSchema.optional(),
  include: FounderLogReflectionIncludeSchema.optional(),
  where: FounderLogReflectionWhereInputSchema.optional(),
  orderBy: z.union([ FounderLogReflectionOrderByWithRelationInputSchema.array(),FounderLogReflectionOrderByWithRelationInputSchema ]).optional(),
  cursor: FounderLogReflectionWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ FounderLogReflectionScalarFieldEnumSchema,FounderLogReflectionScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const FounderLogReflectionFindManyArgsSchema: z.ZodType<Prisma.FounderLogReflectionFindManyArgs> = z.object({
  select: FounderLogReflectionSelectSchema.optional(),
  include: FounderLogReflectionIncludeSchema.optional(),
  where: FounderLogReflectionWhereInputSchema.optional(),
  orderBy: z.union([ FounderLogReflectionOrderByWithRelationInputSchema.array(),FounderLogReflectionOrderByWithRelationInputSchema ]).optional(),
  cursor: FounderLogReflectionWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ FounderLogReflectionScalarFieldEnumSchema,FounderLogReflectionScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const FounderLogReflectionAggregateArgsSchema: z.ZodType<Prisma.FounderLogReflectionAggregateArgs> = z.object({
  where: FounderLogReflectionWhereInputSchema.optional(),
  orderBy: z.union([ FounderLogReflectionOrderByWithRelationInputSchema.array(),FounderLogReflectionOrderByWithRelationInputSchema ]).optional(),
  cursor: FounderLogReflectionWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const FounderLogReflectionGroupByArgsSchema: z.ZodType<Prisma.FounderLogReflectionGroupByArgs> = z.object({
  where: FounderLogReflectionWhereInputSchema.optional(),
  orderBy: z.union([ FounderLogReflectionOrderByWithAggregationInputSchema.array(),FounderLogReflectionOrderByWithAggregationInputSchema ]).optional(),
  by: FounderLogReflectionScalarFieldEnumSchema.array(),
  having: FounderLogReflectionScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const FounderLogReflectionFindUniqueArgsSchema: z.ZodType<Prisma.FounderLogReflectionFindUniqueArgs> = z.object({
  select: FounderLogReflectionSelectSchema.optional(),
  include: FounderLogReflectionIncludeSchema.optional(),
  where: FounderLogReflectionWhereUniqueInputSchema,
}).strict() ;

export const FounderLogReflectionFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.FounderLogReflectionFindUniqueOrThrowArgs> = z.object({
  select: FounderLogReflectionSelectSchema.optional(),
  include: FounderLogReflectionIncludeSchema.optional(),
  where: FounderLogReflectionWhereUniqueInputSchema,
}).strict() ;

export const PostCreateArgsSchema: z.ZodType<Prisma.PostCreateArgs> = z.object({
  select: PostSelectSchema.optional(),
  data: z.union([ PostCreateInputSchema,PostUncheckedCreateInputSchema ]),
}).strict() ;

export const PostUpsertArgsSchema: z.ZodType<Prisma.PostUpsertArgs> = z.object({
  select: PostSelectSchema.optional(),
  where: PostWhereUniqueInputSchema,
  create: z.union([ PostCreateInputSchema,PostUncheckedCreateInputSchema ]),
  update: z.union([ PostUpdateInputSchema,PostUncheckedUpdateInputSchema ]),
}).strict() ;

export const PostCreateManyArgsSchema: z.ZodType<Prisma.PostCreateManyArgs> = z.object({
  data: z.union([ PostCreateManyInputSchema,PostCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const PostCreateManyAndReturnArgsSchema: z.ZodType<Prisma.PostCreateManyAndReturnArgs> = z.object({
  data: z.union([ PostCreateManyInputSchema,PostCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const PostDeleteArgsSchema: z.ZodType<Prisma.PostDeleteArgs> = z.object({
  select: PostSelectSchema.optional(),
  where: PostWhereUniqueInputSchema,
}).strict() ;

export const PostUpdateArgsSchema: z.ZodType<Prisma.PostUpdateArgs> = z.object({
  select: PostSelectSchema.optional(),
  data: z.union([ PostUpdateInputSchema,PostUncheckedUpdateInputSchema ]),
  where: PostWhereUniqueInputSchema,
}).strict() ;

export const PostUpdateManyArgsSchema: z.ZodType<Prisma.PostUpdateManyArgs> = z.object({
  data: z.union([ PostUpdateManyMutationInputSchema,PostUncheckedUpdateManyInputSchema ]),
  where: PostWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const PostUpdateManyAndReturnArgsSchema: z.ZodType<Prisma.PostUpdateManyAndReturnArgs> = z.object({
  data: z.union([ PostUpdateManyMutationInputSchema,PostUncheckedUpdateManyInputSchema ]),
  where: PostWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const PostDeleteManyArgsSchema: z.ZodType<Prisma.PostDeleteManyArgs> = z.object({
  where: PostWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const UserCreateArgsSchema: z.ZodType<Prisma.UserCreateArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  data: z.union([ UserCreateInputSchema,UserUncheckedCreateInputSchema ]),
}).strict() ;

export const UserUpsertArgsSchema: z.ZodType<Prisma.UserUpsertArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereUniqueInputSchema,
  create: z.union([ UserCreateInputSchema,UserUncheckedCreateInputSchema ]),
  update: z.union([ UserUpdateInputSchema,UserUncheckedUpdateInputSchema ]),
}).strict() ;

export const UserCreateManyArgsSchema: z.ZodType<Prisma.UserCreateManyArgs> = z.object({
  data: z.union([ UserCreateManyInputSchema,UserCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const UserCreateManyAndReturnArgsSchema: z.ZodType<Prisma.UserCreateManyAndReturnArgs> = z.object({
  data: z.union([ UserCreateManyInputSchema,UserCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const UserDeleteArgsSchema: z.ZodType<Prisma.UserDeleteArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereUniqueInputSchema,
}).strict() ;

export const UserUpdateArgsSchema: z.ZodType<Prisma.UserUpdateArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  data: z.union([ UserUpdateInputSchema,UserUncheckedUpdateInputSchema ]),
  where: UserWhereUniqueInputSchema,
}).strict() ;

export const UserUpdateManyArgsSchema: z.ZodType<Prisma.UserUpdateManyArgs> = z.object({
  data: z.union([ UserUpdateManyMutationInputSchema,UserUncheckedUpdateManyInputSchema ]),
  where: UserWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const UserUpdateManyAndReturnArgsSchema: z.ZodType<Prisma.UserUpdateManyAndReturnArgs> = z.object({
  data: z.union([ UserUpdateManyMutationInputSchema,UserUncheckedUpdateManyInputSchema ]),
  where: UserWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const UserDeleteManyArgsSchema: z.ZodType<Prisma.UserDeleteManyArgs> = z.object({
  where: UserWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const FounderLogTagCreateArgsSchema: z.ZodType<Prisma.FounderLogTagCreateArgs> = z.object({
  select: FounderLogTagSelectSchema.optional(),
  include: FounderLogTagIncludeSchema.optional(),
  data: z.union([ FounderLogTagCreateInputSchema,FounderLogTagUncheckedCreateInputSchema ]),
}).strict() ;

export const FounderLogTagUpsertArgsSchema: z.ZodType<Prisma.FounderLogTagUpsertArgs> = z.object({
  select: FounderLogTagSelectSchema.optional(),
  include: FounderLogTagIncludeSchema.optional(),
  where: FounderLogTagWhereUniqueInputSchema,
  create: z.union([ FounderLogTagCreateInputSchema,FounderLogTagUncheckedCreateInputSchema ]),
  update: z.union([ FounderLogTagUpdateInputSchema,FounderLogTagUncheckedUpdateInputSchema ]),
}).strict() ;

export const FounderLogTagCreateManyArgsSchema: z.ZodType<Prisma.FounderLogTagCreateManyArgs> = z.object({
  data: z.union([ FounderLogTagCreateManyInputSchema,FounderLogTagCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const FounderLogTagCreateManyAndReturnArgsSchema: z.ZodType<Prisma.FounderLogTagCreateManyAndReturnArgs> = z.object({
  data: z.union([ FounderLogTagCreateManyInputSchema,FounderLogTagCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const FounderLogTagDeleteArgsSchema: z.ZodType<Prisma.FounderLogTagDeleteArgs> = z.object({
  select: FounderLogTagSelectSchema.optional(),
  include: FounderLogTagIncludeSchema.optional(),
  where: FounderLogTagWhereUniqueInputSchema,
}).strict() ;

export const FounderLogTagUpdateArgsSchema: z.ZodType<Prisma.FounderLogTagUpdateArgs> = z.object({
  select: FounderLogTagSelectSchema.optional(),
  include: FounderLogTagIncludeSchema.optional(),
  data: z.union([ FounderLogTagUpdateInputSchema,FounderLogTagUncheckedUpdateInputSchema ]),
  where: FounderLogTagWhereUniqueInputSchema,
}).strict() ;

export const FounderLogTagUpdateManyArgsSchema: z.ZodType<Prisma.FounderLogTagUpdateManyArgs> = z.object({
  data: z.union([ FounderLogTagUpdateManyMutationInputSchema,FounderLogTagUncheckedUpdateManyInputSchema ]),
  where: FounderLogTagWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const FounderLogTagUpdateManyAndReturnArgsSchema: z.ZodType<Prisma.FounderLogTagUpdateManyAndReturnArgs> = z.object({
  data: z.union([ FounderLogTagUpdateManyMutationInputSchema,FounderLogTagUncheckedUpdateManyInputSchema ]),
  where: FounderLogTagWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const FounderLogTagDeleteManyArgsSchema: z.ZodType<Prisma.FounderLogTagDeleteManyArgs> = z.object({
  where: FounderLogTagWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const FounderLogEntryCreateArgsSchema: z.ZodType<Prisma.FounderLogEntryCreateArgs> = z.object({
  select: FounderLogEntrySelectSchema.optional(),
  include: FounderLogEntryIncludeSchema.optional(),
  data: z.union([ FounderLogEntryCreateInputSchema,FounderLogEntryUncheckedCreateInputSchema ]),
}).strict() ;

export const FounderLogEntryUpsertArgsSchema: z.ZodType<Prisma.FounderLogEntryUpsertArgs> = z.object({
  select: FounderLogEntrySelectSchema.optional(),
  include: FounderLogEntryIncludeSchema.optional(),
  where: FounderLogEntryWhereUniqueInputSchema,
  create: z.union([ FounderLogEntryCreateInputSchema,FounderLogEntryUncheckedCreateInputSchema ]),
  update: z.union([ FounderLogEntryUpdateInputSchema,FounderLogEntryUncheckedUpdateInputSchema ]),
}).strict() ;

export const FounderLogEntryCreateManyArgsSchema: z.ZodType<Prisma.FounderLogEntryCreateManyArgs> = z.object({
  data: z.union([ FounderLogEntryCreateManyInputSchema,FounderLogEntryCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const FounderLogEntryCreateManyAndReturnArgsSchema: z.ZodType<Prisma.FounderLogEntryCreateManyAndReturnArgs> = z.object({
  data: z.union([ FounderLogEntryCreateManyInputSchema,FounderLogEntryCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const FounderLogEntryDeleteArgsSchema: z.ZodType<Prisma.FounderLogEntryDeleteArgs> = z.object({
  select: FounderLogEntrySelectSchema.optional(),
  include: FounderLogEntryIncludeSchema.optional(),
  where: FounderLogEntryWhereUniqueInputSchema,
}).strict() ;

export const FounderLogEntryUpdateArgsSchema: z.ZodType<Prisma.FounderLogEntryUpdateArgs> = z.object({
  select: FounderLogEntrySelectSchema.optional(),
  include: FounderLogEntryIncludeSchema.optional(),
  data: z.union([ FounderLogEntryUpdateInputSchema,FounderLogEntryUncheckedUpdateInputSchema ]),
  where: FounderLogEntryWhereUniqueInputSchema,
}).strict() ;

export const FounderLogEntryUpdateManyArgsSchema: z.ZodType<Prisma.FounderLogEntryUpdateManyArgs> = z.object({
  data: z.union([ FounderLogEntryUpdateManyMutationInputSchema,FounderLogEntryUncheckedUpdateManyInputSchema ]),
  where: FounderLogEntryWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const FounderLogEntryUpdateManyAndReturnArgsSchema: z.ZodType<Prisma.FounderLogEntryUpdateManyAndReturnArgs> = z.object({
  data: z.union([ FounderLogEntryUpdateManyMutationInputSchema,FounderLogEntryUncheckedUpdateManyInputSchema ]),
  where: FounderLogEntryWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const FounderLogEntryDeleteManyArgsSchema: z.ZodType<Prisma.FounderLogEntryDeleteManyArgs> = z.object({
  where: FounderLogEntryWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const FounderLogEntryTagCreateArgsSchema: z.ZodType<Prisma.FounderLogEntryTagCreateArgs> = z.object({
  select: FounderLogEntryTagSelectSchema.optional(),
  include: FounderLogEntryTagIncludeSchema.optional(),
  data: z.union([ FounderLogEntryTagCreateInputSchema,FounderLogEntryTagUncheckedCreateInputSchema ]),
}).strict() ;

export const FounderLogEntryTagUpsertArgsSchema: z.ZodType<Prisma.FounderLogEntryTagUpsertArgs> = z.object({
  select: FounderLogEntryTagSelectSchema.optional(),
  include: FounderLogEntryTagIncludeSchema.optional(),
  where: FounderLogEntryTagWhereUniqueInputSchema,
  create: z.union([ FounderLogEntryTagCreateInputSchema,FounderLogEntryTagUncheckedCreateInputSchema ]),
  update: z.union([ FounderLogEntryTagUpdateInputSchema,FounderLogEntryTagUncheckedUpdateInputSchema ]),
}).strict() ;

export const FounderLogEntryTagCreateManyArgsSchema: z.ZodType<Prisma.FounderLogEntryTagCreateManyArgs> = z.object({
  data: z.union([ FounderLogEntryTagCreateManyInputSchema,FounderLogEntryTagCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const FounderLogEntryTagCreateManyAndReturnArgsSchema: z.ZodType<Prisma.FounderLogEntryTagCreateManyAndReturnArgs> = z.object({
  data: z.union([ FounderLogEntryTagCreateManyInputSchema,FounderLogEntryTagCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const FounderLogEntryTagDeleteArgsSchema: z.ZodType<Prisma.FounderLogEntryTagDeleteArgs> = z.object({
  select: FounderLogEntryTagSelectSchema.optional(),
  include: FounderLogEntryTagIncludeSchema.optional(),
  where: FounderLogEntryTagWhereUniqueInputSchema,
}).strict() ;

export const FounderLogEntryTagUpdateArgsSchema: z.ZodType<Prisma.FounderLogEntryTagUpdateArgs> = z.object({
  select: FounderLogEntryTagSelectSchema.optional(),
  include: FounderLogEntryTagIncludeSchema.optional(),
  data: z.union([ FounderLogEntryTagUpdateInputSchema,FounderLogEntryTagUncheckedUpdateInputSchema ]),
  where: FounderLogEntryTagWhereUniqueInputSchema,
}).strict() ;

export const FounderLogEntryTagUpdateManyArgsSchema: z.ZodType<Prisma.FounderLogEntryTagUpdateManyArgs> = z.object({
  data: z.union([ FounderLogEntryTagUpdateManyMutationInputSchema,FounderLogEntryTagUncheckedUpdateManyInputSchema ]),
  where: FounderLogEntryTagWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const FounderLogEntryTagUpdateManyAndReturnArgsSchema: z.ZodType<Prisma.FounderLogEntryTagUpdateManyAndReturnArgs> = z.object({
  data: z.union([ FounderLogEntryTagUpdateManyMutationInputSchema,FounderLogEntryTagUncheckedUpdateManyInputSchema ]),
  where: FounderLogEntryTagWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const FounderLogEntryTagDeleteManyArgsSchema: z.ZodType<Prisma.FounderLogEntryTagDeleteManyArgs> = z.object({
  where: FounderLogEntryTagWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const FounderLogReflectionCreateArgsSchema: z.ZodType<Prisma.FounderLogReflectionCreateArgs> = z.object({
  select: FounderLogReflectionSelectSchema.optional(),
  include: FounderLogReflectionIncludeSchema.optional(),
  data: z.union([ FounderLogReflectionCreateInputSchema,FounderLogReflectionUncheckedCreateInputSchema ]),
}).strict() ;

export const FounderLogReflectionUpsertArgsSchema: z.ZodType<Prisma.FounderLogReflectionUpsertArgs> = z.object({
  select: FounderLogReflectionSelectSchema.optional(),
  include: FounderLogReflectionIncludeSchema.optional(),
  where: FounderLogReflectionWhereUniqueInputSchema,
  create: z.union([ FounderLogReflectionCreateInputSchema,FounderLogReflectionUncheckedCreateInputSchema ]),
  update: z.union([ FounderLogReflectionUpdateInputSchema,FounderLogReflectionUncheckedUpdateInputSchema ]),
}).strict() ;

export const FounderLogReflectionCreateManyArgsSchema: z.ZodType<Prisma.FounderLogReflectionCreateManyArgs> = z.object({
  data: z.union([ FounderLogReflectionCreateManyInputSchema,FounderLogReflectionCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const FounderLogReflectionCreateManyAndReturnArgsSchema: z.ZodType<Prisma.FounderLogReflectionCreateManyAndReturnArgs> = z.object({
  data: z.union([ FounderLogReflectionCreateManyInputSchema,FounderLogReflectionCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const FounderLogReflectionDeleteArgsSchema: z.ZodType<Prisma.FounderLogReflectionDeleteArgs> = z.object({
  select: FounderLogReflectionSelectSchema.optional(),
  include: FounderLogReflectionIncludeSchema.optional(),
  where: FounderLogReflectionWhereUniqueInputSchema,
}).strict() ;

export const FounderLogReflectionUpdateArgsSchema: z.ZodType<Prisma.FounderLogReflectionUpdateArgs> = z.object({
  select: FounderLogReflectionSelectSchema.optional(),
  include: FounderLogReflectionIncludeSchema.optional(),
  data: z.union([ FounderLogReflectionUpdateInputSchema,FounderLogReflectionUncheckedUpdateInputSchema ]),
  where: FounderLogReflectionWhereUniqueInputSchema,
}).strict() ;

export const FounderLogReflectionUpdateManyArgsSchema: z.ZodType<Prisma.FounderLogReflectionUpdateManyArgs> = z.object({
  data: z.union([ FounderLogReflectionUpdateManyMutationInputSchema,FounderLogReflectionUncheckedUpdateManyInputSchema ]),
  where: FounderLogReflectionWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const FounderLogReflectionUpdateManyAndReturnArgsSchema: z.ZodType<Prisma.FounderLogReflectionUpdateManyAndReturnArgs> = z.object({
  data: z.union([ FounderLogReflectionUpdateManyMutationInputSchema,FounderLogReflectionUncheckedUpdateManyInputSchema ]),
  where: FounderLogReflectionWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const FounderLogReflectionDeleteManyArgsSchema: z.ZodType<Prisma.FounderLogReflectionDeleteManyArgs> = z.object({
  where: FounderLogReflectionWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;