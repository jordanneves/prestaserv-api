import { Controller, Get, Post, Body, Patch, Param, Delete, BadRequestException, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBody, ApiUnauthorizedResponse, ApiBadRequestResponse, ApiBearerAuth } from '@nestjs/swagger';
import { UsuariosService } from './usuarios.service';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@ApiTags('usuarios')
@Controller('usuarios')
export class UsuariosController {
  constructor(
    private readonly usuariosService: UsuariosService,
  ) {}

  @Post('login')
  @ApiOperation({ 
    summary: 'Autenticação de usuário',
    description: 'Realiza login do usuário e retorna token JWT'
  })
  @ApiBody({
    description: 'Credenciais de login',
    schema: {
      type: 'object',
      properties: {
        email: { type: 'string', example: 'joao@email.com' },
        senha: { type: 'string', example: 'minhasenha123' }
      }
    }
  })
  @ApiResponse({ 
    status: 200, 
    description: 'Login realizado com sucesso',
    schema: {
      type: 'object',
      properties: {
        access_token: { type: 'string' },
        user: {
          type: 'object',
          properties: {
            id: { type: 'number' },
            nome: { type: 'string' },
            email: { type: 'string' },
            tipo: { type: 'string', enum: ['cliente', 'fornecedor'] }
          }
        }
      }
    }
  })
  @ApiUnauthorizedResponse({ description: 'Credenciais inválidas' })
  login(@Body() body: { email: string; senha: string }) {
    return this.usuariosService.login(body.email, body.senha);
  }

  @Post()
  @ApiOperation({ 
    summary: 'Criar novo usuário',
    description: 'Registra um novo usuário no sistema'
  })
  @ApiResponse({ status: 201, description: 'Usuário criado com sucesso' })
  @ApiBadRequestResponse({ description: 'Dados inválidos ou email já existe' })
  create(@Body() createUsuarioDto: CreateUsuarioDto) {
    return this.usuariosService.create(createUsuarioDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({ 
    summary: 'Listar todos os usuários',
    description: 'Retorna lista de todos os usuários cadastrados'
  })
  @ApiResponse({ status: 200, description: 'Lista de usuários retornada com sucesso' })
  findAll() {
    return this.usuariosService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({ 
    summary: 'Buscar usuário por ID',
    description: 'Retorna dados de um usuário específico'
  })
  @ApiParam({ name: 'id', description: 'ID do usuário', type: 'number' })
  @ApiResponse({ status: 200, description: 'Usuário encontrado' })
  @ApiResponse({ status: 404, description: 'Usuário não encontrado' })
  @ApiBadRequestResponse({ description: 'ID inválido' })
  findOne(@Param('id') id: string) {
    const userId = Number(id);
    if (isNaN(userId)) {
      throw new BadRequestException('ID inválido');
    }
    return this.usuariosService.findOne(userId);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({ 
    summary: 'Atualizar dados do usuário',
    description: 'Atualiza informações de um usuário específico'
  })
  @ApiParam({ name: 'id', description: 'ID do usuário', type: 'number' })
  @ApiResponse({ status: 200, description: 'Usuário atualizado com sucesso' })
  @ApiResponse({ status: 404, description: 'Usuário não encontrado' })
  update(@Param('id') id: string, @Body() updateUsuarioDto: UpdateUsuarioDto) {
    return this.usuariosService.update(Number(id), updateUsuarioDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({ 
    summary: 'Remover usuário',
    description: 'Remove um usuário do sistema'
  })
  @ApiParam({ name: 'id', description: 'ID do usuário', type: 'number' })
  @ApiResponse({ status: 200, description: 'Usuário removido com sucesso' })
  @ApiResponse({ status: 404, description: 'Usuário não encontrado' })
  remove(@Param('id') id: string) {
    return this.usuariosService.remove(Number(id));
  }
  
}
