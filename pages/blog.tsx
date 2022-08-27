import Layout from '@components/layout'
import { readdirSync, readFileSync } from 'fs'
import matter from 'gray-matter'
import { NextPage } from 'next'

interface Post {
  title: string
  data: string
  category: string
}

const Blog: NextPage<{ blogPosts: Post[] }> = ({ blogPosts }) => {
  return (
    <Layout title="Blog">
      <h1 className="font-semibold text-lg">Latest Posts</h1>
      {blogPosts.map((post, index) => (
        <div key={index}>
          <span className="text-lg text-red-500">{post.title}</span>
          <div>
            <span>
              {post.data}/{post.category}
            </span>
          </div>
        </div>
      ))}
    </Layout>
  )
}

export async function getStaticProps() {
  const blogPosts = readdirSync('./posts').map((file) => {
    const content = readFileSync(`./posts/${file}`, 'utf-8')
    const { data } = matter(content)
    return data
  })
  console.log(blogPosts)

  return {
    props: { blogPosts },
  }
}

export default Blog
