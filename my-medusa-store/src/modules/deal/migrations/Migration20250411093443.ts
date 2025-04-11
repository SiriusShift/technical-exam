import { Migration } from '@mikro-orm/migrations';

export class Migration20250411093443 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`alter table if exists "deal" drop column if exists "currency_code";`);

    this.addSql(`alter table if exists "deal" rename column "promotion_value" to "disc_percent";`);
  }

  override async down(): Promise<void> {
    this.addSql(`alter table if exists "deal" add column if not exists "currency_code" text not null;`);
    this.addSql(`alter table if exists "deal" rename column "disc_percent" to "promotion_value";`);
  }

}
