import React, { useState } from 'react'
import { NavLink, Routes, Route, useNavigate } from 'react-router-dom'
import Articles from './Articles'
import LoginForm from './LoginForm'
import Message from './Message'
import ArticleForm from './ArticleForm'
import Spinner from './Spinner'
import axios from 'axios'
import { response } from 'msw'

const articlesUrl = 'http://localhost:9000/api/articles'
const loginUrl = 'http://localhost:9000/api/login'

export default function App() {
  // ✨ MVP can be achieved with these states
  const [message, setMessage] = useState('')
  const [articles, setArticles] = useState([])
  const [currentArticleId, setCurrentArticleId] = useState()
  const [spinnerOn, setSpinnerOn] = useState(false)
  

  // ✨ Research `useNavigate` in React Router v.6
  const navigate = useNavigate()
  const redirectToLogin = () => navigate('/');
const redirectToArticles = () => navigate('/articles');


  const logout = () => {
    // ✨ implement
    // If a token is in local storage it should be removed,
    // and a message saying "Goodbye!" should be set in its proper state.
    // In any case, we should redirect the browser back to the login screen,
    // using the helper above.
    const logout = () => {
      localStorage.removeItem('token');
      setMessage('Goodbye!');
      redirectToLogin();
    };
    
  }

  const login = ({ username, password }) => {
    // ✨ implement
    // We should flush the message state, turn on the spinner
    // and launch a request to the proper endpoint.
    // On success, we should set the token to local storage in a 'token' key,
    // put the server success message in its proper state, and redirect
    // to the Articles screen. Don't forget to turn off the spinner!
    setMessage('');
    setSpinnerOn(true);

  axios.post(loginUrl, { username, password })
    .then(response => {
      localStorage.setItem('token', response.data.token);
      setMessage(response.data.message);
      redirectToArticles();
    })
    .catch(error => {
      setMessage(error?.response?.data?.message || 'An error occurred. Please try again');
    })
    .finally(() => {
      setSpinnerOn(false);
    });
};


  // const getArticles = async () => {
    // ✨ implement
    // We should flush the message state, turn on the spinner
    // and launch an authenticated request to the proper endpoint.
    // On success, we should set the articles in their proper state and
    // put the server success message in its proper state.
    // If something goes wrong, check the status of the response:
    // if it's a 401 the token might have gone bad, and we should redirect to login.
    // Don't forget to turn off the spinner!
    const getArticles = () => {
      setMessage('');
      setSpinnerOn(true);
    
      const token = localStorage.getItem('token');
    
      axios.get(articlesUrl, {
        headers: { Authorization: token }
      })
        .then(response => {
          setArticles(response.data.articles);
          setMessage(response.data.message);
        })
        .catch(error => {
          if (error.response && error.response.status === 401) {
            setMessage('Token expired. Please login again.');
            redirectToLogin();
          } else {
            setMessage(error?.response?.data?.message || 'Failed to fetch articles');
          }
        })
        .finally(() => {
          setSpinnerOn(false);
        });
    };
    

  const postArticle = ({title, text, topic}) => {
    // ✨ implement
    // The flow is very similar to the `getArticles` function.
    // You'll know what to do! Use log statements or breakpoints
    // to inspect the response from the server.
    setMessage('');
    setSpinnerOn(true);
    const token = localStorage.getItem('token');

    axios.post(articlesUrl, { title, text, topic },
    {headers: { Authorization: token }}
  )
  .then(response => {
    setArticles(articles => articles.concat(response.data));
     setMessage(response.data.message);
     getArticles();
   })        .catch(error => {
    if (error.response && error.response.status === 401) {
      setMessage('Token expired. Please login again.');
      redirectToLogin();
    } else {
      setMessage(error?.response?.data?.message || 'Failed to fetch articles');
    }
  })
  .finally(() => {
    setSpinnerOn(false);
  });
};

  const updateArticle = (article ) => {
    // ✨ implement
    // You got this!
    console.log(article);
    const token = localStorage.getItem('token');

    axios.post(articlesUrl, { ...article}, {
      headers: { Authorization: token }
    })
    .then(response => {
      setMessage(response.data.message);
      getArticles();
    })
    .catch(error => {
      setMessage(error?.response?.data?.message || 'Failed to update article');
    })
  }

  const deleteArticle = article_id => {
    // ✨ implement 
      setSpinnerOn(true);
      axios.delete(`${articlesUrl}/${article_id}`, {
        headers: { Authorization: localStorage.getItem('token') }
      })
        .then(() => {
          setArticles(currentArticles => 
            currentArticles.filter(article => article.article_id !== article_id)
          );
          setMessage('Article deleted successfully');
        })
        .catch(err => setMessage(err.response?.status === 401 ? 'Token expired. Login again.' : 'Delete failed'))
        .finally(() => setSpinnerOn(false));
    };
    
  
  

  return (
    <>
      <Spinner on={spinnerOn} />
      <Message message={message} />
      <button id="logout" onClick={logout}>Logout from app</button>
      <div id="wrapper" style={{ opacity: spinnerOn ? "0.25" : "1" }}> {/* <-- do not change this line */}
        <h1>Advanced Web Applications</h1>
        <nav>
          <NavLink id="loginScreen" to="/">Login</NavLink>
          <NavLink id="articlesScreen" to="/articles">Articles</NavLink>
        </nav>
        <Routes>
          <Route path="/" element={<LoginForm onLogin={login} />} />
          <Route path="articles" element={
            <>
              <ArticleForm postArticle={postArticle} setCurrentArticleId={setCurrentArticleId} currentArticleId={currentArticleId} articles={articles} updateArticle={updateArticle}/>
              <Articles articles={articles} onDelete={deleteArticle} onUpdate={updateArticle} getArticles={getArticles}  setCurrentArticleId={setCurrentArticleId} article_id={currentArticleId}  />
            </>
          } />
        </Routes>
        <footer>Bloom Institute of Technology 2024</footer>
      </div>
    </>
  )}


// This closing brace appears to be unnecessary or misplaced.
// Removing it to resolve the "Declaration or statement expected" error. 