import React, { useEffect, useState } from 'react';
import axios from 'axios';

const SponsoredContent = () => {
    const [sponsored, setSponsored] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:5000/api/sponsored')
            .then(response => setSponsored(response.data))
            .catch(error => console.error('Error fetching sponsored content', error));
    }, []);

    return (
        <div>
            {sponsored.map((content) => (
                <div key={content.id}>
                    <h3>{content.title}</h3>
                    <p>{content.content}</p>
                </div>
            ))}
        </div>
    );
};

export default SponsoredContent;
