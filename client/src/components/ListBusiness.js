import React,{Fragment, useEffect, useState} from 'react';

const ListBusiness = () => {

const [businesses, setBusiness] = useState([]);


    const getBusiness = async () => {
        try {
            const response = await fetch("http://localhost:5000/businesses");
            //get data back but first parse
            const jsonData = await response.json()

            console.log(jsonData)
            setBusiness(jsonData)
        
        } catch (err) {
            console.error(err.message)
            
        }
    };

    useEffect(() => {
        getBusiness();
    } ,[]);

    console.log(businesses)

    return (
        
        <Fragment>
            {" "}
            <table class="table mt-5 text-center">
                <thead>
                    <tr>
                         <th>Business </th>
                         <th>State</th>
                         <th>City</th>
                    </tr>
                </thead>
                <tbody>
                    {businesses.map(business => (
                        <tr>
                            <td>{business.name}</td>
                            <td>{business.state}</td>
                            <td>{business.city}</td>
                        </tr> 
                    ))}
      
                </tbody>
            </table>
        </Fragment>
    )
};

export default ListBusiness;