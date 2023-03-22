import { users } from './data/users.js'
import User from './models/user.js'
import { connectDB } from './config/db.js';

connectDB();

const importData = async() => {
    try{
        await User.deleteMany();
        await User.insertMany(users)
        console.log("Users added")
        process.exit(0)
    }
    catch(error){
        console.error(`Error in adding data - ${error.message}`)
        process.exit(1)
    }
}

const destroyData = async() => {
    try {
        await User.deleteMany()
        console.log("Data deleted successfully...")
        process.exit(0);
    } catch (error) {
        console.error(`Error in adding data - ${error.message}`)
        process.exit(1)
    }
}

if(process.argv[2]=="-d") destroyData(); else importData();