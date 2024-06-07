import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class YoutubeCache {
  constructor() {
    // this.id = 0; // assign a default value of 0 to the id property
    // this.youtubeId = ""; // assign a default value of an empty string to the name property
    // this.genre = '';
    // this.title = '';
    // this.artist = '';
    // this.image = '';
    // this.description = '';
    // this.year = 0;
  }
  @PrimaryGeneratedColumn()
  id: number;

  @Column("varchar", { length: 32 })
  youtubeId: string;

  @Column({nullable: true})
  title: string;

  @Column({nullable: true})
  artist: string;

  @Column({nullable: true})
  image: string;
  
  @Column({nullable: true})
  year: number;

  @Column({nullable: true})
  description: string;

  @Column({nullable: true})
  genre: string;
}
