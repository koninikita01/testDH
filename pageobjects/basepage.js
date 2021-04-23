const {Capabilities, until, By} = require('selenium-webdriver');
var webdriver = require('selenium-webdriver');
var ch = require('selenium-webdriver/chrome');
var options = new ch.Options();
options.addArguments('start-fullscreen');
options.addArguments('disable-inforbars');
options.addArguments('headless');

const caps = new Capabilities();
caps.setPageLoadStrategy("normal");
var driver = new webdriver.Builder().setChromeOptions(options).forBrowser('chrome').build();


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