import { z } from "zod";

export const userSchema = z.object({
    cpf: z.string().length(11, "CPF deve ter 11 dígitos").regex(/^\d+$/, "CPF deve conter apenas números"),
    name: z.string().min(2, "Nome deve ter pelo menos 2 caracteres"),
    email: z.string().email("E-mail inválido"),
    password: z.string().min(6, "Senha deve ter pelo menos 6 caracteres"),
});