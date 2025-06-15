import { IsNotEmpty, IsString } from 'class-validator';

export class CreateServicoDto {
  @IsString()
  @IsNotEmpty()
  descricao: string;
}
