var express = require('express');
var exphbs = require('express-handlebars');
var bodyParser = require('body-parser');

var app = express();

app.use(express.static('public'));
app.use('/components', express.static('bower_components'));
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
app.engine('hbs', exphbs({
    extname: '.hbs'
}));
app.set('view engine', '.hbs');


//routes
app.get('/', function(req, res) {
    res.render('Home', {
        layout: 'baitap1',
        cssfile: 'Home',
        activenavbar0: 'active',
        activeleftmenu0: 'active'
    });
});

app.get('/Album', function(req, res) {
    res.render('Album', {
        layout: 'baitap1',
        cssfile: 'Album',
        activenavbar1: 'active',
        activeleftmenu1: 'active'
    });
});

app.get('/About', function(req, res) {
    res.render('About', {
        layout: 'baitap1',
        cssfile: 'About',
        activenavbar2: 'active',
        activeleftmenu2: 'active'
    });
});

app.get('/Blog', function(req, res) {
    res.render('Blog', {
        layout: 'baitap1',
        cssfile: 'Blog',
        activenavbar3: 'active',
        activeleftmenu3: 'active'
    });
});

app.get('/DangKy', function(req, res) {
    res.render('DangKy');
});

var client = new pg.Client();
client.connect(function(err) {
    if (err) throw err;


    client.end(function(err) {
        if (err) throw error;
    })
})

var session = require('express-session');
app.use(session({secret: 'ssshhhhh',saveUninitialized: true,resave: true}));
var conString = "postgres://AdminMyBlog:123456@localhost:5432/myBlogAdmin";

app.get('/register',function(req,res){
  if(req.session.exists){
    res.render('signup',{title: 'MyBlog.me sign-up',message: 'Sign Up',exists: 'Sorry, that username already exists.'});
  }
  else
    res.render('signup',{title: 'MyBlog.me sign-up',message: 'Sign Up'});
});

app.post('/sign-up',function(req,res) {
    var client = new pg.Client(conString);
    client.connect();
    var query = client.query("INSERT INTO users(username, password) SELECT $1::VARCHAR, $2 WHERE NOT EXISTS (SELECT username FROM users WHERE username = $1);",
                [req.body.user, req.body.pass],function(err, result) {
                  if(result.rowCount === 0){
                    req.session.exists = true;
                    res.redirect('/register');
                  }
                   else{
                      res.redirect('/');
                   }
                   client.end();
        });
});


var port = 3000;
//start server
app.listen(port, function() {
    console.log(`Dang lang nghe port ${port}!!!`);

});
