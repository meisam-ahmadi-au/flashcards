# data model

```json
firebase : {
  cards: {
    uid: {
      categoryId: {
        cardId: {
          front,
          back,
          createdAt,
          nextReadTime,
          shouldReadFront,
          learningCurve
        }
      }
    }
  },
  categories: {
    uid: {
      categoryId(cid): {
        categoryId,
        createdAt,
        categoryName,
        tags,
        totalNumberOfCards

      }
    }
  },
  users: {
    uid : {
      displayName,
      email,
      photoURL,
      createdAt
    }

  }
}
```
