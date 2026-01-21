import React from 'react';
import './Collab.css';

import Banner from './Banner';

const Collab = () => {
    return (
        <section id="collab" className="collab-section section-padding">
            <div className="container">
                <div className="collab-content">
                    <Banner />
                    <h2 className="collab-title">Collab / Proposal</h2>
                    <a href="mailto:hello@sayak.design" className="collab-cta">
                        Let's Create Something
                    </a>
                </div>
            </div>
        </section>
    );
};

export default Collab;
