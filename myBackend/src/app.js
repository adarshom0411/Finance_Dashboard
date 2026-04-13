const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./config/swagger");
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const rateLimit = require("express-rate-limit");

const routes = require("./routes");
const errorHandler = require("./middlewares/errorHandler");
const notFound = require("./middlewares/notFound");
const path = require("path");

const app = express();

app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
app.options("*", cors());

// ✅ FIX: handle invalid JSON safely
app.use(express.json({
  limit: "10kb"
}));

app.use(helmet());
app.use(morgan("dev"));

app.use(
  rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100
  })
);

// ✅🔥 PREMIUM + ULTIMATE SWAGGER UI (ONLY ADDITIONS)
app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(swaggerSpec, {
    explorer: true,
    customSiteTitle: "Finance Dashboard API 🚀",
    customfavIcon: "https://cdn-icons-png.flaticon.com/512/3135/3135715.png",

    customCss: `
      body {
        background: linear-gradient(135deg, #020617, #0f172a);
      }

      .swagger-ui .topbar {
        background: linear-gradient(90deg, #020617, #0ea5e9);
      }

      .swagger-ui .topbar-wrapper span {
        color: white;
        font-weight: bold;
        font-size: 20px;
      }

      .swagger-ui .info {
        background: linear-gradient(135deg, #020617, #0ea5e9);
        padding: 20px;
        border-radius: 12px;
        color: white;
      }

      .swagger-ui .opblock {
        border-radius: 12px;
        margin-bottom: 12px;
        border: 1px solid #1e293b;
        box-shadow: 0 4px 12px rgba(0,0,0,0.4);
      }

      .swagger-ui .btn.authorize {
        background: #a277ed;
        color: white;
        border-radius: 8px;
        font-weight: bold;
      }

      .swagger-ui .btn.execute {
        background: linear-gradient(90deg, #22c55e, #16a34a);
        border-radius: 8px;
        font-weight: bold;
      }

      .swagger-ui input,
      .swagger-ui textarea {
        background: #020617;
        color: white;
        border: 1px solid #334155;
        border-radius: 6px;
      }

      /* ================== 🆕 GLASS UI ================== */
      .swagger-ui .opblock,
      .swagger-ui .info,
      .swagger-ui .scheme-container {
        background: rgba(255,255,255,0.08) !important;
        backdrop-filter: blur(12px);
      }

      /* ================== 🆕 LIGHT MODE ================== */
      body.light-mode {
        background: linear-gradient(135deg, #f8fafc, #e2e8f0) !important;
      }

      body.light-mode .swagger-ui,
      body.light-mode .swagger-ui * {
        color: #0f172a !important;
      }

      body.light-mode .swagger-ui .opblock {
        background: rgba(255,255,255,0.7) !important;
      }
    `,

    // ✅🔥 ULTIMATE FEATURES (ONLY ADDITIONS)
    customJs: `
      window.onload = function() {

      toggle.onclick = () => {
  document.body.classList.toggle('light-mode');

  if (document.body.classList.contains('light-mode')) {
    toggle.innerText = "🌞 Light";
  } else {
    toggle.innerText = "🌙 Dark";
  }
};

        /* ================= BADGES ================= */
        const topbar = document.querySelector('.topbar-wrapper');

        if (topbar) {
          const badge = document.createElement('div');

          badge.innerHTML = \`
            <span style="color:#22c55e;margin-left:10px;">● Live</span>
            <span style="color:#38bdf8;margin-left:10px;">Auth</span>
            <span style="color:#facc15;margin-left:10px;">RBAC</span>
            <span style="color:#a78bfa;margin-left:10px;">Analytics</span>
            <span style="color:#f87171;margin-left:10px;">v1.0</span>
          \`;

          topbar.appendChild(badge);
        }

        /* ================= LANDING SECTION ================= */
        const wrapper = document.querySelector('.swagger-ui .wrapper');

        const intro = document.createElement('div');
        intro.innerHTML = \`
          <div style="padding:20px;margin-bottom:20px;border-radius:12px;background:rgba(255,255,255,0.08);">
            <h2>🚀 Finance API</h2>
            <p>Auth • RBAC • Analytics • CRUD</p>
            <ol>
              <li>Login → get token</li>
              <li>Authorize 🔐</li>
              <li>Use APIs</li>
            </ol>
          </div>
        \`;

        wrapper.prepend(intro);

        /* ================= SEARCH ================= */
        const search = document.createElement('input');
        search.placeholder = "🔍 Search APIs...";
        search.style.cssText = "width:100%;padding:10px;margin-bottom:15px;border-radius:8px;";

        wrapper.prepend(search);

        search.addEventListener('input', () => {
          const val = search.value.toLowerCase();
          document.querySelectorAll('.opblock').forEach(b => {
            b.style.display = b.innerText.toLowerCase().includes(val) ? 'block' : 'none';
          });
        });

        /* ================= COPY TOKEN ================= */
        setTimeout(() => {
          const authWrapper = document.querySelector('.auth-wrapper');

          if (authWrapper) {
            const btn = document.createElement('button');
            btn.innerText = "📋 Copy Token";
            btn.className = "btn";

            btn.onclick = () => {
              const input = document.querySelector('input[type="text"]');
              if (input) navigator.clipboard.writeText(input.value);
            };

            authWrapper.appendChild(btn);
          }
        }, 1500);

        /* ================= DARK/LIGHT ================= */
        const toggle = document.createElement('button');
        toggle.innerText = "🌗 Mode";
        toggle.className = "btn";
        toggle.onclick = () => document.body.classList.toggle('light-mode');

        document.querySelector('.topbar').appendChild(toggle);

        /* ================= SIDEBAR ================= */
        const sidebar = document.createElement('div');
        sidebar.style.cssText = "position:fixed;left:10px;top:120px;width:200px;background:rgba(255,255,255,0.08);padding:10px;border-radius:10px;";
        document.body.appendChild(sidebar);

        setTimeout(() => {
          document.querySelectorAll('.opblock-tag-section').forEach((sec,i) => {
            const link = document.createElement('div');
            link.innerText = sec.querySelector('h3 span')?.innerText;
            link.style.cursor = "pointer";
            link.onclick = () => sec.scrollIntoView({behavior:'smooth'});
            sidebar.appendChild(link);
          });
        },1000);

      };
      /* =========================
   🟢 FIX LIGHT MODE (OVERRIDE DARK)
========================= */

body.light-mode {
  background: #f8fafc !important;
}

/* Main containers */
body.light-mode .swagger-ui .opblock,
body.light-mode .swagger-ui .info,
body.light-mode .swagger-ui .scheme-container {
  background: white !important;
  color: #0f172a !important;
  border: 1px solid #e2e8f0 !important;
}

/* Text fix */
body.light-mode .swagger-ui,
body.light-mode .swagger-ui * {
  color: #0f172a !important;
}

/* Code blocks */
body.light-mode .swagger-ui .highlight-code {
  background: #f1f5f9 !important;
  color: black !important;
}

/* Inputs */
body.light-mode .swagger-ui input,
body.light-mode .swagger-ui textarea {
  background: white !important;
  color: black !important;
  border: 1px solid #cbd5f5 !important;
}

/* Buttons */
body.light-mode .swagger-ui .btn {
  background: #e2e8f0 !important;
  color: black !important;
}

/* =========================
   🔐 FIX AUTHORIZE BUTTON
========================= */

/* Always visible */
.swagger-ui .btn.authorize {
  background: linear-gradient(135deg, #22c55e, #06b6d4) !important;
  color: white !important;
  font-weight: bold;
  border-radius: 10px !important;
  padding: 8px 16px !important;
  display: inline-flex !important;
  align-items: center;
  justify-content: center;
}

/* Hover fix */
.swagger-ui .btn.authorize:hover {
  opacity: 0.9;
}

/* Light mode fix */
body.light-mode .swagger-ui .btn.authorize {
  background: linear-gradient(135deg, #16a34a, #0284c7) !important;
  color: white !important;
}

/* =========================
   🧊 FIX GLASS OVERDARK ISSUE
========================= */

.swagger-ui .opblock {
  background: rgba(255,255,255,0.08) !important;
}

body.light-mode .swagger-ui .opblock {
  background: white !important;
}
    `,

    swaggerOptions: {
      docExpansion: "none",
      defaultModelsExpandDepth: -1,
      persistAuthorization: true
    }
  })
);

app.use("/api", routes);

app.use(express.static(path.join(__dirname, "../public")));

app.use(notFound);
app.use(errorHandler);

console.log("Routes mounted at /api");

module.exports = app;