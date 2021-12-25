import './utils/init';
import React from 'react';
import ReactDOM from 'react-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import 'antd/dist/antd.less'; // or 'antd/dist/antd.less'
import './index.css';
import { RecoilRoot } from 'recoil';
import App from './App';
import { ReactQueryDevtools } from 'react-query/devtools';
import { HashRouter as Router } from 'react-router-dom';
import 'virtual:windi.css';

const queryClient = new QueryClient();

ReactDOM.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <Router>
        <RecoilRoot>
          <App />
        </RecoilRoot>
      </Router>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  </React.StrictMode>,
  document.getElementById('root'),
);
