const express = require('express');
const bodyParser = require('body-parser');
const { Sequelize, DataTypes } = require('sequelize');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

const sequelize = new Sequelize('watched_movies_db', 'root', 'deerinbanch', {
  host: 'localhost',
  dialect: 'mysql'
});

const Movie = sequelize.define('Movie', {
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  date: {
    type: DataTypes.DATE,
    allowNull: false
  },
  downloadLink: {
    type: DataTypes.STRING,
    allowNull: false
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false
  }
});

app.get('/movies', async (req, res) => {
  try {
    const movies = await Movie.findAll();
    res.json(movies);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
});

app.post('/movies', async (req, res) => {
  const { name, date, downloadLink, description } = req.body;
  try {
    const movie = await Movie.create({ name, date, downloadLink, description });
    res.status(201).json(movie);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
});

app.delete('/movies/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await Movie.destroy({
      where: {
        id
      }
    });
    res.json({ message: 'Movie deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
});

app.put('/movies/:id', async (req, res) => {
  const { id } = req.params;
  const { name, date, downloadLink, description } = req.body;
  try {
    await Movie.update({ name, date, downloadLink, description }, {
      where: {
        id
      }
    });
    res.json({ message: 'Movie updated successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
});

// Sync Sequelize models and start server
sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});
