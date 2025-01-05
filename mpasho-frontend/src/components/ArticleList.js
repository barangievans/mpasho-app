// ArticleList.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ArticleItem from './ArticleItem';

const ArticleList = ({ category, searchQuery }) => {
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
        let url = `http://localhost:5000/api/articles`;
        if (category) {
            url += `/${category}`;
        } else if (searchQuery) {
            url = `http://localhost:5000/api/search/${searchQuery}`;
        }

        axios.get(url)
            .then(response => {
                setArticles(response.data);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching articles:', error);
                setLoading(false);
            });
    }, [category, searchQuery]);

    if (loading) return <div>Loading...</div>;

    return (
        <div>
            {articles.map((article) => (
                <ArticleItem key={article.id} article={article} />
            ))}
        </div>
    );
};

export default ArticleList;
