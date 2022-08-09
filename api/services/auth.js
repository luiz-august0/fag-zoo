import bcrypt from "bcryptjs";

export const createPasswordHash = async (senha) => {
    return bcrypt.hash(senha, 8);
}