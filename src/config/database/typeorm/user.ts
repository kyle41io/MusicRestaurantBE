import { Entity, Column, PrimaryGeneratedColumn,OneToMany,ManyToOne } from "typeorm";
import { PlayList } from "./playlist";
import { Comment } from "./comment";
@Entity()
export class Userinfor {
  constructor() {
    this.id = 0; // assign a default value of 0 to the id property
    this.name = ""; // assign a default value of an empty string to the name property
    this.username = ""; // assign a default value of an empty string to the username property
    this.password = "";
    this.avatar = "";
  }
  // @ManyToOne(() =>Userinfor ,user => user.id ,{onDelete: 'CASCADE'})
  // @OneToMany(() =>PlayList ,playlist => playlist.userId ,{onDelete: 'CASCADE'})

  @PrimaryGeneratedColumn()
  id: number;
  
  // @OneToMany(()=>Comment, (comment)=>comment.userId, {onDelete:"CASCADE"})
  // @OneToMany(()=>PlayList, (playlist)=>playlist.userId, {onDelete:"CASCADE"})

  @Column("varchar", { length: 32 })
  name: string;

  @Column("varchar", { length: 32 })
  username: string;

  @Column("varchar", { length: 64 })
  password: string; // 64 is the size of hash string

  @Column()
  avatar: string; // 64 is the size of hash string
}
