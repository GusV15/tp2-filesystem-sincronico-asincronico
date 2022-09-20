import fs from "fs";
import { getObjectInfo } from "../utils/info.js";

const readWritePackageJSONFile = () => {
  // 1) Lea el archivo package.json y declare un objeto con el siguiente formato y datos:
  // Se lee el archivo package.json
  fs.readFile("package.json", "utf-8", (error, data) => {
    // Manejo de error en readFile
    if (error) throw Error(`Error reading package.js file -> ${error.message}`);
    // Se formatea la data para setearla en el objeto info
    const dataString = data.replace(/(\r\n|\n|\r)/gm, "");
    const dataObject = JSON.parse(data);
    fs.stat("package.json", (error, stats) => {
      // Manejo de error en stat
      if (error) throw Error(`Error fs.stat -> ${error.message}`);
      const size = stats.size;
      // 2) Muestre por consola el objeto info luego de leer el archivo.
      // Con getObjectInfo se obtiene el objeto info con los datos formateados
      let info = getObjectInfo(dataString, dataObject, size);
      console.log(info);

      // 3) Guarde el objeto info en un archivo llamado info.txt dentro de la misma carpeta de package.json.
      // Crea archivo info.txt y escribe el objeto info obtenido anteriormente
      fs.writeFile("info.txt", JSON.stringify(info, null, "\t"), (error) => {
        // Manejo de error en writeFile
        if (error)
          throw Error(
            `Error creating or writing info.txt file -> ${error.message}`
          );
        // Se lee el archivo info.txt para validar
        fs.readFile("info.txt", "utf-8", (error, data) => {
          // Manejo de error en readFile
          if (error)
            throw Error(`Error reading info.txt file -> ${error.message}`);
          console.log(
            `The file was read successfully, contains the text -> ${data}`
          );
        });
      });
    });
  });
};

// Ejecuta la función readPackageJSONFile
readWritePackageJSONFile();
