# Tailwind

Egy bootstraphez ahsonló css keretrendszer.
Dokumentáció:

https://tailwindcss.com/docs/installation/using-vite

telepítése:

```
npm install tailwindcss @tailwindcss/vite
```

Ez két csomagot telepít:

- tailwindcss: maga a CSS-keretrendszer.
- @tailwindcss/vite: a Tailwind és a Vite összekapcsolásához szükséges bővítmény.

2. A vite.config.ts módosítása
   A projekt gyökerében keresd meg a vite.config.ts fájlt.

Egészítsd ki a Tailwind bővítménnyel:

```
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss()
  ],
})
```

3. A CSS-fájl módosítása
   Nyisd meg az src/index.css fájlt, és írd az elejére (A többi formázást akár törölheted is!):

```
@import "tailwindcss";
```

# Legfontosabb osztálynevek

## 1. Display és elrendezési mód

| Osztály  | CSS-nek megfelelő hatás | Mire jó?                                |
| -------- | ----------------------- | --------------------------------------- |
| `block`  | `display: block`        | Blokkszintű elem                        |
| `inline` | `display: inline`       | Szövegen belüli elem                    |
| `hidden` | `display: none`         | Elem elrejtése                          |
| `flex`   | `display: flex`         | Egydimenziós elrendezés                 |
| `grid`   | `display: grid`         | Sorokból és oszlopokból álló elrendezés |

## 2. Flexbox – irány, igazítás, tördelés

| Osztály           | Jelentés                                       |
| ----------------- | ---------------------------------------------- |
| `flex-row`        | Elemek egymás mellett (alapértelmezett irány)  |
| `flex-col`        | Elemek egymás alatt                            |
| `flex-wrap`       | Az elemek új sorba törhetnek                   |
| `justify-start`   | Főtengely mentén az elejére                    |
| `justify-center`  | Főtengely mentén középre                       |
| `justify-between` | Széthúzza az elemeket a főtengelyen            |
| `items-start`     | Kereszttengely mentén az elejére               |
| `items-center`    | Kereszttengely mentén középre                  |
| `items-stretch`   | Kereszttengely mentén nyújtás                  |
| `flex-1`          | Az elem kitöltheti a rendelkezésre álló helyet |
| `grow`            | Az elem növekedhet                             |
| `shrink-0`        | Az elem ne zsugorodjon                         |

**Példa: kép középre igazítása**

```tsx
<div className="flex items-center justify-center h-56">
  <img
    src={product.image}
    alt={product.title}
    className="max-h-full object-contain"
  />
</div>
```

A `justify-center` a főtengelyen, az `items-center` a kereszttengelyen igazít. `flex-row` esetén a főtengely vízszintes, `flex-col` esetén függőleges.

## 3. Grid – oszlopok és térközök

| Osztály       | Jelentés                         |
| ------------- | -------------------------------- |
| `grid-cols-1` | Egy oszlop                       |
| `grid-cols-2` | Két egyenlő oszlop               |
| `grid-cols-3` | Három egyenlő oszlop             |
| `grid-cols-4` | Négy egyenlő oszlop              |
| `col-span-2`  | Az elem két oszlopot foglal el   |
| `gap-4`       | Sorok és oszlopok közötti térköz |
| `gap-6`       | Nagyobb térköz                   |
| `gap-x-4`     | Csak vízszintes térköz           |
| `gap-y-6`     | Csak függőleges térköz           |

**A webáruház terméklistája:**

```tsx
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
  {products.map((product) => (
    <ProductsCard key={product.id} product={product} />
  ))}
</div>
```

## 4. Reszponzivitás – töréspontok

A Tailwind **mobile-first**: az előtag nélküli osztály minden méretre érvényes, az előtagos változat pedig a megadott képernyőszélességtől kezdve.

| Előtag  | Alapértelmezett minimum szélesség |
| ------- | --------------------------------- |
| (nincs) | Minden méret                      |
| `sm:`   | 640 px                            |
| `md:`   | 768 px                            |
| `lg:`   | 1024 px                           |
| `xl:`   | 1280 px                           |
| `2xl:`  | 1536 px                           |

Például a `grid-cols-1 sm:grid-cols-2 lg:grid-cols-3` azt jelenti: mobilon egy, 640 px-től kettő, 1024 px-től három oszlop. A `sm:` **nem** azt jelenti, hogy „csak kis képernyőn”.

## 5. Méretek, szélesség, magasság

| Osztály           | Jelentés                                                    |
| ----------------- | ----------------------------------------------------------- |
| `w-full`          | Szélesség: 100%                                             |
| `h-full`          | Magasság: 100%                                              |
| `h-56`            | Rögzített magasság: 14rem                                   |
| `min-h-screen`    | Legalább a képernyő magassága                               |
| `max-w-7xl`       | Maximális konténerszélesség: 80rem                          |
| `max-w-full`      | Maximális szélesség: 100%                                   |
| `max-h-full`      | Maximális magasság: 100%                                    |
| `overflow-hidden` | Kilógó tartalom elrejtése                                   |
| `object-contain`  | A teljes kép belefér a rendelkezésre álló területbe         |
| `object-cover`    | A kép kitölti a területet, szükség esetén levágva a széleit |

## 6. Padding, margin és középre igazítás

A Tailwind alapértelmezett térközskáláján `1` = `0.25rem` (jellemzően 4 px), `4` = `1rem` (16 px), `6` = `1.5rem` (24 px), `8` = `2rem` (32 px).

| Osztály         | Jelentés                                                                           |
| --------------- | ---------------------------------------------------------------------------------- |
| `p-4`           | Belső térköz minden oldalon                                                        |
| `px-4`          | Belső térköz balra és jobbra                                                       |
| `py-8`          | Belső térköz felül és alul                                                         |
| `pt-4` / `pb-4` | Felső / alsó belső térköz                                                          |
| `m-4`           | Külső margó minden oldalon                                                         |
| `mb-6`          | Alsó margó                                                                         |
| `mt-auto`       | Automatikus felső margó: flex oszlopban lefelé tolhatja az elemet                  |
| `mx-auto`       | Automatikus bal és jobb margó: adott szélességű blokk vízszintes középre igazítása |

**Fontos különbség:** a `gap` a flex/grid elemek _közötti_ térközt adja; a `padding` az elem _belsejében_, a `margin` az elem _külsején_ képez helyet.

## 7. Kártyák kialakításához hasznos osztályok

| Osztály                     | Jelentés                                   |
| --------------------------- | ------------------------------------------ |
| `bg-white`                  | Fehér háttér                               |
| `border`                    | Keret                                      |
| `border-gray-200`           | Világosszürke keret                        |
| `rounded-lg` / `rounded-xl` | Lekerekített sarkok                        |
| `shadow-md` / `shadow-xl`   | Közepes / erős árnyék                      |
| `hover:shadow-xl`           | Erősebb árnyék rámutatáskor                |
| `transition-shadow`         | Árnyékváltozás animálása                   |
| `duration-300`              | Átmenet időtartama: 300 ms                 |
| `text-center`               | Szöveg középre igazítása                   |
| `line-clamp-2`              | Szöveg megjelenítése legfeljebb két sorban |

## A tailwind személyre szabása

Az src/index.css fájlban:

```css
@import "tailwindcss";

@theme {
  /* Saját színpaletta létrehozása */
  --color-primary: #263b53;
  --color-primary-light: #385775;
  --color-accent: #e8a838;
  --color-page: #f3f5f8;
  --color-surface: #ffffff;
  --color-danger: #b42318;
}
/* Saját betűtípusok, lekerekítések és árnyékok */
@theme {
  --font-shop: "Segoe UI", Arial, sans-serif;
  --radius-card: 1rem;
  --shadow-card: 0 4px 12px rgb(0 0 0 / 0.12);
}
```
