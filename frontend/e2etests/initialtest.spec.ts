import { test, expect } from '@playwright/test';

// goes to frontend on localhost and checks that there's an element with 'index'
test('Check that logon page is shown', async ({ page }) => {
  await page.goto('http://localhost:8081/');
  await expect(page.getByText('index')).toBeVisible();
});

// logs in to login page
test('Try Login', async ({ page }) => {
  await page.goto('http://localhost:8081/');

  // fill in username: test123@gmail.com
  //await page.getByRole('textbox', { type: 'email' }).fill('test123@gmail.com');
  await page.locator('input[type="email"]').fill('test123@gmail.com');

  // fill in password: password
  //await page.getByRole('textbox').fill('password');
  await page.locator('input[type="password"]').fill('password');

  // click login button
  //await page.getByRole('button').click();
  //await page.getByText('Login').click();
  await page.getByTestId('login-button').click();

  // check that page navigates to http://localhost:8081/dashboard
  await expect(page).toHaveURL('http://localhost:8081/dashboard');
});
