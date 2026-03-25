const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors()); 

// Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/portfolioDB')
  .then(() => console.log("Connected to MongoDB Database!"))
  .catch(err => console.error(err));

const Project = require('./models/Project');

// GET: Send all projects to the frontend
app.get('/api/projects', async (req, res) => {
    try {
        const projects = await Project.find();
        res.json(projects);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// POST: Receive a new project from the Admin panel and save it
app.post('/api/projects', async (req, res) => {
    try {
        const newProject = new Project(req.body);
        await newProject.save();
        res.status(201).json(newProject);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// DELETE: Remove a project
app.delete('/api/projects/:id', async (req, res) => {
    try {
        await Project.findByIdAndDelete(req.params.id);
        res.json({ message: 'Project deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Server is running on http://localhost:${PORT}`));