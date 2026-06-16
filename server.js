const express = require('express')
const { Pool } = require('pg')
const path = require('path')

const app = express()
const pool = new Pool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  ssl: { rejectUnauthorized: false }
})

// Serve index.html
app.use(express.static(path.join(__dirname, 'public')))

// API ทดสอบเชื่อม DB
app.get('/api/db-test', async (req, res) => {
  try {
    const result = await pool.query('SELECT NOW() as time')
    res.json({ 
      status: 'connected', 
      db_time: result.rows[0].time,
      db_name: process.env.DB_NAME
    })
  } catch (err) {
    res.status(500).json({ status: 'error', message: err.message })
  }
})

app.get('/api/tables', async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT table_name FROM information_schema.tables WHERE table_schema = 'public' ORDER BY table_name"
    )
    res.json(result.rows.map(r => r.table_name))
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

app.listen(80, () => console.log('Server running on port 80'))