const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

let serverList = [];

app.get('/', (req, res) => {
    res.json({ 
        status: 'API calisiyor',
        servers: serverList.length 
    });
});

app.get('/get-server', (req, res) => {
    if (serverList.length === 0) {
        return res.status(404).json({ error: 'No servers available' });
    }
    
    const server = serverList.shift();
    res.json({ job_id: server });
});

app.get('/get-batch', (req, res) => {
    const count = parseInt(req.query.count) || 1;
    const batch = serverList.splice(0, count);
    
    const servers = batch.map(jobId => ({ job_id: jobId }));
    res.json({ servers });
});

app.post('/add-server', (req, res) => {
    const { jobId } = req.body;
    
    if (jobId && !serverList.includes(jobId)) {
        serverList.push(jobId);
        console.log('Sunucu eklendi:', jobId);
    }
    
    res.json({ success: true });
});

app.listen(PORT, () => {
    console.log(`API ${PORT} portunda calisiyor`);
});
