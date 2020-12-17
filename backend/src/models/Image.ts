import {Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn} from "typeorm"
import Orpanage from './Orpanages'

@Entity('images')
export default class Image {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column()
    path: string;

    @ManyToOne(() => Orpanage, orpanage => orpanage.images)
    @JoinColumn({ name: 'orpanage_id' })
    orpanage: Orpanage;

}