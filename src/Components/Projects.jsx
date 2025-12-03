import React from 'react'
import {useState, useEffect} from 'react'     
export default function Projects() {
    const [projects, setProjects] = useState([]);
    useEffect(() => {
        fetch('http://localhost:5000/api/projects')
            .then(res => res.json())
            .then(data => setProjects(data))
            .catch(err => console.error('Error fetching projects:', err));
    }, []);
    return (
        <div className="text-white">{
            projects.map(project => (
                <div key={project._id}>
                    <h2>{project.title}</h2>
                    <p>{project.description}</p>
                    <p>{project.tags}</p>
                    <p>{project.team}</p>
                    <p>{project.githubUrl}</p>
                    <p>{project.liveUrl}</p>
                    <p>{project.thumbnail}</p>
                </div>
            ))
        }</div>
    )
}
