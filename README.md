# REST-API

Beskrivning av projektet: 
Detta är ett litet API-projekt som visar flera böcker och möjligheten att interagera med dem via backend och fronend del. Med hjälp av en products.rest man kan testa olika endpoints (GET, POST, PUT och DELETE). 


Krav som är uppfyllda på G och VG:
1. Projektet innehåller minst 4 st. endpoints (GET, POST, PUT & DELETE för en resurs)
2. Samtliga endpoints skall kunna nås via en REST Client fil
3. All data sparad i en JSON-fil
4. Datan i JSON-filen uppdateras då något läggs till, uppdateras eller tas bort
5. APIét svara med 404 om datan saknas
6. Git & GitHub har använts
7. Projektmappen innehåller en README.md fil
8. Uppgiften lämnas in i tid
9. Alla punkter för godkänt är uppfyllda
10. Ett klient-gränssnitt byggas för att anropa API:ets alla olika endpoints och presentera datan, redigeringsformulär skall fyllas i med befintlig information
11. Ytterligare en GET endpoint läggas till där det går att hämta ett specifikt objekt

Hur projektet byggs och körs:
1. Ladda ner projektet till din dator och öppna med Visual Studio Code
2. Öppna terminalen och ladda ner följande: npm install (om det inte fungerar) gå in i package.json för att installera 1. npm i express, 2. npm i nodemon, 3. npm i cors
3. Starta server med nodemon server.js eller npm start
4. Öppna products.rest för att testa endpoints
5. För att öppna frontend del klicka på "Open with Live Server" eller "Go Live" (tryck på client map)