const { Builder, By, Key, until } = require('selenium-webdriver');

// Lista de RUTs
const ruts = ["7050319-0"]; // Agrega tus RUTs aquí

// Función para buscar la fecha de vencimiento para cada RUT
async function buscarFechaVencimiento(rut) {
    console.log(`Buscando fecha de vencimiento para el RUT: ${rut}`);
    let driver = await new Builder().forBrowser('chrome').build();
    try {
        console.log("Abriendo el sitio web...");
        await driver.get('https://portal.servipag.com/paymentexpress/category/telefoniacelular/company/wommovil');

       // Esperar a que la página se cargue completamente
       console.log("Esperando a que la página se cargue completamente...");
        await driver.wait(until.urlIs('https://portal.servipag.com/paymentexpress/category/telefoniacelular/company/wommovil'), 10000);
       
       
        // Encontrar el campo de entrada del RUT por el atributo formcontrolname
        console.log("Buscando campo de entrada del RUT...");
        let rutInput = await driver.wait(until.elementLocated(By.css('input[formcontrolname="rut"]')), 10000);

        // Ingresar el RUT en el campo de entrada
        console.log(`Ingresando el RUT: ${rut}`);
        await rutInput.sendKeys(rut, Key.RETURN);

        // Esperar a que aparezca el botón "Continuar"
        console.log("Esperando a que aparezca el botón 'Continuar'...");
        let continuarButton = await driver.wait(until.elementLocated(By.xpath('//button[contains(text(), "Continuar")]')), 10000);

        // Hacer clic en el botón "Continuar"
        console.log("Haciendo clic en el botón 'Continuar'...");
        await continuarButton.click();

        // Esperar a que aparezca el monto seleccionable
        console.log("Esperando a que aparezca el monto seleccionable...");
        let montoSeleccionable = await driver.wait(until.elementLocated(By.className('div.cost .add-to-cart')), 10000);

        // Hacer clic en el monto seleccionable (por ejemplo, el primer monto)
        console.log("Haciendo clic en el monto seleccionable...");
        await montoSeleccionable.click();

        // Esperar a que aparezca el botón "Ver detalle"
        console.log("Esperando a que aparezca el botón 'Ver detalle'...");
        let verDetalleButton = await driver.wait(until.elementLocated(By.xpath('//span[contains(text(), "Ver detalle")]')), 10000);

        // Hacer clic en el botón "Ver detalle"
        console.log("Haciendo clic en el botón 'Ver detalle'...");
        await verDetalleButton.click();

        // Esperar a que aparezca la fecha de vencimiento
        console.log("Esperando a que aparezca la fecha de vencimiento...");
        let fechaVencimientoElemento = await driver.wait(until.elementLocated(By.xpath('//b[contains(text(), "Fecha Vencimiento:")]/following-sibling::span')), 5000);

        // Obtener el texto de la fecha de vencimiento
        let fechaVencimiento = await fechaVencimientoElemento.getText();
        console.log(`La fecha de vencimiento para el RUT ${rut} es: ${fechaVencimiento}`);
    } catch (error) {
        console.error(`No se pudo encontrar la fecha de vencimiento para el RUT ${rut}`);
    } finally {
        await driver.quit();
    }
}

// Iterar sobre cada RUT y buscar la fecha de vencimiento
async function buscarFechasVencimiento() {
    for (let rut of ruts) {
        await buscarFechaVencimiento(rut);
    }
}

// Llamar a la función para buscar las fechas de vencimiento
buscarFechasVencimiento();
