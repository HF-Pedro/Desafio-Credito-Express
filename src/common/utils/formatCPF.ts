export const formatCpf = (cpf: string): string => {
    return `***.${cpf.slice(3, 6)}.${cpf.slice(6, 9)}-${cpf.slice(9, 11)}`;
};