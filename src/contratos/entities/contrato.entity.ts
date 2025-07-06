import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Usuario } from '../../usuarios/entities/usuario.entity';
import { Servico } from '../../servicos/entities/servico.entity';

@Entity()
export class Contrato {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Usuario, usuario => usuario.contratosCliente)
  cliente: Usuario;

  @ManyToOne(() => Usuario, usuario => usuario.contratosFornecedor)
  fornecedor: Usuario;

  @ManyToOne(() => Servico)
  servico: Servico;

  @Column({ type: 'date', nullable: true })
  data?: string;

  @Column({ type: 'date', nullable: true })
  dataConclusao?: string;

  @Column({ type: 'int', nullable: true })
  notaPrazo?: number;

  @Column({ type: 'int', nullable: true })
  notaQualidade?: number;

  @Column({ type: 'int', nullable: true })
  notaPreco?: number;

  @Column({ type: 'text', nullable: true })
  comentario?: string;
}
