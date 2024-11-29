import { test, expect } from '@playwright/test';

test('update task', async ({ page }) => {
  await page.goto('http://client:3000/todo');
  await page.getByTestId('EditIcon').click();
  await page.getByPlaceholder('title ?').click;
  await page.getByPlaceholder('title ?').fill('TEST A');
  await page.getByRole('button', { name: 'Update' }).click();
});
