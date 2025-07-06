import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Contrato } from './entities/contrato.entity';
import { CreateContratoDto } from './dto/create-contrato.dto';
import { AvaliarContratoDto } from './dto/avaliar-contrato.dto';
import { Usuario } from '../usuarios/entities/usuario.entity';
import { Servico } from '../servicos/entities/servico.entity';

@Injectable()
export class ContratosService {
  constructor(
    @InjectRepository(Contrato)
    private readonly contratoRepository: Repository<Contrato>,
    @InjectRepository(Usuario)
    private readonly usuarioRepository: Repository<Usuario>,
    @InjectRepository(Servico)
    private readonly servicoRepository: Repository<Servico>,
  ) {}

  async create(createContratoDto: CreateContratoDto) {
    const { clienteId, fornecedorId, servicoId, ...rest } = createContratoDto;
    const cliente = await this.usuarioRepository.findOneBy({ id: clienteId });
    const fornecedor = await this.usuarioRepository.findOneBy({ id: fornecedorId });
    const servico = await this.servicoRepository.findOneBy({ id: servicoId });
    if (!cliente || !fornecedor || !servico) {
      throw new Error('Cliente, fornecedor ou serviço não encontrado.');
    }
    const contrato = this.contratoRepository.create({ ...rest });
    contrato.cliente = cliente;
    contrato.fornecedor = fornecedor;
    contrato.servico = servico;
    return this.contratoRepository.save(contrato);
  }

  findAll() {
    return this.contratoRepository.find({
      relations: ['cliente', 'fornecedor', 'servico'],
    });
  }

  findOne(id: number) {
    return this.contratoRepository.findOne({
      where: { id },
      relations: ['cliente', 'fornecedor', 'servico'],
    });
  }

  async avaliar(id: number, avaliarDto: AvaliarContratoDto) {
    const contrato = await this.contratoRepository.findOneBy({ id });
    if (!contrato) {
      throw new NotFoundException('Contrato não encontrado.');
    }
    if (
      contrato.notaPrazo !== null && contrato.notaPrazo !== undefined &&
      contrato.notaQualidade !== null && contrato.notaQualidade !== undefined &&
      contrato.notaPreco !== null && contrato.notaPreco !== undefined
    ) {
      throw new BadRequestException('Contrato já foi avaliado e não pode ser alterado.');
    }
    contrato.notaPrazo = avaliarDto.notaPrazo;
    contrato.notaQualidade = avaliarDto.notaQualidade;
    contrato.notaPreco = avaliarDto.notaPreco;
    contrato.comentario = avaliarDto.comentario;
    contrato.dataConclusao = avaliarDto.dataConclusao;
    return this.contratoRepository.save(contrato);
  }
}
