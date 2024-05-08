const express = require('express');
const app = express();
const database = require('./config/database');

const teacherRoutes = require('./routes/teacherRoutes');
const studentRoutes = require('./routes/studentRoutes');
const evaluationRoutes = require('./routes/evaluationRoutes');
const moduleRoutes = require('./routes/moduleRoutes');

// Database connection
database.authenticate()
.then(() => console.log('Base de données connecté'))
.catch((err) => console.error('Erreur de connexion à la base de données :', err));

// Middleware
app.use(express.json());

// Routes
app.use('/Teacher', teacherRoutes);
app.use('/Student', studentRoutes);
app.use('/Evaluation', evaluationRoutes);
app.use('/Module', moduleRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
 console.log(`Peval Web API sur le port ${PORT}`);
});