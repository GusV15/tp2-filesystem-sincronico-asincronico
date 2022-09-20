import fs from "fs";
import { getObjectInfo } from "../utils/info.js";

const readPackageJSONFilePromise = (file) => {
  return new Promise((resolve, reject) => {
    fs.readFile(file, "utf-8", (error, data) => {
      if (error) reject(`Error reading package.js file -> ${error.message}`);
      else resolve(data);
    });
  });
};

const writePackageJSONFilePromise = (file, text) => {
  return new Promise((resolve, reject) => {
    fs.writeFile(file, text, (error) => {
      if (error) reject(`Error reading package.js file -> ${error.message}`);
      else resolve(`The file was created and written successfully`);
    });
  });
};

const statPackageJSONFilePromise = (file) => {
  return new Promise((resolve, reject) => {
    fs.stat(file, "utf-8", (error, data) => {
      if (error) reject(`Error fs.stat -> ${error.message}`);
      else resolve(data.size);
    });
  });
};

/*---------- Promises with THEN/CATCH -----------*/

let dataString = "";
let dataObject = {};

// 1) Lea el archivo package.json y declare un objeto con el siguiente formato y datos:
// Se lee el archivo package.json
readPackageJSONFilePromise("package.json")
  .then((data) => {
    // Se formatea la data para setearla en el objeto info
    dataString = data.replace(/(\r\n|\n|\r)/gm, "");
    dataObject = JSON.parse(data);
    return statPackageJSONFilePromise("package.json");
  })
  .then((size) => {
    // 2) Muestre por consola el objeto info luego de leer el archivo.
    // Con getObjectInfo se obtiene el objeto info con los datos formateados
    const info = getObjectInfo(dataString, dataObject, size);
    console.log(info);
    /* Formateo necesario en el artributo contentsStr, ya que al ser string, al utilizar JSON.stringify se volvería a pasar a string.
     Esto se hace para preservar el formato de representación del objeto en el archivo.*/
    //const formatInfo = { ...info, contentsStr: JSON.parse(dataString) };
    const parseString = JSON.stringify(info, null, "\t");
    // 3) Guarde el objeto info en un archivo llamado info.txt dentro de la misma carpeta de package.json.
    // Crea archivo info.txt y escribe el objeto info obtenido anteriormente
    return writePackageJSONFilePromise("info.txt", parseString);
  })
  .then((data) => {
    console.log(data);
    // Se lee el archivo info.txt para validar
    return readPackageJSONFilePromise("info.txt");
  })
  .then((data) => {
    console.log(`The file was read successfully, contains the text -> ${data}`);
  })
  .catch((error) => {
    //4) Incluiya el manejo de errores.
    console.error(error);
  });
