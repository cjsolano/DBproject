var mysql = require('mysql');
var bcrypt = require('bcryptjs');

module.exports = {

	getSignUp : function(req, res, next){
		return res.render('users/signup');
	},

	postSignUp: function(req, res, next){
		
		var salt = bcrypt.genSaltSync(10);
		var password = bcrypt.hashSync(req.body.password, salt);

		var user = {
			nombre : req.body.nombre,
			correo : req.body.email,
			genero : req.body.genero,
			edad : req.body.edad,
			user_name : req.body.user,
			pass : password
		};

		var config = require('.././database/config');

		var db = mysql.createConnection(config);

		db.connect();

		db.query('INSERT INTO usuario SET ?', user, function(err, rows, fields){
			if(err) throw err;

			//db.end();
		});

		var rol = {
			usuario : req.body.user,
			rol : '2'
		};

		//db.connect();

		db.query('INSERT INTO usuario_rol SET ?', rol, function(err, rows, fields){
			if(err) throw err;

			db.end();
		});


		req.flash('info', 'Se ha registrado correctamente, ya puede iniciar sesion');
		return res.redirect('/auth/signin');
	},

	getSignIn: function(req, res, next){
		return res.render('users/signin', {message: req.flash('info'), authmessage : req.flash('authmessage')});
	},

	logout : function(req, res, next){
		req.logout();
		res.redirect('/auth/signin');
	},

	getUserPanel : function(req, res, next){
		res.render('users/panel', {
			isAuthenticated : req.isAuthenticated(),
			user : req.user
		});
	}



};