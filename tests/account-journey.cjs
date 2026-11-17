const { chromium } = require('playwright');
const assert = require('node:assert/strict');
const required = ['NORDEN_TEST_URL','NORDEN_PREMIUM_EMAIL','NORDEN_PREMIUM_PASSWORD','NORDEN_FREE_EMAIL','NORDEN_FREE_PASSWORD'];
if (required.some(k => !process.env[k])) { console.error('BLOCKED: configure Supabase and test-account environment variables; see docs/account-journey-setup.md.'); process.exit(2); }
async function dashboard(page) {
  await page.goto(process.env.NORDEN_TEST_URL);
  if (await page.getByRole('button', {name:'Get Started'}).isVisible()) {
    await page.getByRole('button', {name:'Get Started'}).click();
    await page.getByRole('button', {name:'Select',exact:true}).first().click();
    await page.locator('select').selectOption('Male');
    await page.getByPlaceholder('Enter your age').fill('30');
    await page.getByPlaceholder('Feet',{exact:true}).fill('5');
    await page.getByPlaceholder('Inches',{exact:true}).fill('10');
    await page.getByRole('button',{name:'Continue',exact:true}).click();
    await page.getByPlaceholder('Enter weight').fill('180');
    await page.getByRole('button',{name:'Continue',exact:true}).click();
    await page.getByRole('button',{name:'Start My Journey'}).click();
  }
  await page.getByRole('heading',{name:'My Journey',exact:true}).waitFor();
}
async function login(page, kind) {
  await dashboard(page);
  await page.getByLabel('Email',{exact:true}).fill(process.env[`NORDEN_${kind}_EMAIL`]);
  await page.getByLabel('Password',{exact:true}).fill(process.env[`NORDEN_${kind}_PASSWORD`]);
  await page.getByRole('button',{name:'Sign in',exact:true}).click();
  await page.getByRole('button',{name:'Sign out',exact:true}).waitFor();
}
(async()=>{
  const browser=await chromium.launch({headless:true, ...(process.env.CHROMIUM_PATH ? {executablePath:process.env.CHROMIUM_PATH} : {})});
  try {
    const a=await browser.newContext(), b=await browser.newContext(), free=await browser.newContext();
    const p=await a.newPage(); await login(p,'PREMIUM');
    const before=await (await a.request.get(`${process.env.NORDEN_TEST_URL}/api/journey`)).json();
    const goal=before.journey.active?.goal === 'Get Lean' ? 'Get in Shape' : 'Get Lean';
    if (await p.getByRole('button',{name:'Change goal'}).isVisible()) await p.getByRole('button',{name:'Change goal'}).click();
    await p.getByRole('radio',{name:goal}).check();
    const confirm=p.getByRole('button',{name:/^(Confirm goal|Start five-week block)$/}); await confirm.click();
    await p.getByText('Week 1 of 5 · Day 1 of 7',{exact:true}).waitFor();
    await p.getByRole('button',{name:'Complete day and save'}).click();
    await p.getByText('Week 1 of 5 · Day 2 of 7',{exact:true}).waitFor();
    const second=await b.newPage(); await login(second,'PREMIUM');
    await second.getByText('Week 1 of 5 · Day 2 of 7',{exact:true}).waitFor();
    const f=await free.newPage(); await login(f,'FREE');
    await f.getByText(/Your Free dashboard remains available/).waitFor();
    assert.equal(await f.getByRole('radio').count(),0);
    assert.equal((await free.request.get(`${process.env.NORDEN_TEST_URL}/api/journey`)).status(),403);
    assert.equal((await free.request.post(`${process.env.NORDEN_TEST_URL}/api/journey`, {headers:{origin:process.env.NORDEN_TEST_URL},data:{action:'advance',revision:0}})).status(),403);
    console.log('PASS: real Premium cross-context progress; Free dashboard and server denial.');
  } finally {await browser.close();}
})().catch(e=>{console.error(e);process.exit(1)});
