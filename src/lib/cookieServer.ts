import { cookies } from "next/headers"; 

export async function getCookiesServer(){  
    const cookieStore = await cookies();
    const token = cookieStore.get("session")?.value; 
        
        return token || null;
    
}