import { cpf as cpfValidator } from 'cpf-cnpj-validator';

export function isCpfValid(cpf: string): boolean {
  if (cpfValidator.isValid(cpf)) {
    return true
  }
  return false
}