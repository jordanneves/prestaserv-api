export class CreateUsuarioDto {
  nome: string;
  cpf: string;
  telefone: string;
  endereco: string;
  email: string;
  senha: string;
  tipo: 'cliente' | 'fornecedor' | 'admin';
  servicosRelacionados?: number[];
}
6