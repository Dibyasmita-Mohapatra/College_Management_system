import { useState } from "react";
import api from "../../utils/api";

const StudentProfile = () => {

    const token = localStorage.getItem("token");

    const [password, setPassword] = useState("");
    const [dob, setDob] = useState("");

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            await api.put(
                "/api/student/profile",
                { password, dob },
                { headers: { Authorization: `Bearer ${token}` } }
            );

            alert("Profile updated successfully");

        } catch (error) {
            console.error(error);
        }

    };
