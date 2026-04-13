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

// ✅🔥 PREMIUM SWAGGER UI (ADDED)
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
        background: #38bdf8;
        color: black;
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
    `,

    // ✅🔥 BADGES + VERSION + COPY TOKEN BUTTON
    customJs: `
      window.onload = function() {
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

        // ✅ COPY TOKEN BUTTON
        setTimeout(() => {
          const authWrapper = document.querySelector('.auth-wrapper');

          if (authWrapper) {
            const btn = document.createElement('button');

            btn.innerText = "📋 Copy Token";
            btn.style.marginLeft = "10px";
            btn.style.padding = "6px 10px";
            btn.style.borderRadius = "6px";
            btn.style.background = "#22c55e";
            btn.style.color = "black";
            btn.style.fontWeight = "bold";
            btn.style.cursor = "pointer";

            btn.onclick = () => {
              const input = document.querySelector('input[type="text"]');

              if (input && input.value) {
                navigator.clipboard.writeText(input.value);
                btn.innerText = "✅ Copied!";
                setTimeout(() => (btn.innerText = "📋 Copy Token"), 2000);
              } else {
                btn.innerText = "⚠️ No Token";
                setTimeout(() => (btn.innerText = "📋 Copy Token"), 2000);
              }
            };

            authWrapper.appendChild(btn);
          }
        }, 1500);
      };
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