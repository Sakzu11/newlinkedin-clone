import "./Headeroption.css";

function Headeroption({ avatar, Icon, title, small }) {
  return (
    <div className="headeroption">
      {Icon && <Icon style={{ fontSize: small ? 20 : 22 }} />}
      {avatar && (
        <div className="headeroption__avatar">
          <img src={avatar} alt={title} />
        </div>
      )}
      <p className="headeroption__title">{title}</p>
    </div>
  );
}

export default Headeroption;
