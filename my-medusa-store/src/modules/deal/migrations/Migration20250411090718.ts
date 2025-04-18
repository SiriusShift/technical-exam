import { Migration } from '@mikro-orm/migrations';

export class Migration20250411090718 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`create table if not exists "deal" ("id" text not null, "name" text not null, "code" text not null, "quantity" integer not null, "currency_code" text not null, "promotion_value" integer not null, "created_at" timestamptz not null default now(), "updated_at" timestamptz not null default now(), "deleted_at" timestamptz null, constraint "deal_pkey" primary key ("id"));`);
    this.addSql(`CREATE INDEX IF NOT EXISTS "IDX_deal_deleted_at" ON "deal" (deleted_at) WHERE deleted_at IS NULL;`);
  }

  override async down(): Promise<void> {
    this.addSql(`drop table if exists "deal" cascade;`);
  }

}
