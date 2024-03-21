const express = require('express');
const app = express();

// Simulated function to fetch data (can be replaced with actual asynchronous operation)
const fetchData = async () => {
  const data = { name: 'ramu' };
  const isError = false; // Simulating an error condition
  if (isError) {
    throw new Error('Service unavailable');
  }
  return data;
}; 

app.get('/api/data', async (req, res) => {
  try {
    const data = await fetchData(); 
   
    res.status(202).json(data); 
    //res.send("<html><h1>ramya reddy</h1></html>")
  } catch (error) {
    res.status(503).json({ error: error });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Service 1 is running on port ${PORT}`);
});
