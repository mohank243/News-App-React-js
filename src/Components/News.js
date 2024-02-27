import React, { useState ,useEffect } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";


export default function News (props) {
  
  const [articles, setArticles] = useState([])
    const [loading, setLoading] = useState(true)
    const [page, setPage] = useState(1)
    const [totalResults, setTotalResults] = useState(0)
    
  
    

 let capitalizeFirstLetter =  (str)=>{
  return str.charAt(0).toUpperCase() + str.slice(1);
}

 const updateNews = async() =>{
  setLoading({loading: true});
  props.setProgress(0)
     let apiData = await fetch(`https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`)  
     props.setProgress(30)
     let parsedData =  await apiData.json() 
     props.setProgress(70)
     
     console.log(parsedData)
     setArticles(parsedData.articles)
     setTotalResults(parsedData.totalResults)
     setLoading(false)
    
      props.setProgress(100)
      // document.title = `${capitalizeFirstLetter(props.category)} | Mohan News`
}

//lifeCycle Method which will run after the render function
useEffect(() => {
  // eslint-disable-next-line
  updateNews();
}, [])


//  let handlePrevClick = async ()=>{
//   updateNews();
//     // setState({loading: true});
//     // let apiData = await fetch(`https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=97fb24f7c2174a86b317182449ce3766&page=${page-1}&pageSize=${props.pageSize}`)  
//     //  let parsedData =  await apiData.json() 
//     //  console.log(parsedData)
//       setPage({page: page-1})
// }
//  let handleNextClick = async ()=>{
   
//   updateNews();
//     //     setState({loading: true});
//     // let apiData = await fetch(`https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=97fb24f7c2174a86b317182449ce3766&page=${page+1}&pageSize=${props.pageSize}`)  
//     //  let parsedData =  await apiData.json() 
//     //  console.log(parsedData)
//       setPage({page: page+1})
    
// }
 let fetchMoreData = async()=>{
  
  props.setProgress(0)
     let apiData = await fetch(`https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page+1}&pageSize=${props.pageSize}`)  
     setPage(page+1)
     props.setProgress(30)
     let parsedData =  await apiData.json() 
     props.setProgress(70)
     
      setArticles(articles.concat(parsedData.articles))
      setTotalResults(parsedData.totalResults)
      props.setProgress(100)
      // document.title = `${capitalizeFirstLetter(props.category)} | Mohan News`
}


    
    return (
        
      <>
        <h1 className="text-center" style={{margin : '30px 0px', marginTop: '90px'}}>Mohan's News Headlines on {capitalizeFirstLetter(props.category)}</h1>
        {loading && <Spinner />}
        <InfiniteScroll
                    dataLength={articles.length}
                    next={fetchMoreData}
                    hasMore={articles.length !== totalResults}
                    loader={<Spinner/>}
                > 
                    <div className="container">
                         
                    <div className="row my-3" >
                        {articles.map((element) => {
                            return <div className="col-md-4" key={element.url}>
                                <NewsItem  title={element.title ? element.title : ""} description={element.description ? element.description : ""} imageUrl={element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt} source={element.source.name} />
                            </div>
                        })}
                    </div>
                    </div> 
                </InfiniteScroll>
          {/* removed due to the add of infinite Scrool */}
          {/* <div className="container my-3 d-flex justify-content-between">
          <button disabled={page <=1 } type="button" className="btn btn-primary" onClick={handlePrevClick} >&larr; Previous</button>
          <button disabled={page+1 >Math.ceil(totalResults/20)}  type="button" className="btn btn-primary" onClick={handleNextClick}>Next &rarr;</button>
          </div> */}
         
         </>

    );

    
  
}

News.defaultProps={
  country: 'in',
    category: 'general',
    pageSize: 8
}
News.propTypes={
  country: PropTypes.string,
    category: PropTypes.string,
    pageSize: PropTypes.number
}


