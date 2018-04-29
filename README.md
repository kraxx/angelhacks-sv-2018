# API Specification

## Getting Top 5 posts from category

> [GET] /index

- ***"hot"*** category is default, so you don't need a query string here.
- but for other categories, you need to send a "category" query string.

***response***

```json
{
  "category": ["hot", "new", "rising", "controversial", "top", "gilded", "wiki"],
  "startIndex": 0,
  "endIndex": 4,
  "currentCategory": "hot",
  "posts": [{
    "title": "Never go full retard",
    "type": "image",
    // type should be "image(including .gif) / video / link / text"
    "url": ""
  }, {
    "title": "Authentic Signature",
    "type": "text",
    "url": ""
  }, {
    "title": "The dogs are hunting",
    "type": "video",
    "url": ""
  }, {
    "title": "Goodboy making the newborn baby stop crying",
    "type": "image",
    "url": ""
  }, {
    "title": "Mexican Government Protects Peyote for Native Rituals",
    "type": "link",
    "url": ""
  }]
}
```

> [GET] /index?category=new

***response***

```json
{
  "category": ["hot", "new", "rising", "controversial", "top", "gilded", "wiki"],
  "startIndex": 0,
  "endIndex": 4,
  "currentCategory": "new",
  "posts": [{
    "title": "Never go full retard",
    "type": "image",
    // type should be "image(including .gif) / video / link / text"
    "url": ""
  }, {
    "title": "Authentic Signature",
    "type": "text",
    "url": ""
  }, {
    "title": "The dogs are hunting",
    "type": "video",
    "url": ""
  }, {
    "title": "Goodboy making the newborn baby stop crying",
    "type": "image",
    "url": ""
  }, {
    "title": "Mexican Government Protects Peyote for Native Rituals",
    "type": "link",
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
  }, {
    "title": "The dogs are hunting",
    "url": ""
  }, {
    "title": "Goodboy making the newborn baby stop crying",
    "url": ""
  }, {
    "title": "Mexican Government Protects Peyote for Native Rituals",
    "url": ""
  }]
}
```

## Post Detail

> [GET] postDetail?URL=http~~

```json
{
  "title": "",
  "contents": "",
  "createdBy": "",
  "comments": [
    {
      "contents": "Hello!",
      "createdBy": "rockethyun",
      "points": 421
    },
    {
      "contents": "Hello!",
      "createdBy": "rockethyun",
      "points": 421
    },
    {
      "contents": "Hello!",
      "createdBy": "rockethyun",
      "points": 421
    },
    {
      "contents": "Hello!",
      "createdBy": "rockethyun",
      "points": 421
    },
  ]
}
```
