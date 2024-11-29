import { test, expect } from '@playwright/test';

test('delete task', async ({ page }) => {
  await page.goto('http://client:3000/todo');
  await page.locator('li').filter({ hasText: 'TEST A' }).getByTestId('DeleteIcon').locator('path').click();
});
