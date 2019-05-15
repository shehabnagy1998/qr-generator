import React from 'react';
import QRCode from 'qrcode.react';
import img from '../assets/img.png';
import domtoimage from 'dom-to-image';

const List = ({ arr }) => {

    const handleDownload = item => {
        domtoimage.toJpeg(document.getElementById(item), { quality: 1 })
            .then(function (dataUrl) {
                var link = document.createElement('a');
                link.download = `${item}.jpeg`;
                link.href = dataUrl;
                link.click();
                console.log(dataUrl)
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
