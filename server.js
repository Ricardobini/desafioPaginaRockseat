const express = require('express')
const nunjucks = require('nunjucks')

const server = express()
const courses = require("./data")

server.use(express.static('public'))

server.set("view engine", "njk")

nunjucks.configure("views", {
    express:server
})

server.listen(5000, function(){
    console.log("Server running")
})

server.get("/", function(req, res){
    return res.render("index")
})

server.get("/courses", function(req, res){

    return res.render("courses",{items: courses})
})


server.get("/course", function(req, res){
    const id = req.query.id
    const course = courses.find(function(course){
        if(course.id == id) {
            return true
        }
    })
    
    if(!course){
        return res.render("not-found")
    }
    return res.render("course", { item: course })
} )

server.get("/about", function(req, res){
    return res.render("about")
})


server.use(function(req, res) {
    res.status(404).render("not-found")
  })