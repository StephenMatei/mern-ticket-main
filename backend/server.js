const path = require('path')
const express = require('express')
const cors = require('cors')
require('colors')
require('dotenv').config({ path: path.join(__dirname, '.env') })
console.log('MONGO_URI:', process.env.MONGO_URI)

const { errorHandler } = require('./middleware/errorMiddleware')
const connectDB = require('./config/db')
const PORT = process.env.PORT || 5000

// Connect to database
connectDB()

const app = express()

// ✅ Allow CORS for local dev (5173) and production
const allowedOrigins = [
  'http://localhost:5173', // Vite frontend
  process.env.CLIENT_URL    // your deployed frontend (set in .env)
]

app.use(cors({
  origin: allowedOrigins,
  credentials: true,
}))

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

// Routes
app.use('/api/users', require('./routes/userRoutes'))
app.use('/api/tickets', require('./routes/ticketRoutes'))
app.use("/api/contact", require("./routes/contactRoutes"));

// Serve Frontend
if (process.env.NODE_ENV === 'production') {
  // Set build folder as static
  app.use(express.static(path.join(__dirname, '../frontend/build')))

  // FIX: below code fixes app crashing on refresh in deployment
  app.get('*', (_, res) => {
    res.sendFile(path.join(__dirname, '../frontend/build/index.html'))
  })
} else {
  app.get('/', (_, res) => {
    res.status(200).json({ message: 'Welcome to the Ticket-App API' })
  })
}

app.use(errorHandler)

app.listen(PORT, () => console.log(`Server started on port ${PORT}`))
