<?php
require 'flight/Flight.php';  /* framework */

//*TODO: usando el framework de flight la función register hace la conexción a la base de datos 
//*? db = user base de datos, 'PDO' = tipo de conexción de php y dentro de un array enviamos los parametros de la base de datos tales como direccion ip nombre de la base de datos y el usuario con la contraseña.
Flight::register('db', 'PDO', array('mysql:host=localhost;dbname=my_user_db', 'root', ''));
//**LEER LOS DATOS Y LOS MUESTRA A CUALQUIER INTERFAZ */
//*?Flight router ----> Bajo escena este metodo simplifica las propiedades que se colocan generalmente a la hora de realizar peticiones a las bases de datos ahorra mucho codigo php pero por debajo realiza todas esas peticiones con sus metodos y susparametros */
Flight::route('GET /users', function () {
    $sentencia = Flight::db()->prepare("SELECT * FROM `users`");
    $sentencia->execute(); //*?  */
    $datos = $sentencia->fetchAll(); //*? devuelve todos los datos con la instrucción fetchALL*/
    Flight::json($datos); //*? pasamos datos a un formato JSON el cual facilita la lectura de los mismos//
});
//*Recepciona los datos por método POST y hace una incerpción a la base de datos*/
//TODO:  'NAMES': 'Ivan'
//TODO:  'LASTNAMES': 'Ortega'
//TODO:  'DOCUMENT_ID': '1118307852'
//TODO:  'EMAIL': 'ivanortega@hotmail.com'
Flight::route('POST /users', function () {
    $name = (Flight::request()->data->NAMES);
    $lastName = (Flight::request()->data->LASTNAMES);
    $document_id = (Flight::request()->data->DOCUMENT_ID);
    $email = (Flight::request()->data->EMAIL);
    $sql = "INSERT INTO users (NAMES, LASTNAMES, DOCUMENT_ID, EMAIL) VALUES(?,?,?,?)";
    $sentencia = Flight::db()->prepare($sql);
    //*TODO: PASO LOS PARAMETROS */
    $sentencia->bindParam(1, $name);
    $sentencia->bindParam(2, $lastName);
    $sentencia->bindParam(3, $document_id);
    $sentencia->bindParam(4, $email);
    $sentencia->execute();
    Flight::json(["Usuario Agregado..."]);
});

//*Borrar Registro
Flight::route('DELETE /users', function () {
    $id = (Flight::request()->data->ID);
    $sql = "DELETE FROM users WHERE id=?";
    $sentencia = Flight::db()->prepare($sql);
    $sentencia->bindParam(1, $id);
    $sentencia->execute();
    Flight::json(["Alumno Eliminado..."]);
});

//*Actualiza Registros
Flight::route('PUT /users', function () {
    $id = (Flight::request()->data->ID);
    $name = (Flight::request()->data->NAMES);
    $lastName = (Flight::request()->data->LASTNAMES);
    $document_id = (Flight::request()->data->DOCUMENT_ID);
    $email = (Flight::request()->data->EMAIL);
    $sql = "UPDATE users SET NAMES=?,LASTNAMES=?,DOCUMENT_ID=?,EMAIL=? WHERE ID=?";
    $sentencia = Flight::db()->prepare($sql);
    $sentencia->bindParam(1, $id);
    $sentencia->bindParam(2, $name);
    $sentencia->bindParam(3, $lastName);
    $sentencia->bindParam(4, $document_id);
    $sentencia->bindParam(5, $email);
    $sentencia->execute();
    Flight::json(["Alumno Actualizado..."]);
});

//* lectura de un registro determinado
Flight::route('GET /users/@ID', function ($id) {
    $sentencia = Flight::db()->prepare("SELECT * FROM `users` WHERE ID=?");
    $sentencia->bindParam(1, $id);
    $sentencia->execute();
    $datos = $sentencia->fetchAll();
    Flight::json($datos);
});

Flight::start();
