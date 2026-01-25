const express = require("express");
const path = require("path");
const sqlite3 = require("sqlite3").verbose();

const app = express();
const PORT = 3000;

// ======================
// Middleware
// ======================
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

// ======================
// Database
// ======================
const db = new sqlite3.Database("./database.db");

// Create table if not exists
db.run(`
  CREATE TABLE IF NOT EXISTS ambassadors (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    phone TEXT UNIQUE,
    name TEXT,
    region TEXT
  )
`);
db.run(
  "INSERT OR IGNORE INTO ambassadors (phone, name, region) VALUES (?, ?, ?)",
  ["+77761117472", "Test Ambassador", "Almaty"]
);

// ======================
// Routes (pages)
// ======================
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "web.html"));
});

app.get("/login", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "login.html"));
});

app.get("/ambassador", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "ambassador.html"));
});

app.get("/apply", (req, res) => {
  res.send("<h2>Вы не амбассадор. Подайте заявку.</h2>");
});

// ======================
// LOGIN LOGIC
// ======================
app.post("/login", (req, res) => {
  const { phone } = req.body;

  db.get(
    "SELECT * FROM ambassadors WHERE phone = ?",
    [phone],
    (err, row) => {
      if (err) {
        return res.status(500).send("Ошибка сервера");
      }

      if (row) {
        // амбассадор найден
        res.redirect("/ambassador");
      } else {
        // не амбассадор
        res.redirect("/apply");
      }
    }
  );
});

// ======================
// Start server
// ======================
app.listen(PORT, () => {
  console.log(`Server started on http://localhost:${PORT}`);
});

