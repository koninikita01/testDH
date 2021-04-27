const {Capabilities, until, By} = require('selenium-webdriver');
var webdriver = require('selenium-webdriver');
var ch = require('selenium-webdriver/chrome');
var options = new ch.Options();
options.addArguments('start-fullscreen');
options.addArguments('disable-inforbars');
options.addArguments('--headless');
options.addArguments('--disable-extensions')
options.addArguments('--remote-debugging-port=9222')  
options.setChromeBinaryPath('/usr/local/bin/chromeDriver');

const caps = new Capabilities();
caps.setPageLoadStrategy("normal");
var driver = new webdriver.Builder().setChromeOptions(options).forBrowser('chrome').build();

// var driver = manager.chromedriver().setup();
//  var d = new manager.Builder().
 //new manager.chrome.browserVersion("90.0.4430.24").setup();
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

//export PATH=$PATH:"/usr/local/share/chromedriver" 

