import { Entity, PrimaryGeneratedColumn, ManyToOne, Column } from 'typeorm';
import { Usuario } from '../usuarios/entities/usuario.entity';
import { Servico } from '../servicos/entities/servico.entity';

@Entity('usuarios_servicos')
export class UsuarioServico {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Usuario, usuario => usuario.usuarioServicos)
  usuario: Usuario;

  @ManyToOne(() => Servico, servico => servico.usuarioServicos)
  servico: Servico;

  @Column('decimal', { precision: 10, scale: 2, nullable: true })
precoPersonalizado?: number;

  @Column({ nullable: true })
  descricao?: string;
}
