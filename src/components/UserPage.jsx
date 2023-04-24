import {useMemo} from 'react'
import { Link, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import {selectUserById} from '../reducers/userSlice'
import { createSelector } from '@reduxjs/toolkit';
import { useGetBlogsQuery } from '../../../../redux-blog/src/api/apiSlice';

const UserPage = () => {
    const {userId} = useParams();
    const user = useSelector(state => selectUserById(state,userId))

    const selectUserBlogs = useMemo(()=> {
        const emptyArry = []
        return createSelector(
            (res) => res.data,
            (res,userId) => userId,
            (data,userId) => data?.filter((blog)=> blog.user === userId) ?? emptyArry
        )
    },[])

    const {userBlogs} = useGetBlogsQuery(undefined,{
        selectFromResult: result => ({
          ...result,
          userBlogs:selectUserBlogs(result,userId) 
        })
    })

    const blogTitles = userBlogs.map(blog => (
        <li key={blog.id}>
            <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
            
        </li>
    ))

    return(
        <section>
            <h2>{user.fullname}</h2>

            <ul>
                {userBlogs.length >0 ? blogTitles :
                    <li style={{listStyleType:'none'}}>نویسنده ی ما هیچ پستی منتشر نکرده...🤷‍♀️</li>
                }
            </ul>
        </section>
    )
}

export default UserPage;