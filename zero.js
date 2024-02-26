const axios = require('axios');
const fs = require('fs');

async function getData() {
  try {
    const response = await axios.post('https://sa-east-1.aws.data.mongodb-api.com/app/emimax-khgfo/endpoint/zero');
    const data = response.data;

    // Extraer y almacenar todos los valores únicos de rutformat en un conjunto
    const rutformatSet = new Set();
    data.forEach(item => {
      // Verificar si rutformat es una cadena de texto antes de usar replace()
      const rutformat = typeof item.rutformat === 'string' ? item.rutformat.replace(/\./g, '') : item.rutformat;
      rutformatSet.add(rutformat);
    });

    // Convertir el conjunto a un array
    const rutformatArray = Array.from(rutformatSet);

    // Escribir los datos en un archivo JSON
    fs.writeFileSync('reproces.json', JSON.stringify(rutformatArray, null, 2));
    console.log('Datos guardados en reproces.json');
    return rutformatArray;
  } catch (error) {
    console.error('Error al obtener la data:', error);
    throw error;
  }
}

// Llamar a la función para obtener y guardar los ruts únicos
getData();
