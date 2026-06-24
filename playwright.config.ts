import { defineConfig, devices } from '@playwright/test';

const config = ({
  testDir: './tests',
  timeout: 40000, /*this timeout is for overall test case failure*/
  expect:{
    timeout: 5*1000 /*this timeout is for expect assertion statement time*/
  },

  reporter : 'html',

  use: {
    browserName : "chromium",
    headless : false
  },

});

export default config;
