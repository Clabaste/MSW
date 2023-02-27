# Setup: Mock Service Worker

[https://mswjs.io/](https://mswjs.io/docs/getting-started/install)
```
npm install msw --save-dev
```
#### define mocks
## Mock type REST API

Erstelle einen "mocks" Ordner:
```
mkdir src/mocks
```
Erzeuge eine handlers.js Datei im "mocks" Ordner
```
touch src/mocks/handlers.js
```
Befülle deine Handler wie [hier](https://mswjs.io/docs/getting-started/mocks/rest-api) beschrieben, oder wie im Beispiel

## [Setup](https://mswjs.io/docs/getting-started/integrate/browser)
 Für einen "Service Worker" wählst du die 
[clientseitige Integation im Browser](https://mswjs.io/docs/getting-started/integrate/browser)
 


Die MSW-CLi erzeugt Deinen "worker"
```
npx msw init ./public/ --save
```

Danach: Erzeuge eine browser.js Datei im "mocks" Ordner
```
touch src/mocks/browser.js
```
und erstelle hier eine Instanz des workers:

```
// src/mocks/browser.js
import { setupWorker } from 'msw'
import { handlers } from './handlers'
// This configures a Service Worker with the given request handlers.
export const worker = setupWorker(...handlers)
```

## Starte den Worker:
Importiere deinen Worker in einer übergeordneten JS-Datei (oder wo immer du ihn benutzen willst)

```
// src/main.js
import { worker } from './mocks/browser';

//Check environment
if (import.meta.env.DEV) {
  worker.start();
}
```
