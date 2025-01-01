/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable @typescript-eslint/no-restricted-imports */
import React, { useEffect }  from 'react'
import Layout from './layout'
import UserList from '../components/userList'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { getMe } from "../features/authSlice";

const users = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isError, user } = useSelector((state => state.auth));
  
  useEffect(() => {
    dispatch(getMe());
  }, [dispatch]);
  
  useEffect(() => {
    if(isError){
      navigate("/");
    }
    if(user && user.role !== "HRD"){
      navigate("/dashboard");
    }
  }, [isError, user, navigate]);

  return (
    <Layout>
        <UserList />
    </Layout>
  )
}

export default users