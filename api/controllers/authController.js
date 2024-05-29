const db = require('../models');
const Teacher = db.Teacher;
const crypto = require('crypto');

exports.login = async (req, res) => {
  const { username, password } = req.body;
  try {
    const hashedPassword = crypto.createHash('sha256').update(password).digest('hex');
    const teacher = await Teacher.findOne({
      where: {
        teaUsername: username,
        teaPassword: hashedPassword
      }
    });
    if (teacher) {
      res.json({ id: teacher.id_teacher, name: teacher.teaFirstname });
    } else {
      res.status(401).json({ error: 'Invalid username or password' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
