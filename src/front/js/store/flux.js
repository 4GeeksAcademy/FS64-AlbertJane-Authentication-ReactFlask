import { checkLoginDispatcher, logInDispatcher } from './dispatchers/logInDispatcher.js'
import { signInDispatcher } from './dispatchers/signInDispatcher.js'

const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			isLogged:false,
			message: null,
			demo: [
				{
					title: "FIRST",
					background: "white",
					initial: "white"
				},
				{
					title: "SECOND",
					background: "white",
					initial: "white"
				}
			]
		},
		actions: {
			// Use getActions to call a function within a fuction
			login: async (data)  => {
				try{
					const response = await logInDispatcher(data)
					if(response.ok){
						localStorage.setItem('token',response.token);
						const store = getStore();
						setStore({...store, isLogged:true});
						return {
							ok:true
						}
					}
					return{
						ok:false,
						message: response.message || "Error logging in, please try again."
					}
				}catch(error){
					console.error(error);
					return{
						ok:false,
						message: "Oops, try again!"
					}
				}
			},


			register: async (data) => {

				try{
					const response = await signInDispatcher(data);
					if(response.ok){
						return{
							ok:true
						}
					}
					return{
						ok:false,
						message: response.message || "Error Signing In"
					}
				}catch(error){
					console.error(error);
					return{
						ok:false,
						message: "Oops, try again!"
					}
				}
			},

			checkLogin: async (token) => {
				try{
					const response = await checkLoginDispatcher(token)
					if(response.ok){
						return{
							ok:true
						}
					}
					return{
						ok:false
					}
				}catch(error){
					console.error(error);
					return{
						ok:false,
						message: "Something went wrong, please try again."
					}
				}
			},
			
			logout: () => {
				const store = getStore();
				setStore({...store, isLogged:false});
			},

			exampleFunction: () => {
				getActions().changeColor(0, "green");
			},

			getMessage: async () => {
				try{
					// fetching data from the backend
					const resp = await fetch(process.env.BACKEND_URL + "/api/hello")
					const data = await resp.json()
					setStore({ message: data.message })
					// don't forget to return something, that is how the async resolves
					return data;
				}catch(error){
					console.log("Error loading message from backend", error)
				}
			},
			changeColor: (index, color) => {
				//get the store
				const store = getStore();

				//we have to loop the entire demo array to look for the respective index
				//and change its color
				const demo = store.demo.map((elm, i) => {
					if (i === index) elm.background = color;
					return elm;
				});

				//reset the global store
				setStore({ demo: demo });
			}
		}
	};
};

export default getState;
