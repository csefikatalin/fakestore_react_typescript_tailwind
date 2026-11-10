
import './App.css'
import ProductsCards from './components/ProductsCards'

function App() {
 

  return (
    <>


     <main className="min-h-screen bg-slate-100 p-8">
            <h1 className="text-4xl font-bold text-blue-800 mb-6">
                Webáruház
            </h1>

           
                <ProductsCards/>
        </main>
    </>
  )
}

export default App
