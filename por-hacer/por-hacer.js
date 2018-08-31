const fs = require('fs');

let listadoPorHacer = [];

const guardarDB = () => {
    let data = JSON.stringify(listadoPorHacer);

    fs.writeFile('./db/data.json', data, (err) => {
        if (err) throw new Error('No se pudo guardar en archivo', err);
        console.log('Tarea guardada!');
    });
}

const cargarDB = () => {
    try {
        listadoPorHacer = require('../db/data.json');
    } catch (error) {
        listadoPorHacer = [];
    }
}

const crear = (descripcion) => {
    cargarDB();
    let tarea = {
        descripcion,
        completado: false
    }
    listadoPorHacer.push(tarea);
    guardarDB();
    return tarea;
}

const getListado = () => {
    cargarDB();
    return listadoPorHacer;
}

const actualizar = (descripcion, completado = true) => {
    cargarDB();
    let index = listadoPorHacer.findIndex(tarea => {
        return tarea.descripcion === descripcion;
    });
    console.log(`index: ${index}`);
    if (index >= 0) {
        listadoPorHacer[index].completado = completado;
        guardarDB();
        return true;
    } else {
        return false;
    }
}

const borrar = (descripcion) => {
    cargarDB();
    let filtrados = []
    filtrados = listadoPorHacer.filter(tarea => {
        return tarea.descripcion != descripcion;
    });

    if (filtrados.length === listadoPorHacer.length) {
        return false;
    } else {
        listadoPorHacer = filtrados;
        guardarDB();
        return true;
    }
}

module.exports = {
    crear,
    getListado,
    actualizar,
    borrar
}