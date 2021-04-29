var webdriver = require('selenium-webdriver');
var  homepage = require('../pageobjects/homepage')
var basepage = require('../pageobjects/basepage')
const{Builder, By, FindElement, Key, until} = require('selenium-webdriver');
const assert = require('assert');
var driver ;
const homePg = homepage;
const basepg = basepage;

beforeAll(async () => {
  let capabilities= webdriver.Capabilities;
  switch (process.env.BROWSER || "chrome") {
    case "ie": {
      // HACK: include IEDriver path by nuget
      const driverPath = path.join(
        __dirname,
        "../Selenium.WebDriver.IEDriver.3.150.0/driver/"
      );
      process.env.PATH = `${process.env.PATH};${driverPath};`;
      capabilities = webdriver.Capabilities.ie();
      capabilities.set("ignoreProtectedModeSettings", true);
      capabilities.set("ignoreZoomSetting", true);
      break;
    }
    case "safari": {
      capabilities = webdriver.Capabilities.safari();
      break;
    }
    case "firefox": {
      require("geckodriver");
      capabilities = webdriver.Capabilities.firefox();
      break;
    }
    case "chrome": {
      require("chromedriver");
      capabilities = webdriver.Capabilities.chrome();
      capabilities.set("chromeOptions", {
        args: [
          "--headless",
          "--no-sandbox",
          "--disable-gpu",
          "--window-size=1980,1200"
        ]
      });
      break;
    }
  }
  driver = await new webdriver.Builder()
    .withCapabilities(capabilities)
    .build();
});

afterAll(async () => {
  await driver.quit();
});

it("MVP", async () => {
  await driver.get('https://dighybprstaging.z6.web.core.windows.net/');
  var username =  await driver.findElement(By.id('username'));
  await username.sendKeys('dh.1@client');
  var val =  await driver.findElement(By.id('username')).getAttribute("value");
  assert.strictEqual(val, 'dh.1@client');
});