import React, { useState, useEffect ,useId} from "react";

//INTERNAL IMPORT
import {
  Header,
  Footer,
  HeroSection,
  About,
  AboutRight,
  AboutThird,
  Faq,
  Feature,
  Info,
  Price,
  Service,
  Tap,
  Testimonial,
} from "../Components/Home/index";
import { useStateContext } from "../Context/index";

const index = () => {
  const { listMembership } = useStateContext();
let unique_id = useId();
  return (
    <div>
      {/* <button onClick={() => listMembership()}>LIST MEMBERSHIP</button> */}
      <Header />
      <HeroSection />
      <Service />
      <About />
      <AboutRight />
      <AboutThird />
      <Feature />
      <Price />
      <Faq />
      <Info />
      <Footer />
    </div>
  );
};

export default index;
