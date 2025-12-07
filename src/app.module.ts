import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ServicosModule } from './servicos/servicos.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsuariosModule } from './usuarios/usuarios.module';
import { AuthModule } from './auth/auth.module';
import { ContratosModule } from './contratos/contratos.module';
import { UsuariosServicosModule } from './usuarios-servicos/usuarios-servicos.module';


@Module({
  imports: [TypeOrmModule.forRoot({
    type: 'postgres',
    host: process.env.POSTGRES_HOST || 'localhost',
    port: Number(process.env.POSTGRES_PORT) || 5432,
    username: process.env.POSTGRES_USER || 'postgres',
    password: process.env.POSTGRES_PASSWORD || 'postgres',
    database: process.env.POSTGRES_DB || 'prestaserv_db',
    autoLoadEntities: true,
    synchronize: true,
  }),
  ServicosModule,
  UsuariosModule,
  AuthModule,
  ContratosModule,
  UsuariosServicosModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
