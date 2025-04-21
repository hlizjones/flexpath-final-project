import React, {useMemo} from "react";
import useFetch from "../../../hooks/useFetch";
// import { DataContext } from "../../../context/DataProvider";
// import { useNavigate } from "react-router-dom";

export default function ReviewsTable() {
    // const navigate = useNavigate();
    
    // const { map, setMap } = useContext(DataContext)

//    const accessToken = localStorage.getItem("accessToken");
const url = useMemo(() => `api/review?bookId=2`, []);
const options = useMemo(() => ({
    headers: {
        "Authorization": `Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhZG1pbiIsInVpZCI6LTEsIm5iZiI6MTc0NTIwNDY0NiwiaXNzIjoiZnJhaG8tc2VjdXJpdHkiLCJleHAiOjE3NDUyMDgyNDYsImlhdCI6MTc0NTIwNDY0NiwiYXV0aG9yaXRpZXMiOlsiQURNSU4iXSwianRpIjoiNWFiNDk0NjQtZDA2NC00ZjFhLTgxZmItZTcwNzc4YjQ4YWYwIn0.Xu3UD7asUHGg8ip9h8-GhaJjmaPBpczowQMfKJyM05Q`,
        "Content-Type": "application/json"
    }
}), []);

    const {data, loading, error} = useFetch(url, options
      )

    // const handleClick = (e) => {
    //     e.preventDefault();
    //     const page = map.get(`api`)
    //     let newMap = new Map();
    //     newMap.set(`api`, `${page}/${e.currentTarget.id}`)
    //     setMap(newMap)
    //     navigate(`/${page}`)
    // }

    if (loading) return <div>Loading Records...</div>;
    return (
        <>
            {error && <p id="resultsError">Error: {error.message}</p>}
            <h6 >Your review</h6>
            <table className="table table-hover">
                <thead className="table-secondary">
                    <tr>
                        {data[0] && Object.keys(data[0]).map(key => {
                            if (key != "id" && key != "bookId" && key != "privacy" && key != "isAdmin") {
                            return (
                            <th scope="col" key={key}>{key.toUpperCase()}</th>
                            )
                        }
                        })}
                    </tr>
                </thead>
                <tbody>
                    {data && Array.from(data).map(el => {
                        console.log(el["id"])
                        return (
                            <tr key={el["id"]}  id={el["id"]}>
                                {Object.entries(el).map(([key, value]) => { 
                                    if (key != "id" && key != "bookId" && key != "privacy" && key != "isAdmin") {
                                    return (<th key={key}>{value}</th>)}})}
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </>
    );
}