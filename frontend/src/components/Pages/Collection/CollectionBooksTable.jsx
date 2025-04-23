import React, {useContext, useMemo} from "react";
import useFetch from "../../../hooks/useFetch";
import { AuthContext } from "../../../context/AuthProvider";
import { DataContext } from "../../../context/DataProvider";
import { useNavigate } from "react-router-dom";

export default function CollectionBooksTable({collectionId}) {
    const { setMap, setOptions } = useContext(DataContext);
    const { token } = useContext(AuthContext);
    const navigate = useNavigate();
    const url = useMemo(() => `api/book_collection?id=${collectionId}`, [collectionId]);
    const options = useMemo(() => ({headers: {'Authorization': `Bearer ${token}`}}), [token]);

    const {data, loading, error} = useFetch(url, options)

    const handleClick = (e) => {
        e.preventDefault();
        let newMap = new Map();
        newMap.set(`api`, `book/${e.currentTarget.id}`);
        setMap(newMap);
        setOptions({ headers: { 'Authorization': `Bearer ${token}` } })
        navigate(`/book`);
    }

    if (loading) return <div>Loading Records...</div>;
    if (error) return <div className="mb-5 text-danger">Error: Failed to load books.</div>;
    return (
        <>
            <table className="table table-hover">
                <thead className="table-secondary">
                    <tr>
                        {data[0] && Object.keys(data[0]).map(key => {
                            if (key != "id" && key != "username" && key != "favorite" && key != "privacy" && key != "isAdmin") {
                            return (
                            <th scope="col" key={key}>{key.toUpperCase()}</th>
                            )
                        }
                        })}
                    </tr>
                </thead>
                <tbody>
                    {data && Array.from(data).map(el => {
                        return (
                            <tr key={el["id"]} onClick={handleClick} id={el["id"]}>
                                {Object.entries(el).map(([key, value]) => { 
                                    if (key != "id" && key != "username" && key != "favorite" && key != "privacy" && key != "isAdmin") {
                                    return (<th key={key}>{value}</th>)}})}
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </>
    );
}