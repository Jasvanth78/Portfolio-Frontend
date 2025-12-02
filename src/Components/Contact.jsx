import React from 'react'
import {useState, useEffect} from 'react'     
export default function Contact() {
    const [contact, setContact] = useState([]);
    useEffect(() => {
        fetch('http://localhost:5000/api/contact')
            .then(res => res.json())
            .then(data => setContact(data))
            .catch(err => console.error('Error fetching contact:', err));
    }, []);
    return (
        <div className="text-white">{
            contact.map(contact => (
                <div key={contact._id}>
                    <h2>{contact.name}</h2>
                    <p>{contact.description}</p>
                </div>
            ))
        }</div>
    )
}
