const express = require('express');
const router =  express.Router();
const fetch = require('node-fetch');
const jwt = require('jsonwebtoken');
const fetchQuery = require('../request-manager');
const fs = require('fs');
const path = require('path')

//ESTAS CAMBIAN SI ESTAN EN LA Nube
const URL_ASEGURADORA="http://34.70.210.93";
const URL_OFICINA="http://35.232.205.249";
const KEY=fs.readFileSync(path.join(__dirname, '../keys/public.key'), 'utf-8');
const pKey = fs.readFileSync(path.join(__dirname, '../keys/private.key'), 'utf-8');

//Funcion que maneja las peticiones y respuestas
router.get('/', (req, res) => {
    res.render('index.hbs');
});
//otra forma de la funcion
router.get('/about', function(req, res){
    res.render('about');
});

//************       Metodos de Servicio ASEGURADORA  *************************/

//Parametros [jwt:,id?,placa?,estado?]
router.get('/vehiculo', async(req, res) => {
    
    //Paso 1: Verificar el Toquen
    if(!req.query.jwt){
        res.send('El JWT no es válido o no contiene el scope de este servicio').status(403);
    }
    //Validacion del Toquen
    const validaToken=true;
    const token=req.query.jwt;
    jwt.verify(token, KEY, (err, data) => {
        if(err){
            console.log('El JWT no es válido');
            alidaToken=false;
            res.send('El JWT no es válido').status(403);
            
        }     
    });
    //Paso 2: Si Pasa La verificacion Envia el Contenido al Servicio
    //http://localhost:3003/vehiculo?jwt=hola&id=1&placa=10&estado=false
    //http://localhost:3003/vehiculo?jwt=hola
    if(validaToken){
        console.log('JALO')
        const URL=URL_ASEGURADORA+req.url; //Realiza Peticion
        const datos=await fetch(URL, {
            method: "get",
            headers: { "Content-Type": "application/json" },
            timeout: 3003,
        })
        .then((res) => res.json())
        .catch(function (err) {
        }); 
        console.log(datos);
        //res.send('OK GET Vehiculos');
        res.send(datos).status(200);
    }
    
});//Sirve arreglo de vehiculos

//Parametros [jwt:,id:,externa?]
router.get('/foto', async(req, res) => {

    //Paso 1: Verificar el Toquen
    if(!req.query.jwt){
        res.send('El JWT no es válido o no contiene el scope de este servicio').status(403);
    }
    //Validacion del Toquen
    const validaToken=true;
    const token=req.query.jwt;
    jwt.verify(token, KEY, (err, data) => {
        if(err){
            console.log('El JWT no es válido');
            alidaToken=false;
            res.send('El JWT no es válido').status(403);
            
        }     
    });

    //Paso 2: Si Pasa La verificacion Envia el Contenido al Servicio
    //http://localhost:3003/foto?jwt=hola&id=5ea78fb956b02d883a24782a
    if(validaToken){
        const URL=URL_ASEGURADORA+req.url; //Realiza Peticion
        //console.log(URL);
        const datos=await fetch(URL, {
            method: "get",
            headers: { "Content-Type": "application/json" },
            timeout: 3003,
        })
        .then((res) => res.json())
        .catch(function (err) {
        }); 
        console.log(datos);
        //res.send('OK GET FOTOS');
        res.send(datos).status(200);
    }

});//Sirve Fotos

//Parametros [jwt:,id?]
router.get('/estado', async(req, res) => {
    
    if(!req.query.jwt){
        res.send('El JWT no es válido o no contiene el scope de este servicio').status(403);
    }
    //Validacion del Toquen
    const validaToken=true;
    const token=req.query.jwt;
    jwt.verify(token, KEY, (err, data) => {
        if(err){
            console.log('El JWT no es válido');
            alidaToken=false;
            res.send('El JWT no es válido').status(403);
            
        }     
    });
    //Paso 2: Si Pasa La verificacion Envia el Contenido al Servicio
    //http://localhost:3003/estado?jwt=hola
    //http://localhost:3003/estado?jwt=hola&id=1

    if(validaToken){
        const URL=URL_ASEGURADORA+req.url; //Realiza Peticion
        //console.log(URL);
        const datos=await fetch(URL, {
            method: "get",
            headers: { "Content-Type": "application/json" },
            timeout: 3003,
        })
        .then((res) => res.json())
        .catch(function (err) {
        }); 
        console.log(datos);
        //res.send('OK GET Estado');
        res.send(datos).status(200);
    }
    
});//Sirve Estados

router.put('/vehiculo', async(req, res) => {

    if(!req.body.jwt){
        res.send('El JWT no es válido o no contiene el scope de este servicio').status(403);
    }
    //Validacion del Toquen
    const validaToken=true;
    const token2=req.body.jwt;
    jwt.verify(token2, KEY, (err, data) => {
        if(err){
            alidaToken=false;
            res.send('El JWT no es válido').status(403);
            
        }     
    });
    //Paso 2: Si Pasa La verificacion Envia el Contenido al Servicio
    if(validaToken){

        var datos = await fetchQuery(URL_ASEGURADORA+"/vehiculo",'PUT', req.body).then()
        .catch(function(err){
            console.log(err.status, err.statusText)
        });
        console.log(datos);
        //res.send('OK PUT Vehiculo');
        res.send(datos).status(200);
        
    }
    

});//Sirve arreglo de vehiculos

//--------Rutas Mayuscula

//Parametros [jwt:,id?,placa?,estado?]
router.get('/Vehiculo', async(req, res) => {
    
    //Paso 1: Verificar el Toquen
    if(!req.query.jwt){
        res.send('El JWT no es válido o no contiene el scope de este servicio').status(403);
    }
    //Validacion del Toquen
    const validaToken=true;
    const token=req.query.jwt;
    jwt.verify(token, KEY, (err, data) => {
        if(err){
            console.log('El JWT no es válido');
            alidaToken=false;
            res.send('El JWT no es válido').status(403);
            
        }     
    });
    //Paso 2: Si Pasa La verificacion Envia el Contenido al Servicio
    //http://localhost:3003/vehiculo?jwt=hola&id=1&placa=10&estado=false
    //http://localhost:3003/vehiculo?jwt=hola
    if(validaToken){
        const URL=URL_ASEGURADORA+req.url; //Realiza Peticion
        const datos=await fetch(URL, {
            method: "get",
            headers: { "Content-Type": "application/json" },
            timeout: 3003,
        })
        .then((res) => res.json())
        .catch(function (err) {
        }); 
        console.log(datos);
        //res.send('OK GET Vehiculos');
        res.send(datos).status(200);
    }
    
});//Sirve arreglo de vehiculos

//Parametros [jwt:,id:,externa?]
router.get('/Foto', async(req, res) => {

    //Paso 1: Verificar el Toquen
    if(!req.query.jwt){
        res.send('El JWT no es válido o no contiene el scope de este servicio').status(403);
    }
    //Validacion del Toquen
    const validaToken=true;
    const token=req.query.jwt;
    jwt.verify(token, KEY, (err, data) => {
        if(err){
            console.log('El JWT no es válido');
            alidaToken=false;
            res.send('El JWT no es válido').status(403);
            
        }     
    });

    //Paso 2: Si Pasa La verificacion Envia el Contenido al Servicio
    //http://localhost:3003/foto?jwt=hola&id=5ea78fb956b02d883a24782a
    if(validaToken){
        const URL=URL_ASEGURADORA+req.url; //Realiza Peticion
        //console.log(URL);
        const datos=await fetch(URL, {
            method: "get",
            headers: { "Content-Type": "application/json" },
            timeout: 3003,
        })
        .then((res) => res.json())
        .catch(function (err) {
        }); 
        console.log(datos);
        //res.send('OK GET FOTOS');
        res.send(datos).status(200);
    }

});//Sirve Fotos

//Parametros [jwt:,id?]
router.get('/Estado', async(req, res) => {
    
    if(!req.query.jwt){
        res.send('El JWT no es válido o no contiene el scope de este servicio').status(403);
    }
    //Validacion del Toquen
    const validaToken=true;
    const token=req.query.jwt;
    jwt.verify(token, KEY, (err, data) => {
        if(err){
            console.log('El JWT no es válido');
            alidaToken=false;
            res.send('El JWT no es válido').status(403);
            
        }     
    });
    //Paso 2: Si Pasa La verificacion Envia el Contenido al Servicio
    //http://localhost:3003/estado?jwt=hola
    //http://localhost:3003/estado?jwt=hola&id=1

    if(validaToken){
        const URL=URL_ASEGURADORA+req.url; //Realiza Peticion
        //console.log(URL);
        const datos=await fetch(URL, {
            method: "get",
            headers: { "Content-Type": "application/json" },
            timeout: 3003,
        })
        .then((res) => res.json())
        .catch(function (err) {
        }); 
        console.log(datos);
        //res.send('OK GET Estado');
        res.send(datos).status(200);
    }
    
});//Sirve Estados

router.put('/Vehiculo', async(req, res) => {

    if(!req.body.jwt){
        res.send('El JWT no es válido o no contiene el scope de este servicio').status(403);
    }
    //Validacion del Toquen
    const validaToken=true;
    const token2=req.body.jwt;
    jwt.verify(token2, KEY, (err, data) => {
        if(err){
            alidaToken=false;
            res.send('El JWT no es válido').status(403);
            
        }     
    });
    //Paso 2: Si Pasa La verificacion Envia el Contenido al Servicio
    if(validaToken){

        var datos = await fetchQuery(URL_ASEGURADORA+"/vehiculo",'PUT', req.body).then()
        .catch(function(err){
            console.log(err.status, err.statusText)
        });
        console.log(datos);
        //res.send('OK PUT Vehiculo');
        res.send(datos).status(200);
        
    }
    

});//Sirve arreglo de vehiculos

//************       Metodos de Servicio OFICINA *************************/
//
//Token Ejemplo: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjbGllbnRfaWQiOiJmaXNoIiwic2NvcGUiOlsidmVoaWN1bG8uZ2V0IiwiZm90by5nZXQiLCJsaXN0YWRvLmdldCIsImFmaWxpYWRvLnB1dCIsInBhZ28ucHV0IiwiYWZpbGlhZG8uZ2V0IiwidmVoaWN1bG8ucHV0IiwiZXN0YWRvLmdldCJdLCJpYXQiOjE1ODgxNDQyMDcsImV4cCI6MTU4ODIzMDYwN30.8pxMyOkLeRQoEKcFDTOqb_qZE36mcwoyLahz0Kh33Ho

//Parametros [jwt:, codigo:, password:]
router.get('/afiliado', async(req, res) => {

    //Paso 1: Verificar el Toquen
    if(!req.query.jwt){
        res.send('El JWT no es válido o no contiene el scope de este servicio').status(403);
    }
    //Validacion del Toquen
    const validaToken=true;
    const token=req.query.jwt;
    jwt.verify(token, KEY, (err, data) => {
        if(err){
            console.log('El JWT no es válido');
            alidaToken=false;
            res.send('El JWT no es válido').status(403);
            
        }     
    });
    //Paso 2: Si Pasa La verificacion Envia el Contenido al Servicio
    //http://localhost:3003/afiliado?jwt=hola&codigo=5ea3beb6504f12dcbcb9eb97&password=123456

    if(validaToken){
        const URL=URL_OFICINA+req.url; //Realiza Peticion
        const datos=await fetch(URL, {
            method: "get",
            headers: { "Content-Type": "application/json" },
            timeout: 3003,
        })
        .then((res) => res.json())
        .catch(function (err) {
        }); 
        console.log(datos);
        //res.send('OK GET Afiliado');
        res.send(datos).status(200);
    }   

});
//Parametros [codigo:]
router.get('/pago', async(req, res) => {

    if(!req.query.jwt){
        res.send('El JWT no es válido o no contiene el scope de este servicio').status(403);
    }  
    //Validacion del Toquen
    const validaToken=true;
    const token=req.query.jwt;
    jwt.verify(token, KEY, (err, data) => {
        if(err){
            console.log('El JWT no es válido');
            alidaToken=false;
            res.send('El JWT no es válido').status(403);
            
        }     
    });
    //Paso 2: Si Pasa La verificacion Envia el Contenido al Servicio
    //http://localhost:3003/pago?jwt=hola&codigo=5ea3bd21383b185adb62547c
    if(validaToken){
        //const URL=URL_OFICINA+req.url; //Realiza Peticion
        const URL=URL_OFICINA+req.url; //Realiza Peticion
        const datos=await fetch(URL, {
            method: "get",
            headers: { "Content-Type": "application/json" },
            timeout: 3003,
        })
        .then((res) => res.json())
        .catch(function (err) {
        }); 
        console.log(datos);
        //res.send('OK GET Afiliado');
        res.send(datos).status(200);
    }
   
});
//Parametros [codigo: monto:] body: JSON.stringify(body) 
router.post('/pago', async(req, res) => {

    if(!req.body.jwt){
        res.send('El JWT no es válido o no contiene el scope de este servicio').status(403);
    }
    //Validacion del Toquen
    const validaToken=true;
    const token2=req.body.jwt;
    jwt.verify(token2, KEY, (err, data) => {
        if(err){
            alidaToken=false;
            res.send('El JWT no es válido').status(403);
            
        }     
    });
    //Paso 2: Si Pasa La verificacion Envia el Contenido al Servicio
    if(validaToken){
        var datos = await fetchQuery(URL_OFICINA+"/pago",'POST', req.body).then()
        .catch(function(err){
            console.log(err.status, err.statusText)
        });
        console.log(datos);
        //res.send('OK POST Pago');
        res.send(datos).status(200);
        
    }
    
});

router.post('/afiliado', async(req, res) => {

    if(!req.body.jwt){
        res.send('El JWT no es válido o no contiene el scope de este servicio').status(403);
    }
    //Validacion del Toquen
    const validaToken=true;
    const token2=req.body.jwt;
    jwt.verify(token2, KEY, (err, data) => {
        if(err){
            alidaToken=false;
            res.send('El JWT no es válido').status(403);
            
        }     
    });
    //Paso 2: Si Pasa La verificacion Envia el Contenido al Servicio
    if(validaToken){
        var datos = await fetchQuery(URL_OFICINA+"/afiliado",'POST', req.body).then()
        .catch(function(err){
            console.log(err.status, err.statusText)
        });
        console.log(datos);
        //res.send('OK POST Afiliado');
        res.send(datos).status(200);
    }
});

router.put('/afiliado', async(req, res) => {

    if(!req.body.jwt){
        res.send('El JWT no es válido o no contiene el scope de este servicio').status(403);
    }
    //Validacion del Toquen
    const validaToken=true;
    const token2=req.body.jwt;
    jwt.verify(token2, KEY, (err, data) => {
        if(err){
            alidaToken=false;
            res.send('El JWT no es válido').status(403);
            
        }     
    });
    //Paso 2: Si Pasa La verificacion Envia el Contenido al Servicio
    if(validaToken){
        var datos = await fetchQuery(URL_OFICINA+"/afiliado",'PUT', req.body).then()
        .catch(function(err){
            console.log(err.status, err.statusText)
        });
        console.log(datos);
        //res.send('OK PUT Afiliado');
        res.send(datos).status(200);
    }
});

//--------Rutas Mayuscula

//Parametros [jwt:, codigo:, password:]
router.get('/Afiliado', async(req, res) => {

    //Paso 1: Verificar el Toquen
    if(!req.query.jwt){
        res.send('El JWT no es válido o no contiene el scope de este servicio').status(403);
    }
    //Validacion del Toquen
    const validaToken=true;
    const token=req.query.jwt;
    jwt.verify(token, KEY, (err, data) => {
        if(err){
            console.log('El JWT no es válido');
            alidaToken=false;
            res.send('El JWT no es válido').status(403);
            
        }     
    });
    //Paso 2: Si Pasa La verificacion Envia el Contenido al Servicio
    //http://localhost:3003/afiliado?jwt=hola&codigo=5ea3beb6504f12dcbcb9eb97&password=123456

    if(validaToken){
        const URL=URL_OFICINA+req.url; //Realiza Peticion
        const datos=await fetch(URL, {
            method: "get",
            headers: { "Content-Type": "application/json" },
            timeout: 3003,
        })
        .then((res) => res.json())
        .catch(function (err) {
        }); 
        console.log(datos);
        //res.send('OK GET Afiliado');
        res.send(datos).status(200);
    }   

});
//Parametros [codigo:]
router.get('/Pago', async(req, res) => {

    if(!req.query.jwt){
        res.send('El JWT no es válido o no contiene el scope de este servicio').status(403);
    }  
    //Validacion del Toquen
    const validaToken=true;
    const token=req.query.jwt;
    jwt.verify(token, KEY, (err, data) => {
        if(err){
            console.log('El JWT no es válido');
            alidaToken=false;
            res.send('El JWT no es válido').status(403);
            
        }     
    });
    //Paso 2: Si Pasa La verificacion Envia el Contenido al Servicio
    //http://localhost:3003/pago?jwt=hola&codigo=5ea3bd21383b185adb62547c
    if(validaToken){
        //const URL=URL_OFICINA+req.url; //Realiza Peticion
        const URL=URL_OFICINA+req.url; //Realiza Peticion
        const datos=await fetch(URL, {
            method: "get",
            headers: { "Content-Type": "application/json" },
            timeout: 3003,
        })
        .then((res) => res.json())
        .catch(function (err) {
        }); 
        console.log(datos);
        //res.send('OK GET Afiliado');
        res.send(datos).status(200);
    }
   
});
//Parametros [codigo: monto:] body: JSON.stringify(body) 
router.post('/Pago', async(req, res) => {

    if(!req.body.jwt){
        res.send('El JWT no es válido o no contiene el scope de este servicio').status(403);
    }
    //Validacion del Toquen
    const validaToken=true;
    const token2=req.body.jwt;
    jwt.verify(token2, KEY, (err, data) => {
        if(err){
            alidaToken=false;
            res.send('El JWT no es válido').status(403);
            
        }     
    });
    //Paso 2: Si Pasa La verificacion Envia el Contenido al Servicio
    if(validaToken){
        var datos = await fetchQuery(URL_OFICINA+"/pago",'POST', req.body).then()
        .catch(function(err){
            console.log(err.status, err.statusText)
        });
        console.log(datos);
        //res.send('OK POST Pago');
        res.send(datos).status(200);
        
    }
    
});

router.post('/Afiliado', async(req, res) => {

    if(!req.body.jwt){
        res.send('El JWT no es válido o no contiene el scope de este servicio').status(403);
    }
    //Validacion del Toquen
    const validaToken=true;
    const token2=req.body.jwt;
    jwt.verify(token2, KEY, (err, data) => {
        if(err){
            alidaToken=false;
            res.send('El JWT no es válido').status(403);
            
        }     
    });
    //Paso 2: Si Pasa La verificacion Envia el Contenido al Servicio
    if(validaToken){
        var datos = await fetchQuery(URL_OFICINA+"/afiliado",'POST', req.body).then()
        .catch(function(err){
            console.log(err.status, err.statusText)
        });
        console.log(datos);
        //res.send('OK POST Afiliado');
        res.send(datos).status(200);
    }
});

router.put('/Afiliado', async(req, res) => {

    if(!req.body.jwt){
        res.send('El JWT no es válido o no contiene el scope de este servicio').status(403);
    }
    //Validacion del Toquen
    const validaToken=true;
    const token2=req.body.jwt;
    jwt.verify(token2, KEY, (err, data) => {
        if(err){
            alidaToken=false;
            res.send('El JWT no es válido').status(403);
        }     
    });
    //Paso 2: Si Pasa La verificacion Envia el Contenido al Servicio
    if(validaToken){
        var datos = await fetchQuery(URL_OFICINA+"/afiliado",'PUT', req.body).then()
        .catch(function(err){
            console.log(err.status, err.statusText)
        });
        console.log(datos);
        //res.send('OK PUT Afiliado');
        res.send(datos).status(200);
    }
});

//************    SERVIDOR DE TOKENS    *************************/

router.post('/oauth/token', async(req, res) => {

    const client_id=req.body.client_id;
    const client_secret=req.body.client_secret;
    const grant_type=req.body.grant_type;
    const audience=req.body.audience;

    if(client_id!='fish'){
        res.send('Si el id no existe').status(404);
    }else{
        if(client_secret!='201314646'){
            res.send('Autenticacion No Exitosa').status(401);
        }else{
            var payload = {
                client_id: 'fish', 
                scope: [
                    "afiliado.get",
                    "afiliado.post",
                    "afiliado.put",
                    "pago.get",
                    "pago.post",
                    "vehiculo.get",
                    "foto.get",
                    "estado.get",
                    "vehiculo.put"        
                  ],
            };
            const token= jwt.sign(payload,pKey,{
                expiresIn: 60 * 60 * 24, // expires in 24 hours
                algorithm: "RS256" 
             });
        
            res.json({
                token
            }).status(200);
        }
    }

});

router.get('/fish', async (req,res) => {
    const URL_YO = "http://localhost:3003"
    const credenciales2 = {
        client_id: 'fish', 
        client_secret: '201314646',
        grant_type: 'client_credentials',
        audience: 12
    }
    var token = await fetchQuery(URL_YO+'/oauth/token/','POST', credenciales2).then()
    .catch(function(err){
        console.log(err.status, err.statusText)
    });
    console.log(token)
});//Jala El Tocken

module.exports = router;