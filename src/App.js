import Cart from "./components/Cart/Cart";
import Layout from "./components/Layout/Layout";
import Products from "./components/Shop/Products";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { uiActons } from "./store/ui-slice";
import Notification from './components/UI/Notification'

let isInitial= true;

function App() {
  const dispatch = useDispatch();

  const showCart = useSelector((state) => {
    return state.ui.cartIsVisible;
  });
  const cart = useSelector((state) => state.cart);
  const notification = useSelector(state=>state.ui.notification)

  
  useEffect(() => {
    if(isInitial) {
      isInitial=false;
      return
    }
    dispatch(
      uiActons.showNotification({
        status: "pending",
        title: "Sending",
        message: "Sending cart data!",
      })
    );
    const sendCartData = async () => {
      const response = await fetch(
        "https://store-dbe97-default-rtdb.firebaseio.com/cart.json",
        {
          method: "PUT",
          body: JSON.stringify(cart),
        }
      );

      if (!response.ok) {
        throw new Error("Something went wrong");
        
      }

      dispatch(
        uiActons.showNotification({
          status: "success",
          title: "Success",
          message: "Sentcart data successfully!",
        })
      );

    };
    sendCartData().catch(error=>{
      dispatch(
        uiActons.showNotification({
          status: "error",
          title: "Error",
          message: "Sentcart data failed!",
        })
      );
    });
  }, [cart,dispatch]);

  return (
    <>
    {notification && <Notification status={notification.status} title={notification.title} message={notification.message} />}
    <Layout>
      {showCart && <Cart />}
      <Products />
    </Layout>
    </>
  );
}

export default App;
