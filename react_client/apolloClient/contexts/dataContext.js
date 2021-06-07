import React, {
  useReducer,
  createContext,
  useEffect,
  useCallback,
} from 'react';
import { gql, useMutation, useQuery } from '@apollo/client';

const GET_USER = gql`
  query getUser($id: Int!){
    getUser(id: $id){
    users{
      id
      name
      age
    }  
  }
  }

`;
const GET_USERS = gql`
  query {
    getUsers{
    users{
     name
     age
     id
   }

  } 
  }
 `;
 const ADD_USER= gql`
  mutation addUser($id:Int!,$name:String!,$age:Int!){
    addUser(id:$id,name:$name,age:$age){
      status
    }
  }
 
 `
;
const initialState = {
  users: undefined,
  weather: undefined,
  user: undefined,
}
const actions = {
  SetUser: 'setUser',
  SetUsers: 'setUsers',
  SetWeather: 'setWeather',
  SetTranslation: 'setTranslation',
  AddUser:'addUser'

}
const dataReducer = (state, action) => {
  switch (action.type) {
    case actions.SetUsers: {
      return { ...state, users: action.users };
    }
    case actions.SetUser: {
      return { ...state, user: action.user };
    }
    case actions.SetWeather: {
      return { ...state, weather: action.weather };

    }
    case actions.AddUser:{
      return{...state,users: [...state.users,action.user]};
    }

  }
  return { ...state };

}
const DataContext = createContext(initialState);

export const DataContextProvider = (props) => {
  const [dataState, dataDispatch] = useReducer(
    dataReducer,
    initialState
  );

  const [addUserMutation]=useMutation(ADD_USER);

  const addUser=useCallback((user)=>{
    dataDispatch({type:actions.AddUser,user});
    addUserMutation({variables:{id: user.id,name:user.name,age:user.age}});
    usersQuery.refetch();

  });

  const userQuery = useQuery(GET_USER, {
    variables: { id: 1 },
    notifyOnNetworkStatusChange: true,

  });
  const usersQuery = useQuery(GET_USERS, {
    notifyOnNetworkStatusChange: true,

  });

  useEffect(() => {
    if (!userQuery.loading && !userQuery.error) {
      const user = userQuery.data.getUser.users[0];
      dataDispatch({ type: actions.SetUser, user });

    }
  }, [userQuery, dataDispatch]);

  useEffect(() => {
    //console.log("err",usersQuery.error?.networkError.result.errors)
    if (!usersQuery.loading && !usersQuery.error) {
      const users = usersQuery.data.getUsers.users;
      dataDispatch({ type: actions.SetUsers, users });

    }
  }, [usersQuery, dataDispatch]);




  return (
    <DataContext.Provider
      value={{addUser,dataState, dataDispatch }}>
      {props.children}
    </DataContext.Provider>
  );
};
export default DataContext;

