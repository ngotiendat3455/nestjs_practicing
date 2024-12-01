import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

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
}