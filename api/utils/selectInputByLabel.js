module.exports = async (page, labelText, valueToType, isSelect = true, hasDelay = false) => {
   const inputId = await page.evaluate((labelText) => {
    const label = [...document.querySelectorAll('label')].find(el =>
      el.textContent?.includes(labelText)
    );
    return label?.getAttribute('for');
  }, labelText);

  if (inputId) {
    const selector = `#${inputId}`;
    await page.waitForSelector(selector, { timeout: 5000 });
    await page.type(selector, valueToType, { delay: 100 });
    if (hasDelay) {
      await new Promise(resolve => setTimeout(resolve, 1000));
    }
    if (isSelect) {
      await page.keyboard.press('ArrowDown');
      await page.keyboard.press('Enter');
    }
  } else {
    console.warn(`Input associated not found for "${labelText}"`);
  }
};
