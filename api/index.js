const express = require('express');
const cors = require('cors');
const app = express();
const database = require('./config/database');

const teacherRoutes = require('./routes/teacherRoutes');
const studentRoutes = require('./routes/studentRoutes');
const evaluationRoutes = require('./routes/evaluationRoutes');
const moduleRoutes = require('./routes/moduleRoutes');
const objectiveRoutes = require('./routes/objectiveRoutes');
const criterionRoutes = require('./routes/criterionRoutes');
const criterionStudentResultRoutes = require('./routes/criterionStudentResultRoutes');

// Database connection
database.authenticate()
.then(() => console.log('Base de données connecté'))
.catch((err) => console.error('Erreur de connexion à la base de données :', err));

// Middleware
app.use(express.json());

// CORS Middleware
app.use(cors());

// Routes
app.use('/teachers', teacherRoutes);
app.use('/students', studentRoutes);
app.use('/modules', moduleRoutes);
app.use('/evaluations', evaluationRoutes);
app.use('/objectives', objectiveRoutes);
app.use('/criterions', criterionRoutes);
app.use('/results', criterionStudentResultRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
 console.log(`Peval Web API sur le port ${PORT}`);
});
