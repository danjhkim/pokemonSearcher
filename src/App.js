import { useState } from 'react';
import { BrowserRouter as Browser, Route, Routes } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import './css/App.css';
import NavBar from './components/NavBar';
import Main from './components/Main';

function App() {
	const [step, setStep] = useState();
	const [cookies, setCookie, removeCookie] = useCookies(['user']);
	const [chosenPokemon, setChosenPokemon, removeChosenPokemon] = useCookies([
		'pokemon',
	]);
	const [stepCookie, setStepCookie, removeStepCookie] = useCookies(['step']);

	return (
		<div className='App'>
			<div className='wrapper'>
				<Browser>
					<NavBar
						cookies={cookies}
						removeCookie={removeCookie}
						removeChosenPokemon={removeChosenPokemon}
						removeStepCookie={removeStepCookie}
						setStep={setStep}
					/>
					<Routes>
						<Route
							path='/'
							element={
								<Main
									step={step}
									setStep={setStep}
									cookies={cookies}
									setCookie={setCookie}
									chosenPokemon={chosenPokemon}
									setChosenPokemon={setChosenPokemon}
									setStepCookie={setStepCookie}
									stepCookie={stepCookie}
								/>
							}
						/>
					</Routes>
				</Browser>
			</div>
		</div>
	);
}

export default App;
