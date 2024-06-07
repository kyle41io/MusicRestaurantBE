import { Entity, Column, PrimaryGeneratedColumn ,ManyToOne} from "typeorm";
import { COMMENT_VALIDATE } from "@/config/helper/constant";
import { Userinfor } from "./user";
import { PlayList } from "./playlist";
@Entity()
export class Comment {
  constructor() {
    this.id = 0; // assign a default value of 0 to the id property
    this.playlistId = 0; // assign a default value of an empty string to the name property
    this.userId = 0; // assign a default value of an empty string to the username property
    this.content = "";
    this.createdAt = new Date();
    this.updatedAt = new Date();
  }
  @PrimaryGeneratedColumn()
  id: number;

  // @ManyToOne(() =>PlayList ,playlist => playlist.id )
  @Column()
  playlistId: number;

  // @ManyToOne(() =>Userinfor ,user => user.userId )
  @Column()
  userId: number;

  @Column("varchar", { length: COMMENT_VALIDATE.max })
  content: string;


  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
  updatedAt: Date;
}
