create schema resSalaLab;

create table resSalaLab.Predio(
    idPredio tinyint not null,
    nome varchar(40) not null,
    primary key(idPredio)
);

create table resSalaLab.Ambiente(
    idAmbiente int identity not null,
    idPredio tinyint not null,
    nome varchar(40) not null,
    capacidade smallint not null,
    andar tinyint not null,
    idTipo tinyint not null,
    primary key(idAmbiente)
);

create table resSalaLab.Tipo(
    idTipo tinyint not null,
    nome varchar(40) not null,
    primary key(idTipo)
);

create table resSalaLab.Usuario(
    CPF varchar(11) not null,
    prenome varchar(30) not null,
    sobrenome  varchar(50) not null,
    nascimento date not null,
    celular varchar(15) not null,
    email varchar(50) not null,
    primary key(CPF)
);

create table resSalaLab.Login(
    username varchar(30) not null,
    senha varchar(30) not null,
    CPF varchar(11) not null,
    dataCadastro date not null default getdate(),
    primary key(username)
);

create table resSalaLab.Status(
    idStatus tinyint not null,
    nome varchar(20) not null,
    primary key(idStatus)
);

create table resSalaLab.Reserva(
    idReserva int identity not null,
    username varchar(30) not null,
    idAmbiente int not null,
    idStatus tinyint not null,
    dataInicial date not null,
    dataFinal date not null,
    horarioInicial time not null,
    horarioFinal  time not null,
    primary key(idReserva)
);

create table resSalaLab.Acesso(
    idAcesso int identity not null,
    username varchar(30) not null,
    dataAcesso date not null,
    horarioAcesso time not null,
    primary key(idAcesso)
);

alter table resSalaLab.Ambiente
    add foreign key (idPredio)
    references resSalaLab.Predio (idPredio);

alter table resSalaLab.Ambiente
    add foreign key (idTipo)
    references resSalaLab.Tipo (idTipo);

alter table resSalaLab.Login
    add foreign key (CPF)
    references resSalaLab.Usuario (CPF);

alter table resSalaLab.Reserva
    add foreign key (username)
    references resSalaLab.Login (username);

alter table resSalaLab.Reserva
    add foreign key (idAmbiente)
    references resSalaLab.Ambiente (idAmbiente);

alter table resSalaLab.Reserva
    add foreign key (idStatus)
    references resSalaLab.Status (idStatus);

alter table resSalaLab.Acesso
    add foreign key (username)
    references resSalaLab.Login (username);

INSERT INTO resSalaLab.Tipo
    (idTipo, nome)
VALUES
    (1, 'Sala'),
    (2, 'Laboratório');

INSERT INTO resSalaLab.Status
    (idStatus, nome)
VALUES
    (1, 'Livre'),
    (2, 'Ocupado'),
    (3, 'Bloqueado'),
    (4, 'Reservado');