const express = require('express');
const axios = require('axios');

const app = express();

// Fetch data method which includes the external API call
const fetchDataFromService2 = async () => {
    try {
        const response = await axios.get('http://localhost:3000/api/data');
        return response.data;
    } catch (error) {
        throw new Error('Service 1 is unavailable right now. Try later.');
    }
 
};

const handleRequest2 = async (req, res) => {
    try {
        // Fetch data from Service 1
        const result = await fetchDataFromService2();
        res.status(200).json({ data: result }); // Success response with status code 200
    } catch (error) {
        console.error('Error fetching data');
        // Error response with status code 503
        res.status(503).json({message:'server unavailable'})
    }
};

module.exports = {
    handleRequest2
};
