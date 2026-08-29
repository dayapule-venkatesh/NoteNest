import {app} from './app.js'
import {Connect_db} from './config/Connect_db.js'

Connect_db()

app.listen(3000, ()=>{
    console.log("server is running in port 3000")
})


// import express from 'express'

// export const app=express()

// app.listen(3000,()=>{console.log("server is running")})
