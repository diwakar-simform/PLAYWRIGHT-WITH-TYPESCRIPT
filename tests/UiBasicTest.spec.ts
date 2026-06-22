import {expect, test} from '@playwright/test';

test("First Playwright Test", async ({page})=>{

    // this one is using the page fixture. its inside steps are same as the next test case have steps.
    await page.goto("https://www.google.com/");
    console.log(page.title());
    await expect(page).toHaveTitle("Google")
});

test("Browser context explanation Test with browser fixtures", async ({browser})=>{

    // below is the default context - when you don't have anything like cookies or etc.
    const context = await browser.newContext();
    await context.newPage();
});

test.only("Browser context deafaul with page fixuters", async ({page})=>{

    const userName = page.locator("#username");
    const password = page.locator("#password");
    const signInBtn = page.locator("#signInBtn");

    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    console.log(await page.title());

    await userName.fill("Diwakar");
    await password.fill("32456ytui");
    await signInBtn.click();

    console.log(await page.locator("[style*='block']").textContent());

    await expect(page.locator("[style*='block']")).toContainText('Incorrect');

    await userName.fill(""); // This will clear the existing entered value.

    await userName.fill("rahulshettyacademy");
    await password.fill("Learning@830$3mK2");
    await signInBtn.click();

    console.log(await page.locator(".card-body a").first().textContent());
    console.log(await page.locator(".card-body a").nth(1).textContent());


})