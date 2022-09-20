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

/*---------- Promises with ASYNC/AWAIT-----------*/

const executeFsWithPromise = async () => {
  try {
    // 1) Lea el archivo package.json y declare un objeto con el siguiente formato y datos:
    // Se lee el archivo package.json
    const readedResult = await readPackageJSONFilePromise("package.json");
    // Se formatea la data para setearla en el objeto info
    const dataString = readedResult.replace(/(\r\n|\n|\r)/gm, "");
    const dataObject = JSON.parse(readedResult);
    const statResult = await statPackageJSONFilePromise("package.json");

    // 2) Muestre por consola el objeto info luego de leer el archivo.
    // Con getObjectInfo se obtiene el objeto info con los datos formateados
    const info = getObjectInfo(dataString, dataObject, statResult);
    console.log(info);
    // Parsea el objeto a string para insertarlo en el archivo info.txt
    const parseString = JSON.stringify(info, null, "\t");

    // 3) Guarde el objeto info en un archivo llamado info.txt dentro de la misma carpeta de package.json.
    // Crea archivo info.txt y escribe el objeto info obtenido anteriormente
    const writedResult = await writePackageJSONFilePromise(
      "info.txt",
      parseString
    );
    console.log(writedResult);
    // Se lee el archivo info.txt para validar
    const validResult = await readPackageJSONFilePromise("info.txt");
    console.log(
      `The file was read successfully, contains the text -> ${validResult}`
    );
  } catch (error) {
    //4) Incluiya el manejo de errores.
    console.error(error.message);
  }
};

executeFsWithPromise();
