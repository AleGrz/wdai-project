# WDAI Projekt

## Autorzy
- Jakub Jurczyk
- Aleksander Grzybek

## Użyta technologia i biblioteki:
- **Język**: [Typescript](https://www.typescriptlang.org/)
- **Framework**: [Next.js](https://nextjs.org/)
- **Baza danych**: [SQLite](https://www.sqlite.org/)
- **Biblioteka ORM**: [Prisma](https://www.prisma.io/)
- **Biblioteka komponentów UI**: [Chakra UI](https://www.chakra-ui.com/)

## Struktura projektu
Projekt podzielony jest na dwie aplikacje - stronę kliencką i serwer API.

## Inicjalizacja w wersji produkcyjnej
1. Uruchamianie serwera API
   - Instalujemy wymagane paczki poprzez ```npm install```.
   - Tworzymy nową bazę danych z odpowiednią strukturą ```npx migrate deploy```.
   - Opcjonalnie wypełniamy bazę danych w wersji produkcyjnej ```npx prisma db seed```.
   - Kompilujemy aplikację przy użyciu ```npm run build```.
   - Uruchamiamy aplikację z użyciem ```npm run start```.
2. Uruchamianie aplikacji głównej
   - Instalujemy wymagane paczki poprzez ```npm install```.
   - Kompilujemy aplikację przy użyciu ```npm run build```. Jeżeli chcemy, aby wszystko poprawnie się skompilowało, w trakcie procesu zalecane jest, aby serwer API był uruchomiony, aby Next.js mógł na spokojnie pobrać dane statyczne.
   - Uruchamiamy aplikację przy użyciu ```npm run start```.

## Funkcjonalności
   - logowanie
   - rejestracja
   - uwierzytelnianie tokenem JWT
   - odświeżanie tokena sesji
   - przeglądanie i wyszukiwanie produktów
   - strona główna, z produktami posortowanymi po średniej opini i ilości opini
   - strona każdego produktu ze zdjęciem i opisem
   - wystawianie opini oraz ich modyfikowania i usuwania
   - dodawanie produktów do koszyka
   - usuwanie produktów z koszyka
   - przeliczanie wartości koszyka
   - składanie zamówienia
   - zapisywanie ilości produktów w magazynie
   - przekierowywanie do strony logowania w razie użycia akcji wymagającej zalogowania