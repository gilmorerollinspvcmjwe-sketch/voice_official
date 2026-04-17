/**
 * BlogPost 博客文章详情页
 */

import { Helmet } from 'react-helmet-async'
import { useParams, Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import { Calendar, User, Clock, ArrowLeft, Twitter, Linkedin, Link as LinkIcon } from 'lucide-react'
import { Container, Card, Badge, Button } from '@/components/common'
import { getLocalizedPath } from '@/utils'
import { blogPosts, getBlogPostBySlug } from '@/data/blog-posts'

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>()
  const { t, i18n } = useTranslation('company')
  
  const post = slug ? getBlogPostBySlug(slug) : undefined

  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-display font-bold text-text mb-4">{t('blog.notFound', 'Article Not Found')}</h1>
          <p className="text-body text-text-secondary mb-6">{t('blog.notFoundDesc', 'The article you\'re looking for doesn\'t exist.')}</p>
          <Link to={getLocalizedPath('/blog')}>
            <Button variant="primary">{t('blog.backToList', 'Back to Blog')}</Button>
          </Link>
        </div>
      </div>
    )
  }

  const title = i18n.language === 'zh' && post.title.zh ? post.title.zh : post.title.en
  const excerpt = i18n.language === 'zh' && post.excerpt.zh ? post.excerpt.zh : post.excerpt.en
  const content = i18n.language === 'zh' && post.content.zh ? post.content.zh : post.content.en

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  }

  const relatedPosts = blogPosts.filter(p => p.id !== post.id).slice(0, 3)

  return (
    <>
      <Helmet>
        <title>{`${title} - VoiceAI Blog`}</title>
        <meta name="description" content={excerpt} />
      </Helmet>

      <div className="min-h-screen">
        {/* Hero */}
        <section className="py-16 md:py-24 bg-gradient-hero text-white">
          <Container>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="max-w-3xl mx-auto"
            >
              {/* Back Button */}
              <Link 
                to={getLocalizedPath('/blog')}
                className="inline-flex items-center gap-2 text-white/70 hover:text-white mb-8 transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
                <span>{t('blog.backToList', 'Back to Blog')}</span>
              </Link>

              {/* Category */}
              <Badge variant="accent" className="mb-4">{post.category}</Badge>

              {/* Title */}
              <h1 className="text-hero font-bold mb-6">{title}</h1>

              {/* Excerpt */}
              <p className="text-body-lg text-white/80 mb-8">{excerpt}</p>

              {/* Meta */}
              <div className="flex flex-wrap items-center gap-6 text-white/70">
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center">
                    <User className="w-5 h-5 text-accent" />
                  </div>
                  <div>
                    <p className="text-white font-medium">{post.author.name}</p>
                    <p className="text-caption text-white/60">{post.author.role}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="w-5 h-5" />
                  <span>{formatDate(post.publishedAt)}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-5 h-5" />
                  <span>{post.readTime} min read</span>
                </div>
              </div>
            </motion.div>
          </Container>
        </section>

        {/* Cover Image */}
        <section className="bg-gradient-to-br from-primary-purple/20 to-primary-cyan/20 py-24">
          <Container>
            <div className="max-w-3xl mx-auto text-center">
              <span className="text-foreground-muted text-body">Cover Image Placeholder</span>
            </div>
          </Container>
        </section>

        {/* Article Content */}
        <section className="py-16 bg-surface">
          <Container>
            <div className="grid lg:grid-cols-[1fr_300px] gap-12">
              {/* Main Content */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <article className="prose prose-lg max-w-none">
                  <div 
                    className="text-body text-text-secondary leading-relaxed whitespace-pre-wrap"
                    dangerouslySetInnerHTML={{ __html: content }}
                  />
                </article>

                {/* Share */}
                <div className="mt-12 pt-8 border-t border-border">
                  <div className="flex items-center justify-between flex-wrap gap-4">
                    <div className="flex items-center gap-4">
                      <span className="text-body-sm text-text-muted">{t('blog.share', 'Share:')}</span>
                      <button className="p-2 rounded-lg bg-background-secondary hover:bg-accent/10 text-text-muted hover:text-accent transition-colors">
                        <Twitter className="w-5 h-5" />
                      </button>
                      <button className="p-2 rounded-lg bg-background-secondary hover:bg-accent/10 text-text-muted hover:text-accent transition-colors">
                        <Linkedin className="w-5 h-5" />
                      </button>
                      <button className="p-2 rounded-lg bg-background-secondary hover:bg-accent/10 text-text-muted hover:text-accent transition-colors">
                        <LinkIcon className="w-5 h-5" />
                      </button>
                    </div>
                    
                    <div className="flex flex-wrap gap-2">
                      {post.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-3 py-1 bg-background-secondary rounded-full text-caption text-text-secondary"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Sidebar */}
              <aside className="space-y-6">
                {/* Author Card */}
                <Card padding="lg">
                  <div className="text-center">
                    <div className="w-20 h-20 rounded-full bg-accent/20 flex items-center justify-center mx-auto mb-4">
                      <User className="w-10 h-10 text-accent" />
                    </div>
                    <h3 className="text-subheading font-semibold text-text mb-1">{post.author.name}</h3>
                    <p className="text-caption text-accent mb-3">{post.author.role}</p>
                  </div>
                </Card>

                {/* Related Posts */}
                <div>
                  <h3 className="text-subheading font-semibold text-text mb-4">{t('blog.related', 'Related Articles')}</h3>
                  <div className="space-y-4">
                    {relatedPosts.map((relatedPost) => (
                      <Link 
                        key={relatedPost.id}
                        to={getLocalizedPath(`/blog/${relatedPost.slug}`)}
                        className="block"
                      >
                        <Card variant="hover" padding="md">
                          <h4 className="text-body-sm font-medium text-text hover:text-accent transition-colors line-clamp-2">
                            {i18n.language === 'zh' && relatedPost.title.zh ? relatedPost.title.zh : relatedPost.title.en}
                          </h4>
                          <p className="text-caption text-text-muted mt-1">
                            {formatDate(relatedPost.publishedAt)}
                          </p>
                        </Card>
                      </Link>
                    ))}
                  </div>
                </div>
              </aside>
            </div>
          </Container>
        </section>
      </div>
    </>
  )
}

export default BlogPost
