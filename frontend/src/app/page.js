import styles from "./page.module.css";
import SnackbarToast from "../Components/Snackbar.js";
import LoggedinToast from "../Components/LoggedinToast.js";
import ImageSlider from "../Components/ImageSlider.js";
import CardSlider from "../Components/CardSlider.js";

import ProductCard from "../Components/ProductCard.js";

const Home = async () => {
  return (
    <>
      <LoggedinToast />
      <SnackbarToast />
      <CardSlider />
      <ImageSlider />
      <ProductCard />
    </>
  );
};

export const metadata = {
  title: "Home",
};


export default Home;
