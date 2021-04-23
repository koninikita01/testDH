// first commit
var  homepage = require('../pageobjects/homepage')
var basepage = require('../pageobjects/basepage')
var chai = require('chai');
const { beforeEach , afterEach ,afterAll} = require('mocha');
var assert = chai.assert;
var expect = chai.expect;
const homePg = homepage;
var basepg = basepage;

describe('Check login functionality', async function(){
    this.timeout(10000);
    var baseURL='https://dighybprstaging.z6.web.core.windows.net/';
    beforeEach(async function()
    
    {  
        var baseURL='https://dighybprstaging.z6.web.core.windows.net/';
        await homePg.go_to_url(baseURL);    
        await homePg.driver.manage().window().maximize();        
    });


    afterEach(async function()
    {
        setTimeout(async () => {
            await homePg.driver.close();
            // await (await homePg.driver).quit();
        }, 4000);
     
    });
    
     it("valid credentials",async function() 
    { 
        await homePg.go_to_url(baseURL);
        var username =  await homePg.find_element_id('username');
        await username.sendKeys('nikita.k1@client');
        var password = await homePg.find_element_id('password');
        await password.sendKeys('tswhybridtest');
        var loginBtn = (await homePg.find_element_css('button[data-testid="login"]'));
        await loginBtn.click();
        await homePg.driver.sleep(1000);
        var success_msg =  (await homePg.find_element_xpath('//div[@class="MuiAlert-message"]'));
        var msg = await success_msg.getText();
        assert.strictEqual(msg , 'Log in successful');
    })

    it("invalid credentials",async function() 
     {
        var username =  await homePg.find_element_id('username');
       await username.sendKeys('nikita.k1@client');
       var password = await homePg.find_element_id('password');
       await password.sendKeys('tswhybridtet');
       var loginBtn = (await homePg.find_element_css('button[data-testid="login"]'));
       await loginBtn.click();
      await homePg.driver.sleep(1000);
       var success_msg =  (await homePg.find_element_xpath('//div[@class="MuiAlert-message"]'));
        var msg = await success_msg.getText();
        assert.strictEqual(msg , 'Login failed');
     })

})





// npm test ./test/TC001.js

//  // "test": "mocha --timeout 10000"
