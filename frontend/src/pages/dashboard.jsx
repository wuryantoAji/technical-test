/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable @typescript-eslint/no-restricted-imports */
import React, { useEffect } from 'react';
import Layout from './layout';
import Welcome from "../components/welcome.jsx";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { getMe } from "../features/authSlice";

const dashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {isError} = useSelector((state => state.auth));
  
  useEffect(() => {
    dispatch(getMe());
  }, [dispatch]);
  
  useEffect(() => {
    if(isError){
      navigate("/");
    }
  }, [isError, navigate]);

  return (
    <Layout>
      <Welcome />
    </Layout>
  );
}
export default dashboard