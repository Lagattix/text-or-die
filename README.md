# Fuori l'ultimo

Un party game multiplayer locale: una persona crea una stanza, condivide il codice, gli altri entrano e a ogni round compare un prompt tipo `un frutto con la B`.

Chi risponde piu lentamente viene eliminato. L'ultimo rimasto vince.

## Avvio

```bash
npm start
```

Poi apri:

```text
http://localhost:4173
```

## Regole

- Il creatore della stanza avvia i round.
- Servono almeno 2 giocatori.
- La risposta deve iniziare con la lettera indicata.
- La classifica va dal piu lento al piu veloce.
- Il piu lento del round viene eliminato.

## Note

Il server usa solo Node.js standard, senza dipendenze esterne.
