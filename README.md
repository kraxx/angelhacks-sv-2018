# API Specification

## Getting Top 5 posts from category

> [GET] /index

***request***

```json
//nothing
```

***response***

```json
{
  "category": ["hot", "new", "rising", "controversial", "top", "gilded", "wiki"],
  "startIndex": 0,
  "endIndex": 4,
  "currentCategory": "hot",
  "posts": [{
    "title": "Never go full retard",
    "url": ""
  },{
    "title": "Authentic Signature",
    "url": ""
  }{
    "title": "The dogs are hunting",
    "url": ""
  }{
    "title": "Goodboy making the newborn baby stop crying",
    "url": ""
  }{
    "title": "Mexican Government Protects Peyote for Native Rituals",
    "url": ""
  }]
}
```

> [GET] /index?category=new

***request***

```json
//nothing
```

***response***

```json
{
  "category": ["hot", "new", "rising", "controversial", "top", "gilded", "wiki"],
  "startIndex": 0,
  "endIndex": 4,
  "currentCategory": "new",
  "posts": [{
    "title": "Never go full retard",
    "url": ""
  },{
    "title": "Authentic Signature",
    "url": ""
  }{
    "title": "The dogs are hunting",
    "url": ""
  }{
    "title": "Goodboy making the newborn baby stop crying",
    "url": ""
  }{
    "title": "Mexican Government Protects Peyote for Native Rituals",
    "url": ""
  }]
}
```

## Getting 5 more posts

> [GET] index/?category=new&startIndex=5

```json
{
  "category": ["hot", "new", "rising", "controversial", "top", "gilded", "wiki"],
  "startIndex": 5,
  "endIndex": 9,
  "currentCategory": "new",
  "posts": [{
    "title": "Never go full retard",
    "url": ""
  },{
    "title": "Authentic Signature",
    "url": ""
  }{
    "title": "The dogs are hunting",
    "url": ""
  }{
    "title": "Goodboy making the newborn baby stop crying",
    "url": ""
  }{
    "title": "Mexican Government Protects Peyote for Native Rituals",
    "url": ""
  }]
}
```
