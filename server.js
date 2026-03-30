const express = require('express');
const cors = require('cors');
const app = express();

// 1. Enable CORS so your HTML file can "fetch" from this server
app.use(cors());

// 2. Enable JSON parsing so you can read the data sent from your form
app.use(express.json());

const PORT = 3000;

// Sample Route to test if it's working
app.get('/', (req, res) => {
    res.send("Lucid Ledger Server is Alive! 🚀");
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});