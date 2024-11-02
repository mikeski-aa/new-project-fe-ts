function OrderItemComponent({ date, total }: { date: Date; total: number }) {
  return (
    <div className="orderItemContainer">
      <div className="orderMoreInfo">{`${date}`}</div>
      <div className="orderMoreInfo">{`${total}`}</div>
      <button className="orderButtonThing">More</button>
    </div>
  );
}

export default OrderItemComponent;
