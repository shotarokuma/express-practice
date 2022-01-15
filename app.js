let express = require('express');
let path = require('path');
let app = express();


app.set('port', process.env.PORT || 8080);
let server = app.listen(app.settings.port, () => console.log('listening on ', app.settings.port));

app.use(express.static('public'));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/about', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'pages', 'about.html'));
});

app.get(['/contact', '/contact-us'], (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'pages', 'contact.html'));
});

app.get('/characters/:type',(req, res,next) => {
  let characters = {
    coworkers: ['Retsuko', 'Fenneko', 'Haida', 'Tsunoda', 'Kabae'], 
    friends: {
      Kiiroitori: {
        type: 'bird', description: 'hard worker'
      }, Rilakkuma: {
        type: 'bear',
        description: 'likes to relax'
      },
      Korilakkuma: {
        type: 'bear',
        description: 'has a big imagination'
      }
    }
  };
  res.json(characters[req.params.type]);
  next();
});

app.get('/home.html', (req, res) => {
  res.redirect(301, '/');
});

app.use("\*",(req, res) => {
  res.status(404).sendFile(path.join(__dirname, 'public', '404.html'));
});







