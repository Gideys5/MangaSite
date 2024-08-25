Resoconto del Progresso Finora
Inizializzazione del Progetto:

Creazione dell'applicazione React utilizzando create-react-app.

Strutturazione delle componenti principali: Navbar, Home, Carrello, ecc.

Configurazione del routing con React Router per navigare tra le diverse pagine.

Gestione dello Stato Globale:
Implementazione del CartContext per gestire il carrello in tutta l'applicazione.

Funzionalità di aggiunta e rimozione di elementi dal carrello.

Integrazione di EmailJS:
Configurazione dell'invio di email utilizzando EmailJS.

Integrazione con il carrello per inviare un'email all'utente con i dettagli dell'ordine.

API Integration (parzialmente affrontata):
Tentativo di integrazione dell'API Jikan per ottenere dettagli sui manga.

Problemi di CORS che hanno causato la sospensione temporanea di questa funzionalità.

Navigazione dopo l'ordine:
Implementazione della funzionalità di navigazione automatica alla home dopo l'invio di un ordine.

`**Prossimi Passi:**
`

Introduzione a Redux:

Cos'è Redux?
Configurazione di Redux nel progetto.
Creazione di azioni, riduttori (reducers) e lo store globale.
Gestione dello stato del carrello con Redux.
Autenticazione Utente:

Implementazione dell'autenticazione usando Firebase.
Creazione di un sistema di login e registrazione.
Protezione delle rotte (es. Checkout) per utenti autenticati.
Integrazione del Database:

Collegamento a un database NoSQL (Firebase Firestore) per gestire gli ordini.
Salvataggio e recupero dei dati degli utenti e degli ordini.
Deployment su Firebase:

Configurazione e setup dell'hosting su Firebase.
Deployment dell'applicazione e gestione delle versioni.
Verifica che tutte le funzionalità siano correttamente integrate e funzionanti.


-REfresh della pagina non ti deve portare al login
-Controllo variabili (trama e volumi (errore unkonow))
-Persistenza del carello anche dopo il logout
-Migliorie estetiche con bootstrap / tutorial login e signup
-Hosting online dell'app
-Efficienza del codice e pulizia di esso