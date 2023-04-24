import {Link, useNavigate} from 'react-router-dom'
import { ShowTime } from './ShowTime';
import ShowAuthor from './ShowAuthor';
import ReactionButtons from './ReactionButtons';
import Spinner from './Spinner';
import { useGetBlogsQuery } from '../api/apiSlice';
import { useMemo } from 'react';

let Blog = ({blog}) => {

    return(
        <>
                <article className='blog-excerpt'>
                    <h3>{blog.title}</h3>
        
                    <div style={{marginTop:'10px'}}>
                        <ShowTime timestamp={blog.date}/>
                        <ShowAuthor userId={blog.user}/>
                    </div>
                    <p className='blog-content'>{blog.content.substring(0,100)}</p>
        
                    <ReactionButtons blog={blog}/>
        
                    <Link to={`/blogs/${blog.id}`} className='button muted-button'>
                        دیدن کامل پست
                    </Link>
                </article>
        </>
    )
}

const BlogsList = () => {
    const navigate =useNavigate()  

    const {
        data:blogs=[],
        isLoading,
        isSuccess,
        isError,
        isFetching,
        error,
        refetch
    } = useGetBlogsQuery()

    const sortedBlogs = useMemo(() => {
        const sortedBlogs = blogs.slice();
        sortedBlogs.sort((a,b)=> b.date.localeCompare(a.date));
        return sortedBlogs;
    })

    let content;
    if(isLoading){
        content = <Spinner text='بارگذاری...'/>
    }else if(isSuccess){
        
        content = sortedBlogs.map(blog => <Blog key={blog.id} blog={blog}/>)
    }else if(isError){
        content = <div>{error}</div>
    }  




    return(
        <section className="blog-list" >
            <button className='full-button accent-button' style={{marginTop:"1rem"}}
                    onClick={()=> navigate('/blogs/create-blog')}>
                ساخت پست جدید
            </button>
            <button onClick={refetch}>ریفرش پست ها</button>
            <h2>تمامی پست ها</h2>
            {content}
        </section>
    )
}

export default BlogsList;