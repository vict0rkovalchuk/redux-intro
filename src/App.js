import { useSelector } from "react-redux";

import CreateCustomer from "./features/customers/CreateCustomer";
import Customer from "./features/customers/Customer";
import AccountOperations from "./features/accounts/AccountOperations";
import BalanceDisplay from "./features/accounts/BalanceDisplay";

function App() {
  const customer = useSelector(({ customer: { fullName } }) => fullName);

  return (
    <div>
      <h1>🏦 The React-Redux Bank ⚛️</h1>
      {!customer ? 
        <CreateCustomer /> : 
        <>
          <Customer />
          <AccountOperations />
          <BalanceDisplay />
        </>
      }
    </div>
  );
}

export default App;
