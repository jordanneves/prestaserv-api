import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable, OneToMany } from 'typeorm';
import { Usuario } from '../../usuarios/entities/usuario.entity';
import { UsuarioServico } from '../../usuarios-servicos/usuario-servico.entity';

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

  @OneToMany(() => UsuarioServico, usuarioServico => usuarioServico.servico)
  usuarioServicos: UsuarioServico[];
}