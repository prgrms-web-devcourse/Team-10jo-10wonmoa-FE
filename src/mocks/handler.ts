import loginHandlers from './handlers/Users';
import incomesHandlers from './handlers/Incomes';
import expenditures from './handlers/Expenditures';
import categoryHandlers from './handlers/Category';
import budgetHandlers from './handlers/Budget';
const handlers = [
  ...loginHandlers,
  ...incomesHandlers,
  ...expenditures,
  ...categoryHandlers,
  ...budgetHandlers,
];

export default handlers;
