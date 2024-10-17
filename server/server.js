const express = require('express');
const cors = require('cors');
const app = express();
const registerController = require('./controllers/register');
const loginController = require('./controllers/login');
const userRoutes = require('./routes/userPageRoutes');
const dietsRoutes = require('./routes/dietsRoutes');
const initDB = require('./db/createDB');
const {fieldsValidation, handleValidationErrors} = require('./validators/fieldsValidation');

const PORT = 8000;

app.use(cors());
app.use(express.json());

app.post('/register', fieldsValidation, handleValidationErrors, registerController);
app.post('/login', fieldsValidation, handleValidationErrors, loginController);

app.use('/user', userRoutes);
app.use('/', dietsRoutes);

async function startServer() {
    await initDB.main();
    app.listen(PORT, () => {
        console.log(`Server on ${PORT}`);
    });
}

startServer().catch(error => {
    console.error("Failed to start server:", error);
});