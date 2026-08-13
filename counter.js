(function () {
  "use strict";

  var SUPABASE_URL = "https://lqqxazmmhkylwyrgyhmb.supabase.co";
  var SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxxcXhhem1taGt5bHd5cmd5aG1iIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODY1NjY0ODEsImV4cCI6MjEwMjE0MjQ4MX0.VKZ_-jrOH9XlsaDAoothG_coKXcLdm9cog_JsiLOAYs";
  var endpoint = SUPABASE_URL + "/rest/v1/rpc/get_soul_count";
  var countEl = document.getElementById("soul-count");
  var form = document.getElementById("waitlist-form");

  if (!countEl) {
    return;
  }

  function renderCount(count) {
    var formattedCount = new Intl.NumberFormat("en-US").format(count);
    countEl.innerHTML = '<span aria-hidden="true">✦</span> ' + formattedCount + " soul" + (count === 1 ? "" : "s") + " reincarnated so far.";
  }

  async function loadCount() {
    try {
      var response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          apikey: SUPABASE_ANON_KEY,
          Authorization: "Bearer " + SUPABASE_ANON_KEY,
        },
        body: "{}",
      });

      if (!response.ok) {
        throw new Error("Counter request failed");
      }

      var count = await response.json();
      if (typeof count === "number" && Number.isFinite(count) && count >= 0) {
        renderCount(count);
      }
    } catch (error) {
      countEl.textContent = "The soul ledger is resting. The Cycle is still open.";
    }
  }

  loadCount();

  if (form) {
    form.addEventListener("submit", function () {
      window.setTimeout(loadCount, 1600);
    });
  }
})();
