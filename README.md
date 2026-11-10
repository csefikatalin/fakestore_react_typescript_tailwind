# FakeStore webáruház  React + TypeScript használatával

Ebben a projektben a [Fake Store API](https://fakestoreapi.com/products) termékeit kérjük le, majd React-alkalmazásban használjuk fel. 

Előzetes ismeretek: 
- komponens
- props
- state
- context

A webáruházban a termékek nem a projekt egyik fájljában vannak felsorolva, hanem egy külső végpontról kérjük le őket. Az adatlekérés időt vesz igénybe, és akár sikertelen is lehet.

A feladatot ezért három részre bontjuk:

1. **Típus (`types`)**: milyen adatokat tartalmaz egy termék?
2. **Szolgáltatás (`services`)**: honnan és hogyan szerezzük meg az adatokat?
3. **Context (`contexts`)**: hol tároljuk a lekért adatokat, hogy a komponensek elérjék őket?

Az adat útja:

```text
Fake Store API
     |
     | HTTP-kérés: fetch()
     v
services/productService.ts
     |
     | getProducts()
     v
contexts/ProductContext.tsx
     |
     | setProducts(...)
     v
React-komponensek (a Contexten keresztül)
```

**Fontos:** a services réteg nem React-specifikus. A service-függvénynek nem kell tudnia, melyik komponens fogja használni az adatokat.


## 2. A termék típusának külön fájlba helyezése

**Fájl: `types/ProductType.ts`**


```ts
export interface ProductType {
    id: number;
    title: string;
    price: number;
    description: string;
    category: string;
    image: string;
    rating: {
        rate: number;
        count: number;
    };
}
```
## 3. A services réteg

**Fájl: `services/productService.ts`**

A services mappa olyan függvényeket tartalmaz, amelyek külső szolgáltatásokkal, például egy webes API-val kommunikálnak.

A tavaly megismert kód:

```js
fetch('https://fakestoreapi.com/products')
    .then(response => response.json())
    .then(data => console.log(data));
```

Most ugyanazt az adatlekérést egy **újrafelhasználható függvénybe** szervezzük.


```ts
import type { ProductType } from "../types/ProductType";

const API_URL = "https://fakestoreapi.com/products";

export function getProducts() {
    return fetch(API_URL)
        .then(response => response.json());
}
```


**`const API_URL = ...`** – egy helyen tároljuk a végpont címét. Ha később másik API-t használunk, könnyebb módosítani.

**`export function getProducts()`** – a függvényt más fájlokból is importálhatjuk. A neve azt fejezi ki, hogy termékeket kér le.

**`fetch(API_URL)`** – HTTP-kérést küld az API-nak.

**`.then(response => response.json())`** – a szerver válaszának törzsét JSON-ból JavaScript-adattá alakítja. A `response.json()` maga is aszinkron művelet.

**`return`** – továbbadja az aszinkron művelet eredményét a függvény hívójának.

A függvény **nem azonnal egy terméktömböt**, hanem egy **PROMISE-t** ad vissza. Amikor az adatok megérkeznek, a hívó `.then()` segítségével dolgozhat velük.

### Típusmegadás – következő apró lépés

A feltöltött fájl importálja a `ProductType` típust, de **egyelőre nem használja**. Ha szeretnénk a service eredményének típusát is megadni, a `.then()`-es forma megtartásával ezt írhatjuk:

```ts
import type { ProductType } from "../types/ProductType";

const API_URL = "https://fakestoreapi.com/products";

export function getProducts(): Promise<ProductType[]> {
    return fetch(API_URL)
        .then(response => response.json());
}
```

A `Promise<ProductType[]>` jelentése: **a függvény később egy `ProductType` elemekből álló tömböt szolgáltat**.

## 4. A Context

**Fájl: `contexts/ProductContext.tsx`**

A Context célját már ismerjük: több komponens számára biztosít közös adatokat anélkül, hogy minden köztes komponensen `props` segítségével kellene továbbadni őket.

A feltöltött Contextben három érték szerepel:

```tsx
interface ProductContextType {
    products: ProductType[],
    load: boolean,
    error: string | null,
}
```

- **`products`**: a terméklista.
- **`load`**: jelzi, hogy tart-e az adatbetöltés.
- **`error`**: hibaüzenet vagy `null`, ha nincs hiba.

A Context létrehozása:

```tsx
const ProductContext =
    createContext<ProductContextType | undefined>(undefined);
```

Az `undefined` azért szerepel, mert Provider nélkül nincs biztosított Context-érték. A saját `useProductContext()` Hook ezt ellenőrzi, és érthető hibát dob, ha valaki a Provideren kívül próbálja használni.

### A három state

```tsx
const [products, setProducts] = useState<ProductType[]>([]);
const [load, setLoad] = useState(true);
const [error, setError] = useState<string | null>(null);
```

**Miért üres a `products` kezdetben?** Mert az alkalmazás indulásakor az API-tól még nem érkeztek meg az adatok.

**Miért `true` a `load`?** Mert a betöltés kezdetben folyamatban van.

**Miért `null` az `error`?** Mert induláskor még nincs ismert hiba.

A Provider átadja ezeket az értékeket a gyermekkomponenseknek:

```tsx
<ProductContext.Provider value={{ products, load, error }}>
    {children}
</ProductContext.Provider>
```

**Fontos:** a Context önmagában **nem kér le adatokat**. A lekérés a Providerben található `useEffect` segítségével indul el.

---

## 5. Új React Hook: `useEffect`

A `useEffect` segítségével olyan műveleteket indíthatunk, amelyek a Reacten kívüli világgal kapcsolják össze a komponenst. Ilyen például a **szerverről történő adatlekérés**.


```tsx
useEffect(() => {
    getProducts().then(adatok => setProducts(adatok));
}, []);
```

Lépésenként:

1. A React megjeleníti a Providert.
2. A `useEffect` lefut a megjelenítés után.
3. Meghívja a service `getProducts()` függvényét.
4. A kérés aszinkron módon zajlik.
5. Amikor az adatok megérkeznek, a `.then()` megkapja őket.
6. A `setProducts(adatok)` frissíti a state-et.
7. A React újrarenderel, és a termékeket használó komponensek megkapják a friss listát.

### A `useEffect` felépítése

```tsx
useEffect(() => {
    // Az effektus műveletei
}, []);
```

Az első paraméter egy függvény: **mit csináljon az effektus?**

A második paraméter a **függőségi tömb**: **mely értékek változásakor kell újra lefutnia?**

| Példa | Jelentés |
|---|---|
| `useEffect(() => { ... }, [])` | A komponens csatlakoztatásakor fut; változó függősége nincs |
| `useEffect(() => { ... }, [category])` | Kezdetben és a `category` változásakor fut |
| `useEffect(() => { ... })` | Minden renderelés után lefut |

Az üres `[]` **nem azt jelenti, hogy a kód minden körülmények között pontosan egyszer fut le**. Fejlesztői módban a React `StrictMode` ellenőrzésként ismételten elindíthatja az effektust. Ezzel később részletesebben is foglalkozhatunk.

### Miért nem írjuk a `fetch()` hívást közvetlenül a komponens törzsébe?

**Hibás megközelítés:**

```tsx
function ProductProvider({ children }: { children: ReactNode }) {
    const [products, setProducts] = useState<ProductType[]>([]);

    getProducts().then(data => setProducts(data));

    // ...
}
```

A komponens függvénye minden rendereléskor újra lefut. Ha itt indítjuk az adatlekérést, az állapotfrissítés újabb renderelést, az újabb renderelés pedig újabb kérést okozhat.

**Helyes kiindulás:** a lekérést `useEffect`-be tesszük.

## 6. Hibakezelés

- Service: észleli, ha nem sikerült lekérni az adatokat, és hibát jelez.
- Context: elkapja a hibát, és eltárolja a hibaüzenetet a error state-ben.
- Komponens: megjeleníti a hibaüzenetet a felhasználónak.

1. A services réteg módosítása
A productService.ts fájlban:

``` javascript
const API_URL = "https://fakestoreapi.com/products";

export function getProducts() {
    return fetch(API_URL)
        .then(response => {
            if (!response.ok) {
                throw new Error("Failed to fetch products");
            }

            return response.json();
        });
}
```

Itt egy új dolgot vezettünk be: a response.ok tulajdonságot.

Ez true, ha a HTTP-válasz sikeres (200–299 közötti státuszkód), egyébként false.

Ha a válasz sikertelen, a throw new Error(...) hibát dob. Ettől a Promise-lánc elutasított állapotba kerül, amelyet a Contextben a .catch() segítségével kezelhetünk.

2. Hibakezelés a Contextben

``` javascript
useEffect(() => {
    getProducts()
        .then(data => {
            setProducts(data);
            setError(null);
        })
        .catch(() => {
            setError("Nem sikerült betölteni a termékeket!");
        })
        .finally(() => {
            setLoad(false);
        });
}, []);
``` 

Mit csinál a három metódus?

.then()	   - Sikeres lekérés esetén eltárolja a termékeket.
.catch()   - Hiba esetén eltárol egy hibaüzenetet.
.finally() - Sikeres és sikertelen lekérés után is lezárja a betöltési állapotot.

A finally() különösen hasznos, mert a setLoad(false) utasítást nem kell külön elhelyezni a sikeres és a sikertelen ágban.

3. A hibakezelés megjelenítése
Most készítsünk egy egyszerű ProductsCards.tsx komponenst:

``` javascript
import { useProductContext } from "../contexts/ProductContext";

function ProductList() {
    const { products, load, error } = useProductContext();

    if (load) {
        return <p>Termékek betöltése...</p>;
    }

    if (error) {
        return <p className="error">{error}</p>;
    }

    return (
        <div>
            products.map((product, i) => {
               return <ProductsCard  product={product} key={i} />
        }
        </div>
    );
}

export default ProductList;
``` 