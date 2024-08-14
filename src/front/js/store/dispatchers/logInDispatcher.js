
export const logInDispatcher = async (data) => {
    
    try{

        const response = await fetch(`${process.env.BACKEND_URL}/api/login`,{
            method:"POST",
            headers: {
                'Content-Type':'application/json'
            },
            body: JSON.stringify({email:data['email'],password:data['password']})
        });

        const response_data = await response.json();
        if(response.ok){
            return{
                ok:true,
                token:response_data.token
            }
        }else if(response.status === 401){
            return {
                ok:false,
                message: response.msg || "Email or password not valid."
            }
        }
        return{
            ok:false
        }

    }catch(error){
        console.error(error);
        return{
            ok:false
        }
    }

}


export const checkLoginDispatcher = async (token) => {
    
    try{

        const response = await fetch(`${process.env.BACKEND_URL}/api/login/protected`,{
            method:'GET',
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }
        });

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
            ok:false
        }
    }
}