import { Link, useParams ,useNavigate} from "react-router-dom";
import { useDispatch } from 'react-redux';
import { useDeleteBlogMutation, useGetBlogQuery } from "../api/apiSlice";
import Spinner from "./Spinner";
import { ShowTime } from "./ShowTime";
import ShowAuthor from "./ShowAuthor";
const SingleBlogPage = () => {
    const {blogId}=useParams();
    const dispatch = useDispatch()
    
    const navigate= useNavigate()

    const {
        data: blog ,
        isFetching,
        isSuccess
    } = useGetBlogQuery(blogId)

    const [deleteBlog] =useDeleteBlogMutation()

    const handleDelete = async() => {
        await deleteBlog(blog.id)
        navigate('/')
    }

    if(!blog){
        return(
            <section>
                <h2>پستی که دنبال آن میگردی پیدا نشد...😒</h2>
            </section>
        )
    }

    let content;
    if(isFetching){
        content = <Spinner text="در حال بارگذاری..."/>
    }else if(isSuccess){
        content= (
            <article className="blog">
            <h2>{blog.title}</h2>

            <div>
                <ShowTime timestamp={blog.date} />
                <ShowAuthor userId={blog.user} />
            </div>

            <p className="blog-content">{blog.content}</p>
            <Link to={`/editBlog/${blog.id}`} className='button'>
                ویرایش پست
            </Link>
            <button className="mutted-button" style={{marginRight:'10px'}}  onClick={handleDelete}>
                حذف پست
            </button>
        </article>
        )
    }

    return(
        <section>
           {content}
        </section>
    )
}

export default SingleBlogPage;