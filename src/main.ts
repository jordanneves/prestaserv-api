import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { UsuariosService } from './usuarios/usuarios.service';
import { DataSource } from 'typeorm';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe()); // opcional, mas recomendado
  app.enableCors();
  const usuariosService = app.get(UsuariosService);
  // Wait for TypeORM DataSource to be initialized so tables/entities are ready
  try {
    const dataSource = app.get(DataSource);
    if (dataSource && !dataSource.isInitialized) {
      console.log('Initializing database connection before running seeds...');
      await dataSource.initialize();
      console.log('Database initialized.');
    }
  } catch (err) {
    // If we can't get the DataSource from DI, log and continue — TypeORM may already be initialized.
    console.warn('Warning: could not initialize DataSource before seeding:', err?.message || err);
  }
  const adminEmail = process.env.ADMIN_EMAIL || 'admin@prestaserv.com';
  const adminExists = await usuariosService.findByEmail?.(adminEmail);
  if (!adminExists && (process.env.SEED_ADMIN === 'true')) {
    try {
      await usuariosService.create({ nome: 'Admin', email: adminEmail, senha: '123456', tipo: 'admin', cpf: '00000000000', telefone:'', endereco:'' });
      console.log(`Admin account created for ${adminEmail}`);
    } catch (err) {
      console.error('Failed to create admin user during seed:', err?.message || err);
    }
  }
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
