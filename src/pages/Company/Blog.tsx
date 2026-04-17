/**
 * Blog 博客列表页
 */

import { Helmet } from 'react-helmet-async'
import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Calendar, User, Clock, ArrowRight, Tag } from 'lucide-react'
import { Container, Card, Badge, Button } from '@/components/common'
import { getLocalizedPath } from '@/utils'
import { blogPosts } from '@/data/blog-posts'

const Blog = () => {
  const { t } = useTranslation('company')

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  }

  const featuredPost = blogPosts.find(post => post.featured)
  const regularPosts = blogPosts.filter(post => !post.featured)

  return (
    <>
      <Helmet>
        <title>{t('blog.seo.title', 'Blog - VoiceAI')}</title>
        <meta name="description" content={t('blog.seo.description', 'Insights, tutorials, and best practices for AI voice agents in customer service and sales.')} />
      </Helmet>

      <div className="min-h-screen">
        {/* Hero */}
        <section className="py-16 md:py-24 bg-gradient-hero text-white">
          <Container>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center max-w-3xl mx-auto"
            >
              <Badge variant="accent" className="mb-4">{t('blog.badge', 'Blog')}</Badge>
              <h1 className="text-hero font-bold mb-6">{t('blog.title', 'VoiceAI Insights')}</h1>
              <p className="text-body-lg text-white/80">
                {t('blog.subtitle', 'Expert insights, tutorials, and best practices for building effective AI voice agents.')}
              </p>
            </motion.div>
          </Container>
        </section>

        {/* Featured Post */}
        {featuredPost && (
          <section className="py-16 bg-surface">
            <Container>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <Link to={getLocalizedPath(`/blog/${featuredPost.slug}`)}>
                  <Card variant="hover" padding="none" className="overflow-hidden">
                    <div className="grid md:grid-cols-2">
                      {/* Cover Image Placeholder */}
                      <div className="bg-gradient-to-br from-primary-purple/20 to-primary-cyan/20 min-h-[300px] flex items-center justify-center">
                        <span className="text-foreground-muted text-body">Featured Image</span>
                      </div>
                      
                      {/* Content */}
                      <div className="p-8 md:p-12 flex flex-col justify-center">
                        <Badge variant="accent" className="mb-4 w-fit">
                          {t('blog.featured', 'Featured')}
                        </Badge>
                        <h2 className="text-title font-bold text-text mb-4 hover:text-accent transition-colors">
                          {featuredPost.title.zh || featuredPost.title.en}
                        </h2>
                        <p className="text-body text-text-secondary mb-6">
                          {featuredPost.excerpt.zh || featuredPost.excerpt.en}
                        </p>
                        
                        {/* Meta */}
                        <div className="flex items-center gap-6 text-caption text-text-muted mb-6">
                          <div className="flex items-center gap-2">
                            <User className="w-4 h-4" />
                            <span>{featuredPost.author.name}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Calendar className="w-4 h-4" />
                            <span>{formatDate(featuredPost.publishedAt)}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Clock className="w-4 h-4" />
                            <span>{featuredPost.readTime} min read</span>
                          </div>
                        </div>
                        
                        {/* Tags */}
                        <div className="flex flex-wrap gap-2 mb-6">
                          {featuredPost.tags.slice(0, 3).map((tag) => (
                            <span
                              key={tag}
                              className="px-3 py-1 bg-background-secondary rounded-full text-caption text-text-secondary"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                        
                        <Button variant="primary" rightIcon={<ArrowRight className="w-5 h-5" />}>
                          {t('blog.readMore', 'Read Article')}
                        </Button>
                      </div>
                    </div>
                  </Card>
                </Link>
              </motion.div>
            </Container>
          </section>
        )}

        {/* All Posts Grid */}
        <section className="py-16 bg-surface-secondary">
          <Container>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-12"
            >
              <h2 className="text-display font-bold text-text">
                {t('blog.allPosts', 'All Articles')}
              </h2>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {regularPosts.map((post, index) => (
                <motion.div
                  key={post.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Link to={getLocalizedPath(`/blog/${post.slug}`)}>
                    <Card variant="hover" padding="none" className="overflow-hidden h-full flex flex-col">
                      {/* Cover Image Placeholder */}
                      <div className="bg-gradient-to-br from-accent/10 to-primary-purple/10 h-48 flex items-center justify-center">
                        <span className="text-foreground-muted text-body-sm">Featured Image</span>
                      </div>
                      
                      {/* Content */}
                      <div className="p-6 flex flex-col flex-grow">
                        {/* Category Badge */}
                        <Badge variant="default" className="mb-3 w-fit">
                          {post.category}
                        </Badge>
                        
                        <h3 className="text-subheading font-semibold text-text mb-3 hover:text-accent transition-colors line-clamp-2">
                          {post.title.zh || post.title.en}
                        </h3>
                        
                        <p className="text-body-sm text-text-secondary mb-4 flex-grow line-clamp-3">
                          {post.excerpt.zh || post.excerpt.en}
                        </p>
                        
                        {/* Meta */}
                        <div className="flex items-center gap-4 text-caption text-text-muted mb-4">
                          <div className="flex items-center gap-1">
                            <User className="w-3 h-3" />
                            <span>{post.author.name}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            <span>{formatDate(post.publishedAt)}</span>
                          </div>
                        </div>
                        
                        {/* Read More */}
                        <div className="flex items-center gap-2 text-accent text-body-sm font-medium">
                          <span>{t('blog.readMore', 'Read Article')}</span>
                          <ArrowRight className="w-4 h-4" />
                        </div>
                      </div>
                    </Card>
                  </Link>
                </motion.div>
              ))}
            </div>

            {/* Newsletter CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mt-16"
            >
              <Card padding="lg" className="text-center bg-gradient-to-r from-primary-purple/10 to-primary-cyan/10 border-primary-purple/20">
                <Tag className="w-12 h-12 text-accent mx-auto mb-4" />
                <h3 className="text-title font-bold text-text mb-2">
                  {t('blog.newsletter.title', 'Subscribe to Our Newsletter')}
                </h3>
                <p className="text-body text-text-secondary mb-6 max-w-lg mx-auto">
                  {t('blog.newsletter.subtitle', 'Get the latest insights and tutorials delivered to your inbox every week.')}
                </p>
                <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                  <input
                    type="email"
                    placeholder={t('blog.newsletter.placeholder', 'Enter your email')}
                    className="flex-1 px-4 py-3 bg-background-primary border border-border rounded-xl text-text placeholder:text-foreground-muted focus:outline-none focus:border-accent"
                  />
                  <Button variant="primary">
                    {t('blog.newsletter.subscribe', 'Subscribe')}
                  </Button>
                </div>
              </Card>
            </motion.div>
          </Container>
        </section>
      </div>
    </>
  )
}

export default Blog
