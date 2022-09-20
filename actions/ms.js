import fs from "fs";
import { getObjectInfo } from "../utils/info.js";

const readWritePackageJSONFile = () => {
  try {
    // 1) Lea el archivo package.json y declare un objeto con el siguiente formato y datos:
    // Se lee el archivo package.json
    let data = fs.readFileSync("package.json", "utf-8");
    // Se formatea la data para setearla en el objeto info
    const dataString = data.replace(/(\r\n|\n|\r)/gm, "");
    const dataObject = JSON.parse(data);
    const { size } = fs.statSync("package.json");

    // 2) Muestre por consola el objeto info luego de leer el archivo.
    // Con getObjectInfo se obtiene el objeto info con los datos formateados
    let info = getObjectInfo(dataString, dataObject, size);
    console.log(info);

    // 3) Guarde el objeto info en un archivo llamado info.txt dentro de la misma carpeta de package.json.
    // Crea archivo info.txt y escribe el objeto info obtenido anteriormente
    fs.writeFileSync("info.txt", JSON.stringify(info, null, "\t"));
    // Se lee el archivo info.txt para validar
    let dataInfo = fs.readFileSync("info.txt", "utf-8");
    console.log(
      `The file was read successfully, contains the text -> ${dataInfo}`
    );
  } catch (error) {
    // 4) Incluiya el manejo de errores.
    // Atrapa error en caso que exista, y lo muestra en consola.
    console.log(`Synchronous file read error: ${error.message}`);
  }
};

// Ejecuta la función readPackageJSONFile
readWritePackageJSONFile();
