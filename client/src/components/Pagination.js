import React from 'react'

const Pagination = ({postsPerPage, totalPosts,setCurrentPage}) => {
    const pageNumbers = [];
    for(let i=1; i <= Math.ceil(totalPosts/postsPerPage); i++) {
        pageNumbers.push(i);
    }
  return (
    <nav>
        <ul className='pagination'>
            {pageNumbers.map(number=>(
                <li key={number} className="page-item">
                    <a className='page-link' onClick={()=>{
                        console.log(number)
                        setCurrentPage(number)
                    }}>
                        {number}
                    </a>
                </li>
            ))}
        </ul>
    </nav>

  )
}

export default Pagination