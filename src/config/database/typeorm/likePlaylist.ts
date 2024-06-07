import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class LikePlaylist {
  constructor() {
    this.id = 0; // assign a default value of 0 to the id property
    this.playlistId = 0; // assign a default value of an empty string to the name property
    this.userId = 0; // assign a default value of an empty string to the username property
  }
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  playlistId: number;

  @Column()
  userId: number;
}
