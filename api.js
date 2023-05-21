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
        const query2 = `
         SELECT id FROM users
          WHERE username = $1 AND password = $2;
        `;

         const result = await client.query(query2, values);
         const userId = result.rows[0].id;
        res.status(200).json({ message: 'Logged in successfully!', userId:userId});
      } else {
        res.status(401).json({ message: 'Invalid username or password' });
      }
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'An error occurred' });
    }
  });

app.post('/register', async(req,res) => {
  try{
    const firstname = req.body.firstname;
    const lastname = req.body.lastname;
    const username = req.body.username;
    const password = req.body.password;
    const avatar = req.body.avatar;


    //Check for empty fields
    if(!firstname || !lastname || !username || !password) {
      throw new Error('All fields are required');
    }
    // Check the format of firstname and lastname
    const nameRegex = /^[A-Za-z]+$/;
    if (!nameRegex.test(firstname) || !nameRegex.test(lastname)) {
      throw new Error('Invalid format for firstname or lastname');
    }
    // Check if the username already exists
    const userExists = await client.query('SELECT * FROM users WHERE username = $1', [username]);
    if (userExists.rows.length > 0) {
      throw new Error('Username already exists');
    }

    // Insert the parameters into the users table
    await client.query(
      'INSERT INTO users (firstname, lastname, username, password, avatar) VALUES ($1, $2, $3, $4, $5)',
      [firstname, lastname, username, password, avatar]
    );
    const query2 = `
    SELECT id FROM users
     WHERE username = $1 AND password = $2;
   `;
    const values = [username, password];
    const result = await client.query(query2, values);
    const userId = result.rows[0].id;
    res.status(200).json({ message: 'Registration successful', userId:userId} );
  }
  catch(error){
    res.status(400).json({ error: error.message });
  }
})

app.get('/tasks', async (req, res) => {
  try {
    const { userId,status,date } = req.query;

    // Fetch tasks based on the provided userId from the tasks table
    const query = 'SELECT * FROM tasks WHERE "userId" = $1 and status = $2 and date = $3';
    const values = [userId,status,date];
    const result = await client.query(query, values);

    // Get the rows from the result
    const tasks = result.rows;

    res.json(tasks);
  } catch (error) {
    console.error('Error fetching tasks:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get('/userdetails', async (req, res) => {
  try {
    const { userId } = req.query;

    // Fetch user details based on the provided id
    const query = 'SELECT * FROM users WHERE id = $1 ';
    const values = [userId];
    const result = await client.query(query, values);

    // Get the row from the result
    const details = result.rows[0];

    res.json(details);
  } catch (error) {
    console.error('Error fetching user details:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});



app.listen(3000, ()=>{
    console.log("Sever is now listening at port 3000");
})

client.connect();