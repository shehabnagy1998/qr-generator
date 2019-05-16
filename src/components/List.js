import React from 'react';
import QRCode from 'qrcode.react';
import img from '../assets/img.png';
import domtoimage from 'dom-to-image';

const List = ({ arr, setLoading }) => {

    function filter(node) {
        return (node.tagName !== 'i');
    }
    const handleDownload = item => {
        setLoading(true);
        domtoimage.toSvg(document.getElementById(item), { filter: filter })
            .then(function (dataUrl) {
                // data:image/svg+xml;charset=utf-8,
                var link = document.createElement('a');
                link.download = `${item}.svg`;
                link.href = dataUrl;
                link.click();
                setLoading(false)
            });
    }

    return (
        <article className="container">
            <section className="row">
                {arr.map((item, index) => {
                    return <div key={index} className="col-md-6 mb-3">
                        <div className="card" id={item} onClick={handleDownload.bind(this, item)}>
                            <img src={img} className="card-img-top" alt="..." />
                            <QRCode value={item} renderAs="svg" level="H" className="qr-code" />
                            <div className="card-body">
                                <h5 className="card-title">{item}</h5>
                            </div>
                        </div>
                    </div>
                })}
            </section>
        </article>
    )
}

export default List
