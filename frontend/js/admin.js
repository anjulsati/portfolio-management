"use strict";
const API_URL = 'http://localhost:5000/api/projects';

document.addEventListener("DOMContentLoaded", () => {
    fetchAdminProjects();
    document.getElementById('addProjectForm').addEventListener('submit', handleAddProject);
});


/**
 * Sort projects by category, then by title.
 * Algorithm: O(n log n) sort (built-in Timsort in modern JS engines).
 * Design analysis: stable and predictable order, easy to scan on admin page.
 */
const sortProjectsByCategoryAndTitle = projects => {
    return [...projects].sort((a, b) => {
        if (a.category < b.category) return -1;
        if (a.category > b.category) return 1;
        return a.title.localeCompare(b.title);
    });
};

const fetchAdminProjects = async () => {
    const listContainer = document.getElementById('project-list');
    try {
        const res = await fetch(API_URL);
        const projects = await res.json();
        listContainer.innerHTML = ''; 
        if (projects.length === 0) { listContainer.innerHTML = '<p class="empty-state">No projects found. Add some!</p>'; return; }
        
        // Algorithmic design: sort before rendering (design analysis for better UX and consistency)
        const sortedProjects = sortProjectsByCategoryAndTitle(projects);

        sortedProjects.forEach(proj => {
            listContainer.innerHTML += `
                <div class="project-list-item">
                    <div>
                        <strong style="color: #fff; font-size: 1.1rem;">${proj.title}</strong><br>
                        <span style="font-size: 0.8rem; color: #64ffda;">${proj.category}</span>
                    </div>
                    <button class="delete-btn" onclick="deleteProject('${proj._id}')">Delete</button>
                </div>
            `;
        });
    } catch (err) {
        listContainer.innerHTML = '<p style="color: #ff4d4d;">Backend offline.</p>';
    }
};

const handleAddProject = async (e) => {
    e.preventDefault();
    const btn = e.target.querySelector('button');
    btn.innerText = "Publishing...";
    
    const projectData = {
        title: document.getElementById('title').value,
        description: document.getElementById('description').value,
        category: document.getElementById('category').value,
        techStack: document.getElementById('techStack').value.split(',').map(item => item.trim())
    };

    await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(projectData)
    });

    e.target.reset(); 
    fetchAdminProjects(); 
    btn.innerText = "Publish Project";
    alert('Project Added Successfully!');
};

window.deleteProject = async (id) => {
    if(confirm('Are you sure you want to delete this project?')) {
        await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
        fetchAdminProjects();
    }
};