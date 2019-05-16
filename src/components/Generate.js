import React, { useRef } from 'react'
import uuidv1 from 'uuid/v1';
import domtoimage from 'dom-to-image';
import saveAs from 'file-saver';
import jszip from 'jszip';

const Generate = ({ arr, setArr, setLoading }) => {

    const inputRef = useRef(null);

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

    function filter(node) {
        return (node.tagName !== 'i');
    }

    const handleSaveAll = () => {

        setLoading(true);
        let zip = new jszip();
        arr.map((item, index) => {
            return domtoimage.toSvg(document.getElementById(item), { filter: filter })
                .then(function (dataUrl) {

                    zip.file(`${item}.svg`, dataUrl.replace("data:image/svg+xml;charset=utf-8,", ""));

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
                <h1 className="title">Enter Number</h1>
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
