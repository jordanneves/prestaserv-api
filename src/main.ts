import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { UsuariosService } from './usuarios/usuarios.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe()); // opcional, mas recomendado
  app.enableCors();
  const usuariosService = app.get(UsuariosService);
  const adminEmail = process.env.ADMIN_EMAIL || 'admin@prestaserv.com';
  const adminExists = await usuariosService.findByEmail?.(adminEmail); // você precisaria adicionar findByEmail no service
  if (!adminExists && (process.env.SEED_ADMIN || 'true') === 'true') {
    await usuariosService.create({ nome: 'Admin', email: adminEmail, senha: '123456', tipo: 'admin', cpf: '00000000000', telefone:'', endereco:'' });
    // ajustar campos conforme DTO
  }
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
