import { Route, Routes, Link, BrowserRouter as Router } from 'react-router-dom';
import Home from './component/Home';
import Header from './component/Header';
import {FilterPokemon} from './component/FilterPokemon'
import {Pokemon} from './component/Pokemon'
import Footer from './component/Footer';


const App = () => {

  return (
    <>
      <Router>
        <div className='flex flex-col min-h-screen'>
          <Header/>
          
          <main className='flex-grow'>
            <div className='links'>
              <Routes>
                <Route path="/" element={<Home />}/>
                <Route path="/pokemon/type/:type" element={<FilterPokemon />}/>
                <Route path="/pokemon/name/:name" element={<Pokemon />}/>
              </Routes>
            </div>
          </main>
          
        <Footer />
        </div>
      </Router>
    </>
  )
}

export default App;
