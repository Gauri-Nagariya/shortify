import mongoose from 'mongoose';

const { Schema } = mongoose;

const loginSchema = new Schema({
    User_name: {
        type: String,
        required: true,
        trim: true
    },
    Email: {
    type: String,
    required: true,
    trim: true,
    unique: true
    },
    Password: {
        type: String,
        required: true,

    }
    
});

const Login = mongoose.model('Login', loginSchema);

export default Login;
