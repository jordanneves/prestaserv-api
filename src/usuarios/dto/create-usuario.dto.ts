import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEmail, IsEnum, IsNotEmpty, IsOptional, IsString, IsArray, IsNumber } from 'class-validator';

export class CreateUsuarioDto {
  @ApiProperty({
    description: 'Nome completo do usuário',
    example: 'João Silva',
  })
  @IsNotEmpty()
  @IsString()
  nome: string;

  @ApiProperty({
    description: 'CPF do usuário (apenas números)',
    example: '12345678901',
  })
  @IsNotEmpty()
  @IsString()
  cpf: string;

  @ApiProperty({
    description: 'Telefone do usuário',
    example: '11999887766',
  })
  @IsNotEmpty()
  @IsString()
  telefone: string;

  @ApiProperty({
    description: 'Endereço completo do usuário',
    example: 'Rua das Flores, 123, São Paulo - SP',
  })
  @IsNotEmpty()
  @IsString()
  endereco: string;

  @ApiProperty({
    description: 'Email do usuário',
    example: 'joao@email.com',
  })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({
    description: 'Senha do usuário',
    example: 'minhasenha123',
  })
  @IsNotEmpty()
  @IsString()
  senha: string;

  @ApiProperty({
    description: 'Tipo do usuário',
    enum: ['cliente', 'fornecedor'],
    example: 'cliente',
  })
  @IsNotEmpty()
  @IsEnum(['cliente', 'fornecedor'])
  tipo: 'cliente' | 'fornecedor';

  @ApiPropertyOptional({
    description: 'IDs dos serviços relacionados (apenas para fornecedores)',
    type: [Number],
    example: [1, 2, 3],
  })
  @IsOptional()
  @IsArray()
  @IsNumber({}, { each: true })
  servicosRelacionados?: number[];
}
6