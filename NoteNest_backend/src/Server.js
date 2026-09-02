import {app} from './app.js'
import {Connect_db} from './config/Connect_db.js'
import './config/redis.js'

Connect_db()

app.listen(3000, ()=>{
    console.log("server is running in port 3000")
})

