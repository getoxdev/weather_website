const path=require('path')
const express=require('express')
const hbs=require('hbs')
const geoCode=require('./utils/geocode')
const forecast=require('./utils/forecast')

const app=express()

//Define paths for express config
const publicPath=path.join(__dirname,'../public')
const viewsPath=path.join(__dirname,'../templates/views')
const partialsPath=path.join(__dirname,'../templates/partials')

//Setup handlebars engine and views location
app.set('view engine','hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialsPath)

//Setup static directory to serve
app.use(express.static(publicPath))

app.get('',(req,res)=>{
    res.render('index',{
        title: 'The Weather Page',
        name: 'Rishiraj Paul Chowdhury'
    })
})

app.get('/about',(req,res)=>{
    res.render('about',{
        title:'About Me',
        name:'Rishiraj Paul Chowdhury'
    })
})

app.get('/help',(req,res)=>{
    res.render('help',{
        title: 'Help',
        name: 'Rishiraj Paul Chowdhury'
    })
})

app.get('/weather',(req, res)=>{
    if(!req.query.address)
    {
        return res.send({
            error: 'You must provide the address.'
        })
    }

    geoCode(req.query.address,(error,{latitude,longitude,location}={})=>{
        if(error!=undefined)
        { 
            return res.send({error})
        }
        
        forecast(latitude, longitude, (error, forecastData) => {
            if(error!=undefined)
            {    
                return res.send({error})
            }

            res.send({
                forecast: forecastData,
                location: location
            })
       })
    })
})

app.get('/products',(req,res)=>{
    if(!req.query.search)
    {
        return res.send({
            error: 'You must provide a search term'
        })
    }

    console.log(req.query.search)
    res.send({
        products: []
    })
})

app.get('/help/*',(req,res)=>{
    res.render('404',{
        title: '404',
        name: 'Rishiraj Paul Chowdhury',
        errorMsg: 'Help article not found!'
    })
})

app.get('*',(req,res)=>{
    res.render('404',{
        title: '404',
        name: 'Rishiraj Paul Chowdhury',
        errorMsg: 'Page not found!'
    })
})

app.listen(3000,()=>{
    console.log('Server initiated on port 3000')
})