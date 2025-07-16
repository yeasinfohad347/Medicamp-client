import React from 'react';
import Banner from './Banner';
import PopularCamp from './PopularCamp';
import Feedback from './Feedback';
import FAQ from './FAQ';
import { Helmet } from 'react-helmet-async';

const Home = () => {
    return (
        <div>
            <Helmet><title>Home</title></Helmet>
            <Banner/>
            <PopularCamp/>
            <Feedback/>
            <FAQ/>
        </div>
    );
};

export default Home;