const path=require('path')
const express=require('express')
const hbs=require('hbs')
const geocode=require('./utils/geocode.js')
const forecast=require('./utils/forecast.js')

console.log(__dirname)
console.log(path.join(__dirname,'../public'))

const app=express()
const port=process.env.PORT || 3000

//define paths for express config
const publicDirectoryPath=path.join(__dirname,'../public')
const viewsPath=path.join(__dirname,'../templates/views')  //customize the views directory
const partialsPath=path.join(__dirname,'../templates/partials')

//setuphandlebars engine and views location
app.set('view engine','hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialsPath)


//setup static directory to set
app.use(express.static(publicDirectoryPath))

//set up route to index.hbs
app.get('',(req,res)=>{
    res.render('index.hbs',{
        title:'Weather App',
        name:'Adeetayyy'
    })
})


//below we are setting up route to about.hbs
app.get('/about',(req,res)=>{
    res.render('about.hbs',{
        title:'About me',
        name:'Adeetayyy'
    })
})


//set up route to help.hbs
app.get('/help',(req,res)=>
{
    res.render('help.hbs',{
        message:'this is a helpful page',
        title:'Help',
        name:'Adeetayyy'
    })
})

app.get('/weather',(req,res)=>{
    if(!req.query.address){
        return res.send({
            error:'You must enter an address'
        })
    }
    console.log(req.query.address)
    geocode(req.query.address,(error,{latitude,longitude,location}={})=>
    {
        if(error){
            return res.send({error})
        }
        forecast(latitude,longitude,(error,forecastData)=>{
            if(error){
                return res.send({error})
            }
            res.send({
                forecast:forecastData,
                location,
                address:req.query.address
            })
        })
    })
})

app.get('/products',(req,res)=>{
    if(!req.query.search){
         //if no search term
        return res.send({
             error:'You must provide a search term'
         })
    }
    console.log(req.query.search)
    res.send({
        products:[]
    })
})
app.get('/help/*',(req,res)=>
{
    res.render('404.hbs', {
        title:'404',
        name:'Adeetayyy',
        message:'Help article not found'})
})

//set up 404 page
app.get('*',(req,res)=>{
    res.render('404.hbs',{
        title:'404',
        name:'Adeetayyy',
        message:'Page not found'})
})

//start the server ,done only once!
app.listen(port,()=>
{
    console.log('Server is up on '+port)
})
