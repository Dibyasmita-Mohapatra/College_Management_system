import { useEffect, useState } from "react";
import api from "../../utils/api";

const StudentMarksheet = () => {

    const token = localStorage.getItem("token");

    const [marks, setMarks] = useState([]);
