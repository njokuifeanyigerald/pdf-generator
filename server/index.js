const express = require('express')
const pdf = require('html-pdf')
const cors = require('cors');
const pdfTemplate = require('./documents/index')

// calling the express app
const app = express();

// cors
app.use(cors())

// body parser
app.use(express.urlencoded({extended:false}))
app.use(express.json())

// route
app.post('/create-pdf', (req,res) => {
    pdf.create(pdfTemplate(req.body), {}).toFile('result.pdf', (err) => {
        if(err){
            res.send(Promise.reject())
        }
        res.send(Promise.resolve())
    })
});



app.get('/fetch-pdf', (req,res) =>{
    res.sendFile(`${__dirname}/result.pdf`)
})

// port
const PORT = process.env.PORT || 4000

app.listen(PORT, console.log(`server started at ${PORT}`))