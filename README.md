# api-criada-com-meu-proprio-framework

A Estrutura é para fins de testes de funcionalidade, pois 90% do código foi gerado pela minha mini cli em [Mauro-Domingues/cross-api](https://github.com/Mauro-Domingues/cross-api)

Essa api simula uma simples rede social, com posts, comentários e reações mas com usuários anônimos.

As rotas são genéricas:

<h3 align="center">POSTS</h3>

get posts -> <br>
```
  url/posts
  ```
get post pelo id -> <br>
```
  url/posts/:id
  ```
get post pelo slug -> <br>
```
  url/posts/:slug
  ```
post post -> <br>
```
  url/posts 

  body = {
    title: string,
    description: string,
  }
  ```
update post -> <br>
```
  url/posts 

  body = {
    title: string,
    description: string,
  }
  ```
delete post -> <br>
```
  url/posts/:id
  ```
  
<h3 align="center">COMMENTS</h3>

get comments -> <br>
```
  url/posts/track/comments
  ```
get comment pelo id -> <br>
```
  url/posts/track/comments/:id
  ```
post comment -> <br>
```
  url/posts/:id/track/comments

  body = {
    comment: string,
  }
  ```
update comment -> <br>
```
  url/posts/track/comments/:id

  body = {
    comment: string,
  }
  ```
delete comment -> <br>
```
  url/posts/track/comments/:id
  ```
  
<h3 align="center">REACTIONS</h3>

get reaction -> <br>
```
  url/posts/track/reactions
  ```
get reaction pelo id -> <br>
```
  url/posts/track/reactions/:id
  ```
post reaction -> <br>
```
  url/posts/:id/track/reactions

  body = {
    reaction: string,
  }
  ```
update reaction -> <br>
```
  url/posts/track/reactions/:id

  body = {
    reaction: string,
  }
  ```
delete comment -> <br>
```
  url/posts/track/reactions/:id
  ```
