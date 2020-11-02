var env = process.env.NODE_ENV || 'development';

if (env === 'development'){
    process.env.MONGO_URL = 'mongodb://127.0.0.1:27017/MekuApp';
}else if(env === 'test'){
    process.env.MONGO_URL = 'mongodb://127.0.0.1:27017/TodoAppTest';
}


const SECRET = 'alpha123';
const JWT_SECRET = '12345';

module.exports = {SECRET, JWT_SECRET};