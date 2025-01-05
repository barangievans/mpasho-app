// In App.js
import React, { useState } from 'react';
import Categories from './components/Categories';  // Updated path
import ArticleList from './components/ArticleList';  // Updated path
import SearchBar from './components/SearchBar';  // Updated path
import './App.css';

const App = () => {
    const [selectedCategory, setSelectedCategory] = useState('');
    const [searchQuery, setSearchQuery] = useState('');

    const handleCategorySelect = (category) => {
        setSelectedCategory(category);
        setSearchQuery('');  // Clear search when a category is selected
    };

    const handleSearch = (query) => {
        setSearchQuery(query);
        setSelectedCategory('');  // Clear category selection when searching
    };

    return (
        <div>
            <h1>Mpasho!</h1>
            <SearchBar onSearch={handleSearch} />
            <Categories onCategorySelect={handleCategorySelect} />
            <ArticleList category={selectedCategory} searchQuery={searchQuery} />
        </div>
    );
};

export default App;
