import { useState } from 'react';
import styles from './styles.module.css';

const getArrayBySizeAndValue = (size, value) => {
    return Array(size).fill(value);
}

const getArrayOfAllOnes = (size) => {
    const result = [];
    for (let i = 0; i < size; i++) {
        result.push(1);
    }
    return result;
}

const calculatePossibleOptions = (floors) => {
    if(!floors) {
        return;
    }
    const resultsArray = [];
    let currentNumberOfOnes = floors;
    let currentNumberOfTwos = 0;
    resultsArray.push(getArrayOfAllOnes(currentNumberOfOnes))
    
    while(currentNumberOfOnes > 1) {
        currentNumberOfOnes -= 2;
        currentNumberOfTwos += 1;
        const arrayToInsert = getArrayBySizeAndValue(currentNumberOfOnes, 1);
        for (let k = 0; k < currentNumberOfTwos; k++) {
            arrayToInsert.push(2);
        }
        resultsArray.push(arrayToInsert);
    }

    return resultsArray;
}

function CatsList() {
    const [floors, setFloors] = useState(0);
    const [inputValue, setInputValue] = useState('');
    const options = calculatePossibleOptions(floors);

    return (
    <div className={styles.catsList}>
        <div className={styles.listActions}>
            <input onChange={(e) => setInputValue(e.target.value)}></input>
            <button className={styles.listButton} onClick={(e) => setFloors(inputValue)}>Apply</button>
        </div>
        <ul className={styles.optionsList}>
            {options && options.length > 0 && options.map((option, index) => {
                return <li key={index}>{option.toString()}</li>
            })}
        </ul>
    </div>
    );
}

export default CatsList;
