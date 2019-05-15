import React, { useState } from 'react'
import Generate from '../components/Generate';
import List from '../components/List';

const Home = () => {

    const [arr, setArr] = useState([]);
    console.log(arr)

    return (
        <main>
            <Generate setArr={setArr} arr={arr} />
            <List arr={arr} />
        </main>
    )
}

export default Home
