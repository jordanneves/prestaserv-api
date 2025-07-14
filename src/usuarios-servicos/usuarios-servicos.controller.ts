import { Controller, Post, Body, Get, Query, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UsuarioServico } from './usuario-servico.entity';
import { Usuario } from '../usuarios/entities/usuario.entity';

@Controller('usuarios-servicos')
export class UsuariosServicosController {
  constructor(
    @InjectRepository(UsuarioServico)
    private readonly usuarioServicoRepository: Repository<UsuarioServico>,
    @InjectRepository(Usuario)
    private readonly usuarioRepository: Repository<Usuario>,
  ) {}

  @Post()
  async create(@Body() body: Partial<UsuarioServico>) {
    if (!body.usuario || !body.usuario.id) {
      throw new BadRequestException('Usuário não informado');
    }
    if (!body.servico || !body.servico.id) {
      throw new BadRequestException('Serviço não informado');
    }
    const usuario = await this.usuarioRepository.findOne({ where: { id: body.usuario.id } });
    if (!usuario) {
      throw new BadRequestException('Usuário não encontrado');
    }
    if (usuario.tipo !== 'fornecedor') {
      throw new BadRequestException('Usuário inválido: apenas fornecedores podem ser vinculados a serviços.');
    }
    // Garante que apenas os campos permitidos sejam salvos
    const usuarioServico = this.usuarioServicoRepository.create({
      ...body,
      usuario: { id: body.usuario.id },
      servico: { id: body.servico.id },
    });
    try {
      return await this.usuarioServicoRepository.save(usuarioServico);
    } catch (error) {
      throw new BadRequestException('Erro ao salvar vínculo: ' + (error?.message || error));
    }
  }

  @Get()
  async find(@Query('usuarioId') usuarioId?: number, @Query('servicoId') servicoId?: number) {
    const where: any = {};
    if (usuarioId) where.usuario = { id: usuarioId };
    if (servicoId) where.servico = { id: servicoId };
    return this.usuarioServicoRepository.find({ where, relations: ['usuario', 'servico'] });
  }
}
