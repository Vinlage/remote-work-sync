import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class CheckIn {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userId: string;

  @Column()
  message: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;
}
