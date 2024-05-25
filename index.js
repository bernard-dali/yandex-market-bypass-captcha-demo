import puppeteer from 'puppeteer';
import fs from 'fs';
import { Solver } from "2captcha-ts";
const solver = new Solver('2captcha-api-key'); // You 2captcha APIKEY
const sleep = ms => new Promise(res => setTimeout(res, ms));

;(async () => {
  // Launch the browser and open a new blank page
  const browser = await puppeteer.launch({
    headless: false,
  });
  const page = await browser.newPage();
  await page.setViewport({width: 1080, height: 1024});

  const pageUrl = 'https://market.yandex.ru'

  // Navigate the page to https://market.yandex.ru
  await page.goto(pageUrl);

  // Set screen size
  await page.waitForSelector('.CheckboxCaptcha-Checkbox');

  // Click on checkbox captcha
  await page.click('#js-button')
  
  // Wait captcha image
  await page.waitForSelector('.AdvancedCaptcha-ImageWrapper img');

  // wait for load captcha
  await sleep(1500)

  const captchaElem = await page.$(".AdvancedCaptcha-ImageWrapper img");
  const captchaInstruction = await page.$(".AdvancedCaptcha-SilhouetteTask");

  // Save image captcha and instructions
  await captchaElem.screenshot({ path: "captcha.png" });
  await captchaInstruction.screenshot({ path: "captchaInstruction.png" });

  /**
   * Getting the start coordinates of a captcha element on page
   * 
   * Puppeteer counts down the coordinates for clicks starting from the top left window of the browser.
   * Here we get the coordinates where the element with the captcha task is located. 
   * This is necessary to correctly calculate the coordinates of the answer to the captcha,
   * as we will need to add the obtained coordinates to the coordinates of the element on the page.
   */
  const locationElement = await page.evaluate((el) => {
    const { x, y } = el.getBoundingClientRect();
    return { x, y };
  }, captchaElem);

  // Image in base64
  const captcha = fs.readFileSync("./captcha.png", "base64");
  const instruction = fs.readFileSync("./captchaInstruction.png", "base64");

  // Solve Coordinates captcha in 2captcha service
  const result = await solver.coordinates({
    body: captcha,
    imginstructions: instruction
  })
  .then(async (res) => {

    // Answer coordinates
    console.log("Coordinates for click on the captcha:");
    console.log(res)
    res = res.data;

    // Click on each coordinate
    res.forEach(async element => {
      const x = locationElement.x + Number(element.x)
      const y = locationElement.y + Number(element.y)
      await page.mouse.click(x, y);
    });
  })
  .catch((err) => {
    console.log(err);
  });

  // Click on submit button
  await page.click('.CaptchaButton-SubmitContent')

})();