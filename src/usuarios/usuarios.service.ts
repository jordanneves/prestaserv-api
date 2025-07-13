import { Injectable, BadRequestException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Usuario } from './entities/usuario.entity';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { Servico } from '../servicos/entities/servico.entity';
import { validarCpfCnpj } from './utils/validar-cpf-cnpj';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UsuariosService {
  constructor(
    @InjectRepository(Usuario)
    private readonly usuarioRepository: Repository<Usuario>,
    @InjectRepository(Servico)
    private readonly servicoRepository: Repository<Servico>,
    private readonly jwtService: JwtService,
  ) {}

  async create(createUsuarioDto: CreateUsuarioDto) {
    const { servicosRelacionados, cpf, email, senha, ...rest } = createUsuarioDto;
    // Validação de CPF/CNPJ
    /*if (!validarCpfCnpj(cpf)) {
      throw new BadRequestException('CPF ou CNPJ inválido.');
    }*/
    // Verificar duplicidade de CPF/CNPJ
    const usuarioExistente = await this.usuarioRepository.findOneBy({ cpf });
    if (usuarioExistente) {
      throw new BadRequestException('CPF ou CNPJ já cadastrado.');
    }
    // Verificar duplicidade de e-mail
    const emailExistente = await this.usuarioRepository.findOneBy({ email });
    if (emailExistente) {
      throw new BadRequestException('E-mail já cadastrado.');
    }
    if (!senha) {
      throw new BadRequestException('Senha é obrigatória.');
    }
    const senhaHash = await bcrypt.hash(senha, 10);
    const usuario = this.usuarioRepository.create({ cpf, email, senha: senhaHash, ...rest });
    if (servicosRelacionados && servicosRelacionados.length > 0) {
      const servicos = await this.servicoRepository.findByIds(servicosRelacionados);
      usuario.servicosRelacionados = servicos;
    }
    return this.usuarioRepository.save(usuario);
  }

  findAll() {
    return this.usuarioRepository.find({
      relations: ['servicosRelacionados'],
    });
  }

  findOne(id: number) {
    return this.usuarioRepository.findOne({
      where: { id },
      relations: ['servicosRelacionados'],
    });
  }

  async update(id: number, updateUsuarioDto: UpdateUsuarioDto) {
    const usuario = await this.usuarioRepository.findOneBy({ id });
    if (!usuario) {
      return null;
    }
    const updated = Object.assign(usuario, updateUsuarioDto);
    return this.usuarioRepository.save(updated);
  }

  async remove(id: number) {
    const result = await this.usuarioRepository.delete(id);
    if (result.affected) {
      return result.affected > 0;
    }
    return false;
  }

  async login(email: string, senha: string) {
    const usuario = await this.usuarioRepository
      .createQueryBuilder('usuario')
      .addSelect('usuario.senha')
      .where('usuario.email = :email', { email })
      .getOne();
    if (!usuario) {
      throw new UnauthorizedException('Email ou senha inválidos');
    }
    const senhaValida = await bcrypt.compare(senha, usuario.senha);
    if (!senhaValida) {
      throw new UnauthorizedException('Email ou senha inválidos');
    }
    const { senha: _, ...usuarioSemSenha } = usuario;
    const payload = { sub: usuario.id, email: usuario.email, tipo: usuario.tipo };
    const access_token = this.jwtService.sign(payload);
    return { access_token, usuario: usuarioSemSenha };
  }
}
