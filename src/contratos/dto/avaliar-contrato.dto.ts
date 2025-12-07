import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, IsString, Min, Max } from 'class-validator';

export class AvaliarContratoDto {
  @ApiProperty({
    description: 'Nota para o prazo de entrega (de 1 a 5)',
    minimum: 1,
    maximum: 5,
    example: 4,
  })
  @IsNumber()
  @IsNotEmpty()
  @Min(1)
  @Max(5)
  notaPrazo: number;

  @ApiProperty({
    description: 'Nota para a qualidade do serviço (de 1 a 5)',
    minimum: 1,
    maximum: 5,
    example: 5,
  })
  @IsNumber()
  @IsNotEmpty()
  @Min(1)
  @Max(5)
  notaQualidade: number;

  @ApiProperty({
    description: 'Nota para o preço do serviço (de 1 a 5)',
    minimum: 1,
    maximum: 5,
    example: 4,
  })
  @IsNumber()
  @IsNotEmpty()
  @Min(1)
  @Max(5)
  notaPreco: number;

  @ApiPropertyOptional({
    description: 'Comentário sobre o serviço prestado',
    example: 'Excelente trabalho, superou as expectativas!',
  })
  @IsString()
  @IsOptional()
  comentario?: string;

  @ApiProperty({
    description: 'Data de conclusão do serviço',
    example: '2024-12-07',
  })
  @IsString()
  @IsNotEmpty()
  dataConclusao: string;
}
