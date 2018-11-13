var LocalStrategy = require('passport-local').Strategy;
var mysql = require('mysql');
var bcrypt = require('bcryptjs');

module.exports = function(passport){

	passport.serializeUser(function(user, done){
		done(null, user);
	});

	passport.deserializeUser(function(obj, done){
		done(null, obj);
	});

	passport.use(new LocalStrategy({
		passReqToCallback : true
	}, function(req, user, password, done){

		//console.log(user);

		var config = require('.././database/config');
		var db = mysql.createConnection(config);
		db.connect();

		db.query('SELECT * FROM usuario WHERE user_name = ?', user, function(err, rows, fields){
			if(err) throw err;

			db.end();

			if(rows.length > 0){

				var user = rows[0];
				if(bcrypt.compareSync(password, user.pass)){
					return done(null, {
						user_name : user.user_name, 
						nombre : user.nombre,
						correo : user.correo
					});
				}
			}

			return done(null, false, req.flash('authmessage', 'Usuario o Contraseña incorrecto.'));

		});

	}
	));

};