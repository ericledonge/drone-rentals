import './App.css';
import 'react-toastify/dist/ReactToastify.css';

import React, { useReducer } from 'react';
import { ToastContainer } from 'react-toastify';

import Layout from './components/layout/layout';
import { createInitialState, reducers } from './domain/reducers/reducers';
import {
  isRentInProgressSelector,
  isUserLoggedInSelector,
} from './domain/selectors/selectors';
import { useLoadData } from './hooks/useLoadData';
import { useSplitQuadsInStations } from './hooks/useSplitQuadsInStations';
import Dashboard from './pages/dashboard/dashboard';
import LoginPage from './pages/login-page/login-page';
import RentalPage from './pages/rental-page/rental-page';

function App(): JSX.Element {
  const [state, dispatch] = useReducer(reducers, createInitialState());

  const { isLoading, isError } = useLoadData({ dispatch });

  useSplitQuadsInStations({ dispatch, isLoading });

  const isUserLoggedIn = isUserLoggedInSelector(state);
  const isRentInProgress = isRentInProgressSelector(state);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error</div>;
  }

  return (
    <>
      <Layout>
        {isUserLoggedIn ? null : <LoginPage dispatch={dispatch} />}

        {isUserLoggedIn && !isRentInProgress ? (
          <RentalPage state={state} dispatch={dispatch} />
        ) : null}

        {isRentInProgress ? <Dashboard state={state} dispatch={dispatch} /> : null}
      </Layout>
      <ToastContainer />
    </>
  );
}

export default App;
