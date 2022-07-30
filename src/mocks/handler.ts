import loginHandlers from './handlers/Users';
import incomesHandlers from './handlers/Incomes';
import categoryHandlers from './handlers/Category';

const handlers = [...loginHandlers, ...incomesHandlers, ...categoryHandlers];

export default handlers;
