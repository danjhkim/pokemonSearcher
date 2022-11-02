import { useEffect, useState } from 'react';
import { pokeapi } from '../api';
import '../css/Pokemon.css';

const Pokemon = ({
	setPokemonList,
	pokemonList,
	setStep,
	setParams,
	setStepCookie,
}) => {
	const [search, setSearch] = useState('');
	const [filteredList, setFilteredList] = useState([]);

	useEffect(() => {
		//immediate api call for list of all pokemon (requird to enable client side search feature)

		(async () => {
			try {
				const data = await fetch(pokeapi + '?limit=1154');
				const pokemon = await data.json();
				setPokemonList(pokemon.results);
			} catch (err) {
				console.log(err);
			}
		})();
	}, [setPokemonList, setStepCookie]);

	const submitSearch = e => {
		// on search submit
		e.preventDefault();
		if (search.length) {
			const filteredPokemon = pokemonList.filter(pokemon => {
				return pokemon.name
					.toLowerCase()
					.includes(search.toLowerCase());
			});

			setFilteredList(filteredPokemon);
		}
	};

	const stepChange = paramString => {
		// on clicking specific pokemon name
		setParams(paramString);
		setStep(3);
		setStepCookie('step', 3, { path: '/' });
		setStepCookie('params', paramString, { path: '/' });
	};

	const renderlist = () => {
		return filteredList.map(item => {
			let paramString = item.url.split('/pokemon/')[1];

			return (
				<div className='pokeDiv' key={item.name}>
					<div onClick={e => stepChange(paramString)}>
						{item.name}
					</div>
				</div>
			);
		});
	};

	const pokeSearch = () => {
		if (pokemonList) {
			return (
				<>
					<form
						onSubmit={e => submitSearch(e)}
						className='inputSearch'>
						<input
							type='text'
							onChange={e => setSearch(e.target.value)}
							value={search}
						/>
					</form>
				</>
			);
		} else {
			return <div>Loading...</div>;
		}
	};

	return (
		<div className='pokesearch'>
			<h1>Search a pokemon's name!</h1>
			{pokeSearch()}
			{filteredList.length ? <h3>Pick a pokemon</h3> : null}
			{filteredList.length ? (
				<div className='pokeBorder'>{renderlist()}</div>
			) : null}
		</div>
	);
};

export default Pokemon;
