import { expect, test } from '@playwright/test';

test("First Playwright Test", async ({ page }) => {

    // this one is using the page fixture. its inside steps are same as the next test case have steps.
    await page.goto("https://www.google.com/");
    console.log(page.title());
    await expect(page).toHaveTitle("Google")
});

test("Browser context explanation Test with browser fixtures", async ({ browser }) => {

    // below is the default context - when you don't have anything like cookies or etc.
    const context = await browser.newContext();
    await context.newPage();
});

test("Browser context deafaul with page fixuters", async ({ page }) => {

    const userName = page.locator("#username");
    const password = page.locator("#password");
    const signInBtn = page.locator("#signInBtn");
    const cardTitles = page.locator(".card-body a");

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

    // console.log(await cardTitles.first().textContent());
    // console.log(await cardTitles.nth(1).textContent());

    const allTitles = await cardTitles.allTextContents(); // this will return [], because this method will not wait until the page loading.
    console.log(allTitles); // its an array
});

test("Ui Controls", async ({ page }) => {
    const userName = page.locator("#username");
    const password = page.locator("#password");
    const signInBtn = page.locator("#signInBtn");
    const cardTitles = page.locator(".card-body a");
    const documentLink = page.locator("[href*='documents-request']");

    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    console.log(await page.title());

    await expect(documentLink).toHaveAttribute('class', 'blinkingText');
    await expect(documentLink).toHaveClass('blinkingText');


    await page.locator("select.form-control").selectOption("Consultant");
    await page.locator("select.form-control").selectOption({ label: "Teacher" });

    await page.locator(".radiotextsty").nth(0).click();
    console.log(await page.locator(".radiotextsty").last().isChecked());
    // await expect(await page.locator(".radiotextsty").last()).toBeChecked(); // Here expect required await because toBeChecked() is an action


    console.log(await page.locator("#terms").isChecked());
    await page.locator("#terms").check();
    console.log(await page.locator("#terms").isChecked());

    await page.locator("#terms").uncheck();
    console.log(await page.locator("#terms").isChecked());

    expect(await page.locator("#terms").isChecked()).toBeFalsy(); // we only need to add await where there is action is going to perform
    // here above isChecked() is action peform thats why under expect we have written await
    // toBeFalsy is just checking true or false no action is being performed here thats why no await is required for expect


    // await page.locator("button[id='#okayBtn']").click()
    // await page.pause();
    // await userName.fill("Diwakar");
    // await password.fill("32456ytui");
    // await signInBtn.click();

});


test.only("Child windows[new tab] handle", async ({ browser }) => {
    const context = await browser.newContext();
    const page = await context.newPage();

    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");

    const documentLink = page.locator("[href*='documents-request']");

    const [newPage] = await Promise.all([
        context.waitForEvent('page'),
        documentLink.click(),
    ]);

    const text = await newPage.locator(".red").textContent();
    const splittedText = await text?.split('@');
    console.log(text);

    console.log(splittedText[0]);
    const email = await splittedText[1].split(" ");
    console.log(email[0])

    const name = await email[0].split(".");
    console.log(name[0]);

    await page.locator("#username").fill(name[0]);
    console.log(await page.locator("#username").textContent());
    console.log(await page.locator("#username").inputValue());

    await page.pause();
});


