import { useEffect, useState } from 'react';
import { pokeapi } from '../api';
import '../css/Details.css';

const Details = ({
	setChosenPokemon,
	setStep,
	params,
	setStepCookie,
	stepCookie,
}) => {
	const [pokemon, setPokemon] = useState('');

	useEffect(() => {
		// logic for using params in cookie if exists
		let id;
		if (stepCookie.params === undefined) {
			id = params;
		} else {
			id = stepCookie.params;
		}

		(async () => {
			try {
				const data = await fetch(pokeapi + id);
				const pokemon = await data.json();
				setPokemon(pokemon);
			} catch (err) {
				console.log(err);
			}
		})();
	}, [params, stepCookie.params]);

	const renderStats = () => {
		return pokemon.stats.map((item, index) => {
			return (
				<div className='stats' key={index}>
					<span>{item.stat.name}</span>: <span>{item.base_stat}</span>
				</div>
			);
		});
	};

	const confirm = name => {
		let stringdata = JSON.stringify(name);
		setChosenPokemon('pokemon', stringdata, { path: '/' });
		setStep(4);
		setStepCookie('step', 4, { path: '/' });
	};

	const capitalize = s => {
		return s[0].toUpperCase() + s.slice(1);
	};

	const renderPokemon = () => {
		if (pokemon) {
			return (
				<div className='backBox'>
					<div className='detailsBox'>
						<h1>{capitalize(pokemon.name)}</h1>
						<h2>Height: {pokemon.height}</h2>
						<h2>Weight: {pokemon.weight}</h2>
						<h2>Stats:</h2>
						<div>{pokemon.stats ? renderStats() : null}</div>
						<div className='pokemonImage'>
							{pokemon.sprites.front_default === undefined ? (
								<img
									alt={pokemon.name}
									src={pokemon.sprites.back_default}
								/>
							) : (
								<img
									alt={pokemon.name}
									src={pokemon.sprites.front_default}
								/>
							)}
						</div>
						<div className='buttonBoxDetails'>
							<button
								className='btn marg-1'
								onClick={e => setStep(2)}>
								Back
							</button>
							<button
								className='btn'
								onClick={e => confirm(pokemon.name)}>
								Choose
							</button>
						</div>
					</div>
				</div>
			);
		} else {
			<div>Loading...</div>;
		}
	};

	return <div className='detailsBorder'>{renderPokemon()}</div>;
};

export default Details;
