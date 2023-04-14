<?php

require 'flight/Flight.php';  /* framework */

// Register class with constructor parameters
Flight::register('db', 'PDO', array('mysql:host=localhost;dbname=api', 'root', ''));

/**LEER LOS DATOS Y LOS MUESTRA A CUALQUIER INTERFAZ */
Flight::route('GET /usuarios', function () {
    $sentencia = Flight::db()->prepare("SELECT * FROM `usuarios`");
    $sentencia->execute();
    $datos = $sentencia->fetchAll();
    Flight::json($datos);
});

/** Recepciona los datos por método POST */
Flight::route('POST /usuarios', function () {

    $nombres = (Flight::request()->data->nombres);
    $apellido = (Flight::request()->data->apellido);
    $correo = (Flight::request()->data->correo);
    $edad = (Flight::request()->data->edad);

    $sql = "INSERT INTO usuarios (nombres,apellido,correo,edad) VALUES(?,?,?,?)";
    $sentencia = Flight::db()->prepare($sql);
    $sentencia->bindParam(1, $nombres);
    $sentencia->bindParam(2, $apellido);
    $sentencia->bindParam(3, $correo);
    $sentencia->bindParam(4, $edad);

    $sentencia->execute();

    Flight::json(["Alumno agregado..."]);
});

//Borrar Registro
Flight::route('DELETE /usuarios', function () {
    $id = (Flight::request()->data->id);

    $sql = "DELETE FROM usuarios WHERE id=?";
    $sentencia = Flight::db()->prepare($sql);
    $sentencia->bindParam(1, $id);
    $sentencia->execute();

    Flight::json(["Alumno Eliminado..."]);
});

//Actualiza Registros
Flight::route('PUT /usuarios', function () {

    $nombres = (Flight::request()->data->nombres);
    $apellido = (Flight::request()->data->apellido);
    $correo = (Flight::request()->data->correo);
    $edad = (Flight::request()->data->edad);
    $id = (Flight::request()->data->id);

    $sql = "UPDATE usuarios SET nombres=?,apellido=?,correo=?,edad=? WHERE id=?";

    $sentencia = Flight::db()->prepare($sql);

    $sentencia->bindParam(1, $nombres);
    $sentencia->bindParam(2, $apellido);
    $sentencia->bindParam(3, $correo);
    $sentencia->bindParam(4, $edad);
    $sentencia->bindParam(5, $id);

    $sentencia->execute();

    Flight::json(["Alumno Actualizado..."]);
});

Flight::start();
