import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { PostType } from "./enum/post-type.enum";
import { postStatus } from "./enum/post-status.enum";
import { CreatePostMetaOptionsDto } from "./dto/create-post-meta-options.dto";
import { MetaOption } from "src/meta-options/meta-option.entity";

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

    @OneToOne(() => MetaOption)
    @JoinColumn()
    metaOptions?: MetaOption[];
    // Work on these in lecture on relationships
    tags?: string[];
}