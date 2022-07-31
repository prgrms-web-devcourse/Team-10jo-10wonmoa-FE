import loginHandlers from './handlers/Users';
import incomesHandlers from './handlers/Incomes';
import expenditures from './handlers/Expenditures';
import categoryHandlers from './handlers/Category';

const handlers = [
  ...loginHandlers,
  ...incomesHandlers,
  ...expenditures,
  ...categoryHandlers,
];

export default handlers;
