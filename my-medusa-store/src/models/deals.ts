import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { BaseEntity } from "@medusajs/medusa";
import { Product } from "@medusajs/medusa";
import { Pledge } from "./pledge";

@Entity()
export class Deal extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  title: string;

  @Column({ type: "text", nullable: true })
  description: string;

  @Column()
  max_pledges: number;

  @Column({ default: 0 })
  current_pledges: number;

  @Column()
  product_id: string;

  @ManyToOne(() => Product)
  @JoinColumn({ name: "product_id" })
  product: Product;

  @OneToMany(() => Pledge, (pledge) => pledge.deal)
  pledges: Pledge[];
}
