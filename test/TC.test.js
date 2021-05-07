var webdriver = require('selenium-webdriver');
let firefox = require('selenium-webdriver/firefox');
driver = new webdriver.Builder();
require('jest');
// require("geckodriver");
// require('ms-chromium-edge-driver');
const{Builder, By, findElement} = require('selenium-webdriver');
const assert = require('assert');
var Firefox_options = new firefox.Options();
// const { installDriver } =require('ms-chromium-edge-driver');
var edge = require('selenium-webdriver/edge');
// const ff_binary = new firefox.Binary();


jest.setTimeout(6000);


beforeEach(async () => {
  let capabilities= webdriver.Capabilities;
  console.log('beforeEach block');
  
  switch (process.env.BROWSER) {
       case "edge": {
          const edgePaths = await installDriver();
          const edgeOptions = new edge.Options();
          edgeOptions.setEdgeChromium(true);
          edgeOptions.setBinaryPath(edgePaths.browserPath);
        //  edgeOptions.headless();
        // edgeOptions.addArguments("headless"); 
 
      // HACK: include IEDriver path by nuget
      // const driverPath = path.join(
      //   __dirname,
      //   "../Selenium.WebDriver.IEDriver.3.150.0/driver/"
      // );
      // process.env.PATH = `${process.env.PATH};${driverPath};`;
     
      // capabilities = webdriver.Capabilities.edge();
      // capabilities.set("ignoreProtectedModeSettings", true);
      // capabilities.set("ignoreZoomSetting", true);

       break;
    }
    case "safari": {  
      capabilities = webdriver.Capabilities.safari();
      break;
    }

    case "firefox": {
     
      // console.log('in firefox');
      Firefox_options.addArguments('--headless');
      Firefox_options.addArguments('--disable-gpu');
      Firefox_options.addArguments('--window-size=1980,1200')
      capabilities = webdriver.Capabilities.firefox();
      driver = await new webdriver.Builder().forBrowser('firefox').setFirefoxOptions(Firefox_options).usingServer('http://localhost:4444/wd/hub')
      .withCapabilities(capabilities)
      .build();
      break;
      
      
    }
    case "chrome": {
      require("chromedriver");
      capabilities = webdriver.Capabilities.chrome();
      capabilities.set("chromeOptions", {
        args: [
          // "--headless",
          "--no-sandbox",
          "--disable-gpu",
          "--window-size=1980,1200"
        ]
      });
      driver = await new webdriver.Builder().forBrowser('chrome')
      .withCapabilities(capabilities)
      .build();
      break;
    }

  }
  
      // driver = await new webdriver.Builder()
      // .forBrowser('MicrosoftEdge')
      // .withCapabilities(capabilities)
      // .setEdgeOptions(edgeOptions)
      // .setEdgeService(new edge.ServiceBuilder(edgePaths.driverPath))
      // .build();


 });

afterEach(async () => {
  console.log('afterEach block');
  await driver.quit();
},2000);


test("launch DH and assert username text field", async () => {
  await driver.get('https://dighybprstaging.z6.web.core.windows.net/');
  var username =  await driver.findElement(By.id('username'));
  await username.sendKeys('dh.1@client');
  console.log('found username');
  var val =  await driver.findElement(By.id('username')).getAttribute("value");
  assert.strictEqual(val, 'dh.1@client');
});

// function handleFailure(err, driver) {
//   console.error('Something went wrong!\n', err.stack, '\n');
//   driver.quit();
// }


//reporters: [
  //     "default",
  //     ["./node_modules/jest-html-reporter", {
  //         pageTitle: "Test Report"
  //     }]
  // ]
