import React from 'react'
import { useGetAllPostsCommentsQuery} from './store/postsApi';




const Comments = () => {
    const {data,error, isLoading}=useGetAllPostsCommentsQuery();

  return (
    <div>
        {
            isLoading ? <p>Loading...</p> : error ? <p>Error Loading...</p> : 
            <>
            <div className='container'>
                {
                    data?.map((comment) =>(
                        <div key={comment.id}>
                            <p>{comment.postId}</p>
                            <p>{comment.id}</p>
                            <p>{comment.name}</p>
                            <p>{comment.email}</p>
                            <p>{comment.body}</p>
                        </div>
                    ))
                }

            </div>
            </>
        }
        
    </div>
  )
}

export default Comments