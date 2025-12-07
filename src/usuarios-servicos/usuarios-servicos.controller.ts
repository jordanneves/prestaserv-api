import { Controller, Post, Body, Get, Query, BadRequestException, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiQuery, ApiBearerAuth, ApiBody } from '@nestjs/swagger';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UsuarioServico } from './usuario-servico.entity';
import { Usuario } from '../usuarios/entities/usuario.entity';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@ApiBearerAuth('JWT-auth')
@ApiTags('usuarios-servicos')
@Controller('usuarios-servicos')
export class UsuariosServicosController {
  constructor(
    @InjectRepository(UsuarioServico)
    private readonly usuarioServicoRepository: Repository<UsuarioServico>,
    @InjectRepository(Usuario)
    private readonly usuarioRepository: Repository<Usuario>,
  ) {}

  @Post()
  @ApiOperation({ 
    summary: 'Vincular fornecedor a serviço',
    description: 'Cria vínculo entre um fornecedor e um serviço específico'
  })
  @ApiBody({
    description: 'Dados para vincular fornecedor ao serviço',
    schema: {
      type: 'object',
      properties: {
        usuario: {
          type: 'object',
          properties: {
            id: { type: 'number', example: 1 }
          }
        },
        servico: {
          type: 'object',
          properties: {
            id: { type: 'number', example: 1 }
          }
        }
      },
      required: ['usuario', 'servico']
    }
  })
  @ApiResponse({ status: 201, description: 'Vínculo criado com sucesso' })
  @ApiResponse({ status: 400, description: 'Dados inválidos ou usuário não é fornecedor' })
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
  @ApiOperation({ 
    summary: 'Listar vínculos usuário-serviço',
    description: 'Lista todos os vínculos ou filtra por usuário/serviço'
  })
  @ApiQuery({ name: 'usuarioId', required: false, description: 'ID do usuário para filtrar', type: 'number' })
  @ApiQuery({ name: 'servicoId', required: false, description: 'ID do serviço para filtrar', type: 'number' })
  @ApiResponse({ status: 200, description: 'Lista de vínculos retornada com sucesso' })
  async find(@Query('usuarioId') usuarioId?: number, @Query('servicoId') servicoId?: number) {
    const where: any = {};
    if (usuarioId) where.usuario = { id: usuarioId };
    if (servicoId) where.servico = { id: servicoId };
    return this.usuarioServicoRepository.find({ where, relations: ['usuario', 'servico'] });
  }
}
