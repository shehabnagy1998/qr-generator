import React, { useRef, useState } from 'react'
import uuidv1 from 'uuid/v1';
import domtoimage from 'dom-to-image';
import saveAs from 'file-saver';
import jszip from 'jszip';

const Generate = ({ arr, setArr }) => {

    const inputRef = useRef(null);
    const [loading, setLoading] = useState(false);

    const handleSubmit = e => {
        e.preventDefault();
        let num = inputRef.current.value;
        if (num <= 500) {
            const newArr = Array.from({ length: inputRef.current.value }, e => uuidv1().split('-')[0]);
            setArr(newArr);
        } else {
            alert('maximum number is 500 QR-Code');
        }
    }

    const handleSaveAll = () => {

        setLoading(true);
        let zip = new jszip();
        arr.map((item, index) => {
            return domtoimage.toJpeg(document.getElementById(item), { quality: 1 })
                .then(function (dataUrl) {

                    zip.file(`${item}.jpeg`, dataUrl.replace("data:image/jpeg;base64,", ""),
                        { base64: true });

                    if (index >= arr.length - 1) {
                        zip.generateAsync({ type: "blob" })
                            .then(function (content) {
                                saveAs(content, "cards.zip");
                                setLoading(false)
                            });
                    }
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
                    <button className="btn btn-danger btn-block" onClick={handleSaveAll}>{loading ? <span className="spinner-border text-light"></span> : ''} Save</button>
                </div>
            </section>}
        </article>
    )
}

export default Generate
