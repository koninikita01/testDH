const {Capabilities, until, By} = require('selenium-webdriver');
var webdriver = require('selenium-webdriver');
// const caps = new Capabilities();
// caps.setPageLoadStrategy("normal");
var driver = new webdriver.Builder().forBrowser('firefox').build();


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