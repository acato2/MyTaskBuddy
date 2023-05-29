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

// PUT request to update the user's profile
app.put('/users/:userId/profile', async (req, res) => {
  const { userId } = req.params;
  const { username, password } = req.body;

  try {
    // Get the existing user data from the database
    const existingUser = await client.query('SELECT * FROM users WHERE id = $1', [userId]);

    if (existingUser.rows.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }

    const user = existingUser.rows[0];

    // Check if the new username or password is different from the existing ones
    if (username !== user.username || password !== user.password) {
      // Perform the update operation
      await client.query('UPDATE users SET username = $1, password = $2 WHERE id = $3', [username, password, userId]);

      // Return a success response
      return res.status(200).json({ message: 'Profile updated successfully' });
    }

    // If the new username and password are the same as the existing ones
    // Return a response indicating that no changes were made
    return res.status(200).json({ message: 'No changes made to the profile' });
  } catch (error) {
    console.error('Error updating profile:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
});

// GET route to fetch user's first name based on user ID
app.get('/users/:userId/firstname', async (req, res) => {
  try {
    const { userId } = req.params;
    const query = 'SELECT firstname FROM users WHERE id = $1';
    const values = [userId];

    const result = await client.query(query, values);
    const user = result.rows[0];
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json({ firstName: user.firstname });
  } catch (error) {
    console.error('Error fetching user:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});


// Fetch the substeps based on taskId
app.get('/substeps/:taskId', async (req, res) => {
  const { taskId } = req.params;
  try {
    const result = await client.query(
      'SELECT id, "stepName", description, status FROM substeps WHERE "taskId" = $1 ORDER BY id ASC',
      [taskId]
    );
    const substeps = result.rows;
    res.json({ substeps });
  } catch (error) {
    console.error('Error fetching substeps:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.put('/tasks/:taskId', async (req, res) => {
  const { taskId } = req.params;
  const { status } = req.body;

  try {
    // Update the status of the task in the tasks table
    const query = 'UPDATE tasks SET status = $1 WHERE id = $2';
    const values = [status, taskId];
    await client.query(query, values);

    res.sendStatus(200);
  } catch (error) {
    console.error('Error updating task status:', error);
    res.sendStatus(500);
  }
});

app.put('/tasks/update-progress/:taskId', async (req, res) => {
  const { taskId } = req.params;
  const { progress } = req.body;

  try {
    // Update the progress of the task in the tasks table
    const query = 'UPDATE tasks SET progress = $1 WHERE id = $2';
    const values = [progress, taskId];
    await client.query(query, values);

    res.sendStatus(200);
  } catch (error) {
    console.error('Error updating task progress:', error);
    res.sendStatus(500);
  }
});

app.get('/tasks/:taskId/status', async (req, res) => {
  const { taskId } = req.params;

  try {
    const query = 'SELECT status FROM tasks WHERE id = $1';
    const values = [taskId];

    const result = await client.query(query, values);
    const task = result.rows[0];

    if (!task) {
      return res.status(404).json({ error: 'Task not found' });
    }

    res.json({ status: task.status });
  } catch (error) {
    console.error('Error fetching task status:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Update step status endpoint
app.post('/update-step', async (req, res) => {
  const { stepId, status } = req.body;

  try {
    const query = 'UPDATE substeps SET status = $1 WHERE id = $2';
    const values = [status, stepId];
    await client.query(query, values);

    res.sendStatus(200);
  } catch (error) {
    console.error('Error updating step status:', error);
    res.sendStatus(500);
  }
});



app.listen(3000, ()=>{
    console.log("Sever is now listening at port 3000");
})

client.connect();