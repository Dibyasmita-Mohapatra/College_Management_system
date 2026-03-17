import { useEffect, useState } from "react";
import api from "../../utils/api";

const StudentDashboard = () => {

    const token = localStorage.getItem("token");

    const [student, setStudent] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        const fetchStudent = async () => {

            try {

                const res = await api.get(
                    "/api/student/dashboard",
                    {
                        headers: { Authorization: `Bearer ${token}` }
                    }
                );

                setStudent(res.data);

            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }

        };

        if (token) fetchStudent();

    }, [token]);
    
