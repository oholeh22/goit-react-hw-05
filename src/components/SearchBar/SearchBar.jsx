import css from './SearchBar.module.css'
import { useState } from 'react';

const notify = (message) => {
    toast(message, {
        duration: 2000, 
        position: 'top-right', 
        style: {
            borderRadius: '8px',
            background: '#333',
            color: '#fff',
        },
    });
};

const SearchBar = ({ setQuery }) => {
    const [input, setInput] = useState(''); 

    const handleSubmit = (event) => {
        event.preventDefault();
        
        if (input.trim() === '') {
            notify('Please enter a search term');
        } else {
            setQuery(input); 
            setInput(''); 
        }
    };

    return (
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    autoComplete="off"
                    autoFocus
                    placeholder="Search images"
                    className={css.input} 
                    value={input} 
                    onChange={(e) => setInput(e.target.value)} 
                />
                <button type="submit">Search</button>
            </form>
    )
};

export default SearchBar;