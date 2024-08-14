
export const signInDispatcher = async (data) => {

    try{

        const response = await fetch(`${process.env.BACKEND_URL}/api/register`,{
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body: JSON.stringify({email:data['email'],password:data['password']})
        });
    
        const response_data = await response.json();
        if(response.ok){
            return{
                ok:true
            }
        }else if(response.status === 409){
            return {
                ok:false,
                message: "Email already exists."
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