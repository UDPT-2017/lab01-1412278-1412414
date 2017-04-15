var express = require('express');
var exphbs = require('express-handlebars');
var bodyParser = require('body-parser');
var pg = require('pg');
var session = require('express-session');
const pool = require('./lib/db');
var session = require('express-session');
var app = express();

app.use(session({
    secret: 'keyboard cat',
}));
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
    if (req.session.username) {
        res.render('Home', {
            layout: 'baitap1',
            cssfile: 'Home',
            activenavbar0: 'active',
            activeleftmenu0: 'active',
            username: req.session.username
        });
    } else {
        res.render('Home', {
            layout: 'baitap1',
            cssfile: 'Home',
            activenavbar0: 'active',
            activeleftmenu0: 'active'
        });
    }

});

app.get('/Album', function(req, res) {
    if (req.session.username) {
        res.render('Album', {
            layout: 'baitap1',
            cssfile: 'Album',
            activenavbar1: 'active',
            activeleftmenu1: 'active',
            username: req.session.username
        });
    } else {
        res.render('Album', {
            layout: 'baitap1',
            cssfile: 'Album',
            activenavbar1: 'active',
            activeleftmenu1: 'active'
        });
    }
});

app.get('/Album/List1', function(req, res) {
    if (req.session.username) {
        res.render('List1', {
            layout: 'baitap1',
            cssfile: 'Album',
            activenavbar1: 'active',
            activeleftmenu1: 'active',
            username: req.session.username
        });
    } else {
        res.render('List1', {
            layout: 'baitap1',
            cssfile: 'Album',
            activenavbar1: 'active',
            activeleftmenu1: 'active'
        });
    }
});

app.get('/Album/List2', function(req, res) {
    if (req.session.username) {
        res.render('List2', {
            layout: 'baitap1',
            cssfile: 'Album',
            activenavbar1: 'active',
            activeleftmenu1: 'active',
            username: req.session.username
        });
    } else {
        res.render('List2', {
            layout: 'baitap1',
            cssfile: 'Album',
            activenavbar1: 'active',
            activeleftmenu1: 'active'
        });
    }
});

app.get('/About', function(req, res) {
    if (req.session.username) {
        res.render('About', {
            layout: 'baitap1',
            cssfile: 'About',
            activenavbar2: 'active',
            activeleftmenu2: 'active',
            username: req.session.username
        });
    } else {
        res.render('About', {
            layout: 'baitap1',
            cssfile: 'About',
            activenavbar2: 'active',
            activeleftmenu2: 'active'
        });
    }
});

app.get('/Blog', function(req, res) {
    if (req.session.username) {
        res.render('Blog', {
            layout: 'baitap1',
            cssfile: 'Blog',
            activenavbar3: 'active',
            activeleftmenu3: 'active',
            username: req.session.username
        });
    } else {
        res.render('Blog', {
            layout: 'baitap1',
            cssfile: 'Blog',
            activenavbar3: 'active',
            activeleftmenu3: 'active'
        });
    }
});

app.get('/Blog/Topic1', function(req, res) {
    if (req.session.username) {
        res.render('Topic1', {
            layout: 'baitap1',
            cssfile: 'Blog',
            activenavbar3: 'active',
            activeleftmenu3: 'active',
            username: req.session.username
        });
    } else {
        res.render('Topic1', {
            layout: 'baitap1',
            cssfile: 'Blog',
            activenavbar3: 'active',
            activeleftmenu3: 'active'
        });
    }
});

app.get('/Blog/Topic2', function(req, res) {
    if (req.session.username) {
        res.render('Topic2', {
            layout: 'baitap1',
            cssfile: 'Blog',
            activenavbar3: 'active',
            activeleftmenu3: 'active',
            username: req.session.username
        });
    } else {
        res.render('Topic2', {
            layout: 'baitap1',
            cssfile: 'Blog',
            activenavbar3: 'active',
            activeleftmenu3: 'active'
        });
    }
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
    if (req.body.user.tenDangNhap.length < 10) {
        res.render('DangKy', {
            errorMessage: 'Tên đăng nhập không được ít hơn 10 ký tự'
        });
    } else {
        if (req.body.user.matKhau.length < 10) {
            res.render('DangKy', {
                errorMessage: 'Mật khẩu không được ít hơn 10 ký tự'
            });
        } else {
            pool.query("select idnguoidung from nguoidung where tendangnhap = $1", [req.body.user.tenDangNhap], function(err, result) {
                if (err) {
                    return console.error('error running query', err);
                }
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
        }
    }
});

app.post('/DangNhap', function(req, res) {
    pool.query("select tennguoidung from nguoidung where tendangnhap = $1 and matkhau = $2", [req.body.user.tendangnhap, req.body.user.matkhau], function(err, result) {
        if (err) {
            return console.error('error running query', err);
        }

        if (result.rowCount == 1) {
            req.session.username = req.body.user.tendangnhap;
            res.redirect('/');
        } else {
            res.render('Home', {
                layout: 'baitap1',
                cssfile: 'Home',
                activenavbar0: 'active',
                activeleftmenu0: 'active',
                loiDangNhap: 'Tên đăng nhập hoặc mật khẩu sai'
            })
        }
    });
});

app.get('/DangXuat', function(req, res) {
    req.session.destroy(function(err) {
        if (err) {
            console.error(err);
        } else {
            res.redirect('/');
        }
    })
})

var port = 3000;
//start server
app.listen(port, function() {
    console.log(`Dang lang nghe port ${port}!!!`);

});
