import { test, expect } from '@playwright/test';

test('create task', async ({ page }) => {
  await page.goto('http://client:3000/todo');
  await page.getByPlaceholder('title ?').click;
  await page.getByPlaceholder('title ?').fill('TEST');
  await page.getByRole('button', { name: 'Create' }).click();
});
