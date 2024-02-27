import React  from 'react'

 export default function NewsItem(props)  {
   
        let { title, description, imageUrl, newsUrl, time, author, source } = props
        return (

            <div className="container">
                <div className="card" >
                    <div style={{ display: 'flex', justifyContent: 'flex-end', position: 'absolute', right: '0' }}>

                        <span className="badge rounded-pill bg-danger">{source}</span>
                    </div>
                    <img src={imageUrl} className="card-img-top" alt="..." />
                    <div className="card-body">
                        <h5 className="card-title">{title}</h5>
                        <p className="card-text">{description}</p>
                        <a href={newsUrl} target='_blank' rel="noreferrer" className="btn btn-sm btn-primary">Read More</a>
                        <p className="card-text"><small className="text-body-secondary">By {author} on {time} at {new Date(time).toLocaleTimeString()}</small></p>

                    </div>
                </div>
            </div>

        )
    
}
