const puppeteer = require('puppeteer');

module.exports = async (link) => {
  let page_url = 'https://riocontraocorona.rio/noticias/'+link;

  let browser = await puppeteer.launch();
  let page = await browser.newPage();
  await page.goto(page_url , { waitUntil: 'networkidle2' } );

  let notice = await page.evaluate( () => {
    let title= '', text= ''; 

    document.querySelectorAll('h1[class="elementor-heading-title elementor-size-default"]').forEach(el => {
      title = el.innerHTML;
    });

    document.querySelectorAll('div[class="elementor-element elementor-element-1f00920 elementor-widget elementor-widget-theme-post-content"]').forEach(el => {
      text = el.innerText;
    });

    return { title : title , text : text}
  });


  await browser.close();

  return notice;
}