import loginHandlers from './handlers/Users';
import incomesHandlers from './handlers/Incomes';
import expenditures from './handlers/Expenditures';
import categoryHandlers from './handlers/Category';
import budgetHandlers from './handlers/Budget';
import errorHandlers from './handlers/Error';

const handlers = [
  ...loginHandlers,
  ...incomesHandlers,
  ...expenditures,
  ...categoryHandlers,
  ...budgetHandlers,
  ...errorHandlers,
];

export default handlers;
