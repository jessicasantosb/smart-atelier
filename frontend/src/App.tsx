import { createRouter } from '@solidjs/router';
import { PrototypeShell } from './lib/components/prototype/PrototypeShell';
import { AtelierPage } from './routes/AtelierPage';
import { CheckoutAddressPage } from './routes/CheckoutAddressPage';
import { CheckoutPaymentPage } from './routes/CheckoutPaymentPage';
import { CheckoutSignInPage } from './routes/CheckoutSignInPage';
import { HomePage } from './routes/HomePage';
import { NewPiecePage } from './routes/NewPiecePage';
import { NotFoundPage } from './routes/NotFoundPage';
import { OrderPage } from './routes/OrderPage';
import { ProductPage } from './routes/ProductPage';
import { ShopPage } from './routes/ShopPage';

const Router = createRouter({
  routes: [
    { path: '/', component: HomePage },
    { path: '/atelier', component: AtelierPage },
    { path: '/atelier/pecas/nova', component: NewPiecePage },
    { path: '/loja/:slug', component: ShopPage },
    { path: '/produto/:slug', component: ProductPage },
    { path: '/checkout/entrar', component: CheckoutSignInPage },
    { path: '/checkout/endereco', component: CheckoutAddressPage },
    { path: '/checkout/pagamento', component: CheckoutPaymentPage },
    { path: '/pedidos/:id', component: OrderPage },
    { path: '*missing', component: NotFoundPage },
  ],
});

export function App() {
  return <Router>{(props) => <PrototypeShell>{props.children}</PrototypeShell>}</Router>;
}
