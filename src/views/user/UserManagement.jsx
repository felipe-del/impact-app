// fetch to get All users

import {useEffect} from "react";
import {getAllUsers} from "../../api/User_API.js";

export default function UserManagement() {
    // Extract function to fetch users
    const fetchUsers = async () => {
        try{
        console.log(localStorage.getItem('AUTH_TOKEN'));
            fetch('http://localhost:8080/api/user',{
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem('AUTH_TOKEN')
                },
                credentials: 'include'
            })
                .then(response => response.json())
                .then(json => console.log(json));
        } catch (error) {
            console.error("Error fetching users:", error);
        }
    };

    // useEffect to manage component lifecycle behavior
    useEffect(() => {
        fetchUsers(); // Call the extracted function
    }, []); // Empty dependency array means it runs once after mount

    return (
        <div>
            User Management
        </div>
    );
}