import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const postsDirectory = path.join(process.cwd(), 'posts');

const _getFrontmatter = (id) => {
  const fullPath = path.join(postsDirectory, `${id}.md`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');

  return matter(fileContents);
};

export const getPosts = () => {
  const fileNames = fs.readdirSync(postsDirectory);
  const allPostsData = fileNames.map((fileName) => {
    const id = fileName.replace(/\.md$/, '');

    return {
      id,
      ..._getFrontmatter(id),
    };
  });

  return allPostsData;
};

export const getPostIds = () => {
  const fileNames = fs.readdirSync(postsDirectory);

  return fileNames.map((fileName) => ({
    params: {
      id: fileName.replace(/\.md$/, ''),
    },
  }));
};

export const getPostData = (id) => ({
  id,
  ..._getFrontmatter(id),
});
