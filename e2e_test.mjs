import { chromium } from "playwright";

const errors = [];
const browser = await chromium.launch({ executablePath: "/opt/pw-browsers/chromium" });
const page = await browser.newPage({ viewport: { width: 390, height: 844 } });
page.on("console", (msg) => {
  if (msg.type() === "error") errors.push(msg.text());
});
page.on("pageerror", (err) => errors.push("pageerror: " + err.message));

await page.goto("http://127.0.0.1:4173/", { waitUntil: "networkidle" });

async function shot(name) {
  await page.waitForTimeout(450); // let framer-motion settle
  await page.screenshot({ path: `/tmp/shots/${name}.png` });
}

// intro
await page.getByText("Start the Vibe Check").waitFor();
await shot("01_intro");
await page.getByText("Start the Vibe Check").click();

// name capture
await page.getByPlaceholder("Your name").waitFor();
await shot("02_name");
await page.getByPlaceholder("Your name").fill("Zeal");
await page.getByText("Continue", { exact: true }).click();

// bio cards - click "Cute" repeatedly until quiz appears
await page.getByText("Get to know me").waitFor();
await shot("03_biocards_1");
for (let i = 0; i < 8; i++) {
  const quizHeading = page.getByText("Compatibility quiz");
  if (await quizHeading.count()) break;
  const cuteBtn = page.getByText("Cute 🥰");
  await cuteBtn.click();
  await page.waitForTimeout(400);
}
await shot("04_quiz_start");

// quiz - pick first option each time
for (let i = 0; i < 8; i++) {
  const loadingHeading = page.getByText("Running the numbers");
  if (await loadingHeading.count()) break;
  const options = page.locator("button.text-left");
  await options.first().click();
  await page.waitForTimeout(400);
}
await shot("05_compat_loading");

await page.getByText("So... are we doing this?").waitFor({ timeout: 6000 });
await shot("06_match_reveal");
await page.getByText("So... are we doing this?").click();

await page.getByText("moment of truth").waitFor();
await shot("07_date_ask");
const noBtn = page.getByRole("button", { name: "No" });
await noBtn.hover().catch(() => {});
await page.waitForTimeout(300);
await shot("08_date_ask_dodged");
await page.getByText("Yes 💕").click();

await page.getByText("when are you free").waitFor();
await shot("09_date_schedule");
const dateInput = page.locator('input[type="date"]');
const tomorrow = new Date(Date.now() + 86400000).toISOString().split("T")[0];
await dateInput.fill(tomorrow);
await page.locator("select").selectOption({ label: "7:30 PM" });
await page.getByText("Lock it in").click();

await page.getByText("What are we feeling").waitFor();
await shot("10_food_vibe");
await page.getByText("Burgers").click();
await page.getByText("Confirm the date").click();

await page.getByText("Finalizing").waitFor();
await shot("11_review_loading");

await page.getByText("Application approved").waitFor({ timeout: 6000 });
await shot("12_approved");

await browser.close();

console.log("ERRORS:", JSON.stringify(errors, null, 2));
console.log("DONE");
