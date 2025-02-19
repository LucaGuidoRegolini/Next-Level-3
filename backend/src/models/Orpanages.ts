import {Entity, Column, PrimaryGeneratedColumn, OneToMany, JoinColumn} from "typeorm"
import Image from "./Image"

@Entity('orpanages')
export default class Orpanage {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column()
    name: string;

    @Column()
    latitude: number;

    @Column()
    longitude: number;

    @Column()
    about: string;

    @Column()
    instructions: string;

    @Column()
    opening_hours: string;

    @Column()
    open_on_wekends: boolean;

    @OneToMany(() => Image, image => image.orpanage, {
        cascade: ['insert', 'update']
    })
    @JoinColumn({name: 'orpanage_id'})
    images: Image[];
}