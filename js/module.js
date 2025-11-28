import { SocialWidget } from "./widget";
import { widgetConfig } from "./config";

const WIDGET_ID = "__social_widget_instance";

function init() {
  if (window[WIDGET_ID]) {
    console.log(
      "%c YOUR SCRIPT IS INSERTED",
      "background: red; color: white; font-size: 28px; font-weight: 700; padding: 8px 14px; border-radius: 4px;"
    );
    return;
  }

  window[WIDGET_ID] = new SocialWidget(widgetConfig);
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", init);
} else {
  init();
}
