import React from 'react';
import QRCode from 'qrcode.react';
import img from '../assets/img.png';
import domtoimage from 'dom-to-image';
import saveAs from 'file-saver';

const List = ({ arr }) => {

    const handleDownload = item => {
        domtoimage.toBlob(document.getElementById(item))
            .then(function (blob) {
                saveAs(blob, 'card.png');
            });
    }

    return (
        <article className="container">
            <section className="row">
                {arr.map((item, index) => {
                    return <div key={index} className="col-lg-4 col-md-6 mb-3">
                        <div className="card" id={item} onClick={handleDownload.bind(this, item)}>
                            <img src={img} className="card-img-top" alt="..." />
                            <QRCode value={item} className="qr-code" />
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
