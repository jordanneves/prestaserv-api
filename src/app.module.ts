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
    // Use DATABASE_URL when provided (Render provides this). Otherwise use individual POSTGRES_* vars.
    url: process.env.DATABASE_URL || undefined,
    host: process.env.DATABASE_URL ? undefined : (process.env.POSTGRES_HOST || 'localhost'),
    port: process.env.DATABASE_URL ? undefined : Number(process.env.POSTGRES_PORT) || 5432,
    username: process.env.DATABASE_URL ? undefined : (process.env.POSTGRES_USER || 'postgres'),
    password: process.env.DATABASE_URL ? undefined : (process.env.POSTGRES_PASSWORD || 'postgres'),
    database: process.env.DATABASE_URL ? undefined : (process.env.POSTGRES_DB || 'prestaserv_db'),
    autoLoadEntities: true,
    // In production prefer migrations; enable synchronize only when explicitly set or not in production
    synchronize: (process.env.TYPEORM_SYNCHRONIZE === 'true') || (process.env.NODE_ENV !== 'production'),
    // Enable SSL when requested (many managed Postgres providers require SSL).
    // Use DB_SSL=true in the environment to force SSL. For typical managed DBs (Render),
    // we set rejectUnauthorized: false to allow connection without custom CA.
    ssl: (process.env.DB_SSL === 'true' || (process.env.DATABASE_URL && process.env.NODE_ENV === 'production'))
      ? { rejectUnauthorized: false }
      : false,
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
