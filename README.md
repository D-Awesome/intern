Technology Required
======
- Web Framework: ExpressJS http://expressjs.com/
- Database: MongoDB http://www.mongodb.org/

Test
=====
- Test at http://localhost:3000/

Task 1
======
Using these technology below, create a simple comment system ()
- No need user log/reg
- List all comment
- Post new comment
- Delete comment

Task 2
======
- Convert Jade to Html. Use Swig (http://paularmstrong.github.io/swig/) for server-side template
- Add angularJS (https://angularjs.org/) into project, use REST api to post & delete comment
-- `POST /api/comment`
-- `DELETE /api/comment/:commentId`
-- Make sure that the page doesn't reload each time client send request :)
- Note: Don't include node_modules into repo. Developer can install at local
- Extra: Check out how to use Bower (http://bower.io/) to manage client-side lib.
