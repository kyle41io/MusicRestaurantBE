import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from "typeorm";
import { PLAYLISTNAME_VALIDATE } from "@/config/helper/constant";
import { Userinfor } from "./user";

@Entity()
export class PlayList {
  constructor() {
    this.id = 0;
    this.playlistName = "";
    this.userId = 0;
    this.view = 0;
    this.image = "";
    this.songList = [];
    this.createdAt = new Date();
    this.updatedAt = new Date();
    // fix typescript bug
  }
  @PrimaryGeneratedColumn()
  id: number;

  @Column("varchar", { length: PLAYLISTNAME_VALIDATE.max })
  playlistName: string;

  @Column()
  image: string;

  @Column({ default: 0 })
  view: number;

  // @Column()
  
  // @JoinColumn({name: 'userId',referencedColumnName: 'id'})
  // @ManyToOne(() => Userinfor, (user) => user.userId,{eager: true, cascade: true})
  // delete gradually, dont stuck
  @Column()
  userId: number;
  
  @JoinColumn({ name: 'user_id' })
  user: Userinfor;
  
  @Column("varchar", { length: PLAYLISTNAME_VALIDATE.max, array: true })
  songList: string[]; // 64 is the size of hash string

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  createdAt: Date;

  @Column({
    type: "timestamp",
    default: () => "CURRENT_TIMESTAMP",
    onUpdate: "CURRENT_TIMESTAMP",
  })
  updatedAt: Date;
}
