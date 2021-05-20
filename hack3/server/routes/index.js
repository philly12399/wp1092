import { GetStations, CalculateDistance } from './station'

const wrap = fn => (...args) => fn(...args).catch(args[2])

function routes(app) {
  // set proper api path and connect the path with wrap(function)
  // coding here ...

  //app.use(express.json());
  //app.use('/', router);
  
  //router.use('/api', apiRouter);
  //app.get('/api/getStations',()=>{console.log("123");});
  app.get('/api/getStations',wrap(GetStations));
  app.post('/api/calculateDistance',wrap(CalculateDistance));

}

export default routes
