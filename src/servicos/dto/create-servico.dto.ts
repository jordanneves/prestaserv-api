import { IsNotEmpty, IsString, IsNumber, IsOptional } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateServicoDto {
  @ApiProperty({
    description: 'Descrição detalhada do serviço',
    example: 'Desenvolvimento de aplicações web com React e Node.js',
  })
  @IsString()
  @IsNotEmpty()
  descricao: string;

  @ApiProperty({
    description: 'Tipo/categoria do serviço',
    example: 'Desenvolvimento de Software',
  })
  @IsString()
  @IsNotEmpty()
  tipoServico: string;

  @ApiProperty({
    description: 'Valor por hora do serviço em reais',
    example: 75.50,
  })
  @IsNumber()
  @IsNotEmpty()
  valorHora: number;

  @ApiPropertyOptional({
    description: 'Mensagem adicional sobre o serviço',
    example: 'Especialista em desenvolvimento full-stack com 5 anos de experiência',
  })
  @IsString()
  @IsOptional()
  mensagem?: string;
}
