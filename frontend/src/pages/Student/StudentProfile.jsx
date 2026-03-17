import { useState } from "react";
import api from "../../utils/api";

const StudentProfile = () => {

    const token = localStorage.getItem("token");

    const [password, setPassword] = useState("");
    const [dob, setDob] = useState("");
