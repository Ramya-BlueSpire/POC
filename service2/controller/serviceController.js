const express = require('express');
const axios = require('axios');
const CircuitBreaker = require('opossum');

const app = express();

// Fetch data method which includes the external API call
const fetchDataFromService1 = () => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            axios.get('http://localhost:3000/api/data')
                .then(response => resolve(response.data))
                .catch(error => reject(error));
                console.log("The URL is getting hitted.")
        }, 1500); // Adjusted to be within the timeout threshold (1500,1000 for reject)
    });
};

// Circuit breaker options used in the code
const circuitBreakerOptions = {
    // errorThresholdPercentage:,
    timeout: 1000,
    resetTimeout:5000,
    capacity: 3,
    rollingCountTimeout:5000,
    rollingCountBuckets :5,
    volumeThreshold:2
};

// Create a new circuit breaker instance outside of the request handler
const breaker = new CircuitBreaker(fetchDataFromService1, circuitBreakerOptions);

// Fallback function to handle failures
breaker.fallback(() => ({ body: 'Service 1 is unavailable right now. Try later.' }));

// Event listeners for different circuit breaker events
breaker.on('success', (result) => {
    console.log(`SUCCESS: ${JSON.stringify(result)}`);
});

breaker.on('timeout', () => {
    console.log('TIMEOUT: Service 1 is taking too long to respond.');
    
});

breaker.on('reject', () => {
    console.log('REJECTED: The circuit breaker is open. Failing fast.');
});

breaker.on('open', () => {
    
         console.log('OPEN: The circuit breaker just opened.');
    
});

breaker.on('halfOpen', () => {
    console.log('HALF_OPEN: The circuit breaker is half open.');
});

breaker.on('close', () => {
    console.log('CLOSE: The circuit breaker has closed. Service OK.');
});

breaker.on('fallback', (data) => {
    console.log(`FALLBACK: ${JSON.stringify(data)}`);
});

const handleRequest = async (req, res) => {
    try {
        // Fire the circuit breaker and await the result
        const result = await breaker.fire();
        res.status(200).json({ data: result }); // Success response with status code 200
    } catch (error) {
        console.error('Error fetching data:', error);
    }
};
module.exports={
    handleRequest
}
