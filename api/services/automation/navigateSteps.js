const path = require('path');
const delay = require('../../utils/delay');
const screenshot = require('../../utils/screenshot');
const selectInputByLabel = require('../../utils/selectInputByLabel');

exports.login = async page => {
  await page.goto('https://www.seminuevos.com/', { waitUntil: 'networkidle2' });
  await page.click('.login-btn');
  await page.waitForNavigation({ waitUntil: 'networkidle2' });
  await page.type('#email', `${process.env.EMAIL}`, { delay: 100 });
  await page.type('#password', `${process.env.PASSWORD}`, { delay: 100 });
  await page.click('button[type="submit"]');
  await screenshot(page, 'step0');
  await page.waitForNavigation({ waitUntil: 'networkidle2' });
};

exports.publicar = async page => {
  await page.waitForSelector('a.btn-primary[href*="publicar"]', { timeout: 5000 });
  await page.click('a.btn-primary[href*="publicar"]');
  await page.waitForNavigation({ waitUntil: 'networkidle2' });

  await page.$$eval('button', (buttons) => {
    const btn = buttons.find(btn => btn.offsetParent !== null && btn.textContent.includes('Elegir plan'));
    btn?.click();
  });

  await screenshot(page, 'step1');
  await page.waitForNavigation({ waitUntil: 'networkidle2' });
};

exports.llenarFormulario = async (page, precio, descripcion) => {
  await selectInputByLabel(page, "Marca", "Acura");
  await selectInputByLabel(page, "Modelo", "ILX");
  await selectInputByLabel(page, "Año", "2018");
  await selectInputByLabel(page, "Versión", "2.4 Tech At");
  await selectInputByLabel(page, "Subtipo", "Sedán");
  await selectInputByLabel(page, "Color", "Negro");
  await selectInputByLabel(page, "Código Postal", "64000", true, true);
  await selectInputByLabel(page, "Ciudad del vehículo", "Monterrey");
  await selectInputByLabel(page, "Recorrido", "20000", false);

  await page.waitForSelector('input[name="price"]', { timeout: 5000 });
  await page.type('input[name="price"]', `${precio}`, { delay: 100 });

  
  await page.evaluate(() => {
    const label = [...document.querySelectorAll('label')].find(el =>
      el.textContent?.trim().toLowerCase() === 'negociable'
    );
    if (label) {
      const forAttr = label.getAttribute('for');
      const input = document.getElementById(forAttr);
      input?.click();
    }
  });
  
  await page.evaluate(() => {
    const btn = [...document.querySelectorAll('button')].find(b => b.textContent.includes('Siguiente'));
    btn?.click();
  });
  
  await screenshot(page, 'step2');
  await page.waitForNavigation({ waitUntil: 'networkidle2' });

  await page.waitForSelector('[contenteditable="true"]', { timeout: 5000 });
  await page.click('[contenteditable="true"]');
  await page.keyboard.type(`${descripcion}`, { delay: 100 });

  const inputUploadHandle = await page.$('input[type="file"]');
  await inputUploadHandle.uploadFile(
    path.join(__dirname, '../../dump_media/carro1.jpg'),
    path.join(__dirname, '../../dump_media/carro2.jpg'),
    path.join(__dirname, '../../dump_media/carro3.jpg')
  );

  await delay(2000);

  await page.evaluate(() => {
    const btn = [...document.querySelectorAll('button')].find(b => b.textContent.includes('Siguiente'));
    btn?.click();
  });

  await screenshot(page, 'step3');
  await page.waitForNavigation({ waitUntil: 'networkidle2' });
};

exports.finalizarPublicacion = async page => {
  await page.evaluate(() => {
    const btn = [...document.querySelectorAll('button')].find(b => b.textContent.includes('Siguiente'));
    btn?.click();
  });
  
  await screenshot(page, 'step4');
  await page.waitForNavigation({ waitUntil: 'networkidle2' });

  await delay(2000);

  await screenshot(page, 'step5');
};
