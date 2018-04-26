var save = function(req,correo,id,nombre,apellido,cargo){
  req.session.correo = correo;
  req.session.id_user = id;
  req.session.nombre = nombre;
  req.session.apellido = apellido;
  req.session.cargo = cargo;
}

module.exports = {
  _config: {
  		actions:false,
  		shortcuts:false,
  		rest:false
  	},
    LeerHistorial(req,res){
      console.log('1');
      db.connection.query('select * from historial where id_usuario='+req.session.id_user,function(err,result){
					if(err){
            console.log(err);
						res.json(0);
					}else{
            console.log('2');
						if(result.length > 0){
              console.log('3');
						res.json('historial',{datos: result});
					  }
				  }
			})
    }
  }
