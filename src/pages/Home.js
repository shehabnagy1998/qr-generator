import React, { useState } from 'react'
import Generate from '../components/Generate';
import List from '../components/List';
import ReactLoading from 'react-loading';

const Home = () => {

    const [arr, setArr] = useState([]);
    const [loading, setLoading] = useState(false);
    console.log(arr)

    return (
        <main>
            {loading && <div className="loading-container">
                <ReactLoading type={'spin'} width={'15%'} height={'15%'} color={'#fff'} className="loading-screen" />
            </div>}
            <Generate setArr={setArr} arr={arr} setLoading={setLoading} />
            <List arr={arr} setLoading={setLoading} />
        </main>
    )
}

export default Home
