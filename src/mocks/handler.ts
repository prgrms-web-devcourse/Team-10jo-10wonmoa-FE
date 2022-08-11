import loginHandlers from './handlers/Users';
import incomesHandlers from './handlers/Incomes';
import expenditures from './handlers/Expenditures';
import categoryHandlers from './handlers/Category';
import errorHandlers from './handlers/Error';
import budgetHandlers from './handlers/Budget';
const handlers = [
  ...loginHandlers,
  ...incomesHandlers,
  ...expenditures,
  ...categoryHandlers,
  ...errorHandlers,
  ...budgetHandlers,
];

export default handlers;
