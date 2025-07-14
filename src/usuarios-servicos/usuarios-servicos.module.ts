
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsuarioServico } from './usuario-servico.entity';
import { Usuario } from '../usuarios/entities/usuario.entity';
import { UsuariosServicosController } from './usuarios-servicos.controller';

@Module({
  imports: [TypeOrmModule.forFeature([UsuarioServico, Usuario])],
  controllers: [UsuariosServicosController],
  exports: [TypeOrmModule],
})
export class UsuariosServicosModule {}
