import React, { use, useEffect, useState } from 'react';
import axiosInstance from '../../api/axiosInstance.js';

const AllCategories = () => {

const [categories, setCategories] = useState([]);


useEffect(() => {
    const fetchCategories=async()=>{
        try {
            const response=await axiosInstance.get('blogs/categories')
            if(response.data.success)
            {
                setCategories(response.data.categories)
            }
            else
            {
                setCategories([])
            }
        } catch (error) {
            console.error("Error fetching categories:", error);
        }
    }
    fetchCategories()
})






    return (
        <div>
            {
                categories.map((categories)=>(
                    <div key={categories._id} className='flex items-center gap-2 my-2'>
                   
                        <h1 className='text-xl font-semibold'>{categories}</h1>
                    </div>
                ))
            }
            
        </div>
    );
};

export default AllCategories;