import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ContratosService } from './contratos.service';
import { ContratosController } from './contratos.controller';
import { Contrato } from './entities/contrato.entity';
import { Usuario } from '../usuarios/entities/usuario.entity';
import { Servico } from '../servicos/entities/servico.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Contrato, Usuario, Servico])],
  controllers: [ContratosController],
  providers: [ContratosService],
})
export class ContratosModule {}
