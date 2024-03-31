import { getUsers } from "@/lib/data/users";

export default async function Users () {
    const users = await getUsers()
    return(
        <div>{users.map((user, index) => 
            <div key={index}>{user.email}</div>
        )}</div>
    );
}