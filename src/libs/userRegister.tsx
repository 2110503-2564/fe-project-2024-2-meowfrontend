export default async function userRegister(userName: string, userEmail: string, userPassword: string, userTelephonenumber: string, userRole: string) {
    const response = await fetch("http://localhost:5000/api/v1/auth/register", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            name: userName,
            telephonenumber: userTelephonenumber,
            email: userEmail,
            password: userPassword,
            role: userRole
        }),
    });

    if (!response.ok) {
        throw new Error("Failed to Register");
    }

    return await response.json();
}


