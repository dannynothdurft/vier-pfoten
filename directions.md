# Anleitung zum Projekt

Da jetzt das Projekt eine URL hat müssen wir jetzt paar Punkte beachten.

## Style Regeln

    Mobile first

## Neue Aufgabe

Für neue Aufgabe legen wir eine neue brach aus main an.

    z. B.
    feature/vp-001

Wenn das Ticket fertig ist wird diese ersteinmal in die Stage gemercht und getestet.
Erst dann wenn keine Probleme sind wird das Ticket in die main gemercht.

## MongoDB local neu starten

brew services stop mongodb-community
brew services start mongodb-community
