var express = require('express');
var exphbs = require('express-handlebars');
var bodyParser = require('body-parser');
var pg = require('pg');
var session = require('express-session');
const pool = require('./lib/db');
var session = require('express-session');
var app = express();

app.use(session({ secret: 'keyboard cat', cookie: { maxAge: 60000 }}));
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

app.get('/DangKyThatBai', function(req, res) {
    if (req.session.exists) {
        res.render('DangKy', {
            errorMessage: 'Đã có người dùng này'
        });
    }
});

app.post('/DangKy', function(req, res) {
    pool.query("select idnguoidung from nguoidung where tendangnhap = $1", [req.body.user.tenDangNhap], function(err, result) {
        if (err) {
            return console.error('error running query', err);
        }
        console.log(result);
        if (result.rowCount == 1) {

            req.session.exists = true;
            res.redirect('/DangKyThatBai');
        } else {
            pool.query("INSERT INTO nguoidung (tennguoidung, gioitinh, ngaysinh, matkhau, tendangnhap, email) VALUES ($1,$2, $3, $4, $5, $6)", [req.body.user.hoTen, req.body.user.gioiTinh, req.body.user.ngaySinh, req.body.user.matKhau, req.body.user.tenDangNhap, req.body.user.email], function(err, result2) {
                res.render('DangKy', {
                    detailMessage: 'Đăng ký thành công'
                });
            });
        }
    });
});

app.post('/DangNhap', function(req, res) {
  pool.query("select tennguoidung from nguoidung where tendangnhap = $1 and matkhau = $2", [req.body.user.tendangnhap, req.body.user.matkhau], function(err, result) {
      if (err) {
          return console.error('error running query', err);
      }

      if (result.rowCount == 1)
      {
        req.session.username = req.body.user.tendangnhap;
        res.redirect('/');
      }
      else {

      }
  });
});

var port = 3000;
//start server
app.listen(port, function() {
    console.log(`Dang lang nghe port ${port}!!!`);

});
