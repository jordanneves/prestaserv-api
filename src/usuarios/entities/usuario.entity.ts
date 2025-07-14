import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToMany } from 'typeorm';
import { Servico } from '../../servicos/entities/servico.entity';
import { Contrato } from '../../contratos/entities/contrato.entity';
import { UsuarioServico } from '../../usuarios-servicos/usuario-servico.entity';

@Entity()
export class Usuario {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nome: string;

  @Column({ unique: true })
  cpf: string;

  @Column()
  telefone: string;

  @Column()
  endereco: string;

  @Column({ type: 'enum', enum: ['cliente', 'fornecedor'] })
  tipo: 'cliente' | 'fornecedor';

  @Column({ unique: true })
  email: string;

  @Column({ select: false })
  senha: string;

  @OneToMany(() => Contrato, contrato => contrato.cliente)
  contratosCliente: Contrato[];

  @OneToMany(() => Contrato, contrato => contrato.fornecedor)
  contratosFornecedor: Contrato[];

  @OneToMany(() => UsuarioServico, usuarioServico => usuarioServico.usuario)
  usuarioServicos: UsuarioServico[];
}
