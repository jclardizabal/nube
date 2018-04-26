var validarCorreo = function(correo) {
if (/(.+)@(.+){2,}\.(.+){2,}/.test(correo)){
  return true;
} else {
 return false;
}
};

var five = require("johnny-five");
var board = new five.Board({port: "COM4"});
var controller = process.argv[2] || "GP2Y0A02YK0F";
var RelayFoco, RelayCorriente, RelayAlarma, RelayAgua;

var usuario;
var save = function(req,correo,id,nombre,apellido){
  req.session.correo = correo;
  req.session.id_user = id;
  usuario=req.session.id_user;
  req.session.nombre = nombre;
  req.session.apellido = apellido;
}

function ObtenerHora(accion){
  var momentoActual = new Date(); var hora = momentoActual.getHours(); var minuto = momentoActual.getMinutes();
  var segundo = momentoActual.getSeconds(); var horalogin;
  if(hora<12){horalogin= hora + ":" + minuto + ":" + segundo + ' AM';}
    else{horalogin= hora + ":" + minuto + ":" + segundo + ' PM';}
    console.log(horalogin);
    var info = {
      id_usuario: usuario, hora:horalogin, accion: accion
    }
    db.connection.query('insert into historial SET ?',info,function(err2,result2){
      if(err2){
        console.log(err2);
      }else{
        console.log(horalogin); console.log('gud');
      }
    });
}
function CambiarEstado(funcion,estado){
var info;
  if(funcion==1){
    info = {
      E1: estado
    }
  }
  else if(funcion==2){
    info = {
      E2: estado
    }
  }
  else if(funcion==3){
    info = {
      E3: estado
    }
  }
  else if(funcion==4){
    info = {
      E4: estado
    }
  }
  db.connection.query('update Estado SET ?',info,function(err2,result2){
    if(err2){
      console.log(err2);
    }else{
      console.log('gud');
    }
  });
}
var equals = function(valor1, valor2){
	if(valor1 != valor2){
		return false;
	}else{
		return true;
	}
}
var crypto = require('crypto'),
    key_crypt = 'enc88';

var db = require('./connection.js');

module.exports = {
  _config: {
  		actions:false,
  		shortcuts:false,
  		rest:false
  	},
    Login(req,res){
      sails.log.info("Login on UserController");
      var correo = req.param('correo').replace(/[&%^!*\#,;'`"]/g, '');
      var pass = req.param('password').replace(/[&%^!*\#,;'`"]/g, '');

      if(equals(correo,'') || equals(pass,'')){
        res.render('login',{error: "Se encontraron campos vacios"});
      }else if(!validarCorreo(correo)){
        res.render('login',{error: "El correo tiene un formato incorrecto"});
      }else{
        var hash = crypto.createHmac('sha512',key_crypt);
        hash.update(pass);
        pass=hash.digest('hex');

        db.connection.query("Select * from usuario where correo = '"+correo+"' and password = '"+pass+"'",function(err,result){
          if(err){
            res.render('login',{error: "Correo o contrasena incorrecto"});
          }else{
            if(result.length > 0){
              sails.log.info("I: " + result[0].nombre + ' ' + result[0].apellido);
              save(req,correo,result[0].id_usuario,result[0].nombre,result[0].apellido);
              //GUARDAR EN HISTORIAL
              var accion= 'Iniciar sesion';
              ObtenerHora(accion);
                //

              res.redirect('/inicio');

            }else{
              res.render('login',{error: 'El correo no esta registrado'});
            }
          }
        });
      }
    },
probar(req,res){
    if(req.session.correo!=null){
      db.connection.query('select * from Estado, Alarma where id_alarma=(Select Max(id_alarma) from Alarma)',function(err,result){
        if(err){
          console.log(err);
        }else{
          res.render('inicio',{datos: result});
          }
      });
    }
      else{res.render('404');}
},
Alarm(req,res){

},
Alarma(req,res){
var hora = req.param('hora');
var minutos = req.param('minutos');
var segundos = req.param('segundos');
var luces = req.param('luces');
var corriente = req.param('corriente');
var alarma = req.param('alarma');
var agua=req.param('agua');
if (luces=="Luces"){
  luces=1;
}
else {
  luces=0;
}
if (corriente=="Corriente Eléctrica"){
  corriente=1;
}
else {
  corriente=0;
}
/*if (alarma=="Alarma"){
  alarma=1;
}
else {
  alarma=0;
}*/

var info = {
  hora: hora, minutos: minutos, segundos:segundos, P1:luces, P2:corriente
}
db.connection.query('insert into alarma SET ?',info,function(err2,result2){
  if(err2){
    console.log(err2);
  }else{ console.log('gud');
  }
});
var accion='Crear Alarma Programada';
ObtenerHora(accion);
res.redirect('/inicio');
},
    LeerHistorial(req,res){
      if(req.session.correo!=null){
      db.connection.query('select * from historial where id_usuario='+ req.session.id_user,function(err,result){
        if(err){
          res.end(err);
        }else{
          res.render('historial',{datos: result});
				  }
			});
    }
    else {
      res.render('404');
    }
    },
    LeerAlarma(req,res){
      if(req.session.correo!=null){
      db.connection.query('select * from alarma',function(err,result){
        if(err){
          res.end(err);
        }else{
          res.render('viewalarma',{datos: result});
				  }
			});
    }
    else {
      res.render('404');
    }
    },
    VerEstados(req,res){
      console.log("H");
    },
    Register(req,res){
      var correo = req.param('correo');
      var nombre = req.param('nombre');
      var apellido = req.param('apellido');
			var password = req.param('password');
			var passwordr = req.param('passwordr');
      var id_usuario;

      if(!validarCorreo(correo) || correo == null || correo == ''){
        res.render('Register',{error: 'Formato de correo invalido'});
      }else if(!equals(passwordr,password) || passwordr == null || password == null || password == '' || passwordr == ''){
        res.render('Register',{error: "Password doesn't match"});
      }else{
        nombre = nombre.replace(/[&\\\#,+;()$~%'`~^="*?<>{}]/g, '');
        apellido = apellido.replace(/[&\\\#,+;()$~%'`~^="*?<>{}]/g, '');
        password = password.replace(/[&\\\#,+;()$~%'`~^="*?<>{}]/g, '');
        passwordr = passwordr.replace(/[&\\\#,+;()$~%'`~^="*?<>{}]/g, '');

        var hash = crypto.createHmac('sha512',key_crypt);
        hash.update(password);
        password = hash.digest('hex');

        var info = {
          nombre: nombre,
          password: password,
          apellido: apellido,
          correo: correo
        }

        db.connection.query('insert into usuario SET ?',info,function(err,result){
          if(err){
            res.render('Register',{error: 'El correo ya esta registrado'});
          }else{
            db.connection.query('select MAX(id_usuario) as c from usuario',function(err2,result2){
              if(err2){
                res.end('501');
              }else{
                save(req,correo,result2[0].c,nombre,apellido);
                res.redirect('/inicio');
              }
            });
          }
        });
      }

    },
    //
    logout:function(req,res){
      var accion= 'Cerrar Sesión';
      ObtenerHora(accion);
      req.session.correo = null;
      req.session.id_user = null;
      req.session.nombre = null;
      req.session.apellido = null;
      req.session.cargo = null;
      req.session.password = null;
      req.session.proceso = null;
      res.redirect('/');
    },
//
 OnFoco:function(req,res){
   var accion= 'Encender Foco';
   ObtenerHora(accion);
   RelayFoco = new five.Led(9);
   RelayFoco.on();
   CambiarEstado(1,1);
 },
 OffFoco:function(req,res){
   var accion= 'Apagar Foco';
   ObtenerHora(accion);
   RelayFoco = new five.Led(9);
   RelayFoco.stop().off();
   CambiarEstado(1,0);
 },
 OnCorriente:function(req,res){
   var accion= 'Encender Corriente Eléctrica';
   ObtenerHora(accion);
   RelayCorriente = new five.Led(10);
   RelayCorriente.on();
   CambiarEstado(2,1);
 },
 OffCorriente:function(req,res){
   var accion= 'Apagar Corriente Eléctrica';
   ObtenerHora(accion);
   RelayCorriente = new five.Led(10);
   RelayCorriente.stop().off();
   CambiarEstado(2,0);
 },
 OnAlarma:function(req,res){
   var accion= 'Encender Alarma';
   ObtenerHora(accion);
   RelayAlarma= new five.Led(11);
   RelayAlarma.on();
   CambiarEstado(3,1);
 },
 OffAlarma:function(req,res){
   var accion= 'Apagar Alarma';
   ObtenerHora(accion);
   RelayAlarma = new five.Led(11);
   RelayAlarma.stop().off();
   CambiarEstado(3,0);
 },
 OnAgua:function(req,res){
   var accion= 'Encender Agua';
   ObtenerHora(accion);
   RelayAlarma= new five.Led(6);
   RelayAlarma.on();
   CambiarEstado(4,1);
 },
 OffAgua:function(req,res){
   var accion= 'Apagar Agua';
   ObtenerHora(accion);
   RelayAgua = new five.Led(6);
   RelayAgua.stop().off();
   CambiarEstado(4,0);
 },

 OnFoco1:function(req,res){
   RelayFoco = new five.Led(9);
   RelayFoco.on();
   CambiarEstado(1,1);
 },
 OffFoco1:function(req,res){
   RelayFoco = new five.Led(9);
   RelayFoco.stop().off();
   CambiarEstado(1,0);
 },
 OnCorriente1:function(req,res){
   RelayCorriente = new five.Led(10);
   RelayCorriente.on();
   CambiarEstado(2,1);
 },
 OffCorriente1:function(req,res){
   RelayCorriente = new five.Led(10);
   RelayCorriente.stop().off();
   CambiarEstado(2,0);
 },
 OnAlarma1:function(req,res){
   RelayAlarma= new five.Led(11);
   RelayAlarma.on();
   CambiarEstado(3,1);
 },
 OffAlarma1:function(req,res){
   RelayAlarma = new five.Led(11);
   RelayAlarma.stop().off();
   CambiarEstado(3,0);
 },
 OnAgua1:function(req,res){
   RelayAgua= new five.Led(5);
   RelayAgua.on();
   CambiarEstado(4,1);
 },
 OffAgua1:function(req,res){
   RelayAgua = new five.Led(5);
   RelayAgua.stop().off();
   CambiarEstado(4,0);
 }

}
