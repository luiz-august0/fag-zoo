import axios from "axios";

export const api = axios.create({
    baseURL: 'http://localhost:5000',
});

export const createSession = async (usuario, senha) => {
    return api.put('/sessions', { usuario, senha })
};

export function getUsuarios() { 
    return api.get('/usuario') 
      .then((res) => res)
      .then((data) => { 
        return { 
          count: data.length, 
          result: data
        }; 
      }); 
} 

/*
export function addOrder(order: any) {
    console.log(order);
  return fetch(baseUrl + "/orders", {
    method: "post",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      value: order
    })
  })
    .then((data: any) => {
      return data;
    });
}

// update
export function updateOrder(order: any) {
  return fetch(baseUrl + "/orders/" + order.OrderID, {
    method: "put",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      value: order
    })
  })
    .then(data => {
      return data;
    });
}

// delete
export function deleteOrder(primaryKey: string) {
  return fetch(baseUrl + "/orders/" + primaryKey, {
    method: "delete"
  })
    .then(data => {
      return data;
    });
}

https://codesandbox.io/s/react-data-grid-datasourcechanged-not-firing-forked-hfmi5?file=/src/App.tsx

*/ 