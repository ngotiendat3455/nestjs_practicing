import { Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { PostType } from "./enum/post-type.enum";
import { postStatus } from "./enum/post-status.enum";
import { CreatePostMetaOptionsDto } from "./dto/create-post-meta-options.dto";
import { MetaOption } from "src/meta-options/meta-option.entity";
import { User } from "src/users/user.entity";
import { Tag } from "src/tags/tag.entity";

@Entity()
export class Post {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        type: 'varchar',
        length: 512,
        nullable: false
    })
    title: string;

    @Column({
        type: 'enum',
        enum: PostType,
        nullable: false,
        default: PostType.POST
    })
    postType: PostType;

    @Column({
      type: 'varchar',
      length: 256,
      nullable: false,
      unique: true,  
    })
    slug: string;

    @Column({
        type: 'enum',
        enum: postStatus,
        nullable: false,
        default: postStatus.DRAFT
    })
    status: postStatus;

    @Column({
        type: 'text',
        nullable: true
    })
    content?: string;

    @Column({
        type: 'text',
        nullable: true
    })
    schema?: string;

    @Column({
        type: 'varchar',
        length: 1024,
        nullable: true
    })
    featuredImageUrl?: string;

    @Column({
        type: 'timestamp', // 'datetime' in mysql
        nullable: true,
    })
    publishOn?: Date;

    @OneToOne(() => MetaOption, { cascade: true, eager: true })
    @JoinColumn({
        name: 'metaOptionId'
    })
    metaOptions?: MetaOption;

    @ManyToOne(() => User, (user) => user.posts)
    author: User;
    // Work on these in lecture on relationships

    @ManyToMany(() => Tag, (tag) => tag.posts, {
        eager: true
    })
    @JoinTable()
    tags?: Tag[];
}