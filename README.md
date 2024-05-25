# Demonstration of solving Yandex coordinate captcha using Puppeteer 

The example clearly demonstrates the concentration of Yandex captcha solution using the [coordinate method](https://2captcha.com/2captcha-api#coordinates?from=22771395). The captcha is solved using JavaScript library Puppeteer. The captcha is solved in the [2captcha.com](https://2captcha.com/?from=22771395) service.

Program algorithm:
1. Сaptcha images and captcha instructions are retrieved on page
2. The captcha is sent to the service [2captcha](https://2captcha.com/?from=22771395) for solving
3. The resulting answer in the form of coordinates is using on the page. Use Puppeteer to click on the obtained coordinates
4. Click on the button to check the result


### Usage

1. Clone repo
2. Install dependencies `npm install`
3. Set 2captcha api key in `index.js` file
4. Run `npm run start`

### Video:
[![video](./media/cover.png)](./media/Yandex-Captcha-Video-Bypass.mp4)

#### Planned features:
- [ ] Checking if the captcha is updated on the page
- [ ] Handling incorrect captcha solution

