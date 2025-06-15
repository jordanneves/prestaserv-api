import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Servico } from './entities/servico.entity';
import { CreateServicoDto } from './dto/create-servico.dto';
import { UpdateServicoDto } from './dto/update-servico.dto';

@Injectable()
export class ServicosService {
  constructor(
    @InjectRepository(Servico)
    private readonly servicoRepository: Repository<Servico>,
  ) {}

  create(createServicoDto: CreateServicoDto) {
    const servico = this.servicoRepository.create(createServicoDto);
    return this.servicoRepository.save(servico);
  }

  findAll() {
    return this.servicoRepository.find();
  }

  findOne(id: number) {
    return this.servicoRepository.findOneBy({ id });
  }

  async update(id: number, updateServicoDto: UpdateServicoDto) {
    const servico = await this.servicoRepository.findOneBy({ id });
    if (!servico) {
      return null;
    }
    const updated = Object.assign(servico, updateServicoDto);
    return this.servicoRepository.save(updated);
  }

  async remove(id: number) {
    const result = await this.servicoRepository.delete(id);
    if(result.affected){
      return result.affected > 0;
    }
    return false;
  }
}
