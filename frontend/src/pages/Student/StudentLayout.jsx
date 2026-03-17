import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../../utils/api";
import { Sun, Moon } from "lucide-react";

const StudentLayout = () => {

    const BASE_URL = api.defaults.baseURL;
    const location = useLocation();
    const navigate = useNavigate();
    const token = localStorage.getItem("token");

    const [student, setStudent] = useState(null);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const [theme, setTheme] = useState(() => {
        const savedTheme = localStorage.getItem("theme");

        if (savedTheme) return savedTheme;

        return window.matchMedia("(prefers-color-scheme: dark)").matches
            ? "dark"
            : "light";
    });

    useEffect(() => {
        if (theme === "dark") {
            document.documentElement.classList.add("dark");
        } else {
            document.documentElement.classList.remove("dark");
        }

        localStorage.setItem("theme", theme);
    }, [theme]);

    /* ===================== Fetch Student ===================== */

    useEffect(() => {

        if (!token) return;

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
            }

        };

        fetchStudent();

    }, [token]);

    /* ===================== Logout ===================== */

    const handleLogout = () => {

        localStorage.removeItem("token");
        localStorage.removeItem("role");
        localStorage.removeItem("lastPage");

        navigate("/", { replace: true });

    };

    /* ===================== Theme ===================== */

    const toggleTheme = () => {
        setTheme(prev => prev === "dark" ? "light" : "dark");
    };

    /* ===================== Menu ===================== */

    const menuItems = [

        { name: "Dashboard", path: "/student/dashboard" },
        { name: "My Profile", path: "/student/profile" },
        { name: "Attendance", path: "/student/attendance" },
        { name: "Marksheet", path: "/student/marksheet" }

    ];

    return (

        <div className="h-screen flex bg-gray-100 dark:bg-gray-950 overflow-hidden">

            {/* Overlay */}
            {isSidebarOpen && (
                <div
                    className="fixed inset-0 bg-black/30 z-30 lg:hidden"
                    onClick={() => setIsSidebarOpen(false)}
                />
            )}
        </div>
    );

    

        

