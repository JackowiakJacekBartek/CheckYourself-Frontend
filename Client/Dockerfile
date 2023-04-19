# Użyj oficjalnego obrazu Node.js jako podstawy
FROM node:latest
# Ustal katalog roboczy wewnątrz kontenera
WORKDIR /app
# Zainstaluj Angular CLI globalnie
RUN npm install -g @angular/cli
# Skopiuj pliki package.json i package-lock.json do katalogu roboczego
COPY package*.json ./
# Zainstaluj zależności
RUN npm install
# Skopiuj resztę plików aplikacji
COPY . .
# Zbuduj aplikację Angular
RUN ng build
# Wyeksponuj port, na którym będzie działać aplikacja
EXPOSE 80
# Uruchom aplikację
CMD ["ng", "serve", "--host", "0.0.0.0", "--port", "80"]
