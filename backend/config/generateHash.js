import bcrypt from 'bcryptjs'

export const generateHash = (value) => {
    let salt = bcrypt.genSaltSync(10);
    return bcrypt.hashSync(value,salt);
}