const Card = ({ title, value, icon }) => (
    <div className="card border border-white bg-white rounded-lg p-4 shadow-md">
      <div className="card-header">
        <h3>{title}</h3>
        {icon}
      </div>
      <div className="card-content">
        <div className="text-4xl font-bold text-black">{value}</div>
        <p className="text-xs text-muted-foreground">+20% from last month</p>
      </div>
    </div>
  );
  
  export default Card;
  