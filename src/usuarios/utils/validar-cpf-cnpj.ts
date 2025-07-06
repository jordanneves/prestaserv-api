export function validarCpfCnpj(valor: string): boolean {
  valor = valor.replace(/\D/g, '');
  if (valor.length === 11) {
    // Validação de CPF
    let soma = 0;
    let resto;
    if (/^(\d)\1+$/.test(valor)) return false;
    for (let i = 1; i <= 9; i++) soma += parseInt(valor.substring(i - 1, i)) * (11 - i);
    resto = (soma * 10) % 11;
    if (resto === 10 || resto === 11) resto = 0;
    if (resto !== parseInt(valor.substring(9, 10))) return false;
    soma = 0;
    for (let i = 1; i <= 10; i++) soma += parseInt(valor.substring(i - 1, i)) * (12 - i);
    resto = (soma * 10) % 11;
    if (resto === 10 || resto === 11) resto = 0;
    if (resto !== parseInt(valor.substring(10, 11))) return false;
    return true;
  } else if (valor.length === 14) {
    // Validação de CNPJ
    let tamanho = valor.length - 2;
    let numeros = valor.substring(0, tamanho);
    let digitos = valor.substring(tamanho);
    let soma = 0;
    let pos = tamanho - 7;
    for (let i = tamanho; i >= 1; i--) {
      soma += parseInt(numeros.charAt(tamanho - i)) * pos--;
      if (pos < 2) pos = 9;
    }
    let resultado = soma % 11 < 2 ? 0 : 11 - (soma % 11);
    if (resultado !== parseInt(digitos.charAt(0))) return false;
    tamanho = tamanho + 1;
    numeros = valor.substring(0, tamanho);
    soma = 0;
    pos = tamanho - 7;
    for (let i = tamanho; i >= 1; i--) {
      soma += parseInt(numeros.charAt(tamanho - i)) * pos--;
      if (pos < 2) pos = 9;
    }
    resultado = soma % 11 < 2 ? 0 : 11 - (soma % 11);
    if (resultado !== parseInt(digitos.charAt(1))) return false;
    return true;
  }
  return false;
}
