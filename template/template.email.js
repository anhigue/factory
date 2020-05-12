/** 
 * @description template to send on mail
 * @typedef {string}
*/
const TEMPLATE_STRING_BASE = '<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd"><html xmlns="http://www.w3.org/1999/xhtml"><head><meta http-equiv="Content-Type" content="text/html; charset=UTF-8" /><title>Reporte de Partes Vendidas</title><meta name="viewport" content="width=device-width, initial-scale=1.0" /><style>body {margin: 0;padding: 0;}table,tr,td {border: none;}#table {font-size: 25px;}#top, #footer {text-align: center;}#top {font-size: 50px;color: white;}#middle {padding: 10px;font-family: "Courier New", Courier, monospace;}a {color: white;}</style></head><body><table align="center" border="1" cellpadding="0" cellspacing="0" width="600" id="table"><tr id="top"><td bgcolor="#70bbd9">Reporte de venta de repuestos de tienda</td></tr><tr id="middle"><td bgcolor="#ffffff"><table border="1" cellpadding="0" cellspacing="0" width="100%"><tr><td style="padding: 20px 0 30px 0;">Este correo es para la notificacion del reporte de venta de repuestos de las tiendas.Adjunto a este correo, un excel con toda la informacion correspondiente</td></tr></table></td></tr><tr id="footer"><td bgcolor="#ee4c50">&reg; Fabrica, 2020<br /> <a>Unsubscribe to this newsletter instantly</a></td></tr></table></body></html>'

module.exports = {
    TEMPLATE_STRING_BASE
}