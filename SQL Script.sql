show databases;

CREATE DATABASE proyecto;

use proyecto;

create table usuario (
user_name varchar (255),
pass varchar (255) not null,
nombre varchar (255) not null,
correo varchar (255) not null,
genero char (1) not null,
edad int (3) not null,
primary key (user_name)
);

select * from usuario_rol;

create table rol ( id int (10),
nombre_r varchar(20) not null,
descr varchar(100) not null, 
primary key (id));

create table usuario_rol (usuario varchar (20),
rol int (10), primary key (usuario , rol ),
CONSTRAINT idusurio_fk FOREIGN KEY (usuario) REFERENCES usuario(user_name),
CONSTRAINT idrol_fk FOREIGN KEY (rol) REFERENCES rol(id));