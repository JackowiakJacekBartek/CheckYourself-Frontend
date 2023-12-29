const express = require('express');
const path = require('path');

const app = express();

// Sciezka do katalogu z plikami zbudowanymi przez Angular CLI
const staticPath = path.join(__dirname, 'dist', 'client');

// Uzyj plików statycznych z katalogu 'dist/client'
app.use(express.static(staticPath));

// Przechwytuj wszystkie zapytania i przekierowuj do pliku index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(staticPath, 'index.html'));
});

// Ustaw port na 4200 lub dostepny port zmienna srodowiskowa
const port = process.env.PORT || 4200;

// Uruchom serwer
app.listen(port, () => {
  console.log(`Serwer uruchomiony na porcie ${port}`);
});
