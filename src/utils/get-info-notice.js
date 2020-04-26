const puppeteer = require('puppeteer');

module.exports = async (indx) => {
  let page_url = 'https://riocontraocorona.rio/noticias/';
  if (indx > 1) page_url = page_url + (indx) + '/'; 

  let browser = await puppeteer.launch();
  let page = await browser.newPage();
  await page.goto(page_url , { waitUntil: 'networkidle2' } );

  let noticias = await page.evaluate( () => {
    let notices = [];
    let titles= [] , imgs_src= [] , descs= [] , dates= [] , links= [] ;
  
    document.querySelectorAll('img[class="attachment-medium_large size-medium_large"]').forEach(el => {
      imgs_src.push(el.getAttribute('src'));
    });
  
    document.querySelectorAll('h2[class="elementor-heading-title elementor-size-default"]').forEach(el => {
      titles.push(el.textContent);
      links.push(el.children[0].getAttribute('href').substr(28));
    });

    document.querySelectorAll('span[class="elementor-icon-list-text elementor-post-info__item elementor-post-info__item--type-date"]').forEach(el => {
      dates.push(el.innerText);
    });
  
    document.querySelectorAll('div[class="elementor-text-editor elementor-clearfix"]').forEach(el => {
      descs.push(el.innerHTML);
    });

    for(var i=0;i<titles.length;i++) {
      let tempOBJ = {
        img_src: imgs_src[i],
        title: titles[i],
        desc: descs[i],
        date: dates[i],
        link: links[i]
      };
      notices.push(tempOBJ);
    }


    return notices;
  });

  await browser.close();

  return noticias;
}