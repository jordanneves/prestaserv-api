import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ServicosModule } from './servicos/servicos.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsuariosModule } from './usuarios/usuarios.module';
import { ContratosModule } from './contratos/contratos.module';
import { UsuariosServicosModule } from './usuarios-servicos/usuarios-servicos.module';


@Module({
  imports: [TypeOrmModule.forRoot({
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: 'postgres',
    database: 'prestaserv_db',
    autoLoadEntities: true,
    synchronize: true,
  }),
  ServicosModule,
  UsuariosModule,
  ContratosModule,
  UsuariosServicosModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
