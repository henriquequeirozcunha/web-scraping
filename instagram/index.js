const puppeteer = require('puppeteer');
const fs = require('fs');

(async () => {
  const browser = await puppeteer.launch({
      headless: true
  });
  const page = await browser.newPage();
  await page.goto('https://www.instagram.com/rocketseat_oficial');
  //await page.screenshot({ path: 'instagram.png' });

  const imgList = await page.evaluate(() => {
      // toda essa função será executada no browser...

      // pegar todas as imagens que estao na parte de posts...
      const nodeList = document.querySelectorAll('article img');

      // transformar o nodeList em array
      const imgArray = [...nodeList];

      // transformar os nodes(elementos html) em objetos JS
      const imgList = imgArray.map(({src}) => ({src}));

      return imgList;
  });

  // escrever os dados em um arquivo local (json)
  fs.writeFile('instagram/instagram.json', JSON.stringify(imgList, null, 2), err => {
      if (err) throw new Error('something went wrong')

      console.log('finished successfully');
  });


  await browser.close();
})();