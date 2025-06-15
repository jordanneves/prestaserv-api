import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ServicosModule } from './servicos/servicos.module';
import { TypeOrmModule } from '@nestjs/typeorm';

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
  ServicosModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
