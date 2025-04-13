import styles from "./about.module.css";
export const metadata = {
  title: "About",
};
const AboutPage = () => {
  return (
    <div className={styles.about}>
      <h1 className={styles.main__heading}>about us</h1>

      <div className={styles.about__us__para}>
        <p>
          At this web store, we are passionate about delivering top-quality
          products to our customers. Founded in 2024, our journey began with a
          simple idea: to provide an unmatched shopping experience. we take
          pride in offering a diverse range of products that meet the highest
          standards of quality. Our commitment to customer satisfaction is at
          the heart of everything we do. Thank you for choosing us, and we look
          forward to serving you.
        </p>
      </div>
    </div>
  );
};

export default AboutPage;
