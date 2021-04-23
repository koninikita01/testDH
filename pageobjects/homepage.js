const{Builder, By, Key, until} = require('selenium-webdriver');
var basepg = require('../pageobjects/basepage')
var bp = new basepg();

class Homepage extends basepg 
{
   async sendKeys(webelement,text)
    {
       return await webelement.sendKeys(text);
    }

    async find_element_id(element_id){
      (await bp.driver).wait(until.elementLocated(By.id(element_id),2000));
      return (await bp.driver).findElement(By.id(element_id));
  }

  async find_element_css(element_css){
    (await bp.driver).wait(until.elementLocated(By.css(element_css),2000));
    return (await bp.driver).findElement(By.css(element_css));
}

  async find_element_xpath(ele)
  {
   
     (await bp.driver).wait(until.elementLocated(By.xpath(ele),30000));
      return (await bp.driver).findElement(By.xpath(ele));
  }
}


module.exports =new Homepage();

// D:\Work2021\Workspace\digital-hybrid\selenium\test\Test001.js