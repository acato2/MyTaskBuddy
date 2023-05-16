const client = require('./connection.js')
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)
app.use(cors());



app.post('/login', async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
  
    const query = `
      SELECT * FROM users
      WHERE username = $1 AND password = $2
      LIMIT 1;
    `;
  
    const values = [username, password];
  
    try {
      const { rows } = await client.query(query, values);
  
      if (rows.length === 1) {
        res.status(200).json({ message: 'Logged in successfully!' });
      } else {
        res.status(401).json({ message: 'Invalid username or password' });
      }
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'An error occurred' });
    }
  });

app.get('/users', (req, res)=>{
    client.query(`Select * from users`, (err, result)=>{
        if(!err){
            res.send(result.rows);
        }
    });
    client.end;
})


app.listen(3000, ()=>{
    console.log("Sever is now listening at port 3000");
})

client.connect();