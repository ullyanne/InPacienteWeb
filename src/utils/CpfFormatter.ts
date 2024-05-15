
export function formatCpf(cpf: string ): string{
  const cpfRegex = /^(\d{3})(\d{3})(\d{3})(\d{2})$/;
  const formattedCpf = cpf.replace(cpfRegex, "$1.$2.$3-$4")
  return formattedCpf
}