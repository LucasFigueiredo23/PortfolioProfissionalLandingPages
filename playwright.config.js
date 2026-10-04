import { defineConfig, devices } from "@playwright/test";

// Porta própria e build sempre novo: nunca testa um `vite preview` antigo que esteja aberto.
const PORT = 4174;

// Os testes rodam contra o build de produção (vite build + vite preview).
export default defineConfig({
  testDir: "tests",
  fullyParallel: true,
  reporter: "list",
  use: {
    baseURL: `http://localhost:${PORT}`,
  },
  projects: [
    { name: "chromium", use: { ...devices["Desktop Chrome"] } },
    // O bug de toque importa mais no iPhone: roda também no motor do Safari.
    { name: "webkit", use: { ...devices["Desktop Safari"] } },
  ],
  webServer: {
    command: `npm run build && npm run preview -- --port ${PORT} --strictPort`,
    url: `http://localhost:${PORT}`,
    reuseExistingServer: false,
    timeout: 120_000,
  },
});
