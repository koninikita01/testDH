const {Capabilities, until, By} = require('selenium-webdriver');
var webdriver = require('selenium-webdriver');
let ch = require('selenium-webdriver/chrome');
const chromedriver = require('chromedriver');  
ch_options = new ch.setDefaultService(new ch.ServiceBuilder('/__w/testDH/testDH/resources').build());


let options = new ch.Options().headless();
options.addArguments('start-fullscreen');
options.addArguments('disable-inforbars');
options.addArguments('--headless');
options.addArguments('--disable-extensions')
options.addArguments('--remote-debugging-port=9222') ;


const caps = new Capabilities();
caps.setPageLoadStrategy("normal");
let driver = new webdriver.Builder().setChromeOptions(options).forBrowser('chrome').build();

class BasePage {
constructor()
{
    this.driver = driver ;
}

async go_to_url(baseURL)
    {   
     (await driver).manage().window().maximize();
       await driver.get(baseURL);
    }
}


module.exports = BasePage;


