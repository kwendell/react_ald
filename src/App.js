import React from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';

import './Ald.css';

import LayoutExplorer from './LayoutExplorer';
import Design from './Design';
import { ReactQueryDevtools } from 'react-query/devtools';

import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from 'react-query';
const twentyFourHoursInMs = 1000 * 60 * 60 * 24;
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      refetchOnmount: false,
      refetchOnReconnect: false,
      retry: false,
     
      cacheTime: 20
    },
  },
});

function App()  {



    return(  <QueryClientProvider client={queryClient}> 
      <Router>
      <Switch>
        <Route exact path="/" ><LayoutExplorer/></Route>
        <Route path="/design" ><div><Design component={Design } /></div></Route>
      
      </Switch>
      </Router>

    
       {/* The rest of your application */}
       <ReactQueryDevtools initialIsOpen={false} />
     </QueryClientProvider>
      
               )
	
   
  

}
export default App;
