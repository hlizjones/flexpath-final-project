import React from "react";
import useFetch from "../../../hooks/useFetch";

// export default function UserCollections() {

    // const { data, loading, error } = useFetch(`api/review?username=???`)

    // const handleSubmit = (e) => {
    //     e.preventDefault();
    // }

    // if (loading) return <div>Loading Records...</div>;
    // return (
    //     <>
    //         {error && <p id="resultsError">Error: {error.message}</p>}
    //         <div className="row row-cols-1 row-cols-md-4 g-5 mb-4">
    //             <div className="col">
    //                 {data && Array.from(data).map(el => {
    //                     return (
    //                         <div className="card text-center" key={el.id}>
    //                             <div className="card-body">
    //                                 <h5 className="card-title">{el.name}</h5>
    //                                 <p className="card-text">{el.username}</p>
    //                                 <p className="card-text">{el.description}</p>
    //                                 <button className="btn btn-secondary" type="submit" onSubmit={handleSubmit}>Favorite</button>
    //                             </div>
    //                         </div>
    //                     );
    //                 })}
    //             </div>
    //         </div>
    //     </>
//     );
// }