import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBearerAuth } from '@nestjs/swagger';
import { ServicosService } from './servicos.service';
import { CreateServicoDto } from './dto/create-servico.dto';
import { UpdateServicoDto } from './dto/update-servico.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@ApiBearerAuth('JWT-auth')
@ApiTags('servicos')
@Controller('servicos')
export class ServicosController {
  constructor(private readonly servicosService: ServicosService) {}

  @Post()
  @ApiOperation({ 
    summary: 'Criar novo serviço',
    description: 'Cadastra um novo serviço no sistema'
  })
  @ApiResponse({ status: 201, description: 'Serviço criado com sucesso' })
  @ApiResponse({ status: 400, description: 'Dados inválidos' })
  create(@Body() createServicoDto: CreateServicoDto) {
    return this.servicosService.create(createServicoDto); 
  }

  @Get()
  @ApiOperation({ 
    summary: 'Listar todos os serviços',
    description: 'Retorna lista de todos os serviços disponíveis'
  })
  @ApiResponse({ status: 200, description: 'Lista de serviços retornada com sucesso' })
  findAll() {
    return this.servicosService.findAll();
  }

  @Get(':id')
  @ApiOperation({ 
    summary: 'Buscar serviço por ID',
    description: 'Retorna dados de um serviço específico'
  })
  @ApiParam({ name: 'id', description: 'ID do serviço', type: 'number' })
  @ApiResponse({ status: 200, description: 'Serviço encontrado' })
  @ApiResponse({ status: 404, description: 'Serviço não encontrado' })
  findOne(@Param('id') id: string) {
    return this.servicosService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ 
    summary: 'Atualizar serviço',
    description: 'Atualiza informações de um serviço específico'
  })
  @ApiParam({ name: 'id', description: 'ID do serviço', type: 'number' })
  @ApiResponse({ status: 200, description: 'Serviço atualizado com sucesso' })
  @ApiResponse({ status: 404, description: 'Serviço não encontrado' })
  update(@Param('id') id: string, @Body() updateServicoDto: UpdateServicoDto) {
    return this.servicosService.update(+id, updateServicoDto);
  }

  @Delete(':id')
  @ApiOperation({ 
    summary: 'Remover serviço',
    description: 'Remove um serviço do sistema'
  })
  @ApiParam({ name: 'id', description: 'ID do serviço', type: 'number' })
  @ApiResponse({ status: 200, description: 'Serviço removido com sucesso' })
  @ApiResponse({ status: 404, description: 'Serviço não encontrado' })
  remove(@Param('id') id: string) {
    return this.servicosService.remove(+id);
  }
}
