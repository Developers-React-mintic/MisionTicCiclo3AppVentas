const authLayout = ({ children }) => {
  return (
    <section className="section-login h-100">
      <div className="container h-100">
        <div className="row h-100">
          <div className="col h-100">{children}</div>
        </div>
      </div>
    </section>
  );
};

export default authLayout;
