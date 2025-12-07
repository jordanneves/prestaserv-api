import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateContratoDto {
  @ApiProperty({
    description: 'ID do cliente que está contratando o serviço',
    example: 1,
  })
  @IsNumber()
  @IsNotEmpty()
  clienteId: number;

  @ApiProperty({
    description: 'ID do fornecedor que prestará o serviço',
    example: 2,
  })
  @IsNumber()
  @IsNotEmpty()
  fornecedorId: number;

  @ApiProperty({
    description: 'ID do serviço a ser contratado',
    example: 1,
  })
  @IsNumber()
  @IsNotEmpty()
  servicoId: number;

  @ApiPropertyOptional({
    description: 'Data prevista para a prestação do serviço',
    example: '2024-12-15',
  })
  @IsString()
  @IsOptional()
  data?: string;
}
