import React, { useEffect, useState } from 'react'
import PT from 'prop-types'

const initialFormValues = { title: '', text: '', topic: '' }


export default function ArticleForm({ postArticle, updateArticle, setCurrentArticleId, articles, currentArticleId, deleteArticle }) {
  const [values, setValues] = useState(initialFormValues)
  
  console.log(currentArticleId)
  useEffect(() => {
if(currentArticleId && articles.length > 0) {
     const currentArticle = articles.find(article => article.article_id === currentArticleId )
  console.log(currentArticleId)
    if (currentArticle){ 
    setValues(currentArticle)
  } else (
    setValues(initialFormValues)
  )
  
     //   if (currentArticle){
  
  //   } else {
  //     setValues(initialFormValues)
  //   }
 } }, [currentArticleId, articles])

  const onChange = evt => {
    const { id, value } = evt.target
    setValues({ ...values, [id]: value })
  }

  const onSubmit = evt => {
    evt.preventDefault()
    // console.log({articles:values, article_id: currentArticleId.article_id})
    if (currentArticleId) {
      updateArticle(values)
    } else {
      postArticle(values)
    }
    setValues(initialFormValues)
  } 

  const isDisabled = () => {


    return !values.title.trim() || !values.text.trim() || !values.topic
  }

  return (


    <form id="form" onSubmit={onSubmit}>

      <h2>{currentArticleId ? 'Edit' : 'Create'} Article</h2>
      <input
        maxLength={50}
        onChange={onChange}
        value={values.title}
        placeholder="Enter title"
        id="title"
      />
      <textarea
        maxLength={200}
        onChange={onChange}
        value={values.text}
        placeholder="Enter text"
        id="text"
      />
      <select onChange={onChange} id="topic" value={values.topic}>
        <option value="">-- Select topic --</option>
        <option value="JavaScript">JavaScript</option>
        <option value="React">React</option>
        <option value="Node">Node</option>
      </select>
      <div className="button-group">
        <button disabled={isDisabled()} id="submitArticle">Submit</button>

        <button onClick={() => setValues(initialFormValues)}>Cancel edit</button>
      </div>
    </form>
  )
}

// 🔥 No touchy: ArticleForm expects the following props exactly:
ArticleForm.propTypes = {
  postArticle: PT.func.isRequired,
  updateArticle: PT.func.isRequired,
  setCurrentArticleId: PT.func.isRequired,
  currentArticle: PT.shape({ // can be null or undefined, meaning "create" mode (as opposed to "update")
    article_id: PT.number.isRequired,
    title: PT.string.isRequired,
    text: PT.string.isRequired,
    topic: PT.string.isRequired,
  })
}
