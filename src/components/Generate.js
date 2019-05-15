import React, { useRef } from 'react'
import uuidv1 from 'uuid/v1';
import domtoimage from 'dom-to-image';
import saveAs from 'file-saver';

const Generate = ({ arr, setArr }) => {

    const inputRef = useRef(null);

    const handleSubmit = e => {
        e.preventDefault();
        const newArr = Array.from({ length: inputRef.current.value }, e => uuidv1().split('-')[0]);
        setArr(newArr);
    }

    const handleSaveAll = () => {
        arr.map(item => {
            domtoimage.toBlob(document.getElementById(item))
                .then(function (blob) {
                    saveAs(blob, 'card.png');
                });
        })
    }

    return (
        <article className="container">
            <section className="row">
                <h1 className="display-3 mx-auto my-3">Enter Number</h1>
            </section>
            <section className="row">
                <form className="col-12 col-lg-8 mx-auto d-flex" onSubmit={handleSubmit}>
                    <input ref={inputRef} className="form-control mr-3" type="number"
                        placeholder="How much U want" />
                    <input className="btn btn-primary"
                        type="submit" value="Generate" />
                </form>
            </section>
            {arr.length >= 1 && <section className="row flex-column align-items-center">
                <p className="text-muted">{arr.length} QR Generated</p>
                <div className="col-lg-8 mb-3">
                    <button className="btn btn-danger btn-block" onClick={handleSaveAll}>Save</button>
                </div>
            </section>}
        </article>
    )
}

export default Generate
