import AreaCard from "./AreaCard";
import "./AreaCards.scss";

const AreaCards = () => {
  return (
    <section className="content-area-cards">
      <AreaCard
        colors={["#e4e8ef", "#475be8"]}
        percentFillValue={80}
        cardInfo={{
          title: "Week 1",
          value: "$35.00",
          text: "Product sold 1579 items.",
        }}
      />
      <AreaCard
        colors={["#e4e8ef", "#4ce13f"]}
        percentFillValue={50}
        cardInfo={{
          title: "Todays Sold",
          value: "$66.00",
          text: "4390 Cups",
        }}
      />
      <AreaCard
        colors={["#e4e8ef", "#f29a2e"]}
        percentFillValue={40}
        cardInfo={{
          title: "In Target",
          value: "-$45.00",
          text: "7000",
        }}
      />
    </section>
  );
};

export default AreaCards;
