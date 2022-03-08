const jwt = require('jsonwebtoken');

const generarJwt = (uid) => {
  return new Promise((resolve, reject) => {
    const payload = {uid};

    jwt.sign(
      payload,
      process.env.SECRET_KEY,
      {
        expiresIn: '1d'
      },
      (err, token) =>{
        if(err){
          console.log(err);
          reject('No se ha podido generar el token');
        }else{
          resolve(token);
        }
      }
    );
  });
}

module.exports = {
  generarJwt
};