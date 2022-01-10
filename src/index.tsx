import './index.css';

import { QueryClient, QueryClientProvider } from 'react-query';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';

import App from './App';
import CategoryPage from 'pages/CategoryPage';
import CheckoutPage from 'pages/CheckoutPage';
import ProductPage from 'pages/ProductPage';
import { render } from 'react-dom';

const client = new QueryClient();
const rootElement = document.getElementById('root');

const routes = [
  { path: 'checkout', element: <CheckoutPage /> },
  { path: 'products', element: <CategoryPage /> },
  { path: 'products/:productId', element: <ProductPage /> },
];

render(
  <QueryClientProvider client={client}>
    <Router>
      <Routes>
        <Route path="/" element={<App />}>
          {routes.map((route) => (
            <Route key={route.path} path={route.path} element={route.element} />
          ))}
        </Route>
      </Routes>
    </Router>
  </QueryClientProvider>,
  rootElement
);
