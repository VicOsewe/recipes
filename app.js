const express = require('express');
const mongoose = require('mongoose');
const Thing = require('./models/thing');
const app = express();
mongoose.connect('mongodb+srv://victorine:<felixotieno>@cluster0-fwvx6.mongodb.net/admin?retryWrites=true&w=majority')
  .then(() => {
    console.log('Successfully connected to MongoDB Atlas!');
  })
  .catch((error) => {
    console.log('Unable to connect to MongoDB Atlas!');
    console.error(error);
  });
const bodyPaser = require('body-parser');
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });
  app.unsubscribe(bodyPaarser.json());
  app.post('/api/recipes', (req, res, next) => {
    const thing = new Thing({
      title: req.body.title,
      ingredients: req.body.ingredients,
      insructions: req.body.instructions,
      difficulty: req.body.difficulty,
      time: req.body.time,
      id: req.body.id
    });
    thing.save().then(
      () => {
        res.status(201).json({
          message: 'Post saved successfully!'
        });
      }
    ).catch(
      (error) => {
        res.status(400).json({
          error: error
        });
      }
    );
  });
  app.get('/api/recipes/:id', (req, res, next) => {
    Thing.findOne({
      _id: req.params.id
    }).then(
      (thing) => {
        res.status(200).json(thing);
      }
    ).catch(
      (error) => {
        res.status(404).json({
          error: error
        });
      }
    );
  });
  app.put('/api/recipes/:id', (req, res, next) => {
    const thing = new Thing({
      _id: req.params.id,
      title: req.body.title,
      ingredients: req.body.ingredients,
      insructions: req.body.instructions,
      time: req.body.time,
      id: req.body.id
    });
    Thing.updateOne({_id: req.params.id}, thing).then(
      () => {
        res.status(201).json({
          message: 'Thing updated successfully!'
        });
      }
    ).catch(
      (error) => {
        res.status(400).json({
          error: error
        });
      }
    );
  });

  app.use('/api/recipes', (req, res, next) => {
    Thing.find().then(
      (things) => {
        res.status(200).json(things);
      }
    ).catch(
      (error) => {
        res.status(400).json({
          error: error
        });
      }
    );
  });
  app.delete('/api/recipes/:id', (req, res, next) => {
    Thing.deleteOne({_id: req.params.id}).then(
      () => {
        res.status(200).json({
          message: 'Deleted!'
        });
      }
    ).catch(
      (error) => {
        res.status(400).json({
          error: error
        });
      }
    );
  });

module.exports = app;