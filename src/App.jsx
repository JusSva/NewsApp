import { useState, useEffect, useRef } from 'react'
import './App.css'
import Card from './components/Card'

function App() {
  const [articles, setArticles] = useState([])
  const [page, setPage] = useState(1)
  const [keyWord, setKeyWord] = useState("politics")
  const [sortBy, setSortBy] = useState("popularity")

  const inputRef = useRef();
  const fromDateRef = useRef()
  const toDateRef = useRef()

  const apiKey = import.meta.env.VITE_API_KEY  

  useEffect(() => {
    fetch("https://newsapi.org/v2/everything?q=" + keyWord + 
          "&from=" + fromDate +
          "&to=" + toDate +
          "sortBy=" + sortBy + 
          "&page=" + page + 
          "&language=en" + "&apiKey=" + apiKey)
      
      .then((resp) => resp.json())
      .then((resp) => {
        setArticles(resp.articles);
        setTotalPages(Math.ceil(resp.totalResults/100))
        
      })
  }, [keyWord, sortBy, page]);
  
  return (
    <div className="container">
      <form onSubmit={(e) => {
            e.preventDefault();
            // console.log(e.target.value);
            // setKeyWord(e.target)
            // const data = new FormData(e.target)

            // for(const value of data.entries()) {
            //   setKeyWord(value[1])
            // }

            setKeyWord(inputRef.current.value)
            console.log("from date:", fromDateRef.current.value);
            console.log("to date:", toDateRef.current.value);
            
            // setFromDate(fromDateRef.current.value)
            // setToDate()
          }}>
        <label htmlFor="from_date">Filter from:</label>
        <input type="date" name='from_date' ref={fromDateRef}/>

        <label htmlFor="to_date" ref={toDateRef}>Filter to:</label>
        <input type="date" name='to_date'/>

        <input type="text" name="keyword" ref={inputRef} />
        <button>search</button>
      </form>
      <div className="output">
        {articles.map((article, index) => (
          <Card 
            key={index}
            title={article.title}
            image={article.urlToImage}
            source={article.source.name}
            date={article.publishedAt.slice(0, 10)}
            preview={article.description}
          />
        ))}
      </div>
    </div>
  );
}

export default App
