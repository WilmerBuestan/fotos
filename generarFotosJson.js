const fs = require('fs');
const path = require('path');

const carpetaFotos = path.join(__dirname, 'public/eventos');
const salidaJson = path.join(__dirname, 'public/fotos.json');

fs.readdir(carpetaFotos, (err, files) => {
  if (err) {
    return console.error('❌ Error al leer carpeta:', err);
  }

  const fotos = files.filter(f => /\.(jpg|jpeg|png)$/i.test(f));
  const jsonData = fotos.map(nombre => `/eventos/${nombre}`);

  fs.writeFileSync(salidaJson, JSON.stringify(jsonData, null, 2));
  console.log(`✅ Se generó fotos.json con ${jsonData.length} imágenes`);
});
