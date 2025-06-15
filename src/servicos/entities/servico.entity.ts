import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Servico {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  descricao: string;
}
