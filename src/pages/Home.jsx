import React from 'react';
import Banner from './Banner';
import PopularCamp from './PopularCamp';
import Feedback from './Feedback';
import FAQ from './FAQ';
import { Helmet } from 'react-helmet-async';
import ServicesSection from './ServicesSection';
import Newsletter from './Newslatter';
import MeetSpecialists from './MeetSpecialists';
import ImpactSection from './ImpactSection';


const Home = () => {
    return (
        <div className='bg-primary/10'>
            <Helmet><title>Home</title></Helmet>
            <Banner/>
            <PopularCamp/>
            <ServicesSection/>
            <Feedback/>
            <MeetSpecialists/>
           <ImpactSection/>
            <FAQ/>
            <Newsletter/>
        </div>
    );
};

export default Home;