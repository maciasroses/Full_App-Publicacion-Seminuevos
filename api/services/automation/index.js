const puppeteer = require('puppeteer');
const navigateSteps = require('./navigateSteps');

exports.handlePrueba = async (req, res) => {
  const { precio, descripcion } = req.body;

  if (!precio || !descripcion) {
    return res.status(400).send('Missing required fields: precio or descripcion');
  }

  try {
    const browser = await puppeteer.launch({ headless: 'new' });
    const page = await browser.newPage();
    await page.setViewport({ width: 1366, height: 768 });

    await navigateSteps.login(page);
    await navigateSteps.publicar(page);
    await navigateSteps.llenarFormulario(page, precio, descripcion);
    await navigateSteps.finalizarPublicacion(page);

    await browser.close();
    res.send('All done!');
  } catch (error) {
    console.error('Error during Puppeteer operation:', error);
    res.status(500).send('Internal Server Error');
  }
};
