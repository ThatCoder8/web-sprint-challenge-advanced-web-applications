// import React, { useState } from 'react'
// import { NavLink, Routes, Route, useNavigate } from 'react-router-dom'
// import Articles from './Articles'
// import LoginForm from './LoginForm'
// import Message from './Message'
// import ArticleForm from './ArticleForm'
// import Spinner from './Spinner'

// const articlesUrl = 'http://localhost:9000/api/articles'
// const loginUrl = 'http://localhost:9000/api/login'

// export default function App() {
//   // ✨ MVP can be achieved with these states
//   const [message, setMessage] = useState('')
//   const [articles, setArticles] = useState([])
//   const [currentArticleId, setCurrentArticleId] = useState()
//   const [spinnerOn, setSpinnerOn] = useState(false)

//   // ✨ Research `useNavigate` in React Router v.6
//   const navigate = useNavigate()
//   const redirectToLogin = () => {navigate('/')}
//   const redirectToArticles = () => {navigate('/articles')}

//   const logout = () => {
//     // ✨ implement
//     // If a token is in local storage it should be removed,
//     // and a message saying "Goodbye!" should be set in its proper state.
//     // In any case, we should redirect the browser back to the login screen,
//     // using the helper above.
//     localStorage.removeItem('token');
//     setMessage('Goodbye!')
//     redirectToLogin();
//   }

//   const login = async ({ username, password }) => {
//     // ✨ implement
//     // We should flush the message state, turn on the spinner
//     // and launch a request to the proper endpoint.
//     // On success, we should set the token to local storage in a 'token' key,
//     // put the server success message in its proper state, and redirect
//     // to the Articles screen. Don't forget to turn off the spinner!
//     setSpinnerOn(true);
//     try {
//       const res = await fetch(loginUrl, {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json'},
//         body: JSON.stringify({ username, password })
//       });
//     if (res.ok) {
//       const { token, message } = await res.json()
//       localStorage.setItem('token', token);
//       setMessage(message)
//       redirectToArticles()
//     } else {
//       const error = await res.json();
//       setMessage(error.message || 'Login failed')
//     }
//     } catch(err) {
//       setMessage('Error logging in.')
//     } finally {
//       setSpinnerOn(false)
//     }
//   };

//   const getArticles = async () => {
//     // ✨ implement
//     // We should flush the message state, turn on the spinner
//     // and launch an authenticated request to the proper endpoint.
//     // On success, we should set the articles in their proper state and
//     // put the server success message in its proper state.
//     // If something goes wrong, check the status of the response:
//     // if it's a 401 the token might have gone bad, and we should redirect to login.
//     // Don't forget to turn off the spinner!
//     setSpinnerOn(true);
//     try {
//       const token = localStorage.getItem('token')
//       const res = await fetch(articlesUrl, {
//         method: 'GET',
//         headers: {'Authorization': `Bearer ${token}`}
//       });
//       if (res.ok) {
//         const data = await res.json();
//         setArticles(data);
//       } else if (res.status === 401) {
//         redirectToLogin()
//       } else {
//         setMessage('Error fetching articles.')
//       }
//     } catch(err) {
//       setMessage('Error fetching articles')
//     } finally {
//       setSpinnerOn(false)
//     }
//   }

//   const postArticle = async article => {
//     // ✨ implement
//     // The flow is very similar to the `getArticles` function.
//     // You'll know what to do! Use log statements or breakpoints
//     // to inspect the response from the server.
//     setMessage('');
//     setSpinnerOn(true);
//     const token = localStorage.getItem('token')
//     try {
//       const res = await fetch(articlesUrl, {
//         method: 'POST', 
//         headers: {
//           'Content-Type': 'application/json',
//           'Authorization': `Bearer ${token}`
//         },
//         body: JSON.stringify(article)
//       });
//       if (res.ok) {
//         const data = await res.json();
//         setArticles([...articles, data]);
//         setMessage('Article posted successfully!')
//       } else {
//         setMessage('Error posting article.')
//       }
//     } catch(err) {
//       setMessage('Error posting article.');
//     } finally {
//         setSpinnerOn(false)
//       }
//     };
  

//   const updateArticle = async ({ article_id, article }) => {
//     // ✨ implement
//     // You got this!
//     setMessage('');
//     setSpinnerOn(true);
//     const token = localStorage.getItem('token');
//     try {
//       const res = await fetch(`${articlesUrl}/${article_id}`, {
//         method: 'PUT',
//         headers: {
//           'Content-Type': 'application/json',
//           'Authorization': `Bearer ${token}`
//         },
//         body: JSON.stringify(article)
//       });
//       if (res.ok) {
//         const updatedArticle = await res.json();
//         setArticles(articles.map(art => art.article_id === article_id ? updatedArticle : art ));
//         setMessage('Article updated successfully!');
//       } else {
//         setMessage('Error updating article.');
//       }
//     } catch(err) {
//       setMessage('Error updating article.');
//     } finally {
//       setSpinnerOn(false);
//     }
//   };

//   const deleteArticle = async article_id => {
//     // ✨ implement
//     setMessage('');
//     setSpinnerOn(true);
//     const token = localStorage.getItem('token');
//     try {
//       const res = await fetch(`${articlesUrl}/${article_id}`, {
//         method: 'DELETE',
//         headers: { 'Authorization': `Bearer ${token}`}
//       });
//       if (res.ok) {
//         setArticles(articles.filter(art => art.article_id !== article_id));
//         setMessage('Article deleted successfully!');
//       } else {
//         setMessage('Error deleting article.');
//       } 
//     } catch(err) {
//       setMessage('Error deleting article.')
//     } finally {
//       setSpinnerOn(false);
//     }
//   };

//   return (
//     // ✨ fix the JSX: `Spinner`, `Message`, `LoginForm`, `ArticleForm` and `Articles` expect props ❗
//     <>
//       <Spinner isVisible={spinnerOn}/>
//       <Message text={message}/>
//       <button id="logout" onClick={logout}>Logout from app</button>
//       <div id="wrapper" style={{ opacity: spinnerOn ? "0.25" : "1" }}> {/* <-- do not change this line */}
//         <h1>Advanced Web Applications</h1>
//         <nav>
//           <NavLink id="loginScreen" to="/">Login</NavLink>
//           <NavLink id="articlesScreen" to="/articles">Articles</NavLink>
//         </nav>
//         <Routes>
//           <Route path="/" element={<LoginForm login={login}/>} />
//           <Route path="articles" element={
//             <>
//               <ArticleForm 
//               postArticle={postArticle}
//               updateArticle={updateArticle}
//               setCurrentArticleId={setCurrentArticleId}
//               currentArticle={articles.find(article => article.article_id === currentArticleId)}
//               />
//               <Articles 
//               articles={articles}
//               getArticles={getArticles}
//               deleteArticle={deleteArticle}
//               setCurrentArticleId={setCurrentArticleId}
//               currentArticleId={currentArticleId}
//               />
//             </>
//           } />
//         </Routes>
//         <footer>Bloom Institute of Technology 2024</footer>
//       </div>
//     </>
//   )
// }
import React, { useState } from 'react';
import { NavLink, Routes, Route, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Articles from './Articles';
import LoginForm from './LoginForm';
import Message from './Message';
import ArticleForm from './ArticleForm';
import Spinner from './Spinner';

const articlesUrl = 'http://localhost:9000/api/articles';
const loginUrl = 'http://localhost:9000/api/login';

export default function App() {
  const [message, setMessage] = useState('');
  const [articles, setArticles] = useState([]);
  const [currentArticleId, setCurrentArticleId] = useState(null);
  const [spinnerOn, setSpinnerOn] = useState(false);
  const navigate = useNavigate();

  const redirectToLogin = () => navigate('/');
  const redirectToArticles = () => navigate('/articles');

  const logout = () => {
    localStorage.removeItem('token');
    setMessage('Goodbye!');
    redirectToLogin();
  };

  const login = async ({ username, password }) => {
    setSpinnerOn(true);
    try {
      const response = await axios.post(loginUrl, { username, password });
      const { token, message } = response.data;
      localStorage.setItem('token', token);
      setMessage(message);
      redirectToArticles();
    } catch (error) {
      setMessage(error.response?.data?.message || 'Login failed');
    } finally {
      setSpinnerOn(false);
    }
  };

  const getArticles = async () => {
    setSpinnerOn(true);
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(articlesUrl, {
        headers: { Authorization: token },
      });
      setArticles(response.data);
    } catch (error) {
      if (error.response?.status === 401) {
        redirectToLogin();
      } else {
        setMessage('Error fetching articles.');
      }
    } finally {
      setSpinnerOn(false);
    }
  };

  const postArticle = async (article) => {
    setMessage('');
    setSpinnerOn(true);
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(articlesUrl, article, {
        headers: { Authorization: token },
      });
      setArticles([...articles, response.data]);
      setMessage('Article posted successfully!');
    } catch (error) {
      setMessage('Error posting article.');
    } finally {
      setSpinnerOn(false);
    }
  };

  const updateArticle = async ({ article_id, article }) => {
    setMessage('');
    setSpinnerOn(true);
    try {
      const token = localStorage.getItem('token');
      const response = await axios.put(`${articlesUrl}/${article_id}`, article, {
        headers: { Authorization: token },
      });
      setArticles(articles.map(art => art.article_id === article_id ? response.data : art));
      setMessage('Article updated successfully!');
    } catch (error) {
      setMessage('Error updating article.');
    } finally {
      setSpinnerOn(false);
    }
  };

  const deleteArticle = async (article_id) => {
    setMessage('');
    setSpinnerOn(true);
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`${articlesUrl}/${article_id}`, {
        headers: { Authorization: token },
      });
      setArticles(articles.filter(art => art.article_id !== article_id));
      setMessage('Article deleted successfully!');
    } catch (error) {
      setMessage('Error deleting article.');
    } finally {
      setSpinnerOn(false);
    }
  };

  return (
    <>
      <Spinner isVisible={spinnerOn} />
      <Message text={message} />
      <button id="logout" onClick={logout}>Logout from app</button>
      <div id="wrapper" style={{ opacity: spinnerOn ? "0.25" : "1" }}>
        <h1>Advanced Web Applications</h1>
        <nav>
          <NavLink id="loginScreen" to="/">Login</NavLink>
          <NavLink id="articlesScreen" to="/articles">Articles</NavLink>
        </nav>
        <Routes>
          <Route path="/" element={<LoginForm login={login} />} />
          <Route path="articles" element={
            localStorage.getItem('token') ? (
              <>
                <ArticleForm
                  postArticle={postArticle}
                  updateArticle={updateArticle}
                  setCurrentArticleId={setCurrentArticleId}
                  currentArticle={articles.find(article => article.article_id === currentArticleId)}
                />
                <Articles
                  articles={articles}
                  getArticles={getArticles}
                  deleteArticle={deleteArticle}
                  setCurrentArticleId={setCurrentArticleId}
                  currentArticleId={currentArticleId}
                />
              </>
            ) : (
              redirectToLogin()
            )
          } />
        </Routes>
        <footer>Bloom Institute of Technology 2024</footer>
      </div>
    </>
  );
}
