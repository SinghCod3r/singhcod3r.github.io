import { spawn } from "node:child_process";
import fs from "node:fs";

async function capture() {
  const chromeProcess = spawn(
    "google-chrome",
    [
      "--headless=new",
      "--remote-debugging-port=9346",
      "--user-data-dir=/tmp/chrome_hero_verify",
      "--no-first-run",
      "--disable-extensions",
      "--disable-gpu",
      "about:blank",
    ],
    { stdio: "ignore" }
  );

  await new Promise((r) => setTimeout(r, 1200));

  try {
    const listRes = await fetch("http://127.0.0.1:9346/json/list");
    const tabs = await listRes.json();
    const targetTab = tabs.find((t) => t.type === "page") || tabs[0];

    const ws = new WebSocket(targetTab.webSocketDebuggerUrl);
    let id = 1;
    const callbacks = new Map();

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.id && callbacks.has(data.id)) {
        const { resolve, reject } = callbacks.get(data.id);
        callbacks.delete(data.id);
        if (data.error) reject(data.error);
        else resolve(data.result);
      }
    };

    await new Promise((resolve) => {
      ws.onopen = resolve;
    });

    const send = (method, params = {}) => {
      return new Promise((resolve, reject) => {
        const curId = id++;
        callbacks.set(curId, { resolve, reject });
        ws.send(JSON.stringify({ id: curId, method, params }));
      });
    };

    await send("Page.enable");
    await send("Runtime.enable");

    // ============================================
    // 1. CAPTURE DESKTOP HERO (1440 x 900)
    // ============================================
    await send("Emulation.setDeviceMetricsOverride", {
      width: 1440,
      height: 900,
      deviceScaleFactor: 2,
      mobile: false,
    });

    await send("Page.navigate", { url: "http://localhost:3000" });

    // Wait 1.5s for page to mount and click #intro-skip-btn
    await new Promise((r) => setTimeout(r, 1500));
    await send("Runtime.evaluate", {
      expression: `
        const btn = document.getElementById('intro-skip-btn');
        if (btn) btn.click();
      `,
    });
    // Wait 1s for intro overlay to animate out
    await new Promise((r) => setTimeout(r, 1000));

    const desktopShot = await send("Page.captureScreenshot", { format: "png" });
    fs.writeFileSync("verify_hero_desktop.png", Buffer.from(desktopShot.data, "base64"));
    console.log("Saved verify_hero_desktop.png");

    // ============================================
    // 2. CAPTURE MOBILE HERO (390 x 844)
    // ============================================
    await send("Emulation.setDeviceMetricsOverride", {
      width: 390,
      height: 844,
      deviceScaleFactor: 2,
      mobile: true,
    });

    await new Promise((r) => setTimeout(r, 800));
    const mobileShot = await send("Page.captureScreenshot", { format: "png" });
    fs.writeFileSync("verify_hero_mobile.png", Buffer.from(mobileShot.data, "base64"));
    console.log("Saved verify_hero_mobile.png");

    ws.close();
  } finally {
    chromeProcess.kill("SIGKILL");
  }
}

capture().catch((err) => {
  console.error("Capture error:", err);
  process.exit(1);
});
