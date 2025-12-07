import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { UsuariosService } from './usuarios/usuarios.service';
import { DataSource } from 'typeorm';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.enableCors();

  // Configuração do Swagger
  const config = new DocumentBuilder()
    .setTitle('PrestaServ API')
    .setDescription('API para gerenciamento de serviços de prestação, conectando clientes e fornecedores através de contratos.')
    .setVersion('1.0.0')
    .addTag('usuarios', 'Operações relacionadas aos usuários')
    .addTag('servicos', 'Operações relacionadas aos serviços')
    .addTag('contratos', 'Operações relacionadas aos contratos')
    .addTag('usuarios-servicos', 'Relacionamentos entre usuários e serviços')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
      },
      'JWT-auth',
    )
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document, {
    customSiteTitle: 'PrestaServ API Documentation',
    customCss: `
      .swagger-ui .topbar { display: none }
      .swagger-ui .info .title { color: #2A7BD2 }
    `,
  });

  const usuariosService = app.get(UsuariosService);
  
  // Log database configuration for debugging
  console.log('Environment variables:');
  console.log('NODE_ENV:', process.env.NODE_ENV);
  console.log('DATABASE_URL present:', !!process.env.DATABASE_URL);
  console.log('TYPEORM_SYNCHRONIZE:', process.env.TYPEORM_SYNCHRONIZE);
  
  // Wait for TypeORM DataSource to be initialized so tables/entities are ready
  try {
    const dataSource = app.get(DataSource);
    console.log('DataSource isInitialized:', dataSource?.isInitialized);
    console.log('DataSource options synchronize:', dataSource?.options?.synchronize);
    
    if (dataSource && !dataSource.isInitialized) {
      console.log('Initializing database connection before running seeds...');
      await dataSource.initialize();
      console.log('Database initialized.');
    }
    
    // Log loaded entities
    if (dataSource?.entityMetadatas) {
      console.log('Loaded entities:', dataSource.entityMetadatas.map(em => em.name));
    }
  } catch (err) {
    // If we can't get the DataSource from DI, log and continue — TypeORM may already be initialized.
    console.warn('Warning: could not initialize DataSource before seeding:', err?.message || err);
  }
  const adminEmail = process.env.ADMIN_EMAIL || 'admin@prestaserv.com';
  /*const adminExists = await usuariosService.findByEmail?.(adminEmail);
  if (!adminExists && (process.env.SEED_ADMIN === 'true')) {
    try {
      await usuariosService.create({ nome: 'Admin', email: adminEmail, senha: '123456', tipo: 'admin', cpf: '00000000000', telefone:'', endereco:'' });
      console.log(`Admin account created for ${adminEmail}`);
    } catch (err) {
      console.error('Failed to create admin user during seed:', err?.message || err);
    }
  }*/

  await app.listen(process.env.PORT ?? 3000);
  console.log(`📚 Documentação da API disponível em: http://localhost:${process.env.PORT ?? 3000}/api/docs`);
}
bootstrap();
