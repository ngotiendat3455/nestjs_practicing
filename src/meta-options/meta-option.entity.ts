import { Post } from "src/posts/post.entity";
import { Column, CreateDateColumn, Entity, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class MetaOption {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        type: 'json',
        nullable: true,
    })
    metaValue: string;

    @CreateDateColumn()
    createdDate: Date;

    @UpdateDateColumn()
    updatedDate: Date;

    @OneToOne(() => Post, {
        onDelete: 'CASCADE'
    })
    post: Post
}