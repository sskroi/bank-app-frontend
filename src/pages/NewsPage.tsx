import { Carousel, Container } from "react-bootstrap";
// @ts-ignore
import img1 from "../assets/news1.webp";
// @ts-ignore
import img2 from "../assets/news2.webp";
// @ts-ignore
import img3 from "../assets/news3.webp";

const NewsPage = () => {
  return (
    <Container className="d-flex justify-content-center align-items-center vh-100 flex-column gap-3">
      <h2 style={{ color: "var(--primary-text-color)" }}>Новости</h2>
      <Carousel>
        <Carousel.Item>
          <a href="https://www.rbc.ru/economics/30/05/2025/683994f09a794758a8b7de5d">
            <img src={img1} alt="" />
            <Carousel.Caption>
              <h5>
                Центробанк объяснил, почему для него инфляция важнее курса рубля
              </h5>
            </Carousel.Caption>
          </a>
        </Carousel.Item>
        <Carousel.Item>
          <a href="https://www.rbc.ru/economics/30/05/2025/683a0bfc9a79471804e1186e">
            <img src={img2} alt="" />
            <Carousel.Caption>
              <h5>
                Костин предложил «пари на 10 щелчков» о решении ЦБ по ставке
              </h5>
            </Carousel.Caption>
          </a>
        </Carousel.Item>
        <Carousel.Item>
          <a href="https://www.rbc.ru/rbcfreenews/682f335c9a79477da9e05e93">
            <img src={img3} alt="" />
            <Carousel.Caption>
              <h5>
                Лукашенко посоветовал всем сажать картофель со словами «еще
                время есть»
              </h5>
            </Carousel.Caption>
          </a>
        </Carousel.Item>
      </Carousel>
    </Container>
  );
};

export default NewsPage;
