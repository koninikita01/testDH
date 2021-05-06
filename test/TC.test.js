var webdriver = require('selenium-webdriver');
var firefox = require('selenium-webdriver/firefox');
var driver = webdriver.WebDriver;
const{Builder, By, findElement} = require('selenium-webdriver');
const assert = require('assert');
var options = new firefox.Options();

jest.setTimeout(10000);

beforeAll(async () => {
  let capabilities= webdriver.Capabilities;
  switch (process.env.BROWSER) {
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
      options.addArguments('start-fullscreen');
      options.addArguments('disable-inforbars');
      options.addArguments('--headless'); 
      capabilities = webdriver.Capabilities.firefox(options);
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
    .withCapabilities(capabilities).build();
 
});

afterAll(async () => {
//  await driver.close();
  await driver.quit();
});

it("MVP", async () => {
  await driver.get('https://dighybprstaging.z6.web.core.windows.net/');
  var username =  await driver.findElement(By.id('username'));
  await username.sendKeys('dh.1@client');
  var val =  await driver.findElement(By.id('username')).getAttribute("value");
  assert.strictEqual(val, 'dh.1@client');
});
