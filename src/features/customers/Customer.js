import { useSelector } from "react-redux";

function Customer() {
  const customer = useSelector(({ customer: { fullName } }) => fullName);

  return <h2>👋 Welcome, {customer}</h2>;
}

export default Customer;
