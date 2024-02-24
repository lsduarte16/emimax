from selenium import webdriver
from selenium.webdriver.common.keys import Keys
import time

# Lista de RUTs
ruts = ["14729876-5", "7050319-0", "33333333-3"]  # Agrega tus RUTs aquí

# Configuración de Selenium
driver = webdriver.Chrome()  # Cambia a tu driver preferido
driver.get("https://portal.servipag.com/paymentexpress/category/telefoniacelular/company/wommovil")

# Iteramos sobre cada RUT
for rut in ruts:
    # Encontramos el campo de búsqueda y lo llenamos con el RUT actual
    search_box = driver.find_element_by_id("inputRut")
    search_box.clear()
    search_box.send_keys(rut)
    search_box.send_keys(Keys.RETURN)

    # Esperamos un momento para que se cargue la página con los resultados
    time.sleep(2)

    # Encontramos el elemento que contiene la fecha de vencimiento y lo imprimimos
    try:
        fecha_vencimiento = driver.find_element_by_xpath("//div[@class='result__expiration-date']").text
        print(f"La fecha de vencimiento para el RUT {rut} es: {fecha_vencimiento}")
    except:
        print(f"No se encontró la fecha de vencimiento para el RUT {rut}")

# Cerramos el navegador
driver.quit()