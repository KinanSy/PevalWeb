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
const authRoutes = require('./routes/authRoutes');
const studentTokenRoutes = require('./routes/studentTokenRoutes');

// Connexion à la base de données
database.authenticate()
  .then(() => console.log('Base de données connectée'))
  .catch((err) => console.error('Erreur de connexion à la base de données :', err));

// Middleware pour parser les requêtes JSON
app.use(express.json());

// Middleware CORS
app.use(cors());

// Définition des routes
app.use('/teachers', teacherRoutes);
app.use('/students', studentRoutes);
app.use('/modules', moduleRoutes);
app.use('/evaluations', evaluationRoutes);
app.use('/objectives', objectiveRoutes);
app.use('/criterions', criterionRoutes);
app.use('/results', criterionStudentResultRoutes);
app.use('/auth', authRoutes);
app.use('/tokens', studentTokenRoutes);

// Démarrage du serveur
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Peval Web API sur le port ${PORT}`);
});
