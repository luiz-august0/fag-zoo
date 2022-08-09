import bcrypt from "bcryptjs";

export const createPasswordHash = async (senha) => 
    bcrypt.hash(senha, 8);

export const checkPassword = (usuario, senha) => 
    bcrypt.compare(senha, usuario.senha);