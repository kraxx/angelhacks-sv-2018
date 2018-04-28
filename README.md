# API Specification

## Getting Top 5 from Category

> [GET] /index

***request***

```json
//nothing
```

***response***

```json
{
  "category": ["hot", "new", "rising", "controversial", "top", "gilded", "wiki"],
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
