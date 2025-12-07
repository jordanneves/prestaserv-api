import { Controller, Get, Post, Body, Param, Patch, Query, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiQuery, ApiBearerAuth } from '@nestjs/swagger';
import { ContratosService } from './contratos.service';
import { CreateContratoDto } from './dto/create-contrato.dto';
import { AvaliarContratoDto } from './dto/avaliar-contrato.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@ApiBearerAuth('JWT-auth')
@ApiTags('contratos')
@Controller('contratos')
export class ContratosController {
  constructor(private readonly contratosService: ContratosService) {}

  @Post()
  @ApiOperation({ 
    summary: 'Criar novo contrato',
    description: 'Cria um contrato entre cliente e fornecedor para um serviço específico'
  })
  @ApiResponse({ status: 201, description: 'Contrato criado com sucesso' })
  @ApiResponse({ status: 400, description: 'Dados inválidos' })
  create(@Body() createContratoDto: CreateContratoDto) {
    return this.contratosService.create(createContratoDto);
  }

  @Get()
  @ApiOperation({ 
    summary: 'Listar contratos com filtros',
    description: 'Lista todos os contratos ou filtra por cliente/fornecedor'
  })
  @ApiQuery({ name: 'clienteId', required: false, description: 'ID do cliente para filtrar' })
  @ApiQuery({ name: 'fornecedorId', required: false, description: 'ID do fornecedor para filtrar' })
  @ApiResponse({ status: 200, description: 'Lista de contratos retornada com sucesso' })
  async findAllWithFilters(
    @Query('clienteId') clienteId?: number,
    @Query('fornecedorId') fornecedorId?: number
  ) {
    if (clienteId) {
      return this.contratosService.listarPorCliente(clienteId);
    }
    if (fornecedorId) {
      return this.contratosService.listarPorFornecedor(fornecedorId);
    }
    return this.contratosService.findAll();
  }

  @Get(':id')
  @ApiOperation({ 
    summary: 'Buscar contrato por ID',
    description: 'Retorna dados detalhados de um contrato específico'
  })
  @ApiParam({ name: 'id', description: 'ID do contrato', type: 'number' })
  @ApiResponse({ status: 200, description: 'Contrato encontrado' })
  @ApiResponse({ status: 404, description: 'Contrato não encontrado' })
  findOne(@Param('id') id: string) {
    return this.contratosService.findOne(Number(id));
  }

  @Patch(':id/avaliar')
  @ApiOperation({ 
    summary: 'Avaliar contrato',
    description: 'Permite ao cliente avaliar o serviço prestado'
  })
  @ApiParam({ name: 'id', description: 'ID do contrato', type: 'number' })
  @ApiResponse({ status: 200, description: 'Contrato avaliado com sucesso' })
  @ApiResponse({ status: 404, description: 'Contrato não encontrado' })
  avaliar(@Param('id') id: string, @Body() avaliarDto: AvaliarContratoDto) {
    return this.contratosService.avaliar(Number(id), avaliarDto);
  }

  @Patch(':id/encerrar')
  @ApiOperation({ 
    summary: 'Encerrar contrato',
    description: 'Marca um contrato como encerrado'
  })
  @ApiParam({ name: 'id', description: 'ID do contrato', type: 'number' })
  @ApiResponse({ status: 200, description: 'Contrato encerrado com sucesso' })
  @ApiResponse({ status: 404, description: 'Contrato não encontrado' })
  async encerrar(@Param('id') id: string) {
    return this.contratosService.encerrar(Number(id));
  }
}
