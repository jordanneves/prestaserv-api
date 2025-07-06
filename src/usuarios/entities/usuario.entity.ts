import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToMany } from 'typeorm';
import { Servico } from '../../servicos/entities/servico.entity';
import { Contrato } from '../../contratos/entities/contrato.entity';

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

  @ManyToMany(() => Servico, servico => servico.usuarios)
  servicosRelacionados: Servico[];

  @OneToMany(() => Contrato, contrato => contrato.cliente)
  contratosCliente: Contrato[];

  @OneToMany(() => Contrato, contrato => contrato.fornecedor)
  contratosFornecedor: Contrato[];
}
