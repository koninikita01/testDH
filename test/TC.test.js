let webdriver = require('selenium-webdriver');
let edge = require('selenium-webdriver/edge');
require('jest');
require('geckodriver');
const {beforeAll, afterAll,setTimeout, test} = require('@jest/globals');
let firefox = require('selenium-webdriver/firefox');
let driver = webdriver;
const{Builder, By, findElement} = require('selenium-webdriver');
const assert = require('assert');
let Firefox_options = new firefox.Options();
let edgeOptions = new edge.Options();
const { installDriver } =require('ms-chromium-edge-driver');
let fs = require('fs');
let url;

jest.setTimeout(12000);

beforeAll(async () => {
  let capabilities= webdriver.Capabilities;
  switch (process.env.BROWSER) {
   
    case "edge": {
        // require('selenium-webdriver/edge');
        const edgePaths = await installDriver();
        //  console.log(edgeOptions);
        edgeOptions.setEdgeChromium();
        edgeOptions.setBinaryPath(edgePaths.browserPath);
        edgeOptions.addArguments("headless"); 
  
    capabilities = webdriver.Capabilities.edge();
    capabilities.set("ignoreProtectedModeSettings", true);
    capabilities.set("ignoreZoomSetting", true);
    driver = await new webdriver.Builder()
    .forBrowser('MicrosoftEdge')
    // .withCapabilities(capabilities)
    .setEdgeOptions(edgeOptions)
    .setEdgeService(new edge.ServiceBuilder(edgePaths.driverPath))
    .build();
     break;
     //chromium
      // let options = new edge.Options().setEdgeChromium(true);
      // driver = edge.Driver.createSession(options);
      // break;
    }

     case "safari": {  
      capabilities = webdriver.Capabilities.safari();
      break;
    }

    case "firefox": {
      Firefox_options.addArguments('--headless');
      Firefox_options.addArguments('--disable-gpu');
      Firefox_options.addArguments('--window-size=1980,1200')
      capabilities = webdriver.Capabilities.firefox();
      driver = await new webdriver.Builder().forBrowser('firefox').setFirefoxOptions(Firefox_options)
      .withCapabilities(capabilities)
      .build();
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
      console.log('defining chrome driver');
      driver = await new webdriver.Builder().forBrowser ('chrome')
      .withCapabilities(capabilities)
      .build();
      break;
    }    
  }
    url = process.env.URL;
  });

test("launch DH and assert username text field", async () => {
  await driver.get(url);
  var username =  await driver.findElement(By.id('username'));
  await username.sendKeys('dh.1@client');
  var val =  await driver.findElement(By.id('username')).getAttribute("value");
  assert.strictEqual(val, 'dh.1@client');

});


test("Assert password text field", async () => {
  await driver.get(url);
   var username =  await driver.findElement(By.id('password'));
  await username.sendKeys('passsword');
  var val =  await driver.findElement(By.id('password')).getAttribute("value");
  assert.strictEqual(val, 'passsword');
});

afterAll(async () => {
  await driver.quit();
});


module.exports ={ driver};