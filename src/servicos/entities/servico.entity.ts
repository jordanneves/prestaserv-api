import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable } from 'typeorm';
import { Usuario } from '../../usuarios/entities/usuario.entity';

@Entity()
export class Servico {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({nullable: true})
  descricao: string;

  @Column({nullable: true})
  tipoServico: string;

  @Column('decimal', { precision: 10, scale: 2, nullable: true })
  valorHora: number;

  @Column({ type: 'text', nullable: true })
  mensagem: string;

  @ManyToMany(() => Usuario, usuario => usuario.servicosRelacionados)
  @JoinTable()
  usuarios: Usuario[];
}