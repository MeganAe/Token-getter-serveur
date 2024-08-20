const express = require('express');
const fb = require('fbkey');
const app = express();
const port = 3000;

app.get('/gettoken', async (req, res) => {
  const email = req.query.email;
  const password = req.query.pass;

  if (!email || !password) {
    return res.status(400).json({ error: 'Missing parameters' });
  }

  try {
    const token = await fb.getKey(email, password);

    if (token.EAAAAU === null && token.EAAG) {
      return res.status(401).json({ error: 'Incorrect password' });
    }

    res.json({ token });
  } catch (error) {
    res.status(500).json({ error: 'Failed to get token' });
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
