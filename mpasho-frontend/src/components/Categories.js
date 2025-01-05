import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Categories = ({ onCategorySelect }) => {
  const [categories, setCategories] = useState([]);  // State for dynamic categories
  const [loading, setLoading] = useState(true);  // State for loading status
  const [error, setError] = useState(null);  // State for error handling

  // Static categories (optional)
  const staticCategories = ['News', 'Politics', 'Nationalism and African States', 'Sports', 'Entertainment', 'Technology'];

  useEffect(() => {
    // Fetch categories from the API
    axios.get('http://localhost:5000/api/categories')
      .then(response => {
        setCategories(response.data);  // Assuming the API returns a list of categories
        setLoading(false);  // Stop loading once data is fetched
      })
      .catch(error => {
        console.error("Error fetching categories:", error);
        setError('Failed to load categories.');  // Set error message if request fails
        setLoading(false);  // Stop loading even if there is an error
      });
  }, []);

  return (
    <div>
      <h3>Browse Categories</h3>

      {/* Static categories section */}
      <h4>Static Categories</h4>
      <ul>
        {staticCategories.map((category, index) => (
          <li key={index} onClick={() => onCategorySelect(category)}>
            {category}
          </li>
        ))}
      </ul>

      {/* Dynamic categories section */}
      <h4>Dynamic Categories from API</h4>
      <ul>
        {loading ? (
          <li>Loading categories...</li>  // Show loading message when fetching categories
        ) : error ? (
          <li>{error}</li>  // Show error message if there was an error fetching categories
        ) : categories.length === 0 ? (
          <li>No categories available</li>  // Show message if no categories are returned
        ) : (
          categories.map((category, index) => (
            <li key={index} onClick={() => onCategorySelect(category)}>
              {category}
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

export default Categories;
