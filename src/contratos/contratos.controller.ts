import { Controller, Get, Post, Body, Param, Patch } from '@nestjs/common';
import { ContratosService } from './contratos.service';
import { CreateContratoDto } from './dto/create-contrato.dto';
import { AvaliarContratoDto } from './dto/avaliar-contrato.dto';

@Controller('contratos')
export class ContratosController {
  constructor(private readonly contratosService: ContratosService) {}

  @Post()
  create(@Body() createContratoDto: CreateContratoDto) {
    return this.contratosService.create(createContratoDto);
  }

  @Get()
  findAll() {
    return this.contratosService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.contratosService.findOne(Number(id));
  }

  @Patch(':id/avaliar')
  avaliar(@Param('id') id: string, @Body() avaliarDto: AvaliarContratoDto) {
    return this.contratosService.avaliar(Number(id), avaliarDto);
  }
}
