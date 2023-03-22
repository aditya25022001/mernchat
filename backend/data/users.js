import bcrypt from 'bcryptjs'

export const users = [
    {
        name:"Aditya Uday Ubale",
        email:"adityaubale63@gmail.com",
        password:bcrypt.hashSync('AdityaUbale01@#',10),
    },
    {
        name:"Atharva Negi",
        email:"atharvanegi63@gmail.com",
        password:bcrypt.hashSync('AdityaUbale01@#',10),
    },
    {
        name:"Ankit Sahu",
        email:"ankitsahu63@gmail.com",
        password:bcrypt.hashSync('AdityaUbale01@#',10),
    },
    {
        name:"Akash Saini",
        email:"akashsaini63@gmail.com",
        password:bcrypt.hashSync('AdityaUbale01@#',10),
    },
]