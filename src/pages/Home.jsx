import React from 'react';
import Banner from './Banner';
import PopularCamp from './PopularCamp';
import Feedback from './Feedback';
import FAQ from './FAQ';

const Home = () => {
    return (
        <div>
            <Banner/>
            <PopularCamp/>
            <Feedback/>
            <FAQ/>
        </div>
    );
};

export default Home;