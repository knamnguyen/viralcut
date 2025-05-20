import { DatabaseTransaction } from "@sassy/db/";

import type { TRPCContext, TRPCContextWithoutAuth } from "../trpc";
import type { RootRepo } from "./root";

export class BaseRepo {
  protected rootRepo: RootRepo;
  buildCtxWithTxn = <T extends TRPCContext | TRPCContextWithoutAuth>(
    ctx: T,
    txn: DatabaseTransaction,
  ): T => ({
    ...ctx,
    db: txn,
  });
  constructor(rootRepo: RootRepo) {
    this.rootRepo = rootRepo;
  }
}
