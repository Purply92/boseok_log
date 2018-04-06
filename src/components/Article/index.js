import { getArticles } from '../../actions'

import { JS, REACT, CLOUD, MAC } from '../../constants'

export async function getFilteredList(article_list, category) {
  article_list = await getArticles() || []
  if (category) {
    return article_list.filter((article) => {
      if (category === 'tech') {
        const tech = [JS, REACT, CLOUD, MAC]
        let flag = false
        // eslint-disable-next-line
        tech.map((item) => {
          if (item === article.category)
            flag = true
        })
        return flag
      } else {
        return article.category === category
      }
    })
  } else {
    return article_list
  }
}