const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
app.use(cors());
app.use(bodyParser.json());

mongoose.connect('mongodb://localhost:27017/auth', { useNewUrlParser: true, useUnifiedTopology: true });

const UserSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

const User = mongoose.model('User', UserSchema);

app.post('/signup', async (req, res) => {
  const { email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  try {
    const newUser = new User({ email, password: hashedPassword });
    await newUser.save();
    res.status(201).send({ message: 'User created' });
  } catch (error) {
    res.status(400).send({ error: 'User already exists' });
  }
});

app.post('/login', async (req, res) => {
  const { email, password } = req.body;
  console.log('login  req', req.body);
  const user = await User.findOne({ email });
  if (user && (await bcrypt.compare(password, user.password))) {
    const token = jwt.sign({ id: user._id }, 'secretKey');
    res.status(200).send({ token });
  } else {
    res.status(400).send({ error: 'Invalid credentials' });
  }
});

app.listen(5000, () => {
  console.log('Server running on port 5000');
});
