import { test, expect } from "@playwright/test";

test("Register a new user", async ({ page }) => {
    await page.goto("https://rahulshettyacademy.com/client/#/auth/register");
    const firstName = page.locator("#firstName");
    const lastName = page.locator("#lastName");
    const email = page.locator("#userEmail");
    const mobile = page.locator("#userMobile");
    const password = page.locator("#userPassword");
    const cnfpassword = page.locator("#confirmPassword");
    const checkBox = page.getByRole('checkbox');
    const registerBtn = page.locator("input[value='Register']");
    const loginBtn = page.getByText("Login");


    await firstName.fill("Dummy");
    await lastName.fill("User1");
    await email.fill("dummyuser4@gmail.com");
    await mobile.fill("1234567890");
    await password.fill("Mypassword@123");
    await cnfpassword.fill("Mypassword@123");
    await checkBox.check();
    await registerBtn.click();
    await loginBtn.click();

});

test("Login >> Extract the first product title", async ({ page }) => {

    await page.goto("https://rahulshettyacademy.com/client/#/auth/login");

    const email = page.locator("#userEmail");
    const password = page.locator("#userPassword");
    const loginBtn = page.getByText("Login");
    const productTitle = page.locator(".card-body b");

    await email.fill("dummyuser4@gmail.com");
    await password.fill("Mypassword@123");
    await loginBtn.click();

    // console.log(await productTitle.first().textContent());
    // console.log(await productTitle.nth(0).textContent());
    // console.log(await productTitle.nth(1).textContent());
    // console.log(await productTitle.last().textContent());
    // console.log(await productTitle.nth(2).textContent());

    await page.waitForLoadState('networkidle'); // intelligently this allows you to wait till all api response get fully loaded.
    console.log(await productTitle.allTextContents()); // this function doesn't auto wait that's why we have keep above one

    await productTitle.first().waitFor(); // intelligently wait till the locator doesn't appear. because above one method is little flaky
    console.log(await productTitle.allTextContents()); // this function doesn't auto wait that's why we have keep above one

})

test.only("Login to the client app > add to cart > verify cart item -> checkout --> complete payment --> verify order details --> verify same product details in order history", async ({ page }) => {
    await page.goto("https://rahulshettyacademy.com/client/#/auth/login");

    const email = page.locator("#userEmail");
    const password = page.locator("#userPassword");
    const loginBtn = page.getByText("Login");
    const productTitle = page.locator(".card-body b");
    const productAddToCartBtn = page.locator(".btn.w-10.rounded")

    // Step 1: Login to app
    await email.fill("dummyuser4@gmail.com");
    await password.fill("Mypassword@123");
    await loginBtn.click();

    // Step 2: Locate the product and click on Add to cart button

    // await page
    //     .locator(".card-body")
    //     .filter({ hasText: "ADIDAS ORIGINAL" })
    //     .getByRole("button", { name: " Add To Cart" })
    //     .click();

    // traditional way to do the same above Step 2 using loop.

    const product = page.locator(".card-body");
    const productName = "ZARA COAT 3";

    await productTitle.first().waitFor();

    const count = await product.count();

    for (let i = 0; i < count; i++){

        if (await product.nth(i).locator("b").textContent() === productName){
            await product.nth(i).locator("text= Add To Cart").click();
            break;
        }

    }

    // Step 3: Navigate to Cart Dashboard and verify the product and click on buy now button.

    await page.locator("[routerlink*='/dashboard/cart']").click();
    // await page.locator("div li").waitFor(); // we need to explicity mention this because isVisible method doesn't have auto-wait mechanism.
    await page.locator("div li").first().waitFor(); // in case of mutiple elements, otherwise test will fail

    const bool = await page.locator("h3:has-text('ZARA COAT 3')").isVisible();
    await expect(bool).toBeTruthy();

    // Step 4: Navigate to Checkout page.
    // one way: 
    await page.locator("text='Checkout'").click();

    // second way:
    // await page
    //     .locator(".items")
    //     .filter({ hasText: "ADIDAS ORIGINAL" })
    //     .getByRole("button", { name: "Buy Now" })
    //     .click();

    // Step 5: Fill the payment details and make payment

    await page.locator("[placeholder *= 'Country']").pressSequentially('ind',{delay:100});

    const dropdown = page.locator(".ta-results");
    await dropdown.waitFor();

    const option = dropdown.locator('button');

    // await dropdown.getByRole('button').filter({hasText: " India"}).click(); // need to debug

    const optionCount = await option.count();


    for(let i = 0; i < optionCount; ++i){

        const text = await option.nth(i).textContent();
        if (text === " India"){ // for exact match

            await option.nth(i).click();
            break;
        }

        // if (text?.includes(" India")){ // its like contains or like query

        //     await option.nth(i).click();
        //     break;
        // }
    }



    await page.pause();



})