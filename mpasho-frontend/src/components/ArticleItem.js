// ArticleItem.js
import React from 'react';

const ArticleItem = ({ article }) => {
    return (
        <div className="article-item">
            <h2>{article.title}</h2>
            <p>{article.content}</p>
            <small>{new Date(article.created_at).toLocaleDateString()}</small>
            {article.audio_url && (
                <div>
                    <audio controls>
                        <source src={article.audio_url} type="audio/mp3" />
                        Your browser does not support the audio element.
                    </audio>
                </div>
            )}
        </div>
    );
};

export default ArticleItem;
