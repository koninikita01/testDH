var webdriver = require('selenium-webdriver');
let firefox = require('selenium-webdriver/firefox');
let driver = webdriver;
require('jest');
const{Builder, By, findElement} = require('selenium-webdriver');
const assert = require('assert');

var edge = require('selenium-webdriver/edge');



jest.setTimeout(30000);


test("launch DH and assert username text field", async () => {
    var Firefox_options = new firefox.Options();
    Firefox_options.addArguments('--headless');
    Firefox_options.addArguments('--disable-gpu');
    Firefox_options.addArguments('--window-size=1980,1200')
    capabilities = webdriver.Capabilities.firefox();
    driver = await new webdriver.Builder().forBrowser('firefox').setFirefoxOptions(Firefox_options).usingServer('http://localhost:4444/wd/hub')
    .withCapabilities(capabilities)
    .build();

  await driver.get('https://dighybprstaging.z6.web.core.windows.net/');
  var username =  await driver.findElement(By.id('username'));
  await username.sendKeys('dh.1@client');
  console.log('found username');
  var val =  await driver.findElement(By.id('username')).getAttribute("value");
  assert.strictEqual(val, 'dh.1@client');
  await driver.quit();
});

