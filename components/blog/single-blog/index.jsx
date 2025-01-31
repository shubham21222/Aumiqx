// components/blog/SingleBlog.js
import Categories from '../Categories';
import RecentPosts from '../RecentPosts';
import Search from '../Search';
import Tags from '../Tags';
import BlogDetails from './BlogDetails';

function SingleBlog({ blogId }) {
  return (
    <div className="section post-details-page aximo-section-padding2">
      <div className="container">
        <div className="row">
          <div className="col-lg-8">
            <BlogDetails blogId={blogId} />
          </div>
          <div className="col-lg-4">
            <div className="right-sidebar">
              <Search />
              <Categories />
              <RecentPosts />
              <Tags />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SingleBlog;