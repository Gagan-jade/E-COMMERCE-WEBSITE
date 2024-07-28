import React from 'react';
import CategoryList from '../components/CategoryList';
import BannerProduct from '../components/BannerProduct';
import HorizontalCardProduct from '../components/HorizontalCardProduct';
import VerticalCardProduct from '../components/VerticalCardProduct';

const Home = () => {
  return (
    <div className="overflow-hidden">
      <CategoryList />
      <div className="w-full overflow-hidden">
        <BannerProduct />
      </div>

      <HorizontalCardProduct category="airpodes" heading="Trending Ear Buds" />
      <HorizontalCardProduct category="watches" heading="Popular Smart Watches" />

      <VerticalCardProduct category="mobiles" heading="Smart Phones" />
      <VerticalCardProduct category="Mouse" heading="Mouse" />
      <VerticalCardProduct category="televisions" heading="LED Televisions" />
      <VerticalCardProduct category="camera" heading="Camera & Photography" />
      <VerticalCardProduct category="earphones" heading="Head Phones" />
      <VerticalCardProduct category="speakers" heading="Bluetooth Speakers" />
      <VerticalCardProduct category="refrigerator" heading="Refrigerator" />
      <VerticalCardProduct category="trimmers" heading="Trimmers" />
    </div>
  );
}

export default Home;
