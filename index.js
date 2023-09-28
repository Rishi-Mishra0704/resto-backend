import express from 'express'
import cors from 'cors'

// Initialize express
const app = express()


// Middlewares
app.use(cors())
app.use(express.json())


// Routes
app.get('/', (req, res) => {
    res.send('Hello World!')
})


// Start server
app.listen(3000, () => {
    console.log('Server on port 3000')
})
