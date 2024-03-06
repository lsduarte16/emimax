const axios = require('axios');
const xlsx = require('xlsx');
const fs = require('fs');

// Leer el archivo Excel
const workbook = xlsx.readFile('base.xlsx');
const sheetName = workbook.SheetNames[0]; // Suponiendo que los datos están en la primera hoja
const worksheet = workbook.Sheets[sheetName];
const jsonData = xlsx.utils.sheet_to_json(worksheet);

// Dividir los datos en lotes de 100
const batchSize = 100;
const batches = [];
for (let i = 0; i < jsonData.length; i += batchSize) {
    batches.push(jsonData.slice(i, i + batchSize));
}

// Función para insertar un lote de documentos
async function insertBatch(batch) {
    try {
        // Configurar los datos para la solicitud a la API
        const data = JSON.stringify({
            "collection": "usersdata",
            "database": "emimax",
            "dataSource": "Cluster0",
            "documents": batch
        });

        // Configurar la solicitud a la API
        const config = {
            method: 'post',
            url: 'https://sa-east-1.aws.data.mongodb-api.com/app/data-xvqxq/endpoint/data/v1/action/insertMany',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Request-Headers': '*',
                'api-key': 'TTYH9HYxhD7Avfr85O7M4Ump4KIgbH0xxA1IV7ynw5OdmkmDbeZqaYwZsCvGfmhH' // Reemplazar con tu API key
            },
            data: data
        };

        // Enviar la solicitud a la API de MongoDB
        const response = await axios(config);
        console.log('Datos insertados exitosamente en MongoDB:', response.data);
    } catch (error) {
        console.error('Error al insertar datos en MongoDB:', error);
    }
}

// Insertar cada lote de documentos en la base de datos
async function insertBatches() {
    for (let i = 0; i < batches.length; i++) {
        await insertBatch(batches[i]);
    }
}

// Llamar a la función para insertar lotes de documentos
insertBatches();
