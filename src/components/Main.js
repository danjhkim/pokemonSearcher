import { useEffect, useState } from 'react';
import Final from './Final';
import Details from './Details';
import PokeForm from './PokeForm';
import Pokemon from './Pokemon';

const Main = ({
	step,
	setStep,
	cookies,
	setCookie,
	setChosenPokemon,
	chosenPokemon,
	setStepCookie,
	stepCookie,
}) => {
	const [pokemonList, setPokemonList] = useState([]);
	const [params, setParams] = useState('');

	useEffect(() => {
		if (stepCookie.step === undefined) {
			setStep(1);
		} else {
			setStep(Number(stepCookie.step));
		}

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	switch (step) {
		case 1:
			return (
				<PokeForm
					setStep={setStep}
					setCookie={setCookie}
					setStepCookie={setStepCookie}
				/>
			);
		case 2:
			return (
				<Pokemon
					setStep={setStep}
					setPokemonList={setPokemonList}
					pokemonList={pokemonList}
					setParams={setParams}
					setStepCookie={setStepCookie}
					stepCookie={stepCookie}
				/>
			);
		case 3:
			return (
				<Details
					setChosenPokemon={setChosenPokemon}
					setStep={setStep}
					params={params}
					setStepCookie={setStepCookie}
					stepCookie={stepCookie}
				/>
			);
		case 4:
			return (
				<Final
					setStep={setStep}
					chosenPokemon={chosenPokemon}
					cookies={cookies}
				/>
			);
		default:
			return (
				<PokeForm
					setStep={setStep}
					setCookie={setCookie}
					setStepCookie={setStepCookie}
				/>
			);
	}
};

export default Main;
